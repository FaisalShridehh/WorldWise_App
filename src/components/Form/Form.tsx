// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { UseSelectedPosition } from "../../hooks/UseSelectedPosition/UseSelectedPosition";
import Spinner from "../Spinner/Spinner";
import flagEmojiToPNG from "../../utils/flagEmojiToPNG";
import Message from "../Message/Message";
import { useCities } from "../../hooks/UseCities/UseCities";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const formatDate = (date: string | null) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function Form() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const {
    createNewCity,
    isLoading,
    //  errorMessage, setErrorMessage
  } = useCities();

  const [geoCodingError, setGeoCodingError] = useState<unknown>("");

  const emoji = convertToEmoji(countryCode);

  const [isGeoLoading, setIsGeoLoading] = useState(false);

  const [lat, lng] = UseSelectedPosition();

  useEffect(() => {
    async function fetchCityData() {
      if (!lat && !lng) return;
      const controller = new AbortController();
      const signal = controller.signal;
      try {
        setIsGeoLoading(true);
        setGeoCodingError("");
        // setErrorMessage("");
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
          {
            signal,
          }
        );

        const data = await res.json();

        // console.log(data);
        if (!data.countryCode)
          throw new Error(
            `That doesn't seem to be a valid country/city. Click somewhere else 😊`
          );

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        // console.error(error);
        if (error instanceof DOMException && error.name === "AbortError") {
          console.warn("Fetch aborted:", signal.reason);
        } else {
          console.error("Fetch error:", error);
          setGeoCodingError(error.message);
        }
      } finally {
        controller.abort();
        setIsGeoLoading(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji: convertToEmoji(countryCode),
      date,
      notes,
      position: {
        lat: lat,
        lng: lng,
      },
      // id: 73930385,
    };
    await createNewCity(newCity);
    // if (!errorMessage)
    navigate("/app");
  }

  if (isGeoLoading) return <Spinner />;

  // if (errorMessage) return <Message message={errorMessage} />;
  if (!lat && !lng)
    return <Message message={"Start by clicking somewhere on the map."} />;
  if (geoCodingError) return <Message message={geoCodingError} />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleFormSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{flagEmojiToPNG(emoji)}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={formatDate(date)}
        /> */}
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button
          // onClick={(e) => {
          //   e.preventDefault();
          //   navigate(-1);
          // }}
          type={"primary"}
        >
          Add
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            // navigate(-1);
            navigate("/app");
          }}
          type={"back"}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;

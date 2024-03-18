// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

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

  const { setCities } = useCities();

  const [geoCodingError, setGeoCodingError] = useState<unknown>("");

  const emoji = convertToEmoji(countryCode);

  const [isLoading, setIsLoading] = useState(false);

  const [lat, lng] = UseSelectedPosition();

  useEffect(() => {
    async function fetchCityData() {
      if (!lat && !lng) return;
      try {
        setIsLoading(true);
        setGeoCodingError("");
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );

        const data = await res.json();

        console.log(data);
        if (!data.countryCode)
          throw new Error(
            `That doesn't seem to be a valid country/city. Click somewhere else 😊`
          );

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        console.error(error);
        setGeoCodingError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:3000/cities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        }),
      });

      const data = await res.json();
      // console.log(data);
      setCities((prevCities: []) => [...prevCities, data]);

      navigate("/app");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <Spinner />;

  if (!lat && !lng)
    return <Message message={"Start by clicking somewhere on the map."} />;
  if (geoCodingError) return <Message message={geoCodingError} />;
  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
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
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={formatDate(date)}
        />
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

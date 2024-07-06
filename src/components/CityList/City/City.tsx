import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useCities } from "../../../hooks/UseCities/UseCities";
import styles from "./City.module.css";
import Spinner from "../../Spinner/Spinner";
import Button from "../../Button/Button";
import flagEmojiToPNG from "../../../utils/flagEmojiToPNG";

/**
 * Formats a given date string into a localized date string.
 *
 * @param {string | null} date - The date string to format. If null, returns null.
 * @return {string | null} - The formatted date string, or null if the input is null.
 */

const formatDate = (date: string | null): string | null => {
  if (date === null) {
    return null;
  }
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
};
/**
 * Renders the City component, which displays information about a specific city.
 *
 * @return {JSX.Element} The City component.
 */

function City(): JSX.Element {
  const { currentCity, fetchCityById, isLoading } = useCities();
  const cityParams = useParams();
  // const [searchParams, setSearchParams] = useSearchParams();
  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");

  const navigate = useNavigate();

  const { id: cityId } = cityParams;

  // TEMP DATA
  // const currentCity = {
  //   cityName: "Lisbon",
  //   emoji: "🇵🇹",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };

  useEffect(() => {
    fetchCityById(cityId);
  }, [cityId, fetchCityById]);

  const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{flagEmojiToPNG(emoji)}</span> {currentCity.cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </div>
  );
}

export default City;

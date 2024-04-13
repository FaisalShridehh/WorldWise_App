import { CityItemProps } from "../../../types/models/City";
import styles from "./CityItem.module.css";
import flagEmojiToPNG from "../../../utils/flagEmojiToPNG";
import { Link } from "react-router-dom";
import { useCities } from "../../../hooks/UseCities/UseCities";
import Spinner from "../../Spinner/Spinner";

// * for Flag to emoji converter
// const flagEmojiToPNG = (flag: string): React.JSX.Element | null => {
//   if (!flag || flag.length === 0) return null;

//   const countryCode = Array.from(flag, (codeUnit) => {
//     const codePoint = codeUnit.codePointAt(0);
//     return codePoint !== undefined
//       ? String.fromCharCode(codePoint - 127397).toLowerCase()
//       : "";
//   }).join("");
//   return (
//     <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
//   );
// };

// * for date formatting
const formatDate = (date: string): string =>
  new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function CityItem({ city }: CityItemProps) {
  const { currentCity, handleDeleteCityWithId, isLoading } = useCities();
  const { cityName, emoji, date, position, id } = city;
  const { lat, lng } = position;

  // console.log(currentCity);

  if (isLoading) return <Spinner />;

  return (
    <li>
      <Link
        to={`/app/cities/${id}?lat=${lat}&lng=${lng}`}
        className={`${styles.cityItem} ${
          id === currentCity?.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{flagEmojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.time}>{formatDate(date)}</time>
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            e.preventDefault();
            handleDeleteCityWithId(id);
          }}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

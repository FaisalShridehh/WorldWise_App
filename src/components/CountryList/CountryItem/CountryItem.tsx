import { CountryItemProps } from "../../../types/models/Country";
import flagEmojiToPNG from "../../../utils/flagEmojiToPNG";
import styles from "./CountryItem.module.css";

function CountryItem({ country }: CountryItemProps) {
  return (
    <li className={styles.countryItem}>
      <span>{flagEmojiToPNG(country.emoji)}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;

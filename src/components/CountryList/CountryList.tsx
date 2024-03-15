import styles from "./CountryList.module.css";
import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";
import { Countries, CountryListProps } from "../../types/models/Country";
import CountryItem from "./CountryItem/CountryItem";
import { useCities } from "../../hooks/UseCities/UseCities";

export default function CountryList() {
  const { cities, isLoading }: CountryListProps = useCities();
  if (isLoading) return <Spinner />;

  const countries: Countries[] = cities.reduce((arr: Countries[], city) => {
    //* check if the array contains the current city
    if (
      !arr
        .map((el) => {
          // console.log("el => ", el);
          return el.country;
        })
        .includes(city.country)
    )
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  // console.log("countries => ", countries);

  if (countries.length === 0)
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

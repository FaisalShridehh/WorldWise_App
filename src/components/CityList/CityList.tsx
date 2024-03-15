import { useCities } from "../../hooks/UseCities/UseCities";
import { CityListProps } from "../../types/models/City";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import CityItem from "./CityItem/CityItem";
import styles from "./CityList.module.css";

export default function CityList() {
  const { isLoading, cities } : CityListProps = useCities();
  if (isLoading) return <Spinner />;

  if (cities.length === 0)
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

import { useContext } from "react";
import { CitiesContext } from "../../Contexts/CitiesContext/CitiesContext";

export function useCities() {
  const citiesContext = useContext(CitiesContext);
  if (citiesContext === undefined)
    throw new Error('there is an error in using "Context"');
  return citiesContext;
}

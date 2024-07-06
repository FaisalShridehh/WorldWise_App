import { createContext, useCallback, useEffect, useReducer } from "react";
import { CityType, CurrentCityType } from "../../types/models/City";
import CitiesReducer from "../../Reducers/CitiesReducer";
import {
  CitiesActionKind,
  CitiesState,
} from "../../types/models/CitiesReducer";

export interface CityContext {
  cities: CityType[];
  isLoading: boolean;
  currentCity: CurrentCityType;
  error: {
    error_name: Error["name"];
    error_message: Error["message"];
  };
  // errorMessage: unknown;
  // setErrorMessage: (state: unknown) => unknown;
  fetchCityById: (cityId: string | undefined) => Promise<void>;
  createNewCity: (newCity: NewCity) => Promise<void>;
  handleDeleteCityWithId: (id: number) => Promise<void>;
}

export interface NewCity {
  cityName: string;
  country: string;
  emoji: string;
  date: Date;
  notes: string;
  position: {
    lat: string | null;
    lng: string | null;
  };
}
const initialState: CitiesState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: {
    error_name: "",
    error_message: "",
  },
};
export const CitiesContext = createContext<CityContext | undefined>(undefined);

/**
 * Creates a CitiesProvider component that wraps its children with a CitiesContext.Provider.
 * The CitiesProvider component fetches cities from a server and provides functions to fetch a city by id,
 * create a new city, and delete a city.
 *
 * @param {Object} props - The props object containing the children to be wrapped by the CitiesProvider.
 * @param {React.ReactNode} props.children - The children to be wrapped by the CitiesProvider.
 * @return {JSX.Element} A CitiesContext.Provider component that wraps the children with the CitiesProvider context.
 */

export default function CitiesProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [state, dispatch] = useReducer(CitiesReducer, initialState);
  // const [cities, setCities] = useState<CityType[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [currentCity, setCurrentCity] = useState<CurrentCityType>({});
  // const [errorMessage, setErrorMessage] = useState<unknown>("");

  useEffect(() => {
    // const controller = new AbortController();
    // const signal = controller.signal;
    async function fetchCities() {
      try {
        // setIsLoading(true);
        dispatch({ type: CitiesActionKind.LOADING, payload: true });
        const citiesRes = await fetch("http://localhost:3000/cities", {
          // signal,
        });

        if (!citiesRes.ok) {
          throw new Error("Something went wrong");
        }

        // console.log(await citiesRes.json());
        const data = await citiesRes.json();

        // setCities(data);
        dispatch({ type: CitiesActionKind.CITIES_LOADED, payload: data });
      } catch (error) {
        // console.error(error);
        if (error instanceof DOMException && error.name === "AbortError") {
          // console.warn("Fetch aborted:", signal.reason);
          dispatch({
            type: CitiesActionKind.REJECTED,
            payload: {
              error_name: error.name,
              // error_message: signal.reason,
              error_message: "signal.reason",
            },
          });
        } else if (error instanceof Error) {
          console.error("Fetch error:", error);
          dispatch({
            type: CitiesActionKind.REJECTED,
            payload: {
              error_name: error.name,
              error_message: error.message,
            },
          });
        }
      } finally {
        dispatch({ type: CitiesActionKind.LOADING, payload: false });

        // controller.abort();
      }
    }

    fetchCities();
    // Cleanup function to abort the fetch if the component unmounts
    // return () => controller.abort();
  }, []);

  const fetchCityById = useCallback(
    async function fetchCityById(cityId: string | undefined): Promise<void> {
      if (cityId === state.currentCity.id) return;
      // const controller = new AbortController();
      // const signal = controller.signal;
      try {
        dispatch({ type: CitiesActionKind.LOADING, payload: true });

        const citiesRes = await fetch(
          `http://localhost:3000/cities?id=${cityId}`,
          {
            // signal,
          }
        );

        if (!citiesRes.ok) {
          throw new Error("Something went wrong");
        }

        const data = await citiesRes.json();
        // setCurrentCity(data[0]);
        dispatch({ type: CitiesActionKind.CITY_LOADED, payload: data[0] });
        // console.log(data);
      } catch (error) {
        // console.error(error);
        if (error instanceof DOMException && error.name === "AbortError") {
          // console.warn("Fetch aborted:", signal.reason);
          dispatch({
            type: CitiesActionKind.REJECTED,
            payload: {
              error_name: error.name,
              // error_message: signal.reason,
              error_message: "Fetch aborted",
            },
          });
        } else if (error instanceof Error) {
          console.error("Fetch error:", error);
          dispatch({
            type: CitiesActionKind.REJECTED,
            payload: {
              error_name: error.name,
              error_message: error.message,
            },
          });
        }
      } finally {
        dispatch({ type: CitiesActionKind.LOADING, payload: false });
        // controller.abort();
      }
    },
    [state.currentCity.id]
  );

  async function createNewCity(newCity: NewCity) {
    const controller = new AbortController();
    const signal = controller.signal;

    // const isCityAlreadyExists = cities.some(
    //   (city) => city.cityName === newCity.cityName
    // );

    try {
      // if (isCityAlreadyExists) {
      //   throw { name: "createError", message: "city is already exist" };
      // }

      dispatch({ type: CitiesActionKind.LOADING, payload: true });
      const res = await fetch("http://localhost:3000/cities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
        signal,
      });

      const data = await res.json();
      // console.log(data);
      // setCities((prevCities) => [...prevCities, data]);
      dispatch({ type: CitiesActionKind.CITY_CREATED, payload: data });

      // setErrorMessage("");
    } catch (error: unknown) {
      // console.error(error);
      if (error instanceof DOMException && error.name === "AbortError") {
        console.warn("Fetch aborted:", signal.reason);
        dispatch({
          type: CitiesActionKind.REJECTED,
          payload: {
            error_name: error.name,
            error_message: signal.reason,
          },
        });
      }
      // else if (error.name === "createError") {
      //   console.warn(error.message);
      //   // setErrorMessage(error.message);
      // }
      else if (error instanceof Error) {
        console.error("Fetch error:", error);
        dispatch({
          type: CitiesActionKind.REJECTED,
          payload: {
            error_name: error.name,
            error_message: error.message,
          },
        });
      }
    } finally {
      dispatch({ type: CitiesActionKind.LOADING, payload: false });
      controller.abort();
    }
  }

  async function handleDeleteCityWithId(id: number) {
    // console.log(id);

    try {
      dispatch({ type: CitiesActionKind.LOADING, payload: true });
      const res = await fetch(`http://localhost:3000/cities/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      console.log(data);

      // setCities((prevCities) => prevCities.filter((c) => c.id !== data.id));
      dispatch({ type: CitiesActionKind.CITY_DELETED, payload: id });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        dispatch({
          type: CitiesActionKind.REJECTED,
          payload: {
            error_name: error.name,
            error_message: error.message,
          },
        });
      }
    } finally {
      dispatch({ type: CitiesActionKind.LOADING, payload: false });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities: state.cities,
        isLoading: state.isLoading,
        currentCity: state.currentCity,
        fetchCityById,
        createNewCity,
        handleDeleteCityWithId,
        error: state.error,
        // errorMessage,
        // setErrorMessage,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

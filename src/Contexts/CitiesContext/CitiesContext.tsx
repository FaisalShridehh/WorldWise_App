import { createContext, useEffect, useState } from "react";
import { CityType, CurrentCityType } from "../../types/models/City";

export interface CityContext {
  cities: CityType[];
  isLoading: boolean;
  currentCity: object;
  fetchCityById: (cityId: string | undefined) => Promise<void>;
}

export const CitiesContext = createContext<CityContext | undefined>(undefined);

export default function CitiesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cities, setCities] = useState<CityType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [currentCity, setCurrentCity] = useState<CurrentCityType>({});

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchCities() {
      try {
        setLoading(true);
        const citiesRes = await fetch("http://localhost:3000/cities", {
          signal,
        });

        if (!citiesRes.ok) {
          throw new Error("Something went wrong");
        }

        // console.log(await citiesRes.json());
        const data = await citiesRes.json();

        setCities(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        controller.abort();
      }
    }

    fetchCities();
    // Cleanup function to abort the fetch if the component unmounts
    return () => controller.abort();
  }, []);

  async function fetchCityById(cityId: string | undefined): Promise<void> {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      setLoading(true);

      const citiesRes = await fetch(
        `http://localhost:3000/cities?id=${cityId}`,
        {
          signal,
        }
      );

      if (!citiesRes.ok) {
        throw new Error("Something went wrong");
      }

      const data = await citiesRes.json();
      setCurrentCity(data[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      controller.abort();
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, fetchCityById, setCities }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

import { useState } from "react";
interface Coordinates {
  lat: number;
  lng: number;
}
export function useGeolocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<Coordinates | null>(defaultPosition);
  const [error, setError] = useState<string | null>(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }
  return { isLoading, error, position, getPosition };
}

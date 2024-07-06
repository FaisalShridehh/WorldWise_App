import { useEffect, useState } from "react";
interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Custom React hook that retrieves the user's geolocation coordinates.
 *
 * @param {Coordinates | null} defaultPosition - The default position to use if geolocation is not available. Defaults to null.
 * @return {Object} An object containing isLoading, error, position, and getPosition function.
 *  - isLoading: A boolean indicating whether the geolocation is currently being loaded.
 *  - error: A string or null indicating any error that occurred while retrieving the geolocation.
 *  - position: A Coordinates object or null representing the user's current geolocation.
 *  - getPosition: A function that retrieves the user's geolocation.
 */
export function useGeolocation(defaultPosition: Coordinates | null = null): {
  isLoading: boolean;
  error: string | null;
  position: Coordinates | null;
  getPosition: () => void;
} {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<Coordinates | null>(defaultPosition);
  const [error, setError] = useState<string | null>(null);

  function getPosition() {
    if (!navigator.geolocation) {
      setError("Your browser does not support geolocation");
      return;
    }
    setError(null); // Reset error state before attempting to get position
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
  useEffect(() => {
    getPosition();
  }, []); // Empty dependency array to run once on mount

  return { isLoading, error, position, getPosition };
}

import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { LatLngExpression, LeafletMouseEvent } from "leaflet";
import { useCities } from "../../hooks/UseCities/UseCities";
import flagEmojiToPNG from "../../utils/flagEmojiToPNG";
import { useGeolocation } from "../../hooks/UseGeoLocation/UseGeoLocation";
import Button from "../Button/Button";
import { useSelectedPosition } from "../../hooks/UseSelectedPosition/UseSelectedPosition";

/**
 * Renders a map component with markers for cities and allows the user to use their position.
 *
 * @return {JSX.Element} The rendered map component.
 */
export default function Map(): JSX.Element {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState<LatLngExpression>([0, 0]);
  const { isLoading, getPosition, position } = useGeolocation();
  const [lat, lng] = useSelectedPosition();

  useEffect(() => {
    if (lat && lng) {
      setMapPosition([Number(lat), Number(lng)]);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (position && position.lat && position.lng) {
      setMapPosition([Number(position.lat), Number(position.lng)]);
    }
  }, [position]);

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={() => getPosition()}>
        {isLoading ? "Loading..." : "Use Your Position"}
      </Button>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{flagEmojiToPNG(city.emoji)}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenterPosition mapPosition={mapPosition} />
        <MapClick />
      </MapContainer>
    </div>
  );
}

/**
 * Updates the center position of a Leaflet map.
 *
 * @param {Object} props - The component props.
 * @param {LatLngExpression} props.mapPosition - The new center position of the map.
 * @return {null} This component does not render anything.
 */
function ChangeCenterPosition({
  mapPosition,
}: {
  mapPosition: LatLngExpression;
}): null {
  const map = useMap();
  useEffect(() => {
    map.setView(mapPosition);
  }, [map, mapPosition]);
  return null;
}

/**
 * Function that handles the click event on the map. Navigates to a form with latitude and longitude parameters.
 *
 * @param {LeafletMouseEvent} e - The Leaflet mouse event containing latitude and longitude information.
 * @return {null} Returns null.
 */
function MapClick(): null {
  const navigate = useNavigate();
  useMapEvents({
    click: (e: LeafletMouseEvent) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}

import { useNavigate, useSearchParams } from "react-router-dom";
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
import { LatLngExpression } from "leaflet";
import { useCities } from "../../hooks/UseCities/UseCities";
import flagEmojiToPNG from "../../utils/flagEmojiToPNG";
import { useGeolocation } from "../../hooks/UseGeoLocation/UseGeoLocation";
import Button from "../Button/Button";
import { UseSelectedPosition } from "../../hooks/UseSelectedPosition/UseSelectedPosition";
export default function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState<LatLngExpression>([0, 0]);
  const { isLoading, getPosition, position } = useGeolocation();
  const [lat, lng] = UseSelectedPosition();

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
        {/* <Marker position={mapPosition}>
          <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        {/* {lat && lng && ( */}
        <ChangeCenterPosition mapPosition={mapPosition} />
        {/* )} */}
        <MapClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenterPosition({
  mapPosition,
}: {
  mapPosition: LatLngExpression;
}) {
  const map = useMap();
  map.setView(mapPosition);
  return null;
}

function MapClick() {
  const navigate = useNavigate();
  const map = useMapEvents({
    click: (e) => {
      console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}

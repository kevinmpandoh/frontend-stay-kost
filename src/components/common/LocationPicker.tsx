"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Icon default Leaflet fix
const icon = L.icon({
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type LocationPickerProps = {
  value: { lat: number; lng: number };
  onChange: (lat: number, lng: number) => void;
  height?: string;
  zoom?: number;
};

function MapClickHandler({
  onChange,
}: {
  onChange: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onChange(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function LocationPicker({
  value,
  onChange,
  height = "300px",
  zoom = 13,
}: LocationPickerProps) {
  return (
    <div className="rounded overflow-hidden" style={{ height }}>
      <MapContainer
        key={`${value.lat}-${value.lng}`}
        center={[value.lat, value.lng]}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={[value.lat, value.lng]} icon={icon} />
        <MapClickHandler onChange={onChange} />
      </MapContainer>
    </div>
  );
}

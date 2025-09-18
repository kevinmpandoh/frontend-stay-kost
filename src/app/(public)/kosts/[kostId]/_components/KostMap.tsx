import React from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";

interface KostMapProps {
  kostName: string;

  latitude: number;
  longitude: number;
}

const KostMap = ({ latitude, longitude, kostName }: KostMapProps) => {
  const customIcon = new Icon({
    iconUrl: "/icons/marker-icon.png", // ganti jika pakai ikon custom
    shadowUrl: "/icons/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  return (
    <div className="relative w-full h-90 rounded-xl overflow-hidden mt-6">
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        scrollWheelZoom={false}
        className="w-full h-full z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={[latitude, longitude]} icon={customIcon}>
          <Popup>{kostName}</Popup>
        </Marker>
      </MapContainer>
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-primary text-white text-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 hover:bg-primary/90 transition-all"
      >
        <MapPin className="w-4 h-4" />
        Lihat di Google Maps
      </a>
    </div>
  );
};

export default KostMap;

"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L, { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { useEffect, useRef, useState } from "react";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

type Location = {
  lat: number;
  lng: number;
  detail?: string;
  via?: "map" | "search";
};

interface MapPickerProps {
  initialPosition?: LatLng | [number, number];
  onChange?: (location: Location) => void;
  height?: string;
  width?: string;
}

export default function MapPicker({
  initialPosition = [1.266779561933604, 124.88303463952415],
  onChange,
  height = "400px",
  width = "100%",
}: MapPickerProps) {
  const [position, setPosition] = useState<LatLng | [number, number] | null>(
    initialPosition || null,
  );
  const [address, setAddress] = useState("");
  const markerRef = useRef<L.Marker | null>(null);

  const MapClickHandler = () => {
    useMapEvents({
      click: async (e) => {
        setPosition(e.latlng);
        const provider = new OpenStreetMapProvider();
        const results = await provider.search({
          query: `${e.latlng.lat}, ${e.latlng.lng}`,
        });
        const newAddress = results?.[0]?.label || "Alamat tidak ditemukan";
        setAddress(newAddress);

        onChange?.({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          detail: newAddress,
          via: "map",
        });
      },
    });
    return null;
  };

  const SearchControl = () => {
    const map = useMap();

    useEffect(() => {
      const provider = new OpenStreetMapProvider();

      // @ts-expect-error - Memberi tahu TypeScript bahwa kita mengharapkan error pada baris berikutnya
      const searchControl = new GeoSearchControl({
        provider,
        style: "bar",
        showMarker: false,
        autoClose: true,
        retainZoomLevel: false,
        animateZoom: true,
        keepResult: true,
      });

      map.addControl(searchControl);

      map.on("geosearch/showlocation", (result: any) => {
        const latlng = result.location?.latLng;
        if (latlng) {
          setPosition([latlng.lat, latlng.lng]);
          setAddress(result.location.label);

          onChange?.({
            lat: latlng.lat,
            lng: latlng.lng,
            detail: result.location.label,
            via: "search",
          });
        }
      });

      return () => {
        map.removeControl(searchControl);
        map.off("geosearch/showlocation");
      };
    }, [map]);

    return null;
  };

  return (
    <div style={{ height, width }}>
      <MapContainer
        center={initialPosition as [number, number]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler />
        <SearchControl />
        {position && (
          <Marker
            position={position}
            ref={markerRef}
            icon={
              new L.Icon({
                iconUrl: "/icons/marker-icon.png",
                shadowUrl: "/icons/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })
            }
          />
        )}
      </MapContainer>
      {address && (
        <div className="mt-2 text-sm text-gray-700">Alamat: {address}</div>
      )}
    </div>
  );
}

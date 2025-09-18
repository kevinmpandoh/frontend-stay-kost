"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { useEffect, useRef, useState } from "react";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

type MapPickerProps = {
  value: { lat: number; lng: number };
  onChange: (coords: { lat: number; lng: number }) => void;
};

export default function MapPicker({ value, onChange }: MapPickerProps) {
  const [position, setPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(value || null);

  const [address, setAddress] = useState<string>(""); // << Tambah ini

  const markerRef = useRef<L.Marker | null>(null);

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await res.json();
      if (data?.display_name) {
        setAddress(data.display_name);
      } else {
        setAddress("Alamat tidak ditemukan");
      }
    } catch (err) {
      console.log(err);
      setAddress("Gagal memuat alamat");
    }
  };

  const handleNewPosition = async (coords: { lat: number; lng: number }) => {
    setPosition(coords);
    onChange(coords);
    await fetchAddress(coords.lat, coords.lng); // << Panggil di sini
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: async (e) => {
        const newPosition = e.latlng;
        setPosition(newPosition);
        onChange(newPosition); // <-- Kirim kembali ke parent
        await handleNewPosition(e.latlng);
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

      // Menambahkan kontrol pencarian ke peta
      map.whenReady(() => {
        map.addControl(searchControl);
      });

      map.on("geosearch/showlocation", async (result: any) => {
        const latlng = result.location?.latLng;
        if (latlng) {
          const newPosition = { lat: latlng.lat, lng: latlng.lng };
          setPosition(newPosition);
          onChange(newPosition); // <-- Kirim kembali ke parent
        }
      });

      return () => {
        map.removeControl(searchControl);
        map.off("geosearch/showlocation");
      };
    }, [map]);

    return null;
  };

  useEffect(() => {
    if (value.lat === 0 || value.lng === 0) return;
    if (value && value.lat && value.lng) {
      setPosition(value);
      fetchAddress(value.lat, value.lng);
    }
  }, [value]);

  return (
    <>
      {/* Menampilkan alamat yang dipilih */}
      {address && position ? (
        <p className="mb-2 text-sm text-gray-600">{address}</p>
      ) : (
        <p className="mb-2 text-sm text-gray-600">Pilih lokasi di peta</p>
      )}
      <MapContainer
        center={[
          position?.lat || 1.266779561933604,
          position?.lng || 124.88303463952415,
        ]}
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
              new Icon({
                iconUrl: "/icons/marker-icon.png",
                shadowUrl: "/icons/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })
            }
          />
        )}
      </MapContainer>
    </>
  );
}

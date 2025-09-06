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
import { usePreferenceStore } from "../preference.store";

export default function LocationByMap() {
  const setLocation = usePreferenceStore((state) => state.setLocation);
  const [position, setPosition] = useState<L.LatLng | [number, number] | null>(
    null,
  );
  const [alamat, setAlamat] = useState("");
  const markerRef = useRef<L.Marker | null>(null);

  const MapClickHandler = () => {
    useMapEvents({
      click: async (e) => {
        setPosition(e.latlng);
        const provider = new OpenStreetMapProvider();
        const results = await provider.search({
          query: `${e.latlng.lat}, ${e.latlng.lng}`,
        });

        const alamatBaru = results?.[0]?.label || "Alamat tidak ditemukan";
        setAlamat(alamatBaru);
        setLocation({
          via: "map",
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          detail: alamatBaru,
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

      // Menambahkan kontrol pencarian ke peta
      map.addControl(searchControl);

      map.on("geosearch/showlocation", async (result: any) => {
        const latlng = result.location?.latLng;
        if (latlng) {
          setPosition([latlng.lat, latlng.lng]);
          setAlamat(result.location.label);
          setLocation({
            lat: latlng.lat,
            lng: latlng.lng,
            via: "map",
            detail: result.location.label,
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
    <>
      {/* Menampilkan alamat yang dipilih */}

      <MapContainer
        center={[1.266779561933604, 124.88303463952415]}
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
      {alamat && (
        <div className="mb-2 text-sm text-gray-700">Alamat: {alamat}</div>
      )}
    </>
  );
}

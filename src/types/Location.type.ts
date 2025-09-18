export interface LocationType {
  via: "address" | "map";
  provinsi?: string;
  kabupaten?: string;
  kecamatan?: string;
  detail?: string;
  coordinates?: { lat: number; lng: number }; // jika via map
}

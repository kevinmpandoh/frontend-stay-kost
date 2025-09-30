export interface PreferencePayload {
  address: {
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  price: {
    min: number;
    max: number;
  };
  kostType: "putra" | "putri" | "campur";
  kostFacilities: string[];
  roomFacilities: string[];
  rules: string[];
}

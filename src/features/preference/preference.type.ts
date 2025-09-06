export interface PreferencePayload {
  address: {
    type: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    detail: string;
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

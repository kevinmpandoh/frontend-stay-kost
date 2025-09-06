export interface PreferencePayload {
  address: {
    type: string;
    province: string;
    city: string;
    district: string;
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

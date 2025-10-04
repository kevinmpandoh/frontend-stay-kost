export interface PreferencePayload {
  address: {
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  // price: {
  //   min: number;
  //   max: number;
  // };
  price: number;
  kostType: "putra" | "putri" | "campur";
  kostFacilities: string[];
  roomFacilities: string[];
}

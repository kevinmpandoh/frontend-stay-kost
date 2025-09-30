export interface CreateKostPayload {
  name: string;
  description: string;
  type: "putra" | "putri" | "campur";
  rules?: string;
}

export interface Kost {
  name: string;
  type: "putra" | "putri" | "campur";
  description: string;
  address: KostAddress;
}

export interface KostAddress {
  province: string;
  city: string;
  district: string;
}

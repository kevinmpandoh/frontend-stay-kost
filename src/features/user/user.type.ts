export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo?: string;
  isVerified: boolean;
  role: "tenant" | "owner" | "admin";
}

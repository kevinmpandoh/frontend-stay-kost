export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  pekerjaan: string;
  kota_asal: string;
  kontak_darurat: string;
  foto_profile?: string;
  isVerified: boolean;
  role: "tenant" | "owner" | "admin";
}

// components/UserProfileInfo.tsx
import {
  CalendarDays,
  VenusAndMars,
  Building2,
  BookUser,
  UserRound,
  MapPin,
} from "lucide-react";

interface UserProfileInfoProps {
  name: string;
  gender: string | null;
  pekerjaan: string | null;
  kontakDarurat: string | null;
  kota_asal: string | null;
  tanggal_lahir: string | null;
}

export const UserProfileInfo = ({
  name,
  gender,
  tanggal_lahir,
  pekerjaan,
  kota_asal,
  kontakDarurat,
}: UserProfileInfoProps) => {
  return (
    <dl className="space-y-5 text-gray-600 text-sm">
      <div className="flex justify-between items-center">
        <dt className="flex items-center gap-2 text-base">
          <UserRound />
          Nama Lengkap
        </dt>
        <dd className="text-[#0F172A] text-base font-semibold">{name}</dd>
      </div>
      <div className="flex justify-between items-center">
        <dt className="flex items-center gap-2 text-base">
          <CalendarDays />
          Tanggal Lahir
        </dt>
        <dd
          className={`text-base ${
            tanggal_lahir ? "text-[#0F172A] font-semibold" : "text-red-600"
          }`}
        >
          {tanggal_lahir ?? "Belum Diisi"}
        </dd>
      </div>
      <div className="flex justify-between items-center">
        <dt className="flex items-center gap-2 text-base">
          <VenusAndMars />
          Jenis Kelamin
        </dt>
        <dd
          className={`text-base ${
            gender ? "text-[#0F172A] font-semibold" : "text-red-600"
          }`}
        >
          {gender ?? "Belum Diisi"}
        </dd>
      </div>
      <div className="flex justify-between items-center">
        <dt className="flex items-center gap-2 text-base">
          <Building2 />
          Pekerjaan
        </dt>
        <dd
          className={`text-base ${
            pekerjaan ? "text-[#0F172A] font-semibold" : "text-red-600"
          }`}
        >
          {pekerjaan ?? "Belum Diisi"}
        </dd>
      </div>
      <div className="flex justify-between items-center">
        <dt className="flex items-center gap-2 text-base">
          <MapPin />
          Kota Asal
        </dt>
        <dd
          className={`text-base ${
            kota_asal ? "text-[#0F172A] font-semibold" : "text-red-600"
          }`}
        >
          {kota_asal ?? "Belum Diisi"}
        </dd>
      </div>

      <div className="flex justify-between items-center">
        <dt className="flex items-center gap-2 text-base">
          <BookUser />
          Kontak Darurat
        </dt>
        <dd
          className={`text-base ${
            kontakDarurat ? "text-[#0F172A] font-semibold" : "text-red-600"
          }`}
        >
          {kontakDarurat ?? "Belum Diisi"}
        </dd>
      </div>
    </dl>
  );
};

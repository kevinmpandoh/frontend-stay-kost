import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AppLogo } from "../common/AppLogo";

const Footer = () => {
  return (
    <footer className="bg-primary-800 pt-16 text-gray-100">
      <div className="mx-auto grid max-w-7xl gap-10 p-4 md:grid-cols-4">
        {/* Logo & Deskripsi */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <AppLogo variant="light" />
          </div>
          <p className="text-sm text-gray-200">
            Platform terbaik untuk mencari dan mengelola kost di Sulawesi Utara.
            Mudah, cepat, dan terpercaya.
          </p>
        </div>

        {/* Navigasi - Penyewa */}
        <div>
          <h4 className="mb-3 font-semibold text-white">Untuk Penyewa</h4>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>
              <Link href="/kost">Cari Kost</Link>
            </li>
            <li>
              <Link href="/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link href="/faq">Bantuan</Link>
            </li>
          </ul>
        </div>

        {/* Navigasi - Pemilik */}
        <div>
          <h4 className="mb-3 font-semibold text-white">Untuk Pemilik</h4>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>
              <Link href="/daftar-pemilik">Daftarkan Kost</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard Pemilik</Link>
            </li>
            <li>
              <Link href="/faq">Bantuan</Link>
            </li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h4 className="mb-3 font-semibold text-white">Kontak Kami</h4>
          <ul className="space-y-3 text-sm text-gray-200">
            <li className="flex items-start gap-2">
              <MapPin size={16} />
              Jl. Sam Ratulangi No.123, Manado
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              089510465800
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} />
              kevinmpandoh@gmail.com
            </li>
            <li className="mt-2 flex gap-3">
              <a href="#">
                <Facebook size={20} />
              </a>
              <a href="#">
                <Instagram size={20} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer bawah */}
      <div className="bg-primary-900 border-t border-gray-700 py-6 text-center text-sm text-white">
        © {new Date().getFullYear()} Stay Kost. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

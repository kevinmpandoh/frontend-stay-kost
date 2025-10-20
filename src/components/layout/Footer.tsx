import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { AppLogo } from "../common/AppLogo";

import { APP_CONFIG } from "@/constants/contact";

const Footer = () => {
  return (
    <footer className="bg-primary-800 mb-14 pt-16 text-gray-100 md:mb-0">
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
              <Link href="/kosts">Cari Kost</Link>
            </li>
            <li>
              <Link href="/user/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link href="/">Bantuan</Link>
            </li>
          </ul>
        </div>

        {/* Navigasi - Pemilik */}
        <div>
          <h4 className="mb-3 font-semibold text-white">Untuk Pemilik</h4>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>
              <Link href="/login">Daftarkan Kost</Link>
            </li>
            <li>
              <Link href="/dashboard/owner">Dashboard Pemilik</Link>
            </li>
            <li>
              <Link href="/">Bantuan</Link>
            </li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h4 className="mb-3 font-semibold text-white">Kontak Kami</h4>
          <ul className="space-y-3 text-sm text-gray-200">
            <li className="flex items-start gap-2">
              <MapPin size={16} />
              {APP_CONFIG.CONTACT.ADDRESS}
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              {APP_CONFIG.CONTACT.PHONE}
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} />
              {APP_CONFIG.CONTACT.EMAIL}
            </li>
            <li className="mt-2 flex gap-3">
              <Link href={APP_CONFIG.CONTACT.FB_URL}>
                <Facebook size={20} />
              </Link>
              <Link href={APP_CONFIG.CONTACT.INSTAGRAM_URL}>
                <Instagram size={20} />
              </Link>
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

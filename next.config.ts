import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // penting agar semua path diizinkan
      },
      {
        protocol: "https",
        hostname: "api.sandbox.midtrans.com",
        pathname: "/**", // penting agar semua path diizinkan
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**", // penting agar semua path diizinkan
      },
    ],
  },
};

export default nextConfig;

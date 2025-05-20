import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    domains: ["image.tmdb.org"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
export default nextConfig;

//configurar Next.js para que permita imágenes de fuentes externas

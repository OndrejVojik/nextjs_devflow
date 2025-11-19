import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pino", "pino-pretty"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "flagsapi.com", // Added flagsapi.com
        port: "",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com", // Added encrypted-tbn0.gstatic.com
        port: "",
      },
    ],
  },
  experimental: {
    after: true, // Corrected experimental feature
  },
};

export default nextConfig;

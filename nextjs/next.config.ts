import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  appIsrStatus: false,
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

export default nextConfig;

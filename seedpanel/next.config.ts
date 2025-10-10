import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_SEED_PHRASE: process.env.NEXT_PUBLIC_SEED_PHRASE,
    NEXT_PUBLIC_CASE_NUMBER: process.env.NEXT_PUBLIC_CASE_NUMBER,
  },
};

export default nextConfig;

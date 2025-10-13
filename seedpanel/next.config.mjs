/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: 'standalone', // Enable standalone mode for optimized Docker builds
  env: {
    NEXT_PUBLIC_SEED_PHRASE: process.env.NEXT_PUBLIC_SEED_PHRASE,
    NEXT_PUBLIC_CASE_NUMBER: process.env.NEXT_PUBLIC_CASE_NUMBER,
    NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN: process.env.NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN,
    NEXT_PUBLIC_CHATWOOT_BASE_URL: process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL,
  },
};

export default nextConfig;

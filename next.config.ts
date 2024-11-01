import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "images.unsplash.com"
      },
      {
        protocol: 'https',
        hostname: "source.unsplash.com"
      },
      {
        protocol: 'https',
        hostname: "rvzsgbayoubbkjzhxzeh.supabase.co"
      },
      {
        protocol: 'https',
        hostname: "ibb.co"
      },
    ]
  }
};

export default nextConfig;

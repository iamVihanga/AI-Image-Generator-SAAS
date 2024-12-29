import type { NextConfig } from "next";
import withPlaiceholder from "@plaiceholder/next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
      {
        protocol: "https",
        hostname: "vzrhonabohopylchmktw.supabase.co",
      },
    ],
  },
};

export default withPlaiceholder(nextConfig);

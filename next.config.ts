import type { NextConfig } from "next";
import { resolve } from "node:path";

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/media/optimized/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      { source: "/media/:file", headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }] },
    ];
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      // Next 16 targets Chrome/Edge/Firefox 111+ and Safari 16.4+.
      // Its module bundle still injects polyfills those browsers do not need.
      // Retain URL.canParse for supported browsers that predate that API.
      config.resolve.alias = {
        ...config.resolve.alias,
        "../build/polyfills/polyfill-module": resolve(process.cwd(), "build/browser-polyfills.js"),
        "next/dist/build/polyfills/polyfill-module": resolve(process.cwd(), "build/browser-polyfills.js"),
      };
    }
    return config;
  },
};

export default nextConfig;

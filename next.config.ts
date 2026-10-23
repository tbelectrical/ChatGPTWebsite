import type { NextConfig } from "next";
import { resolve } from "node:path";

const nextConfig: NextConfig = {
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

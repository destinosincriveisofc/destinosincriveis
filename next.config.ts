import type { NextConfig } from "next";
// @ts-ignore
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '',
  assetPrefix: '',
  images: { unoptimized: true },
  allowedDevOrigins: [
    '177.153.195.66',
    '177.153.195.66:3001',
    'localhost:3001',
    'destinosincriveis.vps-kinghost.net',
    'destinosincriveis.vps-kinghost.net:3001'
  ]
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})(nextConfig);


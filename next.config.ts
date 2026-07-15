import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  allowedDevOrigins: [
    '177.153.195.66',
    '177.153.195.66:3001',
    'localhost:3001',
    'destinosincriveis.vps-kinghost.net',
    'destinosincriveis.vps-kinghost.net:3001'
  ]
};

export default nextConfig;

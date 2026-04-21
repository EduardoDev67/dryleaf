import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Desativa a funcionalidade de workers para evitar problemas com o Sharp
    webpackBuildWorker: false,
    parallelServerBuildTraces: false,
    parallelServerCompiles: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;

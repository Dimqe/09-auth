/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
        port: '',
        pathname: '/fullstack/react/**',
      },
    ],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone', // компактный self-contained билд для Docker
};

module.exports = nextConfig;

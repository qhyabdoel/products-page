/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["cdn.dummyjson.com"], // Add the external domain here
  },
};

export default nextConfig;

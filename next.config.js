/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.shopify.com', 'static2.bigstockphoto.com'],
  },
};

module.exports = nextConfig;

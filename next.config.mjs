/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "ocumail-content.s3.eu-west-2.amazonaws.com",
      "s3.eu-west-2.amazonaws.com",
    ], 
  },
};

export default nextConfig;
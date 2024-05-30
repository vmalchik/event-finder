/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // https://nextjs.org/docs/app/building-your-application/deploying/static-exports#image-optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bytegrad.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;

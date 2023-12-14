/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "files.edgestore.dev",
        },
        {
          protocol: "https",
          hostname: "images.ctfassets.net"
        },
      ],
    },
  };
module.exports = nextConfig

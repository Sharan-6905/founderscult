/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: 'https://founderscult.onrender.com/api/:path*',
        },
      ],
    };
  },
};

export default nextConfig;

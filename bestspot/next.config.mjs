/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'maps.googleapis.com' },
      { protocol: 'https', hostname: 'places.googleapis.com' },
    ],
  },
  async redirects() {
    return [{ source: '/', destination: '/bestspot', permanent: false }];
  },
};

export default nextConfig;

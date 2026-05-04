/** @type {import('next').NextConfig} */
const nextConfig = {
  // Serve the entire app under /bestspot so it can sit behind a rewrite from
  // the root happlier deployment. All routes, API routes and _next assets
  // become /bestspot/* automatically.
  basePath: '/bestspot',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'maps.googleapis.com' },
      { protocol: 'https', hostname: 'places.googleapis.com' },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async rewrites() {
    // Forward `/bestspot` and everything under it to the bestspot Vercel
    // deployment. The bestspot Next.js app sets `basePath: '/bestspot'`, so
    // /bestspot, /bestspot/api/*, /bestspot/_next/* all resolve correctly
    // when path-preserving rewriting is used.
    //
    // Set BESTSPOT_URL in the root project's Vercel env vars to e.g.
    // https://bestspot-xxxxx.vercel.app (no trailing slash). When unset, the
    // rewrites are skipped so local builds of the root app keep working.
    const target = process.env.BESTSPOT_URL?.replace(/\/$/, '');
    if (!target) return [];
    return [
      { source: '/bestspot', destination: `${target}/bestspot` },
      { source: '/bestspot/:path*', destination: `${target}/bestspot/:path*` },
    ];
  },
};

module.exports = nextConfig;

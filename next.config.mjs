/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // The screened-terrace job turned out to be the same property as the
      // cobblestone drive, so the two were merged. The old URL was live, so
      // it points at the merged project rather than 404ing.
      {
        source: '/portfolio/screened-terrace',
        destination: '/portfolio/cobblestone-drive',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // The layout studio is a static tool in public/studio. This lets it
      // answer on /studio as well as /studio/index.html. It carries a noindex
      // meta tag, so it stays out of search.
      { source: '/studio', destination: '/studio/index.html' },
    ];
  },
};

export default nextConfig;

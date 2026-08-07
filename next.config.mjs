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
};

export default nextConfig;

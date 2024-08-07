/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "lastfm.freetls.fastly.net" },

      { protocol: "https", hostname: "i.scdn.co" },
    ],
  },
};
export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["github.githubassets.com"],
  },
};

module.exports = nextConfig;

// module.exports = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "github.githubassets.com",
//         port: "",
//         pathname: "/account123/**",
//       },
//     ],
//   },
// };

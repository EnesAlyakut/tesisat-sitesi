/** @type {import('next').NextConfig} */
const isExport = process.env.NEXT_EXPORT === "true";

const nextConfig = {
  ...(isExport ? { output: "export" } : {}),
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 390, 430, 768, 1024, 1280, 1440, 1920],
  },
};
export default nextConfig;

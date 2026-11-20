import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A plain static site: `next build` writes HTML/CSS/JS to `out/`, no server needed.
  output: "export",
  // Each page becomes `page/index.html`, which static hosts serve without extra setup.
  trailingSlash: true,
  // Image optimization needs a server; static export serves images as they are.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

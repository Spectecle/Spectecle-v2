import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // 60 is used for full-bleed photos under dark overlays, where the lower quality isn't visible.
    qualities: [60, 75],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/pricing",
        destination: "/services",
        permanent: true,
      },
      // Old site URLs. Trailing-slash variants are handled by Next's
      // built-in trailing-slash redirect before these run.
      { source: "/company", destination: "/about", permanent: true },
      { source: "/client-support", destination: "/portal", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terms-conditions", destination: "/terms", permanent: true },
      // More old URLs still getting Search Console impressions (GSC, Nov 2026).
      { source: "/how-to-seo-rank-in-detroit-and-build-traffic", destination: "/services/seo-agency-detroit", permanent: true },
      { source: "/blog-importance-of-social-media-marketing", destination: "/blog", permanent: true },
      { source: "/blog-how-pay-per-click-works", destination: "/blog", permanent: true },
      { source: "/blog-list", destination: "/blog", permanent: true },
      { source: "/portfolio/:path*", destination: "/work", permanent: true },
      { source: "/our-portfolio", destination: "/work", permanent: true },
      { source: "/government-services", destination: "/services", permanent: true },
      { source: "/customizations", destination: "/services", permanent: true },
      { source: "/services-2", destination: "/services", permanent: true },
      // One host: www → apex.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.spectecle.com" }],
        destination: "https://spectecle.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

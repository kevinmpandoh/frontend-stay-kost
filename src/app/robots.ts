// app/robots.ts

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/dashboard/*", "/user", "/user/*"],
    },
    sitemap: "https://www.staykost.my.id/sitemap.xml",
  };
}

// app/sitemap.ts

import { kostService } from "@/features/kost/services/kost.service";

export default async function sitemap() {
  const baseUrl = "https://www.staykost.my.id";
  const kosts = await kostService.getKostList({ limit: 1000 });

  const kostUrls = kosts.map((kost: any) => ({
    url: `${baseUrl}/kost/${kost.slug}`,
    lastModified: kost.updatedAt || new Date(),
    priority: 0.9,
  }));

  return [
    { url: `${baseUrl}`, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/login`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/register`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/kosts`, lastModified: new Date(), priority: 0.9 },
    ...kostUrls,
  ];
}

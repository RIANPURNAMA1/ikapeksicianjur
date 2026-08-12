import type { MetadataRoute } from "next";
import { apiFetch } from "@/lib/api";
import type { BeritaCard } from "@/lib/news";
import { siteUrl } from "@/lib/seo";
import { alumniList } from "@/data/alumni";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const now = new Date();

  const staticPages: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/tentang", priority: 0.8, changeFrequency: "monthly" },
    { path: "/program", priority: 0.8, changeFrequency: "monthly" },
    { path: "/pendataan", priority: 0.8, changeFrequency: "monthly" },
    { path: "/alumni", priority: 0.7, changeFrequency: "weekly" },
    { path: "/berita", priority: 0.8, changeFrequency: "daily" },
    { path: "/kegiatan", priority: 0.7, changeFrequency: "weekly" },
    { path: "/galeri", priority: 0.6, changeFrequency: "weekly" },
    { path: "/kontak", priority: 0.7, changeFrequency: "yearly" },
  ];

  const entries: MetadataRoute.Sitemap = staticPages.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  try {
    const data = await apiFetch<{ berita: BeritaCard[] }>("/api/berita-publik?per_page=100");
    data.berita.forEach((item) => {
      entries.push({
        url: `${base}/berita/${item.slug}`,
        lastModified: new Date(item.tanggal_iso),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    });
  } catch {
    // Sitemap tetap valid walau berita gagal dimuat.
  }

  alumniList.forEach((alumni) => {
    entries.push({
      url: `${base}/alumni/${alumni.id}`,
      changeFrequency: "monthly",
      priority: 0.4,
    });
  });

  return entries;
}

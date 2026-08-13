import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import OrganizationStory from "@/components/about/OrganizationStory";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: { absolute: "Tentang IKAPEKSI Cianjur" },
  description:
    "Profil Ikatan Alumni Pemagangan Kerja Sistem Indonesia (IKAPEKSI) DPC Cianjur — sejarah, visi, misi, dan peran organisasi alumni pemagangan kerja luar negeri asal Kabupaten Cianjur.",
  path: "/tentang",
});

export default function TentangPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: "Beranda", path: "/" },
            { name: "Tentang IKAPEKSI Cianjur", path: "/tentang" },
          ],
        })}
      />
      <AboutHero />
      <OrganizationStory />
    </>
  );
}

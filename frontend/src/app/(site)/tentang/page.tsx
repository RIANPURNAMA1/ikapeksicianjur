import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import OrganizationStory from "@/components/about/OrganizationStory";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Tentang Kami",
  description:
    "Profil Ikatan Alumni Pemagangan Kerja Sistem Indonesia (IKAPEKSI) DPC Cianjur — sejarah, visi, misi, dan peran organisasi alumni pemagangan kerja luar negeri.",
  path: "/tentang",
});

export default function TentangPage() {
  return (
    <>
      <AboutHero />
      <OrganizationStory />
    </>
  );
}

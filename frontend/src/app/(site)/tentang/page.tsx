import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import OrganizationStory from "@/components/about/OrganizationStory";

export const metadata: Metadata = { title: "Tentang Kami" };

export default function TentangPage() {
  return (
    <>
      <AboutHero />
      <OrganizationStory />
    </>
  );
}

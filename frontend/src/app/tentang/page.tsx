import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import OrganizationStory from "@/components/about/OrganizationStory";
import VisionMission from "@/components/about/VisionMission";
import OrganizationValues from "@/components/about/OrganizationValues";
import OrganizationStructure from "@/components/about/OrganizationStructure";

export const metadata: Metadata = { title: "Tentang Kami" };

export default function TentangPage() {
  return (
    <>
      <AboutHero />
      <OrganizationStory />
      <VisionMission />
      <OrganizationValues />
      <OrganizationStructure />
    </>
  );
}

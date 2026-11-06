import Hero from "@/components/home/Hero";
import Statistics from "@/components/home/Statistics";
import AboutPreview from "@/components/home/AboutPreview";
import OrganizationStructureSection from "@/components/home/OrganizationStructureSection";
import WhyIkapeksi from "@/components/home/WhyIkapeksi";
import VisionMissionPreview from "@/components/home/VisionMissionPreview";
import ProgramSection from "@/components/home/ProgramSection";
import OrganizationCommitment from "@/components/home/OrganizationCommitment";
import ProgramPreview from "@/components/home/ProgramPreview";
import AlumniPreview from "@/components/home/AlumniPreview";
import ActivityPreview from "@/components/home/ActivityPreview";
import NewsPreview from "@/components/home/NewsPreview";
import GalleryPreview from "@/components/home/GalleryPreview";
import Testimonial from "@/components/home/Testimonial";
import JoinSection from "@/components/home/JoinSection";
import { buildMetadata, SITE_SEO_DESCRIPTION, SITE_TITLE } from "@/lib/seo";
import { apiFetch } from "@/lib/api";
import { FALLBACK_KEGIATAN, type KegiatanCard } from "@/lib/kegiatan";

// Konten kegiatan dikelola dari admin, jadi halaman selalu mengambil data terbaru.
export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: { absolute: SITE_TITLE },
  description: SITE_SEO_DESCRIPTION,
  path: "/",
});

export default async function HomePage() {
  let kegiatan: KegiatanCard[] = FALLBACK_KEGIATAN;

  try {
    const data = await apiFetch<{ kegiatan: KegiatanCard[] }>(
      "/api/kegiatan-publik?per_page=12"
    );
    kegiatan = data.kegiatan;
  } catch {
    // Tampilkan data cadangan bila API belum dapat diakses.
  }

  return (
    <>
      <Hero />
      {/* <Statistics /> */}
      <AboutPreview />
      <OrganizationStructureSection />
      <div className="bg-[#070707]">
        {/* <WhyIkapeksi /> */}
        <VisionMissionPreview />
        <ProgramSection />
        <OrganizationCommitment />
        <ProgramPreview items={kegiatan} />
        <JoinSection />
      </div>
      {/* <ProgramPreview />
      <AlumniPreview />
      <ActivityPreview />
      <GalleryPreview />
      <Testimonial /> */}
      {/* <NewsPreview /> */}
    </>
  );
}

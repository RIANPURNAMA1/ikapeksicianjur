import Hero from "@/components/home/Hero";
import Statistics from "@/components/home/Statistics";
import AboutPreview from "@/components/home/AboutPreview";
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
import { buildMetadata } from "@/lib/seo";
import { apiFetch } from "@/lib/api";
import { FALLBACK_KEGIATAN, type KegiatanCard } from "@/lib/kegiatan";

// Konten kegiatan dikelola dari admin, jadi halaman selalu mengambil data terbaru.
export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: { absolute: "DPC IKAPEKSI KABUPATEN CIANJUR | Merajut Alumni, Membangun Cianjur" },
  description:
    "IKAPEKSI Cianjur — Ikatan Alumni Pemagangan Kerja Sistem Indonesia DPC Cianjur. Wadah silaturahmi dan pemberdayaan alumni pemagangan kerja luar negeri asal Kabupaten Cianjur. Daftarkan diri Anda di sini.",
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

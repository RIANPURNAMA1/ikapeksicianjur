import Hero from "@/components/home/Hero";
import Statistics from "@/components/home/Statistics";
import AboutPreview from "@/components/home/AboutPreview";
import WhyIkapeksi from "@/components/home/WhyIkapeksi";
import VisionMissionPreview from "@/components/home/VisionMissionPreview";
import ProgramPreview from "@/components/home/ProgramPreview";
import AlumniPreview from "@/components/home/AlumniPreview";
import ActivityPreview from "@/components/home/ActivityPreview";
import NewsPreview from "@/components/home/NewsPreview";
import GalleryPreview from "@/components/home/GalleryPreview";
import Testimonial from "@/components/home/Testimonial";
import Reveal from "@/components/ui/Reveal";
import JoinSection from "@/components/home/JoinSection";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: { absolute: "IKAPEKSI Cianjur | Merajut Alumni, Membangun Cianjur" },
  description:
    "IKAPEKSI Cianjur — Ikatan Alumni Pemagangan Kerja Sistem Indonesia DPC Cianjur. Wadah silaturahmi dan pemberdayaan alumni pemagangan kerja luar negeri asal Kabupaten Cianjur. Daftarkan diri Anda di sini.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Reveal>
        <Hero />
      </Reveal>
      {/* <Statistics /> */}
      <Reveal>
        <AboutPreview />
      </Reveal>
      <Reveal>
        <div className="bg-[linear-gradient(to_bottom,#120708_0%,#1a0a0d_35%,#200c10_65%,#0a0304_100%)]">
          <WhyIkapeksi />
          <VisionMissionPreview />
          <JoinSection />
        </div>
      </Reveal>
      {/* <ProgramPreview />
      <AlumniPreview />
      <ActivityPreview />
      <GalleryPreview />
      <Testimonial /> */}
      {/* <Reveal>
        <NewsPreview />
      </Reveal> */}
    </>
  );
}

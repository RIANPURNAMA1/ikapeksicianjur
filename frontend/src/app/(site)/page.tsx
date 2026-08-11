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
        <WhyIkapeksi />
      </Reveal>
      <Reveal>
        <VisionMissionPreview />
      </Reveal>
      <Reveal>
        <JoinSection />
      </Reveal>
      {/* <ProgramPreview />
      <AlumniPreview />
      <ActivityPreview /> */}
      {/* <NewsPreview />
      <GalleryPreview />
      <Testimonial /> */}
    </>
  );
}

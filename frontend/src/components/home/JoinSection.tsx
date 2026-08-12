import Image from "next/image";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function JoinSection() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-16 sm:py-24">
      <Container>
        {/* Main Card / Bounding Box - Memberikan tampilan Modern Premium */}
        <div className="">
          
          {/* Background Pattern - Inline SVG untuk menghindari dependency custom config Tailwind */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H24V24H0V0Z' fill='none'/%3E%3Cpath d='M23 1V23H1V1H23ZM24 0H0V24H24V0Z' fill='white'/%3E%3C/svg%3E")`,
              backgroundSize: "12px 12px",
              WebkitMaskImage: "linear-gradient(to top, black 0%, black 60%, transparent 100%)",
              maskImage: "linear-gradient(to top, black 0%, black 60%, transparent 100%)",
            }}
          />

          {/* Ambient Glow - Diposisikan strategis agar tidak bentrok dengan teks */}
          
          <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[#C62930]/10 blur-[100px]" />

          <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-end gap-8 px-6 pt-12 sm:px-12 sm:pt-16 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:pt-20">
            
            {/* Kolom Konten Teks */}
            <div className="order-1 flex flex-col items-center pb-12 text-center lg:order-2 lg:items-start lg:pb-24 lg:text-left">
              
              {/* Eyebrow Tag dengan Pulsing Animation */}
              <Reveal delay={0}>
                <div className=" inline-flex items-center gap-2.5  px-1 py-1.5 text-xs font-bold tracking-[0.15em] text-[#e8555c] backdrop-blur-md">
                  
                  MARI BERGABUNG
                </div>
              </Reveal>
              
              {/* Judul Utama dengan Balance Text Property (Native Tailwind / CSS) */}
              <Reveal delay={150}>
                <h2 className="text-balance font-mona text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl lg:leading-[1.15]">
                  Alumni Pemagangan Kerja Asal Cianjur? <br className="hidden sm:block" />
                  <span className="mt-2 inline-block bg-gradient-to-r from-[#C62930] to-[#ff7e84] bg-clip-text text-transparent">
                    Daftarkan Diri Anda.
                  </span>
                </h2>
              </Reveal>

              {/* Deskripsi */}
              <Reveal delay={300}>
                <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-400 sm:text-lg">
                  Perluas jejaring, ikuti kegiatan eksklusif, dan berkontribusi untuk kampung halaman bersama ratusan alumni lainnya dalam satu platform.
                </p>
              </Reveal>

              {/* Tombol Aksi (CTA) - Peningkatan UI pada state Hover */}
              <Reveal delay={450}>
                <div className="mt-10 flex w-full flex-col sm:w-auto sm:flex-row sm:items-center">
                <Button
                  href="/kontak"
                  size="lg"
                  className="group btn-shine relative flex w-full items-center justify-center gap-3 overflow-hidden !rounded-full bg-[#C62930] !px-8 py-4 font-semibold text-white shadow-[0_0_30px_rgba(198,41,48,0.25)] transition-all duration-300 hover:bg-[#a52127] hover:shadow-[0_0_40px_rgba(198,41,48,0.4)] sm:w-auto"
                >
                  Hubungi Kami Sekarang
                  <svg 
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              </div>
              </Reveal>
            </div>

            {/* Kolom Gambar */}
            <Reveal delay={600} className="order-2 lg:order-1">
              <div className="relative mx-auto w-full max-w-[340px] lg:max-w-none">
                <div className="relative pt-8 lg:pt-0">
                  <Image
                    src="/images/carausel/talent-cs.webp"
                    alt="Alumni pemagangan kerja IKAPEKSI"
                    width={996}
                    height={1352}
                    quality={90} // Optimasi performa dan ketajaman gambar
                    priority // Penting untuk hero/featured image agar LCP (Largest Contentful Paint) bagus
                    className="relative z-10 h-auto w-full object-contain object-bottom drop-shadow-2xl transition-transform duration-700 "
                  />
                  {/* Gradient Masking di bagian bawah gambar agar blending dengan background card halus */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 h-24 bg-gradient-to-t from-[#0a0304] to-transparent" />
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </Container>
    </section>
  );
}
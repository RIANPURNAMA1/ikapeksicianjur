import Image from "next/image";
import Container from "@/components/layout/Container";
import { SITE } from "@/lib/constants";

export default function AboutHero() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-[#0a0304] text-white sm:min-h-[65vh]">

      {/* =========================================
          BACKGROUND IMAGE
          ========================================= */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/carausel/carausel.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.16]"
        />
      </div>

      {/* =========================================
          DARK GRADIENT OVERLAY
          ========================================= */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#0a0304]/80 via-[#0a0304]/70 to-[#0a0304]" />

      {/* =========================================
          RED AMBIENT GLOW
          ========================================= */}
      <div className="pointer-events-none absolute left-[-180px] top-1/2 z-[2] h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-[#C62930]/10 blur-[130px]" />

      <div className="pointer-events-none absolute bottom-[-200px] right-[-150px] z-[2] h-[450px] w-[450px] rounded-full bg-[#C62930]/10 blur-[130px]" />

      {/* =========================================
          BACKGROUND GRID / PATTERN
          Fade atas & bawah
          ========================================= */}
      <div
        className="pointer-events-none absolute inset-0 z-[3] opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H24V24H0V0Z' fill='none'/%3E%3Cpath d='M23 1V23H1V1H23ZM24 0H0V24H24V0Z' fill='white'/%3E%3C/svg%3E")`,
          backgroundSize: "12px 12px",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 12%, black 30%, black 70%, rgba(0,0,0,0.35) 88%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 12%, black 30%, black 70%, rgba(0,0,0,0.35) 88%, transparent 100%)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      />

      {/* =========================================
          CONTENT
          ========================================= */}
      <Container className="relative z-10 py-28 sm:py-32 lg:py-36">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#C62930]" />

            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#e8555c]">
              Tentang Kami
            </span>
          </div>

          {/* Heading */}
          <h1 className="mt-7 text-balance font-mona text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Mengenal{" "}
            <span className="bg-gradient-to-r from-white via-white to-[#ff7e84] bg-clip-text text-transparent">
              {SITE.name}
            </span>{" "}
            <br className="hidden sm:block" />
            Lebih Dekat
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            {SITE.description}
          </p>

          {/* Bottom Meta */}
          <div className="mt-10 flex items-center gap-4">
            <div className="h-10 w-[2px] bg-gradient-to-b from-[#C62930] to-transparent" />

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                IKAPEKSI Cianjur
              </p>

              <p className="mt-1 text-sm text-zinc-400">
                Bersama membangun potensi dan kontribusi untuk Cianjur
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* =========================================
          BOTTOM FADE
          ========================================= */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-32 bg-gradient-to-t from-[#0a0304] to-transparent" />

      {/* =========================================
          BOTTOM LINE
          ========================================= */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-gradient-to-r from-transparent via-[#C62930]/40 to-transparent" />
    </section>
  );
}
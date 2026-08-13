"use client";

import Image from "next/image";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n";

export default function JoinSection() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-16 sm:py-24">
      <Container>
        {/* =========================================
            BACKGROUND PATTERN
            Fade halus dari atas dan bawah
            ========================================= */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H24V24H0V0Z' fill='none'/%3E%3Cpath d='M23 1V23H1V1H23ZM24 0H0V24H24V0Z' fill='white'/%3E%3C/svg%3E")`,
            backgroundSize: "12px 12px",

            // Fade atas → tengah → bawah
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 12%, black 30%, black 70%, rgba(0,0,0,0.35) 88%, transparent 100%)",

            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 12%, black 30%, black 70%, rgba(0,0,0,0.35) 88%, transparent 100%)",

            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        />

        {/* =========================================
            AMBIENT RED GLOW
            ========================================= */}
        <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-[400px] w-[400px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[#C62930]/10 blur-[100px]" />

        {/* =========================================
            MAIN CONTENT
            ========================================= */}
        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-end gap-8 px-6 pt-12 sm:px-12 sm:pt-16 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:pt-20">

          {/* =========================================
              KOLOM KONTEN TEKS
              ========================================= */}
          <div className="order-2 flex flex-col items-center pb-12 text-center lg:order-2 lg:items-start lg:pb-24 lg:text-left">

            {/* Eyebrow */}
            <Reveal delay={0}>
              <div className="inline-flex items-center gap-2.5 px-1 py-1.5 text-xs font-bold tracking-[0.15em] text-[#e8555c] backdrop-blur-md">
                {t("join.eyebrow")}
              </div>
            </Reveal>

            {/* Judul */}
            <Reveal delay={150}>
              <h2 className="text-balance font-mona text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl lg:leading-[1.15]">
                {t("join.heading")}
                <br className="hidden sm:block" />
              </h2>

              <h3 className="text-balance font-mona text-3xl font-extrabold">
                <span className="mt-2 inline-block bg-gradient-to-r from-[#C62930] to-[#ff7e84] bg-clip-text text-transparent">
                  {t("join.subtitle")}
                </span>
              </h3>
            </Reveal>

            {/* Deskripsi */}
            <Reveal delay={300}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-400 sm:text-lg">
                {t("join.desc")}
              </p>
            </Reveal>

            {/* CTA */}
            <Reveal delay={450}>
              <div className="mt-10 flex w-full flex-col sm:w-auto sm:flex-row sm:items-center">
                <Button
                  href="/kontak"
                  size="lg"
                  className="group btn-shine relative flex w-full items-center justify-center gap-3 overflow-hidden !rounded-full bg-[#C62930] !px-8 py-4 font-semibold text-white shadow-[0_0_30px_rgba(198,41,48,0.25)] transition-all duration-300 hover:bg-[#a52127] hover:shadow-[0_0_40px_rgba(198,41,48,0.4)] sm:w-auto"
                >
                  {t("join.cta")}

                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.198.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </Button>
              </div>
            </Reveal>
          </div>

          {/* =========================================
              KOLOM GAMBAR TALENT
              ========================================= */}
          <Reveal
            delay={600}
            className="order-1 lg:order-1"
          >
            <div className="relative mx-auto w-full max-w-[340px] lg:max-w-none">

              <div className="relative pt-8 lg:pt-0">

                {/* Talent Image */}
                <Image
                  src="/images/carausel/talent-cs.webp"
                  alt="Alumni pemagangan kerja IKAPEKSI"
                  width={996}
                  height={1352}
                  quality={90}
                  priority
                  className="relative z-10 h-auto w-full object-contain object-bottom drop-shadow-2xl transition-transform duration-700"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 55%, black 65%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0.45) 85%, transparent 100%)",

                    maskImage:
                      "linear-gradient(to bottom, black 55%, black 65%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0.45) 85%, transparent 100%)",
                  }}
                />

              </div>
            </div>
          </Reveal>

        </div>
      </Container>
    </section>
  );
}
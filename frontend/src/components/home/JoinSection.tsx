"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n";

export default function JoinSection() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden text-white bg-transparent">
      
      {/* =========================================
          BACKGROUND PATTERN
          ========================================= */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
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
          AMBIENT RED GLOW
          ========================================= */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-[400px] w-[400px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[#C62930]/10 blur-[100px]" />

      {/* =========================================
          GRID UTAMA (3 KOLOM):
          Mempertahankan garis vertikal konsisten di sisi kiri dan kanan layar.
          ========================================= */}
      <div className="relative z-10 flex w-full flex-1 border-t border-b border-white/10">

        {/* Kolom 1: Ruang Kosong Kiri (Garis Vertikal Kiri) */}
        <div className="border-stripe-r hidden md:block w-[3%] lg:w-[4%] xl:w-[10%] 2xl:w-[15%] bg-white/[0.02] backdrop-blur-sm shrink-0" />

        {/* Kolom 2: Konten Tengah */}
        <div className="flex-1 w-full grid grid-cols-1 content-center items-end gap-8 py-16 sm:py-24 px-6 sm:px-12 lg:grid-cols-2 lg:gap-16 lg:px-10 xl:px-24 bg-white/[0.02] backdrop-blur-sm">

          {/* =========================================
              KOLOM KONTEN TEKS
              ========================================= */}
          <div className="order-2 flex flex-col items-center pb-12 text-center lg:order-2 lg:items-start lg:pb-24 lg:text-left">

            {/* Eyebrow */}
            <Reveal delay={0}>
              <div className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.15em] text-[#e8555c]">
                {t("join.eyebrow")}
              </div>
            </Reveal>

            {/* Judul */}
            <Reveal delay={150}>
              <h2 className="text-balance font-mona text-3xl font-normal leading-tight text-white sm:text-4xl md:text-5xl lg:leading-[1.15]">
                {t("join.heading")}
                <br className="hidden sm:block" />
              </h2>

              <h3 className="text-balance font-mona text-3xl font-normal">
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
                  href="/pendataan"
                  size="lg"
                  className="group btn-shine relative flex w-full items-center justify-center gap-3 overflow-hidden !rounded-full bg-[#C62930] !px-8 py-4 font-semibold text-white shadow-[0_0_30px_rgba(198,41,48,0.25)] transition-all duration-300 hover:bg-[#a52127] hover:shadow-[0_0_40px_rgba(198,41,48,0.4)] sm:w-auto"
                >
                  {t("join.cta")}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* =========================================
              KOLOM GAMBAR TALENT
              ========================================= */}
          <Reveal
            delay={600}
            className="order-1 lg:order-1 flex justify-center"
          >
            <div className="relative mx-auto w-full max-w-[340px] lg:max-w-[400px]">
              <div className="relative pt-8 lg:pt-0">
                <Image
                  src="/images/join/tallent4-nobg.png"
                  alt="Alumni pemagangan kerja IKAPEKSI"
                  width={1632}
                  height={2555}
                  quality={90}
                  priority
                  className="relative z-10 h-auto w-full object-contain object-bottom drop-shadow-2xl transition-transform duration-700"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 0%, black 78%, rgba(0,0,0,0.7) 90%, transparent 100%)",
                    maskImage:
                      "linear-gradient(to bottom, black 0%, black 78%, rgba(0,0,0,0.7) 90%, transparent 100%)",
                  }}
                />
              </div>
            </div>
          </Reveal>

        </div>

        {/* Kolom 3: Ruang Kosong Kanan (Garis Vertikal Kanan) */}
        <div className="border-stripe-l hidden md:block w-[3%] lg:w-[4%] xl:w-[10%] 2xl:w-[15%] bg-white/[0.02] backdrop-blur-sm shrink-0" />

      </div>
    </section>
  );
}
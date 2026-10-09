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
        <div className="flex-1 w-full grid grid-cols-1 content-center items-end gap-6 py-12 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:px-10 xl:px-20 px-6 sm:px-10 bg-white/[0.02] backdrop-blur-sm">

          {/* =========================================
              KOLOM KONTEN TEKS
              ========================================= */}
          <div className="order-2 flex flex-col items-center pb-8 text-center lg:order-2 lg:items-start lg:pb-14 lg:text-left">

            {/* Eyebrow */}
            <Reveal delay={0}>
              <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] text-[#e8555c] sm:text-xs">
                {t("join.eyebrow")}
              </div>
            </Reveal>

            {/* Judul */}
            <Reveal delay={150}>
              <h2 className="text-balance font-mona text-2xl font-extrabold leading-tight text-white sm:text-3xl md:text-4xl lg:text-[2.15rem] lg:leading-[1.15] xl:text-[2.5rem]">
                {t("join.heading")}
                <br className="hidden sm:block" />
              </h2>

              <h3 className="text-balance font-mona text-2xl font-extrabold sm:text-3xl md:text-4xl lg:text-[2.15rem] xl:text-[2.5rem]">
                <span className="mt-1.5 inline-block bg-gradient-to-r from-[#C62930] to-[#ff7e84] bg-clip-text text-transparent">
                  {t("join.subtitle")}
                </span>
              </h3>
            </Reveal>

            {/* Deskripsi */}
            <Reveal delay={300}>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400 sm:max-w-md sm:text-base">
                {t("join.desc")}
              </p>
            </Reveal>

            {/* CTA */}
            <Reveal delay={450}>
              <div className="mt-7 flex w-full flex-col sm:w-auto sm:flex-row sm:items-center">
                <Button
                  href="/pendataan"
                  size="lg"
                  className="group btn-shine relative flex w-full items-center justify-center gap-3 overflow-hidden !rounded-full bg-[#C62930] !px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(198,41,48,0.25)] transition-all duration-300 hover:bg-[#a52127] hover:shadow-[0_0_40px_rgba(198,41,48,0.4)] sm:w-auto sm:text-base"
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
            <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[340px] xl:max-w-[380px]">
              <div className="relative pt-6 lg:pt-0">

                {/* Glow merah tipis di belakang kaki talent (opsional, hapus jika tidak perlu) */}
                <div className="pointer-events-none absolute inset-x-6 bottom-0 z-0 h-1/3 rounded-full bg-[#C62930]/15 blur-[80px]" />

                <Image
                  src="/images/join/tallent4.png"
                  alt="Alumni pemagangan kerja IKAPEKSI"
                  width={640}
                  height={962}
                  quality={90}
                  priority
                  className="relative z-10 h-auto w-full object-contain object-bottom drop-shadow-2xl"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 0%, black 62%, rgba(0,0,0,0.85) 72%, rgba(0,0,0,0.55) 82%, rgba(0,0,0,0.22) 92%, transparent 100%)",
                    maskImage:
                      "linear-gradient(to bottom, black 0%, black 62%, rgba(0,0,0,0.85) 72%, rgba(0,0,0,0.55) 82%, rgba(0,0,0,0.22) 92%, transparent 100%)",
                  }}
                />

                {/* Overlay #070707 dihapus: mask di atas sudah membuat bagian bawah
                    gambar transparan sehingga menyatu dengan background section */}
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
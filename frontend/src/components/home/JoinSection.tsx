"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Container from "@/components/layout/Container";
import { useLanguage } from "@/lib/i18n";

/*
  Token warna:
  merah   #E3202B (hover #C62930)
  kuning  #FEDC00
  navy    #111827
  surface #F9FAFB
*/

export default function JoinSection() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full bg-[#F9FAFB] py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-[#111827] px-6 py-10 shadow-[0_24px_48px_-16px_rgba(17,24,39,0.45)] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          {/* Pola titik halus */}
          <div
            className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:22px_22px]"
            aria-hidden="true"
          />
          {/* Cahaya merah halus */}
          <div
            className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-[#E3202B]/15 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* =========================================
                KIRI: TEKS + CTA
                ========================================= */}
            <div className="flex flex-col lg:col-span-7">
              {/* Eyebrow */}
              <Reveal delay={0}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-md bg-[#FEDC00] px-3 py-1.5 text-[12px] font-bold uppercase leading-4 tracking-[0.04em] text-[#0A0304]">
                    {t("join.eyebrow")}
                  </span>
                  <span className="text-[13px] leading-5 text-[#D1D5DB]">
                    Terbuka Untuk Seluruh Angkatan
                  </span>
                </div>
              </Reveal>

              {/* Judul */}
              <Reveal delay={150}>
                <h2 className="mt-6 font-jakarta text-[32px] font-extrabold leading-[38px] tracking-[-0.03em] text-[#FFFFFF] sm:text-[44px] sm:leading-[50px] lg:text-[52px] lg:leading-[58px]">
                  {t("join.heading")}
                  <span className="block text-[#FEDC00]">
                    {t("join.subtitle")}
                  </span>
                </h2>
              </Reveal>

              {/* Deskripsi */}
              <Reveal delay={300}>
                <p className="mt-6 max-w-2xl text-[16px] leading-[26px] text-[#D1D5DB] sm:text-[18px] sm:leading-[28px]">
                  {t("join.desc")}
                </p>
              </Reveal>

              {/* CTA */}
              <Reveal delay={450}>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                  <Button
                    href="/pendataan"
                    className="inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#E3202B] px-6 py-3.5 text-[15px] font-semibold tracking-[0.01em] text-[#FFFFFF] shadow-md transition-colors hover:bg-[#C62930] sm:w-auto"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="m16 11 2 2 4-4" />
                    </svg>
                    {t("join.cta")}
                  </Button>

                  <Button
                    href="https://wa.me/62895391685825"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2.5 rounded-lg border border-[#FFFFFF]/15 bg-[#FFFFFF]/5 px-6 py-3.5 text-[15px] font-semibold tracking-[0.01em] text-[#FFFFFF] transition-colors hover:bg-[#FFFFFF]/10 sm:w-auto"
                  >
                    <svg
                      className="h-5 w-5 text-[#FEDC00]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      <path d="M8 9h8M8 13h5" />
                    </svg>
                    +62 895-3916-85825
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* =========================================
                KANAN: KARTU FOTO TALENT
                ========================================= */}
            <Reveal delay={600} className="lg:col-span-5">
              <div className="relative mx-auto flex h-[340px] w-full max-w-[420px] items-end justify-center overflow-hidden  sm:h-[400px] lg:h-[420px] lg:max-w-none">
                {/* Glow merah di belakang talent */}
                <div
                  className="pointer-events-none absolute inset-x-8 bottom-0 h-2/3 rounded-full  blur-[70px]"
                  aria-hidden="true"
                />

                <Image
                  src="/images/join/tallent4.png"
                  alt="Alumni pemagangan kerja IKAPEKSI"
                  width={640}
                  height={962}
                  quality={90}
                  priority
                  sizes="(min-width: 1024px) 35vw, 80vw"
                  className="relative z-10 h-[100%] w-auto object-contain object-bottom drop-shadow-2xl"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
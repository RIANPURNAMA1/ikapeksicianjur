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
                    aria-label="+62 895-3916-85825"
                    className="inline-flex w-full items-center justify-center rounded-full border border-[#FFFFFF]/15 bg-[#25D366] p-3.5 text-[#FFFFFF] transition-colors hover:bg-[#1ebe57] sm:w-auto"
                  >
                    <svg
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.25h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
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
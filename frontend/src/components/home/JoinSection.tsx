"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Container from "@/components/layout/Container";

/*
  Token warna:
  merah   #E3202B (hover #C62930)
  kuning  #FEDC00
  hitam   #0A0304 (bg kartu)
  putih   #FFFFFF (latar section)

  Font: Poppins (font-sans)
*/

export default function JoinSection() {
  return (
    <section className="relative w-full bg-[rgb(249,250,251)] py-12 font-sans antialiased sm:py-16 lg:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-md bg-[#0A0304] shadow-[0_24px_48px_-16px_rgba(10,3,4,0.45)]">
          {/* Pola titik halus */}
          <div
            className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:22px_22px]"
            aria-hidden="true"
          />
          {/* Cahaya merah kanan bawah */}
          <div
            className="pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-[#E3202B]/20 blur-3xl"
            aria-hidden="true"
          />
          {/* Cahaya kuning kiri atas */}
          <div
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#FEDC00]/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 lg:items-stretch">
            {/* =========================================
                KIRI: TALENT
                ========================================= */}
            <Reveal delay={0} className="lg:col-span-5">
              <div className="relative flex h-full min-h-[360px] items-end justify-center px-6 pt-10 sm:min-h-[440px] lg:min-h-[520px] lg:px-0 lg:pt-0">
                {/* Lingkaran kuning di belakang talent */}
                <div
                  className="absolute bottom-0 left-1/2 h-[300px] w-[300px] -translate-x-1/2 translate-y-1/4 rounded-full bg-gradient-to-b from-[#FEDC00] to-[#F5B800] sm:h-[360px] sm:w-[360px] lg:h-[400px] lg:w-[400px]"
                  aria-hidden="true"
                />
                {/* Cincin tipis */}
                <div
                  className="absolute bottom-0 left-1/2 h-[360px] w-[360px] -translate-x-1/2 translate-y-1/4 rounded-full border border-white/15 sm:h-[430px] sm:w-[430px] lg:h-[480px] lg:w-[480px]"
                  aria-hidden="true"
                />

                <Image
                  src="/images/join/cta.png"
                  alt="Alumni pemagangan kerja IKAPEKSI"
                  width={640}
                  height={962}
                  quality={90}
                  priority
                  sizes="(min-width: 1024px) 40vw, 80vw"
                  className="relative z-10 h-[340px] w-auto object-contain object-bottom drop-shadow-2xl sm:h-[420px] lg:h-[500px]"
                />
              </div>
            </Reveal>

            {/* =========================================
                KANAN: TEKS + CTA
                ========================================= */}
            <div className="flex flex-col justify-center px-6 pb-10 pt-8 sm:px-10 sm:pb-12 lg:col-span-7 lg:py-14 lg:pl-12 lg:pr-14">
              {/* Eyebrow */}
              <Reveal delay={150}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-md bg-[#FEDC00] px-3 py-1.5 text-[11px] font-bold uppercase leading-4 tracking-[0.06em] text-[#0A0304]">
                    Mari Bergabung
                  </span>
                  <span className="text-[13px] leading-5 text-[#D1D5DB]">
                    Terbuka Untuk Seluruh Pejuang Anggota Jepang
                  </span>
                </div>
              </Reveal>

              {/* Judul */}
              <Reveal delay={250}>
                <h2 className="mt-6 text-[32px] font-extrabold leading-[38px] tracking-[-0.035em] text-white sm:text-[42px] sm:leading-[48px] lg:text-[48px] lg:leading-[54px]">
                  Alumni &amp; Pejuang Jepang
                  <span className="block text-[#FEDC00]">
                    Daftarkan Diri Anda!
                  </span>
                </h2>
              </Reveal>

              {/* Deskripsi */}
              <Reveal delay={350}>
                <p className="mt-6 max-w-xl text-[15px] leading-[26px] text-[#D1D5DB] sm:text-[16px] sm:leading-[28px]">
                  Perluas jejaring, ikuti kegiatan eksklusif, dan berkontribusi
                  untuk kampung halaman bersama ratusan alumni lainnya dalam
                  satu platform.
                </p>
              </Reveal>

              {/* CTA */}
              <Reveal delay={450}>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                  <Button
                    href="/pendataan"
                    className="group inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#E3202B] px-6 py-3.5 text-[15px] font-semibold tracking-[0.01em] text-white shadow-md transition-colors hover:bg-[#C62930] sm:w-auto"
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
                    Daftar Jadi Anggota
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.25}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
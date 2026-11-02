"use client";

import Image from "next/image";
import Container from "@/components/layout/Container";
import Reveal from "@/components/ui/Reveal";

/*
  Token warna:
  merah   #E3202B (hover #C62930, tint #FFDAD6)
  kuning  #FEDC00
  ink     #0A0304
  muted   #4B5563
  surface #F9FAFB / #F3F4F6

  Font: Plus Jakarta Sans (font-jakarta) untuk seluruh teks section ini
*/

export default function AboutPreview() {
  return (
    <section
      id="tentang"
      className="relative w-full scroll-mt-20 overflow-hidden bg-[#FFFFFF] py-16 font-jakarta text-[#0A0304] antialiased sm:py-20 lg:py-24"
    >
      <Container size="wide">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* =========================================
              KIRI: GAMBAR + FLOATING CARD
              ========================================= */}
          <div className="relative order-2 pb-10 lg:order-1">
            <Reveal delay={100}>
              <div className="relative">
                {/* Pola titik dekoratif */}
                <div
                  aria-hidden="true"
                  className="absolute -bottom-6 -right-6 hidden h-32 w-32 [background-image:radial-gradient(#E3202B_1.5px,transparent_1.5px)] [background-size:14px_14px] opacity-30 sm:block"
                />

                {/* Aksen latar */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-3 -translate-y-3 rounded-3xl bg-[#FFDAD6] lg:-translate-x-5 lg:-translate-y-5"
                />

                {/* Gambar utama */}
                <div className="group relative z-10 aspect-[4/3] overflow-hidden rounded-2xl bg-[#F3F4F6] shadow-[0_16px_40px_-12px_rgba(10,3,4,0.25)]">
                  <Image
                    src="/images/carausel/carausel.webp"
                    alt="Kegiatan IKAPEKSI Cianjur"
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />

                  {/* Gradasi bawah agar floating card terbaca */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0A0304]/40 to-transparent"
                  />

                  {/* Label kecil di pojok kiri atas */}
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-md bg-[#0A0304]/80 px-3 py-1.5 text-[11px] font-semibold leading-4 tracking-[-0.01em] text-[#FFFFFF] backdrop-blur">
                    <span className="h-2 w-2 rounded-full bg-[#FEDC00]" />
                    IKAPEKSI Cianjur
                  </span>
                </div>

                {/* Floating card: Sekretariat */}
                <div className="group/card absolute -bottom-10 left-4 right-4 z-20 flex items-center gap-4 rounded-2xl bg-[#FFFFFF] p-4 shadow-[0_16px_40px_-12px_rgba(10,3,4,0.25)] transition-all duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:left-8 sm:right-8 sm:p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#FFDAD6] text-[#E3202B] transition-colors duration-300 group-hover/card:bg-[#E3202B] group-hover/card:text-[#FFFFFF] motion-reduce:transition-none">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-[15px] font-semibold leading-5 tracking-[-0.02em] text-[#0A0304]">
                      Sekretariat Resmi DPC Cianjur
                    </h4>
                    <p className="mt-0.5 text-[13px] font-normal leading-5 tracking-[-0.01em] text-[#4B5563]">
                      Bumi Marhamah Blok C No 1, Karangtengah - Cianjur Jawa Barat
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* =========================================
              KANAN: TEKS + 3 POIN UTAMA
              ========================================= */}
          <div className="order-1 flex flex-col justify-center lg:order-2">
            <Reveal delay={150}>
              <span className="inline-flex w-fit items-center rounded bg-[#F3F4F6] px-3 py-1 text-[10px] font-bold uppercase leading-4 tracking-[0.02em] text-[#E3202B]">
                Tentang IKAPEKSI DPC Cianjur
              </span>

              <h2 className="mt-5 text-[32px] font-semibold leading-[40px] tracking-[-0.04em] text-[#0A0304] sm:text-[44px] sm:leading-[52px]">
                Membangun Kemandirian Berbasis Disiplin &amp;{" "}
                <span className="text-[#E3202B]">Pengalaman Jepang</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-6 space-y-4 text-[15px] font-normal leading-[26px] tracking-[-0.02em] text-[#4B5563] sm:text-[16px]">
                <p>
                  <strong className="font-semibold text-[#0A0304]">
                    IKAPEKSI (Ikatan Pengusaha Kenshusei Indonesia)
                  </strong>{" "}
                  adalah asosiasi para alumni & praktisi program magang Jepang
                  yang telah membangun usaha di Indonesia. Organisasi ini
                  berkomitmen pada pengembangan dan pemberdayaan tenaga kerja
                  magang Jepang, serta mendorong pertumbuhan wirausaha berbasis
                  pengalaman dari Jepang.
                </p>
                <p>
                  <strong className="font-semibold text-[#0A0304]">
                    IKAPEKSI DPC Kabupaten Cianjur
                  </strong>{" "}
                  adalah cabang yang bernaung di bawah DPD Jawa Barat. Kami
                  merangkul alumni dan calon peserta magang di Cianjur agar
                  saling menguatkan, berbagi peluang usaha, dan membuka jalan
                  bagi generasi berikutnya yang ingin berangkat secara resmi dan
                  aman.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

"use client";

import Image from "next/image";
import Container from "@/components/layout/Container";
import Reveal from "@/components/ui/Reveal";

const FEATURES = [
  {
    no: "1",
    title: "Penguatan Jaringan",
    desc: "Konsolidasi alumni lintas angkatan & kecamatan di Cianjur.",
  },
  {
    no: "2",
    title: "Pendampingan Peserta",
    desc: "Pembinaan pra-keberangkatan resmi, bahasa, dan etos kerja Jepang.",
  },
  {
    no: "3",
    title: "Kemitraan Pemda",
    desc: "Sinergi dengan Disnaker dalam ketenagakerjaan resmi & legal.",
  },
];

export default function AboutPreview() {
  return (
    <section
      id="tentang"
      className="relative scroll-mt-20 overflow-hidden bg-[#FAFAFA] py-16 font-jakarta text-gray-900 md:py-24"
    >
      <Container size="wide">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Kiri: Gambar & Floating Card */}
          <div className="relative order-2 lg:order-1">
            <Reveal delay={100}>
              <div className="relative">
                {/* Aksen latar */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-4 -translate-y-4 rounded-3xl bg-[#FCE8E9] lg:-translate-x-6 lg:-translate-y-6"
                />

                {/* Gambar utama */}
                <div className="group relative z-10 aspect-[4/3] overflow-hidden rounded-2xl bg-gray-200 shadow-lg">
                  <Image
                    src="/images/carausel/carausel.webp"
                    alt="Kegiatan IKAPEKSI Cianjur"
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Floating card: Sekretariat */}
                <div className="absolute -bottom-8 left-4 right-4 z-20 flex items-center gap-4 rounded-xl bg-white p-4 shadow-[0_10px_40px_rgba(0,0,0,0.08)] sm:left-8 sm:right-8 sm:p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#FCE8E9] text-[#C62930]">
                    <svg
                      className="h-6 w-6"
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
                    <h4 className="text-sm font-bold text-gray-900 sm:text-base">
                      Sekretariat Resmi DPC Cianjur
                    </h4>
                    <p className="mt-0.5 text-xs leading-relaxed text-gray-500 sm:text-sm">
                      Perumahan Bumi Marhamah Blok C1, Karangtengah, Cianjur
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Kanan: Teks Penjelasan & 3 Poin Utama */}
          <div className="order-1 flex flex-col justify-center lg:order-2">
            <Reveal delay={150}>
              <div className="mb-4 flex items-center gap-3">
             
                <span className="inline-flex items-center rounded-md bg-[#FFDAD6] px-4 py-1.5 text-[12px] font-bold uppercase leading-4 tracking-[0.1em] text-[#E3202B]">
                  Tentang IKAPEKSI DPC Cianjur
                </span>
              </div>

              <h2 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                Membangun Kemandirian Berbasis Disiplin &amp; Pengalaman Jepang
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <div className="space-y-4 text-sm leading-relaxed text-gray-600 sm:text-base">
                <p>
                  <strong className="font-semibold text-gray-900">
                    IKAPEKSI (Ikatan Pengusaha Kenshusei Indonesia)
                  </strong>{" "}
                  adalah asosiasi alumni program magang Jepang yang membangun
                  usaha di Indonesia. Organisasi ini berkomitmen mengembangkan
                  dan memberdayakan tenaga kerja magang Jepang serta mendorong
                  wirausaha berbasis pengalaman magang.
                </p>
                <p>
                  <strong className="font-semibold text-gray-900">
                    IKAPEKSI DPC Kabupaten Cianjur
                  </strong>{" "}
                  adalah cabang yang bernaung di bawah DPD Jawa Barat. Kami
                  merangkul alumni dan calon peserta magang di Cianjur agar
                  saling menguatkan, berbagi peluang usaha, dan membuka jalan
                  bagi generasi berikutnya yang ingin berangkat secara resmi
                  dan aman.
                </p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3">
                {FEATURES.map((feature) => (
                  <div
                    key={feature.no}
                    className="flex h-full flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
                  >
                    <div className="mb-4 flex h-8 w-8 items-center justify-center rounded bg-[#C62930] text-sm font-bold text-white">
                      {feature.no}
                    </div>
                    <h4 className="mb-2 text-sm font-bold text-gray-900">
                      {feature.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-gray-500">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

"use client";

import Reveal from "@/components/ui/Reveal";
import Container from "@/components/layout/Container";

/*
  Token warna:
  merah   #E3202B (tint #FFDAD6)
  kuning  #FEDC00
  hitam   #0A0304 (kartu visi)
  surface #F9FAFB
  muted   #4B5563

  Font: Plus Jakarta Sans (font-jakarta) untuk seluruh teks section ini
*/

const MISSIONS = [
  {
    title: "Menghimpun",
    desc: "Menyatukan alumni, praktisi Jepang di Cianjur dalam satu rumah yang aktif.",
  },
  {
    title: "Membuka Jalan",
    desc: "Membuka akses warga Cianjur menuju program magang dan kerja ke Jepang lewat sosialisasi dan pendampingan.",
  },
  {
    title: "Menumbuhkan Usaha",
    desc: "Mendorong usaha alumni naik kelas lewat program ekonomi dan jejaring bisnis antaranggota.",
  },
  {
    title: "Bermitra untuk Cianjur",
    desc: "Bersinergi dengan Pemkab, Disnaker, dan dunia usaha untuk memajukan tenaga kerja dan ekonomi daerah.",
  },
];

export default function VisionMissionPreview() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FFFFFF] py-16 font-jakarta text-[#0A0304] antialiased sm:py-20 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
          {/* KIRI: Kartu Visi (gelap) */}
          <Reveal delay={100} className="h-full lg:col-span-5">
            <div className="relative flex h-full min-h-[480px] flex-col overflow-hidden rounded-lg bg-[#0A0304] p-8 shadow-[0_8px_24px_-6px_rgba(10,3,4,0.35)] sm:p-10">
              {/* Cahaya merah di pojok kanan bawah */}
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_92%,rgba(227,32,43,0.30),transparent_45%)]"
                aria-hidden="true"
              />

              <div className="relative flex flex-1 flex-col">
                {/* Badge + label */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded bg-[#E3202B] px-2.5 py-1.5 text-[10px] font-bold uppercase leading-3 tracking-[0.04em] text-[#FFFFFF]">
                    Visi Kami
                  </span>
                  <span className="text-[11px] font-bold uppercase leading-4 tracking-[0.04em] text-[#D1D5DB]">
                    DPC IKA PEKSI Cianjur 2026-2031
                  </span>
                </div>

                {/* Judul visi */}
                <h2 className="mt-8 text-[44px] font-bold leading-[52px] tracking-[-0.04em] text-[#FFFFFF] sm:text-[48px] sm:leading-[56px]">
                  Rumah Alumni Jepang yang Berdaya dan Memberdayakan
                </h2>

                {/* Paragraf */}
                <p className="mt-6 text-[16px] font-normal leading-[26px] tracking-[-0.02em] text-[#E5E7EB]">
                  Tempat pulang bagi para pejuang Indonesia-Jepang. Untuk
                  saling menguatkan, berbagi ilmu dan bersama memajukan Cianjur.
                </p>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between pt-16">
                  <span className="text-[11px] font-bold tracking-[0.02em] text-[#FFFFFF]">
                    Bergerak. Berdampak. Berdaya.
                  </span>
                  <svg
                    className="h-[18px] w-[18px] text-[#FEDC00]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                    <path d="M4 22v-7" />
                  </svg>
                </div>
              </div>
            </div>
          </Reveal>

          {/* KANAN: Kartu misi (putih) */}
          <Reveal delay={250} className="h-full lg:col-span-7">
            <div className="flex h-full flex-col rounded-lg bg-[#FFFFFF] p-6 shadow-[0_2px_12px_rgba(10,3,4,0.08)] sm:p-10">
              {/* Header kartu */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase leading-4 tracking-[0.04em] text-[#E3202B]">
                    Panduan Langkah
                  </span>
                  <h2 className="mt-1 text-[24px] font-semibold leading-8 tracking-[-0.04em] text-[#0A0304]">
                    Empat Misi Organisasi
                  </h2>
                </div>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F9FAFB] text-[#0A0304]">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="m3 17 2 2 4-4" />
                    <path d="m3 7 2 2 4-4" />
                    <path d="M13 6h8" />
                    <path d="M13 12h8" />
                    <path d="M13 18h8" />
                  </svg>
                </span>
              </div>

              {/* Daftar misi */}
              <ul className="mt-10 flex flex-col gap-4">
                {MISSIONS.map((m, idx) => (
                  <li
                    key={m.title}
                    className="flex items-start gap-4 rounded-lg bg-[#F9FAFB] px-4 py-4"
                  >
                    <span className="w-8 shrink-0 text-[20px] font-semibold leading-7 tracking-[-0.03em] text-[#E3202B]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-[15px] font-semibold leading-6 tracking-[-0.02em] text-[#0A0304]">
                        {m.title}
                      </h3>
                      <p className="mt-0.5 text-[14px] font-normal leading-[20px] tracking-[-0.02em] text-[#4B5563]">
                        {m.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
"use client";

import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n";

const missionKeys = [
  "mission.m1",
  "mission.m2",
  "mission.m3",
  "mission.m4",
];

export default function VisionMissionPreview() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden text-white">

      {/* Background Pattern dengan gradasi ke atas & ke bawah */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H24V24H0V0Z' fill='none'/%3E%3Cpath d='M23 1V23H1V1H23ZM24 0H0V24H24V0Z' fill='white'/%3E%3C/svg%3E")`,
          backgroundSize: "12px 12px",

          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",

          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      />

      {/* Ambient Light */}
      <div className="pointer-events-none absolute left-0 top-1/2 z-0 h-[600px] w-[600px] -translate-x-1/3 -translate-y-1/2 rounded-full bg-[#C62930]/10 blur-[130px]" />

      {/* 
        GRID UTAMA (3 KOLOM):
        Garis vertikal di sisi kiri dan kanan layar tetap dipertahankan agar menyambung.
      */}
      <div className="relative z-10 flex w-full border-t border-white/10">

        {/* Kolom 1: Ruang Kosong Kiri (Garis Vertikal Kiri) */}
        <div className="border-stripe-r hidden md:block w-[3%] lg:w-[4%] xl:w-[10%] 2xl:w-[15%] bg-white/[0.02] backdrop-blur-sm shrink-0" />

        {/* Kolom 2: Konten Tengah (Border tengah dihapus dengan menghilangkan divide-x) */}
        <div className="flex-1 w-full grid lg:grid-cols-2 lg:items-center gap-10 lg:gap-16 xl:gap-20 py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-10 xl:px-20 bg-white/[0.02] backdrop-blur-sm">

          {/* KOLOM KIRI: VISI */}
          <Reveal
            delay={100}
            className="flex h-full flex-col items-center justify-center text-center lg:items-start lg:text-left"
          >
            <div className="mb-5 flex items-center gap-4">
              <span className="inline-flex items-center px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#e8555c] rounded-full border border-white/10 bg-white/5 sm:text-xs">
                {t("vision.label")}
              </span>
            </div>

            <h2 className="bg-gradient-to-r from-white via-white to-[#C62930]/55 bg-clip-text text-balance font-mona text-3xl font-extrabold leading-[1.15] tracking-tight text-transparent sm:text-4xl md:text-5xl lg:text-[2.6rem] xl:text-[3rem]">
              {t("vision.title")}
            </h2>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base lg:mx-0">
              {t("vision.desc")}
            </p>
          </Reveal>

          {/* KOLOM KANAN: MISI */}
          <Reveal delay={250} className="lg:pl-6 xl:pl-10">
            <div className="flex flex-col">

              <div className="mb-5 flex items-center justify-center gap-4 lg:justify-start">
                <span className="inline-flex items-center px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 rounded-full border border-white/10 bg-white/5 sm:text-xs">
                  {t("mission.label")}
                </span>
              </div>

              <ul className="flex flex-col">
                {missionKeys.map((key, idx) => (
                  <li
                    key={key}
                    className="group relative flex items-start gap-4 border-b border-white/10 py-4 transition-colors duration-300 last:border-0 hover:border-white/10 sm:gap-5 sm:py-5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 font-mono text-xs font-bold text-zinc-500 transition-all duration-300 group-hover:bg-[#C62930] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(198,41,48,0.4)] sm:h-11 sm:w-11 sm:text-sm">
                      {String(idx + 1).padStart(2, "0")}
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-zinc-400 transition-colors duration-300 group-hover:text-zinc-200 sm:text-base">
                      {t(key)}
                    </p>
                  </li>
                ))}
              </ul>

            </div>
          </Reveal>

        </div>

        {/* Kolom 3: Ruang Kosong Kanan (Garis Vertikal Kanan) */}
        <div className="border-stripe-l hidden md:block w-[3%] lg:w-[4%] xl:w-[10%] 2xl:w-[15%] bg-white/[0.02] backdrop-blur-sm shrink-0" />

      </div>
    </section>
  );
}
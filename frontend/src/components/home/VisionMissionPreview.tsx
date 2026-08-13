"use client";

import Container from "@/components/layout/Container";
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
    <section className="relative overflow-hidden py-24 text-white sm:py-32">

      {/* Background Pattern dengan gradasi ke atas & ke bawah */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H24V24H0V0Z' fill='none'/%3E%3Cpath d='M23 1V23H1V1H23ZM24 0H0V24H24V0Z' fill='white'/%3E%3C/svg%3E")`,
          backgroundSize: "12px 12px",

          // Fade dari atas → tengah → bawah
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

      <Container className="relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-24">

          {/* KOLOM KIRI: VISI */}
          <Reveal
            delay={100}
            className="flex h-full flex-col items-center justify-center text-center lg:items-start lg:text-left"
          >
            <div className="mb-6 flex items-center gap-4">
              <span className="inline-flex items-center px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#e8555c]">
                {t("vision.label")}
              </span>
            </div>

            <h2 className="bg-gradient-to-r from-white via-white to-[#C62930]/55 bg-clip-text text-balance font-mona text-4xl font-extrabold leading-[1.15] tracking-tight text-transparent sm:text-5xl lg:text-6xl">
              {t("vision.title")}
            </h2>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-400 lg:mx-0">
              {t("vision.desc")}
            </p>
          </Reveal>

          {/* KOLOM KANAN: MISI */}
          <Reveal delay={250}>
            <div className="flex flex-col">

              <div className="mb-6 flex items-center justify-center gap-4 lg:justify-start">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                  {t("mission.label")}
                </span>
              </div>

              <ul className="flex flex-col">
                {missionKeys.map((key, idx) => (
                  <li
                    key={key}
                    className="group relative flex items-start gap-6 border-b border-white/5 py-6 transition-colors duration-300 last:border-0 hover:border-white/10"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 font-mono text-sm font-bold text-zinc-500 transition-all duration-300 group-hover:bg-[#C62930] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(198,41,48,0.4)]">
                      {String(idx + 1).padStart(2, "0")}
                    </div>

                    <p className="mt-2.5 text-base leading-relaxed text-zinc-400 transition-colors duration-300 group-hover:text-zinc-200">
                      {t(key)}
                    </p>
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
"use client";

import type { ReactNode } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n";

function GraduationCapIcon() {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 10l10-5 10 5-10 5-10-5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12v5c0 2 2.7 3 6 3s6-1 6-3v-5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 11v5" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function LandmarkIcon() {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 22h18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18v-7M10 18v-7M14 18v-7M18 18v-7" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7h20l-10-5z" />
    </svg>
  );
}

const programKeys = ["p1", "p2", "p3"] as const;

const programIcons: Record<(typeof programKeys)[number], ReactNode> = {
  p1: <GraduationCapIcon />,
  p2: <UsersIcon />,
  p3: <LandmarkIcon />,
};

export default function ProgramSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-stamp-lines opacity-[0.04] pointer-events-none" />

      <div className="relative z-10 flex w-full border-t border-white/10">
        {/* Kolom 1: Gutter Kiri */}
        <div className="border-stripe-r hidden md:block w-[3%] lg:w-[4%] xl:w-[10%] 2xl:w-[15%] bg-white/[0.02] backdrop-blur-sm shrink-0" />

        {/* Kolom 2: Konten Tengah */}
        <div className="flex-1 w-full bg-white/[0.02] backdrop-blur-sm">
          <div className="py-24 sm:py-32 px-6 sm:px-12 lg:px-10 xl:px-24">
            <Reveal>
              <SectionHeading
                eyebrow={t("program.eyebrow")}
                title={t("program.homeTitle")}
                description={t("program.homeDesc")}
                align="center"
                className="[&_h2]:font-mona [&_h2]:font-extrabold [&_h2]:bg-gradient-to-r [&_h2]:from-white [&_h2]:from-55% [&_h2]:to-primary [&_h2]:bg-clip-text [&_h2]:text-transparent [&_h2::after]:content-none [&_span]:!bg-transparent [&_span]:!border-0 [&_span]:!text-primary [&_p]:text-white/60"
              />
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/10">
            {programKeys.map((key, idx) => (
              <div
                key={key}
                className="group flex flex-col border-b border-white/10 md:border-b-0 md:border-r last:border-0 last:border-r-0 transition-colors duration-500 hover:bg-white/[0.03]"
              >
                <Reveal delay={idx * 100} className="flex h-full flex-col p-8 sm:p-12 lg:p-10 xl:p-12">
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/30 text-primary-light transition-all duration-500 group-hover:bg-primary group-hover:border-primary group-hover:text-white group-hover:shadow-[0_0_20px_rgba(198,41,48,0.4)]">
                    {programIcons[key]}
                  </div>
                  <h3 className="font-mona text-xl font-bold text-white/80 transition-colors duration-300 group-hover:text-white">
                    {t(`program.${key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/50 transition-colors duration-300 group-hover:text-white/70">
                    {t(`program.${key}.desc`)}
                  </p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>

        {/* Kolom 3: Gutter Kanan */}
        <div className="border-stripe-l hidden md:block w-[3%] lg:w-[4%] xl:w-[10%] 2xl:w-[15%] bg-white/[0.02] backdrop-blur-sm shrink-0" />
      </div>
    </section>
  );
}
"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import Container from "@/components/layout/Container";
import { useLanguage } from "@/lib/i18n";

/*
  Token warna:
  merah   #E3202B (tint #FFDAD6)
  ink     #0A0304
  muted   #4B5563
  surface #F9FAFB
*/

const reasons: {
  titleKey: string;
  descKey: string;
  tag: string; // label merah di bagian bawah kartu
  icon: ReactNode;
}[] = [
  {
    titleKey: "why.r1.title",
    descKey: "why.r1.desc",
    tag: "Kolaborasi Aktif",
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    titleKey: "why.r2.title",
    descKey: "why.r2.desc",
    tag: "Perlindungan Resmi",
    icon: <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z" />,
  },
  {
    titleKey: "why.r3.title",
    descKey: "why.r3.desc",
    tag: "Inkubasi Bisnis",
    icon: (
      <>
        <path d="m22 7-8.5 8.5-5-5L2 17" />
        <path d="M16 7h6v6" />
      </>
    ),
  },
  {
    titleKey: "why.r4.title",
    descKey: "why.r4.desc",
    tag: "Aksi Kemanusiaan",
    icon: (
      <>
        <path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
        <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
        <path d="m2 15 6 6" />
        <path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z" />
      </>
    ),
  },
];

export default function WhyIkapeksi() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full overflow-hidden bg-[#FFFFFF] py-16 text-[#0A0304] sm:py-20 lg:py-24">
      <Container>
        {/* Header */}
        <Reveal className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center lg:mb-16">
          <span className="inline-flex items-center rounded-md bg-[#F3F4F6] px-4 py-1.5 text-[12px] font-bold uppercase leading-4 tracking-[0.06em] text-[#E3202B]">
            {t("why.eyebrow")}
          </span>

          <h2 className="mt-5 font-jakarta text-[32px] font-extrabold leading-[40px] tracking-[-0.03em] text-[#0A0304] sm:text-[44px] sm:leading-[52px] lg:text-[52px] lg:leading-[60px]">
            {t("why.title")}
          </h2>

          <p className="mt-5 text-[16px] leading-[26px] text-[#4B5563] sm:text-[18px] sm:leading-[30px]">
            {t("why.subtitle")}
          </p>
        </Reveal>

        {/* 4 kartu alasan */}
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, idx) => (
            <li key={reason.titleKey} className="flex">
              <Reveal delay={idx * 100} className="flex w-full">
                <article className="flex w-full flex-col rounded-3xl bg-[#F9FAFB] p-7 shadow-[0_1px_2px_rgba(10,3,4,0.04)]">
                  {/* Ikon + label */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFDAD6] text-[#E3202B]">
                      <svg
                        className="h-7 w-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.75}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        {reason.icon}
                      </svg>
                    </div>
                    <span className="rounded-md bg-[#FFFFFF] px-3 py-1.5 text-[11px] font-bold uppercase leading-4 tracking-[0.08em] text-[#4B5563]">
                      {t("why.reasonLabel")}
                    </span>
                  </div>

                  {/* Judul + deskripsi */}
                  <h3 className="mt-6 font-jakarta text-[22px] font-bold leading-[30px] tracking-[-0.015em] text-[#0A0304]">
                    {t(reason.titleKey)}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[26px] text-[#4B5563]">
                    {t(reason.descKey)}
                  </p>

                  {/* Footer kartu */}
                  <div className="mt-auto pt-8">
                    <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-5">
                      <span className="text-[12px] font-bold uppercase leading-4 tracking-[0.1em] text-[#E3202B]">
                        {reason.tag}
                      </span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFFFFF] text-[#E3202B]">
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
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
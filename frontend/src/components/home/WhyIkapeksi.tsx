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

  Font: Poppins (font-sans) untuk seluruh teks section ini
*/

const reasons: {
  titleKey: string;
  descKey: string;
  tag: string;
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
    <section className="relative w-full overflow-hidden bg-[#F9FAFB] py-16 font-sans text-[#0A0304] antialiased sm:py-20 lg:py-24">
      <Container>
        {/* Header */}
        <Reveal className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center lg:mb-16">
          <span className="inline-flex items-center rounded bg-[#F3F4F6] px-3 py-1 text-[10px] font-bold uppercase leading-4 tracking-[0.02em] text-[#E3202B]">
            {t("why.eyebrow")}
          </span>

          <h2 className="mt-5 text-[32px] font-semibold leading-[40px] tracking-[-0.04em] text-[#0A0304] sm:text-[44px] sm:leading-[52px]">
            Alasan Memilih Bergabung
          </h2>

          <p className="mt-4 text-[16px] font-normal leading-[24px] tracking-[-0.02em] text-[#4B5563] sm:text-[17px]">
            {t("why.subtitle")}
          </p>
        </Reveal>

        {/* 4 kartu alasan */}
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, idx) => (
            <li key={reason.titleKey} className="flex">
              <Reveal delay={idx * 100} className="flex w-full">
               <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-white via-white/40 to-transparent p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:from-white hover:via-white/70 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  {/* Garis aksen merah (muncul saat hover) */}
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[#E3202B] transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                    aria-hidden="true"
                  />

                  {/* Nomor + label */}
                  <div className="flex items-start justify-between">
                    <span className="text-[26px] font-extrabold leading-8 tracking-[-0.03em] text-[#E3202B]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded bg-[#FFFFFF] px-2.5 py-1 text-[9px] font-bold uppercase leading-3 tracking-[0.04em] text-[#0A0304] transition-colors duration-300 group-hover:bg-[#FFDAD6] group-hover:text-[#E3202B] motion-reduce:transition-none">
                      {t("why.reasonLabel")}
                    </span>
                  </div>

                  {/* Ikon kecil: berubah merah saat hover */}
                  <div className="mt-6 flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFFFFF] text-[#0A0304] transition-colors duration-300 group-hover:bg-[#E3202B] group-hover:text-[#FFFFFF] motion-reduce:transition-none">
                    <svg
                      className="h-[18px] w-[18px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      {reason.icon}
                    </svg>
                  </div>

                  {/* Judul + deskripsi */}
                  <h3 className="mt-5 text-[19px] font-semibold leading-[26px] tracking-[-0.03em] text-[#0A0304]">
                    {t(reason.titleKey)}
                  </h3>
                  <p className="mt-3 text-[14px] font-normal leading-[22.5px] tracking-[-0.02em] text-[#4B5563]">
                    {t(reason.descKey)}
                  </p>

                  {/* Footer kartu */}
                  <div className="mt-auto pt-10">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase leading-4 tracking-[0.04em] text-[#E3202B]">
                      {reason.tag}
                      <svg
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.25}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
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
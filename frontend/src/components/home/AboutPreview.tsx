"use client";

import Image from "next/image";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { SITE } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n";
import { ReactNode } from "react";

const CheckIcon = (): ReactNode => (
  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
    </svg>
  </div>
);

export default function AboutPreview() {
  const { t } = useLanguage();

  return (
    <section id="tentang" className="relative scroll-mt-16 overflow-hidden bg-[linear-gradient(to_bottom,black_0%,black_25%,#0c0506_60%,#120708_100%)] py-20 text-white">
      <div className="absolute inset-0 bg-stamp-lines opacity-10 mix-blend-overlay" />
      <div className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />

      <Container className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-start">

        {/* Bento Grid (4 Gambar) */}
        <Reveal delay={100}>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-zinc-800">
                <Image
                  src="https://i.pinimg.com/736x/42/54/0e/42540e6878e714a67411afcd9595d91e.jpg"
                  alt="Kegiatan 1"
                  fill
                  sizes="(min-width: 768px) 250px, 45vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
              <div className="group relative aspect-square w-full overflow-hidden rounded-xl bg-zinc-800">
                <Image
                  src="https://i.pinimg.com/736x/56/b0/ad/56b0adb9b1f74af81806903b1a046fc0.jpg"
                  alt="Kegiatan 2"
                  fill
                  sizes="(min-width: 768px) 250px, 45vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-zinc-800">
                <Image
                  src="https://i.pinimg.com/736x/5e/90/49/5e9049487ad487349a7b0eb83b922b3b.jpg"
                  alt="Kegiatan 3"
                  fill
                  sizes="(min-width: 768px) 250px, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-zinc-800">
                <Image
                  src="https://i.pinimg.com/736x/67/a9/72/67a972176810f9ec4f754d0b1b1fb86e.jpg"
                  alt="Kegiatan 4"
                  fill
                  sizes="(min-width: 768px) 250px, 45vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Kolom Teks */}
        <div className="flex flex-col justify-center">
          <Reveal delay={150}>
            <SectionHeading
              eyebrow={t("about.eyebrow")}
              title={t("about.title")}
              className="[&_h2]:font-mona [&_h2]:bg-gradient-to-r [&_h2]:from-white [&_h2]:from-55% [&_h2]:to-primary [&_h2]:bg-clip-text [&_h2]:text-transparent [&_h2::after]:content-none  [&_span]:!bg-transparent  [&_span]:!border-0  [&_span]:!text-primary"
            />
          </Reveal>
          <Reveal delay={250}>
            <p className="mt-5 text-base leading-relaxed text-white/70">
              {t("about.description", { year: SITE.foundedYear, name: SITE.fullName })}
            </p>
          </Reveal>

          <div className="mt-8 space-y-3">
            <Reveal delay={350}>
              <p className="mb-4 font-medium text-white">{t("about.forYou")}</p>
            </Reveal>

            <Reveal delay={400}>
              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <CheckIcon />
                <p className="text-sm text-gray-300">
                  <strong className="text-white">{t("about.item1.title")}</strong> — {t("about.item1.desc")}
                </p>
              </div>
            </Reveal>

            <Reveal delay={500}>
              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <CheckIcon />
                <p className="text-sm text-gray-300">
                  <strong className="text-white">{t("about.item2.title")}</strong> — {t("about.item2.desc")}
                </p>
              </div>
            </Reveal>

            <Reveal delay={600}>
              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <CheckIcon />
                <p className="text-sm text-gray-300">
                  <strong className="text-white">{t("about.item3.title")}</strong> — {t("about.item3.desc")}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={700}>
            <div className="mt-10">
              <Button href="/tentang" variant="outline">
                {t("about.kenali")}
              </Button>
            </div>
          </Reveal>
        </div>

      </Container>
    </section>
  );
}
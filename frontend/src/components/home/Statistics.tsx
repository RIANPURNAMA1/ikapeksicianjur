"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Container from "@/components/layout/Container";
import { statistics, type Statistic } from "@/data/statistics";

const ICONS: Record<number, ReactNode> = {
  1: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
      />
    </svg>
  ),
  2: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm-5.354 5.563A6.75 6.75 0 015.25 10.5a6.75 6.75 0 1113.5 0 6.75 6.75 0 01-4.396 5.563M9 20.25h6"
      />
    </svg>
  ),
  3: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
      />
    </svg>
  ),
  4: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H18v-.008zm0 2.25h.008v.008H18V15z"
      />
    </svg>
  ),
};

function useCountUp(target: number, duration = 1700) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();

          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(target * eased));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref };
}

function StatItem({ id, label, value, suffix }: Statistic) {
  const { value: displayValue, ref } = useCountUp(value);

  return (
    <div className="group flex flex-col items-center gap-4 bg-ink px-6 py-10 text-center transition-colors duration-300 hover:bg-primary">
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary-light transition-transform duration-300 group-hover:scale-110 group-hover:text-white">
        {ICONS[id]}
      </span>
      <p
        ref={ref}
        className="text-4xl font-black tabular-nums tracking-tight text-white sm:text-5xl"
      >
        {displayValue}
        <span className="text-primary-light">{suffix}</span>
      </p>
      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
        {label}
      </p>
    </div>
  );
}

export default function Statistics() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white">
      <div className="pointer-events-none absolute inset-0 bg-stamp-lines opacity-[0.05]" />
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/25 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 -translate-x-1/3 translate-y-1/3 rounded-full bg-primary/10 blur-[100px]" />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
            Ringkasan Capaian
          </span>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
            Angka yang{" "}
            <span className="text-primary-light">Berbicara</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Jauh-jauh bermagang, pulang membawa cerita. Setiap angka adalah alumni
            yang tumbuh dan berkontribusi untuk Cianjur.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] lg:grid-cols-4">
          {statistics.map((stat) => (
            <StatItem key={stat.id} {...stat} />
          ))}
        </div>
      </Container>
    </section>
  );
}
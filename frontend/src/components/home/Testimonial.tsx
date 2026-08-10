"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";

export default function Testimonial() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  return (
    <section className="bg-primary-tint py-20">
      <Container>
        <SectionHeading eyebrow="Testimoni" title="Kata Mereka Tentang IKAPEKSI" align="center" className="mx-auto" />
        <div className="mx-auto mt-12 max-w-2xl text-center">
          <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-card">
            <Image src={current.photo} alt={current.name} fill sizes="80px" className="object-cover" />
          </div>
          <p className="mt-6 text-lg font-medium leading-relaxed text-ink">&ldquo;{current.quote}&rdquo;</p>
          <p className="mt-4 text-sm font-bold text-ink">{current.name}</p>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{current.role}</p>

          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setIndex(i)}
                aria-label={`Testimoni ${i + 1}`}
                className={`btn-focus h-2.5 w-2.5 rounded-full transition-colors ${
                  i === index ? "bg-primary" : "bg-primary/25"
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

import Image from "next/image";
import Container from "@/components/layout/Container";
import { SITE } from "@/lib/constants";

export default function AboutHero() {
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/carausel/carausel.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
      <div className="absolute inset-0 bg-stamp-lines opacity-10 mix-blend-overlay" />

      <Container className="relative z-10 py-24">
        <div className="max-w-2xl">
          <span className="stamp-label text-primary">Tentang Kami</span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl">
            Mengenal {SITE.name} Lebih Dekat
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-white/70">{SITE.description}</p>
        </div>
      </Container>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
}
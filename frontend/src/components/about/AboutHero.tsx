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

      <Container className="relative z-10 py-20">
        <span className="stamp-label border-white/30 bg-white/10 text-white">Tentang Kami</span>
        <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
          Mengenal {SITE.name} Lebih Dekat
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70">{SITE.description}</p>
      </Container>
    </section>
  );
}
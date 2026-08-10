import Container from "@/components/layout/Container";
import { SITE } from "@/lib/constants";

export default function AboutHero() {
  return (
    <section className="bg-ink py-20 text-white">
      <Container>
        <span className="stamp-label border-white/30 bg-white/10 text-white">Tentang Kami</span>
        <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
          Mengenal {SITE.name} Lebih Dekat
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70">{SITE.description}</p>
      </Container>
    </section>
  );
}

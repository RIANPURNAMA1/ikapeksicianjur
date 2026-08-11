import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { programs } from "@/data/programs";

export default function ProgramPreview() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white">
      <div className="absolute inset-0 bg-stamp-lines opacity-[0.04]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full bg-primary/35 blur-[100px]" />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Program Kami"
            title="Program Unggulan IKAPEKSI CIANJUR"
            className="[&_h2]:text-white [&_span]:!bg-primary [&_span]:!text-white"
          />
          <Button href="/program" variant="outline">
            Lihat Semua Program
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programs.slice(0, 4).map((program, idx) => (
            <div key={program.slug || idx} className="group flex flex-col">
              <div className="relative mb-5 aspect-video w-full overflow-hidden rounded-sm bg-zinc-800">
                <Image
                  src={`https://picsum.photos/seed/program-${idx}/400/225`}
                  alt={program.title || `Program ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {program.category && (
                  <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                    {program.category}
                  </span>
                )}
              </div>

              <div className="flex flex-grow flex-col">
                <h3 className="mb-2 text-lg font-bold leading-tight text-white">
                  {program.title}
                </h3>
                <p className="mb-5 flex-grow text-sm leading-relaxed text-white/60">
                  {program.description}
                </p>

                <Link
                  href={`/program/${program.slug || "#"}`}
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary-light transition-colors group-hover:text-white"
                >
                  Selengkapnya
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.33331 8H12.6666" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 3.33331L12.6667 7.99998L8 12.6666" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
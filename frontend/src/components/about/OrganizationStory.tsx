import Container from "@/components/layout/Container";
import Reveal from "@/components/ui/Reveal";
import { SITE } from "@/lib/constants";

const milestones = [
  {
    value: String(SITE.foundedYear),
    label: "Tahun Berdiri",
    desc: "Berawal dari semangat untuk membangun wadah kebersamaan dan berbagi pengalaman di Cianjur.",
  },
  {
    value: "Belasan",
    label: "Anggota Awal",
    desc: "Sekelompok individu yang memiliki visi bersama untuk saling mendukung dan berkembang.",
  },
  {
    value: "Ratusan",
    label: "Anggota Tergabung",
    desc: "Terus berkembang dengan menjangkau berbagai wilayah di Kabupaten Cianjur.",
  },
];

export default function OrganizationStory() {
  return (
    <section className="relative overflow-hidden bg-[#0a0304] py-24 text-white sm:py-32">

      {/* =========================================
          BACKGROUND PATTERN
          ========================================= */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H24V24H0V0Z' fill='none'/%3E%3Cpath d='M23 1V23H1V1H23ZM24 0H0V24H24V0Z' fill='white'/%3E%3C/svg%3E")`,
          backgroundSize: "12px 12px",

          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",

          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      />

      {/* =========================================
          AMBIENT GLOW
          ========================================= */}
      <div className="pointer-events-none absolute -left-48 top-1/3 h-[450px] w-[450px] rounded-full bg-[#C62930]/10 blur-[130px]" />

      <div className="pointer-events-none absolute -right-48 bottom-0 h-[450px] w-[450px] rounded-full bg-[#C62930]/[0.07] blur-[130px]" />

      <Container className="relative z-10 max-w-6xl">

        {/* =========================================
            SECTION HEADER
            ========================================= */}
        <Reveal>
          <div className="max-w-3xl">

            {/* Eyebrow */}
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[#C62930]" />

              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#e8555c]">
                Sejarah
              </span>
            </div>

            {/* Title */}
            <h2 className="mt-6 text-balance font-mona text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Perjalanan{" "}
              <span className="bg-gradient-to-r from-white via-white to-[#ff7e84] bg-clip-text text-transparent">
                IKAPEKSI Cianjur
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              Dari sebuah gagasan sederhana hingga menjadi wadah yang terus
              berkembang untuk menghubungkan potensi, pengalaman, dan
              kontribusi masyarakat Cianjur.
            </p>

          </div>
        </Reveal>

        {/* =========================================
            STORY + MILESTONES
            ========================================= */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-20">

          {/* =========================================
              STORY
              ========================================= */}
          <Reveal delay={150}>
            <div className="relative">

              {/* Vertical Accent */}
              <div className="absolute left-0 top-1 bottom-1 w-px bg-gradient-to-b from-[#C62930] via-[#C62930]/30 to-transparent" />

              <div className="space-y-7 pl-7 sm:pl-9">

                <p className="text-base leading-[1.9] text-zinc-400 sm:text-lg">
                  {SITE.name} berawal dari sebuah gagasan untuk menghadirkan
                  wadah yang mampu mempertemukan individu dengan pengalaman,
                  pengetahuan, dan semangat yang sama untuk memberikan manfaat
                  bagi lingkungan sekitar.
                </p>

                <p className="text-base leading-[1.9] text-zinc-400 sm:text-lg">
                  Seiring waktu, organisasi terus berkembang. Dari sebuah
                  kelompok kecil, IKAPEKSI Cianjur tumbuh menjadi wadah yang
                  menghubungkan berbagai potensi dari seluruh wilayah
                  Kabupaten Cianjur.
                </p>

                <p className="text-base leading-[1.9] text-zinc-400 sm:text-lg">
                  Perjalanan tersebut menjadi fondasi untuk terus membangun
                  kebersamaan, membuka peluang, meningkatkan kapasitas, serta
                  menghadirkan kontribusi nyata bagi masyarakat Cianjur.
                </p>

              </div>
            </div>
          </Reveal>

          {/* =========================================
              MILESTONES
              ========================================= */}
          <div className="space-y-4">

            {milestones.map((milestone, index) => (
              <Reveal
                key={milestone.label}
                delay={250 + index * 100}
              >
                <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-sm transition-all duration-500 hover:border-[#C62930]/30 hover:bg-white/[0.04] sm:p-6">

                  {/* Hover Glow */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#C62930]/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative flex items-start gap-5">

                    {/* Number */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#C62930]/20 bg-[#C62930]/10 font-mono text-sm font-bold text-[#e8555c] transition-all duration-300 group-hover:border-[#C62930]/40 group-hover:bg-[#C62930] group-hover:text-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Content */}
                    <div className="min-w-0">

                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <p className="font-mona text-2xl font-extrabold leading-none text-white sm:text-3xl">
                          {milestone.value}
                        </p>

                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#e8555c]">
                          {milestone.label}
                        </p>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400">
                        {milestone.desc}
                      </p>

                    </div>
                  </div>

                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-[#C62930] to-transparent transition-all duration-500 group-hover:w-full" />

                </div>
              </Reveal>
            ))}

          </div>
        </div>

        {/* =========================================
            BOTTOM STATEMENT
            ========================================= */}
        <Reveal delay={500}>
          <div className="mt-20 border-t border-white/[0.06] pt-10">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C62930]">
                  Terus Bertumbuh
                </p>

                <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500">
                  Setiap langkah menjadi bagian dari perjalanan untuk
                  menciptakan organisasi yang semakin bermanfaat bagi Cianjur.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#C62930] shadow-[0_0_12px_rgba(198,41,48,0.7)]" />

                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">
                  IKAPEKSI Cianjur
                </span>
              </div>

            </div>

          </div>
        </Reveal>

      </Container>

      {/* =========================================
          BOTTOM FADE
          ========================================= */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0304] to-transparent" />

    </section>
  );
}
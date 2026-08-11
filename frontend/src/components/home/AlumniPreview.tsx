import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import AlumniGrid from "@/components/alumni/AlumniGrid";
import { alumniList } from "@/data/alumni";

export default function AlumniPreview() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          
          {/* Bagian Teks & Judul */}
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              Direktori Alumni
            </span>
            <h2 className="section-heading-underline pb-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Wajah-Wajah Alumni Cianjur
            </h2>
          </div>
          
          {/* Tombol Aksi */}
          <Button href="/alumni" variant="outline">
            Jelajahi Direktori
          </Button>
          
        </div>

        {/* Grid Alumni */}
        <div className="mt-12">
          <AlumniGrid alumni={alumniList.slice(0, 8)} />
        </div>
      </Container>
    </section>
  );
}
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import ActivityGrid from "@/components/activities/ActivityGrid";
import { activities } from "@/data/activities";

export default function ActivityPreview() {
  return (
    <section className="py-20">
      <Container>
        
        {/* Header Section: Container dibuat justify-between agar Judul di kiri & Tombol di kanan */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          
          {/* Bagian Judul: Menggunakan flex-col agar teks menurun (vertikal) */}
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              Kegiatan
            </span>
            <h2 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Kegiatan Terbaru Kami
            </h2>
          </div>

          <Button href="/kegiatan" variant="outline">
            Semua Kegiatan
          </Button>
          
        </div>

        {/* Content Section: Grid Kegiatan */}
        <div className="mt-12">
          <ActivityGrid activities={activities.slice(0, 3)} />
        </div>
        
      </Container>
    </section>
  );
}
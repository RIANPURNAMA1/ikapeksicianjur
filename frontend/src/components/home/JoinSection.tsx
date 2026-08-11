import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

export default function JoinSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#200c10] to-[#18090b] py-16 sm:py-24 text-white">
      {/* Pattern Latar Belakang */}
      <div className="absolute inset-0 bg-stamp-lines opacity-10 mix-blend-overlay pointer-events-none" />

      {/* Cahaya Ambient Biru di Belakang Card */}
      <div className="absolute top-1/2 left-1/2 h-[400px] w-[600px] -translate-y-1/2 -translate-x-1/2 rounded-full bg-[#C62930]/10 blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Kontainer Card Utama */}
        <div className="relative mx-auto max-w-4xl overflow-hidden p-6 text-center sm:p-16 transition-all duration-500">
          
          {/* Label Kecil (Eyebrow) */}
          <span className="mb-4 inline-flex items-center rounded-full bg-[#C62930]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#C62930] border border-[#C62930]/20">
            Mari Bergabung
          </span>
          
          {/* Judul Utama dengan Highlight Gradasi Biru */}
          <h2 className="mx-auto mt-4 font-mona text-2xl font-bold leading-snug text-white sm:text-4xl md:text-5xl">
            Alumni Pemagangan Kerja Asal Cianjur? <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C62930] to-[#E8555C]">
              Daftarkan Diri Anda.
            </span>
          </h2>

          {/* Teks Deskripsi */}
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-400">
            Perluas jejaring, ikuti kegiatan, dan berkontribusi untuk kampung halaman bersama ratusan alumni lainnya.
          </p>

          {/* Tombol Aksi (CTA) */}
          <div className="mt-10">
            <Button
              href="/kontak"
              size="lg"
              className="btn-shine w-full !rounded-full bg-[#C62930] !px-8 font-bold text-white shadow-[0_0_20px_rgba(198,41,48,0.3)] transition-all hover:bg-primary-dark hover:shadow-[0_0_30px_rgba(198,41,48,0.5)] border-none sm:w-auto sm:!px-10"
            >
              Hubungi Kami Sekarang
            </Button>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
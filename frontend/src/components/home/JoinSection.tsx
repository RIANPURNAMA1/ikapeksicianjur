import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

export default function JoinSection() {
  return (
    <section className="bg-ink py-20 text-white">
      <Container className="flex flex-col items-center gap-6 text-center">
        <span className="stamp-label border-white/30 bg-white/10 text-white">Bergabung Bersama Kami</span>
        <h2 className="max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
          Alumni Pemagangan Kerja Asal Cianjur? Daftarkan Diri Anda.
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-white/70">
          Perluas jejaring, ikuti kegiatan, dan berkontribusi untuk kampung halaman bersama ratusan alumni lainnya.
        </p>
        <Button href="/kontak" size="lg">
          Hubungi Kami Sekarang
        </Button>
      </Container>
    </section>
  );
}

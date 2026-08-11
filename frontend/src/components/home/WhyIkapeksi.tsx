import Container from "@/components/layout/Container";
import Reveal from "@/components/ui/Reveal";

const reasons = [
  {
    title: "Jejaring Terverifikasi",
    desc: "Direktori alumni resmi lintas kecamatan, memudahkan koordinasi dan kolaborasi.",
  },
  {
    title: "Jalur Aman & Resmi",
    desc: "Edukasi dan pendampingan agar calon peserta magang terhindar dari praktik calo.",
  },
  {
    title: "Pemberdayaan Berkelanjutan",
    desc: "Pendampingan wirausaha dan job matching bagi alumni yang telah kembali.",
  },
  {
    title: "Kepedulian Sosial",
    desc: "Kegiatan bakti sosial rutin untuk masyarakat Cianjur dari alumni untuk alumni.",
  },
];

export default function WhyIkapeksi() {
  return (
    <section className="bg-gradient-to-b from-[#120708] via-[#160809] to-[#1a0a0d] py-24 text-white">
      <Container className="relative z-10">
        
        {/* =========================================
            HEADER SECTION (Tanpa SectionHeading)
            ========================================= */}
        <div className="mx-auto max-w-3xl text-center mb-16 flex flex-col items-center">
          
          {/* Eyebrow (Teks kecil di atas) */}
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C62930]">
            Mengapa IKAPEKSI
          </span>
          
          {/* Judul Utama */}
          <h2 className="mt-4 font-mona text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Alasan Alumni Memilih Bergabung
          </h2>
          
          {/* Sub-judul / Deskripsi Tambahan (Sesuai Referensi Gambar) */}
          <p className="mt-4 text-base leading-relaxed text-zinc-400 max-w-2xl">
            4 pilar utama yang menjadi landasan kami — dirancang khusus untuk membangun 
            ekosistem alumni yang solid dan berdampak nyata bagi masyarakat Cianjur.
          </p>
          
        </div>

        {/* =========================================
            GRID KARTU ALASAN
            ========================================= */}
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, idx) => (
            <Reveal key={reason.title} delay={idx * 120} className="h-full">
              <div 
                className="doc-card group relative flex h-full flex-col rounded-xl border border-white/10 bg-white/5 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#C62930]/50 hover:bg-[#111111] hover:shadow-[0_8px_30px_-10px_rgba(198,41,48,0.2)]"
              >
                
                {/* Header Kartu: Angka (Kiri) & Label (Kanan) */}
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C62930]/10 border border-[#C62930]/20 text-sm font-black text-[#C62930] transition-all duration-300 group-hover:bg-[#C62930] group-hover:text-white">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 transition-colors duration-300 group-hover:text-[#C62930]/80">
                    Alasan
                  </span>
                </div>

                {/* Konten Kartu */}
                <div className="flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-zinc-100 transition-colors duration-300 group-hover:text-white">
                    {reason.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300">
                    {reason.desc}
                  </p>
                </div>
                
              </div>
            </Reveal>
          ))}
        </div>
        
      </Container>
    </section>
  );
}
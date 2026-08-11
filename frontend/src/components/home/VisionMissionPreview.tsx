import Container from "@/components/layout/Container";
import Reveal from "@/components/ui/Reveal";

// Memisahkan data misi ke dalam array agar kode JSX lebih bersih dan mudah diatur
const missions = [
  "Menghimpun dan mendata seluruh alumni pemagangan kerja se-Kabupaten Cianjur.",
  "Menyediakan pelatihan dan pendampingan bagi calon dan mantan peserta magang.",
  "Membuka akses kerja sama ekonomi dan lapangan kerja bagi alumni.",
  "Berkontribusi aktif dalam kegiatan sosial kemasyarakatan di Cianjur.",
];

export default function VisionMissionPreview() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1a0a0d] to-[#200c10] py-24 text-white">
      {/* Pattern Latar Belakang */}
      <div className="absolute inset-0 bg-stamp-lines opacity-10 mix-blend-overlay pointer-events-none" />

      {/* Efek Cahaya Halus di Latar Belakang (Konsisten dengan tema sebelumnya) */}
      <div className="absolute top-1/2 left-0 h-[500px] w-[500px] -translate-y-1/2 -translate-x-1/2 rounded-full bg-[#C62930]/5 blur-[120px] pointer-events-none" />

      <Container className="relative z-10 grid gap-10 lg:grid-cols-2 lg:items-center">
        
        {/* =========================================
            KOLOM KIRI: Kartu Visi
            ========================================= */}
        <Reveal delay={100} className="h-full">
          <div className="doc-card flex h-full flex-col justify-center rounded-xl border border-white/10 bg-white/5 p-8 sm:p-12 transition-all hover:border-[#C62930]/30">
            
            {/* Label "Visi" bergaya Badge */}
            <span className="mb-6 inline-flex w-fit items-center rounded-full bg-[#C62930]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#C62930] border border-[#C62930]/20">
              Visi
            </span>
            
            {/* Teks Visi Utama */}
            <h2 className="font-mona text-3xl font-bold leading-snug tracking-tight text-white sm:text-4xl lg:text-5xl">
              Alumni Cianjur yang Mandiri dan Berdaya Saing
            </h2>
            
            {/* Garis Aksen Bawah */}
            <div className="mt-10 h-1.5 w-16 rounded-full bg-gradient-to-r from-[#C62930] to-transparent opacity-80" />
            
          </div>
        </Reveal>

        {/* =========================================
            KOLOM KANAN: Daftar Misi
            ========================================= */}
        <Reveal delay={250}>
          <div className="flex flex-col">
            
            <div className="mb-6 px-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                Misi Kami
              </span>
            </div>
            
            {/* Daftar Misi yang dibungkus dalam Card List */}
            <div className="flex flex-col gap-4">
              {missions.map((misi, idx) => (
                <div 
                  key={idx}
                  className="group flex items-start gap-5 rounded-xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-x-1.5 hover:border-[#C62930]/40 hover:bg-[#111111] hover:shadow-[0_8px_30px_-10px_rgba(198,41,48,0.15)]"
                >
                  {/* Lingkaran Nomor Misi */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C62930]/10 border border-[#C62930]/20 text-sm font-black text-[#C62930] transition-all duration-300 group-hover:bg-[#C62930] group-hover:text-white group-hover:scale-110">
                    0{idx + 1}
                  </div>
                  
                  {/* Teks Deskripsi Misi */}
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400 transition-colors duration-300 group-hover:text-zinc-200">
                    {misi}
                  </p>
                </div>
              ))}
            </div>
            
          </div>
        </Reveal>
        
      </Container>
    </section>
  );
}
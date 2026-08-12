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
    <section className="relative overflow-hidden py-24 text-white sm:py-32">
      
      {/* 1. Background Pattern - Inline SVG agar highly portable */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H24V24H0V0Z' fill='none'/%3E%3Cpath d='M23 1V23H1V1H23ZM24 0H0V24H24V0Z' fill='white'/%3E%3C/svg%3E")`,
          backgroundSize: "12px 12px",
          WebkitMaskImage: "linear-gradient(to top, black 0%, black 60%, transparent 100%)",
              maskImage: "linear-gradient(to top, black 0%, black 60%, transparent 100%)",
        }}
      />

      {/* 2. Ambient Light - Halus dan strategis di tengah layar */}
      <div className="pointer-events-none absolute left-0 top-1/2 z-0 h-[600px] w-[600px] -translate-x-1/3 -translate-y-1/2 rounded-full bg-[#C62930]/10 blur-[130px]" />

      <Container className="relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">
          
          {/* =========================================
              KOLOM KIRI: Visi (Clean Typography)
              ========================================= */}
          <Reveal delay={100} className="flex h-full flex-col justify-center">
            {/* Label "Visi" */}
            <div className="mb-6 flex items-center gap-4">
              <span className="inline-flex items-center  px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#e8555c]">
                Visi
              </span>
             
            </div>
            
            {/* Teks Visi Utama */}
            <h2 className="text-balance font-mona text-4xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Alumni Cianjur yang Mandiri dan <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C62930] to-[#ff7e84]">Berdaya Saing.</span>
            </h2>
            
            {/* Deskripsi opsional untuk memperkuat hirarki (bisa disesuaikan) */}
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-400">
              Membangun ekosistem yang kuat untuk mengoptimalkan potensi setiap alumni dalam menghadapi tantangan ekonomi global.
            </p>
          </Reveal>

          {/* =========================================
              KOLOM KANAN: Misi (Semantic List)
              ========================================= */}
          <Reveal delay={250}>
            <div className="flex flex-col">
              
              <div className="mb-6 flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Misi Kami
                </span>
              
              </div>
              
              {/* Penggunaan <ul> dan <li> untuk standar Semantic HTML */}
              <ul className="flex flex-col">
                {missions.map((misi, idx) => (
                  <li 
                    key={idx}
                    className="group relative flex items-start gap-6 border-b border-white/5 py-6 transition-colors duration-300 last:border-0 hover:border-white/10"
                  >
                    {/* Indikator Nomor - Efek modern tanpa harus membuat seluruh area menjadi card */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 font-mono text-sm font-bold text-zinc-500 transition-all duration-300 group-hover:bg-[#C62930] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(198,41,48,0.4)]">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    
                    {/* Teks Misi */}
                    <p className="mt-2.5 text-base leading-relaxed text-zinc-400 transition-colors duration-300 group-hover:text-zinc-200">
                      {misi}
                    </p>
                  </li>
                ))}
              </ul>
              
            </div>
          </Reveal>
          
        </div>
      </Container>
    </section>
  );
}
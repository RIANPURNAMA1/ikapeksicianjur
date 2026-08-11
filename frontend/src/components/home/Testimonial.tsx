import Image from "next/image";
import Container from "@/components/layout/Container";
import { testimonials } from "@/data/testimonials";

// Array warna latar belakang untuk kotak gambar agar mirip dengan referensi
const bgColors = [
  "bg-blue-600",
  "bg-orange-500",
  "bg-teal-500",
  "bg-pink-500",
  "bg-purple-600",
];

export default function Testimonial() {
  return (
    <section className="bg-black py-20">
      <Container>
        {/* Bagian Judul (Tengah) */}
        <div className="mx-auto flex flex-col items-center gap-3 text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-primary">
            Testimoni
          </span>
          <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Kata Mereka Tentang IKAPEKSI
          </h2>
        </div>
        
        {/* Layout Grid 2 Kolom */}
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <div key={t.id || i} className="flex gap-5 sm:gap-6">
              
              {/* Bagian Kiri: Gambar dengan Background Berwarna */}
              <div 
                className={`relative h-24 w-24 sm:h-32 sm:w-32 shrink-0 overflow-hidden rounded-2xl ${
                  bgColors[i % bgColors.length]
                }`}
              >
                <Image 
                  src={t.photo} 
                  alt={t.name} 
                  fill 
                  sizes="(min-width: 640px) 128px, 96px" 
                  className="object-cover" 
                />
              </div>

              {/* Bagian Kanan: Teks Konten */}
              <div className="flex flex-col justify-center">
                
                {/* Badge/Label */}
                <span className="mb-2 w-fit rounded bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Alumni Story
                </span>

                {/* Teks diubah menjadi warna putih dan abu-abu agar terbaca di background hitam */}
                <h3 className="text-lg font-bold text-white">{t.name}</h3>
                
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                  &ldquo;{t.quote}&rdquo;
                </p>
                
                <p className="mt-3 text-xs font-extrabold text-white">{t.role}</p>
                
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
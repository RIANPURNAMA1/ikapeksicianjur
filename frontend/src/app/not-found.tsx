import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink px-6 py-24 text-center text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-squares bg-[length:24px_24px] opacity-10 mix-blend-overlay" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C62930]/10 blur-[130px]" />
      <div className="relative z-10">
        <p className="font-mono text-7xl font-black tracking-tight text-[#C62930] sm:text-8xl">404</p>
        <h1 className="mt-6 font-mona text-2xl font-extrabold sm:text-3xl">
          Halaman Tidak Ditemukan
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/60">
          Halaman yang Anda cari mungkin telah dipindahkan atau tidak tersedia. Silakan kembali ke beranda.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#C62930] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#A91F26]"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}

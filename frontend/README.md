# IKAPEKSI Cianjur — Frontend

Frontend resmi website IKAPEKSI Cianjur (Ikatan Alumni Pemagangan Kerja Sistem Indonesia - Cianjur), dibangun dengan Next.js App Router, TypeScript, dan Tailwind CSS. Proyek ini murni frontend dengan mock/static data — belum terhubung ke backend, database, atau API apa pun.

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Font: Plus Jakarta Sans (via `next/font/google`)

## Menjalankan Proyek

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Struktur Folder

```
src/
├── app/            # Routing & halaman (App Router)
├── components/     # Komponen UI, dikelompokkan per fitur (home, about, alumni, news, ...)
├── data/           # Mock/static data (alumni, program, berita, kegiatan, galeri, testimoni)
├── types/          # TypeScript interfaces
├── lib/            # Utility & constants
└── hooks/          # Custom hooks (mobile menu, search, scroll)
```

## Halaman

| Route | Deskripsi |
|---|---|
| `/` | Beranda |
| `/tentang` | Sejarah, visi-misi, struktur organisasi |
| `/program` | Daftar program IKAPEKSI |
| `/alumni` | Direktori alumni (search, filter, pagination) |
| `/alumni/[id]` | Profil alumni |
| `/kegiatan` | Daftar kegiatan |
| `/berita` | Daftar berita (search, filter, pagination) |
| `/berita/[slug]` | Detail berita |
| `/galeri` | Galeri foto dengan lightbox |
| `/kontak` | Informasi kontak & form (frontend only) |

## Desain

Palet warna: Merah `#C62930`, Hitam `#111111`, Putih `#FFFFFF` — tanpa biru, ungu, hijau, atau gradient warna-warni. Motif "cap dokumen" (folded-corner card & stamp label) digunakan konsisten sebagai elemen visual khas, merujuk pada tema dokumen keberangkatan/pemagangan kerja luar negeri.

## Integrasi Backend di Masa Depan

Seluruh data saat ini berasal dari `src/data/*.ts`. Untuk menyambungkan ke backend/API nanti, cukup ganti sumber data pada level halaman (`src/app/**/page.tsx`) tanpa perlu merombak komponen UI, karena setiap komponen sudah menerima data lewat props yang mengikuti kontrak `src/types/*.ts`.

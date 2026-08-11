export interface DummyAlumni {
  id: string;
  nama: string;
  tahun: string;
  jepang: string;
  status: "Bekerja" | "Kembali" | "Wirausaha" | "Cari Kerja";
  jenis: string;
}

export interface DummyBerita {
  id: string;
  judul: string;
  tanggal: string;
  status: "Terbit" | "Draft";
  views: number;
}

export interface DummyPendaftar {
  id: string;
  nama: string;
  asal: string;
  tujuan: string;
  tanggal: string;
  status: "Baru" | "Diproses" | "Diterima" | "Ditolak";
}

export const DUMMY_ADMIN = {
  email: "admin@ikapeksicianjur.or.id",
  password: "admin123",
};

export const DUMMY_STATS = {
  alumni: 1247,
  alumniBaru: 38,
  umkm: 96,
  berita: 142,
  pendaftar: 214,
  anggotaAktif: 512,
};

export const DUMMY_ALUMNI: DummyAlumni[] = [
  { id: "AL-001", nama: "Asep Saepudin", tahun: "2019", jepang: "Tokyo", status: "Kembali", jenis: "IM Japan" },
  { id: "AL-002", nama: "Rina Marlina", tahun: "2020", jepang: "Osaka", status: "Wirausaha", jenis: "IM Japan" },
  { id: "AL-003", nama: "Dedi Kurniawan", tahun: "2018", jepang: "Aichi", status: "Bekerja", jenis: "IM Japan" },
  { id: "AL-004", nama: "Siti Nurhaliza", tahun: "2021", jepang: "Chiba", status: "Bekerja", jenis: "IM Japan" },
  { id: "AL-005", nama: "Bambang Hermanto", tahun: "2017", jepang: "Saitama", status: "Wirausaha", jenis: "IM Japan" },
  { id: "AL-006", nama: "Euis Komariah", tahun: "2022", jepang: "Osaka", status: "Cari Kerja", jenis: "Swasta" },
  { id: "AL-007", nama: "Ujang Suparman", tahun: "2016", jepang: "Tokyo", status: "Kembali", jenis: "IM Japan" },
  { id: "AL-008", nama: "Tati Hartati", tahun: "2020", jepang: "Aichi", status: "Bekerja", jenis: "IM Japan" },
];

export const DUMMY_BERITA: DummyBerita[] = [
  { id: "B-01", judul: "IKAPEKSI Cianjur Gelar Business Matching dengan Buyer Jepang", tanggal: "2026-08-05", status: "Terbit", views: 342 },
  { id: "B-02", judul: "Pelatihan Kewirausahaan untuk Alumni di Cianjur", tanggal: "2026-07-28", status: "Terbit", views: 251 },
  { id: "B-03", judul: "Silaturahmi Akbar Alumni Angkatan ke-5", tanggal: "2026-07-15", status: "Terbit", views: 189 },
  { id: "B-04", judul: "Kerja Sama Pelatihan Bahasa Jepang dengan LPK", tanggal: "2026-07-02", status: "Draft", views: 0 },
  { id: "B-05", judul: "Bazar UMKM Binaan IKAPEKSI di Alun-Alun Cianjur", tanggal: "2026-06-20", status: "Terbit", views: 405 },
];

export const DUMMY_PENDAFTAR: DummyPendaftar[] = [
  { id: "P-101", nama: "Agus Firmansyah", asal: "Pacet", tujuan: "Osaka", tanggal: "2026-08-10", status: "Baru" },
  { id: "P-102", nama: "Dewi Anggraini", asal: "Cilaku", tujuan: "Tokyo", tanggal: "2026-08-09", status: "Baru" },
  { id: "P-103", nama: "Rudi Haryanto", asal: "Warungkondang", tujuan: "Aichi", tanggal: "2026-08-08", status: "Diproses" },
  { id: "P-104", nama: "Neng Suryani", asal: "Cianjur Kota", tujuan: "Chiba", tanggal: "2026-08-06", status: "Diterima" },
  { id: "P-105", nama: "Yanto Wijaya", asal: "Cugenang", tujuan: "Saitama", tanggal: "2026-08-04", status: "Ditolak" },
  { id: "P-106", nama: "Lina Marlina", asal: "Sukaresmi", tujuan: "Osaka", tanggal: "2026-08-02", status: "Diterima" },
];

export const DUMMY_GRAFIK_PENDAFTAR = [
  { bulan: "Jan", jumlah: 12 },
  { bulan: "Feb", jumlah: 19 },
  { bulan: "Mar", jumlah: 15 },
  { bulan: "Apr", jumlah: 22 },
  { bulan: "Mei", jumlah: 28 },
  { bulan: "Jun", jumlah: 24 },
  { bulan: "Jul", jumlah: 31 },
  { bulan: "Agu", jumlah: 38 },
];

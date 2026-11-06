export interface Statistic {
  id: number;
  label: string;
  value: number;
  suffix: string;
  subLabel: string;
}

export const statistics: Statistic[] = [
  { id: 1, label: "32 Kecamatan", value: 32, suffix: "", subLabel: "" },
  { id: 2, label: "354 Desa", value: 354, suffix: "", subLabel: "" },
  { id: 3, label: "4 Pilar Pemberdayaan", value: 4, suffix: "", subLabel: "Berkelanjutan bagi Anggota" },
  { id: 4, label: "Struktur Sah", value: 1, suffix: "", subLabel: "Di bawah Pengurus Jawabarat & Pengurus Pusat" },
];

export interface Statistic {
  id: number;
  label: string;
  value: number;
  suffix: string;
  subLabel: string;
}

export const statistics: Statistic[] = [
  { id: 1, label: "Kecamatan Cianjur", value: 32, suffix: "+", subLabel: "Terdata di direktori wilayah" },
  { id: 2, label: "Jalur Legal", value: 100, suffix: "%", subLabel: "Terverifikasi & bebas calo" },
  { id: 3, label: "Pilar Pemberdayaan", value: 4, suffix: "", subLabel: "Berkelanjutan bagi alumni" },
  { id: 4, label: "Resmi", value: 1, suffix: "", subLabel: "Struktur Sah, Di bawah DPD Jabar & DPP" },
];

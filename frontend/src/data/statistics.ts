export interface Statistic {
  id: number;
  label: string;
  value: number;
  suffix: string;
}

export const statistics: Statistic[] = [
  { id: 1, label: "Alumni Terdaftar", value: 480, suffix: "+" },
  { id: 2, label: "Kecamatan Terjangkau", value: 10, suffix: "" },
  { id: 3, label: "Program Pemagangan", value: 8, suffix: "" },
  { id: 4, label: "Tahun Berdiri", value: 9, suffix: "" },
];

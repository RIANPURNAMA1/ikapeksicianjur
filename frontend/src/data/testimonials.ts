export interface Testimonial {
  id: number;
  name: string;
  photo: string;
  role: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  { id: 1, name: "Asep Kurniawan", photo: "https://i.pravatar.cc/200?img=12", role: "Alumni Jepang 2018, Cianjur Kota", quote: "IKAPEKSI membuka banyak pintu untuk saya setelah pulang dari Jepang, mulai dari pelatihan sampai jejaring usaha." },
  { id: 2, name: "Rina Marlina", photo: "https://i.pravatar.cc/200?img=32", role: "Alumni Jepang 2019, Cilaku", quote: "Berkat pendampingan wirausaha, saya berani mulai usaha hidroponik sendiri di kampung." },
  { id: 3, name: "Deden Supriatna", photo: "https://i.pravatar.cc/200?img=51", role: "Alumni Jepang 2017, Warungkondang", quote: "Organisasi ini menjaga silaturahmi alumni tetap hidup meski sudah bertahun-tahun pulang." },
  { id: 4, name: "Siti Nur Aisyah", photo: "https://i.pravatar.cc/200?img=45", role: "Alumni Jepang 2020, Cugenang", quote: "Ilmu dari Jepang jadi lebih bermanfaat karena ada wadah untuk berbagi dengan sesama alumni." },
  { id: 5, name: "Ahmad Fauzi", photo: "https://i.pravatar.cc/200?img=14", role: "Alumni Jepang 2016, Pacet", quote: "Dari IKAPEKSI, saya belajar bahwa pengalaman magang paling berharga saat dibagikan ke generasi berikutnya." },
];

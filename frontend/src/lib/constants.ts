export const SITE = {
  name: "IKAPEKSI Cianjur",
  fullName: "Ikatan Alumni Pemagangan Kerja Sistem Indonesia - Cianjur",
  tagline: "Merajut Alumni, Membangun Cianjur",
  description:
    "Wadah silaturahmi dan pemberdayaan alumni pemagangan kerja luar negeri asal Kabupaten Cianjur.",
  email: "info@ikapeksicianjur.or.id",
  phone: "+62 812-3456-7890",
  whatsapp: "6281234567890",
  address: "Jl. Siliwangi No. 12, Cianjur, Jawa Barat 43211",
  mapEmbedQuery: "Cianjur, Jawa Barat",
  foundedYear: 2016,
};

export const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/tentang" },
  { label: "Program", href: "/program" },
  { label: "Alumni", href: "/alumni" },
  { label: "Kegiatan", href: "/kegiatan" },
  { label: "Berita", href: "/berita" },
  { label: "Galeri", href: "/galeri" },
  { label: "Kontak", href: "/kontak" },
];

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/ikapeksicianjur", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com/ikapeksicianjur", icon: "facebook" },
  { label: "YouTube", href: "https://youtube.com/@ikapeksicianjur", icon: "youtube" },
  { label: "WhatsApp", href: "https://wa.me/6281234567890", icon: "whatsapp" },
] as const;

export const DISTRICTS = [
  "Cianjur Kota",
  "Cilaku",
  "Warungkondang",
  "Cugenang",
  "Pacet",
  "Sukaresmi",
  "Cikalongkulon",
  "Karangtengah",
  "Ciranjang",
  "Sukanagara",
] as const;

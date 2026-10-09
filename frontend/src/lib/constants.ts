export const SITE = {
  name: "IKAPEKSI CIANJUR",
  fullName: "Ikatan Alumni Pemagangan Kerja Sistem Indonesia - Cianjur",
  tagline: "Merajut Alumni, Membangun Cianjur",
  description:
    "Wadah silaturahmi dan pemberdayaan alumni pemagangan kerja luar negeri asal Kabupaten Cianjur.",
  email: "cianjur@ikapeksi.com",
  phone: "+62 895-3916-85825",
  whatsapp: "62895391685825",
  streetAddress: "Perumahan Bumi Marhamah Blok C1, Sindangasih",
  address: "Perumahan Bumi Marhamah Blok C1, Sindangasih, Kec. Karangtengah, Kabupaten Cianjur, Jawa Barat 43281",
  mapEmbedQuery: "Sindangasih, Kec. Karangtengah, Kabupaten Cianjur, Jawa Barat 43281",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d720.8569507475864!2d107.17049616945694!3d-6.831777067989851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6853bd4f0f60e5%3A0x829636d22de1a3dc!2sKarangtengah%2C%20Sindangasih%2C%20Kec.%20Karangtengah%2C%20Kabupaten%20Cianjur%2C%20Jawa%20Barat%2043281!5e1!3m2!1sid!2sid!4v1789873295095!5m2!1sid!2sid",
  geo: {
    latitude: -6.831777067989851,
    longitude: 107.17049616945694,
  },
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
  { label: "WhatsApp", href: "https://wa.me/62895391685825", icon: "whatsapp" },
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

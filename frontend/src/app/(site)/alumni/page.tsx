import type { Metadata } from "next";
import AlumniDirectory from "@/components/alumni/AlumniDirectory";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Alumni",
  description:
    "Direktori alumni pemagangan kerja Jepang asal Kabupaten Cianjur — profil, bidang, perusahaan, dan kisah sukses para alumni IKAPEKSI.",
  path: "/alumni",
});

export default function AlumniPage() {
  return <AlumniDirectory />;
}

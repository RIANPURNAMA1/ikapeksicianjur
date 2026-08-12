import type { Metadata } from "next";
import PendataanForm from "@/components/pendataan/PendataanForm";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pendataan & Registrasi",
  description:
    "Registrasi data alumni, calon alumni, dan binaan UMKM IKAPEKSI DPC Cianjur. Lengkapi data Anda untuk bergabung dalam program pemberdayaan.",
  path: "/pendataan",
});

export default function PendataanPage() {
  return <PendataanForm />;
}

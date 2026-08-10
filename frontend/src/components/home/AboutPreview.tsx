import Image from "next/image";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

export default function AboutPreview() {
  return (
    <section className="py-20">
      <Container className="grid gap-12 md:grid-cols-2 md:items-center">
        <div className="doc-card relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src="https://picsum.photos/seed/ikapeksi-about/800/600"
            alt="Kegiatan alumni IKAPEKSI Cianjur"
            fill
            sizes="(min-width: 768px) 500px, 90vw"
            className="object-cover"
          />
        </div>
        <div>
          <SectionHeading eyebrow="Tentang Kami" title="Rumah Bagi Alumni Pemagangan Kerja Cianjur" />
          <p className="mt-5 text-base leading-relaxed text-ink-muted">
            {SITE.fullName} berdiri sejak tahun {SITE.foundedYear} sebagai wadah silaturahmi para alumni
            pemagangan kerja luar negeri dari seluruh kecamatan di Kabupaten Cianjur. Kami percaya, pengalaman
            di negeri orang akan lebih bermakna bila dibagikan kembali untuk kampung halaman.
          </p>
          <div className="mt-8">
            <Button href="/tentang" variant="outline">
              Selengkapnya
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/layout/Container";
import AlumniProfile from "@/components/alumni/AlumniProfile";
import { alumniList } from "@/data/alumni";

export function generateStaticParams() {
  return alumniList.map((alumni) => ({ id: String(alumni.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const alumni = alumniList.find((a) => String(a.id) === id);
  return { title: alumni ? alumni.name : "Profil Alumni" };
}

export default async function AlumniDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const alumni = alumniList.find((a) => String(a.id) === id);
  if (!alumni) notFound();

  return (
    <section className="py-20">
      <Container>
        <Link href="/alumni" className="btn-focus text-sm font-bold uppercase tracking-wide text-primary">
          &larr; Kembali ke Direktori
        </Link>
        <div className="mt-8">
          <AlumniProfile alumni={alumni} />
        </div>
      </Container>
    </section>
  );
}

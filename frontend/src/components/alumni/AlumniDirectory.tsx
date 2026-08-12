"use client";

import { useMemo, useState } from "react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Pagination from "@/components/ui/Pagination";
import AlumniSearch from "@/components/alumni/AlumniSearch";
import AlumniFilter from "@/components/alumni/AlumniFilter";
import AlumniGrid from "@/components/alumni/AlumniGrid";
import { alumniList } from "@/data/alumni";

const PAGE_SIZE = 8;

export default function AlumniDirectory() {
  const [query, setQuery] = useState("");
  const [program, setProgram] = useState("");
  const [year, setYear] = useState("");
  const [district, setDistrict] = useState("");
  const [page, setPage] = useState(1);

  const programOptions = useMemo(
    () => Array.from(new Set(alumniList.map((a) => a.field))).map((f) => ({ label: f, value: f })),
    []
  );
  const yearOptions = useMemo(
    () =>
      Array.from(new Set(alumniList.map((a) => a.year)))
        .sort((a, b) => Number(b) - Number(a))
        .map((y) => ({ label: y, value: y })),
    []
  );
  const districtOptions = useMemo(
    () => Array.from(new Set(alumniList.map((a) => a.district))).map((d) => ({ label: d, value: d })),
    []
  );

  const filtered = useMemo(() => {
    return alumniList.filter((alumni) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        alumni.name.toLowerCase().includes(q) ||
        alumni.company.toLowerCase().includes(q) ||
        alumni.field.toLowerCase().includes(q);
      const matchesProgram = !program || alumni.field === program;
      const matchesYear = !year || alumni.year === year;
      const matchesDistrict = !district || alumni.district === district;
      return matchesQuery && matchesProgram && matchesYear && matchesDistrict;
    });
  }, [query, program, year, district]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Direktori Alumni"
          title="Alumni Pemagangan Kerja Asal Cianjur"
          description={`Menampilkan ${filtered.length} dari ${alumniList.length} alumni terdaftar.`}
        />
        <div className="mt-10 space-y-4">
          <AlumniSearch
            value={query}
            onChange={(v) => {
              setQuery(v);
              setPage(1);
            }}
          />
          <AlumniFilter
            programOptions={programOptions}
            yearOptions={yearOptions}
            districtOptions={districtOptions}
            program={program}
            year={year}
            district={district}
            onProgramChange={(v) => {
              setProgram(v);
              setPage(1);
            }}
            onYearChange={(v) => {
              setYear(v);
              setPage(1);
            }}
            onDistrictChange={(v) => {
              setDistrict(v);
              setPage(1);
            }}
          />
        </div>
        <div className="mt-10">
          <AlumniGrid alumni={paged} />
        </div>
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </Container>
    </section>
  );
}

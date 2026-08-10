"use client";

import Select from "@/components/ui/Select";
import { SelectOption } from "@/types/common";

interface AlumniFilterProps {
  programOptions: SelectOption[];
  yearOptions: SelectOption[];
  districtOptions: SelectOption[];
  program: string;
  year: string;
  district: string;
  onProgramChange: (value: string) => void;
  onYearChange: (value: string) => void;
  onDistrictChange: (value: string) => void;
}

export default function AlumniFilter({
  programOptions,
  yearOptions,
  districtOptions,
  program,
  year,
  district,
  onProgramChange,
  onYearChange,
  onDistrictChange,
}: AlumniFilterProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Select
        placeholder="Semua Bidang"
        options={programOptions}
        value={program}
        onChange={(e) => onProgramChange(e.target.value)}
        aria-label="Filter bidang"
      />
      <Select
        placeholder="Semua Tahun"
        options={yearOptions}
        value={year}
        onChange={(e) => onYearChange(e.target.value)}
        aria-label="Filter tahun"
      />
      <Select
        placeholder="Semua Kecamatan"
        options={districtOptions}
        value={district}
        onChange={(e) => onDistrictChange(e.target.value)}
        aria-label="Filter kecamatan"
      />
    </div>
  );
}

"use client";

import Input from "@/components/ui/Input";

interface AlumniSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function AlumniSearch({ value, onChange }: AlumniSearchProps) {
  return (
    <Input
      id="alumni-search"
      placeholder="Cari nama, bidang, atau perusahaan..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Cari alumni"
    />
  );
}

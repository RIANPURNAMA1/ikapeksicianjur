"use client";

import { FormEvent, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="doc-card p-8 text-center">
        <p className="text-lg font-bold text-ink">Terima kasih!</p>
        <p className="mt-2 text-sm text-ink-muted">
          Pesan Anda telah diterima. Tim kami akan segera menghubungi Anda kembali.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="doc-card space-y-5 p-8">
      <Input id="name" name="name" label="Nama Lengkap" placeholder="Nama Anda" required />
      <Input id="email" name="email" type="email" label="Email" placeholder="nama@email.com" required />
      <Input id="subject" name="subject" label="Subjek" placeholder="Perihal pesan" required />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-semibold text-ink">
          Pesan
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tuliskan pesan Anda..."
          className="btn-focus w-full rounded-md border border-paper-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-primary"
        />
      </div>
      <Button type="submit" className="w-full">
        Kirim Pesan
      </Button>
    </form>
  );
}

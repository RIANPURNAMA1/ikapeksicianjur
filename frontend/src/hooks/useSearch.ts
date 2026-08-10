"use client";

import { useMemo, useState } from "react";

export function useSearch<T>(items: T[], keys: (keyof T)[]) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return items;
    const lower = query.toLowerCase();
    return items.filter((item) =>
      keys.some((key) => String(item[key]).toLowerCase().includes(lower))
    );
  }, [items, keys, query]);

  return { query, setQuery, results };
}

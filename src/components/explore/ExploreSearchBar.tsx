"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ExploreSearchBar() {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    router.replace(`/explore?query=${query}`);
  };
  return (
    <div className="mt-5">
      <form onSubmit={submit}>
        <input
          type="search"
          className="w-full rounded-2xl h-14 p-3 bg-muted outline-none"
          placeholder="Search users with their name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
}

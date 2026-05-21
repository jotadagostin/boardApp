"use client";

import { Input } from "@/src/components/input";
import { SearchIcon } from "lucide-react";
import { useQueryState, debounce, parseAsString } from "nuqs";
import { ChangeEvent } from "react";

export function SearchInput() {
  const [search, setSearch] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({ shallow: false }),
  );

  function handleSearchUpdate(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value, {
      limitUrlUpdates: event.target.value !== "" ? debounce(500) : undefined,
    });
  }
  return (
    <div className="relative w-full max-w-[18rem] sm:max-w-[22rem]">
      <SearchIcon className="absolute size-4 text-navy-200 left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      <Input
        type="text"
        placeholder="search for features..."
        className="w-full pl-8"
        value={search}
        onChange={handleSearchUpdate}
      />
    </div>
  );
}

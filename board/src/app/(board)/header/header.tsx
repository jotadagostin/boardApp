import { UserButton } from "@/src/components/header/user-button";
import { SearchInput } from "./search-input";
import { Suspense } from "react";

export function Header() {
  return (
    <div className="w-full mx-auto flex flex-col gap-4 items-start justify-between md:flex-row md:items-center">
      <div className="space-y-1">
        <h1 className="font-semibold text-xl">Product Roadmap</h1>
        <p className="text-sm text-navy-100">
          Follow the development progress of our entire platform.
        </p>
      </div>

      <div className="w-full flex flex-col gap-4 items-stretch sm:flex-row sm:items-center sm:justify-end">
        <Suspense>
          <SearchInput />
        </Suspense>

        <UserButton />
      </div>
    </div>
  );
}

"use client";

import { Input } from "@/src/components/input";
import { authClient } from "@/src/lib/auth-client";
import { LoaderIcon, LogInIcon, SearchIcon } from "lucide-react";
import { useQueryState, parseAsString, debounce } from "nuqs";
import { ChangeEvent } from "react";

export function Header() {
  const { data: session, isPending } = authClient.useSession();
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));

  function handleSearchUpdate(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value, {
      limitUrlUpdates: event.target.value !== "" ? debounce(500) : undefined,
    });
  }

  async function handleSignIn() {
    await authClient.signIn.social({ provider: "github", callbackURL: "/" });
  }

  async function handleSignOut() {
    await authClient.signOut();
  }

  return (
    <div className="max-w-225 mx-auto w-full flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="font-semibold text-xl">Product Roadmap</h1>
        <p className="text-sm text-navy-100">
          Follow the development progress of our entire platform.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <SearchIcon className="absolute size-4 text-navy-200 left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <Input
            type="text"
            placeholder="search for features..."
            className="w-65.7 pl-8"
            value={search}
            onChange={handleSearchUpdate}
          />
        </div>

        {isPending ? (
          <div className="size-8 rounded-full bg-navy-700 border border-navy-500 flex items-center justify-center">
            <LoaderIcon className="size-3.5 text-navy-200 animate-spin" />
          </div>
        ) : session?.user ? (
          <button
            type="button"
            onClick={handleSignOut}
            className="size-8 rounded-full overflow-hidden cursor-pointer border-2 border-transparent hover:border-navy-200 transition-colors duration-150"
          >
            <img
              src={session.user.image ?? ""}
              alt={session.user.name}
              className="size-8 rounded-full"
            />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSignIn}
            className="size-8 rounded-full bg-navy-700 border border-navy-500 flex items-center justify-center hover:bg-navy-600 transition-colors duration-150 cursor-pointer"
          >
            <LogInIcon className="size-3.5 text-navy-200" />
          </button>
        )}
      </div>
    </div>
  );
}

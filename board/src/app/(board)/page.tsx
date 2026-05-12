import { listIssues } from "@/src/http/list-issues";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { BoardContent } from "./board-content";

export const metadata: Metadata = {
  title: "Board",
  description: "Follow the development progress of our entire platform.",
};

interface BoardProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function Board({ searchParams }: BoardProps) {
  const { q } = await searchParams;

  const issues = await listIssues({ search: q });

  return <BoardContent issues={issues} />;
}

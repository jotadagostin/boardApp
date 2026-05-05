import { Button } from "@/src/components/button";
import { Card } from "@/src/components/card";
import { Section } from "@/src/components/section";
import { ArchiveIcon, MessageCircleIcon, ThumbsUpIcon } from "lucide-react";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Board",
  description: "Follow the development progress of our entire platform.",
};

interface BoardProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function Home({ searchParams }: BoardProps) {
  const { q } = await searchParams;

  return (
    <main className="grid grid-cols-4 gap-5 flex-1 items-stretch">
      <Section.Root>
        <Section.Header>
          <Section.Title>
            <ArchiveIcon className="size-3" />
            Backlog
          </Section.Title>
          <Section.IssueCount>16</Section.IssueCount>
        </Section.Header>

        {/* Content */}
        <Section.Content>
          <Card.Root>
            <Card.Header>
              <Card.Number>ECO-001</Card.Number>
              <Card.Title>Implement credit card</Card.Title>
            </Card.Header>
            <Card.Footer>
              <Button>
                <ThumbsUpIcon className="size-3" />
                <span className="text-sm">12</span>
              </Button>

              <Button>
                <MessageCircleIcon className="size-3" />
                <span className="text-sm">6</span>
              </Button>
            </Card.Footer>
          </Card.Root>
        </Section.Content>
      </Section.Root>
    </main>
  );
}

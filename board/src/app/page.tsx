import { ArchiveIcon } from "lucide-react";
import { Section } from "../components/section";
import { Card } from "../components/card";

export default function Home() {
  return (
    <div className="max-w-405 w-full mx-auto p-10 flex flex-col gap-8 h-dvh">
      <div></div>
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
              <Card.Footer></Card.Footer>
            </Card.Root>
          </Section.Content>
        </Section.Root>
      </main>
    </div>
  );
}

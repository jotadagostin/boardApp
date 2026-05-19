import { Modal } from "@/src/components/modal";
import { BackButton } from "./back-button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { IssueDetails } from "@/src/app/issues/[id]/issue-details";

export const dynamic = "force-dynamic";

interface IssuePageProps {
  params: Promise<{ id: string }>;
}

export default async function IssueModal({ params }: IssuePageProps) {
  const { id } = await params;
  return (
    <Modal>
      <div className="flex flex-col gap-4 p-6">
        <BackButton />

        <DialogTitle className="sr-only">Issue Details</DialogTitle>
        <IssueDetails issueId={id} />
      </div>
    </Modal>
  );
}

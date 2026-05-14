import { Modal } from "@/src/components/modal";
import { BackButton } from "./back-button";

export default function IssueModal() {
  return (
    <Modal>
      <div className="flex flex-col gap-4 p-6">
        <BackButton />
      </div>
    </Modal>
  );
}

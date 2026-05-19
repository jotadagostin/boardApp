"use client";

import { deleteComment } from "@/src/http/delete-comment";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface DeleteCommentButtonProps {
  issueId: string;
  commentId: string;
}

export function DeleteCommentButton({
  issueId,
  commentId,
}: DeleteCommentButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteComment({ issueId, commentId });
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="ml-auto text-navy-400 hover:text-red-400 transition-colors duration-150 disabled:opacity-50 cursor-pointer"
    >
      <Trash2Icon className="size-3.5" />
    </button>
  );
}

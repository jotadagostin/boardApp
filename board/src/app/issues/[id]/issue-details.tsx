import { ArchiveIcon } from "lucide-react";
import { IssueLikeButton } from "./issue-like-button";
import { IssueCommentForm } from "./isssue-coments/issue-comment-form";
import { Suspense } from "react";
import { IssueComentsList } from "./isssue-coments/issue-comments-list";
import { IssueCommentsSkeleton } from "./isssue-coments/issue-comments-skeleton";
import { getIssue } from "@/src/http/get-issue";
import { authClient } from "@/src/lib/auth-client";
import { headers } from "next/headers";
import { createComment } from "@/src/http/create-comment";
import { Skeleton } from "@/src/components/skeleton";

interface IssueDetailsProps {
  issueId: string;
}

const statusLabels = {
  backlog: "Backlog",
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
} as const;

export async function IssueDetails({ issueId }: IssueDetailsProps) {
  const issue = await getIssue({ id: issueId });

  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(), // Pass the incoming request headers to maintain authentication context
    },
  });

  const isAuthenticated = !!session?.user;

  async function handleCreateComment(text: string) {
    "use server"; // This directive indicates that this function should be executed on the server side

    await createComment({ issueId, text });
  }
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="bg-navy-700 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs">
          <ArchiveIcon className="size-3" />
          {statusLabels[issue.status]}
        </span>

        <Suspense fallback={<Skeleton className="h-7 w-16" />}>
          <IssueLikeButton issueId={issue.id} />
        </Suspense>
      </div>

      <div className="space-y-2">
        <h1 className="font-semibold text-2xl">{issue.title}</h1>
        <p className="text-navy-100 text-sm leading-relaxed">
          {issue.description}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-semibold">Comments</span>

        <IssueCommentForm
          onCreateComment={handleCreateComment}
          isAuthenticated={isAuthenticated}
        />

        <div className="mt-3">
          <Suspense fallback={<IssueCommentsSkeleton />}>
            <IssueComentsList issueId={issue.id} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

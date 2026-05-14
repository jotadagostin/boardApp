import { getIssue } from "@/src/http/get-issue";
import { ArchiveIcon, MoveLeftIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { IssueComentsList } from "./isssue-coments/issue-comments-list";
import { Suspense } from "react";
import { IssueCommentsSkeleton } from "./isssue-coments/issue-comments-skeleton";
import { IssueLikeButton } from "./issue-like-button";
import { IssueCommentForm } from "./isssue-coments/issue-comment-form";
import { createComment } from "@/src/http/create-comment";
import { headers } from "next/dist/server/request/headers";
import { authClient } from "@/src/lib/auth-client";

interface IssuePageProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
  params,
}: IssuePageProps): Promise<Metadata> => {
  const { id } = await params;
  const issue = await getIssue({ id });

  return {
    title: `Issue ${issue.title}`,
  };
};

const statusLabels = {
  backlog: "Backlog",
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
} as const;

export default async function IssuePage({ params }: IssuePageProps) {
  const { id } = await params;
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(), // Pass the incoming request headers to maintain authentication context
    },
  });

  const issue = await getIssue({ id });

  const isAuthenticated = !!session?.user;

  async function handleCreateComment(text: string) {
    "use server"; // This directive indicates that this function should be executed on the server side

    await createComment({ issueId: id, text });
  }

  return (
    <main className="max-w-225 mx-auto w-full flex flex-col gap-4 p-6 bg-navy-800 border-[0.5px] border-navy-500 rounded-xl">
      <Link
        href="/"
        className="flex items-center gap-2 text-navy-200 hover:text-navy-100 transition-colors"
      >
        <MoveLeftIcon className="size-4" />
        <span className="text-sm">Back to board</span>
      </Link>
      <div className="flex items-center gap-2">
        <span className="bg-navy-700 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs">
          <ArchiveIcon className="size-3" />
          {statusLabels[issue.status]}
        </span>

        <IssueLikeButton issueId={issue.id} />
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
            <IssueComentsList issueId={id} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

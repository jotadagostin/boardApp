import { cacheLife, cacheTag } from "next/cache";
import { CommentsListResponseSchema } from "../api/routes/list-issue-comments";
import { clientEnv } from "../env";
import { setTimeout } from "node:timers/promises";

interface ListIssueCommentsParams {
  issueId: string;
}

export async function listIssueComments({ issueId }: ListIssueCommentsParams) {
  "use cache";

  cacheLife("minutes");
  cacheTag(`issue-comments-${issueId}`);

  await setTimeout(2000);

  const baseURL = clientEnv.NEXT_PUBLIC_API_URL;
  const url = baseURL
    ? new URL(`/api/issues/${issueId}/comments`, baseURL)
    : `/api/issues/${issueId}/comments`;

  const response = await fetch(url);
  const data = await response.json();

  return CommentsListResponseSchema.parse(data);
}

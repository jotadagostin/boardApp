import "server-only"; //to avoid erros in the client site

import { clientEnv } from "../env";
import { headers } from "next/dist/server/request/headers";
import { CommentSchema } from "../api/routes/list-issue-comments";
import { getCookiesFromHeaders } from "./utils/get-cookies-from-headers";
import { updateTag } from "next/cache";

interface CreateCommentParams {
  issueId: string;
  text: string;
}

export async function createComment({ issueId, text }: CreateCommentParams) {
  const url = new URL(
    `/api/issues/${issueId}/comments`,
    clientEnv.NEXT_PUBLIC_API_URL,
  );

  const incomingHeaders = await headers();

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ text }),
    headers: getCookiesFromHeaders(incomingHeaders),
  });

  const data = await response.json();

  updateTag(`issue-comments-${issueId}`);

  return CommentSchema.parse(data);
}

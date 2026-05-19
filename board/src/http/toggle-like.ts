import { LikeResponseSchema } from "../api/routes/schemas/issue-likes";
import { clientEnv } from "../env";

interface ToggleLikeParams {
  issueId: string;
}

export async function toggleLike({ issueId }: ToggleLikeParams) {
  const baseURL = clientEnv.NEXT_PUBLIC_API_URL;
  const url = baseURL
    ? new URL(`/api/issues/${issueId}/like`, baseURL)
    : `/api/issues/${issueId}/like`;
  const response = await fetch(url, {
    method: "POST",
  });
  const data = await response.json();

  return LikeResponseSchema.parse(data);
}

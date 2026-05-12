import { IssueInteractionsResponseSchema } from "../api/routes/schemas/issue-interactions";
import { clientEnv } from "../env";

interface GetIssueInteractionsParams {
  issueIds: string[];
}

export async function getIssueInteractions({
  issueIds,
}: GetIssueInteractionsParams) {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay

  const url = new URL(
    `/api/issues/interactions`,
    clientEnv.NEXT_PUBLIC_API_URL,
  );

  url.searchParams.set("issueIds", issueIds.join(","));

  const response = await fetch(url, {
    credentials: "include", // Include cookies for authentication
  });
  const data = await response.json();

  return IssueInteractionsResponseSchema.parse(data);
}

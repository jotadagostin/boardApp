import { IssueSchema } from "../api/routes/get-issue";
// import { setTimeout } from "node:timers/promises";

interface GetIssueParams {
  id: string;
}

export async function getIssue({ id }: GetIssueParams) {
  // await setTimeout(2000);

  const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

  const url = new URL(`/api/issues/${id}`, baseURL);

  const response = await fetch(url, { cache: "no-cache" });
  const data = await response.json();

  return IssueSchema.parse(data);
}

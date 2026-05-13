import { IssuesListResponseSchema } from "../api/routes/list-issues";
// import { clientEnv } from "../env";

interface ListIssuesParams {
  search?: string;
}

export async function listIssues({ search }: ListIssuesParams = {}) {
  const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
  const url = new URL("/api/issues", baseURL);

  if (search) {
    url.searchParams.set("search", search);
  }

  const response = await fetch(url, { cache: "no-cache" });

  const data = await response.json();

  return IssuesListResponseSchema.parse(data);
}

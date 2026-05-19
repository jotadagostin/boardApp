import { cacheLife } from "next/cache";
import { IssuesListResponseSchema } from "../api/routes/list-issues";
// import { clientEnv } from "../env";

interface ListIssuesParams {
  search?: string;
}

export async function listIssues({ search }: ListIssuesParams = {}) {
  "use cache"; //15 minutes

  cacheLife("minutes");

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  let url: URL | string = baseURL
    ? new URL("/api/issues", baseURL)
    : "/api/issues";

  if (search) {
    if (typeof url === "string") {
      const params = new URLSearchParams({ search });
      url = `/api/issues?${params.toString()}`;
    } else {
      url.searchParams.set("search", search);
    }
  }

  const response = await fetch(url, { cache: "no-cache" });

  const data = await response.json();

  return IssuesListResponseSchema.parse(data);
}

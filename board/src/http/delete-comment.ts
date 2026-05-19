interface DeleteCommentParams {
  issueId: string;
  commentId: string;
}

export async function deleteComment({
  issueId,
  commentId,
}: DeleteCommentParams) {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const url = baseURL
    ? new URL(`/api/issues/${issueId}/comments/${commentId}`, baseURL)
    : `/api/issues/${issueId}/comments/${commentId}`;

  console.log("Deleting comment:", { issueId, commentId, url: url.toString() });

  const response = await fetch(url, {
    method: "DELETE",
    credentials: "include",
  });

  console.log("Delete response:", { status: response.status, ok: response.ok });

  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    let errorData: unknown;

    try {
      if (contentType?.includes("application/json")) {
        errorData = await response.json();
      } else {
        errorData = await response.text();
      }
    } catch (e) {
      errorData = "Failed to parse error response";
    }

    console.error("Delete comment FAILED:", {
      status: response.status,
      statusText: response.statusText,
      url: url.toString(),
      contentType,
      errorData,
      responseHeaders: {
        "content-type": response.headers.get("content-type"),
        "content-length": response.headers.get("content-length"),
      },
    });
    throw new Error(
      `API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`,
    );
  }

  console.log("Comment deleted successfully");
}

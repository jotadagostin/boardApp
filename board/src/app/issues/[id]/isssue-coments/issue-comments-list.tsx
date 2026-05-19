import { DeleteCommentButton } from "@/src/app/@modal/(.)issues/[id]/delete-comment-button";
import { Comment } from "@/src/components/comment";
import { listIssueComments } from "@/src/http/list-issue-comments";
import { authClient } from "@/src/lib/auth-client";
import { formatDistanceToNow } from "date-fns";
import { headers } from "next/headers";
interface IssueComentsListProps {
  issueId: string;
}

export async function IssueComentsList({ issueId }: IssueComentsListProps) {
  const { comments } = await listIssueComments({ issueId });

  const { data: session } = await authClient.getSession({
    fetchOptions: { headers: await headers() },
  });

  if (comments.length === 0) {
    return (
      <p className="text-sm text-navy-400 text-center py-2">No comments yet.</p>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => {
        const isAuthor = session?.user?.name === comment.author.name;

        return (
          <Comment.Root key={comment.id}>
            <Comment.Avatar src={comment.author.avatar} />

            <Comment.Content>
              <Comment.Header>
                <Comment.Author>{comment.author.name}</Comment.Author>
                <Comment.Time>
                  {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                </Comment.Time>
                {isAuthor && (
                  <DeleteCommentButton
                    issueId={issueId}
                    commentId={comment.id}
                  />
                )}
              </Comment.Header>

              <Comment.Text>{comment.text}</Comment.Text>
            </Comment.Content>
          </Comment.Root>
        );
      })}
    </div>
  );
}

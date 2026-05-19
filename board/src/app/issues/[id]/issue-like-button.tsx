"use client";

import { LikeButton } from "@/src/components/like-button";
import { Skeleton } from "@/src/components/skeleton";
import { getIssueInteractions } from "@/src/http/get-issues-interactions";
import { useQuery } from "@tanstack/react-query";

interface IssueLikeButtonProps {
  issueId: string;
}

export function IssueLikeButton({ issueId }: IssueLikeButtonProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["issue-likes", issueId],
    queryFn: () => getIssueInteractions({ issueIds: [issueId] }),
    suspense: false,
  });

  if (isLoading) {
    return <Skeleton className="h-7 w-16" />;
  }
  const interaction = data?.interactions[0];

  return (
    <LikeButton
      issueId={issueId}
      initialLikes={interaction?.likesCount ?? 0}
      initialLiked={interaction?.isLiked ?? false}
    />
  );
}

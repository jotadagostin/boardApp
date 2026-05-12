import { ThumbsUpIcon } from "lucide-react";
import { Button } from "./button";
import { ComponentProps, MouseEvent } from "react";
import { toggleLike } from "../http/toggle-like";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IssueInteractionsResponseSchema } from "@/src/api/routes/schemas/issue-interactions";
import z from "zod";

interface LikeButtonProps extends ComponentProps<"button"> {
  issueId: string;
  initialLikes: number;
  initialLiked?: boolean;
}

type IssueInteractionResponse = z.infer<typeof IssueInteractionsResponseSchema>;

export function LikeButton({
  issueId,
  initialLikes,
  initialLiked = false,
  ...props
}: LikeButtonProps) {
  const queryClient = useQueryClient();

  const { mutate: onToggleLike, isPending } = useMutation({
    mutationFn: () => toggleLike({ issueId }),
    onMutate: async () => {
      const previousData = queryClient.getQueriesData<IssueInteractionResponse>(
        {
          queryKey: ["issue-likes"],
        },
      );

      queryClient.setQueriesData<IssueInteractionResponse>(
        {
          queryKey: ["issue-likes"],
        },
        (old) => {
          if (!old) {
            return undefined;
          }

          return {
            ...old,
            interactions: old.interactions.map((interaction) => {
              if (interaction.issueId === issueId) {
                return {
                  ...interaction,
                  isLiked: !interaction.isLiked,
                  likesCount: interaction.isLiked
                    ? interaction.likesCount - 1
                    : interaction.likesCount + 1,
                };
              }

              return interaction;
            }),
          };
        },
      );

      return { previousData };
    },
    onError: async (_err, _params, context) => {
      if (context?.previousData) {
        for (const [queryKey, data] of context.previousData) {
          queryClient.setQueryData<IssueInteractionResponse>(queryKey, data);
        }
      }
    },
  });

  const liked = initialLiked;

  function handleToggleLike(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    onToggleLike();
  }

  return (
    <Button
      {...props}
      data-liked={liked}
      className="data-[liked=true]:bg-indigo-600 data-[liked=true]:hover:bg-indigo-500 data-[liked=true]:text-white"
      aria-label={liked ? "Unlike" : "Like"}
      onClick={handleToggleLike}
      disabled={isPending}
    >
      <ThumbsUpIcon className="size-3" />
      <span className="text-sm">{initialLikes}</span>
    </Button>
  );
}

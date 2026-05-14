"use client";

import { Input } from "@/src/components/input";
import { Loader2Icon, MessageCirclePlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const createCommentSchema = z.object({
  text: z
    .string()
    .min(2, "Comment must be at least 2 characters long")
    .max(200),
});

type CreateCommentSchema = z.infer<typeof createCommentSchema>;

interface IssueCommentFormProps {
  onCreateComment: (text: string) => Promise<void>;
  isAuthenticated: boolean;
}

export function IssueCommentForm({
  onCreateComment,
  isAuthenticated,
}: IssueCommentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateCommentSchema>({
    resolver: zodResolver(createCommentSchema),
  });

  async function handleCreateComment(data: CreateCommentSchema) {
    await onCreateComment(data.text);
  }

  return (
    <form
      className="relative w-full"
      onSubmit={handleSubmit(handleCreateComment)}
    >
      <Input
        className="bg-navy-900 h-11 p-2.5 w-full"
        placeholder={
          isAuthenticated
            ? "Write a comment..."
            : "You must be logged in to comment"
        }
        disabled={!isAuthenticated || isSubmitting}
        {...register("text")}
      />
      {errors.text && (
        <span className="text-red-400 text-xs mt-1">{errors.text.message}</span>
      )}
      <button
        type="submit"
        disabled={isSubmitting || !isAuthenticated}
        className="flex items-center gap-2 text-indigo-400 absolute right-3 top-1/2 -translate-y-1/2 text-xs hover:text-indigo-300 cursor-pointer disabled:opacity-50"
      >
        Post Comment
        {isSubmitting ? (
          <Loader2Icon className="size-3 animate-spin" />
        ) : (
          <MessageCirclePlusIcon className="size-3" />
        )}
      </button>
    </form>
  );
}

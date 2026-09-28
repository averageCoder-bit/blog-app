import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Trash2 } from "lucide-react";

import API_URL from "../api";
import { commentCreateSchema } from "../validator/comments";
import type { Comment } from "../validator/comments";
import type { UserResponse } from "../validator/users";

interface CommentsProps {
  blogId: number;
  currentUser: UserResponse | null;
}

const getComments = async (blogId: number): Promise<Comment[]> => {
  const response = await axios.get(`${API_URL}/blogs/${blogId}/comments`);
  return response.data;
};

const createComment = async ({
  blogId,
  authorId,
  content,
}: {
  blogId: number;
  authorId: number;
  content: string;
}) => {
  const response = await axios.post(`${API_URL}/blogs/${blogId}/comments`, {
    content,
    author_id: authorId,
    blog_id: blogId,
  });

  return response.data;
};

const deleteComment = async ({
  commentId,
  userId,
}: {
  commentId: number;
  userId: number;
}) => {
  const response = await axios.delete(
    `${API_URL}/comments/${commentId}?user_id=${userId}`,
  );

  return response.data;
};

const Comments = ({ blogId, currentUser }: CommentsProps) => {
  const queryClient = useQueryClient();

  const [comment, setComment] = useState("");
  const [filter, setFilter] = useState<"all" | "mine">("all");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  const {
    data: comments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["comments", blogId],
    queryFn: () => getComments(blogId),
    enabled: Number.isInteger(blogId),
  });

  const createMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", blogId],
      });

      setComment("");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", blogId],
      });
    },
  });

  const handleSubmit = () => {
    if (!currentUser) {
      return;
    }

    const result = commentCreateSchema.safeParse({
      content: comment,
    });

    if (!result.success) {
      return;
    }

    createMutation.mutate({
      blogId,
      authorId: currentUser.id,
      content: result.data.content,
    });
  };

  const handleDelete = (commentId: number) => {
    if (!currentUser) {
      return;
    }

    deleteMutation.mutate({
      commentId,
      userId: currentUser.id,
    });
  };

  const filteredComments = comments
    .filter((comment) => {
      if (filter === "mine") {
        return comment.author_id === currentUser?.id;
      }

      return true;
    })
    .sort((a, b) => {
      const first = new Date(a.created_at).getTime();
      const second = new Date(b.created_at).getTime();

      if (sort === "newest") {
        return second - first;
      }

      return first - second;
    })
    .sort((a, b) => {
      const aMine = a.author_id === currentUser?.id;
      const bMine = b.author_id === currentUser?.id;

      if (aMine === bMine) {
        return 0;
      }

      return aMine ? -1 : 1;
    });

  return (
    <section className="mt-10 w-full">
      <h2 className="text-xl font-semibold">Comments</h2>

      {/* Write comment */}
      <div className="mt-5">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={
            currentUser ? "Write a comment..." : "Select a user to comment..."
          }
          maxLength={500}
          rows={4}
          disabled={!currentUser || createMutation.isPending}
          className="w-full resize-none rounded-xl border border-gray-200 p-4 text-sm outline-none focus:border-gray-400 disabled:cursor-not-allowed disabled:bg-gray-50"
        />

        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              !comment.trim() || !currentUser || createMutation.isPending
            }
            className="rounded-full bg-black px-5 py-2 text-sm text-white hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {createMutation.isPending ? "Commenting..." : "Comment"}
          </button>
        </div>
      </div>

      {/* Filter and sort */}
      <div className="mt-6 flex items-center justify-between border-b border-gray-200 pb-3">
        <p className="text-sm font-medium text-gray-600">
          {comments.length} comments
        </p>

        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as "all" | "mine")}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
          >
            <option value="all">All comments</option>
            <option value="mine">My comments</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "newest" | "oldest")}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* Comments */}
      <div className="mt-5 flex flex-col gap-5">
        {isLoading && (
          <p className="text-sm text-gray-500">Loading comments...</p>
        )}

        {isError && (
          <p className="text-sm text-red-500">Failed to load comments.</p>
        )}

        {!isLoading && !isError && filteredComments.length === 0 && (
          <p className="text-sm text-gray-500">No comments yet.</p>
        )}

        {filteredComments.map((comment) => (
          <article
            key={comment.id}
            className="rounded-xl border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">User #{comment.author_id}</p>

                <p className="text-xs text-gray-400">
                  {new Date(comment.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {comment.author_id === currentUser?.id && (
                <button
                  type="button"
                  title="Delete comment"
                  onClick={() => handleDelete(comment.id)}
                  disabled={deleteMutation.isPending}
                  className="cursor-pointer rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>

            <p className="mt-3 text-sm text-gray-700">{comment.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Comments;

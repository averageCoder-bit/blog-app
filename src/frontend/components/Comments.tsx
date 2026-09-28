import { useState } from "react";
import { Trash2 } from "lucide-react";
import { commentCreateSchema } from "../validator/comments";
import type { Comment } from "../validator/comments";

const placeholderComments: Comment[] = [
  {
    id: 1,
    user: "Kyle",
    content: "This is a really interesting article.",
    createdAt: "September 28, 2026",
  },
  {
    id: 2,
    user: "Maria",
    content: "I enjoyed reading this. The explanation was clear.",
    createdAt: "September 27, 2026",
  },
  {
    id: 3,
    user: "John",
    content: "I agree with the points made here.",
    createdAt: "September 26, 2026",
  },
  {
    id: 4,
    user: "Kyle",
    content: "I also wanted to add something about this topic.",
    createdAt: "September 25, 2026",
  },
  {
    id: 5,
    user: "Anna",
    content: "Thanks for sharing this!",
    createdAt: "September 24, 2026",
  },
  {
    id: 6,
    user: "Mark",
    content: "This gave me a different perspective.",
    createdAt: "September 23, 2026",
  },
  {
    id: 7,
    user: "Kyle",
    content: "Definitely something worth discussing further.",
    createdAt: "September 22, 2026",
  },
];

const Comments = () => {
  const [comments, setComments] = useState(placeholderComments);
  const [comment, setComment] = useState("");

  const currentUser = "Kyle";

  const handleSubmit = () => {
    const result = commentCreateSchema.safeParse({
      content: comment,
    });

    if (!result.success) {
      return;
    }

    const newComment: Comment = {
      id: Date.now(),
      user: currentUser,
      content: result.data.content,
      createdAt: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    setComments((prev) => [newComment, ...prev]);
    setComment("");
  };

  const handleDelete = (commentId: number) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
  };

  return (
    <section className="mt-10 w-full">
      <h2 className="text-xl font-semibold">Comments</h2>

      {/* Write comment */}
      <div className="mt-5">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          maxLength={500}
          rows={4}
          className="w-full resize-none rounded-xl border border-gray-200 p-4 text-sm outline-none focus:border-gray-400"
        />

        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!comment.trim()}
            className="rounded-full bg-black px-5 py-2 text-sm text-white hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Comment
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
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
            defaultValue="all"
          >
            <option value="all">All comments</option>
            <option value="mine">My comments</option>
          </select>

          <select
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
            defaultValue="newest"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* Comments */}
      <div className="mt-5 flex flex-col gap-5">
        {comments.map((comment) => (
          <article
            key={comment.id}
            className="rounded-xl border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{comment.user}</p>
                <p className="text-xs text-gray-400">{comment.createdAt}</p>
              </div>

              {comment.user === currentUser && (
                <button
                  type="button"
                  title="Delete comment"
                  onClick={() => handleDelete(comment.id)}
                  className="cursor-pointer rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-red-500"
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

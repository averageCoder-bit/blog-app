import { Heart, Eye, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { BlogResponse } from "../validator/blogs";
import { useMutation } from "@tanstack/react-query";
import { likeBlog, unlikeBlog } from "../api/likes";
import { useState } from "react";

interface BlogProps {
  blog: BlogResponse;
  currentUserId: number | null;
}

const Blog = ({ blog, currentUserId }: BlogProps) => {
  const [liked, setLiked] = useState(blog.liked);
  const [likeCount, setLikeCount] = useState(blog.like_count);
  const likeMutation = useMutation({
    mutationFn: () => {
      if (currentUserId === null) {
        throw new Error("You must be logged in to like a blog.");
      }

      return liked
        ? unlikeBlog(blog.id, currentUserId)
        : likeBlog(blog.id, currentUserId);
    },
    onSuccess: (data) => {
      console.log("Like response:", data);

      setLiked(data.liked);
      setLikeCount(data.like_count);
    },
  });
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/blogs/${blog.id}`)}
      className="relative flex h-full w-full flex-col justify-between rounded-2xl shadow-sm shadow-gray-200 transition-transform duration-300 ease-in-out hover:scale-102 hover:cursor-pointer"
    >
      {/* 
      <button
        type="button"
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white hover:cursor-pointer hover:bg-gray-100"
      >
        <Ellipsis size={20} />
      </button>
      */}

      {blog.image_url ? (
        <img
          className="h-[60%] rounded-t-2xl bg-gray-200 object-cover"
          src={blog.image_url}
          alt={blog.header}
        />
      ) : (
        <div className="flex h-[60%] items-center justify-center rounded-t-2xl bg-gray-200 text-sm text-gray-400">
          No image available
        </div>
      )}

      <div id="content" className="flex h-[25%] flex-col gap-2 p-4">
        <h1 title={blog.header} className="line-clamp-2 text-2xl font-semibold">
          {blog.header}
        </h1>

        <div className="flex flex-row items-center space-x-2">
          <img
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(blog.author_username)}`}
            alt={`${blog.author_username} profile`}
            className="h-5 w-5 rounded-full bg-gray-100"
          />

          <p className="text-xs text-gray-500">{blog.author_username}</p>
        </div>
      </div>

      <div className="flex w-full flex-row justify-between p-4">
        <div className="flex flex-row gap-4">
          <div className="flex flex-row items-center gap-2">
            <Eye size={15} />
            <p className="text-xs">0</p>
          </div>

          <button
            type="button"
            disabled={likeMutation.isPending || currentUserId === null}
            onClick={(e) => {
              e.stopPropagation();
              likeMutation.mutate();
            }}
            className="flex cursor-pointer flex-row items-center gap-2 disabled:cursor-not-allowed"
          >
            <Heart
              size={15}
              fill={liked ? "currentColor" : "none"}
              className={liked ? "text-red-500" : ""}
            />
            <p className="text-xs">{likeCount}</p>
          </button>

          <div className="flex flex-row items-center gap-2">
            <MessageSquare size={15} />
            <p className="text-xs">{blog.comment_count}</p>
          </div>
        </div>

        <p className="text-xs">
          {new Date(blog.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Blog;

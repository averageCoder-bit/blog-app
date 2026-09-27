import { Heart, Eye, MessageSquare, Ellipsis } from "lucide-react";

import type { BlogResponse } from "../validator/blogs";

interface BlogProps {
  blog: BlogResponse;
}

const Blog = ({ blog }: BlogProps) => {
  return (
    <div className="relative flex h-full w-full flex-col justify-between rounded-2xl shadow-sm shadow-gray-200 transition-transform duration-300 ease-in-out hover:scale-102 hover:cursor-pointer">
      {/* Management button - functionality later */}
      {/* 
      <button
        type="button"
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white hover:cursor-pointer hover:bg-gray-100"
      >
        <Ellipsis size={20} />
      </button>
      */}

      <img
        className="h-[60%] rounded-t-2xl bg-gray-200 object-cover"
        // src={blog.image_url ?? ""}
        alt={blog.header}
      />

      <div id="content" className="flex h-[25%] flex-col gap-2 p-4">
        <h1 title={blog.header} className="line-clamp-2 text-2xl font-semibold">
          {blog.header}
        </h1>

        <div className="flex flex-row items-center space-x-2">
          <img src="" alt="" className="h-5 w-5 rounded-full bg-gray-100" />

          <p className="text-xs text-gray-500">User {blog.author_id}</p>
        </div>
      </div>

      <div className="flex w-full flex-row justify-between p-4">
        <div className="flex flex-row gap-4">
          <div className="flex flex-row items-center gap-2">
            <Eye size={15} />
            <p className="text-xs">0</p>
          </div>

          <div className="flex flex-row items-center gap-2">
            <Heart size={15} />
            <p className="text-xs">0</p>
          </div>

          <div className="flex flex-row items-center gap-2">
            <MessageSquare size={15} />
            <p className="text-xs">0</p>
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

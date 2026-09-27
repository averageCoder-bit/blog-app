import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import type { BlogResponse } from "../validator/blogs";

const getBlog = async (id: number): Promise<BlogResponse> => {
  const response = await axios.get(`/api/blogs/${id}`);
  return response.data;
};

const BlogPreview = () => {
  const { id } = useParams();

  const blogId = Number(id);

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => getBlog(blogId),
    enabled: Number.isInteger(blogId),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    document.title = blog ? `${blog.header} | Chronicle` : "Blog | Chronicle";
  }, [blog]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center">
        <p className="text-sm text-gray-500">Loading data...</p>
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center">
        <p className="text-sm text-red-500">Failed to load blog.</p>
      </div>
    );
  }

  return (
    <article className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-10">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">User {blog.author_id}</p>

        <p className="text-sm text-gray-500">
          {new Date(blog.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <h1 className="text-4xl font-bold leading-tight">{blog.header}</h1>
      <p className="w-fit rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
        {blog.category}
      </p>
      {blog.excerpt && (
        <p className="text-lg leading-relaxed text-gray-600">{blog.excerpt}</p>
      )}
      <div className="aspect-video w-full overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={blog.image_url ?? ""}
          alt={blog.header}
          className="h-full w-full object-cover"
        />
      </div>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
};

export default BlogPreview;

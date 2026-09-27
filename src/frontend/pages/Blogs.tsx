import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Pen } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Pagination from "../components/Pagination";
import BlogGrid from "../layout/BlogGrid";
import type { BlogResponse } from "../validator/blogs";

const getBlogs = async (): Promise<BlogResponse[]> => {
  const response = await axios.get("/api/blogs");
  return response.data;
};

const Blogs = () => {
  useEffect(() => {
    document.title = "Blogs | Chronicle";
  }, []);

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 6;

  const {
    data: blogs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center py-10">
        <p className="text-sm text-gray-500">Loading blogs...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex w-full items-center justify-center py-10">
        <p className="text-sm text-red-500">Failed to load blogs.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const startIndex = (currentPage - 1) * blogsPerPage;

  const currentBlogs = blogs.slice(startIndex, startIndex + blogsPerPage);

  return (
    <div className="flex flex-col items-center justify-center py-2 pb-30">
      <BlogGrid blogs={currentBlogs} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <button
        title="Add a blog post"
        onClick={() => navigate("/blogs/create")}
        className="fixed bottom-8 right-8 flex h-15 w-15 items-center justify-center rounded-full bg-black hover:cursor-pointer hover:bg-black/90"
      >
        <Pen color="white" />
      </button>
    </div>
  );
};

export default Blogs;

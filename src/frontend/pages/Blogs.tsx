import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Pen } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SquarePen } from "lucide-react";
import API_URL from "../api";

import Pagination from "../components/Pagination";
import BlogGrid from "../layout/BlogGrid";
import type { BlogResponse } from "../validator/blogs";

const getBlogs = async (): Promise<BlogResponse[]> => {
  const response = await axios.get(`${API_URL}/blogs`);
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
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
    staleTime: 1000 * 60 * 5,
  });

  if (isError) {
    console.error(error);
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p className="text-sm text-gray-500">Loading blogs...</p>
      </div>
    );
  }

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const startIndex = (currentPage - 1) * blogsPerPage;

  const currentBlogs = blogs.slice(startIndex, startIndex + blogsPerPage);

  return (
    <div className="flex flex-col items-center justify-center py-2">
      {blogs.length === 0 ? (
        <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-2">
          <SquarePen size={40} />
          <h2 className="text-xl font-semibold">No blogs yet</h2>
          <p className="text-sm text-gray-500">
            There are no blog posts to display yet.
          </p>
        </div>
      ) : (
        <>
          <BlogGrid blogs={currentBlogs} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

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

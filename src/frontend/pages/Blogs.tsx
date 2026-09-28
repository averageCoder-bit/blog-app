import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Pen } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SquarePen } from "lucide-react";
import API_URL from "../api";
import type { UserResponse } from "../validator/users";
import Pagination from "../components/Pagination";
import BlogGrid from "../layout/BlogGrid";
import type { BlogResponse } from "../validator/blogs";

interface BlogsProps {
  search: string;
  currentUser: UserResponse | null;
  category: string;
  sort: "newest" | "oldest" | "title";
}

const getBlogs = async (): Promise<BlogResponse[]> => {
  const response = await axios.get(`${API_URL}/blogs`);
  return response.data;
};

const Blogs = ({ currentUser, search, category, sort }: BlogsProps) => {
  useEffect(() => {
    document.title = "Blogs | Chronicle";
  }, []);

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sort]);

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

  const filteredBlogs = blogs
    .filter((blog) => {
      const searchTerm = search.toLowerCase().trim();

      const matchesSearch =
        blog.header.toLowerCase().includes(searchTerm) ||
        (blog.excerpt?.toLowerCase().includes(searchTerm) ?? false);

      const matchesCategory = !category || blog.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === "newest") {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }

      if (sort === "oldest") {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      }

      return a.header.localeCompare(b.header);
    });

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const startIndex = (currentPage - 1) * blogsPerPage;

  const currentBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + blogsPerPage,
  );

  return (
    <div className="flex flex-col items-center justify-center py-2 pb-7">
      {blogs.length === 0 ? (
        <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-2">
          <SquarePen size={40} />
          <h2 className="text-xl font-semibold">No blogs yet</h2>
          <p className="text-sm text-gray-500">
            There are no blog posts to display yet.
          </p>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-2">
          <SquarePen size={40} />
          <h2 className="text-xl font-semibold">No blogs found</h2>
          <p className="text-sm text-gray-500">
            No blog posts match your search or filter.
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

      {currentUser && (
        <button
          title="Add a blog post"
          onClick={() => navigate("/blogs/create")}
          className="fixed bottom-8 right-8 flex h-15 w-15 items-center justify-center rounded-full bg-black hover:cursor-pointer hover:bg-black/90"
        >
          <Pen color="white" />
        </button>
      )}
    </div>
  );
};

export default Blogs;

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SquarePen, Pen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import BlogGrid from "../layout/BlogGrid";
import type { UserResponse } from "../validator/users";
import { getUserBlogs } from "../api/blogs";
interface UserBlogsProps {
  currentUser: UserResponse | null;
}

const UserBlogs = ({ currentUser }: UserBlogsProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 6;

  useEffect(() => {
    document.title = "My Blogs | Chronicle";
  }, []);

  const {
    data: blogs = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userBlogs", currentUser?.id],
    queryFn: () => getUserBlogs(currentUser!.id, currentUser!.id),
    enabled: currentUser !== null,
    staleTime: 1000 * 60 * 5,
  });

  if (isError) {
    console.error(error);
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] w-full items-center justify-center">
        <p className="text-sm text-gray-500">Loading blogs...</p>
      </div>
    );
  }
  if (!currentUser) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-2">
        <SquarePen size={40} />
        <h2 className="text-xl font-semibold">No user selected</h2>
        <p className="text-sm text-gray-500">
          Select a user to create or view your blogs.
        </p>
      </div>
    );
  }

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const startIndex = (currentPage - 1) * blogsPerPage;

  const currentBlogs = blogs.slice(startIndex, startIndex + blogsPerPage);

  return (
    <div className="flex flex-col items-center justify-center py-2 pb-7">
      {blogs.length === 0 ? (
        <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-2">
          <SquarePen size={40} />
          <h2 className="text-xl font-semibold">No blogs yet</h2>
          <p className="text-sm text-gray-500">
            You haven't created any blog posts yet.
          </p>
        </div>
      ) : (
        <>
          <BlogGrid blogs={currentBlogs} currentUser={currentUser} />

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

export default UserBlogs;

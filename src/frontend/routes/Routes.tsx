import { Navigate, Route, Routes } from "react-router-dom";

import BlogForm from "../forms/BlogForm";
import Blogs from "../pages/Blogs";
import type { UserResponse } from "../validator/users";
import UserBlogs from "../pages/UserBlogs";
import BlogPreview from "../layout/BlogPreview";

interface AppRoutesProps {
  currentUser: UserResponse | null;
  search: string;
  category: string;
  sort: "newest" | "oldest" | "title";
}

const AppRoutes = ({ currentUser, search, category, sort }: AppRoutesProps) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Blogs
            currentUser={currentUser}
            search={search}
            category={category}
            sort={sort}
          />
        }
      />
      <Route path="/blogs" element={<UserBlogs currentUser={currentUser} />} />
      <Route path="/blogs/:id" element={<BlogPreview />} />

      <Route
        path="/blogs/create"
        element={
          currentUser ? (
            <BlogForm currentUser={currentUser} />
          ) : (
            <Navigate to="/blogs" replace />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;

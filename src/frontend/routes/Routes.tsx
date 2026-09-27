import { Routes, Route } from "react-router-dom";

import BlogForm from "../forms/BlogForm";
import Blogs from "../pages/Blogs";
import type { UserResponse } from "../validator/users";
import UserBlogs from "../pages/UserBlogs";
import BlogPreview from "../layout/BlogPreview";

interface AppRoutesProps {
  currentUser: UserResponse | null;
}

const AppRoutes = ({ currentUser }: AppRoutesProps) => {
  return (
    <Routes>
      <Route path="/" element={<Blogs />} />
      <Route path="/blogs" element={<UserBlogs currentUser={currentUser} />} />
      <Route path="/blogs/:id" element={<BlogPreview />} />

      <Route
        path="/blogs/create"
        element={<BlogForm currentUser={currentUser} />}
      />
    </Routes>
  );
};

export default AppRoutes;

import { Routes, Route } from "react-router-dom";

import BlogForm from "../forms/BlogForm";
import Blogs from "../pages/Blogs";
import type { UserResponse } from "../validator/users";

interface AppRoutesProps {
  currentUser: UserResponse | null;
}

const AppRoutes = ({ currentUser }: AppRoutesProps) => {
  return (
    <Routes>
      <Route path="/" element={<Blogs />} />

      <Route
        path="/blogs/create"
        element={<BlogForm currentUser={currentUser} />}
      />
    </Routes>
  );
};

export default AppRoutes;

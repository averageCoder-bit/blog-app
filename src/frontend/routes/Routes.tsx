import { Routes, Route } from "react-router-dom";

import BlogForm from "../forms/BlogForm";
import Blogs from "../pages/Blogs";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Blogs />} />
      <Route path="/blogs/create" element={<BlogForm />} />
    </Routes>
  );
};

export default AppRoutes;

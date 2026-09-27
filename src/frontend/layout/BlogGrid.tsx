import Blog from "./Blog";
import type { BlogResponse } from "../validator/blogs";

interface BlogGridProps {
  blogs: BlogResponse[];
}

const BlogGrid = ({ blogs }: BlogGridProps) => {
  return (
    <div className="grid w-full max-w-7xl auto-rows-120 grid-cols-2 gap-10 p-4">
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogGrid;

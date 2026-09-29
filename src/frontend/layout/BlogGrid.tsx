import Blog from "./Blog";
import type { BlogResponse } from "../validator/blogs";
import type { UserResponse } from "../validator/users";

interface BlogGridProps {
  blogs: BlogResponse[];
  currentUser: UserResponse | null;
}

const BlogGrid = ({ blogs, currentUser }: BlogGridProps) => {
  return (
    <div className="grid w-full max-w-7xl auto-rows-120 grid-cols-1 gap-6 p-4 sm:grid-cols-2 sm:gap-10">
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          currentUserId={currentUser?.id ?? null}
        />
      ))}
    </div>
  );
};

export default BlogGrid;

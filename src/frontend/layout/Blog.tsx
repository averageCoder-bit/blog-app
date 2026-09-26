import { Heart, Eye, MessageSquare, Ellipsis } from "lucide-react";
import { blogs } from "../utils/blogs";

const Blog = () => {
  return (
    <>
      {blogs.map((blog, index) => (
        <div
          key={index}
          className="flex flex-col relative justify-between w-full h-full rounded-2xl shadow-sm shadow-gray-200 hover:scale-102 hover:cursor-pointer transition-transform duration-300 ease-in-out"
        >
          <img
            className="h-[60%] rounded-t-2xl bg-gray-200"
            src={blog.image}
            alt={blog.header}
          />
          <button className="absolute right-3 top-3 flex items-center justify-center rounded-full bg-white w-7 h-7 hover:cursor-pointer hover:bg-gray-100">
            <Ellipsis size={20} />
          </button>

          <div id="content" className="flex flex-col p-4 h-[25%] gap-2">
            <h1
              title={blog.header}
              className="text-2xl font-semibold line-clamp-2"
            >
              {blog.header}
            </h1>
            <div className="flex flex-row items-center space-x-2">
              <img src="" className="rounded-full bg-gray-100   h-5 w-5" />
              <p className="text-xs text-gray-500">{blog.author}</p>
            </div>
          </div>

          <div className="flex flex-row w-full justify-between p-4">
            <div className="flex flex-row gap-4">
              <div className="flex flex-row gap-2 items-center">
                <Eye size={15} />
                <p className="text-xs">{Number(blog.views)}</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Heart size={15} />
                <p className="text-xs">{Number(blog.likes)}</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <MessageSquare size={15} />
                <p className="text-xs">{Number(blog.comments)}</p>
              </div>
            </div>
            <p className="text-xs">{blog.created}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Blog;

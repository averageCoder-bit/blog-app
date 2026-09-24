import { Heart, Eye, MessageSquare } from "lucide-react";
import { blogs } from "../utils/blogs";

const Blog = () => {
  return (
    <>
      {blogs.map((blog, index) => (
        <div
          key={index}
          className="flex flex-col justify-between w-full h-full rounded-2xl shadow-sm shadow-gray-200 hover:scale-102 hover:cursor-pointer transition-transform duration-300 ease-in-out"
        >
          <img
            className="h-[60%] rounded-t-2xl bg-gray-200"
            src={blog.image}
            alt={blog.header}
          />

          <div id="content" className="flex flex-col p-4 h-[25%]">
            <h1 className="text-2xl font-semibold">{blog.header}</h1>
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
            <p className="text-sm">{blog.created}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Blog;

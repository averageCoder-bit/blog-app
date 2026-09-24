import BlogGrid from "../layout/BlogGrid";
import { Pen } from "lucide-react";

const Blogs = () => {
  return (
    <div className="flex flex-col items-center justify-center py-40">
      <BlogGrid />
      <button
        title="Add a blog post"
        className="fixed flex bottom-8 right-8 justify-center items-center w-15 h-15 bg-black rounded-full hover:bg-black/90 hover:cursor-pointer"
      >
        <Pen color="white" />
      </button>
    </div>
  );
};
export default Blogs;

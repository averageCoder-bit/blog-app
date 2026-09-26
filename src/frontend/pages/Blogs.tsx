import BlogGrid from "../layout/BlogGrid";
import { Pen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Blogs = () => {
  useEffect(() => {
    document.title = "Blogs | Chronicle";
  }, []);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center py-2 pb-30">
      <BlogGrid />
      <button
        title="Add a blog post"
        onClick={() => navigate("/blogs/create")}
        className="fixed flex bottom-8 right-8 justify-center items-center w-15 h-15 bg-black rounded-full hover:bg-black/90 hover:cursor-pointer"
      >
        <Pen color="white" />
      </button>
    </div>
  );
};
export default Blogs;

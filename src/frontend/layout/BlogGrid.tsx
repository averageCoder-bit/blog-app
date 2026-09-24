import Blog from "./Blog";
const BlogGrid = () => {
  return (
    <div className="grid grid-cols-2 w-full auto-rows-120 gap-10 p-4 max-w-7xl">
      <Blog />
    </div>
  );
};
export default BlogGrid;

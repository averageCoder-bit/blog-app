import { Search, Settings2 } from "lucide-react";
const SearchAndFilterBar = () => {
  return (
    <div className="flex flex-row justify-center items-center w-full gap-4">
      <div className="relative flex items-center">
        <Search className="absolute left-3 text-gray-400" size={20} />
        <input
          type="search"
          placeholder="Search..."
          className="border border-gray-200 bg-gray-100 w-90 py-2 pl-10 pr-4 rounded-3xl focus:outline-none"
        />
      </div>

      <button
        title="Filter"
        className="flex items-center justify-center rounded-full h-11 w-11 bg-gray-100 hover:cursor-pointer hover:bg-gray-50"
      >
        <Settings2 size={18} />
      </button>
    </div>
  );
};
export default SearchAndFilterBar;

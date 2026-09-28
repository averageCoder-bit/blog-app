import { Search, Settings2, Check, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type SearchAndFilterBarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  sort: "newest" | "oldest" | "title";
  onSortChange: (value: "newest" | "oldest" | "title") => void;
  categories: string[];
};

const SearchAndFilterBar = ({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  categories = [],
}: SearchAndFilterBarProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex w-full items-center justify-center gap-4">
      <div className="relative flex items-center">
        <Search className="absolute left-3 text-gray-400" size={20} />

        <div className="relative flex items-center">
          <Search className="absolute left-3 text-gray-400" size={20} />

          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-90 rounded-3xl border border-gray-200 bg-gray-100 py-2 pl-10 pr-10 focus:outline-none"
          />

          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              title="Clear search"
              className="absolute right-3 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      <div ref={filterRef} className="relative">
        <button
          type="button"
          title="Filter and sort"
          onClick={() => setShowFilters((prev) => !prev)}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-gray-100 hover:bg-gray-50"
        >
          <Settings2 size={18} />
        </button>

        {showFilters && (
          <div className="absolute right-0 top-13 z-20 w-64 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
            <div>
              <p className="px-2 pb-2 text-xs font-medium text-gray-500">
                Filter by category
              </p>

              <button
                type="button"
                onClick={() => {
                  onCategoryChange("");
                  setShowFilters(false);
                }}
                className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-100"
              >
                <span>All categories</span>

                {!category && <Check size={16} />}
              </button>

              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    onCategoryChange(item);
                    setShowFilters(false);
                  }}
                  className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-100"
                >
                  <span>{item}</span>

                  {category === item && <Check size={16} />}
                </button>
              ))}
            </div>

            <div className="my-2 border-t border-gray-100" />
            <div>
              <p className="px-2 pb-2 text-xs font-medium text-gray-500">
                Sort by
              </p>

              <button
                type="button"
                onClick={() => {
                  onSortChange("newest");
                  setShowFilters(false);
                }}
                className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-100"
              >
                <span>Newest</span>

                {sort === "newest" && <Check size={16} />}
              </button>

              <button
                type="button"
                onClick={() => {
                  onSortChange("oldest");
                  setShowFilters(false);
                }}
                className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-100"
              >
                <span>Oldest</span>

                {sort === "oldest" && <Check size={16} />}
              </button>

              <button
                type="button"
                onClick={() => {
                  onSortChange("title");
                  setShowFilters(false);
                }}
                className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-100"
              >
                <span>Title</span>

                {sort === "title" && <Check size={16} />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilterBar;

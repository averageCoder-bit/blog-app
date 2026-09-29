import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bell, User } from "lucide-react";
import Logo from "../components/Logo";
import Profile from "../components/Profile";
import SearchAndFilterBar from "../components/SearchAndFilterBar";
import type { UserResponse } from "../validator/users";
import { getUsers } from "../api/users";
import { getBlogs } from "../api/blogs";

type SortField = "date" | "title" | "likes" | "comments";
type SortOrder = "asc" | "desc";

interface NavbarProps {
  currentUser: UserResponse | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserResponse | null>>;
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  sort: SortField;
  onSortChange: (value: SortField) => void;
  order: SortOrder;
  onOrderChange: (value: SortOrder) => void;
}

const Navbar = ({
  currentUser,
  setCurrentUser,
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  order,
  onOrderChange,
}: NavbarProps) => {
  const [showUsers, setShowUsers] = useState(false);
  const usersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        usersRef.current &&
        !usersRef.current.contains(event.target as Node)
      ) {
        setShowUsers(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 5,
  });

  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs", currentUser?.id ?? null],
    queryFn: () => getBlogs(currentUser?.id ?? null),
    staleTime: 1000 * 60 * 5,
  });

  const categories = [...new Set(blogs.map((blog) => blog.category))];

  const handleUserSelect = (user: UserResponse) => {
    setCurrentUser(user);
    setShowUsers(false);
  };

  return (
    <nav className="fixed z-10 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col px-4 py-3 md:flex-row md:items-center md:justify-between md:py-4 gap-3 md:gap-4">
        <div className="flex w-full items-center justify-between md:w-auto md:justify-start gap-4">
          <Logo />
          <div className="flex flex-row items-center gap-2 md:hidden">
            <Profile />

            <button
              title="Notifications"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 shrink-0"
            >
              <Bell size={18} />
            </button>

            <div ref={usersRef} className="relative">
              <button
                type="button"
                title="User Profile"
                onClick={() => setShowUsers((prev) => !prev)}
                className="flex cursor-pointer flex-row items-center justify-center rounded-full border border-gray-200 px-1 py-1 hover:bg-gray-100 md:space-x-1.5"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100">
                  <User size={14} />
                </div>

                <p className="max-w-[64px] truncate text-xs font-medium text-gray-700">
                  {currentUser?.username ?? "Select"}
                </p>
              </button>

              {showUsers && (
                <div className="absolute right-0 mt-2 w-44 rounded-lg border border-gray-200 bg-white py-1.5 shadow-xl z-20">
                  <p className="px-3 py-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    Switch user
                  </p>
                  {isLoading && (
                    <p className="px-3 py-1 text-xs text-gray-500">
                      Loading...
                    </p>
                  )}
                  {isError && (
                    <p className="px-3 py-1 text-xs text-red-500">Error.</p>
                  )}
                  {!isLoading &&
                    !isError &&
                    users.map((user) => (
                      <button
                        key={user.id}
                        type="button"
                        onClick={() => handleUserSelect(user)}
                        className={`w-full cursor-pointer px-3 py-1.5 text-left text-xs hover:bg-gray-100 transition-colors ${
                          currentUser?.id === user.id
                            ? "font-semibold bg-blue-50 text-blue-600"
                            : "text-gray-700"
                        }`}
                      >
                        {user.username}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full flex-1 md:max-w-2xl md:mx-auto">
          <SearchAndFilterBar
            search={search}
            onSearchChange={onSearchChange}
            category={category}
            onCategoryChange={onCategoryChange}
            sort={sort}
            onSortChange={onSortChange}
            order={order}
            onOrderChange={onOrderChange}
            categories={categories}
          />
        </div>

        <div className="hidden md:flex flex-row items-center gap-3">
          <Profile />

          <button
            title="Notifications"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100"
          >
            <Bell size={20} />
          </button>

          <div ref={usersRef} className="relative">
            <button
              type="button"
              title="User Profile"
              onClick={() => setShowUsers((prev) => !prev)}
              className="flex cursor-pointer flex-row items-center justify-center space-x-2 rounded-full border border-gray-200 px-3 py-1.5 hover:bg-gray-100"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
                <User size={16} />
              </div>
              <p className="text-sm max-w-[80px] truncate font-medium">
                {currentUser?.username ?? "Select user"}
              </p>
            </button>

            {showUsers && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-xl z-20">
                <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Switch user
                </p>
                {isLoading && (
                  <p className="px-4 py-2 text-sm text-gray-500">Loading...</p>
                )}
                {!isLoading &&
                  !isError &&
                  users.map((user) => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => handleUserSelect(user)}
                      className={`w-full cursor-pointer px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                        currentUser?.id === user.id
                          ? "font-semibold bg-blue-50 text-blue-600"
                          : ""
                      }`}
                    >
                      {user.username}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

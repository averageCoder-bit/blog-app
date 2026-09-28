import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Bell, User } from "lucide-react";
import type { BlogResponse } from "../validator/blogs";
import Logo from "../components/Logo";
import Profile from "../components/Profile";
import SearchAndFilterBar from "../components/SearchAndFilterBar";
import type { UserResponse } from "../validator/users";
import API_URL from "../api";

interface NavbarProps {
  currentUser: UserResponse | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserResponse | null>>;

  search: string;
  onSearchChange: (value: string) => void;

  category: string;
  onCategoryChange: (value: string) => void;

  sort: "newest" | "oldest" | "title";
  onSortChange: (value: "newest" | "oldest" | "title") => void;
}

const getUsers = async (): Promise<UserResponse[]> => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

const getBlogs = async (): Promise<BlogResponse[]> => {
  const response = await axios.get(`${API_URL}/blogs`);
  return response.data;
};

const Navbar = ({
  currentUser,
  setCurrentUser,
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
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
    queryKey: ["blogs"],
    queryFn: getBlogs,
    staleTime: 1000 * 60 * 5,
  });

  const categories = [...new Set(blogs.map((blog) => blog.category))];

  const handleUserSelect = (user: UserResponse) => {
    setCurrentUser(user);
    setShowUsers(false);
  };

  return (
    <nav className="fixed z-10 flex w-full items-center justify-center border-b border-gray-200 bg-white">
      <div className="flex w-7xl flex-row items-center justify-evenly px-4 py-6">
        <Logo />

        <SearchAndFilterBar
          search={search}
          onSearchChange={onSearchChange}
          category={category}
          onCategoryChange={onCategoryChange}
          sort={sort}
          onSortChange={onSortChange}
          categories={categories}
        />

        <Profile />

        <div className="flex flex-row items-center justify-center gap-2">
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
              className="flex cursor-pointer flex-row items-center justify-center space-x-2 rounded-4xl px-3 py-1 hover:bg-gray-100"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200">
                <User />
              </div>

              <p className="text-sm w-20">
                {currentUser?.username ?? "Select user"}
              </p>
            </button>

            {showUsers && (
              <div className="absolute right-0 mt-2 w-44 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                <p className="px-4 py-2 text-xs font-medium text-gray-500">
                  Switch user
                </p>

                {isLoading && (
                  <p className="px-4 py-2 text-sm text-gray-500">
                    Loading users...
                  </p>
                )}

                {isError && (
                  <p className="px-4 py-2 text-sm text-red-500">
                    Failed to load users.
                  </p>
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
                          ? "font-medium bg-gray-50"
                          : ""
                      }`}
                    >
                      {user.username}
                    </button>
                  ))}

                {!isLoading && !isError && users.length === 0 && (
                  <p className="px-4 py-2 text-sm text-gray-500">
                    No users found.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

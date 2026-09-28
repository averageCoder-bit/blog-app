import { NavLink } from "react-router-dom";
import { useState } from "react";

const AppNavbar = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <nav className="mx-auto w-full max-w-7xl px-4 pt-36 sm:px-6 sm:pt-30">
      <ul className="mb-2 flex flex-row gap-1 sm:gap-2">
        <li>
          <NavLink
            to="/"
            onMouseEnter={() => setHovered("/")}
            onMouseLeave={() => setHovered(null)}
            className={({ isActive }) =>
              `border-b-2 px-4 py-2 transition-colors duration-200 sm:px-5 ${
                hovered === "/"
                  ? "border-gray-500"
                  : hovered === null && isActive
                    ? "border-gray-500"
                    : "border-transparent"
              }`
            }
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/blogs"
            end
            onMouseEnter={() => setHovered("/blogs")}
            onMouseLeave={() => setHovered(null)}
            className={({ isActive }) =>
              `border-b-2 px-4 py-2 transition-colors duration-200 sm:px-5 ${
                hovered === "/blogs"
                  ? "border-gray-500"
                  : hovered === null && isActive
                    ? "border-gray-500"
                    : "border-transparent"
              }`
            }
          >
            Blogs
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AppNavbar;

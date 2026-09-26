import { NavLink } from "react-router-dom";
import { useState } from "react";

const AppNavbar = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <nav className="w-full max-w-7xl mx-auto pt-30">
      <ul className="flex flex-row gap-2 mb-2">
        <li>
          <NavLink
            to="/"
            onMouseEnter={() => setHovered("/")}
            onMouseLeave={() => setHovered(null)}
            className={({ isActive }) =>
              `py-2 px-5 border-b-2 transition-colors duration-200 ${
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
              `py-2 px-5 border-b-2 transition-colors duration-200 ${
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

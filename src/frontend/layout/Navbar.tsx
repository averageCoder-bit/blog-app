import Logo from "../components/Logo";
import { Bell, User } from "lucide-react";
import Profile from "../components/Profile";
import SearchAndFilterBar from "../components/SearchAndFilterBar";
const Navbar = () => {
  return (
    <nav className="flex border-b w-full justify-center items-center border-gray-200 fixed bg-white z-10">
      <div className="flex flex-row w-7xl px-4 py-6 justify-evenly">
        <Logo />
        <SearchAndFilterBar />
        <Profile />
        <div className="flex flex-row justify-center items-center gap-2">
          <button
            title="Notifications"
            className="flex justify-center items-center hover:bg-gray-100 hover:cursor-pointer rounded-full h-10 w-10"
          >
            <Bell size={20} />
          </button>
          <button
            title="User Profile"
            className="flex flex-row justify-center items-center space-x-2 hover:bg-gray-100 hover:cursor-pointer rounded-4xl px-3 py-1"
          >
            <div className="rounded-full w-10 h-10 flex justify-center items-center border border-gray-200">
              <User />
            </div>
            <p className="text-sm">Username</p>
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

import Logo from "./Logo";
import Profile from "./Profile";
const Navbar = () => {
  return (
    <div className="flex border-b w-full justify-center items-center border-gray-200 fixed">
      <div className="flex flex-row w-7xl p-4 justify-between">
        <Logo />
        <Profile />
      </div>
    </div>
  );
};
export default Navbar;

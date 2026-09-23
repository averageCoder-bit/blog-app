import Notifications from "./Notifications";

const Profile = () => {
  return (
    <div className="flex flex-row justify-center items-center space-x-7">
      <Notifications />
      <div className="flex flex-row justify-center items-center space-x-2 hover:bg-gray-100 hover:cursor-pointer rounded-4xl px-2 py-1">
        <img className="rounded-full bg-gray-100 w-10 h-10" />
        <p className="text-sm">Username</p>
      </div>
    </div>
  );
};
export default Profile;

import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className=" flex flex-col p-3 max-w-lg mx-auto">
      <img
        className=" rounded-full object-cover my-6 outline-dotted outline-indigo-700 cursor-pointer self-center  w-24 h-24"
        src={currentUser.avatar}
      />
      <h1 className="font-semibold text-xl text-center  ">
        {currentUser.username}
      </h1>
      <form className=" flex flex-col justify-center gap-3   my-7 ">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded border-indigo-700"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded border-indigo-700"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded border-indigo-700"
          id="password"
        />
        <button className="uppercase rounded-lg p-4 bg-indigo-600 hover:opacity-90 disabled:opacity-75 text-white">Update</button>
      </form>
      <div className="flex justify-between text-white items-center">
        <span className="bg-red-500 p-1 rounded-md text-[12px]">Delete Account</span>
        <span className="bg-red-500 p-1 rounded-md text-[12px]">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;

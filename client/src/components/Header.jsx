import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-indigo-700 shadow-lg">
      <div className="flex justify-between items-center mx-auto max-w-6xl p-2">
        <h1 className="text-sm lg:text-2xl font-semibold flex flex-wrap">
          <span className="text-white">Home</span>
          <span className="text-white">Estate</span>
        </h1>
        <form className="bg-white py-2 pX-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="  Search..."
            className="bg-transparent w-24 lg:w-64 focus:outline-none"
          />
          <FaSearch className="text-slate-500 mr-3" />
        </form>
        <ul className=" flex gap-3">
          <Link to="/">
            <li className=" text-white hidden sm:inline">Home</li>
          </Link>
          <Link to="/about">
            <li className="text-white hidden sm:inline">About</li>
          </Link>
          <Link to="/signin">
            <li className="text-white">Sign In</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}

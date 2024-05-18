import { FaHome, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`search?${searchQuery}`);
  };

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
const searchTermFromUrl = urlParams.get('searchTerm');
if(searchTermFromUrl){
  setSearchTerm(searchTermFromUrl)
}

  },[location.search])

  return (
    <header className="bg-indigo-700 shadow-lg">
      <div className="flex justify-between items-center mx-auto max-w-6xl p-2">
        <h1 className="text-sm lg:text-2xl font-semibold flex flex-wrap items-center">
          <FaHome className="text-white" />
          <span className="text-white">Home</span>
          <span className="text-white">Estate</span>
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white py-2 pX-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="  Search..."
            className="bg-transparent w-24 lg:w-64 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-500 mr-3" />
          </button>
        </form>
        <ul className=" flex gap-3">
          <Link to="/">
            <li className=" text-white hidden sm:inline">Home</li>
          </Link>
          <Link to="/about">
            <li className="text-white hidden sm:inline">About</li>
          </Link>

          {currentUser ? (
            <Link to="/profile">
              <img
                className="rounded-full w-6 h-6 object-cover"
                src={currentUser.avatar}
                alt="Avatar"
              />
            </Link>
          ) : (
            <Link to="/signin">
              <li className="text-white">Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}

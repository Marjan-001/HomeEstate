import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-xl lg:text-3xl font-semibold text-center my-7 text-indigo-500 ">
        Sign Up
      </h1>
      <form className=" flex flex-col gap-3">
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border hover:border-indigo-400 p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          className="border hover:border-indigo-400 p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          className="border hover:border-indigo-400 p-3 rounded-lg"
        />
        <button className="uppercase rounded-lg p-4 bg-indigo-600 hover:opacity-90 disabled:opacity-75 text-white">
          Sign Up
        </button>
      </form>
      <div className="mt-2 flex gap-1">
        <p>Already have an account?</p>
        <Link to={'/signin'} className="text-blue-600">
          {" "}
          <span>Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default Register;

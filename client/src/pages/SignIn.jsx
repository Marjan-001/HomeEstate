import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const {loading,error}= useSelector((state)=>state.user)
 const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleForm = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart())
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
       dispatch(signInFailure(data.message))
        return;
      }
      dispatch(signInSuccess(data))
      navigate("/");
    } catch (error) {
    dispatch(signInFailure(error.message))
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-xl lg:text-3xl font-semibold text-center my-7 text-indigo-500 ">
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-3">
        <input
          type="text"
          placeholder="email"
          id="email"
          className="border hover:border-indigo-400 p-3 rounded-lg"
          onChange={handleForm}
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          className="border hover:border-indigo-400 p-3 rounded-lg"
          onChange={handleForm}
        />
        <button
          disabled={loading}
          className="uppercase rounded-lg p-4 bg-indigo-600 hover:opacity-90 disabled:opacity-75 text-white"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="mt-2 flex gap-1">
        <p>Do not have an account?</p>
        <Link to={"/register"} className="text-blue-600">
          {" "}
          <span>Sign Up</span>
        </Link>
      </div>
      {error && <p className=" text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default SignIn;

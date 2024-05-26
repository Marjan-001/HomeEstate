/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useDispatch } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      dispatch(signInStart())

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        dispatch(signInFailure(data.message))
        return;
      }
      setLoading(false);
      dispatch(signInSuccess(data))

      navigate("/");
    } catch (error) {
      setLoading(false);
      dispatch(signInFailure(error.message))

      setError(error.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-xl lg:text-3xl font-semibold text-center my-7 text-indigo-500 ">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-3">
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border hover:border-indigo-400 p-3 rounded-lg"
          onChange={handleForm}
        />
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
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth/>
      </form>
      <div className="mt-2 flex gap-1">
        <p>Already have an account?</p>
        <Link to={"/signin"} className="text-blue-600">

{" "}
          <span>Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default Register;

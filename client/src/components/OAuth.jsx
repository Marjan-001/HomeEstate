/* eslint-disable no-unused-vars */
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firbase.config";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const dispath = useDispatch();
  const navigate = useNavigate();

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL } = result.user;

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user?.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to authenticate with Google");
      }
      const data = await res.json();
      dispath(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Could not connect with google", error.message);
    }
  };

  return (
    <div>
      <button
      type="button"
        onClick={handleGoogle}
        className=" flex items-center justify-center gap-2 uppercase  w-full  rounded-lg p-4 bg-green-500 hover:opacity-90 disabled:opacity-75 text-white"
      >
        <FaGoogle className="size-6 outline-dotted rounded-lg outline-amber-600 p-1" />
        continue with google
      </button>
    </div>
  );
}

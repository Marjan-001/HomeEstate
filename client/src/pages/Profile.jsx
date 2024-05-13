import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firbase.config";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutUserFailure,
  signoutUserStart,
  signoutUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";
const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  // eslint-disable-next-line no-unused-vars
  let [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [formData, setFormData] = useState({});
  const [userListings, setUserListings] = useState([])
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // eslint-disable-next-line no-const-assign
        setFilePerc = Math.round(progress);
      },
      // eslint-disable-next-line no-unused-vars
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(e);
    try {
      dispatch(updateUserStart());
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  //delete account

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  // signout
  const handleSignOut = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutUserFailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess(data));
    } catch (error) {
      dispatch(signoutUserFailure(error.message));
    }
  };

  const handleShowListing = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingError(true);
        return;
      }
      setUserListings(data)
    } catch (error) {
      setShowListingError(true);
    }
  };

  return (
    
    <div className=" p-3 max-w-lg mx-auto">
     <h1 className="text-lg lg:text-2xl text-indigo-800 font-semibold text-center">Profile Details</h1>
     
      <p className="text-sm self-center">
        {fileUploadError ? (
          <span className="text-red-700">
            Error Image upload (image must be less than 2 mb)
          </span>
        ) : filePerc > 0 && filePerc < 100 ? (
          <span className="text-indigo-700">{`Uploading ${filePerc}%`}</span>
        ) : filePerc === 100 ? (
          <span className="text-green-700">Image successfully uploaded!</span>
        ) : (
          ""
        )}
      </p>
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col justify-center gap-3   my-7 "
      >
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className=" rounded-full object-cover my-6 outline-dotted outline-indigo-700 cursor-pointer self-center  w-24 h-24"
          src={formData.avatar || currentUser.avatar}
        />

        <h1 className="font-semibold text-xl text-center  ">
          {currentUser.username}
        </h1>

        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          className="border p-3 rounded border-indigo-700"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="border p-3 rounded border-indigo-700"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          onChange={handleChange}
          className="border p-3 rounded border-indigo-700"
          id="password"
        />
        <button
          disabled={loading}
          className="uppercase rounded-lg p-4 bg-indigo-600 hover:opacity-90 disabled:opacity-75 text-white"
        >
          {loading ? "Loading..." : "Update"}
        </button>
       
          <Link
            to={"/createlisting"}
            className="uppercase w-full  rounded-lg p-3 text-center bg-indigo-800 hover:opacity-90 disabled:opacity-75 text-white"
          >
            Create Listing
          </Link>
         
       
      </form>
     
     
      <button
            onClick={handleShowListing}
            className="uppercase w-full  rounded-lg p-3 text-center bg-indigo-800 hover:opacity-90 disabled:opacity-75 text-white"
          >
            Show Listing
          </button>
          <div className="flex my-2 justify-between text-white items-center">
        <span
          onClick={handleDelete}
          className="bg-red-500 p-1 cursor-pointer rounded-md text-[12px]"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignOut}
          className="bg-red-500 p-1 cursor-pointer rounded-md text-[12px]"
        >
          Sign Out
        </span>
      </div> 
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User is updated successfully!" : ""}
      </p>
      <p className="text-red-700 mt-5">
        {showListingError ? "Listing error" : ""}
      </p>
      {userListings &&
        userListings.length > 0 &&
        <div className="flex flex-col gap-4">
          <h1 className='text-center mt-7 text-indigo-800 text-2xl font-semibold'>My Listings</h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className='border border-indigo-300 rounded-lg p-3 flex justify-between items-center gap-4'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain'
                />
              </Link>
              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className='flex flex-col item-center'>
                <button className='text-red-700 text-sm'>Delete</button>
                <button className='text-green-700  text-sm'>Edit</button>
              </div>
            </div>
          ))}
        </div>}
    </div>
  );
};

export default Profile;

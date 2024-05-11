import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { app } from "../firbase.config";

const CreateListing = () => {
  const [files, setfiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });

  const [imageUploadError , setImageUploadError] = useState(false)
  const [uploading, setUploading] = useState(false);
  console.log(formData);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

    const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  // remove listing
  const handleRemoveImage = (index)=>{
setFormData({
  ...formData,
  imageUrls: formData.imageUrls.filter((_,i)=>i!==index)
})
  }
  return (
    <main className="p-3 max-w-7xl mx-auto">
      <h1 className="text-center text-indigo-600  text-xl font-semibold my-9">
        Create Your Listing
      </h1>
      <form className="flex flex-col lg:flex-row gap-8 ">
        <div className="flex flex-col gap-3 flex-1 border border-indigo-300 bg-indigo-200 p-5 rounded-lg">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-md"
            maxLength="50"
            minLength="8"
            id="name"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-md"
            maxLength="50"
            minLength="8"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-md"
            maxLength="50"
            minLength="8"
            id="address"
            required
          />
          <div className="flex gap-5 my-5 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking-spot" className="w-5" />
              <span>Parking-spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap my-5 gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-1 border border-gray-600 rounded-lg"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-1 border border-gray-600 rounded-lg"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                required
                className="p-1 border border-gray-600 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max="10"
                required
                className="p-1 border border-gray-600 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Discounted price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4 border border-indigo-300 bg-indigo-200 p-5 rounded-lg ">
          <p className="font-semibold text-indigo-700">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-1">
            <input
              onChange={(e) => setfiles(e.target.files)}
              className="p-3 border border-indigo-700 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-2  text-white border border-indigo-700  bg-indigo-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
            {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {
            formData.imageUrls.length >0 &&

            formData.imageUrls.map((url,index)=>(
            <div key={index} className="flex justify-between p-3 border items-center">
              <img src={url} alt="listing image" className="w-20 h-20 object-cover border rounded-lg " />
           
           <button onClick={()=> handleRemoveImage(index)} type="button" className="p-2 text-red-500 uppercase border border-red-500 font-semibold rounded-sm">
            Delete
           </button>
            </div>
            ))
          }
          <button className="p-3 bg-indigo-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
          
        </div>
      </form>
    </main>
  );
};

export default CreateListing;

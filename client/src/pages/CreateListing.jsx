const CreateListing = () => {
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
          <p className='font-semibold text-indigo-700'>Images:
          <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
          </p>
          <div className="flex gap-1">
            <input className='p-3 border border-indigo-700 rounded w-full' type="file" id='images' accept='image/*' multiple />
            <button className='p-2 text-white border border-indigo-700  bg-indigo-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
          </div>
        <button className='p-3 bg-indigo-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;

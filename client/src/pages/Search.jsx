const Search = () => {
  return (
    <div className=" flex flex-col md:flex-row">
      <div className="p-9  bg-indigo-200 border-b-2 border-dashed  border-b-indigo-500 md:border-r-2 md:border-r-indigo-500 md:min-h-screen">
        <form className=" flex flex-col gap-9">
          <div className=" flex   items-center  gap-2">
            <label className="whitespace-nowrap font-semibold">Search For:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border border-indigo-600 p-1 w-full rounded-lg"
            />
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-5" />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Other facilities:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              id="sort_order"
              className=" border border-indigo-600 p-1 rounded-lg"
            >
              <option>Price high to low</option>
              <option>Price low to high</option>
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>
          <button className="bg-indigo-700 w-full self-center rounded-lg uppercase text-white p-3 hover:opacity-90 ">Search</button>
        </form>
      </div>

      <div className=" p-7 text-xl lg:text-3xl text-indigo-700 font-bold">
        <h1>Listing Results</h1>
      </div>
    </div>
  );
};

export default Search;

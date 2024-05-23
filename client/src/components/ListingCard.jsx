/* eslint-disable react/prop-types */
import { FaMapSigns } from "react-icons/fa";
import { Link } from "react-router-dom";

const ListingCard = ({ item }) => {
  
  return (
    <div className=" bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-xl w-full sm:w-[330px]  ">
      <Link to={`/listing/${item._id}`}>
        <div className=" ">
          <figure>
            <img
              className="hover:scale-105 h-[320px] sm:h-[220px] w-full object-cover transition-scale duration-300"
              src={item.imageUrls[0]}
              alt="property image"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              {item.offer ? (
                <div className="badge badge-secondary">offer</div>
              ) : (
                ""
              )}
            </h2>
            <div className="flex items-center gap-3">
              <FaMapSigns className="text-red-500" />
              <p className="truncate w-full">{item.address}</p>
            </div>
            <p className="line-clamp-2">{item.description}</p>
            <div className="card-actions justify-start ">
              <p className="font-bold text-indigo-400 text-xl flex items-center ">
                {" "}
                ${" "}
                {item.offer
              ? item.discountPrice
              : item.regularPrice}
                {item.type === "rent" && "/ month"}
              </p>
            </div>
            <div className="flex items-center gap-4 text-indigo-700">
              <div className=" text-sm font-bold ">
                {item.bedrooms > 1
                  ? `${item.bedrooms} beds `
                  : `${item.bedrooms} bed`}
              </div>
              <div className=" text-sm font-bold">
                {item.bathrooms > 1
                  ? `${item.bathrooms} baths `
                  : `${item.bathrooms} bath`}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;

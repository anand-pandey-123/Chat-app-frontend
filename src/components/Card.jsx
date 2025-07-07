import React from "react";
import { Link } from "react-router-dom";

const Card = ({ name }) => {
  return (
    <div className="w-full flex flex-col sm:flex-row items-center p-4 sm:p-5 justify-between bg-white shadow-xl rounded-xl min-h-[90px]">
      <div className="flex items-center gap-4 w-full sm:w-auto mb-3 sm:mb-0">
        <div className="bg-blue-400 h-12 w-12 rounded-full flex-shrink-0 overflow-hidden">
          <img
            className="rounded-full h-full w-full object-cover"
            src={name.profileImg}
            alt=""
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-base sm:text-lg font-semibold">
            {name.firstName} {name.lastName}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 truncate max-w-[120px] sm:max-w-xs">
            @{name.bio}...
          </p>
        </div>
      </div>
      <Link to={"/chat/" + name._id} className="w-full sm:w-auto">
        <button className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition text-sm sm:text-base mt-2 sm:mt-0">
          Chat
        </button>
      </Link>
    </div>
  );
};

export default Card;

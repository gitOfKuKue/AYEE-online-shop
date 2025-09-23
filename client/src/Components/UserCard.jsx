import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  const profilePath = "/src/assets/profiles/";

  return (
    <Link to={`./${user?.id}`} className="p-6 border border-gray-200 rounded-2xl shadow-lg flex flex-col md:flex-row items-start md:items-center gap-6 bg-[var(--pure-white)] hover:shadow-xl transition-shadow duration-300">
      {/* Profile Image */}
      <div className="w-28 h-28 overflow-hidden rounded-full flex-shrink-0 border-2 border-gray-300">
        <img
          src={`${profilePath}${user?.profileImage || "defaultProfilePic.png"}`}
          alt={`${user?.firstName || "User"} - profile pic`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* User Info */}
      <div className="flex flex-col justify-center gap-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-800">
            {user?.firstName} {user?.lastName}
          </h1>
          <span className="text-sm text-gray-500 px-2 py-1 rounded-full bg-gray-100 capitalize">
            {user?.role}
          </span>
        </div>

        <p className="text-sm text-gray-600">
          <span className="font-semibold">Email:</span> {user?.email}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Phone:</span> {user?.phone}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Tier:</span>{" "}
          {user?.membershipTier || "Bronze"}
        </p>
      </div>
    </Link>
  );
};

export default UserCard;

import React from "react";
import { Link } from "react-router-dom";

import notFoundPic from "../assets/images/404NotFound.svg";
import Lottie from "lottie-react";
import errorPic from "../assets/animation-pics/Error 404.json";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#FF8282] text-center px-5">
      {/* <img src={notFoundPic} alt="404 Not Found Pic" className="w-150" /> */}
      <Lottie animationData={errorPic} loop autoPlay />
      <p className="text-font2 mb-6">
        Sorry, the page you are looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-font2 text-red-400 font-semibold rounded hover:bg-red-500 hover:text-white transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;

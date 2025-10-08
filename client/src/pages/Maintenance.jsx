import React from "react";
import { Link } from "react-router-dom";

import maintenancePic from "../assets/images/maintenance.svg";
import maintenanceAnimatePic from "../assets/animation-pics/Update  App.json";
import logo from "../assets/logo/AYEE_onlyLOGO.svg"; 
import Lottie from "lottie-react";


const Maintenance = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F9FBE7] text-center px-5">
      {/* <img src={maintenancePic} alt="Maintenance" className="w-100 mb-6" /> */}
      <Lottie animationData={maintenanceAnimatePic} loop autoPlay />
      <h1 className="text-font2 text-4xl font-bold mb-3">We'll back soon!</h1>
      <p className="text-font2 mb-6">
        Our website is currently undergoing scheduled maintenance. <br />
        We’ll be back shortly!
      </p>
      <h1 className="text-font2-light flex items-center">&copy; <img src={logo} alt="LOGO" className="w-10" /> AYEE - Online Shop</h1>
    </div>
  );
};

export default Maintenance;

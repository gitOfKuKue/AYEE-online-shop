import React from "react";

const CustomBtn = ({ title, status, className, type }) => {
  const patternSets = {
    200: {
      color1: "bg-iconic",
      color2: "bg-emerald-600",
      color3: "bg-emerald-800",
    },
    404: {
      color1: "bg-red-400",
      color2: "bg-red-600",
      color3: "bg-red-800",
    },
  };
  return (
    <button
      type={type}
      className={`${className} text-xl w-32 h-12 rounded ${patternSets[status]?.color1} text-white relative overflow-hidden group z-10 hover:text-white duration-1000`}
    >
      <span
        className={`absolute ${patternSets[status]?.color2} w-36 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all`}
      />
      <span
        className={`absolute ${patternSets[status]?.color3} w-36 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all`}
      />
      {title}
    </button>
  );
};

export default CustomBtn;

import React from "react";

import yes_no from "../../assets/images/yes_no.svg";
import { useNavigate } from "react-router";
import useConfirmationStore from "../../Common/Store/useConfirmationStore";
import useAuthStore from "../../Common/Store/useAuthStore";

const Confirmation = () => {
  const navigate = useNavigate();
  const {
    isConfirmation,
    setIsConfirmation,
    setIsConfirm,
    confirmMessage,
    confirmStatus,
  } = useConfirmationStore();
  const { performLogOut } = useAuthStore();

  // Hide / Show
  if (!isConfirmation || !confirmStatus) return null;

  const handleYes = () => {
    setIsConfirm(true);
    setIsConfirmation(false);

    if (confirmStatus === "logout") {
      performLogOut(navigate);
    }
  };

  const handleNo = () => {
    setIsConfirm(false);
    setIsConfirmation(false);
  };

  return (
    <div className="fixed bg-[#FFFFF0] top-1/2 left-1/2 w-100 shadow-xl p-3 rounded-[var(--standard-radius)] -translate-1/2">
      <img src={yes_no} alt="Confirmation Pic" className="w-50 mx-auto" />
      <h1 className="text-center text-xl mb-5">{confirmMessage}</h1>
      <div className="flex justify-evenly items-center">
        <button
          className="w-30 h-10 rounded-[var(--standard-radius)] cursor-pointer text-font1 bg-[#06923E] hover:bg-gray-500"
          onClick={handleYes}
        >
          Yes
        </button>
        <button
          className="w-30 h-10 rounded-[var(--standard-radius)] cursor-pointer text-font1 bg-[#E62727] hover:bg-gray-500"
          onClick={handleNo}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default Confirmation;

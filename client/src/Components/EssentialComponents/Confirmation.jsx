import React, { useEffect, useState } from "react";

import yes_no from "../../assets/images/yes_no.svg";
import { useNavigate } from "react-router";
import useConfirmationStore from "../../Common/Store/useConfirmationStore";
import useAuthStore from "../../Common/Store/useAuthStore";
import useUser from "../../Hook/useUser";
import useAPICalling from "../../Common/useAPICalling";

const Confirmation = () => {
  const { data } = useUser();
  const { fetchUsers, baseUrl } = useAPICalling();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!data?.user?.id) return;

    const loadUsers = async () => {
      const users = await fetchUsers();
      const user = users.find((u) => String(u.id) === String(data.user.id));
      setUser(user);
    };

    loadUsers();
  }, [fetchUsers, data?.user?.id]);

  const navigate = useNavigate();
  const {
    isConfirmation,
    setIsConfirmation,
    setIsConfirm,
    confirmMessage,
    confirmStatus,
  } = useConfirmationStore();
  const { performLogOut, deleteUser } = useAuthStore();

  // Hide / Show
  if (!isConfirmation || !confirmStatus) return null;

  const handleYes = () => {
    setIsConfirm(true);
    setIsConfirmation(false);

    if (confirmStatus === "logout") {
      performLogOut(user, baseUrl, navigate);
    } else if (confirmStatus === "deleteUser") {
      deleteUser(user, baseUrl);
      performLogOut(user, baseUrl, navigate);
    }
  };

  const handleNo = () => {
    setIsConfirm(false);
    setIsConfirmation(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Modal container */}
      <div className="bg-white w-[90%] max-w-md rounded-xl shadow-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="px-8 pt-8 pb-4 text-center">
          {/* Optional icon */}
          <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-red-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 100 20 10 10 0 000-20z"
              />
            </svg>
          </div>

          {/* Message */}
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            {confirmMessage}
          </h1>
          <p className="text-gray-600">
            This action cannot be undone. Are you sure?
          </p>
        </div>

        {/* Action buttons */}
        <div className="border-t border-gray-200 flex flex-col sm:flex-row">
          <button
            onClick={handleNo}
            className="w-full sm:w-1/2 py-4 text-gray-700 font-medium hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleYes}
            className="w-full sm:w-1/2 py-4 text-white font-medium bg-red-500 hover:bg-red-600 transition-colors"
          >
            Yes, proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;

// src/components/AlertCard.jsx
import React from "react";
import done from "../../assets/icons/done.png";
import fail from "../../assets/icons/fail.png";
import warning from "../../assets/icons/warning.png";
import useAlertStore from "../../Common/Store/useAlertStore";

const AlertCard = () => {
  const { isAlert, alertMessage, alertStatus } = useAlertStore();

  const alertTypes = {
    200: { title: "Done!", icon: done, color: "#06923E" },
    404: { title: "Fail!", icon: fail, color: "#E62727" },
    500: { title: "Something wrong!", icon: warning, color: "#3396D3" },
  };

  if (!isAlert || !alertStatus) return null;

  return (
    <div className="fixed bottom-5 right-5 bg-[#FFFFF0] w-100 py-3 px-2 rounded-[var(--standard-radius)] border shadow-lg">
      <div className="flex items-center gap-2">
        <img
          src={alertTypes[alertStatus]?.icon}
          alt="Alert icon"
          className="w-8"
        />
        <div>
          <h1
            className="font-bold"
            style={{ color: alertTypes[alertStatus]?.color }}
          >
            {alertMessage}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;

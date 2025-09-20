import { create } from "zustand";

let alertTimer;

const useAlertStore = create((set) => ({
  isAlert: false,
  alertMessage: "",
  alertStatus: null,
  setIsAlert: (value) => set({ isAlert: value }),
  handleAlert: (message, status) => {
    clearTimeout(alertTimer);
    set({ isAlert: true, alertMessage: message, alertStatus: status });
    alertTimer = setTimeout(() => set({ isAlert: false }), 2000);
  },
}));

export default useAlertStore;

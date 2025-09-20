import { create } from "zustand";

const useConfirmationStore = create((set) => ({
  isConfirmation: false,
  isConfirm: false,
  confirmMessage: "",
  confirmStatus: null,

  setIsConfirmation: (value) => set({ isConfirmation: value }),
  setIsConfirm: (value) => set({ isConfirm: value }),

  handleConfirmation: (message, status) => {
    set({
      isConfirmation: true,
      confirmMessage: message,
      confirmStatus: status,
    });
  },
}));

export default useConfirmationStore;

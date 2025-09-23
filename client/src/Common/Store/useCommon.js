import { create } from "zustand";

const useCommon = create((set) => ({
  searchQuery: "",
  setSearchQuery: (value) => set({ searchQuery: value }),
}));

export default useCommon;
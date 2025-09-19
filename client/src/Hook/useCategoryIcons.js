import { create } from "zustand";
import {
  faBlender,
  faCheck,
  faCoffee,
  faCow,
  faMartiniGlass,
  faMartiniGlassCitrus,
  faMugSaucer,
  faWhiskeyGlass,
} from "@fortawesome/free-solid-svg-icons";

const useCategoryIcons = create((set) => ({
  categoryIcons: {
    all: { name: "All", icon: faCheck, isCurrent: true },
    softDrink: { name: "Soft Drink", icon: faWhiskeyGlass, isCurrent: false },
    coffee: { name: "Coffee", icon: faCoffee, isCurrent: false },
    smoothie: { name: "Smoothie", icon: faBlender, isCurrent: false },
    juice: { name: "Juice", icon: faMartiniGlassCitrus, isCurrent: false },
    mocktail: { name: "Mocktail", icon: faMartiniGlass, isCurrent: false },
    milkshake: { name: "Milk Shake", icon: faCow, isCurrent: false },
    tea: { name: "Tea", icon: faMugSaucer, isCurrent: false },
  },

  // Update active category
  handleCategoryActive: (key) =>
    set((state) => {
      const updated = {};
      for (const k in state.categoryIcons) {
        updated[k] = {
          ...state.categoryIcons[k],
          isCurrent: k === key, // only the clicked one becomes true
        };
      }
      return { categoryIcons: updated };
    }),

  // Optional helpers (not needed if you always know categories)
  clearCategories: () =>
    set({
      categoryIcons: {},
    }),
}));

export default useCategoryIcons;

import { create } from "zustand";

const useCategory = create((set) => ({
  // ✅ return unique category names from products
  categories: (products) => {
    if (!products) return [];
    return [...new Set(products.map((p) => p.category))];
  },
  // ✅ count how many products in each category
  categoryCounts: (products) => {
    if (!products) return {};
    return products.reduce((acc, item) => {
      const cat = item.category;
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});
  },
  // ✅ toggle active category menu
  handleCategoryActive: (key) =>
    set((state) => {
      const updated = state.categoryMenus.map((menu) => ({
        ...menu,
        isCurrent: menu.title === key,
      }));
      return { categoryMenus: updated };
    }),

  // ✅ store & reset menus
  categoryMenus: [{ title: "All", isCurrent: true }],
  setCategoryMenus: (menus) => set({ categoryMenus: menus }),
  clearCategories: () =>
    set({ categoryMenus: [{ title: "All", isCurrent: true }] }),
}));

export default useCategory;

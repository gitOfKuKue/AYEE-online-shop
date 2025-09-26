import { create } from "zustand";

const useAPICalling = create((set, get) => ({
  productImagePath: (image) => {
    const { baseUrl } = get();
    return `${baseUrl}/uploads/products/${image}`;
  },
  userProfilePath: (image) => {
    const { baseUrl } = get();
    return `${baseUrl}/uploads/users/${image}`;
  },
  baseUrl: "http://localhost:8000",
  products: [],
  setProducts: (product) => set({ products: product }),
  fetchProducts: async () => {
    try {
      const { baseUrl } = get();
      const productResponse = await fetch(`${baseUrl}/api/products`);
      const fetchedProducts = await productResponse.json();
      set({ products: fetchedProducts });
      return fetchedProducts;
    } catch (error) {
      console.log(error.message);
    }
  },
  users: [],
  setUsers: (user) => set({ users: user }),
  fetchUsers: async () => {
    try {
      const { baseUrl } = get();
      const usersResponse = await fetch(`${baseUrl}/api/users`);
      const fetchedUsers = await usersResponse.json();
      set({ users: fetchedUsers });
      return fetchedUsers;
    } catch (error) {
      console.log(error.message);
    }
  },
}));

export default useAPICalling;

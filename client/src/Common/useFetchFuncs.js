import { create } from "zustand";

const useFetchFuncs = create((set, get) => ({
  baseUrl: "http://localhost:8000",
  fetchProducts: async () => {
    try {
      const { baseUrl } = get();
      const productResponse = await fetch(`${baseUrl}/api/products`);
      const fetchedProducts = await productResponse.json();
      return fetchedProducts;
    } catch (error) {
      console.log(error.message);
    }
  },
  fetchCartItems: async () => {
    try {
      const { baseUrl } = get();
      const productResponse = await fetch(`${baseUrl}/api/cartItems`);
      const fetchedProducts = await productResponse.json();
      return fetchedProducts;
    } catch (error) {
      console.log(error.message);
    }
  },
}));

export default useFetchFuncs;

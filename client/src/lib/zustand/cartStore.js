import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      total: 0,

      calculateTotal: () =>
        set((state) => ({
          total: state.cart.reduce(
            (acc, item) => acc + item.product_price * item.qty,
            0
          ),
        })),

      addToCart: (product) =>
        set((state) => {
          const existingProduct = state.cart.find(
            (item) => item.id === product.id
          );
          if (existingProduct) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id ? { ...item, qty: item.qty + 1 } : item
              ),
            };
          } else {
            return {
              cart: [...state.cart, { ...product, qty: 1 }],
            };
          }
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),

      increaseQty: (productId) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, qty: item.qty + 1 } : item
          ),
        })),
      decreaseQty: (productId) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId && item.qty > 1
              ? { ...item, qty: item.qty - 1 }
              : item
          ),
        })),

      clearCart: () =>
        set((state) => ({
          cart: [],
          total: 0,
        })),
    }),
    {
      name: "cart-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useCartStore;

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: {},
      token: "",
      setUserAndToken: (user, token) => set({ user, token }),
      logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        set({ user: {}, token: "" });
      },
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;

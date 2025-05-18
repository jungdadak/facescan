import { create } from "zustand";

interface UserStore {
  userName: string | null;
  setUser: (name: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userName: null,
  setUser: (name) => set({ userName: name }),
  clearUser: () => set({ userName: null }),
}));

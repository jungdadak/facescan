import { create } from "zustand";

interface ImageStore {
  imageUrl: string | null;
  setImageUrl: (url: string) => void;
  clearImageUrl: () => void;
}

export const useImageStore = create<ImageStore>((set) => ({
  imageUrl: null,
  setImageUrl: (url) => set({ imageUrl: url }),
  clearImageUrl: () =>
    set((state) => {
      if (state.imageUrl) URL.revokeObjectURL(state.imageUrl);
      return { imageUrl: null };
    }),
}));

import { create } from "zustand";

import {
  IFaceProcessingResult,
  IUserFullDetailAnalysis,
} from "@/fetcher/uploadImage";

interface UserState {
  nickname: string;
  detailAnalysis: IUserFullDetailAnalysis | null;
  setUserResult: (result: IFaceProcessingResult) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  nickname: "",
  detailAnalysis: null,
  setUserResult: (result) =>
    set({
      nickname: result.nickname,
      detailAnalysis: result.detailAnalysis,
    }),
  clearUser: () =>
    set({
      nickname: "",
      detailAnalysis: null,
    }),
}));

import { create } from "zustand";

type UIState = {
  mobileOpen: boolean;
  toggleMobile: () => void;
  closeMobile: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  mobileOpen: false,
  toggleMobile: () => set((s) => ({ mobileOpen: !s.mobileOpen })),
  closeMobile: () => set({ mobileOpen: false }),
}));

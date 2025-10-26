// store/useSavedStore.ts
"use client";

import { create } from "zustand";
import { persist, type PersistStorage } from "zustand/middleware";
import Cookies from "js-cookie";

interface SavedState {
  savedAgents: number[];
  savedServices: number[];
  toggleSaveAgent: (id: number) => void;
  toggleSaveService: (id: number) => void;
  isAgentSaved: (id: number) => boolean;
  isServiceSaved: (id: number) => boolean;
  clearAllSaved: () => void;
}

const cookieStorage: PersistStorage<SavedState> = {
  getItem: (name) => {
    const value = Cookies.get(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name, value) => {
    Cookies.set(name, JSON.stringify(value), { expires: 30 });
  },
  removeItem: (name) => {
    Cookies.remove(name);
  },
};

export const useSavedStore = create<SavedState>()(
  persist(
    (set, get) => ({
      savedAgents: [],
      savedServices: [],

      toggleSaveAgent: (id) =>
        set((state) => {
          const exists = state.savedAgents.includes(id);
          return {
            savedAgents: exists
              ? state.savedAgents.filter((a) => a !== id)
              : [...state.savedAgents, id],
          };
        }),

      toggleSaveService: (id) =>
        set((state) => {
          const exists = state.savedServices.includes(id);
          return {
            savedServices: exists
              ? state.savedServices.filter((s) => s !== id)
              : [...state.savedServices, id],
          };
        }),

      isAgentSaved: (id) => get().savedAgents.includes(id),
      isServiceSaved: (id) => get().savedServices.includes(id),

      clearAllSaved: () => set({ savedAgents: [], savedServices: [] }),
    }),
    {
      name: "trustlink-saved",
      storage: cookieStorage,
    }
  )
);

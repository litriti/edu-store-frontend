"use client"

import { create } from "zustand"
import { persist, createJSONStorage} from "zustand/middleware"
import type { Product } from "./types"

interface FavoritesStore {
  favorites: Product[]
  addToFavorites: (product: Product) => void
  removeFromFavorites: (productId: string) => void
}

interface ViewHistoryStore {
  viewHistory: Product[]
  addToViewHistory: (product: Product) => void
  clearViewHistory: () => void
}

export const useFavorites = create<FavoritesStore>()(
  persist(
    (set) => ({
      favorites: [],
      addToFavorites: (product) =>
        set((state) => ({
          favorites: [...state.favorites.filter((p) => p.id !== product.id), product],
        })),
      removeFromFavorites: (productId) =>
        set((state) => ({
          favorites: state.favorites.filter((product) => product.id !== productId),
        })),
    }),
    {
      name: "favorites-storage",
    },
  ),
)
export const useViewHistory = create<ViewHistoryStore>()(
  persist(
    (set, get) => ({
      viewHistory: [],
      addToViewHistory: (product) =>
        set(() => ({
          viewHistory: [
            product,
            ...get().viewHistory.filter((p) => p.id !== product.id),
          ].slice(0, 5),
        })),
      clearViewHistory: () => set({ viewHistory: [] }),
    }),
    {
      name: "view-history-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: JSON.parse(sessionStorage.getItem("user")) ?? null,
  setUser: (user) => set(() => ({ user })),
  isAuthenticated: JSON.parse(sessionStorage.getItem("isAuthenticated")) ?? false,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  token: JSON.parse(sessionStorage.getItem("token")) ?? null,
  setToken: (token) => set(() => ({ token }))
}));

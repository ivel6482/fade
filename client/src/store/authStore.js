import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: JSON.parse(sessionStorage.getItem("user")) ?? null,
  isAuthenticated: JSON.parse(sessionStorage.getItem("isAuthenticated")) ?? false,
  token: JSON.parse(sessionStorage.getItem("token")) ?? null,
  actions: {
    setUser: (user) => set(() => ({ user })),
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    setToken: (token) => set(() => ({ token }))
  }
}));

export const useAuthActions = () => {
  return useAuthStore(state => state.actions);
}

export const useUser = () => {
  return useAuthStore(state => state.user);
}

export const useToken = () => {
  return useAuthStore(state => state.token);
}

export const useIsAuthenticated = () => {
  return useAuthStore(state => state.isAuthenticated);
}


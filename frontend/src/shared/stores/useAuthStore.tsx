import { create } from "zustand";
import { getToken } from "@/src/shared/utils/cookies";

interface User {
  email: string | null;
  userId: string | null;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User;
}

interface AuthActions {
  setUser: (userData: User) => void;
  logoutUser: () => void;
  checkAuth: () => void;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: { email: null, userId: null },
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  ...initialState,
  setUser: (userData: User) =>
    set({ isAuthenticated: true, user: { email: userData.email, userId: userData.userId } }),
  logoutUser: () => set({ isAuthenticated: false, user: { email: null, userId: null } }),
  checkAuth: () => {
    const token = getToken();
    if (token) set({ isAuthenticated: true });
  },
}));

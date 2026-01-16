import { create } from "zustand";

export type tabTypes = "notifications" | "contacts";

interface DashboardState {
  activeTab: tabTypes;
}

interface DashboardActions {
  setActiveTab: (tab: tabTypes) => void;
}

const initialState: DashboardState = {
  activeTab: "notifications",
};

export const useDashboardStore = create<DashboardState & DashboardActions>((set) => ({
  ...initialState,
  setActiveTab: (tab: tabTypes) => set({ activeTab: tab }),
}));

type UiState = {
  sidebarOpen: boolean;
};

let state: UiState = { sidebarOpen: false };
const listeners = new Set<() => void>();

export const uiStore = {
  getState: () => state,
  setSidebarOpen: (open: boolean) => {
    state = { ...state, sidebarOpen: open };
    listeners.forEach((l) => l());
  },
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

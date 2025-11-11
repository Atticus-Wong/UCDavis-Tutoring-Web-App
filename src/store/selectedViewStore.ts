import { create } from 'zustand';

interface SelectedViewState {
  selectedView: string
  setSelectedView: (newSelectedView: string) => void
}

const useSelectedViewStore = create<SelectedViewState>((set) => ({
  selectedView: 'tables',
  setSelectedView: (newSelectedView) => set(() => ({ selectedView: newSelectedView }))
}));

// Test for pull for Vish

export { useSelectedViewStore };
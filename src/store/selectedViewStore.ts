import { create } from 'zustand';

interface SelectedViewState {
  selectedView: string
  setSelectedView: () => void
}

const useSelectedViewStore = create<SelectedViewState>((set) => ({
  selectedView: 'tables',
  setSelectedView: () => set((state) => ({ selectedView: state.selectedView }))
}));

export { useSelectedViewStore };
import { create } from 'zustand';

interface SelectedViewState {
  selectedView: string
  setSelectedView: (newState: string) => void
}

const useSelectedViewStore = create<SelectedViewState>((set) => ({
  selectedView: 'tables',
  setSelectedView: (newSelectedView) => set(() => ({ selectedView: newSelectedView }))
}));

export { useSelectedViewStore };
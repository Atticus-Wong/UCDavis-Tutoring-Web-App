import { create } from 'zustand';

interface BongoCatState {
  scale: number
  setScale: (scale: number) => void
}

const useBongoCatStore = create<BongoCatState>((set) => ({
  scale: 1,
  setScale: (scale: number) => set({ scale })
}));

export { useBongoCatStore };


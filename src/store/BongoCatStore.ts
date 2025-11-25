import { create } from 'zustand';

// Only show separate stores for separate microservices
// Combine all the different stores into one

interface BongoCatState {
  scale: number
  setScale: (scale: number) => void
}

const useBongoCatStore = create<BongoCatState>((set) => ({
  scale: 1,
  setScale: (scale: number) => set({ scale })
}));

export { useBongoCatStore };


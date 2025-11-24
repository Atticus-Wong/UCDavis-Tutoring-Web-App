import { create } from 'zustand';

interface AppState {
    adminSelectedView: string
    setAdminSelectedView: (newSelectedView: string) => void

    attendanceEditedEntres: Attendance[]
    setAttendanceEditedEntries: (newEntries: Attendance[]) => void

    bongoCatScale: number
    setBongoCatScale: (scale: number) => void
}

const useAppStore = create<AppState>((set) => ({
    adminSelectedView: 'tables',
    setAdminSelectedView: (newSelectedView) => set(() => ({ adminSelectedView: newSelectedView })),

    attendanceEditedEntres: [],
    setAttendanceEditedEntries: (newEntries) => set(() => ({ attendanceEditedEntres: newEntries })),

    bongoCatScale: 1,
    setBongoCatScale: (scale: number) => set(() => ({ bongoCatScale: scale }))
}));

export { useAppStore };
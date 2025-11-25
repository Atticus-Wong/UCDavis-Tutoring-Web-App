import { create } from 'zustand';
import { atom, useAtom, PrimitiveAtom } from 'jotai';

// interface TutorID {
//     displayName: string,
//     id: string
// }

interface AppState {
    adminSelectedView: string
    setAdminSelectedView: (newSelectedView: string) => void

    attendanceEditedEntres: Attendance[]
    setAttendanceEditedEntries: (newEntries: Attendance[]) => void

    bongoCatScale: number
    setBongoCatScale: (scale: number) => void

    // atomSelectedServer: PrimitiveAtom<Server | undefined>
    // useAtomSelectedServer: () => void
    
    // setDataEntires: PrimitiveAtom<Attendance[]>
    // useSetDataEntries: () => void

    // setHelpSessionEntries: HelpSession[]
    // useSetHelpSessionEntries: () => void

    // tutorIds: TutorID[]
    // useTutorIds: () => void
}

const useAppStore = create<AppState>((set) => ({
    adminSelectedView: 'tables',
    setAdminSelectedView: (newSelectedView) => set(() => ({ adminSelectedView: newSelectedView })),

    attendanceEditedEntres: [],
    setAttendanceEditedEntries: (newEntries) => set(() => ({ attendanceEditedEntres: newEntries })),

    bongoCatScale: 1,
    setBongoCatScale: (scale: number) => set(() => ({ bongoCatScale: scale })),

    // atomSelectedServer: atom<Server | undefined>(undefined),
    // useAtomSelectedServer: () => useAtom(atomSelectedServer),

    // setDataEntires: atom<Attendance[]>([]),
    // useSetDataEntries: useAtom(setDataEntires),

    // setHelpSessionEntries: atom<HelpSession[]>([]),
    // useSetHelpSessionEntries: () => useAtom(setHelpSessionEntries),

    // tutorIds: atom<TutorID[]>([]),
    // useTutorIds: () => useAtom(tutorIds)
}));

export { useAppStore };
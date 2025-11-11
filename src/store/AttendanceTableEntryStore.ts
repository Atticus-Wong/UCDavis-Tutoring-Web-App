import { create } from 'zustand';

interface AttendanceTableEntryState {
  editedEntries: Attendance[]
  setEditedEntries: (newEntries: Attendance[]) => void
}

const useEditedEntriesStore = (initialEntries: Attendance[]) => {
    create<AttendanceTableEntryState>((set) => ({
        editedEntries: initialEntries,
        setEditedEntries: (newEntries) => set(() => ({ editedEntries: newEntries }))
    }));  
};

export { useEditedEntriesStore };
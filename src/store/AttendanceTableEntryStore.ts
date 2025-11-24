import { create } from 'zustand';

interface AttendanceTableEntryState {
  editedEntries: Attendance[];
  setEditedEntries: (newEntries: Attendance[]) => void;
}

// Make initial state empty and setEditedEntries after api call
// Currently was doing state hydration (Check it out!)
const useEditedEntriesStore = (initialEntries: Attendance[]) => 
  create<AttendanceTableEntryState>()((set) => ({
      editedEntries: initialEntries,
      setEditedEntries: (newEntries) => set(() => ({ editedEntries: newEntries }))
}));

export { useEditedEntriesStore };
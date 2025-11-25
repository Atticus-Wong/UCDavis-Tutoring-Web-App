import { atom, useAtom } from 'jotai';

// Migrate to zustand
// Change components taken in since some are protorical
// Don't pass using props and instead use hooks to directly get the data at whatever leaf needed

const selectedServer = atom<Server | undefined>(undefined);

export const useSelectedServer = () => useAtom(selectedServer);

const setDataEntries = atom<Attendance[]>([]);

export const useSetDataEntries = () => useAtom(setDataEntries);

const setHelpSessionEntries = atom<HelpSession[]>([]);

export const useSetHelpSessionEntries = () => useAtom(setHelpSessionEntries);

const tutorIds = atom<{ displayName: string, id: string }[]>([]);

export const useTutorIds = () => useAtom(tutorIds);


import { atom, useAtom } from 'jotai';

const selectedServer = atom<Server | undefined>(undefined);

export const useSelectedServer = () => useAtom(selectedServer);

const setDataEntries = atom<Attendance[]>([]);

export const useSetDataEntries = () => useAtom(setDataEntries);

const setHelpSessionEntries = atom<HelpSession[]>([]);

export const useSetHelpSessionEntries = () => useAtom(setHelpSessionEntries);

const tutorIds = atom<{ displayName: string, id: string }[]>([]);

export const useTutorIds = () => useAtom(tutorIds);


import { atom, useAtom } from 'jotai';

const selectedServer = atom<Server | undefined>(undefined);

export const useSelectedServer = () => useAtom(selectedServer);

const setDataEntries = atom<Attendance[]>([]);

export const useSetDataEntries = () => useAtom(setDataEntries);


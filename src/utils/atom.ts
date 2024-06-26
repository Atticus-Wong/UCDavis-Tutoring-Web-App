import { atom, useAtom } from 'jotai';

const selectedServer = atom<Server | undefined>(undefined);

export const useSelectedServer = () => useAtom(selectedServer);

const serversFromFirebase = atom<Server[] | undefined>(undefined);

export const useServersFromFirebase = () => useAtom(serversFromFirebase);

export const storage = window.localStorage;

const key = 'MULTIPLAYER_SC_ID';

export const myID = (): string | null => storage.getItem(key);

export const setID = (newID: string): void => storage.setItem(key, newID);

import { atomWithStorage } from "jotai/utils";

export const bookmarkAtom = atomWithStorage("bookmark", [] as string[]);

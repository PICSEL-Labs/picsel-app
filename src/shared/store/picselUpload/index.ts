import { create } from 'zustand';

interface PhotoState {
  mainPhoto: string | null;
  extraPhotos: string[];

  setMainPhoto: (uri: string | null) => void;
  addExtraPhotos: (uris: string[]) => void;

  setExtraPhotos: (uris: string[]) => void;
  removeExtraPhoto: (index: number) => void;
  reset: () => void;
}

export const usePhotoStore = create<PhotoState>(set => ({
  mainPhoto: null,
  extraPhotos: [],

  setMainPhoto: uri => set({ mainPhoto: uri }),

  addExtraPhotos: uris =>
    set(state => ({
      extraPhotos: Array.from(new Set([...state.extraPhotos, ...uris])),
    })),

  setExtraPhotos: uris => set({ extraPhotos: uris }),

  removeExtraPhoto: index =>
    set(state => ({
      extraPhotos: state.extraPhotos.filter((_, i) => i !== index),
    })),

  reset: () => set({ mainPhoto: null, extraPhotos: [] }),
}));

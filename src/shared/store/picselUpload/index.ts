import { create } from 'zustand';

interface PhotoState {
  mainPhoto: string | null;
  extraPhotos: string[];
  bookCoverPhoto: string | null;

  setMainPhoto: (uri: string | null) => void;
  setBookCoverPhoto: (uri: string | null) => void;

  setExtraPhotos: (uris: string[]) => void;
  addExtraPhotos: (uris: string[]) => void;
  removeExtraPhoto: (index: number) => void;

  reset: () => void;
}

export const usePhotoStore = create<PhotoState>(set => ({
  mainPhoto: null,
  extraPhotos: [],
  bookCoverPhoto: null,

  setMainPhoto: uri => set({ mainPhoto: uri }),

  setBookCoverPhoto: uri => set({ bookCoverPhoto: uri }),

  addExtraPhotos: uris =>
    set(state => ({
      extraPhotos: Array.from(new Set([...state.extraPhotos, ...uris])),
    })),

  setExtraPhotos: uris => set({ extraPhotos: uris }),

  removeExtraPhoto: index =>
    set(state => ({
      extraPhotos: state.extraPhotos.filter((_, i) => i !== index),
    })),

  reset: () => set({ mainPhoto: null, extraPhotos: [], bookCoverPhoto: null }),
}));

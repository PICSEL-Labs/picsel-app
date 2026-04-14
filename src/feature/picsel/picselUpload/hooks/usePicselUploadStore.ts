import { create } from 'zustand';

import { PlaceType } from '@/feature/picsel/shared/types';

interface PicselUploadStore {
  // States
  mainPhoto: string | null;
  extraPhotos: string[];

  takenDate: string;
  placeType: PlaceType | '';
  placeId: string;
  locationName: string;

  picselbookId: string;
  bookName: string;

  title: string;
  content: string;

  // Actions
  setMainPhoto: (uri: string | null) => void;
  addExtraPhotos: (uris: string[]) => void;
  setExtraPhotos: (uris: string[]) => void;
  removeExtraPhoto: (uri: string) => void;

  setDateLocation: (
    date: string,
    placeId: string,
    placeType: PlaceType,
    locationName?: string,
  ) => void;
  setPicselbookId: (id: string, name: string) => void;
  setRecord: (title: string, content: string) => void;

  getImagePaths: () => string[];
  resetUploadData: () => void;
}

export const usePicselUploadStore = create<PicselUploadStore>((set, get) => ({
  mainPhoto: null,
  extraPhotos: [],
  takenDate: '',
  placeType: '',
  placeId: '',
  locationName: '',
  picselbookId: '',
  bookName: '',
  title: '',
  content: '',

  setMainPhoto: uri => set({ mainPhoto: uri }),
  addExtraPhotos: uris =>
    set(state => ({
      extraPhotos: Array.from(new Set([...state.extraPhotos, ...uris])),
    })),

  setExtraPhotos: uris => set({ extraPhotos: uris }),
  removeExtraPhoto: uri =>
    set(state => ({
      extraPhotos: state.extraPhotos.filter(p => p !== uri),
    })),

  setDateLocation: (date, placeId, placeType, locationName) =>
    set({
      takenDate: date,
      placeId,
      placeType,
      locationName: locationName,
    }),

  setPicselbookId: (id, name) => set({ picselbookId: id, bookName: name }),

  setRecord: (title, content) => set({ title, content }),

  getImagePaths: () => {
    const { mainPhoto, extraPhotos } = get();
    return mainPhoto ? [mainPhoto, ...extraPhotos] : extraPhotos;
  },

  resetUploadData: () =>
    set({
      mainPhoto: null,
      extraPhotos: [],
      takenDate: '',
      placeType: '',
      placeId: '',
      locationName: '',
      picselbookId: '',
      bookName: '',
      title: '',
      content: '',
    }),
}));

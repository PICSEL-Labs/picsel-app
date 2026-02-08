import { create } from 'zustand';

interface PicselUploadStore {
  // States
  mainPhoto: string | null;
  extraPhotos: string[];

  takenDate: string;
  storeId: string;
  locationName: string;

  picselbookId: string;

  title: string;
  content: string;

  // Actions
  setMainPhoto: (uri: string | null) => void;
  addExtraPhotos: (uris: string[]) => void;
  setExtraPhotos: (uris: string[]) => void;
  removeExtraPhoto: (uri: string) => void;

  setDateLocation: (
    date: string,
    storeId: string,
    locationName?: string,
  ) => void;
  setPicselbookId: (id: string) => void;
  setRecord: (title: string, content: string) => void;

  getImagePaths: () => string[];
  resetUploadData: () => void;
}

export const usePicselUploadStore = create<PicselUploadStore>((set, get) => ({
  mainPhoto: null,
  extraPhotos: [],
  takenDate: '',
  storeId: '',
  locationName: '',
  picselbookId: '',
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

  setDateLocation: (date, storeId, locationName) =>
    set({
      takenDate: date,
      storeId,
      locationName: locationName,
    }),

  setPicselbookId: id => set({ picselbookId: id }),

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
      storeId: '',
      locationName: '',
      picselbookId: '',
      title: '',
      content: '',
    }),
}));

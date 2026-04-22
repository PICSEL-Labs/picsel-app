import { create } from 'zustand';

import { PicselBookSortType } from '@/feature/picsel/picselBook/types';

interface PicselBookState {
  sortType: PicselBookSortType;
  setSortType: (sort: PicselBookSortType) => void;
}

export const usePicselBookStore = create<PicselBookState>(set => ({
  sortType: 'RECENT_CREATED_DESC',
  setSortType: sort => set({ sortType: sort }),
}));

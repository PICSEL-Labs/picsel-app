import { create } from 'zustand';

import { MyPicselSortType } from '@/feature/picsel/myPicsel/types';

interface MyPicselState {
  sortType: MyPicselSortType;
  setSortType: (sort: MyPicselSortType) => void;
}

export const useMyPicselStore = create<MyPicselState>(set => ({
  sortType: 'RECENT_DESC',
  setSortType: sort => set({ sortType: sort }),
}));

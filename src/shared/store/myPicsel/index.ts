import { create } from 'zustand';

import { MyPicselSortType } from '@/feature/picsel/myPicsel/types';

type PicselTab = 'my' | 'book';

interface MyPicselState {
  sortType: MyPicselSortType;
  setSortType: (sort: MyPicselSortType) => void;
  activeTab: PicselTab;
  setActiveTab: (tab: PicselTab) => void;
}

export const useMyPicselStore = create<MyPicselState>(set => ({
  sortType: 'RECENT_DESC',
  setSortType: sort => set({ sortType: sort }),
  activeTab: 'my',
  setActiveTab: tab => set({ activeTab: tab }),
}));

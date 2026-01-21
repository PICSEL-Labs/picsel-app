import React from 'react';

import PhotoFolderTemplate from './PhotoFolderTemplate';

import { useMonthFolder } from '@/feature/picsel/myPicsel/hooks/useMonthFolder';
import {
  MyPicselSortType,
  useSortActionSheet,
} from '@/feature/picsel/shared/hooks/animation/useSortActionSheet';
import { showBrandFilterSheet } from '@/shared/lib/brandFilterSheet';

interface Props {
  year: string;
  month: string;
  onBack: () => void;
}

const MonthFolderTemplate = ({ year, month, onBack }: Props) => {
  const folderViewState = useMonthFolder({ year, month });

  // TODO: 정렬 로직 구현
  const handleSort = (sortType: MyPicselSortType) => {
    console.log('정렬 타입:', sortType);
  };

  const { showSortSheet } = useSortActionSheet({
    onSort: handleSort,
  });

  return (
    <PhotoFolderTemplate
      title={`${year}년 ${month}`}
      onBack={onBack}
      onSort={showSortSheet}
      onFilter={showBrandFilterSheet}
      onSelectAll={() =>
        folderViewState.selectAll(
          folderViewState.totalPhotos,
          folderViewState.photoData,
        )
      }
      showYear={false}
      {...folderViewState}
    />
  );
};

export default MonthFolderTemplate;

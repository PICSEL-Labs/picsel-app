import React from 'react';

import PhotoFolderTemplate from './PhotoFolderTemplate';

import { useYearFolder } from '@/feature/picsel/myPicsel/hooks/useYearFolder';
import {
  MyPicselSortType,
  useSortActionSheet,
} from '@/feature/picsel/shared/hooks/animation/useSortActionSheet';
import { showBrandFilterSheet } from '@/shared/lib/brandFilterSheet';

interface Props {
  year: string;
  onBack: () => void;
}

const YearFolderTemplate = ({ year, onBack }: Props) => {
  const folderViewState = useYearFolder({ year });

  // TODO: 정렬 로직 구현
  const handleSort = (sortType: MyPicselSortType) => {
    console.log('정렬 타입:', sortType);
  };

  const { showSortSheet } = useSortActionSheet({
    onSort: handleSort,
  });

  return (
    <PhotoFolderTemplate
      title={`${year}년`}
      showYear={false}
      onBack={onBack}
      onSort={showSortSheet}
      onFilter={showBrandFilterSheet}
      onSelectAll={() =>
        folderViewState.selectAll(
          folderViewState.totalPhotos,
          folderViewState.photoData,
        )
      }
      {...folderViewState}
    />
  );
};

export default YearFolderTemplate;

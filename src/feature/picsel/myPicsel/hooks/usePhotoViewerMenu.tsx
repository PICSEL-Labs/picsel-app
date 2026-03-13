import React, { useMemo } from 'react';

import { DROPDOWN_ITEMS } from '../constants/photoViewerTexts';

import { useSavePhoto } from './useSavePhoto';

import { DropdownMenuItem } from '@/shared/components/ui/molecules/DropdownMenu';
import PicselActionIcons from '@/shared/icons/PicselActionIcons';

interface Props {
  uri: string;
  hideDropdown: (onComplete?: () => void) => void;
}

export const usePhotoViewerMenu = ({ uri, hideDropdown }: Props) => {
  const { savePhoto } = useSavePhoto(uri);

  const dropdownItems: DropdownMenuItem[] = useMemo(
    () => [
      {
        label: DROPDOWN_ITEMS.SAVE_PHOTO,
        onPress: () => {
          hideDropdown(() => {
            savePhoto();
          });
        },
        icon: <PicselActionIcons shape="save" width={24} height={24} />,
      },
    ],
    [hideDropdown, savePhoto],
  );

  return { dropdownItems };
};

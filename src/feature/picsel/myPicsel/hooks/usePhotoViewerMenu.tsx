import React, { useMemo } from 'react';

import { openSettings } from 'react-native-permissions';

import {
  DROPDOWN_ITEMS,
  SAVE_PERMISSION_MODAL,
} from '../constants/photoViewerTexts';

import { useSavePhoto } from './useSavePhoto';

import { DropdownMenuItem } from '@/shared/components/ui/molecules/DropdownMenu';
import PicselActionIcons from '@/shared/icons/PicselActionIcons';
import { showConfirmModal } from '@/shared/lib/confirmModal';
import { requestPhotoPermission } from '@/shared/lib/photoPermission';

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
          hideDropdown(async () => {
            const hasPermission = await requestPhotoPermission();
            if (!hasPermission) {
              showConfirmModal(SAVE_PERMISSION_MODAL.TITLE, openSettings, {
                title: SAVE_PERMISSION_MODAL.DESCRIPTION,
                confirmText: SAVE_PERMISSION_MODAL.CONFIRM,
                cancelText: SAVE_PERMISSION_MODAL.CANCEL,
              });
              return;
            }
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

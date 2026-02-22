import React, { useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';

import {
  DELETE_ALERT,
  DROPDOWN_ITEMS,
  SET_REPRESENTATIVE_ALERT,
  TOAST_MESSAGES,
} from '../constants/photoViewerTexts';

import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import { DropdownMenuItem } from '@/shared/components/ui/molecules/DropdownMenu';
import PicselActionIcons from '@/shared/icons/PicselActionIcons';
import PicselPhotoIcons from '@/shared/icons/PicselPhotoIcons';
import { showConfirmModal } from '@/shared/lib/confirmModal';
import { useToastStore } from '@/shared/store/ui/toast';

interface Props {
  picselId: string;
  imagePath: string;
  hideDropdown: (onComplete?: () => void) => void;
}

export const usePhotoViewerMenu = ({
  picselId,
  imagePath,
  hideDropdown,
}: Props) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { showToast } = useToastStore();

  const dropdownItems: DropdownMenuItem[] = useMemo(
    () => [
      {
        label: DROPDOWN_ITEMS.SET_REPRESENTATIVE,
        onPress: () => {
          hideDropdown(() => {
            showConfirmModal(
              SET_REPRESENTATIVE_ALERT.DESCRIPTION,
              () => {
                console.log('대표사진으로 변경:', picselId);
                showToast(TOAST_MESSAGES.REPRESENTATIVE_SUCCESS);
              },
              {
                title: SET_REPRESENTATIVE_ALERT.TITLE,
                confirmText: SET_REPRESENTATIVE_ALERT.CONFIRM,
              },
            );
          });
        },
        icon: <PicselPhotoIcons shape="darkgray" height={24} width={24} />,
      },
      {
        label: DROPDOWN_ITEMS.SAVE_PHOTO,
        onPress: () => {
          hideDropdown(() => {
            console.log('사진 저장:', imagePath);
          });
        },
        icon: <PicselActionIcons shape="save" width={24} height={24} />,
      },
      {
        label: DROPDOWN_ITEMS.DELETE,
        onPress: () => {
          hideDropdown(() => {
            showConfirmModal(
              DELETE_ALERT.DESCRIPTION,
              () => {
                console.log('삭제');
                showToast(TOAST_MESSAGES.DELETE_SUCCESS);
                navigation.goBack();
              },
              {
                title: DELETE_ALERT.TITLE,
                confirmText: DELETE_ALERT.CONFIRM,
              },
            );
          });
        },
        textClassName: 'text-semantic-error body-rg-04',
        icon: <PicselActionIcons shape="delete" width={24} height={24} />,
      },
    ],
    [hideDropdown, picselId, showToast, navigation, imagePath],
  );

  return { dropdownItems };
};

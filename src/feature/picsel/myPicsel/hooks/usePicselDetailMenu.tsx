import React, { useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';

import {
  DELETE_ALERT,
  DROPDOWN_ITEMS,
  TOAST_MESSAGES,
} from '../constants/picselDetailTexts';

import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import { DropdownMenuItem } from '@/shared/components/ui/molecules/DropdownMenu';
import PicselActionIcons from '@/shared/icons/PicselActionIcons';
import { showConfirmModal } from '@/shared/lib/confirmModal';
import { useToastStore } from '@/shared/store/ui/toast';

interface Props {
  picselId: string;
  hideDropdown: (onComplete?: () => void) => void;
}

export const usePicselDetailMenu = ({ picselId, hideDropdown }: Props) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { showToast } = useToastStore();

  const dropdownItems: DropdownMenuItem[] = useMemo(
    () => [
      {
        label: DROPDOWN_ITEMS.EDIT,
        onPress: () => {
          hideDropdown(() => {
            console.log('전체 편집', picselId);
          });
        },
        icon: <PicselActionIcons shape="edit" width={24} height={24} />,
      },
      {
        label: DROPDOWN_ITEMS.MOVE,
        onPress: () => {
          hideDropdown(() => {
            console.log('다른 픽셀북으로 이동');
          });
        },
        icon: <PicselActionIcons shape="move" width={24} height={24} />,
      },
      {
        label: DROPDOWN_ITEMS.SHARE,
        onPress: () => {
          hideDropdown(() => {
            console.log('공유');
          });
        },
        icon: <PicselActionIcons shape="share" width={24} height={24} />,
      },
      {
        label: DROPDOWN_ITEMS.DELETE,
        onPress: () => {
          console.log('삭제');
          hideDropdown(() => {
            showConfirmModal(
              DELETE_ALERT.DESCRIPTION,
              () => {
                showToast(TOAST_MESSAGES.DELETE_SUCCESS);
                navigation.goBack();
              },
              {
                title: DELETE_ALERT.TITLE,
                confirmText: DELETE_ALERT.CONFIRM,
                cancelText: DELETE_ALERT.CANCEL,
              },
            );
          });
        },
        textClassName: 'text-semantic-error body-rg-04',
        icon: <PicselActionIcons shape="delete" width={24} height={24} />,
      },
    ],
    [hideDropdown, picselId, showConfirmModal, showToast, navigation],
  );

  return { dropdownItems };
};

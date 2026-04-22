import React, { useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Pressable, Text } from 'react-native';

import { DROPDOWN_ITEMS } from '../constants/brandSettingTexts';
import type { BrandSettingMode } from '../constants/brandSettingTexts';

import Kebab from '@/assets/icons/kebab/icon-kebab.svg';
import PlusIcon from '@/assets/icons/plus/icon-plus-S.svg';
import { MypageNavigationProp } from '@/navigation/types/navigateTypeUtil';
import { DropdownMenuItem } from '@/shared/components/ui/molecules/DropdownMenu';
import PicselActionIcons from '@/shared/icons/PicselActionIcons';
import ReplayIcons from '@/shared/icons/ReplayIcon';
import SearchIcons from '@/shared/icons/SearchIcons';

interface Props {
  mode: BrandSettingMode;
  removeSelectedCount: number;
  resetRemoveSelection: () => void;
  enterAddMode: () => void;
  enterRemoveMode: () => void;
  hideDropdown: (onComplete?: () => void) => void;
}

export const useBrandSettingHeader = ({
  mode,
  removeSelectedCount,
  resetRemoveSelection,
  enterAddMode,
  enterRemoveMode,
  hideDropdown,
}: Props) => {
  const navigation = useNavigation<MypageNavigationProp>();

  const dropdownItems: DropdownMenuItem[] = useMemo(
    () => [
      {
        label: DROPDOWN_ITEMS.ADD,
        onPress: () => hideDropdown(enterAddMode),
        icon: <PlusIcon />,
      },

      {
        label: DROPDOWN_ITEMS.REMOVE,
        onPress: () => hideDropdown(enterRemoveMode),
        textClassName: 'text-semantic-error body-rg-04',
        icon: <PicselActionIcons shape="delete" width={20} height={20} />,
      },
    ],
    [hideDropdown, enterAddMode, enterRemoveMode],
  );

  const rightElement = useMemo(() => {
    switch (mode) {
      case 'remove':
        return removeSelectedCount > 0 ? (
          <Pressable
            onPress={resetRemoveSelection}
            className="flex-row items-center">
            <Text className="text-pink-500 headline-02">초기화</Text>
            <ReplayIcons width={24} height={24} shape="true" />
          </Pressable>
        ) : undefined;
      case 'add':
        return (
          <Pressable
            onPress={() =>
              navigation.navigate('BrandSearchScreen', { variant: 'mypage' })
            }>
            <SearchIcons shape="black" width={24} height={24} />
          </Pressable>
        );
      default:
        return <Kebab />;
    }
  }, [mode, removeSelectedCount, resetRemoveSelection, navigation]);

  return { dropdownItems, rightElement };
};

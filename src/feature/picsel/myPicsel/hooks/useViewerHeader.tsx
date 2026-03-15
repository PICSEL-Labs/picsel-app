import React, { useCallback, useRef } from 'react';

import { View } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

import PicselDetailHeader from '../components/ui/molecules/PicselDetailHeader';

import DropdownMenu, {
  DropdownMenuItem,
} from '@/shared/components/ui/molecules/DropdownMenu';
import { useDropdownMenu } from '@/shared/hooks/useDropdownMenu';
import Toast from '@/shared/ui/atoms/Toast';
import ConfirmModal from '@/shared/ui/molecules/ConfirmModal';

interface Props {
  insets: EdgeInsets;
  dropdown: ReturnType<typeof useDropdownMenu>;
  dropdownItems: DropdownMenuItem[];
  onClose: () => void;
}

export const useViewerHeader = ({
  insets,
  dropdown,
  dropdownItems,
  onClose,
}: Props) => {
  const ref = useRef({ insets, dropdown, dropdownItems, onClose });
  ref.current = { insets, dropdown, dropdownItems, onClose };

  const renderHeader = useCallback(() => {
    const props = ref.current;
    return (
      <View style={{ paddingTop: props.insets.top }}>
        <PicselDetailHeader
          onBackPress={props.onClose}
          rightIconPress={props.dropdown.toggle}
        />
        {props.dropdown.isMounted && (
          <DropdownMenu
            isMounted={props.dropdown.isMounted}
            animatedStyle={props.dropdown.animatedStyle}
            items={props.dropdownItems}
            onClose={() => props.dropdown.hide()}
          />
        )}
        <Toast />
        <ConfirmModal animationType="none" />
      </View>
    );
  }, []);

  return { renderHeader };
};

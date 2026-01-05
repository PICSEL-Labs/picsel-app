import React, { forwardRef, useMemo } from 'react';

import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { View, Text, Pressable } from 'react-native';

import PicselActionIcons from '@/shared/icons/PicselActionIcons';

interface Props {
  onDelete: () => void;
  onMove: () => void;
}

const SelectionBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ onDelete, onMove }, ref) => {
    const snapPoints = useMemo(() => [200], []);

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        enableContentPanningGesture={false}
        enableHandlePanningGesture={false}
        handleIndicatorStyle={{ display: 'none' }}
        backgroundStyle={{ backgroundColor: '#FFFFFF' }}>
        <BottomSheetView>
          <View className="h-28 flex-row items-center justify-around px-6 py-4">
            <Pressable
              onPress={onDelete}
              className="flex-1 flex-row items-center justify-center space-x-1 space-y-0.5">
              <PicselActionIcons shape="delete" width={24} height={24} />
              <Text className="text-semantic-error headline-02">삭제하기</Text>
            </Pressable>

            {/* 구분선 */}
            <View className="mx-4 h-8 w-px bg-gray-100" />

            <Pressable
              onPress={onMove}
              className="flex-1 flex-row items-center justify-center space-x-1 space-y-0.5">
              <PicselActionIcons shape="move" width={24} height={24} />
              <Text className="text-gray-900 headline-02">사진 옮기기</Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

SelectionBottomSheet.displayName = 'SelectionBottomSheet';

export default SelectionBottomSheet;

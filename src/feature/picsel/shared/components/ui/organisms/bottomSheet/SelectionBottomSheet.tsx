import React, { forwardRef, useMemo } from 'react';

import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Pressable, Text, View } from 'react-native';

import PicselActionIcons from '@/shared/icons/PicselActionIcons';

interface Props {
  onDelete: () => void;
  onMove?: () => void;
}

const SelectionBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ onDelete, onMove }, ref) => {
    const snapPoints = useMemo(() => [200], []);
    const isMyPicselMode = !!onMove; // onMove가 있으면 내픽셀 모드, 없으면 픽셀북 모드

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose={!isMyPicselMode}
        enableContentPanningGesture={!isMyPicselMode}
        enableHandlePanningGesture={!isMyPicselMode}
        handleIndicatorStyle={{ display: 'none' }}
        backgroundStyle={{ backgroundColor: '#FFFFFF' }}>
        <BottomSheetView>
          <View
            className={`h-28 flex-row items-center px-6 py-4 ${isMyPicselMode ? 'justify-around' : 'justify-center'}`}>
            <Pressable
              onPress={onDelete}
              className="flex-row items-center justify-center space-x-1 space-y-0.5">
              <PicselActionIcons shape="delete" width={24} height={24} />
              <Text className="text-semantic-error headline-02">삭제하기</Text>
            </Pressable>

            {/* 내픽셀 모드일 때만 구분선과 옮기기 버튼 표시 */}
            {isMyPicselMode && (
              <>
                <View className="mx-4 h-8 w-px bg-gray-100" />
                <Pressable
                  onPress={onMove}
                  className="flex-row items-center justify-center space-x-1 space-y-0.5">
                  <PicselActionIcons shape="move" width={24} height={24} />
                  <Text className="text-gray-900 headline-02">사진 옮기기</Text>
                </Pressable>
              </>
            )}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

SelectionBottomSheet.displayName = 'SelectionBottomSheet';

export default SelectionBottomSheet;

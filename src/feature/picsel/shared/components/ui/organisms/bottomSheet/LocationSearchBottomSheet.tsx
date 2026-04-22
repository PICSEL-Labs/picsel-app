import React, { useCallback } from 'react';

import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Text, View } from 'react-native';

import { useHandleScroll } from '@/feature/brand/model/hooks/useHandleScroll';
import NoResult from '@/feature/brand/ui/organisms/NoResult';
import { useLocationSearch } from '@/feature/picsel/shared/hooks/bottomSheet/useLocationSearch';
import { useLocationSearchBottomSheet } from '@/feature/picsel/shared/hooks/bottomSheet/useLocationSearchBottomSheet';
import { PlaceType } from '@/feature/picsel/shared/types';
import SearchResultList from '@/feature/search/ui/organisms/SearchResultList';
import { bottomSheetIndicator } from '@/shared/styles/bottomSheetIndicator';
import { bottomSheetShadow } from '@/shared/styles/shadows';
import Input from '@/shared/ui/atoms/Input';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (id: string, name: string, placeType: PlaceType) => void;
}

const LocationSearchBottomSheet = ({ visible, onClose, onSelect }: Props) => {
  const { query, result, uiState, hasResults, highlight, actions } =
    useLocationSearch({ onSelect, onClose });

  const { scrollViewRef, handleScroll } = useHandleScroll();

  const { bottomSheetRef, snapPoints, handleAnimate, insets } =
    useLocationSearchBottomSheet({ visible });

  const handleDismiss = useCallback(() => {
    actions.handleClear();
    onClose();
  }, [actions, onClose]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      onDismiss={handleDismiss}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      enablePanDownToClose
      enableOverDrag={false}
      enableContentPanningGesture={false}
      onAnimate={handleAnimate}
      handleIndicatorStyle={bottomSheetIndicator}
      style={bottomSheetShadow}
      backgroundStyle={{ borderRadius: 24 }}
      keyboardBehavior="fillParent"
      keyboardBlurBehavior="restore">
      <View style={{ paddingBottom: insets.bottom }}>
        <Text className="mb-2 py-2 text-center text-gray-900 title-01">
          위치 선택
        </Text>

        <View className="z-10">
          <Input
            value={query}
            onChangeText={actions.handleChangeText}
            handleClear={actions.handleClear}
            search
            onPressLeft={actions.handleBack}
            close
            autoFocus
          />
        </View>

        <BottomSheetScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={{
            paddingBottom: insets.bottom + 40,
          }}>
          <SearchResultList
            data={result}
            highlight={highlight}
            onPressItem={actions.handleSelectLocation}
            scrollEnabled={false}
          />
          {!hasResults && <NoResult visible={uiState === 'noResults'} />}
        </BottomSheetScrollView>
      </View>
    </BottomSheetModal>
  );
};

export default LocationSearchBottomSheet;

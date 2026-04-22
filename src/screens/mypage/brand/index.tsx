import React from 'react';

import { Pressable } from 'react-native';

import { useHandleScroll } from '@/feature/brand/model/hooks/useHandleScroll';
import BrandBottomAction from '@/feature/mypage/brand/components/ui/atoms/BrandBottomAction';
import BrandGuideText from '@/feature/mypage/brand/components/ui/atoms/BrandGuideText';
import BrandSettingContent from '@/feature/mypage/brand/components/ui/molecules/BrandSettingContent';
import { HEADER_TITLES } from '@/feature/mypage/brand/constants/brandSettingTexts';
import { useBrandSetting } from '@/feature/mypage/brand/hooks/useBrandSetting';
import { useBrandSettingHeader } from '@/feature/mypage/brand/hooks/useBrandSettingHeader';
import MypageHeader from '@/feature/mypage/shared/components/ui/molecules/MypageHeader';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import DropdownMenu from '@/shared/components/ui/molecules/DropdownMenu';
import { useDropdownMenu } from '@/shared/hooks/useDropdownMenu';
import FloatingButton from '@/shared/icons/FloatingButton';

const BrandSettingScreen = () => {
  const brand = useBrandSetting();
  const dropdown = useDropdownMenu();
  const scroll = useHandleScroll();

  const { dropdownItems, rightElement } = useBrandSettingHeader({
    mode: brand.mode,
    removeSelectedCount: brand.removeSelectedIds.length,
    resetRemoveSelection: brand.resetRemoveSelection,
    enterAddMode: brand.enterAddMode,
    enterRemoveMode: brand.enterRemoveMode,
    hideDropdown: dropdown.hide,
  });

  const hasFavorites = brand.favoriteBrands.length > 0;

  return (
    <ScreenLayout>
      <MypageHeader
        title={HEADER_TITLES[brand.mode]}
        rightElement={rightElement}
        rightIconPress={brand.mode === 'default' ? dropdown.toggle : undefined}
        onBackPress={brand.mode !== 'default' ? brand.exitMode : undefined}
      />

      <BrandGuideText mode={brand.mode} hasFavorites={hasFavorites} />

      <DropdownMenu
        isMounted={dropdown.isMounted}
        animatedStyle={dropdown.animatedStyle}
        items={dropdownItems}
        onClose={() => dropdown.hide()}
      />

      <BrandSettingContent
        mode={brand.mode}
        favoriteBrands={brand.favoriteBrands}
        allBrandsForAdd={brand.allBrandsForAdd}
        removeSelectedIds={brand.removeSelectedIds}
        addSelectedIds={brand.addSelectedIds}
        favoriteBrandIds={brand.favoriteBrandIds}
        toggleRemoveSelect={brand.toggleRemoveSelect}
        toggleAddSelect={brand.toggleAddSelect}
        scrollViewRef={scroll.scrollViewRef}
        onScroll={scroll.handleScroll}
      />

      {scroll.showFloatingButton && (
        <Pressable
          onPressIn={scroll.scrollToTop}
          style={{
            position: 'absolute',
            bottom: 90,
            right: 24,
            zIndex: 10,
          }}>
          <FloatingButton shape="floating" />
        </Pressable>
      )}

      <BrandBottomAction
        mode={brand.mode}
        removeCount={brand.removeSelectedIds.length}
        addCount={brand.addSelectedIds.length}
        hasFavorites={hasFavorites}
        onConfirmRemove={brand.confirmRemove}
        onConfirmAdd={brand.confirmAdd}
      />
    </ScreenLayout>
  );
};

export default BrandSettingScreen;

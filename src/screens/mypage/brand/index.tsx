import React, { useState, useCallback } from 'react';

import {
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Config from 'react-native-config';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  Easing,
} from 'react-native-reanimated';

import Kebab from '@/assets/icons/kebab/icon-kebab.svg';
import PlusIcon from '@/assets/icons/plus/icon-plus-S.svg';
import { Brand } from '@/feature/brand/types';
import MypageHeader from '@/feature/mypage/shared/components/ui/molecules/MypageHeader';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import CheckIcons from '@/shared/icons/CheckIcons';
import PicselActionIcons from '@/shared/icons/PicselActionIcons';
import ReplayIcons from '@/shared/icons/ReplayIcon';
import { useBrandListStore, useFavoriteStore } from '@/shared/store';
import { useToastStore } from '@/shared/store/ui/toast';
import { defaultShadow } from '@/shared/styles/shadows';

const BrandSettingScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const menuOpacity = useSharedValue(0);
  const menuScale = useSharedValue(0.95);
  const [isRemoveMode, setIsRemoveMode] = useState(false);
  const [selectedBrandIds, setSelectedBrandIds] = useState<string[]>([]);

  const { brandList } = useBrandListStore();
  const { optimisticFavorites, setOptimisticFavorite } = useFavoriteStore();
  const { showToast } = useToastStore();

  const favoriteBrands = brandList.filter(
    brand => optimisticFavorites[brand.brandId] === true,
  );

  const showMenu = useCallback(() => {
    setMenuMounted(true);
    setMenuVisible(true);
    menuOpacity.value = withTiming(1, {
      duration: 180,
      easing: Easing.out(Easing.ease),
    });
    menuScale.value = withTiming(1, {
      duration: 180,
      easing: Easing.out(Easing.ease),
    });
  }, [menuOpacity, menuScale]);

  const hideMenu = useCallback(
    (onComplete?: () => void) => {
      setMenuVisible(false);
      menuOpacity.value = withTiming(
        0,
        { duration: 150, easing: Easing.in(Easing.ease) },
        finished => {
          if (finished) {
            runOnJS(setMenuMounted)(false);
            if (onComplete) {
              runOnJS(onComplete)();
            }
          }
        },
      );
      menuScale.value = withTiming(0.95, {
        duration: 150,
        easing: Easing.in(Easing.ease),
      });
    },
    [menuOpacity, menuScale],
  );

  const handleToggleMenu = useCallback(() => {
    if (menuVisible) {
      hideMenu();
    } else {
      showMenu();
    }
  }, [menuVisible, showMenu, hideMenu]);

  const menuAnimatedStyle = useAnimatedStyle(() => ({
    opacity: menuOpacity.value,
    transform: [{ scale: menuScale.value }],
  }));

  const handleAddBrand = useCallback(() => {
    hideMenu();
    // TODO: 찜 브랜드 추가 화면으로 이동
  }, [hideMenu]);

  const handleEnterRemoveMode = useCallback(() => {
    hideMenu(() => {
      setIsRemoveMode(true);
      setSelectedBrandIds([]);
    });
  }, [hideMenu]);

  const handleExitRemoveMode = useCallback(() => {
    setIsRemoveMode(false);
    setSelectedBrandIds([]);
  }, []);

  const handleResetSelection = useCallback(() => {
    setSelectedBrandIds([]);
  }, []);

  const handleToggleSelect = useCallback((brandId: string) => {
    setSelectedBrandIds(prev =>
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId],
    );
  }, []);

  const handleConfirmRemove = useCallback(() => {
    if (selectedBrandIds.length === 0) {
      showToast('찜 해제할 브랜드를 골라주세요');
      return;
    }

    selectedBrandIds.forEach(brandId => {
      setOptimisticFavorite(brandId, false);
    });
    showToast(`${selectedBrandIds.length}개의 브랜드를 찜 해제 했어요`);
    setIsRemoveMode(false);
    setSelectedBrandIds([]);
  }, [selectedBrandIds, setOptimisticFavorite, showToast]);

  const renderBrandItem = useCallback(
    (brand: Brand) => {
      const isSelected = selectedBrandIds.includes(brand.brandId);

      return (
        <Pressable
          key={brand.brandId}
          className="items-center"
          style={{ width: '33.33%', marginBottom: 24 }}
          onPress={
            isRemoveMode ? () => handleToggleSelect(brand.brandId) : undefined
          }>
          <View style={defaultShadow} className="mb-[7px] rounded-full">
            <ImageBackground
              source={{ uri: Config.IMAGE_URL + brand.iconImageUrl }}
              className="h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full">
              {isRemoveMode && isSelected && (
                <View className="w-full flex-1 items-center justify-center rounded-full bg-black/30">
                  <CheckIcons shape="white" width={24} height={24} />
                </View>
              )}
            </ImageBackground>
          </View>
          <Text
            className="text-center text-gray-900 body-rg-02"
            numberOfLines={1}
            ellipsizeMode="tail">
            {brand.name}
          </Text>
        </Pressable>
      );
    },
    [isRemoveMode, selectedBrandIds, handleToggleSelect],
  );

  return (
    <ScreenLayout>
      <MypageHeader
        title={isRemoveMode ? '찜한 브랜드 삭제' : '찜한 브랜드'}
        rightElement={
          isRemoveMode ? (
            selectedBrandIds.length > 0 ? (
              <Pressable
                onPress={handleResetSelection}
                className="flex-row items-center">
                <Text className="text-pink-500 headline-02">초기화</Text>
                <ReplayIcons width={24} height={24} shape="true" />
              </Pressable>
            ) : undefined
          ) : (
            <Kebab />
          )
        }
        rightIconPress={isRemoveMode ? undefined : handleToggleMenu}
        onBackPress={isRemoveMode ? handleExitRemoveMode : undefined}
      />

      {/* Guide Text -> 삭제 모드일 때만 노출 */}
      {isRemoveMode && (
        <View className="flex items-center justify-center px-1 py-2">
          <Text className="text-gray-500 headline-01">
            <Text className="text-primary-pink headline-01">찜 해제</Text>할
            브랜드를 골라주세요
          </Text>
        </View>
      )}

      {/* Kebab Dropdown Menu */}
      <Modal
        transparent
        visible={menuMounted}
        animationType="none"
        onRequestClose={() => hideMenu()}>
        <TouchableWithoutFeedback onPress={() => hideMenu()}>
          <View className="flex-1">
            <Animated.View
              className="absolute right-4 overflow-hidden"
              style={[
                menuAnimatedStyle,
                {
                  top: 115,
                  backgroundColor: 'rgba(255, 255, 255, 0.962)',
                  borderRadius: 12,
                  boxShadow: '0 0 32px 0 rgba(0, 0, 0, 0.20)',
                  minWidth: 250,
                },
              ]}>
              {/* 찜 브랜드 추가 */}
              <Pressable
                className="flex-row items-center justify-between px-4 py-2.5"
                onPress={handleAddBrand}>
                <Text className="text-primary-black body-rg-04">
                  찜 브랜드 추가
                </Text>
                <PlusIcon />
              </Pressable>

              <View
                className="h-2"
                style={{
                  backgroundColor: 'rgba(60, 60, 67, 0.12)',
                }}
              />

              {/* 찜 해제 */}
              <Pressable
                className="flex-row items-center justify-between px-4 py-2.5"
                onPress={handleEnterRemoveMode}>
                <Text className="text-semantic-error body-rg-04">찜 해제</Text>
                <PicselActionIcons shape="delete" width={20} height={20} />
              </Pressable>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Brand Grid or Empty */}
      {favoriteBrands.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-900 headline-02">
            아직 찜한 브랜드가 없어요
          </Text>
          <Text className="mt-1 text-gray-500 body-rg-02">
            마음에 드는 브랜드를 찜해보세요
          </Text>
        </View>
      ) : (
        <ScrollView
          className="flex-1 px-6 pt-4"
          showsVerticalScrollIndicator={false}>
          <View className="flex-row flex-wrap">
            {favoriteBrands.map(brand => renderBrandItem(brand))}
          </View>
        </ScrollView>
      )}

      {/* 찜 해제 모드 하단 버튼 */}
      {isRemoveMode && (
        <View className="flex-row">
          <Pressable
            className="ml-2 flex-1 flex-row items-center justify-center space-x-1 rounded-lg py-3"
            onPress={handleConfirmRemove}>
            <PicselActionIcons shape="delete" width={24} height={24} />
            <Text className="text-semantic-error headline-02">찜 해제하기</Text>
          </Pressable>
        </View>
      )}
    </ScreenLayout>
  );
};

export default BrandSettingScreen;

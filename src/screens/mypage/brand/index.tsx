import React, { useState, useCallback, useMemo } from 'react';

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
import { useToggleFavoriteBrand } from '@/feature/brand/mutations/useToggleFavoriteBrand';
import { Brand } from '@/feature/brand/types';
import { chunkArray } from '@/feature/brand/utils/arrayUtils';
import MypageHeader from '@/feature/mypage/shared/components/ui/molecules/MypageHeader';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import CheckIcons from '@/shared/icons/CheckIcons';
import PicselActionIcons from '@/shared/icons/PicselActionIcons';
import ReplayIcons from '@/shared/icons/ReplayIcon';
import SearchIcons from '@/shared/icons/SearchIcons';
import { useBrandListStore, useFavoriteStore } from '@/shared/store';
import { useToastStore } from '@/shared/store/ui/toast';
import { defaultShadow } from '@/shared/styles/shadows';
import Button from '@/shared/ui/atoms/Button';

// ─── Screen Mode ───
type ScreenMode = 'default' | 'remove' | 'add';

const BrandSettingScreen = () => {
  // ─── Menu State ───
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const menuOpacity = useSharedValue(0);
  const menuScale = useSharedValue(0.95);

  // ─── Mode & Selection State ───
  const [mode, setMode] = useState<ScreenMode>('default');
  const [selectedBrandIds, setSelectedBrandIds] = useState<string[]>([]);
  const [addSelectedBrandIds, setAddSelectedBrandIds] = useState<string[]>([]);

  // ─── Store & Mutation ───
  const { brandList } = useBrandListStore();
  const { optimisticFavorites, setOptimisticFavorite } = useFavoriteStore();
  const { showToast } = useToastStore();
  const { mutate: toggleFavorite } = useToggleFavoriteBrand();

  // ─── Derived Data ───
  const favoriteBrands = useMemo(
    () =>
      brandList.filter(brand => optimisticFavorites[brand.brandId] === true),
    [brandList, optimisticFavorites],
  );

  const favoriteBrandIds = useMemo(
    () => new Set(favoriteBrands.map(b => b.brandId)),
    [favoriteBrands],
  );

  const allBrandsForAdd = useMemo(
    () => brandList.filter(brand => brand.brandId !== 'NONE'),
    [brandList],
  );

  // ─── Menu Animation ───
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

  // ─── Mode Transition ───
  const handleEnterAddMode = useCallback(() => {
    hideMenu(() => {
      setMode('add');
      setAddSelectedBrandIds([]);
    });
  }, [hideMenu]);

  const handleEnterRemoveMode = useCallback(() => {
    hideMenu(() => {
      setMode('remove');
      setSelectedBrandIds([]);
    });
  }, [hideMenu]);

  const handleExitMode = useCallback(() => {
    setMode('default');
    setSelectedBrandIds([]);
    setAddSelectedBrandIds([]);
  }, []);

  // ─── Remove Mode Handlers ───
  const handleResetSelection = useCallback(() => {
    setSelectedBrandIds([]);
  }, []);

  const handleToggleRemoveSelect = useCallback((brandId: string) => {
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
      toggleFavorite(
        { brandId, action: 'REMOVE' },
        {
          onError: () => {
            setOptimisticFavorite(brandId, true);
            showToast('찜 해제 중 오류가 발생했어요');
          },
        },
      );
    });
    showToast(`${selectedBrandIds.length}개의 브랜드를 찜 해제 했어요`);
    setMode('default');
    setSelectedBrandIds([]);
  }, [selectedBrandIds, setOptimisticFavorite, toggleFavorite, showToast]);

  // ─── Add Mode Handlers ───
  const handleToggleAddSelect = useCallback(
    (brandId: string) => {
      if (favoriteBrandIds.has(brandId)) {
        return;
      }
      setAddSelectedBrandIds(prev =>
        prev.includes(brandId)
          ? prev.filter(id => id !== brandId)
          : [...prev, brandId],
      );
    },
    [favoriteBrandIds],
  );

  const handleConfirmAdd = useCallback(() => {
    if (addSelectedBrandIds.length === 0) {
      showToast('추가할 브랜드를 골라주세요');
      return;
    }

    addSelectedBrandIds.forEach(brandId => {
      setOptimisticFavorite(brandId, true);
      toggleFavorite(
        { brandId, action: 'ADD' },
        {
          onError: () => {
            setOptimisticFavorite(brandId, false);
            showToast('브랜드 추가 중 오류가 발생했어요');
          },
        },
      );
    });
    showToast(`${addSelectedBrandIds.length}개의 브랜드를 찜했어요`);
    setMode('default');
    setAddSelectedBrandIds([]);
  }, [addSelectedBrandIds, setOptimisticFavorite, toggleFavorite, showToast]);

  // ─── Header Config ───
  const headerTitle = useMemo(() => {
    switch (mode) {
      case 'remove':
        return '찜한 브랜드 삭제';
      case 'add':
        return '찜 브랜드 추가';
      default:
        return '찜한 브랜드';
    }
  }, [mode]);

  const headerRightElement = useMemo(() => {
    switch (mode) {
      case 'remove':
        return selectedBrandIds.length > 0 ? (
          <Pressable
            onPress={handleResetSelection}
            className="flex-row items-center">
            <Text className="text-pink-500 headline-02">초기화</Text>
            <ReplayIcons width={24} height={24} shape="true" />
          </Pressable>
        ) : undefined;
      case 'add':
        return <SearchIcons shape="black" width={24} height={24} />;
      default:
        return <Kebab />;
    }
  }, [mode, selectedBrandIds.length, handleResetSelection]);

  // ─── Render: Default / Remove 브랜드 아이템 ───
  const renderFavoriteBrandItem = useCallback(
    (brand: Brand) => {
      const isSelected = selectedBrandIds.includes(brand.brandId);

      return (
        <Pressable
          key={brand.brandId}
          className="items-center"
          style={{ width: '33.33%', marginBottom: 24 }}
          onPress={
            mode === 'remove'
              ? () => handleToggleRemoveSelect(brand.brandId)
              : undefined
          }>
          <View style={defaultShadow} className="mb-[7px] rounded-full">
            <ImageBackground
              source={{ uri: Config.IMAGE_URL + brand.iconImageUrl }}
              className="h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full">
              {mode === 'remove' && isSelected && (
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
    [mode, selectedBrandIds, handleToggleRemoveSelect],
  );

  // ─── Render: Add 모드 전체 브랜드 그리드 ───
  const renderAddBrandGrid = useCallback(() => {
    return chunkArray(allBrandsForAdd, 3).map((row, rowIndex) => (
      <View key={rowIndex} className="mb-6 flex-row justify-between py-1">
        {row.map(item => {
          const isFavorite = favoriteBrandIds.has(item.brandId);
          const isSelected = addSelectedBrandIds.includes(item.brandId);

          return (
            <View
              key={item.brandId}
              className="flex-1 items-center"
              style={isFavorite ? { opacity: 0.35 } : undefined}>
              <View style={defaultShadow} className="mb-[7px] rounded-full">
                <Pressable
                  onPress={() => handleToggleAddSelect(item.brandId)}
                  disabled={isFavorite}>
                  <ImageBackground
                    source={{ uri: Config.IMAGE_URL + item.iconImageUrl }}
                    className="h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full">
                    {isSelected && (
                      <View className="w-full flex-1 items-center justify-center rounded-full bg-black/30">
                        <CheckIcons shape="white" width={24} height={24} />
                      </View>
                    )}
                  </ImageBackground>
                </Pressable>
              </View>
              <Text className="text-center text-gray-900 body-rg-02">
                {item.name}
              </Text>
            </View>
          );
        })}

        {row.length < 3 &&
          Array.from({ length: 3 - row.length }).map((_, i) => (
            <View key={`empty-${i}`} className="flex-1" />
          ))}
      </View>
    ));
  }, [
    allBrandsForAdd,
    favoriteBrandIds,
    addSelectedBrandIds,
    handleToggleAddSelect,
  ]);

  // ─── Render: Guide Text ───
  const renderGuideText = useCallback(() => {
    if (mode === 'remove') {
      return (
        <View className="flex items-center justify-center px-1 py-2">
          <Text className="text-gray-500 headline-01">
            <Text className="text-primary-pink headline-01">찜 해제</Text>할
            브랜드를 골라주세요
          </Text>
        </View>
      );
    }
    if (mode === 'add') {
      return (
        <View className="flex items-center justify-center px-1 py-2">
          <Text className="text-gray-500 headline-01">
            <Text className="text-primary-pink headline-01">추가로 찜할</Text>{' '}
            브랜드를 골라주세요.
          </Text>
        </View>
      );
    }
    return null;
  }, [mode]);

  return (
    <ScreenLayout>
      <MypageHeader
        title={headerTitle}
        rightElement={headerRightElement}
        rightIconPress={mode === 'default' ? handleToggleMenu : undefined}
        onBackPress={mode !== 'default' ? handleExitMode : undefined}
      />

      {/* Guide Text */}
      {renderGuideText()}

      {/* Kebab Dropdown Menu */}
      <Modal
        transparent
        visible={menuMounted}
        animationType="none"
        onRequestClose={() => hideMenu()}>
        <TouchableWithoutFeedback onPress={() => hideMenu()}>
          <View className="flex-1">
            <Animated.View
              className="absolute right-4"
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
                onPress={handleEnterAddMode}>
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

      {/* ─── Content by Mode ─── */}
      {mode === 'add' ? (
        <ScrollView
          className="flex-1 px-2 pt-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}>
          {renderAddBrandGrid()}
        </ScrollView>
      ) : favoriteBrands.length === 0 && mode === 'default' ? (
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
            {favoriteBrands.map(brand => renderFavoriteBrandItem(brand))}
          </View>
        </ScrollView>
      )}

      {/* ─── Bottom Action ─── */}
      {mode === 'remove' && (
        <View className="flex-row">
          <Pressable
            className="ml-2 flex-1 flex-row items-center justify-center space-x-1 rounded-lg py-3"
            onPress={handleConfirmRemove}>
            <PicselActionIcons shape="delete" width={24} height={24} />
            <Text className="text-semantic-error headline-02">찜 해제하기</Text>
          </Pressable>
        </View>
      )}

      {mode === 'add' && (
        <View className="px-4 pb-4">
          <Button
            className="w-full"
            text="추가하기"
            textColor="white"
            onPress={handleConfirmAdd}
            disabled={addSelectedBrandIds.length === 0}
          />
        </View>
      )}
    </ScreenLayout>
  );
};

export default BrandSettingScreen;

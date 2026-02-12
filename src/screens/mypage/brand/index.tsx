import React, { useEffect, useState, useCallback, useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';
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
import { useHandleScroll } from '@/feature/brand/model/hooks/useHandleScroll';
import { useToggleFavoriteBrand } from '@/feature/brand/mutations/useToggleFavoriteBrand';
import { chunkArray } from '@/feature/brand/utils/arrayUtils';
import MypageHeader from '@/feature/mypage/shared/components/ui/molecules/MypageHeader';
import { MypageNavigationProp } from '@/navigation/types/navigateTypeUtil';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import CheckIcons from '@/shared/icons/CheckIcons';
import FloatingButton from '@/shared/icons/FloatingButton';
import PicselActionIcons from '@/shared/icons/PicselActionIcons';
import ReplayIcons from '@/shared/icons/ReplayIcon';
import SearchIcons from '@/shared/icons/SearchIcons';
import SparkleImages from '@/shared/images/Sparkle';
import {
  useBrandListStore,
  useFavoriteStore,
  useSearchSelectedBrandsStore,
} from '@/shared/store';
import { useToastStore } from '@/shared/store/ui/toast';
import { defaultShadow } from '@/shared/styles/shadows';

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
  const { searchSelectedBrandIds, clearSearchSelectedBrandIds } =
    useSearchSelectedBrandsStore();
  const { showToast } = useToastStore();
  const { mutate: toggleFavorite } = useToggleFavoriteBrand();
  const navigation = useNavigation<MypageNavigationProp>();
  const { showFloatingButton, handleScroll, scrollToTop, scrollViewRef } =
    useHandleScroll();

  // ─── 검색 화면에서 전달받은 선택 브랜드 반영 ───
  useEffect(() => {
    if (searchSelectedBrandIds.length > 0) {
      setMode('add');
      setAddSelectedBrandIds(prev => {
        const merged = new Set([...prev, ...searchSelectedBrandIds]);
        return Array.from(merged);
      });
      clearSearchSelectedBrandIds();
    }
  }, [searchSelectedBrandIds, clearSearchSelectedBrandIds]);

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
      showToast('찜 추가할 브랜드를 골라주세요');
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
    showToast(`${addSelectedBrandIds.length}개의 브랜드를 찜 추가했어요`);
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
  }, [mode, selectedBrandIds.length, handleResetSelection, navigation]);

  // ─── Render: Default / Remove 브랜드 그리드 ───
  const renderFavoriteBrandGrid = useCallback(() => {
    return chunkArray(favoriteBrands, 3).map((row, rowIndex) => (
      <View key={rowIndex} className="mb-6 flex-row justify-between py-1">
        {row.map(item => {
          const isSelected = selectedBrandIds.includes(item.brandId);

          return (
            <View key={item.brandId} className="flex-1 items-center">
              <View style={defaultShadow} className="mb-[7px] rounded-full">
                <Pressable
                  onPress={
                    mode === 'remove'
                      ? () => handleToggleRemoveSelect(item.brandId)
                      : undefined
                  }>
                  <ImageBackground
                    source={{ uri: Config.IMAGE_URL + item.iconImageUrl }}
                    className="h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full">
                    {mode === 'remove' && isSelected && (
                      <View className="w-full flex-1 items-center justify-center rounded-full bg-black/30">
                        <CheckIcons shape="white" width={24} height={24} />
                      </View>
                    )}
                  </ImageBackground>
                </Pressable>
              </View>
              <Text
                className="text-center text-gray-900 body-rg-02"
                numberOfLines={1}
                ellipsizeMode="tail">
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
  }, [favoriteBrands, mode, selectedBrandIds, handleToggleRemoveSelect]);

  // ─── Render: Add 모드 전체 브랜드 그리드 ───
  const renderAddBrandGrid = useCallback(() => {
    return chunkArray(allBrandsForAdd, 3).map((row, rowIndex) => (
      <View
        key={rowIndex}
        className="-top-4 mb-6 flex-row justify-between py-1">
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
    if (mode === 'remove' && favoriteBrands.length > 0) {
      return (
        <View className="-mb-3 flex items-center justify-center px-1 py-2">
          <Text className="text-gray-500 headline-01">
            <Text className="text-primary-pink headline-01">찜 해제</Text>할
            브랜드를 골라주세요.
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
  }, [mode, favoriteBrands.length]);

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
          ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          className="flex-1 px-2 pt-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}>
          {renderAddBrandGrid()}
        </ScrollView>
      ) : favoriteBrands.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <SparkleImages shape="bg-opacity" height={418} width={340} />
          <Text className="absolute text-gray-900 headline-04">
            찜한 브랜드가 없어요
          </Text>
        </View>
      ) : (
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          className="flex-1 px-2 pt-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}>
          {renderFavoriteBrandGrid()}
        </ScrollView>
      )}

      {/* ─── Floating Button ─── */}
      {showFloatingButton && (
        <Pressable
          onPressIn={scrollToTop}
          style={{
            position: 'absolute',
            bottom: 90,
            right: 24,
            zIndex: 10,
          }}>
          <FloatingButton shape="floating" />
        </Pressable>
      )}

      {/* ─── Bottom Action ─── */}
      {mode === 'remove' && favoriteBrands.length > 0 && (
        <View className="flex-row">
          <Pressable
            className="ml-2 mt-1 flex-1 flex-row items-center justify-center space-x-1 rounded-lg py-3"
            onPress={handleConfirmRemove}>
            <PicselActionIcons shape="delete" width={24} height={24} />
            <Text className="text-semantic-error headline-02">
              {selectedBrandIds.length > 0
                ? `${selectedBrandIds.length}개의 브랜드 찜 해제하기`
                : '찜 해제하기'}
            </Text>
          </Pressable>
        </View>
      )}

      {mode === 'add' && (
        <View className="flex-row">
          <Pressable
            className="ml-2 mt-1 flex-1 flex-row items-center justify-center space-x-1 rounded-lg py-3"
            onPress={handleConfirmAdd}>
            <Text className="text-primary-pink headline-02">
              {addSelectedBrandIds.length > 0
                ? `${addSelectedBrandIds.length}개의 브랜드 찜 추가하기`
                : '추가하기'}
            </Text>
          </Pressable>
        </View>
      )}
    </ScreenLayout>
  );
};

export default BrandSettingScreen;

import { useEffect, useState, useCallback, useMemo } from 'react';

import {
  BrandSettingMode,
  TOAST_MESSAGES,
} from '../constants/brandSettingTexts';

import { useToggleFavoriteBrand } from '@/feature/brand/mutations/useToggleFavoriteBrand';
import {
  useBrandListStore,
  useFavoriteStore,
  useSearchSelectedBrandsStore,
} from '@/shared/store';
import { useToastStore } from '@/shared/store/ui/toast';

const toggleId = (ids: string[], id: string) =>
  ids.includes(id) ? ids.filter(v => v !== id) : [...ids, id];

export const useBrandSetting = () => {
  const [mode, setMode] = useState<BrandSettingMode>('default');
  const [removeSelectedIds, setRemoveSelectedIds] = useState<string[]>([]);
  const [addSelectedIds, setAddSelectedIds] = useState<string[]>([]);

  const { brandList } = useBrandListStore();
  const { optimisticFavorites, setOptimisticFavorite } = useFavoriteStore();
  const { searchSelectedBrandIds, clearSearchSelectedBrandIds } =
    useSearchSelectedBrandsStore();
  const { showToast } = useToastStore();
  const { mutate: toggleFavorite } = useToggleFavoriteBrand();

  useEffect(() => {
    if (searchSelectedBrandIds.length > 0) {
      setMode('add');
      setAddSelectedIds(prev => {
        const merged = new Set([...prev, ...searchSelectedBrandIds]);
        return Array.from(merged);
      });
      clearSearchSelectedBrandIds();
    }
  }, [searchSelectedBrandIds, clearSearchSelectedBrandIds]);

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

  const removeSelectedList = useMemo(
    () => removeSelectedIds.map(id => ({ brandId: id, name: '' })),
    [removeSelectedIds],
  );

  const addSelectedList = useMemo(
    () => addSelectedIds.map(id => ({ brandId: id, name: '' })),
    [addSelectedIds],
  );

  const toggleRemoveSelect = useCallback((brandId: string) => {
    setRemoveSelectedIds(prev => toggleId(prev, brandId));
  }, []);

  const toggleAddSelect = useCallback(
    (brandId: string) => {
      if (favoriteBrandIds.has(brandId)) {
        return;
      }
      setAddSelectedIds(prev => toggleId(prev, brandId));
    },
    [favoriteBrandIds],
  );

  const enterAddMode = useCallback(() => {
    setMode('add');
    setAddSelectedIds([]);
  }, []);

  const enterRemoveMode = useCallback(() => {
    setMode('remove');
    setRemoveSelectedIds([]);
  }, []);

  const exitMode = useCallback(() => {
    setMode('default');
    setRemoveSelectedIds([]);
    setAddSelectedIds([]);
  }, []);

  const resetRemoveSelection = useCallback(() => {
    setRemoveSelectedIds([]);
  }, []);

  const confirmRemove = useCallback(() => {
    if (removeSelectedIds.length === 0) {
      showToast(TOAST_MESSAGES.REMOVE_EMPTY);
      return;
    }

    removeSelectedIds.forEach(brandId => {
      setOptimisticFavorite(brandId, false);
      toggleFavorite(
        { brandId, action: 'REMOVE' },
        {
          onError: () => {
            setOptimisticFavorite(brandId, true);
            showToast(TOAST_MESSAGES.REMOVE_ERROR);
          },
        },
      );
    });

    showToast(TOAST_MESSAGES.REMOVE_SUCCESS(removeSelectedIds.length));
    setMode('default');
    setRemoveSelectedIds([]);
  }, [removeSelectedIds, setOptimisticFavorite, toggleFavorite, showToast]);

  const confirmAdd = useCallback(() => {
    if (addSelectedIds.length === 0) {
      showToast(TOAST_MESSAGES.ADD_EMPTY);
      return;
    }

    addSelectedIds.forEach(brandId => {
      setOptimisticFavorite(brandId, true);
      toggleFavorite(
        { brandId, action: 'ADD' },
        {
          onError: () => {
            setOptimisticFavorite(brandId, false);
            showToast(TOAST_MESSAGES.ADD_ERROR);
          },
        },
      );
    });

    showToast(TOAST_MESSAGES.ADD_SUCCESS(addSelectedIds.length));
    setMode('default');
    setAddSelectedIds([]);
  }, [addSelectedIds, setOptimisticFavorite, toggleFavorite, showToast]);

  return {
    mode,
    favoriteBrands,
    favoriteBrandIds,
    allBrandsForAdd,
    removeSelectedIds,
    addSelectedIds,
    removeSelectedList,
    addSelectedList,
    toggleRemoveSelect,
    toggleAddSelect,
    enterAddMode,
    enterRemoveMode,
    exitMode,
    resetRemoveSelection,
    confirmRemove,
    confirmAdd,
  };
};

import React, { useState, useCallback, useRef, useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

import NoResult from '@/feature/brand/ui/organisms/NoResult';
import { useStoreSearch } from '@/feature/search/hooks/useStoreSearch';
import SearchResultList from '@/feature/search/ui/organisms/SearchResultList';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { useLocationStore, useMapLocationStore } from '@/shared/store';
import { RootStackNavigationProp } from '@/shared/types/navigateTypeUtil';
import Input from '@/shared/ui/atoms/Input';

const StoreSearchScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [query, setQuery] = useState('');
  const { setTargetLocation, mapMode, resetToDefault } = useMapLocationStore();
  const { setSearchLocation } = useLocationStore();
  const { result, uiState, hasResults } = useStoreSearch(query);
  const composingRef = useRef(false);
  const highlight = useMemo(() => query?.split(/\s+/), [query]);

  const handleClear = useCallback(() => {
    setQuery('');
  }, []);

  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const handleSearchModeBack = useCallback(() => {
    if (mapMode === 'search') {
      resetToDefault();
    }
    navigation.goBack();
  }, [mapMode, resetToDefault, navigation]);

  const handleChangeText = useCallback((text: string) => {
    if (!composingRef.current) {
      setQuery(text);
    }
  }, []);

  const handleResultPress = useCallback(
    (row: {
      id: string;
      kind: string;
      title: string;
      subtitle: string;
      distanceMeters: number;
      x: number;
      y: number;
    }) => {
      const storeId = row.kind === 'store' ? row.id : null;

      const locationData = {
        latitude: row.y,
        longitude: row.x,
        zoom: 15,
      };

      setSearchLocation(locationData);

      setTargetLocation(
        locationData,
        {
          id: row.id,
          kind: row.kind,
          title: row.title,
          subtitle: row.subtitle,
        },
        storeId,
      );
      setQuery(row.title);
      navigation.navigate('Home');
    },
    [setSearchLocation, setTargetLocation, navigation],
  );

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
      <ScreenLayout>
        <Input
          value={query}
          onChangeText={handleChangeText}
          handleClear={handleClear}
          arrow
          onPressLeft={
            mapMode === 'search'
              ? handleSearchModeBack
              : () => navigation.goBack()
          }
          close
          autoFocus
        />
        <View className="flex-1">
          <SearchResultList
            data={result}
            highlight={highlight}
            onPressItem={handleResultPress}
          />
          {!hasResults && <NoResult visible={uiState === 'noResults'} />}
        </View>
      </ScreenLayout>
    </TouchableWithoutFeedback>
  );
};

export default StoreSearchScreen;

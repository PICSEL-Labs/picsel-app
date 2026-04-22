import React, { useCallback, useMemo, useRef, useState } from 'react';

import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

import NoResult from '@/feature/brand/ui/organisms/NoResult';
import { useStoreSearch } from '@/feature/search/hooks/useStoreSearch';
import SearchResultList from '@/feature/search/ui/organisms/SearchResultList';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { useLocationStore, useMapLocationStore } from '@/shared/store';
import Input from '@/shared/ui/atoms/Input';

const StoreSearchScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [query, setQuery] = useState('');
  const { setTargetLocation, mapMode, resetToDefault } = useMapLocationStore();
  const { setUserLocation } = useLocationStore();
  const { result, uiState, hasResults } = useStoreSearch(query);
  const composingRef = useRef(false);

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

      const targetLocationData = {
        latitude: row.y,
        longitude: row.x,
        zoom: 15,
      };

      Geolocation.getCurrentPosition(
        position => {
          const currentUserLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 15,
          };

          setUserLocation(currentUserLocation);

          setTargetLocation(
            targetLocationData,
            {
              id: row.id,
              kind: row.kind,
              title: row.title,
              subtitle: row.subtitle,
            },
            storeId,
          );

          setQuery(row.title);
          navigation.goBack();
        },
        error => {
          console.error('위치 가져오기 실패:', error);
          setUserLocation(targetLocationData);
          setTargetLocation(
            targetLocationData,
            {
              id: row.id,
              kind: row.kind,
              title: row.title,
              subtitle: row.subtitle,
            },
            storeId,
          );
          setQuery(row.title);
          navigation.goBack();
        },
      );
    },
    [setUserLocation, setTargetLocation, navigation],
  );

  const handleClear = useCallback(() => {
    setQuery('');
  }, []);

  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const highlight = useMemo(() => query?.split(/\s+/), [query]);

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
      <ScreenLayout>
        <Input
          value={query}
          onChangeText={handleChangeText}
          handleClear={handleClear}
          className="w-80"
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
          {hasResults ? (
            <SearchResultList
              data={result}
              highlight={highlight}
              onPressItem={handleResultPress}
            />
          ) : (
            <NoResult visible={uiState === 'noResults'} />
          )}
        </View>
      </ScreenLayout>
    </TouchableWithoutFeedback>
  );
};

export default StoreSearchScreen;

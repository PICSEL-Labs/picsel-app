import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

import NoResult from '@/feature/brand/ui/organisms/NoResult';
import { useStoreSearch } from '@/feature/search/hooks/useStoreSearch';
import SearchResultList from '@/feature/search/ui/organisms/SearchResultList';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { useMapLocationStore } from '@/shared/store';
import { RootStackNavigationProp } from '@/shared/types/navigateTypeUtil';
import Input from '@/shared/ui/atoms/Input';

const StoreSearchScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [query, setQuery] = useState('');
  const { setTargetLocation } = useMapLocationStore();

  const { result, uiState, hasResults } = useStoreSearch(query);

  const handleItemPress = (row: {
    id: string;
    kind: string;
    title: string;
    subtitle: string;
    distanceMeters: number;
    x: number;
    y: number;
  }) => {
    // 전역 상태에 저장
    setTargetLocation(
      {
        latitude: row.y,
        longitude: row.x,
        zoom: 15,
      },
      {
        id: row.id,
        kind: row.kind,
        title: row.title,
        subtitle: row.subtitle,
      },
    );

    // Home으로 이동
    navigation.navigate('Home');
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
      accessible={false}>
      <ScreenLayout>
        <Input
          value={query}
          onChangeText={setQuery}
          handleClear={() => setQuery('')}
          arrow
          onPressLeft={() => navigation.goBack()}
          close
          autoFocus
        />
        <View className="flex-1">
          <SearchResultList
            data={result}
            highlight={query.split(/\s+/)}
            onPressItem={handleItemPress}
          />
          {!hasResults && <NoResult visible={uiState === 'noResults'} />}
        </View>
      </ScreenLayout>
    </TouchableWithoutFeedback>
  );
};

export default StoreSearchScreen;

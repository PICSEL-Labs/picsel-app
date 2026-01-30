import { useCallback, useMemo, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Keyboard } from 'react-native';

import { SearchResultView } from '@/feature/search/hooks/useSearchResultSections';
import { useStoreSearch } from '@/feature/search/hooks/useStoreSearch';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import { useMapLocationStore } from '@/shared/store';

interface Props {
  onSelect: (location: string) => void;
  onClose: () => void;
}

export const useLocationSearch = ({ onSelect, onClose }: Props) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [query, setQuery] = useState('');

  const { mapMode, resetToDefault } = useMapLocationStore();
  const { result, uiState, hasResults } = useStoreSearch(query);

  const handleClear = useCallback(() => setQuery(''), []);

  const handleChangeText = useCallback((text: string) => setQuery(text), []);

  const handleSelectLocation = useCallback(
    (item: SearchResultView) => {
      if (item?.title) {
        Keyboard.dismiss();
        onSelect(item.title);
        onClose();
      }
    },
    [onSelect, onClose],
  );

  const handleBack = useCallback(() => {
    if (mapMode === 'search') {
      resetToDefault();
    }
    navigation.goBack();
  }, [mapMode, resetToDefault, navigation]);

  const highlight = useMemo(() => query?.split(/\s+/), [query]);

  return {
    query,
    result,
    uiState,
    hasResults,
    highlight,
    actions: {
      handleClear,
      handleChangeText,
      handleSelectLocation,
      handleBack,
    },
    mapMode,
  };
};

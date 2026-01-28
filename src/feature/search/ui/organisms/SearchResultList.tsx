import React, { memo } from 'react';

import { SectionList, Text, View } from 'react-native';

import { useSearchResultSections } from '../../hooks/useSearchResultSections';
import SearchResultItem from '../molecules/SearchResultItem';

import type { AcSearchResult } from '@/feature/search/types';

interface Props {
  data?: AcSearchResult;
  highlight?: string[];
  onPressItem?: (row: any) => void;
  scrollEnabled?: boolean;
}

const SearchResultList = memo(
  ({ data, highlight, onPressItem, scrollEnabled = true }: Props) => {
    const sections = useSearchResultSections(data);

    return (
      <View className="flex-1">
        <SectionList
          sections={sections}
          scrollEnabled={scrollEnabled}
          extraData={highlight}
          className="mt-6 px-4"
          stickySectionHeadersEnabled={false}
          keyExtractor={item => item.id}
          keyboardShouldPersistTaps="handled"
          renderSectionHeader={({ section }) => (
            <View className="bg-white">
              <Text className="text-gray-900 headline-02">{section.title}</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <SearchResultItem
              kind={item.kind}
              title={item.title}
              subtitle={item.subtitle}
              highlightKeyword={highlight}
              distanceMeters={item.distanceMeters}
              onPress={() => onPressItem?.(item)}
            />
          )}
          renderSectionFooter={({ section }) =>
            section !== sections.at(-1) && <View style={{ height: 40 }} />
          }
          ListFooterComponent={<View className="h-6" />}
        />
      </View>
    );
  },
  (prevProps, nextProps) => {
    const isSameData = prevProps.data === nextProps.data;
    const isSameHighlight =
      JSON.stringify(prevProps.highlight) ===
      JSON.stringify(nextProps.highlight);
    const isSameOnPressItem = prevProps.onPressItem === nextProps.onPressItem;

    return isSameData && isSameHighlight && isSameOnPressItem;
  },
);

SearchResultList.displayName = 'SearchResultList';

export default SearchResultList;

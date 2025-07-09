import React from 'react';

import { View, Text, Pressable, Linking } from 'react-native';

import { TERMS_DATA } from '@/shared/constants/data/terms';
import ArrowIcons from '@/shared/icons/ArrowIcons';
import CheckboxIcons from '@/shared/icons/CheckboxIcons';

interface Props {
  checkedStates: boolean[];
  allChecked: boolean;
  toggleAll: () => void;
  toggleItem: (index: number) => void;
}

const TermsAgreementList = ({
  checkedStates,
  allChecked,
  toggleAll,
  toggleItem,
}: Props) => {
  return (
    <>
      {/* 전체동의 */}
      <View className="mb-3 flex-row border-b-2 border-b-gray-100 py-3">
        <Pressable onPressIn={toggleAll}>
          {allChecked ? (
            <CheckboxIcons shape="check-gray" height={24} width={24} />
          ) : (
            <CheckboxIcons shape="check-black" height={24} width={24} />
          )}
        </Pressable>
        <Text className="ml-3 text-primary-black headline-02">전체동의</Text>
      </View>

      {/* 개별 항목 */}
      <View className="mb-8 gap-5">
        {TERMS_DATA.map((data, index) => (
          <View key={index} className="flex-row items-center">
            <Pressable onPressIn={() => toggleItem(index)}>
              {checkedStates[index] ? (
                <CheckboxIcons shape="check-gray" width={24} height={24} />
              ) : (
                <CheckboxIcons shape="check-black" width={24} height={24} />
              )}
            </Pressable>

            <Text className="mx-3 text-primary-black headline-02">
              {index < 4 ? '(필수)' : '(선택)'}
            </Text>
            <Text className="text-gray-900 body-rg-03">{data.text}</Text>

            {index > 0 && (
              <Pressable
                className="absolute right-0"
                onPress={() => Linking.openURL(data.link)}>
                <ArrowIcons shape="next-gray" width={24} height={24} />
              </Pressable>
            )}
          </View>
        ))}
      </View>
    </>
  );
};

export default TermsAgreementList;

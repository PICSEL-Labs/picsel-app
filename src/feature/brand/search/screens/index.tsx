import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import SparkleImages from '@/shared/images/Sparkle';
import { RootStackNavigationProp } from '@/shared/types/navigateTypeUtil';
import Input from '@/shared/ui/atoms/Input';

const BrandSearchScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [query, setQuery] = useState('');

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

        <View className="w-full flex-1 items-center justify-center">
          <SparkleImages shape="bg-opacity" height={418} width={340} />
        </View>
      </ScreenLayout>
    </TouchableWithoutFeedback>
  );
};

export default BrandSearchScreen;

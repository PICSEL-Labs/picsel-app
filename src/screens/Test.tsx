import React from 'react';

import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ArrowIcons from '@/shared/icons/ArrowIcons';
import BookIcons from '@/shared/icons/BookIcons';
import BrandFavIcons from '@/shared/icons/BrandFav';
import CheckboxIcons from '@/shared/icons/CheckboxIcons';
import CheckIcons from '@/shared/icons/CheckIcons';
import CheckRoundIcons from '@/shared/icons/CheckRound';
import CloseIcons from '@/shared/icons/CloseIcons';
import CopyIcons from '@/shared/icons/CopyIcons';
import FloatingButton from '@/shared/icons/FloatingButton';
import LocateIcons from '@/shared/icons/LocateIcons';
import MapIcons from '@/shared/icons/MapIcons';
import MyIcons from '@/shared/icons/MyIcons';
import QrIcons from '@/shared/icons/QrIcons';
import ReplayIcons from '@/shared/icons/ReplayIcon';
import SemanticIcons from '@/shared/icons/SemanticIcons';
import SparkleIcons from '@/shared/icons/SparkleIcons';
import StarIcons from '@/shared/icons/StarIcons';
import Button from '@/shared/ui/atoms/Button';
import SButton from '@/shared/ui/atoms/SButton';

const Test = () => {
  return (
    <SafeAreaView className="h-full flex-1 bg-pink-200">
      <Text className="text-primary-pink title-01">
        The quick brown fox jumps over the lazy dog
      </Text>

      <View className="flex-row">
        <CheckboxIcons shape="check-gray" height={50} width={50} />
        <SparkleIcons shape="on" height={50} width={50} />
        <SparkleIcons shape="double" height={50} width={50} />
      </View>

      <View className="flex-row">
        <MapIcons shape="border-black" width={50} height={50} />
        <MapIcons shape="border-pink" width={50} height={50} />
        <MapIcons shape="fill-gray" width={50} height={50} />
        <MapIcons shape="fill-pink" width={50} height={50} />
      </View>

      <View className="flex-row">
        <CheckIcons shape="black" width={24} height={24} />
        <CheckIcons shape="white" width={24} height={24} />
        <CheckRoundIcons shape="check-round" width={24} height={24} />
      </View>

      <View className="flex-row">
        <StarIcons shape="empty" width={24} height={24} />
        <StarIcons shape="fill" width={24} height={24} />
      </View>

      <View className="flex-row">
        <BrandFavIcons shape="empty" width={24} height={24} />
        <BrandFavIcons shape="fill" width={24} height={24} />
        <BrandFavIcons shape="gray" width={24} height={24} />
      </View>

      <View className="flex-row">
        <ArrowIcons shape="back" width={24} height={24} />
        <ArrowIcons shape="next" width={24} height={24} />
      </View>

      <View className="flex-row">
        <QrIcons shape="off-1" width={24} height={24} />
        <QrIcons shape="off-2" width={24} height={24} />
        <QrIcons shape="on-1" width={24} height={24} />
        <QrIcons shape="on-2" width={24} height={24} />
      </View>

      <View className="flex-row">
        <CloseIcons shape="black" width={24} height={24} />
        <CloseIcons shape="gray" width={24} height={24} />
      </View>

      <View className="flex-row">
        <LocateIcons shape="gray" width={24} height={24} />
        <LocateIcons shape="skyblue" width={24} height={24} />
      </View>

      <ReplayIcons shape="default" width={24} height={24} />

      <View className="flex-row">
        <BookIcons shape="gray" width={24} height={24} />
        <BookIcons shape="pink" width={24} height={24} />
      </View>

      <CopyIcons shape="default" width={24} height={24} />

      <View className="flex-row">
        <MyIcons shape="gray" width={24} height={24} />
        <MyIcons shape="pink" width={24} height={24} />
      </View>

      <View className="flex-row">
        <CheckboxIcons shape="check-black" width={24} height={24} />
        <CheckboxIcons shape="check-gray" width={24} height={24} />
        <CheckboxIcons shape="empty" width={24} height={24} />
      </View>

      <View className="flex-row">
        <SemanticIcons shape="green" width={24} height={24} />
        <SemanticIcons shape="pink" width={24} height={24} />
      </View>

      <FloatingButton shape="floating" />

      {/* SButton example */}
      <View className="gaps items-center">
        <Button
          onPressIn={() => console.log('hi')}
          color="white"
          textColor="pink"
          text="QR 사진저장"
          shadow
        />
      </View>
      <View className="mt-2 flex-row justify-between px-2">
        <SButton text="BUTTON" textColor="white" />
        <SButton
          text="TEXT ONLY"
          textColor="gray"
          color="textOnly"
          activeOpacity={1}
        />
        <SButton
          text="Disabled"
          color="disabled"
          textColor="white"
          activeOpacity={1}
        />
      </View>
    </SafeAreaView>
  );
};

export default Test;

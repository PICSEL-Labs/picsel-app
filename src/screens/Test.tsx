import React from 'react';

import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Gradient from '@/assets/gradient/gradient.svg';
import ArrowIcons from '@/shared/icons/ArrowIcons';
import BookIcons from '@/shared/icons/BookIcons';
import BrandFavIcons from '@/shared/icons/BrandFav';
import CheckboxIcons from '@/shared/icons/CheckboxIcons';
import CheckIcons from '@/shared/icons/CheckIcons';
import CheckRoundIcons from '@/shared/icons/CheckRound';
import CloseIcons from '@/shared/icons/CloseIcons';
import CopyIcons from '@/shared/icons/CopyIcons/indes';
import FloatingButton from '@/shared/icons/FloatingButton';
import LocateIcons from '@/shared/icons/LocateIcons';
import MapIcons from '@/shared/icons/MapIcons';
import MyIcons from '@/shared/icons/MyIcons';
import QrIcons from '@/shared/icons/QrIcons/idnex';
import ReplayIcons from '@/shared/icons/ReplayIcon';
import SearchIcons from '@/shared/icons/SearchIcons';
import SemanticIcons from '@/shared/icons/SemanticIcons';
import SocialButtons from '@/shared/icons/SocialButtons';
import SparkleIcons from '@/shared/icons/SparkleIcons';
import StarIcons from '@/shared/icons/StarIcons';

const Test = () => {
  return (
    <SafeAreaView className="h-full flex-1 bg-pink-200">
      <Text className="text-primary-black title-05">
        The quick brown fox jumps over the lazy dog
      </Text>

      <View className="flex-row">
        <SparkleIcons shape="off" height={50} width={50} />
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

      <SearchIcons shape="default" width={24} height={24} />

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

      <Gradient />

      <View className="flex-row">
        <SocialButtons shape="kakao" />
        <SocialButtons shape="google" />
        <SocialButtons shape="apple" />
        <SocialButtons shape="naver" />
      </View>

      <FloatingButton shape="floating" />
    </SafeAreaView>
  );
};

export default Test;

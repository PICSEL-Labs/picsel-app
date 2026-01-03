import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { ImageBackground, Pressable, Text, View } from 'react-native';

import { CONTENT_SECTIONS } from '../../../shared/constants/piscelBookText';
import UploadTooltip from '../../molecule/UploadTooltip';

import PlusIcon from '@/assets/icons/plus/icon-plus.svg';
import { IMAGES } from '@/shared/constants/images';
import PicselBookIcons from '@/shared/icons/PicselBookIcons';
import { RootStackNavigationProp } from '@/shared/types/navigateTypeUtil';
import { insetShadow } from '@/styles/shadows';

const MyPicselEmpty = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleAddPicsel = () => {
    navigation.navigate('PhotoUpload');
  };

  return (
    <ImageBackground
      source={IMAGES.SPARKLE.BACKGROUND_OPACITY}
      className="flex-1"
      resizeMode="contain"
      imageStyle={{ alignSelf: 'center' }}>
      {/* Empty State Content */}
      <View className="flex-1 items-center justify-center">
        <View className="mb-10 items-center justify-center">
          <PicselBookIcons shape="default" width={70} height={70} />
        </View>

        {CONTENT_SECTIONS.map((section, index) => (
          <View key={index} className={section.spacing}>
            {section.title ? (
              <Text className={`text-center ${section.className}`}>
                {section.title}
              </Text>
            ) : (
              section.lines?.map((line, lineIndex) => (
                <Text
                  key={lineIndex}
                  className={`text-center ${section.className}`}>
                  {line}
                </Text>
              ))
            )}
          </View>
        ))}
      </View>

      {/* Floating Action Button */}
      <View className="absolute -bottom-4 right-6 space-y-5">
        <UploadTooltip />

        <Pressable
          onPress={handleAddPicsel}
          className="h-12 w-12 items-center justify-center self-end rounded-full bg-pink-500 shadow-lg"
          style={{
            boxShadow: insetShadow.default,
          }}>
          <PlusIcon width={28} height={28} fill="white" />
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default MyPicselEmpty;

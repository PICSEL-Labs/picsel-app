import React from 'react';

import { Pressable, Text, View } from 'react-native';
import { ContextMenuView } from 'react-native-ios-context-menu';

import PicselBookSkeleton from '@/feature/picsel/shared/components/ui/atoms/Skeleton/PicselBookSkeleton';
import CheckRoundIcons from '@/shared/icons/CheckRound';
import PicselBookIcons from '@/shared/icons/PicselBookIcons';

interface Props {
  id: string;
  title: string;
  coverImage?: string;
  isSelecting?: boolean;
  isSelected?: boolean;
  isLoading?: boolean;
  onPress?: (id: string) => void;
  onEdit?: (id: string, title: string) => void;
  onChangeCover?: (id: string) => void;
  onDelete?: (id: string, title: string) => void;
}

const PicselBookCard = ({
  id,
  title,
  coverImage,
  isSelecting = false,
  isSelected = false,
  isLoading = false,
  onPress,
  onEdit,
  onChangeCover,
  onDelete,
}: Props) => {
  const handlePress = () => {
    onPress?.(id);
  };

  // 스켈레톤 상태일 때
  if (isLoading) {
    return <PicselBookSkeleton />;
  }

  const cardContent = (
    <>
      {/* 픽셀북 아이콘 */}
      <View className="relative mb-2">
        <PicselBookIcons
          shape={coverImage ? 'cover-selected' : 'default'}
          width={80}
          height={72}
          imageUri={coverImage}
        />

        {/* 선택 모드 체크박스 */}
        {isSelecting && (
          <View className="absolute right-[25px] top-[25px]">
            <CheckRoundIcons
              shape={isSelected ? 'pink' : 'white'}
              width={24}
              height={24}
            />
          </View>
        )}
      </View>

      {/* 제목 - 말줄임표 처리 */}
      <Text
        className="mb-1 text-center text-gray-900 body-rg-02"
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{ width: 80 }}>
        {title}
      </Text>
    </>
  );

  // 선택 모드일 때는 일반 Pressable 사용
  if (isSelecting) {
    return (
      <Pressable
        onPress={handlePress}
        className="flex flex-col items-center"
        style={{ width: 80 }}>
        {cardContent}
      </Pressable>
    );
  }

  // 선택 모드가 아닐 때는 ContextMenuView 사용
  return (
    <ContextMenuView
      menuConfig={{
        menuTitle: '',
        menuItems: [
          {
            actionKey: 'edit',
            actionTitle: '이름 변경',
            icon: {
              type: 'IMAGE_SYSTEM',
              imageValue: {
                systemName: 'pencil',
              },
            },
          },
          {
            actionKey: 'cover',
            actionTitle: '커버사진 변경',
            icon: {
              type: 'IMAGE_SYSTEM',
              imageValue: {
                systemName: 'photo',
              },
            },
          },
          {
            actionKey: 'delete',
            actionTitle: '삭제',
            menuAttributes: ['destructive'],
            icon: {
              type: 'IMAGE_SYSTEM',
              imageValue: {
                systemName: 'trash',
              },
            },
          },
        ],
      }}
      previewConfig={{
        previewType: 'DEFAULT',
        previewSize: 'STRETCH',
        isResizeAnimated: false,
        borderRadius: 0,
      }}
      onPressMenuItem={({ nativeEvent }) => {
        switch (nativeEvent.actionKey) {
          case 'edit':
            onEdit?.(id, title);
            break;
          case 'cover':
            onChangeCover?.(id);
            break;
          case 'delete':
            onDelete?.(id, title);
            break;
        }
      }}>
      <Pressable
        onPress={handlePress}
        className="flex flex-col items-center"
        style={{ width: 80 }}>
        {cardContent}
      </Pressable>
    </ContextMenuView>
  );
};

export default PicselBookCard;

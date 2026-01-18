import React, { forwardRef, useMemo, useState } from 'react';

import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Keyboard, Pressable } from 'react-native';

import PicselBookInput from '../../atoms/PicselBookInput';

import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import CheckRoundIcons from '@/shared/icons/CheckRound';
import PicselBookIcons from '@/shared/icons/PicselBookIcons';
import { cn } from '@/shared/lib/cn';
import { bottomSheetIndicator } from '@/shared/styles/bottomSheetIndicator';
import Button from '@/shared/ui/atoms/Button';

interface Props {
  onSubmit: (bookName: string) => void;
}

type CoverType = 'default' | 'photo';

/**
 * 픽셀북 생성/수정 바텀시트
 * - 픽셀북 이름 입력 (특수문자 제한)
 * - 확인 버튼으로 제출
 */
const PicselBookBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ onSubmit }, ref) => {
    const navigation = useNavigation<RootStackNavigationProp>();
    const [bookName, setBookName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isEdited, setIsEdited] = useState(true);
    const [selectedCover, setSelectedCover] = useState<CoverType>('default');
    const snapPoints = useMemo(() => ['100%'], []);

    const handleSubmit = () => {
      if (bookName.trim() && !errorMessage) {
        onSubmit(bookName.trim());
        setIsEdited(false);
        Keyboard.dismiss();

        // 이후 로직 구현
      }
    };

    const handleClear = () => {
      setBookName('');
      setErrorMessage('');
    };

    const handleDismiss = () => {
      Keyboard.dismiss();
      setBookName('');
      setIsEdited(true);
      setErrorMessage('');
      setSelectedCover('default');
    };

    const handleBackdropPress = () => {
      // 키보드 먼저 닫기
      Keyboard.dismiss();

      // 약간의 딜레이 후 바텀시트 닫기
      setTimeout(() => {
        // @ts-ignore
        ref?.current?.dismiss();
      }, 100);
    };

    const handleComplete = () => {
      // TODO: 픽셀북 생성 완료 로직
      console.log('픽셀북 생성 완료:', { bookName, selectedCover });
      // @ts-ignore
      ref?.current?.dismiss();
    };

    const handleSelectedCover = () => {
      setSelectedCover('photo');
      navigation.navigate('SelectMainPhoto');
    };

    const renderBackdrop = (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        style={[props.style, { backgroundColor: '#111114' }]}
        onPress={handleBackdropPress}
      />
    );

    // 확인 버튼 활성화 조건: 입력값이 있고, 에러가 없고, 공백만 있지 않을 때
    const isButtonEnabled = bookName.trim().length > 0 && !errorMessage;

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        enableContentPanningGesture={false}
        enableHandlePanningGesture={false}
        backgroundStyle={{ backgroundColor: '#FFFFFF' }}
        handleIndicatorStyle={bottomSheetIndicator}
        backdropComponent={renderBackdrop}
        onDismiss={handleDismiss}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize">
        <BottomSheetView>
          <View className="flex h-[565px] px-4">
            {/* 제목 */}
            <Text className="mb-2 text-center text-gray-900 title-01">
              픽셀북 추가
            </Text>

            {/* 입력 필드 */}
            <PicselBookInput
              value={bookName}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              onChangeText={setBookName}
              onClear={handleClear}
              isEdited={isEdited}
              setIsEdited={setIsEdited}
              maxLength={10}
            />

            {/* 버튼 영역 */}
            {isEdited && (
              <Button
                className="mt-2 w-full"
                text="확인"
                color="active"
                textColor="white"
                onPress={handleSubmit}
                disabled={!isButtonEnabled}
              />
            )}

            {/* 입력 이후 -> 커버사진 설정 */}
            {!isEdited && (
              <>
                <View className="flex flex-col self-stretch pb-4 pt-10">
                  <Text className="pb-6 text-gray-900 headline-02">
                    커버사진 설정
                  </Text>

                  <View className="flex flex-row items-center justify-between self-stretch px-4">
                    <Pressable
                      onPress={() => setSelectedCover('default')}
                      className="flex flex-col items-center space-y-2 self-stretch px-6 py-2">
                      <PicselBookIcons height={72} width={80} shape="default" />
                      <Text className="pb-4 text-gray-900 body-rg-02">
                        기본
                      </Text>
                      <CheckRoundIcons
                        shape={selectedCover === 'default' ? 'pink' : 'default'}
                        height={24}
                        width={24}
                      />
                    </Pressable>

                    <Pressable
                      onPress={handleSelectedCover}
                      className={cn(
                        selectedCover === 'photo' && 'opacity-40',
                        'flex flex-col items-center space-y-2 self-stretch px-6 py-2',
                      )}>
                      <PicselBookIcons
                        height={72}
                        width={80}
                        shape="cover-selected"
                      />
                      <Text className="pb-4 text-gray-900 body-rg-02">
                        사진 지정
                      </Text>
                      <CheckRoundIcons
                        shape={selectedCover === 'photo' ? 'pink' : 'default'}
                        height={24}
                        width={24}
                      />
                    </Pressable>
                  </View>
                </View>

                {/* 완료 */}
                <View className="flex items-end self-stretch px-4 py-3 pt-10">
                  <Pressable onPress={handleComplete}>
                    <Text className="px-2 py-2 text-primary-pink headline-02">
                      완료
                    </Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

PicselBookBottomSheet.displayName = 'PicselBookBottomSheet';

export default PicselBookBottomSheet;

import React, { forwardRef, useEffect, useMemo, useState } from 'react';

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { Keyboard, Pressable, Text, View } from 'react-native';

import PicselBookInput from '../../atoms/PicselBookInput';

import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import CheckRoundIcons from '@/shared/icons/CheckRound';
import PicselBookIcons from '@/shared/icons/PicselBookIcons';
import { cn } from '@/shared/lib/cn';
import {
  bottomSheetBackdrop,
  bottomSheetBackground,
} from '@/shared/styles/bottomSheetConfig';
import { bottomSheetIndicator } from '@/shared/styles/bottomSheetIndicator';
import Button from '@/shared/ui/atoms/Button';

type BottomSheetMode = 'create' | 'editName' | 'editCover';

interface Props {
  onSubmit: (bookName: string, coverType: CoverType) => void;
  initialBookName?: string;
  mode?: BottomSheetMode;
  picselbookId?: string;
  coverPhotoUri?: string | null;
}

export type CoverType = 'default' | 'photo';

const TITLE_MAP: Record<BottomSheetMode, string> = {
  create: '픽셀북 추가',
  editName: '픽셀북 이름 편집',
  editCover: '커버사진 편집',
};

/**
 * 픽셀북 생성/수정 바텀시트
 * - create: 이름 입력 → 커버 설정 → 완료
 * - editName: 이름 입력 → 확인 (커버 단계 생략)
 * - editCover: 커버 설정만 표시 (이름 입력 생략)
 */
const PicselBookBottomSheet = forwardRef<BottomSheetModal, Props>(
  (
    {
      onSubmit,
      initialBookName = '',
      mode = 'create',
      picselbookId,
      coverPhotoUri,
    },
    ref,
  ) => {
    const navigation = useNavigation<RootStackNavigationProp>();
    const isEditCoverMode = mode === 'editCover';
    const isEditNameMode = mode === 'editName';

    const [bookName, setBookName] = useState(initialBookName);
    const [errorMessage, setErrorMessage] = useState('');
    const [isEdited, setIsEdited] = useState(!isEditCoverMode);
    const [selectedCover, setSelectedCover] = useState<CoverType>('default');
    const snapPoints = useMemo(
      () => [isEditCoverMode ? '50%' : '100%'],
      [isEditCoverMode],
    );

    useEffect(() => {
      if (initialBookName) {
        setBookName(initialBookName);
        if (mode === 'create') {
          setIsEdited(false);
          setSelectedCover('photo');
        }
      }
    }, [initialBookName, mode]);

    // 커버 편집 모드: 사진 선택 후 돌아왔을 때 사진 지정 체크
    useEffect(() => {
      if (isEditCoverMode && coverPhotoUri) {
        setSelectedCover('photo');
      }
    }, [isEditCoverMode, coverPhotoUri]);

    const handleNextStep = () => {
      if (bookName.trim() && !errorMessage) {
        if (isEditNameMode) {
          Keyboard.dismiss();
          onSubmit(bookName.trim(), 'default');
          dismiss();

          return;
        }
        setIsEdited(false);
        Keyboard.dismiss();
      }
    };

    const handleClear = () => {
      setBookName('');
      setErrorMessage('');
    };

    const handleDismiss = () => {
      Keyboard.dismiss();
      setBookName('');
      setIsEdited(!isEditCoverMode);
      setErrorMessage('');
      setSelectedCover('default');
    };

    const dismiss = () => {
      if (ref && 'current' in ref) {
        ref.current?.dismiss();
      }
    };

    const handleBackdropPress = () => {
      Keyboard.dismiss();
      setTimeout(dismiss, 100);
    };

    const handleComplete = () => {
      onSubmit(bookName.trim(), selectedCover);
      dismiss();
    };

    const navigateToSelectCover = () => {
      navigation.navigate('SelectBookCover', {
        variant: 'cover',
        bookName: isEditCoverMode ? '' : bookName,
        ...(picselbookId && { picselbookId }),
      });
      dismiss();
    };

    const handleReselect = () => {
      navigateToSelectCover();
    };

    const handleSelectedCover = () => {
      setSelectedCover('photo');
      navigateToSelectCover();
    };

    const renderBackdrop = (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={bottomSheetBackdrop.opacity}
        style={[props.style, { backgroundColor: bottomSheetBackdrop.color }]}
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
        backgroundStyle={bottomSheetBackground}
        handleIndicatorStyle={bottomSheetIndicator}
        backdropComponent={renderBackdrop}
        onDismiss={handleDismiss}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize">
        <BottomSheetView>
          <View className={cn('flex px-4', !isEditCoverMode && 'h-[565px]')}>
            {/* 제목 */}
            <Text className="mb-2 text-center text-gray-900 title-01">
              {TITLE_MAP[mode]}
            </Text>

            {/* 입력 필드 (editCover 모드에서는 숨김) */}
            {!isEditCoverMode && (
              <>
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
                    onPress={handleNextStep}
                    disabled={!isButtonEnabled}
                  />
                )}
              </>
            )}

            {/* 커버사진 설정 */}
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
                      onPress={
                        isEditCoverMode && coverPhotoUri
                          ? undefined
                          : handleSelectedCover
                      }
                      className={cn(
                        selectedCover === 'photo' && 'opacity-40',
                        'flex flex-col items-center space-y-2 self-stretch px-6 py-2',
                      )}>
                      <PicselBookIcons
                        height={72}
                        width={80}
                        shape="cover-selected"
                        imageUri={
                          isEditCoverMode && coverPhotoUri
                            ? coverPhotoUri
                            : undefined
                        }
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

                {/* 하단 버튼 */}
                {isEditCoverMode ? (
                  <View className="flex flex-row items-center justify-between self-stretch px-4 py-3 pt-10">
                    <Pressable onPress={handleReselect}>
                      <Text className="px-2 py-2 text-primary-pink headline-02">
                        다시 선택
                      </Text>
                    </Pressable>
                    <Pressable onPress={handleComplete}>
                      <Text className="px-2 py-2 text-primary-pink headline-02">
                        완료
                      </Text>
                    </Pressable>
                  </View>
                ) : (
                  <View className="flex items-end self-stretch px-4 py-3 pt-10">
                    <Pressable onPress={handleComplete}>
                      <Text className="px-2 py-2 text-primary-pink headline-02">
                        완료
                      </Text>
                    </Pressable>
                  </View>
                )}
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

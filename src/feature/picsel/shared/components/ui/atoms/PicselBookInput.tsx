import React, { useRef, useEffect, Dispatch, SetStateAction } from 'react';

import { TextInput, Pressable, View, Text } from 'react-native';

import { NICKNAME_INPUT } from '@/shared/constants/styles/nicknameInput';
import CloseIcons from '@/shared/icons/CloseIcons';
import SemanticIcons from '@/shared/icons/SemanticIcons';
import { cn } from '@/shared/lib/cn';

interface Props {
  value: string;
  onChangeText: (value: string) => void;
  onClear: () => void;
  isEdited: boolean;
  setIsEdited: Dispatch<SetStateAction<boolean>>;
  maxLength?: number;
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
}

const PicselBookInput = ({
  value,
  onChangeText,
  onClear,
  isEdited,
  setIsEdited,
  errorMessage,
  setErrorMessage,
  maxLength = 10,
}: Props) => {
  const [localValue, setLocalValue] = React.useState(value);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const validateInput = (text: string) => {
    // 공백만 입력된 경우
    if (text.length > 0 && text.trim().length === 0) {
      setErrorMessage('공백만 입력하는건 불가능해요');
      return;
    }

    // 특수문자 검증: 한글, 영문, 숫자, - . _ ~ 만 허용
    const specialCharRegex = /^[가-힣a-zA-Z0-9\-._~\s]*$/;

    if (!specialCharRegex.test(text)) {
      setErrorMessage('특수문자는 - . _ ~ 만 가능해요');
      return;
    }

    setErrorMessage('');
  };

  const handleChangeText = (text: string) => {
    setLocalValue(text);
    onChangeText(text);
    validateInput(text);
  };

  return (
    <View className="relative">
      <Text className="mb-2.5 text-gray-900 headline-02">픽셀북 이름</Text>

      <TextInput
        ref={inputRef}
        className={cn(
          !isEdited
            ? 'border-gray-300 text-gray-300'
            : 'border-pink-500 text-gray-900',
          errorMessage && 'border-semantic-error',
          NICKNAME_INPUT,
        )}
        selectionColor="#FF6C9A"
        maxLength={maxLength}
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={isEdited}
        onFocus={() => setIsEdited(true)}
        onChangeText={handleChangeText}
        value={localValue}
        returnKeyType="default"
        submitBehavior="submit"
        keyboardType="default"
      />

      {/* 우측 Clear 버튼 - 세로 중앙 정렬 */}
      {value.length > 0 && isEdited && (
        <Pressable className="absolute right-5 top-[50px]" onPress={onClear}>
          <CloseIcons shape="gray" width={24} height={24} />
        </Pressable>
      )}

      {/* 에러 메시지 및 글자 수 - 고정 높이 */}
      <View className="mx-2 mt-2 h-[24px] flex-row items-center justify-between">
        <View className="flex-row items-center">
          {errorMessage && (
            <>
              <SemanticIcons shape="pink" width={24} height={24} />
              <Text className="ml-1 text-gray-600 body-rg-02">
                {errorMessage}
              </Text>
            </>
          )}
        </View>
        <Text
          className={cn(
            !isEdited ? 'text-gray-300' : 'text-gray-600',
            'body-rg-02',
          )}>
          ({value.length}/{maxLength})
        </Text>
      </View>
    </View>
  );
};

export default PicselBookInput;

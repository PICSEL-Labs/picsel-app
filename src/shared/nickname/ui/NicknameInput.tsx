import React from 'react';

import { TextInput, Pressable, View } from 'react-native';

import { NICKNAME_INPUT } from '@/shared/constants/styles/nicknameInput';
import CloseIcons from '@/shared/icons/CloseIcons';
import { cn } from '@/shared/lib/cn';

interface Props {
  userNickname: string;
  handleChange: (value: string) => void;
  setFocus: (value: React.SetStateAction<boolean>) => void;
  handleBlur: () => void;
  handleClear: () => void;
  errorMessage: string;
  children?: React.ReactNode;
}

const NicknameInput = ({
  userNickname,
  handleChange,
  setFocus,
  handleBlur,
  handleClear,
  errorMessage,
  children,
}: Props) => {
  return (
    <View className="relative mx-4">
      <TextInput
        className={cn(
          userNickname.length > 0 ? 'border-pink-500' : 'border-gray-300',
          errorMessage && 'border-semantic-error',
          NICKNAME_INPUT,
        )}
        placeholder="닉네임을 입력해주세요"
        placeholderTextColor="#E5E6E9"
        selectionColor="#FF6C9A"
        maxLength={12}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={handleChange}
        onFocus={() => setFocus(true)}
        onBlur={handleBlur}
        value={userNickname}
      />

      {userNickname.length > 0 && (
        <Pressable className="absolute right-5 top-4" onPress={handleClear}>
          <CloseIcons shape="gray" width={24} height={24} />
        </Pressable>
      )}

      {children}
    </View>
  );
};

export default NicknameInput;

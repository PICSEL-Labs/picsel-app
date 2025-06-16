import React, { useEffect, useRef, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import {
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Animated,
  Text,
  Pressable,
  View,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import TermsModal from '../modal';

import BackIcon from '@/assets/icons/arrow/left-arrow.svg';
import CheckIcon from '@/assets/icons/checked.svg';
import CloseIcon from '@/assets/icons/close/icon-close.svg';
import FailedIcon from '@/assets/icons/nickname-failed.svg';
import { signupApi } from '@/feature/auth/signup/api/signupApi';
import { validateUserInfoApi } from '@/feature/auth/signup/api/validateApi';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { useUserStore } from '@/shared/store';
import { SignupNavigationProp } from '@/shared/types/navigateTypeUtil';
import { validateFormat } from '@/shared/utils/validators/validateNickname';

const NicknameInputScreen = () => {
  const [userNickname, setUserNickname] = useState('');
  const [focus, setFocus] = useState(false);
  const [keyboardHeight] = useState(new Animated.Value(0));
  const [buttonWidth] = useState(new Animated.Value(330));
  const navigation = useNavigation<SignupNavigationProp>();
  const { userSocialType, socialAccessToken } = useUserStore();
  const insets = useSafeAreaInsets();

  const [errorMessage, setErrorMessage] = useState('');
  const [isValidFormat, setIsValidFormat] = useState(false);
  const [isAvailable, setIsAvailable] = useState<null | boolean>(null);
  const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [checkedStates, setCheckedStates] = useState(Array(5).fill(false));

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener('keyboardWillShow', e => {
      Animated.timing(keyboardHeight, {
        toValue: e.endCoordinates.height,
        duration: 450,
        useNativeDriver: false,
      }).start();
    });

    const keyboardWillHide = Keyboard.addListener('keyboardWillHide', () => {
      Animated.timing(keyboardHeight, {
        toValue: 0,
        duration: 750,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(buttonWidth, {
      toValue: 330,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [focus]);

  const handleSignup = async () => {
    try {
      const response = await signupApi({
        socialAccessToken,
        socialType: userSocialType,
        userNickname,
        userAgreementConsentRequestDto: {
          ageConsent: checkedStates[0],
          termsOfService: checkedStates[1],
          privacyPolicy: checkedStates[2],
          locationConsent: checkedStates[3],
          marketingConsent: checkedStates[4],
        },
      });

      console.log(checkedStates);
      console.log(response);
      setIsTermsOpen(false);

      navigation.navigate('SelectBrand');
    } catch (err) {
      console.log(err);
    }
  };

  const handleNicknameChange = (value: string) => {
    if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);

    setUserNickname(value);
    setIsAvailable(null);
    setErrorMessage('');

    const error = validateFormat(value);
    if (error) {
      setErrorMessage(error);
      setIsValidFormat(false);
      return;
    }

    setIsValidFormat(true);
  };

  const handleBlur = () => {
    setFocus(false);

    if (!isValidFormat) return;

    blurTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await validateUserInfoApi(userNickname);
        if (res.code === 14001) {
          setIsAvailable(false);
          setErrorMessage('이미 사용 중인 닉네임이에요');
        } else {
          setIsAvailable(true);
          setErrorMessage('');
        }
      } catch (err) {
        setIsAvailable(false);
        setErrorMessage('서버 오류가 발생했어요');
      }
    }, 500);
  };

  const handleClear = () => {
    setErrorMessage('');
    setUserNickname('');
    setIsAvailable(false);
  };

  return (
    <ScreenLayout className="flex-1 bg-white w-full h-full">
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        className="flex-1">
        <View className="flex-1 p-2 mx-3">
          {/* Header h 수정 */}
          <View className="flex-row items-center h-12">
            <View className="w-12">
              <BackIcon />
            </View>
            <View className="flex-1 items-center">
              <Text className="text-black font-semibold text-[20px] text-center">
                회원가입
              </Text>
            </View>
            <View className="w-12" />
          </View>

          {/* Input Area */}
          <View className="items-start mt-10">
            {/* <HighlightedText  text={TEXT} /> */}
            <Text className="text-center text-[24px] font-semibold leading-9">
              닉네임을 입력해주세요
            </Text>
            <Text className="text-[#3B3E46] text-[16px] font-normal mt-2">
              2-12자 이내로 작성해주세요
            </Text>
          </View>
          <View>
            <TextInput
              className="w-full border h-[56px] border-[#FF6C9A] rounded-2xl text-[#111114] text-[16px] font-normal pl-5 mt-5"
              placeholder="닉네임을 입력해주세요"
              placeholderTextColor="#B2B5BD"
              maxLength={12}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={handleNicknameChange}
              onFocus={() => setFocus(true)}
              onBlur={handleBlur}
              value={userNickname}
            />
            {userNickname.length > 0 && (
              <Pressable
                className="absolute right-5 top-1/2 -translate-y-1/2"
                onPress={handleClear}>
                <CloseIcon />
              </Pressable>
            )}
          </View>

          {/* input 하단 텍스트 */}
          <View className="flex-row mx-2 items-center justify-between">
            <View className="flex-row items-center mt-3">
              {isAvailable === true ? (
                <>
                  <CheckIcon />
                  <Text className="text-[#000000] text-[16px] font-normal ml-3">
                    사용할 수 있는 닉네임이에요
                  </Text>
                </>
              ) : errorMessage ? (
                <>
                  <FailedIcon />
                  <Text className="text-[#FF6C6C] text-[16px] font-normal ml-3">
                    {errorMessage}
                  </Text>
                </>
              ) : null}
            </View>
            <View className="top-3 absolute right-0">
              <Text className="text-[#B2B5BD] text-[16px] font-normal">
                ({userNickname.length}/12)
              </Text>
            </View>
          </View>
        </View>

        {/* 버튼 (Animated 하단 위치) */}
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: Animated.subtract(keyboardHeight, insets.bottom),
            alignItems: 'center',
          }}>
          <Animated.View
            style={{
              width: buttonWidth,
              height: 56,
              backgroundColor: isAvailable || focus ? '#FF6C9A' : '#E5E6E9',
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: focus ? 0 : 40,
            }}>
            <Pressable
              onPress={
                focus ? () => Keyboard.dismiss() : () => setIsTermsOpen(true)
              }
              disabled={focus ? false : !isAvailable}>
              <Text className="text-white text-[20px] font-bold">
                {focus ? '확인' : '다음'}
              </Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </KeyboardAvoidingView>

      <TermsModal
        checkedStates={checkedStates}
        setCheckedStates={setCheckedStates}
        handleSignup={handleSignup}
        visible={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        title="이용약관에 동의해주세요"
      />
    </ScreenLayout>
  );
};

export default NicknameInputScreen;

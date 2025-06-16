import React, { Dispatch, SetStateAction, useEffect } from 'react';

import {
  Modal,
  View,
  Text,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';

import RightArrow from '@/assets/icons/arrow/right-arrow.svg';
import CheckedOff from '@/assets/icons/checkbox/checked-off.svg';
import CheckedOn from '@/assets/icons/checkbox/checked-on.svg';
import { TERMS_TEXT } from '@/shared/constants/termsTitleList';
import { cn } from '@/shared/lib/cn';

interface Props {
  checkedStates: boolean[];
  setCheckedStates: Dispatch<SetStateAction<boolean[]>>;
  visible: boolean;
  onClose: () => void;
  title: string;
  handleSignup: () => void;
}

const TermsModal = ({
  checkedStates,
  setCheckedStates,
  visible,
  onClose,
  title,
  handleSignup,
}: Props) => {
  const isRequiredAllChecked = checkedStates.slice(0, 4).every(Boolean);

  const allChecked = checkedStates.every(Boolean);

  const translateY = useSharedValue(0);

  const toggleAll = () => {
    const newState = !allChecked;
    setCheckedStates(new Array(5).fill(newState));
  };

  const toggleItem = (index: number) => {
    const newStates = [...checkedStates];
    newStates[index] = !newStates[index];
    setCheckedStates(newStates);
  };

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      // 상단 50px은 무시
      if (event.y < 50) return;

      translateY.value = event.translationY;
    })
    .onEnd(event => {
      if (event.translationY > 200) {
        runOnJS(onClose)();
      } else {
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    if (visible) {
      // 1. 체크박스 초기화
      setCheckedStates([false, false, false, false, false]);

      // 2. translateY 위치 초기화
      translateY.value = 0;
    }
  }, [visible]);

  console.log(checkedStates, allChecked);
  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/30" />
      </TouchableWithoutFeedback>

      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={animatedStyle}
          className="absolute bottom-0 w-full bg-white rounded-t-2xl px-5 pt-3 pb-8 max-h-[80%]">
          <View className="w-10 h-1.5 bg-gray-300 rounded-full self-center mb-12" />

          <Text className="text-[16px] font-semibold text-[#3B3E46] mb-6">
            {title}
          </Text>

          {/* 전체동의 */}
          <Pressable
            className="flex-row items-center mb-3 border-b-2 border-b-[#E5E6E9] pb-5"
            onPress={toggleAll}>
            {allChecked ? <CheckedOn /> : <CheckedOff />}
            <Text className="ml-2 text-[#111114] font-bold text-[16px]">
              전체동의
            </Text>
          </Pressable>

          {/* 개별 항목 */}
          <View className="gap-3">
            {TERMS_TEXT.map((label, index) => (
              <View
                key={index}
                className="flex-row items-center mb-2 space-x-3">
                <Pressable onPress={() => toggleItem(index)}>
                  {checkedStates[index] ? <CheckedOn /> : <CheckedOff />}
                </Pressable>
                <Text className="ml-2 text-[#3B3E46] text-[16px] font-semibold">
                  {index < 4 ? '(필수)' : '(선택)'}
                </Text>
                <Text className="ml-1 text-[#3B3E46] text-[16px] font-normal">
                  {label}
                </Text>
                {/* notion으로 linking */}
                <RightArrow className="absolute right-1" />
              </View>
            ))}
          </View>

          <Pressable
            disabled={!isRequiredAllChecked}
            className={cn(
              isRequiredAllChecked ? 'bg-[#FF6C9A]' : 'bg-[#E5E6E9]',
              'w-[320px] h-[56px] mt-5 rounded-[40px] justify-center items-center self-center',
            )}
            onPress={handleSignup}>
            <Text className="text-white text-[20px] font-bold">완료</Text>
          </Pressable>
        </Animated.View>
      </GestureDetector>
    </Modal>
  );
};

export default TermsModal;

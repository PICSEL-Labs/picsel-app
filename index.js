/**
 * @format
 */

import { initializeKakaoSDK } from '@react-native-kakao/core';
import { AppRegistry } from 'react-native';
import Config from 'react-native-config';

import App from './App';
import { name as appName } from './app.json';

// 카카오 SDK 초기화
// 항상 모든 카카오 API가 불리기 전에 이 함수가 먼저 호출되어야 합니다.
initializeKakaoSDK(Config.KAKAO_APP_KEY);

AppRegistry.registerComponent(appName, () => App);

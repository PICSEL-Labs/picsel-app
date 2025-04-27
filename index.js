/**
 * @format
 */

import { initializeKakaoSDK } from '@react-native-kakao/core';
import { AppRegistry } from 'react-native';

import App from './App';
import { name as appName } from './app.json';

// 항상 모든 카카오 API가 불리기 전에 이 함수가 먼저 호출되어야 합니다.
// 카카오 SDK 초기화
initializeKakaoSDK('52a96882f6fb7b5a1ba4ae4cd27788c2');

AppRegistry.registerComponent(appName, () => App);

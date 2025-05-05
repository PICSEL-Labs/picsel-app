/**
 * @format
 */

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { initializeKakaoSDK } from '@react-native-kakao/core';
import NaverLogin from '@react-native-seoul/naver-login';
import { AppRegistry } from 'react-native';
import Config from 'react-native-config';

import App from './App';
import { name as appName } from './app.json';

// 카카오 SDK 초기화
// 항상 모든 API가 불리기 전에 이 함수가 먼저 호출되어야 합니다.
initializeKakaoSDK(Config.KAKAO_APP_KEY);

// 네이버 SDK 초기화
NaverLogin.initialize({
  appName: Config.NAVER_APP_NAME,
  consumerKey: Config.NAVER_CLIENT_ID,
  consumerSecret: Config.NAVER_CLIENT_SECRET,
  serviceUrlSchemeIOS: Config.NAVER_SERVICE_SCHEME_IOS,
  disableNaverAppAuthIOS: true,
});

// 구글 SDK 초기화
GoogleSignin.configure({
  webClientId: Config.GOOGLE_WEB_CLIENT_ID,
  iosClientId: Config.GOOGLE_CLIENT_ID,
});

AppRegistry.registerComponent(appName, () => App);

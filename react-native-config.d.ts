declare module 'react-native-config' {
  export interface NativeConfig {
    // 카카오
    KAKAO_APP_KEY: string;
    KAKAO_SCHEME_KEY: string;

    // 네이버
    NAVER_CLIENT_ID: string;
    NAVER_CLIENT_SECRET: string;
    NAVER_APP_NAME: string;
    NAVER_SERVICE_SCHEME_IOS: string;
    // 네이버 지도
    NAVER_MAP_CLIENT_ID: string;

    // 구글
    GOOGLE_CLIENT_ID: string;
    GOOGLE_SERVICE_SCHEME_IOS: string;
    GOOGLE_WEB_CLIENT_ID: string;

    // API
    API_KEY: string;
  }

  export const Config: NativeConfig;
  export default Config;
}

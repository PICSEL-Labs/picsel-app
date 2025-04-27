declare module 'react-native-config' {
  export interface NativeConfig {
    KAKAO_APP_KEY: string;
    KAKAO_SCHEME_KEY: string;
  }

  export const Config: NativeConfig;
  export default Config;
}

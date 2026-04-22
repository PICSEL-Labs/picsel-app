import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const googleLogin = async (): Promise<string> => {
  await GoogleSignin.hasPlayServices();
  const response = await GoogleSignin.signIn();
  return response.data.idToken;
};

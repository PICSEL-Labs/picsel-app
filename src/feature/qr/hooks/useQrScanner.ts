import { useRef } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useCodeScanner } from 'react-native-vision-camera';

import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';

export const useQrScanner = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const scannedRef = useRef(false);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: async codes => {
      const url = codes?.[0]?.value;
      if (!url || scannedRef.current) {
        return;
      }

      scannedRef.current = true;

      navigation.navigate('QrViewer', { url });
    },
  });

  const resetScan = () => {
    scannedRef.current = false;
  };

  return { codeScanner, resetScan };
};

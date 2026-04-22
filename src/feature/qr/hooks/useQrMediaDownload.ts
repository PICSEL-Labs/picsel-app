import { useCallback } from 'react';

import type { WebViewMessageEvent } from 'react-native-webview';

import { QR_DOWNLOAD_TOAST, QR_TOAST_MARGIN } from '../constants/qrDownload';
import { QR_DOWNLOAD_INJECTED_SCRIPT } from '../utils/qrDownloadInjectedScript';
import { savePhotoFromBase64 } from '../utils/savePhotoFromBase64';

import { requestPhotoPermissionWithModal } from '@/shared/lib/photoPermission';
import { useToastStore } from '@/shared/store/ui/toast';

interface QrCompleteMessage {
  type: 'qr-download:complete';
  base64: string;
  mimeType?: string;
  filename?: string;
}

type QrDownloadMessage =
  | QrCompleteMessage
  | { type: 'qr-download:error'; message?: string }
  | { type: 'qr-download:debug'; [key: string]: unknown };

/**
 * QR 뷰어 WebView에 다운로드 브리지 스크립트를 주입하고,
 * 스크립트가 보낸 base64 이미지를 받아 앨범에 저장하는 Hook
 *
 * WebView 안에서 실행되는 브리지 스크립트가 벤더별 다운로드 방식을 가로채
 * base64로 변환해 postMessage로 보내주면, 권한 확인 후 카메라 롤에 저장하고
 * 성공/실패 토스트로 사용자에게 피드백을 준다.
 *
 * @returns WebView에 바로 꽂을 수 있는 두 값
 * - `injectedJavaScript`: 페이지 로드 시 실행될 Bridge 스크립트 문자열
 * - `onMessage`: 스크립트가 보낸 메시지를 처리할 핸들러
 *
 * @example
 * const { injectedJavaScript, onMessage } = useQrMediaDownload();
 *
 * <WebView
 *   source={{ uri: qrUrl }}
 *   injectedJavaScript={injectedJavaScript}
 *   onMessage={onMessage}
 * />
 */
export const useQrMediaDownload = () => {
  const { showToast } = useToastStore();

  const handleComplete = useCallback(
    async (message: QrCompleteMessage) => {
      const hasPermission = await requestPhotoPermissionWithModal();
      if (!hasPermission) {
        return;
      }

      try {
        await savePhotoFromBase64(message.base64, message.mimeType || '');
        showToast(QR_DOWNLOAD_TOAST.SUCCESS, QR_TOAST_MARGIN);
      } catch {
        showToast(QR_DOWNLOAD_TOAST.FAILURE, QR_TOAST_MARGIN);
      }
    },
    [showToast],
  );

  const onMessage = useCallback(
    async (event: WebViewMessageEvent) => {
      let parsed: QrDownloadMessage;
      try {
        parsed = JSON.parse(event.nativeEvent.data);
      } catch {
        return;
      }

      switch (parsed?.type) {
        case 'qr-download:debug':
          return;

        case 'qr-download:error':
          showToast(QR_DOWNLOAD_TOAST.FAILURE, QR_TOAST_MARGIN);
          return;

        case 'qr-download:complete':
          await handleComplete(parsed);
          return;

        default:
          return;
      }
    },
    [handleComplete, showToast],
  );

  return { injectedJavaScript: QR_DOWNLOAD_INJECTED_SCRIPT, onMessage };
};

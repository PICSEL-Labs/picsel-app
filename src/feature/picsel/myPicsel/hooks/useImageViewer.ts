import { useCallback, useMemo, useState } from 'react';

type ImageSource = { uri: string };

interface Options {
  clearOnClose?: boolean;
}

export const useImageViewer = (options: Options = {}) => {
  const { clearOnClose = true } = options;

  const [visible, setVisible] = useState(false);
  const [uri, setUri] = useState<string>('');

  const open = useCallback((nextUri: string) => {
    setUri(nextUri);
    setVisible(true);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    if (clearOnClose) {
      setUri('');
    }
  }, [clearOnClose]);

  const images = useMemo<ImageSource[]>(() => {
    return uri ? [{ uri }] : [];
  }, [uri]);

  return {
    visible,
    uri,
    images,
    open,
    close,
    setVisible,
    setUri,
  };
};

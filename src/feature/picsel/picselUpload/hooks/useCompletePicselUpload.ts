import { useNavigation } from '@react-navigation/native';

import { useAddPicselToPicselBook } from '../mutations/useAddPicselToPicselBook';
import { useCreatePicselDraft } from '../mutations/useCreatePicselDraft';

import { usePicselUploadStore } from './usePicselUploadStore';

import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import { usePhotoStore } from '@/shared/store/picselUpload';

type Params = {
  title: string;
  content: string;
};

export const useCompletePicselUpload = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const {
    takenDate,
    storeId,
    picselbookId,
    bookName,
    setRecord,
    getImagePaths,
    resetUploadData,
  } = usePicselUploadStore();

  const { reset: resetPhotoStore } = usePhotoStore();

  const { mutate: uploadPicsel, isPending } = useAddPicselToPicselBook();
  const { mutateAsync: createDraft } = useCreatePicselDraft();

  const complete = async ({ title, content }: Params) => {
    const draftUuid = await createDraft(picselbookId);

    const requestPayload = {
      picselId: draftUuid,
      picselbookId,
      storeId,
      takenDate,
      title,
      content,
      imagePaths: getImagePaths(),
    };

    uploadPicsel(requestPayload, {
      onSuccess: data => {
        navigation.reset({
          index: 1,
          routes: [
            {
              name: 'PicselBookFolder',
              params: { bookId: picselbookId, bookName },
            },
            {
              name: 'PicselDetail',
              params: {
                picselId: data.data.picselId,
                bookId: data.data.picselbookId,
              },
            },
          ],
        });

        setRecord(title, content);
        resetUploadData();
        resetPhotoStore();
      },
      onError: error => {
        console.log('픽셀 업로드 중 에러 발생:', error);
      },
    });
  };

  return {
    complete,
    isPending,
  };
};

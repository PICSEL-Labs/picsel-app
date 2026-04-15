import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';

import { useAddPicselToPicselBook } from '../mutations/useAddPicselToPicselBook';
import { useCreatePicselDraft } from '../mutations/useCreatePicselDraft';

import { usePicselUploadStore } from './usePicselUploadStore';

import { PlaceType } from '@/feature/picsel/shared/types';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import { usePhotoStore } from '@/shared/store/picselUpload';
import { useToastStore } from '@/shared/store/ui/toast';

type Params = {
  title: string;
  content: string;
};

export const useCompletePicselUpload = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const queryClient = useQueryClient();

  const {
    takenDate,
    placeId,
    placeType,
    picselbookId,
    bookName,
    setRecord,
    getImagePaths,
    resetUploadData,
  } = usePicselUploadStore();

  const { reset: resetPhotoStore } = usePhotoStore();
  const { showToast } = useToastStore();

  const { mutate: uploadPicsel, isPending } = useAddPicselToPicselBook();
  const { mutateAsync: createDraft } = useCreatePicselDraft();

  const complete = async ({ title, content }: Params) => {
    const draftUuid = await createDraft(picselbookId);

    const requestPayload = {
      picselId: draftUuid,
      picselbookId,
      placeType: placeType as PlaceType,
      placeId,
      takenDate,
      title,
      content,
      imagePaths: getImagePaths(),
    };

    uploadPicsel(requestPayload, {
      onSuccess: data => {
        queryClient.invalidateQueries({
          queryKey: ['picselBookPicsels', picselbookId],
        });
        queryClient.invalidateQueries({
          queryKey: ['myPicsels'],
        });
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
        console.error('픽셀 업로드 중 에러 발생:', error);
        showToast('업로드에 실패했어요😭 다시 시도해주세요', 60);
      },
    });
  };

  return {
    complete,
    isPending,
  };
};

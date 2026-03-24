import { useEffect, useState } from 'react';

import { NavigationProp } from '@react-navigation/native';

import {
  DELETE_ALERT,
  EDIT_ALERT,
  TOAST_MESSAGES,
} from '../constants/picselDetailTexts';
import { useDeletePicsels } from '../mutations/useDeletePicsels';
import { useEditPicsel } from '../mutations/useEditPicsel';
import { useGetPicselDetail } from '../queries/useGetPicselDetail';

import { useDateLocationForm } from '@/feature/picsel/shared/hooks/datePicker/useDateLocationForm';
import { MainNavigationProps } from '@/navigation';
import { showConfirmModal } from '@/shared/lib/confirmModal';
import { usePhotoStore } from '@/shared/store/picselUpload';
import { useToastStore } from '@/shared/store/ui/toast';
import { getImageUrl } from '@/shared/utils/image';

interface Props {
  picselId: string;
  navigation: NavigationProp<MainNavigationProps>;
}

export const usePicselEdit = ({ picselId, navigation }: Props) => {
  const { data: picselData } = useGetPicselDetail(picselId);

  const {
    mainPhoto,
    extraPhotos,
    setMainPhoto,
    setExtraPhotos,
    removeExtraPhoto,
    reset,
  } = usePhotoStore();

  useEffect(() => {
    if (!picselData) {
      return;
    }

    setMainPhoto(getImageUrl(picselData.representativeImagePath));
    setExtraPhotos(
      picselData.photos.slice(1).map(p => getImageUrl(p.imagePath)),
    );

    return () => {
      reset();
    };
  }, [picselData]);

  const [title, setTitle] = useState(picselData?.title ?? '');
  const [content, setContent] = useState(picselData?.content ?? '');

  useEffect(() => {
    if (!picselData) {
      return;
    }
    setTitle(picselData.title);
    setContent(picselData.content);
  }, [picselData]);

  const { state, actions, datePicker } = useDateLocationForm({
    initialDate: picselData?.takenDate,
    initialStoreId: picselData?.store.storeId,
    initialLocation: picselData?.store.storeName,
    onNext: (date, storeId) => {
      editPicsel(
        {
          picselId,
          request: {
            storeId,
            takenDate: date,
            title,
            content,
            imagePaths: [mainPhoto!, ...extraPhotos],
          },
        },
        {
          onSuccess: () => {
            showToast(TOAST_MESSAGES.EDIT_SUCCESS);
            navigation.goBack();
          },
        },
      );
    },
  });

  const { mutate: editPicsel } = useEditPicsel();
  const { mutate: deletePicsels } = useDeletePicsels();
  const { showToast } = useToastStore();

  const isFilled =
    state.isFilled && title.trim().length > 0 && content.trim().length > 0;

  const handleSelectMainPhoto = () => {
    navigation.navigate('SelectMainPhoto', { variant: 'main', from: 'edit' });
  };

  const handleAddExtraPhoto = () => {
    navigation.navigate('SelectExtraPhoto', { variant: 'extra', from: 'edit' });
  };

  const handleDelete = () => {
    showConfirmModal(
      DELETE_ALERT.DESCRIPTION,
      () => {
        deletePicsels(
          { picselIds: [picselId] },
          {
            onSuccess: () => {
              showToast(TOAST_MESSAGES.DELETE_SUCCESS);
              navigation.goBack();
            },
          },
        );
      },
      {
        title: DELETE_ALERT.TITLE,
        confirmText: DELETE_ALERT.CONFIRM,
        cancelText: DELETE_ALERT.CANCEL,
      },
    );
  };

  const handleClose = () => {
    showConfirmModal(
      EDIT_ALERT.DESCRIPTION,
      () => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      },
      {
        title: EDIT_ALERT.TITLE,
        confirmText: EDIT_ALERT.CONFIRM,
        cancelText: EDIT_ALERT.CANCEL,
      },
    );
  };

  return {
    picselData,

    mainPhoto,
    extraPhotos,
    setMainPhoto,
    removeExtraPhoto,

    title,
    content,
    setTitle,
    setContent,

    state,
    actions,
    datePicker,

    isFilled,

    handleSelectMainPhoto,
    handleAddExtraPhoto,
    handleDelete,
    handleClose,
  };
};

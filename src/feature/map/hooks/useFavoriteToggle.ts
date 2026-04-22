import { useToggleFavoriteBrand } from '@/feature/brand/mutations/useToggleFavoriteBrand';
import { useFavoriteStore } from '@/shared/store';
import { useToastStore } from '@/shared/store/ui/toast';

interface Props {
  brandId?: string;
  isFavorite: boolean;
}

export const useFavoriteToggle = ({ brandId, isFavorite }: Props) => {
  const {
    optimisticFavorites,
    toggleOptimisticFavorite,
    setOptimisticFavorite,
  } = useFavoriteStore();
  const { mutate: toggleFavorite, isPending } = useToggleFavoriteBrand();
  const { showToast } = useToastStore();

  const optimisticFavorite = brandId
    ? (optimisticFavorites[brandId] ?? isFavorite)
    : isFavorite;

  const handleToggleFavorite = (margin: number) => {
    if (!brandId) {
      return;
    }

    const action = optimisticFavorite ? 'REMOVE' : 'ADD';
    toggleOptimisticFavorite(brandId);

    showToast(
      action === 'ADD'
        ? '찜한 브랜드에 추가했어요'
        : '찜한 브랜드에서 삭제했어요',
      margin,
    );

    toggleFavorite(
      {
        brandId,
        action,
      },
      {
        onError: () => {
          setOptimisticFavorite(brandId, isFavorite);
          showToast('찜 처리 중 오류가 발생했어요', margin);
        },
      },
    );
  };

  return {
    optimisticFavorite,
    handleToggleFavorite,
    isPending,
  };
};

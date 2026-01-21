import { useFolderView } from './useFolderView';

interface UseYearFolderOptions {
  year: string;
}

export const useYearFolder = ({ year }: UseYearFolderOptions) => {
  return useFolderView({
    filterType: 'year',
    year,
  });
};

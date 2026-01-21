import { useFolderView } from './useFolderView';

interface UseMonthFolderOptions {
  year: string;
  month: string;
}

export const useMonthFolder = ({ year, month }: UseMonthFolderOptions) => {
  return useFolderView({
    filterType: 'month',
    year,
    month,
  });
};

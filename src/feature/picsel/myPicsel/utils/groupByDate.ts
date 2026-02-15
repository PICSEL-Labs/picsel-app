import { GroupPhoto, MyPicselItem, YearGroup } from '../types';

import { getMonthFromDate, getYearFromDate } from './dateUtils';

import { getImageUrl } from '@/shared/utils/image';

const toGroupPhoto = (item: MyPicselItem): GroupPhoto => ({
  id: item.picselId,
  uri: getImageUrl(item.imagePath),
  date: item.takenDate,
  storeName: item.storeName,
});

/**
 * 픽셀 데이터를 년/월별로 그룹핑
 * @param items - API에서 받은 픽셀 아이템 배열
 * @returns 년도별 그룹 배열 (최신순 정렬)
 */
export const groupByYearMonth = (items: MyPicselItem[]): YearGroup[] => {
  if (!items || items.length === 0) {
    return [];
  }

  // 년도 -> 월 -> 사진 배열 맵 생성
  const yearMap = new Map<string, Map<string, GroupPhoto[]>>();

  items.forEach(item => {
    const year = getYearFromDate(item.takenDate);
    const month = getMonthFromDate(item.takenDate);
    const photo = toGroupPhoto(item);

    if (!yearMap.has(year)) {
      yearMap.set(year, new Map());
    }

    const monthMap = yearMap.get(year)!;
    if (!monthMap.has(month)) {
      monthMap.set(month, []);
    }

    monthMap.get(month)!.push(photo);
  });

  // YearGroup 배열로 변환
  const yearGroups: YearGroup[] = [];

  yearMap.forEach((monthMap, year) => {
    const months = Array.from(monthMap.entries())
      .map(([month, photos]) => ({ month, photos }))
      .sort((a, b) => {
        // 월 숫자 추출하여 내림차순 정렬 (12월 -> 1월)
        const monthA = parseInt(a.month.replace('월', ''), 10);
        const monthB = parseInt(b.month.replace('월', ''), 10);
        return monthB - monthA;
      });

    yearGroups.push({ year, months });
  });

  // 년도 내림차순 정렬 (최신순)
  yearGroups.sort((a, b) => parseInt(b.year, 10) - parseInt(a.year, 10));

  return yearGroups;
};

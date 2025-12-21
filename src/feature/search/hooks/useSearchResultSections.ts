import { useMemo } from 'react';

import { AcAdministrativeDistrict, AcStation, AcStore } from '../types';

export type SearchResultView = {
  id: string;
  kind: 'station' | 'store' | 'administrativeDistrict';
  title: string;
  subtitle?: string;
  distanceMeters?: number;
  x: number;
  y: number;
};

const toMeters = (distance?: number) =>
  typeof distance === 'number' ? Math.round(distance * 1000) : undefined;

const stationView = (s: AcStation): SearchResultView => ({
  id: String(s.stationId ?? `${s.stationName}-${s.lineName}`),
  kind: 'station',
  title: `${s.stationName} ${s.lineName}`.trim(),
  subtitle: s.address,
  distanceMeters: toMeters(s.distance),
  x: s.x,
  y: s.y,
});

const storeView = (s: AcStore): SearchResultView => ({
  id: String(s.storeId),
  kind: 'store',
  title: s.storeName,
  subtitle: s.address,
  x: s.x,
  y: s.y,
  distanceMeters: toMeters(s.distance),
});

const administrativeDistrictView = (
  d: AcAdministrativeDistrict,
): SearchResultView => ({
  id: String(d.districtId),
  kind: 'administrativeDistrict',
  title: d.districtAddress,
  x: d.x,
  y: d.y,
});

export const useSearchResultSections = (data?: {
  stations?: AcStation[];
  stores?: AcStore[];
  administrativeDistricts?: AcAdministrativeDistrict[];
}) => {
  return useMemo(() => {
    if (!data) {
      return [];
    }

    const sections = [
      {
        title: '지하철역',
        data: data.stations?.map(stationView) ?? [],
      },
      {
        title: '매장',
        data: data.stores?.map(storeView) ?? [],
      },
      {
        title: '지역',
        data:
          data.administrativeDistricts?.map(administrativeDistrictView) ?? [],
      },
    ].filter(section => section.data.length > 0);

    return sections;
  }, [data]);
};

export const WEEK_DAYS = [
  { label: 'S', key: 'sun' },
  { label: 'M', key: 'mon' },
  { label: 'T', key: 'tue' },
  { label: 'W', key: 'wed' },
  { label: 'T', key: 'thu' },
  { label: 'F', key: 'fri' },
  { label: 'S', key: 'sat' },
] as const;

export const DAYS_PER_WEEK = 7;
export const TOTAL_CALENDAR_CELLS = 42;
export const CELL_WIDTH = `${100 / DAYS_PER_WEEK}%`;

export const DATE_STYLES = {
  SELECTED_BG: 'bg-pink-500',
  TODAY_BORDER: 'border border-pink-300',
  TEXT: {
    DEFAULT: 'text-gray-900',
    SELECTED: 'text-white headline-02',
    TODAY: 'text-pink-500',
    NOT_CURRENT_MONTH: 'text-gray-200',
  },
} as const;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './App.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'nanum-square-extra-bold': ['NanumSquareRoundEB'],
        'nanum-square-bold': ['NanumSquareRoundB'],
        'nanum-square-regular': ['NanumSquareRoundR'],
        'nanum-square-light': ['NanumSquareRoundL'],
        'nanum-square-ac-regular': ['NanumSquare_acR'],
      },
      colors: {
        pink: {
          100: '#F5F5F5',
          200: '#FEDEE8',
          300: '#FECDDD',
          400: '#FFB3CA',
          500: '#FF6C9A',
          600: '#FB437D',
          700: '#EA054D',
          800: '#750226',
          900: '#750226',
          dark: '#27010D',
        },
        gray: {
          50: '#F3F3F5',
          100: '#E5E6E9',
          200: '#CCCDD3',
          300: '#B2B5BD',
          400: '#989CA7',
          500: '#7E8392',
          600: '#676B79',
          700: '#515560',
          800: '#3B3E46',
          900: '#26272C',
        },
        blue: {
          100: '#E2F3FF',
          200: '#C5E7FF',
          300: '#A8DBFF',
          400: '#7DC9FF',
          500: '#46B2FF',
          600: '#0094FD',
          700: '#006BC3',
          800: '#004A7F',
          900: '#003154',
        },
        whiteAlpha: {
          5: '#FFFFFF0A',
          10: '#FFFFFF1A',
          20: '#FFFFFF33',
          30: '#FFFFFF4D',
          40: '#FFFFFF66',
          50: '#FFFFFF80',
          60: '#FFFFFF99',
          70: '#FFFFFFB2',
          80: '#FFFFFFCC',
          90: '#FFFFFFEB',
        },
        primary: {
          pink: '#FF6C9A',
          black: '#111114',
        },
        semantic: {
          error: '#F91E34',
          info: '#46B2FF',
          success: '#48BB78',
        },
        neutral: {
          white: '#FFFFFF',
          black: '#000000',
        },
        secondary: {
          pink: {
            300: '#FECDDD',
            700: '#EA054D',
          },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      // 기준 디바이스 크기 (iPhone X 기준)
      const baseWidth = 375;

      // 평균적인 디바이스 크기로 스케일링 계산
      const moderateScale = (size, factor = 0.3) => {
        // 일반적인 모바일 디바이스 범위: 320~428px
        const avgWidth = 375;
        const scale = avgWidth / baseWidth;
        return Math.round(size + (scale - 1) * factor * size);
      };

      const verticalScale = size => {
        // 세로 스케일은 보수적으로 적용
        return Math.round(size * 1.1);
      };

      const typoUtilities = {
        // Title
        '.title-05': {
          fontSize: moderateScale(24, 0.3),
          lineHeight: `${verticalScale(36)}px`,
          fontFamily: 'NanumSquareRoundEB',
        },
        '.title-03': {
          fontSize: moderateScale(22, 0.3),
          lineHeight: `${verticalScale(33)}px`,
          fontFamily: 'NanumSquareRoundEB',
        },
        '.title-02': {
          fontSize: moderateScale(20, 0.3),
          lineHeight: `${verticalScale(30)}px`,
          fontFamily: 'NanumSquareRoundEB',
        },
        '.title-01': {
          fontSize: moderateScale(18, 0.3),
          lineHeight: `${verticalScale(27)}px`,
          fontFamily: 'NanumSquareRoundEB',
        },

        // Headline
        '.headline-05': {
          fontSize: moderateScale(24, 0.3),
          lineHeight: `${verticalScale(36)}px`,
          fontFamily: 'NanumSquareRoundB',
        },
        '.headline-04': {
          fontSize: moderateScale(20, 0.3),
          lineHeight: `${verticalScale(30)}px`,
          fontFamily: 'NanumSquareRoundB',
        },
        '.headline-03': {
          fontSize: moderateScale(18, 0.3),
          lineHeight: `${verticalScale(27)}px`,
          fontFamily: 'NanumSquareRoundB',
        },
        '.headline-02': {
          fontSize: moderateScale(16, 0.3),
          lineHeight: `${verticalScale(24)}px`,
          fontFamily: 'NanumSquareRoundB',
        },
        '.headline-01': {
          fontSize: moderateScale(14, 0.3),
          lineHeight: `${verticalScale(21)}px`,
          fontFamily: 'NanumSquareRoundB',
        },

        // Body Regular
        '.body-rg-04': {
          fontSize: moderateScale(18, 0.3),
          lineHeight: `${verticalScale(27)}px`,
          fontFamily: 'NanumSquareRoundR',
        },
        '.body-rg-03': {
          fontSize: moderateScale(16, 0.3),
          lineHeight: `${verticalScale(24)}px`,
          fontFamily: 'NanumSquareRoundR',
        },
        '.body-rg-02': {
          fontSize: moderateScale(14, 0.3),
          lineHeight: `${verticalScale(21)}px`,
          fontFamily: 'NanumSquareRoundR',
        },
        '.body-rg-01': {
          fontSize: moderateScale(12, 0.3),
          lineHeight: `${verticalScale(18)}px`,
          fontFamily: 'NanumSquareRoundR',
        },

        // Body Light
        '.body-lt-03': {
          fontSize: moderateScale(16, 0.3),
          lineHeight: `${verticalScale(24)}px`,
          fontFamily: 'NanumSquareRoundL',
        },
        '.body-lt-02': {
          fontSize: moderateScale(14, 0.3),
          lineHeight: `${verticalScale(21)}px`,
          fontFamily: 'NanumSquareRoundL',
        },
        '.body-lt-01': {
          fontSize: moderateScale(12, 0.3),
          lineHeight: `${verticalScale(18)}px`,
          fontFamily: 'NanumSquareRoundL',
        },
      };
      addUtilities(typoUtilities);
    },
  ],
};

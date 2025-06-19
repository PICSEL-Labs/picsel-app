module.exports = {
  root: true,
  extends: ['@react-native-community'],
  plugins: ['import', 'react', 'react-hooks', 'jsx-a11y', 'unused-imports'],
  rules: {
    'import/no-relative-parent-imports': 'error', // 상위 폴더 접근 방지
    'react-native/no-inline-styles': 0, // inlined styles 허용(라이브러리 컴포넌트는 inlined styles 필요)
    // ✅ Import 순서 정리
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'], // external로 간주되어 alias 적용안되는 문제 해결
        alphabetize: {
          order: 'asc',
          caseInsensitive: true, // 대문자 우선
        },
        'newlines-between': 'always', // 그룹별 모두 한줄 띄우기
      },
    ],
    'unused-imports/no-unused-imports': 'warn', // 사용되지 않는 import 경고

    // ✅ React 관련 규칙
    'react-hooks/rules-of-hooks': 'error', // Hook 규칙 강제
    'react-hooks/exhaustive-deps': 'off', // 의존성 배열 검사 X
    'react/react-in-jsx-scope': 'off', // React 17+는 import 없이 JSX 사용 가능

    // ✅ JSX 접근성 검사
    'jsx-a11y/accessible-emoji': 'warn',
    'jsx-a11y/alt-text': 'warn',

    // ✅ 기타
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // 사용하지 않는 변수 경고
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['./src'],
      },
    },
  },
};

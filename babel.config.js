module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // nativewind
    'nativewind/babel',
    'react-native-reanimated/plugin',
    [
      // 절대경로
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@': './src',
          '@const': './src/const',
        },
      },
    ],
  ],
};

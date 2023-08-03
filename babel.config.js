module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@api': './src/api',
          '@assets': './src/assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@hooks': './src/hooks',
          '@navigation': './src/navigation',
          '@redux': './src/redux',
          '@screens': './src/screens',
          '@styles': './src/styles',
          '@utils': './src/utils',
          '@axios': './src/axios.js',
          '@helpers': './src/helpers',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};

const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
const { transformer, resolver } = config;

const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
};
config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...resolver.sourceExts, 'svg'],
};

module.exports = wrapWithReanimatedMetroConfig(config);

// const { getDefaultConfig } = require('expo/metro-config');

// module.exports = (() => {
//   const config = getDefaultConfig(__dirname);

//   const { transformer, resolver } = config;

//   config.transformer = {
//     ...transformer,
//     babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
//   };
//   config.resolver = {
//     ...resolver,
//     assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
//     sourceExts: [...resolver.sourceExts, 'svg'],
//   };

//   return config;
// })();

const { withNativeWind } = require('nativewind/metro')

const { getDefaultConfig } = require('expo/metro-config')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

const { resolver, transformer } = config

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve('@lingui/metro-transformer/expo')
}
config.resolver = {
  ...resolver,
  sourceExts: [...resolver.sourceExts, 'po', 'pot']
}

module.exports = withNativeWind(config, { input: './global.css' })

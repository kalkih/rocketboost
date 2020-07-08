const SitemapWebpackPlugin = require('sitemap-webpack-plugin').default
const routerPaths = require('./src/router/sitemap').default.map((r) => r.path)
const DumpEnvVarsWebpackPlugin = require('./DumpEnvVarsWebpackPlugin.js')

process.env.VUE_APP_VERSION = require('./package.json').version

const dev = process.env.NODE_ENV === 'development'

module.exports = {
  publicPath: '/',
  pwa: {
    themeColor: '#0D0C1E',
    msTileColor: '#0D0C1E',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/sw.js',
      swDest: 'service-worker.js',
    },
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
      analyzerMode: dev ? 'server' : 'disabled',
    },
  },
  devServer: {
    historyApiFallback: true,
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [
            { collapseGroups: false },
            { moveGroupAttrsToElems: false },
            { moveElemsAttrsToGroup: false },
            { cleanupIDs: false },
          ],
        },
      })
    config.plugin('sitemap').use(
      new SitemapWebpackPlugin(process.env.BASE_URL, routerPaths, {
        changeFreq: 'always',
      }),
    )
    config.plugin('env').use(new DumpEnvVarsWebpackPlugin({ filename: 'env-vars.js' }))
  },
}

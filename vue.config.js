const SitemapWebpackPlugin = require('sitemap-webpack-plugin').default
const routerPaths = require('./src/router/sitemap').default.map(r => r.path)

const dev = process.env.NODE_ENV === 'development'

module.exports = {
  publicPath: process.env.BASE_URL,
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/styles/global.scss";
        `,
      },
    },
  },
  pwa: {
    themeColor: '#070515',
    msTileColor: '#070515',
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
      analyzerMode: dev ? 'server' : 'disabled',
    },
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
    config
      .plugin('sitemap')
      .use(new SitemapWebpackPlugin(process.env.BASE_URL, routerPaths, {
        changeFreq: 'always',
      }))
  },
}

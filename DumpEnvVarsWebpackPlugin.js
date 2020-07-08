const path = require('path')
const fs = require('fs')

module.exports = class DumpEnvVarsWebpackPlugin {
  constructor(opts) {
    this.filename = opts.filename || 'env-vars-dump.js'
  }

  apply(compiler) {
    const fileContent = Object.keys(process.env).reduce((accum, currKey) => {
      const val = process.env[currKey]
      // eslint-disable-next-line no-param-reassign
      accum += `const ${currKey} = '${val}'\n`
      return accum
    }, '')
    const outputDir = compiler.options.output.path
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir)
    }
    const fullOutputPath = path.join(outputDir, this.filename)
    console.debug(`[DumpEnvVarsWebpackPlugin] dumping env vars to file=${fullOutputPath}`)
    fs.writeFileSync(fullOutputPath, fileContent)
  }
}

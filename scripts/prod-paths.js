const tsConfigPaths = require('tsconfig-paths')
const tsConfig = require('../tsconfig.json')

const baseUrl = __dirname + '/../lib'
tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths,
})

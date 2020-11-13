const fs = require('fs')

const modelsDir = __dirname + '/../src/models'

const files = fs.readdirSync(modelsDir)
const dirs = files.filter(file => !/\./.test(file))

try {
  fs.mkdirSync(__dirname + '/../excluded')
} catch (e) {
  if (e.code !== 'EEXIST') throw e
}

fs.writeFileSync(
  __dirname + '/../excluded/schema.graphql',
  dirs
    .map(dir => ({
      path: modelsDir + '/' + dir,
      files: fs.readdirSync(modelsDir + '/' + dir),
    }))
    .map(({path, files}) =>
      files.indexOf('schema.ts') !== -1 ? path + '/schema.ts' : undefined,
    )
    .filter(e => !!e)
    .concat(__dirname + '/../src/typeDefs.ts')
    .map(
      e =>
        fs
          .readFileSync(e)
          .toString()
          .match(/`([\00-\uFFFF]+?)`/)[1],
    )
    .join('\r\n'),
)

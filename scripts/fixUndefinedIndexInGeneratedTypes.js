const fs = require('fs').promises

fs.readFile(__dirname + '/../src/models/types.ts')
  .then(e => e.toString())
  .then(text => text.replace(/undefined: .+?[,;]/g, ''))
  .then(text => fs.writeFile(__dirname + '/../src/models/types.ts', text))

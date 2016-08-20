const program = require('commander')
const { findWords, displayWords } = require('./utils')

program
  .option('--language <language>', 'Language')
  .option('--letters <letters>', 'Letters')
  .option('--prefix <prefix>', 'Prefix')
  .option('--suffix <suffix>', 'Suffix')
  .option('--length <length>', 'Length')
  .parse(process.argv)

findWords(program).then(displayWords)

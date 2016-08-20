module.exports = {
  en: {
    uri: 'http://www.wineverygame.com/wbg.php',
    method: 'GET',
    fields: { letters: 'letters', submit: '' },
    selector: '.fword :nth-of-type(odd):not(:first-child) a'
  },
  fr: {
    uri: 'http://www.tricher-au-scrabble.com/',
    method: 'POST',
    fields: { lettres: 'letters' },
    selector: '.mot'
  },
  de: {
    uri: 'http://www.wordfind.com/wort-sucher/',
    method: 'POST',
    fields: { words: 'letters' },
    selector: '.staggeredList li'
  }
}

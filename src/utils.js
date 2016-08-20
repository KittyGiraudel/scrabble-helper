const request = require('request-promise')
const { load } = require('cheerio')
const ENDPOINTS = require('./config')

const sortByLength = (a, b) =>
  a.length - b.length

const display = (e) =>
  console.log(`[${e.length}] ${e}`)

const displayWords = (words) =>
  words.forEach(display)

const isNotNull = (value) =>
  !!(value && value.length > 0)

const isMatchingPrefix = (value, prefix = '') =>
  prefix ? value.startsWith(prefix) && value !== prefix : true

const isMatchingSuffix = (value, suffix = '') =>
  suffix ? value.endsWith(suffix) && value !== suffix : true

const isMatchingLength = (value, length) =>
  length ? value.length === Number(length) : true

const createQuery = (object = {}) =>
  Object.keys(object)
    .reduce((acc, key, index) =>
      acc + (index === 0 ? '?' : '&') + key + '=' + object[key]
    , '')

const getFormData = (fields = {}, data = {}) =>
  Object.keys(fields)
    .reduce((acc, key) => {
      acc[key] = data[fields[key]] || data[key] || fields[key]
      return acc
    }, {})

const getRequestOptions = (config, data = {}) => {
  const { method, uri, fields } = config
  const form = getFormData(fields, data)

  if (method === 'POST') return { method, uri, form }
  if (method === 'GET') return uri + createQuery(form)
}

const getConfiguration = (language) => {
  const ALLOWED_LANGUAGES = Object.keys(ENDPOINTS)

  if (!language || ALLOWED_LANGUAGES.indexOf(language.toLowerCase()) === -1) {
    throw new Error('Unknown language, please use one of: ' + ALLOWED_LANGUAGES.join(', '))
  }

  return ENDPOINTS[language.toLowerCase()]
}

const findWords = (data) => {
  const { language, length, prefix, suffix } = data
  const config = getConfiguration(language)

  prefix && (data.letters += prefix)
  suffix && (data.letters += suffix)

  return request(getRequestOptions(config, data))
    .then(load)
    .then(($) =>
      $(config.selector)
        .map((i, el) => $(el).html())
        .toArray()
        .filter(isNotNull)
        .filter((e) => isMatchingLength(e, length))
        .filter((e) => isMatchingPrefix(e, prefix))
        .filter((e) => isMatchingSuffix(e, suffix))
        .sort(sortByLength)
    )
}

module.exports = {
  sortByLength,
  isNotNull,
  isMatchingSuffix,
  isMatchingPrefix,
  isMatchingLength,
  createQuery,
  getFormData,
  getRequestOptions,
  getConfiguration,
  findWords,
  displayWords
}

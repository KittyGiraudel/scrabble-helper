const assert = require('assert')
const utils = require('../utils')

describe('The sortByLength helper', () => {
  const { sortByLength } = utils

  it('should substract length of first item to length of second item', () => {
    const actual = sortByLength('foo', 'ba')
    const expect = 1
    assert.equal(actual, expect)
  })

  it('should sort an array of elements based on their length', () => {
    const actual = ['foo', 'ba', 'bar', 'baze', 'fz'].sort(sortByLength)
    const expect = ['ba', 'fz', 'foo', 'bar', 'baze']
    assert.deepEqual(actual, expect)
  })
})

describe('The isNotNull helper', () => {
  const { isNotNull } = utils

  it('should return true if value is truthy', () => {
    const actual = isNotNull('hello')
    const expect = true
    assert.equal(actual, expect)
  })

  it('should return true if value is null', () => {
    const actual = isNotNull(null)
    const expect = false
    assert.equal(actual, expect)
  })

  it('should return true if value is undefined', () => {
    const actual = isNotNull(undefined)
    const expect = false
    assert.equal(actual, expect)
  })
})

describe('The isMatchingPrefix helper', () => {
  const { isMatchingPrefix } = utils

  it('should return true if no prefix given', () => {
    const actual = isMatchingPrefix('hello')
    const expect = true
    assert.equal(actual, expect)
  })

  it('should return true if empty prefix given', () => {
    const actual = isMatchingPrefix('hello', '')
    const expect = true
    assert.equal(actual, expect)
  })

  it('should return true if matching given prefix', () => {
    const actual = isMatchingPrefix('hello', 'h')
    const expect = true
    assert.equal(actual, expect)
  })

  it('should return false if not matching given prefix', () => {
    const actual = isMatchingPrefix('hello', 'e')
    const expect = false
    assert.equal(actual, expect)
  })

  it('should return false if equal to given prefix', () => {
    const actual = isMatchingPrefix('hello', 'hello')
    const expect = false
    assert.equal(actual, expect)
  })
})

describe('The isMatchingSuffix helper', () => {
  const { isMatchingSuffix } = utils

  it('should return true if no suffix given', () => {
    const actual = isMatchingSuffix('hello')
    const expect = true
    assert.equal(actual, expect)
  })

  it('should return true if empty suffix given', () => {
    const actual = isMatchingSuffix('hello', '')
    const expect = true
    assert.equal(actual, expect)
  })

  it('should return true if matching given suffix', () => {
    const actual = isMatchingSuffix('hello', 'o')
    const expect = true
    assert.equal(actual, expect)
  })

  it('should return false if not matching given suffix', () => {
    const actual = isMatchingSuffix('hello', 'e')
    const expect = false
    assert.equal(actual, expect)
  })

  it('should return false if equal to given suffix', () => {
    const actual = isMatchingSuffix('hello', 'hello')
    const expect = false
    assert.equal(actual, expect)
  })
})

describe('The isMatchingLength helper', () => {
  const { isMatchingLength } = utils

  it('should return true if no length given', () => {
    const actual = isMatchingLength('hello')
    const expect = true
    assert.equal(actual, expect)
  })

  it('should return true if matching given length', () => {
    const actual = isMatchingLength('hello', 5)
    const expect = true
    assert.equal(actual, expect)
  })

  it('should return false if not matching given length', () => {
    const actual = isMatchingLength('hello', 6)
    const expect = false
    assert.equal(actual, expect)
  })
})

describe('The createQuery helper', () => {
  const { createQuery } = utils

  it('should return an empty string if no object given', () => {
    const actual = createQuery()
    const expect = ''
    assert.equal(actual, expect)
  })

  it('should return an empty string if empty object given', () => {
    const actual = createQuery({})
    const expect = ''
    assert.equal(actual, expect)
  })

  it('should return a query string from given object', () => {
    const actual = createQuery({ foo: 'bar', baz: 42, qux: true })
    const expect = '?foo=bar&baz=42&qux=true'
    assert.equal(actual, expect)
  })
})

describe('The getRequestOptions helper', () => {
  const { getRequestOptions } = utils

  it('should return undefined if given method is neither GET nor POST', () => {
    const actual = getRequestOptions({ method: 'FOO' })
    const expect = undefined
    assert.equal(actual, expect)
  })

  it('should return an object if given method is POST', () => {
    const actual = typeof getRequestOptions({ method: 'POST' })
    const expect = 'object'
    assert.equal(actual, expect)
  })

  it('should copy method and uri from given object if given method is POST', () => {
    const actual = getRequestOptions({ method: 'POST', uri: 'foo' })
    const expect = { method: 'POST', uri: 'foo', form: {} }
    assert.deepEqual(actual, expect)
  })

  it('should return a string if given method is GET', () => {
    const actual = typeof getRequestOptions({ method: 'GET' })
    const expect = 'string'
    assert.equal(actual, expect)
  })
})

describe('The getConfiguration helper', () => {
  const { getConfiguration } = utils

  it('should throw if no given language', () => {
    const actual = () => getConfiguration()
    const expect = 'Error'
    assert.throws(actual, expect)
  })

  it('should throw if given language is not supported', () => {
    const actual = () => getConfiguration('foobar')
    const expect = 'Error'
    assert.throws(actual, expect)
  })

  it('should return an object if given language is supported', () => {
    const actual = typeof getConfiguration('en')
    const expect = 'object'
    assert.equal(actual, expect)
  })

  it('should return method, uri, fields and selector if given language is supported', () => {
    const actual = getConfiguration('en')
    const expect = { uri: 'http://www.wineverygame.com/wbg.php', method: 'GET', fields: { letters: 'letters', submit: '' }, selector: '.fword :nth-of-type(odd):not(:first-child) a' }
    assert.deepEqual(actual, expect)
  })
})

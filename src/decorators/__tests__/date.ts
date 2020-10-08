import {dissoc} from 'ramda'
import {pathToUTCDate, toUTCDate, formatPaths} from '../date'

const date = new Date(1978, 6, 16, 16, 12, 44, 666)

describe('toUTCDate', function () {
  it('should set hours to 11', function () {
    const utc = toUTCDate(date)

    expect(utc.getUTCHours()).toBe(11)
  })

  it('should keep date', function () {
    const utc = toUTCDate(date)

    expect(utc.getFullYear()).toBe(date.getFullYear())
    expect(utc.getMonth()).toBe(date.getMonth())
    expect(utc.getDate()).toBe(date.getDate())
  })
})

describe('pathToUTCDate', function () {
  it('should convert specified date to utc', function () {
    const obj = {nested: {date}}

    const newObj = pathToUTCDate(['nested', 'date'], obj)
    const newDate = newObj.nested.date

    expect(newDate).toEqual(toUTCDate(date))
  })

  it('should not mutate not specified fields', function () {
    const obj = {otherField: {}, date}

    const newObj = pathToUTCDate(['date'], obj)

    expect(newObj).toEqual(expect.objectContaining(dissoc('date', obj)))
  })
})

describe('formatPaths', function () {
  it('should format all paths', function () {
    const obj = {nested: {date}, date}
    const newObj = formatPaths([['nested', 'date'], ['date']], obj)

    const utc = toUTCDate(date)

    expect(newObj).toEqual({nested: {date: utc}, date: utc})
  })
})

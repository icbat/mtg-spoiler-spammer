const cards = require('../lib/cards')

const exampleCardNormal = require('./example-card-normal.json')
const exampleCardDFC = require('./example-card-doublefaced.json')

jest.mock('got')

describe('trimToRelevantFields', () => {
  const expectedKeys = ['card_uri', 'name', 'picture', 'set_name', 'set_uri']

  test('trims a normal card', () => {
    const result = cards.trimToRelevantFields(exampleCardNormal)

    expect(result).toBeTruthy()
    expect(Object.keys(result).length).toEqual(expectedKeys.length)

    for (const key of expectedKeys) {
      expect(Object.keys(result)).toContain(key)
      expect(result[key]).toEqual(expect.any(String))
    }
  })

  test('uses the "normal" image on a normal card', () => {
    const result = cards.trimToRelevantFields(exampleCardNormal)

    expect(result.picture).toEqual('https://c1.scryfall.com/file/scryfall-cards/normal/front/5/1/51464df6-557f-47e5-838e-2a30145511f0.jpg?1576382174')
  })

  test('trims a double-faced card', () => {
    const result = cards.trimToRelevantFields(exampleCardDFC)

    expect(result).toBeTruthy()
    expect(Object.keys(result).length).toEqual(expectedKeys.length)

    for (const key of expectedKeys) {
      expect(Object.keys(result)).toContain(key)
      expect(result[key]).toEqual(expect.any(String))
    }
  })

  test('uses the "normal" image on a double-faced card', () => {
    const result = cards.trimToRelevantFields(exampleCardDFC)

    expect(result.picture).toEqual('https://c1.scryfall.com/file/scryfall-cards/normal/front/0/2/028aeebc-4073-4595-94da-02f9f96ea148.jpg?1562825445')
  })
})

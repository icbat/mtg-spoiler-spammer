const cards = require('../src/cards')

const { get } = require('got')

jest.mock('got')

beforeEach(() => {
  jest.resetAllMocks()
})

describe('getCards', () => {
  test('calls with correct query', async () => {
    const body = JSON.stringify({ data: [] })
    get.mockResolvedValue({ body })
    await cards.getCards()

    expect(get).toHaveBeenCalledWith('https://api.scryfall.com/cards/search?q=lang:en&order=spoiled&include_extras=false&unique=cards')
  })
})

describe('getSets', () => {
  test('calls with correct query', async () => {
    const body = JSON.stringify({ data: [] })
    get.mockResolvedValue({ body })
    await cards.getSets()

    expect(get).toHaveBeenCalledWith('https://api.scryfall.com/sets')
  })
})

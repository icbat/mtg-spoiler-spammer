const { main } = require('../src/main')
const { getset } = require('../src/db')
const { sendToChat } = require('../src/db')

jest.mock('../src/db')
jest.mock('../src/slack')

test('when all the cards are new ', async () => {
  getset.mockResolvedValueOnce('not a magic card name')

  const result = await main()

  expect(result.length).toEqual(5)
  expect(sendToChat).toHaveBeenCalled()
})

test('when no cards are new', async () => {
  getset.mockResolvedValueOnce('not a magic card name')
  const result1 = await main()

  getset.mockResolvedValueOnce(result1[0].name)

  const result2 = await main()

  expect(result2.length).toEqual(0)
  expect(sendToChat).not.toHaveBeenCalled()
})

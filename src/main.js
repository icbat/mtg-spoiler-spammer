const { getCards, trimToRelevantFields } = require('./cards')
const slack = require('./slack')
const cache = require('./db')

const truncateCards = cards => {
  const length = Math.min(cards.length, 5)

  return cards.slice(0, length)
}

exports.main = async () => {
  const cards = await getCards()
  const trimmed = cards.map(trimToRelevantFields)

  const lastSeen = await cache.getset('last seen card name', trimmed[0].name)

  const names = trimmed.map(({ name }) => name)
  const index = names.indexOf(lastSeen)
  console.log("the last card we've seen is at index", index, lastSeen)
  const newCards = trimmed.slice(0, index)
  const truncated = truncateCards(newCards)

  return truncated
}

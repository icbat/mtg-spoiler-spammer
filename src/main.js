const { getCards, trimToRelevantFields, groupBySet } = require('./cards')
const slack = require('./slack')
const cache = require('./db')

exports.main = async () => {
  const cards = await getCards()
  const trimmed = cards.map(trimToRelevantFields)

  const lastSeen = await cache.getset('last seen card name', trimmed[0].name)

  const names = trimmed.map(({ name }) => name)
  const index = names.indexOf(lastSeen)
  console.log("the last card we've seen is at index", index, lastSeen)
  const newCards = trimmed.slice(0, index)

  const grouped = groupBySet(newCards)

  const sendPromises = Object.entries(grouped).map(async ([setName, newCardsInSet]) => {
    let thread_ts = await cache.get(setName)

    if (!thread_ts) {
      const response = await slack.sendToChat(`Spoilers for ${setName}`)
      const new_thread_ts = response.body.ts
      thread_ts = await cache.getSet(setName, new_thread_ts)
    }

    const cardsMessage = slack.createMessage(newCardsInSet)
    return slack.sendToChat(cardsMessage.text, thread_ts, cardsMessage.blocks)
  })
  await Promise.all(sendPromises)

  return newCards
}

const cards = require('./lib/cards')
const slack = require('./lib/slack')
const db = require('./lib/db')

const handleError = error => {
  console.log(error)
}

const truncateCards = cards => {
  const length = Math.min(cards.length, 5)

  return cards.slice(0, length)
}

cards.getCards()
  .then(cards.parseResponse)
  .then(cardList => cardList.map(cards.trimToRelevantFields))
  .then(db.filterSeenCards)
  .then(truncateCards)
  .then(slack.createMessage)
  .then(slack.sendToChat)
  .catch(handleError)

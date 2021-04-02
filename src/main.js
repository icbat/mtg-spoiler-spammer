const cards = require('./cards')
const slack = require('./slack')
const db = require('./db')

const handleError = error => {
  console.log(error)
}

const truncateCards = cards => {
  const length = Math.min(cards.length, 5)

  return cards.slice(0, length)
}

exports.main = () => {
  return cards.getCards()
    .then(cards.parseResponse)
    .then(cardList => cardList.map(cards.trimToRelevantFields))
    .then(db.filterSeenCards)
    .then(truncateCards)
    .then(slack.createMessage)
    .then(slack.sendToChat)
    .catch(handleError)
}

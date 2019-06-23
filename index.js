const cards = require('./lib/cards')
const slack = require('./lib/slack')
const db = require('./lib/db')


const handleError = error => {
    console.log(error)
}

cards.getCards()
    .then(cards.parseResponse)
    .then(cardList => cardList.map(cards.trimToRelevantFields))
    .then(db.filterSeenCards)
    // TODO .then( if there's more than N, consolidate)
    .then(slack.createMessage)
    .then(slack.sendToChat)
    .catch(handleError)

const cards = require('./lib/cards')
const slack = require('./lib/slack')
const db = require('./lib/db')


const limitResponse = n => cards => cards.slice(0, n)

const handleError = error => {
    console.log(error)
}

cards.getCards()
    .then(cards.parseResponse)
    // TODO filter out the ones we've already sent
    .then(cards => {
        db.setLastSeenCard(cards[0].name)
        return cards
    })
    // TODO .then( if there's more than N, consolidate)
    .then(limitResponse(3))
    .then(slack.createMessage)
    .then(slack.sendToChat)
    .catch(handleError)

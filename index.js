const cards = require('./cards')
const slack = require('./slack')

<<<<<<< HEAD
const getNewCardsUrl = "https://api.scryfall.com/cards?order=spoiled"

const sendToSlackUrl = process.env.SLACK_URL

const parseResponse = resp => {
    console.log('response resceived')
    const body = JSON.parse(resp.body)

    console.log(body.data[0])

    const trimmed = body.data
        .map(trimToRelevantFields)


        console.log(trimmed[0])

        return trimmed
}

const trimToRelevantFields = card => {
    const { set_name, name, scryfall_uri, set_uri, image_uris: { large } } = card
    return { set_name, name, card_uri: scryfall_uri, set_uri, picture: large }
}
=======
>>>>>>> 4bd5df4... extracting some files to keep it clean

const limitResponse = n => cards => cards.slice(0, n)

const handleError = error => {
    console.log(error)
}

cards.getCards()
    .then(cards.parseResponse)
    // TODO filter out the ones we've already sent
    // TODO .then( if there's more than N, consolidate)
    .then(limitResponse(3))
    .then(slack.createMessage)
    .then(slack.sendToChat)
    .catch(handleError)

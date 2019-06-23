const got = require('got')

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

const limitResponse = n => cards => cards.slice(0, n)

// https://api.slack.com/reference/messaging/payload
const createMessage = cards => {
    console.log(cards)

    return {
        text: 'New cards were spoiled!',
        blocks: [].concat.apply([], cards.map(createMessageBlock))
    }
}

// https://api.slack.com/reference/messaging/blocks
const createMessageBlock = card => {
    const imageBlock = {
        type: 'image',
        image_url: card.picture,
        alt_text: card.picture
    }
    const textBlock = {
        type: 'section',
        text: { type: 'mrkdwn', text: `<${card.card_uri}|${card.name}>\n<${card.set_uri}|${card.set_name}>` }
    }
    return [imageBlock, textBlock]
}

const sendToChat = message => {
    const options = {
        body: JSON.stringify(message),
        responseType: 'json'}
    return got.post(sendToSlackUrl, options)
}

const handleError = error => {
    console.log(error)
}

got.get(getNewCardsUrl)
.then(parseResponse)
// TODO filter out the ones we've already sent
// TODO .then( if there's more than N, consolidate)
.then(limitResponse(3))
.then(createMessage)
.then(sendToChat)
.catch(handleError)

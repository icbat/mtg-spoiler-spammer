const got = require('got')

const getNewCardsUrl = "https://api.scryfall.com/cards?order=spoiled"


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
    const { set_name, name, scryfall_uri, image_uris: { large } } = card
    return { set_name, name, scryfall_uri, picture: large }
}

// TODO 
const sendToChat = cards => cards

const handleError = error => {
    console.log(error)
}

got.get(getNewCardsUrl)
    .then(parseResponse)
    // TODO .then( if there's more than N, consolidate)
    .then(sendToChat)
    .catch(handleError)

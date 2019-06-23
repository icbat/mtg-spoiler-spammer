const got = require('got')



const getCards = () => {
    const searchOptions = [
        // You must have a query, this one is pretty loose
        'q=lang:en',
        'order=spoiled',
        'include_extras=false',
        'unique=cards',
    ]
    const searchQuery = searchOptions.join('&')
    const getNewCardsUrl = "https://api.scryfall.com/cards/search?" + searchQuery
    return got.get(getNewCardsUrl)
}

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

module.exports = {
    getCards,
    parseResponse,
}

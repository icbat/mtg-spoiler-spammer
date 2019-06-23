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
    console.log('Fetching cards from', getNewCardsUrl)
    return got.get(getNewCardsUrl)
}

const parseResponse = resp => {
    console.log('Response received!')
    const body = JSON.parse(resp.body)

    const trimmed = body.data
        .map(trimToRelevantFields)


    return trimmed
}

const trimToRelevantFields = card => {
    console.log('Trimming fields')
    const { set_name, name, scryfall_uri, set_uri, image_uris: { normal } } = card
    return { set_name, name, card_uri: scryfall_uri, set_uri, picture: normal }
}

module.exports = {
    getCards,
    parseResponse,
}

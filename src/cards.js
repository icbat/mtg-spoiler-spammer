const got = require('got')

const getCards = async () => {
  const searchOptions = [
    // You must have a query, this one is pretty loose
    'q=lang:en',
    'order=spoiled',
    'include_extras=false',
    'unique=cards',
  ]
  const searchQuery = searchOptions.join('&')
  const getNewCardsUrl = 'https://api.scryfall.com/cards/search?' + searchQuery
  console.log('Fetching cards from', getNewCardsUrl)
  const result = await got.get(getNewCardsUrl)
  return parseResponse(result)
}

const parseResponse = resp => {
  console.log('Response received!')
  const body = JSON.parse(resp.body)

  console.log('Example card')
  console.log(body.data[0])

  return body.data
}

const trimToRelevantFields = card => {
  const { name, set_name, set_uri, scryfall_uri: card_uri } = card
  const picture = getPicture(card)

  return { set_name, name, card_uri, set_uri, picture }
}

const getPicture = card => {
  const image_uris = card.image_uris
  const card_faces = card.card_faces

  if (card_faces) {
    return card_faces[0].image_uris.normal
  }

  return image_uris.normal
}

module.exports = {
  getCards,
  trimToRelevantFields,
}

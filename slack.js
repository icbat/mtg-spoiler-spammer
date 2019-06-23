const got = require('got')


const sendToSlackUrl = process.env.SLACK_URL

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
        responseType: 'json'
    }
    return got.post(sendToSlackUrl, options)
}

module.exports = {
    createMessage,
    sendToChat,
}

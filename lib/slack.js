const got = require('got')


const sendToSlackUrl = process.env.SLACK_URL

// https://api.slack.com/reference/messaging/payload
const createMessage = cards => {
    console.log(cards)

    const cardBlocks = cards.map(createMessageBlock).flat()
    const blocks = [createHeaderBlock(cards.length)].concat(cardBlocks)

    return {
        text: `${cards.length} new card(s) have been spoiled!`,
        blocks
    }
}

const createHeaderBlock = length => {
    return {
        type: 'section',
        text: { type: 'mrkdwn', text: `*${length} new card(s) have been spoiled!*`}
    }
}

// https://api.slack.com/reference/messaging/blocks
const createMessageBlock = card => {
    const imageBlock = {
        type: 'image',
        image_url: card.picture,
        alt_text: card.picture,
        title: {
            type: 'plain_text',
            text: card.name
        }
    }
    const textBlock = {
        type: 'context',
        elements: [
            { type: 'mrkdwn', text: `<${card.card_uri}|${card.name}>` },
            { type: 'mrkdwn', text: `<${card.set_uri}|${card.set_name}>` }
        ]
    }

    const dividerBlock = {type: 'divider'}
    return [imageBlock, textBlock, dividerBlock]
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

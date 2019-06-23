const got = require('got')


const sendToSlackUrl = process.env.SLACK_URL

// https://api.slack.com/reference/messaging/payload
const createMessage = cards => {
    console.log('Creating a message for', cards.length, 'cards')

    const cardBlocks = [].concat.apply([], cards.map(createMessageBlock))
    const blocks = [createHeaderBlock(cards.length)].concat(cardBlocks)
    blocks.push(createContributeBlock())

    return {
        text: `${cards.length} new card(s) have been spoiled!`,
        blocks
    }
}

const createHeaderBlock = length => ({
    type: 'section',
    text: { type: 'mrkdwn', text: `*${length} new card(s) have been spoiled!*` }
})

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

const createContributeBlock = () => ({
    type: 'section',
    text: { type: 'mrkdwn', text: "See something you don't like? <https://github.com/icbat/mtg-spoiler-spammer|Fix it>!"}
})

const sendToChat = message => {
    console.log('Sending the message to Slack')
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

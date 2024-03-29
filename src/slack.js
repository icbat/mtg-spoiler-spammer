const got = require('got')

const slack_bot_token = process.env.SLACK_BOT_TOKEN
const slack_channel_id = process.env.SLACK_CHANNEL_ID

// https://api.slack.com/reference/messaging/payload
const createMessage = cards => {
  if (!cards.length) {
    return null
  }
  console.log('Creating a message for', cards.length, 'cards')

  const cardBlocks = [].concat.apply([], cards.map(createMessageBlock))
  const blocks = [createHeaderBlock(cards.length)].concat(cardBlocks)
  blocks.push(createContributeBlock())

  return {
    text: `${cards.length} new card(s) have been spoiled!`,
    blocks,
  }
}

const createHeaderBlock = length => ({
  type: 'section',
  text: { type: 'mrkdwn', text: `*${length} new card(s) have been spoiled!*` },
})

// https://api.slack.com/reference/messaging/blocks
const createMessageBlock = card => {
  const imageBlock = {
    type: 'image',
    image_url: card.picture,
    alt_text: card.picture,
    title: {
      type: 'plain_text',
      text: card.name,
    },
  }
  const textBlock = {
    type: 'context',
    elements: [
      { type: 'mrkdwn', text: `<${card.card_uri}|${card.name}>` },
      { type: 'mrkdwn', text: `<${card.set_uri}|${card.set_name}>` },
    ],
  }

  const dividerBlock = { type: 'divider' }
  return [imageBlock, textBlock, dividerBlock]
}

const createContributeBlock = () => ({
  type: 'section',
  text: { type: 'mrkdwn', text: "See something you don't like? <https://github.com/icbat/mtg-spoiler-spammer|Fix it>!" },
})

const sendToChat = (text, thread_ts, blocks) => {
  const message = {
    text,
    thread_ts,
    blocks,
    channel: slack_channel_id,
  }
  console.log('Sending the message to Slack', message.channel, message.text, 'thread:', message.thread_ts)
  const options = {
    body: JSON.stringify(message),
    responseType: 'json',
    headers: {
      Authorization: `Bearer ${slack_bot_token}`,
      'Content-Type': 'application/json',
    },
    timeout: 5000,
  }
  return got.post('https://slack.com/api/chat.postMessage', options)
}

module.exports = {
  createMessage,
  sendToChat,
}

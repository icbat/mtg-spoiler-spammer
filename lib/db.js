const redisURL = require('./env').redis
// https://devcenter.heroku.com/articles/redistogo#using-with-node-js
const { URL } = require('url')
const { port, hostname, password } = new URL(redisURL)
const redis = require('redis').createClient(port, hostname)

redis.auth(password)

const filterSeenCards = cards => {
  return new Promise((resolve, reject) => {
    const cardName = cards[0].name
    console.log('Checking the database', cardName)

    redis.getset('last seen card name', cardName, (error, result) => {
      if (error) {
        return reject(error)
      }

      console.log('found', result, error)

      const names = cards.map(({ name }) => name)
      const index = names.indexOf(result)
      console.log("the last card we've seen is at index", index)
      // TODO -1 means they're all new
      return resolve(cards.slice(0, index))
    })
  })
}

module.exports = {
  filterSeenCards,
}

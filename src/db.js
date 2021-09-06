const getset = (key, newValue) => {
  const redisURL = require('./env').redis
  // https://devcenter.heroku.com/articles/redistogo#using-with-node-js
  const { URL } = require('url')
  const { port, hostname, password } = new URL(redisURL)
  const redis = require('redis').createClient(port, hostname)

  redis.auth(password)

  return new Promise((resolve, reject) => {
    console.log('Checking the cache', key, newValue)

    redis.getset(key, newValue, (error, result) => {
      if (error) {
        return reject(error)
      }

      console.log('found', result, error)
      return resolve(result)
    })
  })
}

const get = (key) => {
  const redisURL = require('./env').redis
  // https://devcenter.heroku.com/articles/redistogo#using-with-node-js
  const { URL } = require('url')
  const { port, hostname, password } = new URL(redisURL)
  const redis = require('redis').createClient(port, hostname)

  redis.auth(password)

  return new Promise((resolve, reject) => {
    console.log('Checking the cache', key)

    redis.get(key, (error, result) => {
      if (error) {
        return reject(error)
      }

      console.log('found', result, error)
      return resolve(result)
    })
  })
}

const set = (key, newValue) => {
  const redisURL = require('./env').redis
  // https://devcenter.heroku.com/articles/redistogo#using-with-node-js
  const { URL } = require('url')
  const { port, hostname, password } = new URL(redisURL)
  const redis = require('redis').createClient(port, hostname)

  redis.auth(password)

  return new Promise((resolve, reject) => {
    console.log('Setting new value', key, newValue)

    redis.set(key, newValue, (error, result) => {
      if (error) {
        return reject(error)
      }

      console.log('found', result, error)
      return resolve(result)
    })
  })
}

module.exports = {
  getset,
  get,
  set,
}

let cacheInstance

const getCache = () => {
  if (cacheInstance) {
    return cacheInstance
  }

  console.log('Initializing redis connection')
  const redisURL = require('./env').redis
  // https://devcenter.heroku.com/articles/redistogo#using-with-node-js
  const { URL } = require('url')
  const { port, hostname, password } = new URL(redisURL)
  const redis = require('redis').createClient(port, hostname)

  redis.auth(password)

  cacheInstance = redis

  return cacheInstance
}

const getset = (key, newValue) => new Promise((resolve, reject) => {
  const redis = getCache()
  console.log('Checking the cache', key, newValue)

  redis.getset(key, newValue, (error, result) => {
    if (error) {
      return reject(error)
    }

    console.log('found', result, error)
    return resolve(result)
  })
})

const get = (key) => new Promise((resolve, reject) => {
  const redis = getCache()
  console.log('Checking the cache', key)

  redis.get(key, (error, result) => {
    if (error) {
      return reject(error)
    }

    console.log('found', result, error)
    return resolve(result)
  })
})

const set = (key, newValue) => new Promise((resolve, reject) => {
  const redis = getCache()
  console.log('Setting new value', key, newValue)

  redis.set(key, newValue, (error, result) => {
    if (error) {
      return reject(error)
    }

    console.log('found', result, error)
    return resolve(result)
  })
})

module.exports = {
  getset,
  get,
  set,
}

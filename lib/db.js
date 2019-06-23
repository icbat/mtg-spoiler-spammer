// https://devcenter.heroku.com/articles/redistogo#using-with-node-js
const {port, hostname, auth} = require("url").parse(process.env.REDISTOGO_URL);
const redis = require("redis").createClient(port, hostname);

redis.auth(auth.split(":")[1]);

const setLastSeenCard = cardName => {
    redis.getset("last seen card name", cardName, function() {
        console.log('db received', arguments)
    });
}

module.exports = {
    setLastSeenCard,
}

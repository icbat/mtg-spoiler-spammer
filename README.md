Spoiler Bot
===========

A Slack bot that posts newly spoiled Magic: the Gathering cards

# Running your own

This is designed to run using some type of external scheduler to execute `node index.js`

## Dependencies

- [Scryfall](https://scryfall.com/docs/api) to fetch the latest cards with images
- [Redis](https://redis.io/commands) to store the last card it saw so you don't post duplicates
- [Slack](https://api.slack.com/) to receive messages

## Environment Variables

In your Heroku app, make sure

- SLACK_URL - you get this by creating a new App in Slack on your team and creating the incoming WebHook for your app, before Installing it to post to the channel you want. The full URL gets set here
- REDISTOGO_URL - a Redis connection string with username/password info embedded in it

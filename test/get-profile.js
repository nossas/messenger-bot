'use strict'
const tap = require('tap')
const nock = require('nock')
const Bot = require('../')

tap.test('bot.getProfile() - successful request', (t) => {
  let bot = new Bot({
    token: 'foo'
  })

  let response = {
    first_name: 'Cool',
    last_name: 'Kid',
    profile_pic: 'url',
    locale: 'en',
    timezone: 'PST',
    gender: 'M'
  }

  nock('https://graph.facebook.com').get('/v5.0/1').query({
    fields: 'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email',
    access_token: 'foo'
  }).reply(200, response)

  return bot.getProfile(1, (err, profile) => {
    t.error(err, 'response should not be error')
    t.deepEquals(profile, response, 'response is correct')
    t.end()
  }).catch(t.threw)
})

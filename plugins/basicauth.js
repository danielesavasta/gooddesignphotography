'use strict'

const fp = require('fastify-plugin')

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
module.exports = fp(async function (fastify, opts) {
    const authenticate = {realm: 'Westeros'}

function validate (username, password, req, reply, done) {
    if (username === 'Tyrion' && password === 'wine') {
      done()
    } else {
      done(new Error('Winter is coming'))
    }
  }
  
  fastify.register(require('@fastify/basic-auth'), {
    validate, authenticate
  })
})

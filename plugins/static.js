'use strict'

const fp = require('fastify-plugin')
/**
 * This plugins adds some utilities to handle http errors
*
* @see https://github.com/fastify/fastify-sensible
*/
module.exports = fp(async function (fastify, opts) {
  const path = require('node:path')
  fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, '../public'),
    prefix: '/', // optional: default '/'
  })
})

'use strict'

const fp = require('fastify-plugin')

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(async function (fastify, opts) {
  fastify.register(require('@fastify/mongodb'), {
    url: process.env.MONGOD_CONNECT_URI || 
    'mongodb://localhost:27017/photoArchive'
  })
})
/*


// ESM
import fastifyPlugin from 'fastify-plugin'
import fastifyMongo from '@fastify/mongodb'

async function dbConnector (fastify, options) {
  fastify.register(fastifyMongo, {
    url: process.env.MONGOD_CONNECT_URI || 
    'mongodb://localhost:27017/photoArchive'
  })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
export default fastifyPlugin(dbConnector)
*/
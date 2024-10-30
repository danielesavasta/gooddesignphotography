'use strict'

module.exports = async function (fastify, opts) {

  fastify.after(() => {
    fastify.addHook('onRequest', fastify.basicAuth)
  
    fastify.get('/', async function (req, reply) {
      //reply.send({ hello: 'world' })
      return { root: true }
    })
  })

 /* fastify.get('/', async function (request, reply) {
    return { root: true }
  })*/
}

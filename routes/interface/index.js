'use strict'

module.exports = async function (fastify, opts) {
    fastify.get('/', async function (req, reply) {
      const collection = loadWorks();
      const result = await collection.aggregate().toArray() //{ $sample: { size: 1 } 
      //console.log(result)
      return reply.view("layout/main.hbs", {collection:result});
    })

    const dbPhotos ='photoArchive';
function loadWorks(){
  return fastify.mongo.db.collection(dbPhotos);
}
}


'use strict'

const fp = require('fastify-plugin')

const Handlebars = require('handlebars');

Handlebars.registerHelper('randomValue', function (options) {
  const type = options.hash.type;
  const length = options.hash.length;

  let result = '';

  if (type === 'NUMERIC') {
    const characters = '0123456789';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  }

  return new Handlebars.SafeString(result);
});
Handlebars.registerHelper('json', function(context) {
  return JSON.stringify(context);
});
module.exports = fp(async function (fastify, opts) {
  const path = require('node:path')

  fastify.register(require('@fastify/view'), {
    engine: {
      handlebars: Handlebars//require('handlebars')
    },
    includeViewExtension: true,
    root: path.join(__dirname, '../views/'),
    layout: "./templates/layout.hbs",
    viewExt: "hbs",
    options: {
      partials: {
        head: '/partials/head.hbs',
        header: '/partials/header.hbs',
        footer: '/partials/footer.hbs'
      }
    } 
  });
});
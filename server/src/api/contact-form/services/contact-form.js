'use strict';

/**
 * contact-form service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::contact-form.contact-form', ({strapi}) => ({
  async create(body) {
    const {name, email, message} = body.data

    const response = await strapi.entityService.create("api::contact-form.contact-form", {data: {name, email, message}})

    const html = `<p>Hola ${name}, hemos recibido tu mensaje:</p><p style="margin: 20px">${message}</p><p>Te responderemos pronto.</p>`

    await strapi.service("api::contact-form.sendmail").send(email, "Hemos recibido tu mensaje", html)

    return response
  }
}));

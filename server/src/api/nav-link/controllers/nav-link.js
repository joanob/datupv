'use strict';

/**
 * nav-link controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::nav-link.nav-link', ({strapi}) => ({
  async find(ctx) {
    const { query } = ctx;

    const entity = await strapi.service('api::nav-link.nav-link').find({...query, populate: {pagina: true, subenlaces: {populate: {pagina: true}}}});

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  }
}));

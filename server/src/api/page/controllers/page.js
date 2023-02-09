'use strict';

/**
 * page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::page.page', ({strapi}) => ({
  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.service('api::page.page').find({...query, filters: {id: id}, populate: {cuerpo: {populate: {imagen:  true}}}});

    const now = new Date().getTime()
    if (entity.publishedAt === null || now < new Date(entity.fecha).getTime()) {
        // Returning void sends 404 Not Found
        return
    }

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));

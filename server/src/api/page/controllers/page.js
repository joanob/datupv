'use strict';

/**
 * page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::page.page', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;

    const entity = await strapi.service('api::page.page').find(query);

    const publishedEntities = entity.results
      .filter(page => page.publishedAt !== null)
      .map(page => {
        page.previewId = "";
        return page
      })

    const sanitizedEntity = await this.sanitizeOutput(publishedEntities, ctx);

    return this.transformResponse(sanitizedEntity);
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.service('api::page.page').find({ ...query, filters: { id: id }, populate: { cuerpo: { populate: { imagen: true } } } });

    if (entity.publishedAt === null) {
      // Returning void sends 404 Not Found
      return
    }

    const response = entity.results.map(element => {
      element.previewId = "";
      return element
    })

    const sanitizedEntity = await this.sanitizeOutput(response, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));

'use strict';

/**
 * news controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::news.news', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;

    const entity = await strapi.service('api::news.news').find(query);

    const now = new Date().getTime()
    const publishedEntities = entity.results
      .filter(news => news.publishedAt !== null && now >= new Date(news.fecha).getTime())
      .map(news => {
        news.previewId = "";
        return news
      })

    const sanitizedEntity = await this.sanitizeOutput(publishedEntities, ctx);

    return this.transformResponse(sanitizedEntity);
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.service('api::news.news').find({ ...query, filters: { $or: [{ id: id }, { url: id }] }, populate: { cuerpo: { populate: { imagen: true } } } })

    const now = new Date().getTime()
    if (entity.publishedAt === null || now < new Date(entity.fecha).getTime()) {
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

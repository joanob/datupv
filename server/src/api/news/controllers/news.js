'use strict';

/**
 * news controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::news.news', ({ strapi }) => ({
    async find(ctx) {
        const { query } = ctx;

        const entity = await strapi.service('api::news.news').find(query);
        const publishedEntities = entity.results.filter(news => news.publishedAt !== null)
        const sanitizedEntity = await this.sanitizeOutput(publishedEntities, ctx);

        return this.transformResponse(sanitizedEntity);
      },
      async findOne(ctx) {
        const { id } = ctx.params;
        const { query } = ctx;

        const entity = await strapi.service('api::news.news').findOne(id, query);

        if (entity.publishedAt === null) {
            // Returning void sends 404 Not Found
            return
        }

        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);
      },
}));

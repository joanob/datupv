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
        const publishedEntities = entity.results.filter(news => news.publishedAt !== null && now >= new Date(news.fecha).getTime())

        const sanitizedEntity = await this.sanitizeOutput(publishedEntities, ctx);

        return this.transformResponse(sanitizedEntity);
      },

      async findOne(ctx) {
        const { id } = ctx.params;
        const { query } = ctx;

        const entity = await strapi.service('api::news.news').find({...query, filters: {$or: [{id: id}, {url: id}]}, populate: {cuerpo: {populate: {imagen:  true}}}});

        const now = new Date().getTime()
        if (entity.publishedAt === null || now < new Date(entity.fecha).getTime()) {
            // Returning void sends 404 Not Found
            return
        }

        if (entity.results.length === 0) {
          // Even without success will return 200 with an empty array
          return
        }

        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);
      },
}));

const { createCoreController } = require('@strapi/strapi').factories;

const fs = require("fs")

module.exports = {
  async save(ctx) {
    /* const filename = await strapi.service("api::backup.backup").save()
    ctx.body = filename */
  },
  async download(ctx) {
    /* const filename = await strapi.service("api::backup.backup").save()

    ctx.set("Access-Control-Allow-Origin", "*")
    ctx.set("Content-Type", "application/octet-stream")

    ctx.body =
      fs.createReadStream(".tmp/"+filename)
    ctx.attachment = filename */
  }
};

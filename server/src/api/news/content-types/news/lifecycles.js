const uuid = require("../../../../custom/uuid")

module.exports = {
  beforeCreate(event) {
    event.params.data.previewId = uuid.generateUuidIfNotExists(event.params.data.previewId)
  },

  beforeUpdate(event) {
    event.params.data.previewId = uuid.generateUuidIfNotExists(event.params.data.previewId)
  }
}

const uuid = require("uuid")

module.exports = {
  generateUuidIfNotExists(id) {
    if (uuid.validate(id)) {
      return id
    }
    return uuid.v4()
  }
}

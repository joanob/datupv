'use strict';

const fs = require("fs")

/**
 * backup service copies db file with timestamp and returns created filename
 */

module.exports = () => ({
  async save(body) {
    const now = new Date()
    const timestamp = now.getFullYear() +  "-" + (now.getMonth() + 1) + "-" + now.getDate() + "-" + now.getHours() + "-" + now.getMinutes() + "-" + now.getSeconds()
    const filename = "data-" + timestamp + ".db"
    fs.copyFileSync(".tmp/data.db", ".tmp/" + filename)
    return filename
  }
});

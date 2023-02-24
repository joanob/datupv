process.env = require("dotenv-array")()

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: "http://localhost",
  app: {
    keys: process.env.APP_KEYS,
  },
});

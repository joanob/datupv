const path = require('path');
require("mysql")

// https://docs.strapi.io/dev-docs/configurations/database#environment-variables-in-database-configurations

module.exports = ({ env }) => {
  const client = env("DATABASE_CLIENT")

  const connections = {
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
    mysql: {
      connection: {
        client: "mysql",
        connection: {
          host: env('DATABASE_HOST'),
          port: env.int('DATABASE_PORT'),
          database: env('DATABASE_NAME'),
          user: env('DATABASE_USERNAME'),
          password: env('DATABASE_PASSWORD'),
          timezone: "Europe/Berlin",
          ssl: false
        }
      }
    }
  }

  return {
    client,
    ...connections[client],
    debug: true,
    acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 30000)
  }



  /* defaultConnection: env("DATABASE_CONNECTION_NAME"),
  connections: {
    sqlite: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
    mysql: {
      client: "mysql",
      settings: {
 
      }
    }
  } */
};

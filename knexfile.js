require('dotenv').config({ path: './.env' })

module.exports = {

  development: {
    client: 'postgresql',
    connection: process.env.POSTGRES_CONNECTION_STRING
  },
  productions: {
    client: 'postgresql',
    connection: process.env.POSTGRES_CONNECTION_STRING
  }
}

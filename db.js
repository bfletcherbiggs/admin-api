require('dotenv').config({ path: './.env' })
const config = require('./knexfile.js');
const knex = require('knex')(config[process.env.NODE_ENV]);

module.exports = knex;

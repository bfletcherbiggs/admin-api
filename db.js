require( 'dotenv' ).config( { path: './.env' } );

const config = require( './knexfile.js' ),
      knex = require( 'knex' )( config[ process.env.NODE_ENV ] );

module.exports = knex;

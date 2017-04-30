const sendinblue = require( 'sendinblue-api' ),
      config = require( './config.json' ),
      parameters = { "apiKey": config.sendinbluekey, "timeout": 5000 },
      sendinObj = new sendinblue(parameters);

module.exports = sendinObj;

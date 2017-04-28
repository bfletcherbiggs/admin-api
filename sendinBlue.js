const sendinblue = require( 'sendinblue-api' ),
    config = require( './config.json' );

let parameters = { "apiKey": config.sendinbluekey, "timeout": 5000 };
let sendinObj = new sendinblue(parameters);

module.exports=sendinObj

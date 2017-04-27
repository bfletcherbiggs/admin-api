const aws = require('aws-sdk'),
    lconfig = require('./config.json');

aws.config.update({
    "accessKeyId":lconfig.awsUsername,
    "secretAccessKey":lconfig.awsPassword,
    "region":lconfig.awsRegion
});
var ses = new aws.SES()

module.exports=ses

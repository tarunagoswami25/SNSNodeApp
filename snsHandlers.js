
const AWS = require('aws-sdk');
const credentials = new AWS.SharedIniFileCredentials({profile: 'default'});

const sns = new AWS.SNS({credentials: credentials, region: 'eu-west-2'});

const createSMSService = function (req, res){
     res.json({status: "ok", sns: sns});
}

const subscribeSMSService =  function (req, res)  {
    let params = {
        Protocol: 'SMS', 
        TopicArn: 'arn:aws:sns:eu-west-2:736377241983:Test',
        Endpoint: req.body.message
    };

    sns.subscribe(params, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            res.send(data);
        }
    });
}

const sendSms = function (req, res)  {
    let params = {
        Message: req.body.message,
        TopicArn: 'arn:aws:sns:eu-west-2:736377241983:Test'
    };
    console.log(params);
    sns.publish(params, function(err, data) {
        if (err) console.log(err, err.stack); 
        else console.log(data);
    });
}
const sendMessageQueue = function (req, res) {

    let params = {
        Message: req.body.message,
        TopicArn: 'arn:aws:sns:eu-west-2:736377241983:Test'
    };
    // Create promise and SNS service object
var publishTextPromise = sns.publish(params).promise();

// Handle promise's fulfilled/rejected states
publishTextPromise.then(
  function(data) {
    console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
    console.log("MessageID is " + data.MessageId);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });
}
module.exports = {
    createSMSService,
    subscribeSMSService, 
    sendSms,
    sendMessageQueue
}
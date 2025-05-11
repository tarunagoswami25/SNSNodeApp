const express = require('express');
const app = express();
const handlers  = require("./snsHandlers")

const AWS = require('aws-sdk');
const credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
const sns = new AWS.SNS({credentials: credentials, region: 'eu-west-2'});

const port = 3000;

app.use(express.json());

app.get('/status', handlers.createSMSService);
app.post('/subscribe', handlers.subscribeSMSService);
app.post('/send', handlers.sendSms);
app.post('/triggerLamdaFunction', handlers.sendMessageQueue)

app.listen(port, () => console.log(`SNS App listening on port ${port}!`));
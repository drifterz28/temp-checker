require('dotenv').config();

const accountSid = process.env.SSID;
const authToken = process.env.TOKEN;
const http = require('http');
const express = require('express');
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();

app.get('/', (req, res) => {
  const number = req.query.number;
  if(!number) {
    res.json({'err': 'no number to send to'});
  }
  client.messages
    .create({
      body: 'Your boat is reporting it is currently at 36°',
      from: '+' + process.env.PHONE,
      to: '+1' + number
    })
    .then(message => {
      res.json(message);
    });
});

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});
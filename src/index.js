require('dotenv').config();

const accountSid = process.env.SSID;
const authToken = process.env.TOKEN;
const port = process.env.PORT || 1337;

const http = require('http');
const express = require('express');
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const session = require('express-session');

const {query} = require('./lib/connect.js');

const app = express();
// config express-session
const sess = {
  secret: 'CHANGE THIS TO A RANDOM SECRET',
  cookie: {},
  resave: false,
  saveUninitialized: true
};

const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());
app.use(session(sess));

app.get('/', async (req, res) => {
  const [rows,fields] = await query("SELECT 1");
  res.json({rows,fields})
  // const number = req.query.number;
  // if(!number) {
  //   res.json({'err': 'no number to send to'});
  // }
  // client.messages
  //   .create({
  //     body: 'Your boat is reporting it is currently at 36°',
  //     from: '+' + process.env.PHONE,
  //     to: '+1' + number
  //   })
  //   .then(message => {
  //     res.json(message);
  //   });
});

app.post('/report/:token/:temp/:battery', async (req, res) => {
  const { params } = req;
  const dbResults = await query('INSERT INTO temps ', );
});

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.get('/health' (_, res) => {
  res.json({'health': 'good'});
})

http.createServer(app).listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

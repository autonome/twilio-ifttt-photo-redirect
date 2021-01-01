var express = require('express')
var bodyParser = require('body-parser')
const fetch = require('node-fetch')

var app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN

const client = require('twilio')(twilioAccountSid, twilioAuthToken)

const iftttURL = process.env.IFTTT_MAKER_URL

// if you want to reply to sender with a message, add it here
// otherwise leave blank and no reply will be sent
const responseText = 'that photo better be grandma appropriate'

// global var for info about the last message
let message = {}

// Configure your Twilio phonenumber with http://projectdomain.glitch.me/message
// when an SMS comes in, Twilio makes a POST request to this endpoint
app.post("/message", function (request, response) {
  
  // data about the SMS passed in the request parameters
  
  /*
    {
      ToCountry: 'US',
      MediaContentType0: 'image/jpeg',
      ToState: 'NY',
      SmsMessageSid: '...',
      NumMedia: '1',
      ToCity: '',
      FromZip: '12345',
      SmsSid: '...',
      FromState: 'NY',
      SmsStatus: 'received',
      FromCity: 'NEW YORKISH',
      Body: '',
      FromCountry: 'US',
      To: '+12345678910',
      ToZip: '',
      NumSegments: '1',
      MessageSid: '...',
      AccountSid: '...',
      From: '+12345678910',
      MediaUrl0: 'url here',
      ApiVersion: '2010-04-01'
    }
  */
  
  if (request.body.MediaUrl0) {
    const iftttMsg = { value1 : request.body.MediaUrl0 }

    fetch(iftttURL, {
      method: 'POST',
      body: JSON.stringify(iftttMsg),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => console.log('posted image to ifttt'))
  }
  
  // we'll stick that data into a global variable for the client to retreive
  message['body'] = request.body.Body
  message['from'] = "XXX-XXX-" + request.body.From.slice(-4)
  //message['mediaURL'] = request.body.MediaUrl0
  
  // send back some TwiML (XML) for the reply text
  if (responseText.length > 0) {
    response.send('<Response><Message>' + responseText + '</Message></Response>')
  }
})

app.get("/message-for-client", function (request, response) {
  // send back the global message var to parse on frontend
  response.send(message)
})

// serve up the homepage
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html')
})

// start the server
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
})
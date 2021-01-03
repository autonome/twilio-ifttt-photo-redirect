Mobile photo uploader - Twilio 2 IFTTT Webhook
==============================================

Send a photo via text message to a phone number, redirect to IFTTT, and then save the photo to wherever you like.


## Usage

- [Remix this project](https://glitch.com/edit/#!/remix/twilio-ifttt-photo-redirect).
- Sign up for a [free Twilio account](http://twilio.com/try-twilio) and [buy a phone number](https://www.twilio.com/console/phone-numbers/search)
- Configure the Twilio number's inbound message webhook to whatever you named your version of this project, eg yourproject.glitch.me/message
- Sign up a [free IFTTT account](https://ifttt.com) and configure the Maker service
- Create a new IFTTT applet that receives Webhook events with your chosen event name and saves `value1` from the Webhook event to Google Drive (or whatever)
- Configure the .env in this project with your Twilio API info and your IFTTT Maker endpoint URL that has your chose event name
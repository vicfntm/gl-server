const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const fs = require('fs');
const customConfig = JSON.parse(fs.readFileSync('./config/secret.json'));
const auth = customConfig.mailgunAuth;

const nodemailerMailgun = nodemailer.createTransport(mg(auth));
module.exports = {
  send(userEmail, userCode) {
    nodemailerMailgun.sendMail({
      from: customConfig.sender,
      to: `${userEmail}`,
      subject: 'Service verification',
      text: 'Your verification code is: ' + userCode
    }, ((err, info) => {
      if (err) {
        console.log('Error: ' + err);
      } else {
        console.log('Response: ' + info);
      }
    }));
  }
}


/* eslint-disable */

const nodemailer = require('nodemailer');

class Mailer {
  constructor(
    address  = process.env.CURRENT_MAIL_ADDRESS,
    password = process.env.CURRENT_MAIL_PASSWORD,
    service  = 'Gmail'
  ) {
    this.transporter = null;
    if (address && address !== '' && password && password !== '') {
      this.fromAddress = address;
      this.transporter = nodemailer.createTransport({
        service,
        auth: {
          user: address,
          pass: password,
        },
      });
    }
  }

  send(text, subject = 'Email Example', addresses = 'maxgraey@gmail.com') {
    if (!this.transporter) {
      console.error('mail transported not created');
      return;
    }

    const options = {
      from:    this.fromAddress, // sender address
      to:      addresses,        // list of receivers
      subject: subject,          // Subject line
      text:    text //,          // plaintext body
      // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };

    this.transporter.sendMail(options, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Message sent: ' + info.response);
      };
    });
  }
}

module.exports = Mailer;

//let mailer = new Mailer();
//mailer.send('Hello World!', 'Test send');

/* eslint-enable */

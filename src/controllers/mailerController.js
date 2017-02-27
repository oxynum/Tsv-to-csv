var nodemailer = require('sendmail');

function sendMail() {


  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'maxime@oxynum.fr',
          pass: 'Gasnierdu78'
      }
  });

  // setup email data with unicode symbols
  var mailOptions = {
      from: '"Fred Foo 👻" <maxime@oxynum.fr>', // sender address
      to: 'maxime@oxynum.fr, pascal@happit.fr', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world ?', // plain text body
      html: '<b>Hello world ?</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
}

module.exports = {
  sendCSV: sendMail
}

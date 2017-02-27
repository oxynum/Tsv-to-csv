var sendmail = require('sendmail');

(function sendMail() {

  sendmail({
    from: 'maxime@oxynum.fr',
    to: 'maxime@oxynum.fr',
    replyTo: '',
    subject: 'MailComposer sendmail',
    html: 'Mail of test sendmail ',

  }, function (err, reply) {
    console.log(err && err.stack)
    console.dir(reply)
  })
})();

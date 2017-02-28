var Mailjet = require ('node-mailjet')
  .connect("b66aeb1489a86390a6ff914f915e423f", "3a414a588dd751e931bcdf3162d3b636");

  /**
  * @private
  */
  function sendMail(csvToSend) {
    var sendEmail = Mailjet.post('send'),
        receiver  = 'maxime@oxynum.fr';

    var emailData = {
        'FromEmail': 'bcgparis.com@gmail.com',
        'FromName': 'Daily Information: ' + new Date().toLocaleDateString().split('/').join('-'),
        'Subject': 'Daily Information: ' + new Date().toLocaleDateString().split('/').join('-'),
        'Text-part': 'This is your daily csv file for BCG : ' +  "BCG-" + new Date().toLocaleDateString().split('/').join('-') + ".csv",
        'Recipients': [{'Email': receiver}],
      'Attachments': [{
        "Content-Type": "text-plain",
        "Filename": "BCG-" + new Date().toLocaleDateString().split('/').join('-') + ".csv",
        "Content": new Buffer(csvToSend).toString('base64')
      }],
    }

    sendEmail
      .request(emailData)
        .then(function() {
          console.log("Mail sent to: " + receiver);
        })
        .catch(function() {
          console.log("Error when sending mail");
        });
  }

module.exports = {
  sendCSV: sendMail
}

const fs    = require('fs');
var Mailjet = require ('node-mailjet')
  .connect("b66aeb1489a86390a6ff914f915e423f", "3a414a588dd751e931bcdf3162d3b636");
    jsonfile = require('json-file'),
    file     = jsonfile.read('tsv/SQLrequest.json'),
    data     = "",
    json2csv = require('json2csv'),
    tsv      = require('tsv'),
    csv      = tsv.csv,
    http     = require('http'),
    url      = require('url'),
    schedule = require('node-schedule');


/**
* @private
* Method that will get the the query in a json data file.
*/
function getQueryJSON() {
  console.log(file.get("request"));
  return file.get("request");
}

/**
* @private
* Will execute the query method after has been selected in the json data file.
* @param {String} query the query to execute. (please provide a valid SQL syntax)
* @param {Function} callback this function will be executed at the end of the load of the data
*/
function executeQuery(query, callback) {
  var basicUrl     = 'http:\/\/vmh1.fastmag.fr\/ediquery.ips?enseigne=BLEUCOMMEGRIS&magasin=SCHOOL&compte=HOMEMADE_B&motpasse=BCGediHM&data=',
      realQuery    = (query.split(' ').join('%20')).split("'").join('%27'),
      completeUrl  = basicUrl + realQuery,
      dataToReturn = "";

  console.log('Request launch for BASIC URL :' + basicUrl);
  console.log('Request with Query : ' + query);
  console.log('Final URL: \n\t ' + completeUrl);

 return  http.get({
     host:"vmh1.fastmag.fr",
     path:"/ediquery.ips?enseigne=BLEUCOMMEGRIS&magasin=SCHOOL&compte=HOMEMADE_B&motpasse=BCGediHM&data=" + realQuery,
   }, function(res) {

     res.setEncoding('utf8');
     res.on('data', function(dataToPut) {
       if(dataToPut == '\n'){
       } else {
         dataToReturn += dataToPut;
       }
     });
     res.on('end', function() {
       data = dataToReturn;
       callback(data);
     })
   }).on('error', function(e) {
     console.log('ERROR: ' + e.message);
   }).toString();
}

/**
* @private
* Will get the CSV content of the file.
* @param {string} result string in ut8 encoded that will be read as CSV datas.
*/
function getCSVcontent(result) {
  var currentDate = (new Date()).toLocaleDateString().split('/').join('-'),
      fileName    = "BCG-" + currentDate + '.csv',
      tsvContent  = treatTSVForNullValue(tsv.parse(result)),
      csvFile     = json2csv({
        data: tsvContent,
        fields: [ "SKUcolorsize", 'Quantity'],
        del: ";"
      });

  sendMail(csvFile);
  return csvFile;
}

/**
* @private
* Will just treat the TSV file get and erased null values triggered
* @param {array} tsv array of object that will be triggered
*/
function treatTSVForNullValue(tsv) {
  var tsvClean = [];

  tsv.forEach(function(v,i) {
    if(v.SKUcolorsize == '') {
    } else {
      tsvClean[i] = v;
    }
  });
  return tsvClean;
}

/**
* @private
*/
function sendMail(csvToSend) {
  var sendEmail = Mailjet.post('send'),
      receiver  = 'pascal@happit.fr';

  var emailData = {
      'FromEmail': 'hello@acbbvolley.fr',
      'FromName': 'BCG',
      'Subject': 'Daily stock info. from BCG.',
      'Text-part': 'This is your daily csv file for BCG : ' +  "BCG-" + new Date().toLocaleDateString().split('/').join('-') + ".csv",
      'Recipients': [{'Email': receiver},{'Email': 'sabreena@mineminekids.com'}],
    'Attachments': [{
      "Content-Type": "text-plain",
      "Filename": "BCG-" + new Date().toLocaleDateString().split('/').join('-') + ".csv",
      "Content": new Buffer(csvToSend).toString('base64')
    }],
  };

  sendEmail
    .request(emailData)
      .then(function() {
        console.log("Mail sent to: " + receiver);
      })
      .catch(function() {
        console.log("Error when sending mail");
      });
}


var j = schedule.scheduleJob('0 13 * * *', function() {
  var query   = getQueryJSON();
  executeQuery(query, getCSVcontent);
});

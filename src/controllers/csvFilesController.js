const fs     = require('fs');
var data     = "",
    json2csv = require('json2csv'),
    tsv      = require('tsv'),
    csv      = tsv.csv,
    http     = require('http');

/**
* Will get all datas from website thanks to query thrown.
* @param {string} query corresponds to a sql query
*/
function  getData(query) {
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
      createCSVFile();
    })
  }).on('error', function(e) {
    console.log('ERROR: ' + e.message);
  }).toString();
}

function getTable(query) {
  getData(query);
  createCSVFile();
  return data;
}

/**
* Will create a CSV file with today's date. In the publi folder of the app
* @param {NoParam}
*/
function createCSVFile() {
  var currentDate = (new Date()).toLocaleDateString().split('/').join('-'),
      fileName    = "BCG-" + currentDate + '.csv',
      tsvContent  = treatTSVForNullValue(tsv.parse(data)),
      csvFile     = json2csv({
        data: tsvContent,
        fields: [ "SKU", 'quantity'],
        del: ";"
      });
      
  fs.writeFile("public/csv-files/" + fileName, csvFile, function(err) {
    if (err) throw err;
    console.log('File saved: ' + fileName);
  });
}

/**
* @private
* Will just treat the TSV file get and erased null values triggered
* @param {array} tsv array of object that will be triggered
*/
function treatTSVForNullValue(tsv) {
  var tsvClean = [];

  tsv.forEach(function(v,i) {
    if(v.SKU == '') {
      console.log(v.SKU);
    } else {
      tsvClean[i] = v;
    }
  });
  return tsvClean;
}

/**
* csvFilesController module.
* @module /src/controllers/csvFilesController
* @param getData
*/
module.exports = {
  getData: getData,
  getTable: getTable,
  data: data,
  file: "BCG-" + (new Date()).toLocaleDateString().split('/').join('-') + ".csv"
};

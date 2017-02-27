const fs = require('fs');
var data = "";
var json2csv = require('json2csv');
let tsv  = require('tsv'),
    csv  = tsv.csv,
    http = require('http');

/**
*
*
*/
function  getData(query) {
 let basicUrl     = 'http:\/\/vmh1.fastmag.fr\/ediquery.ips?enseigne=BLEUCOMMEGRIS&magasin=SCHOOL&compte=HOMEMADE_B&motpasse=BCGediHM&data=',
     realQuery    = (query.split(' ').join('%20')).split("'").join('%27'),
     completeUrl  = basicUrl + realQuery;
 var dataToReturn = "";

 console.log('Request launch for BASIC URL :' + basicUrl);
 console.log('Request with Query : ' + query);
 console.log('Final URL: \n\t ' + completeUrl);

return  http.get({
    host:"vmh1.fastmag.fr",
    path:"/ediquery.ips?enseigne=BLEUCOMMEGRIS&magasin=SCHOOL&compte=HOMEMADE_B&motpasse=BCGediHM&data=" + realQuery,
  }, (res) => {

    res.setEncoding('utf8');
    res.on('data', (dataToPut) => {
      if(dataToPut == '\n'){
        console.log("info");
      } else {
        console.log("la petite erreur");
        dataToReturn += dataToPut;
      }
      console.log(dataToPut);
    });
    res.on('end', () => {
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

function createCSVFile() {
  let currentDate = (new Date()).toLocaleDateString().split('/').join('-'),
      fileName    = "BCG-" + currentDate + '.csv',
      tsvContent  = treatTSVForNullValue(tsv.parse(data)),
      csvFile     = json2csv({
        data: tsvContent,
        fields: [ "SKU", 'quantity'],
        del: ";"
      });
      
  console.log(tsvContent);

  fs.writeFile("public/csv-files/" + fileName, csvFile, (err) => {
    if (err) throw err;
    console.log('File saved: ' + fileName);
  });
}

function treatTSVForNullValue(tsv) {
  let tsvClean = [];

  tsv.forEach((v,i) => {
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

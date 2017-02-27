var jsonfile = require('json-file'), //TODO: TO REFACTO with module exports
    file     = jsonfile.read('SQLrequest.json');


/**
* Will get the request located in the json file SQLrequest.json
* @param {NoParam}
*/
function getQueryJSON() {
  return file.get("request");
}

/**
* Will get the request located in the json file SQLrequest.json
* @param {string} newQuery represents the query enterred by the view
*/
function updateQueryJSON(newQuery) {
  addQueryToHistory(file.get("request"));
  if(newQuery == null || newQuery == '') return;

  console.log('UPDATE REQUEST IN JSON: ' + file + '\n New: ' + newQuery);

  file.set("request", newQuery);
  file.writeSync();

  return true;
}

/**
* TODO NOT YET IMPLEMENTED
*/
function addQueryToHistory(query) {

}

/**
* requestsController module.
* @module /src/controllers/requestsController
* @param getQueryJSON
* @param updateQueryJSON
*/
module.exports = {
  getQueryJSON: getQueryJSON,
  updateQueryJSON: updateQueryJSON
};

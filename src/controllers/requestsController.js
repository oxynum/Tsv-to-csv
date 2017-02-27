let jsonfile = require('json-file'), //TODO: TO REFACTO with module exports
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
  file.set("request", newQuery);
  file.writeSync();
  return true;
}

/**
* TODO NOT YET IMPLEMENTED
*/
function addQueryToHistory(query) {
  console.log('ERROR NOT YEST IMPLEMENTED');
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

let jsonfile = require('json-file'), //TODO: TO REFACTO with module exports
    file     = jsonfile.read('SQLrequest.json');


/**
*
*
*/
function getQueryJSON() {
  return file.get("request");
}

function updateQueryJSON(newQuery) {
  addQueryToHistory(file.get("request"));
  file.set("request", newQuery);

}

function addQueryToHistory(query) {

}
module.exports = {
  getQueryJSON: getQueryJSON,
  updateQueryJSON: updateQueryJSON
};

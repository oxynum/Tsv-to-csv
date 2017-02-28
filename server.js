

const port             = process.env.PORT || 9000;
var express            = require('express'),
    app                = express(),
    colors             = require('colors'),
    bodyParser         = require('body-parser'),
    requestsController = require('./src/controllers/requestsController'),
    csvController      = require('./src/controllers/csvFilesController'),
    mailerController   = require('./src/controllers/mailerController');

console.log('Welcome to one of the SimbaDev app.' + ' -> Developed by Oxynum Team'.cyan);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true }));

// DEFINE ROUTES : '/'
app.get('/', function(req, res) {
  var query = {
    query : requestsController.getQueryJSON(),
    table: null,
    data: csvController.data,
    file: "",
    csvFiles:""
  };
  res.render('index', query);
});
app.post('/', function(req, res) {
  requestsController.updateQueryJSON(req.body.query);
  var query = {
    query : requestsController.getQueryJSON(),
    table: null,
    data: csvController.data,
    file: "",
    csvFiles:""
  };
  res.render('index', query);
});

//-----------------------------------------
// DEFINE ROUTES : '/filesCsv'
app.get('/filesCsv', function(req, res)  {
  var query = {
    csvFiles:""
  };
  res.render('page-AllCSV', query);
});

//-----------------------------------------
// DEFINE ROUTES : '/checkRequest'
app.post('/executeQuery', function(req, res) {
  var query = {
    query : requestsController.getQueryJSON(),
    table : csvController.getData(requestsController.getQueryJSON()),
    data: csvController.data,
    file: csvController.file,
    csvFiles:""
  };
  res.render('index', query);
});

app.post('/sendMail', function(req, res) {
  var query = {
    query : requestsController.getQueryJSON(),
    table : null,
    data: csvController.data,
    file: csvController.file,
    csvFiles:""
  };
  mailerController.sendCSV();
  res.render('index', query);
});


app.get('*', function(req, res){
  res.send('Nope sorry');
});
app.listen(port, function() {
  console.log('App running on: '.green + port);
  console.log('To get started with this app, start by construct your own SQL request... '.yellow);
  console.log('Then you can try to launch it and download the file.'.yellow);
});

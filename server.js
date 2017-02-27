const port = process.env.PORT || 9000;
let express            = require('express'),
    app                = express(),
    colors             = require('colors'),
    bodyParser         = require('body-parser'),
    requestsController = require('./src/controllers/requestsController');

console.log('Welcome to one of the SimbaDev app.' + ' -> Developed by Oxynum Team'.cyan);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true }));

// DEFINE ROUTES : '/'
app.get('/', (req, res) => {
  let query = {
    query : requestsController.getQueryJSON()
  };

  res.render('index', query);
});
app.post('/', (req, res) => {
  requestsController.updateQueryJSON(req.body.query);
  let query = {
    query : requestsController.getQueryJSON()
  };
  res.render('index', query);
});

//-----------------------------------------
// DEFINE ROUTES : '/filesCsv'
app.get('/filesCsv', (req, res) => {

});

//-----------------------------------------
// DEFINE ROUTES : '/checkRequest'
app.get('/checkRequest', (req, res) => {

});

app.listen(port, () => {
  console.log('App running on: '.green + port);
  console.log('To get started with this app, start by construct your own SQL request... '.yellow);
  console.log('Then you can try to launch it and download the file.'.yellow);
});

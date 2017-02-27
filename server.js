const port = process.env.PORT || 9000;
let express = require('express'),
    app     = express(),
    colors  = require('colors');

console.log('Welcome to one of the SimbaDev app.' + ' -> Developed by Oxynum Team'.blue);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
  response.render('index', {number: 4});
});

app.listen(port, () => {
  console.log('App running on: '.green + port);
  console.log('To get started with this app, start by construct your own SQL request... '.yellow);
  console.log('Then you can try to launch it and download the file.'.yellow);
});

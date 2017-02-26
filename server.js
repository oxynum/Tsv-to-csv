let express = require('express'),
    app     = express();

const port = process.env.PORT || 9000;

console.log('Welcome to one of the SimbaDev app.');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
  response.render('index');
});

app.listen(port, () => {
  console.log('App running on: '.green + port);
});

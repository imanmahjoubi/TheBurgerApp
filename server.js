require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var expressHandlebars = require('express-handlebars');
var PORT = process.env.PORT || 8080;
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var routes = require('./controllers/burgerController.js');
app.use(routes);

app.listen(PORT, function(error) {
    if (error) throw error;
    console.log('connected at port', PORT);
});
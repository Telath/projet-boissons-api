var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose');

var cors = require('cors');

var indexRouter = require('./routes/index');
var boissonRouter = require('./routes/boisson');
var bouteilleRouter = require('./routes/bouteille');

var app = express();

// Intégration de la bdd
var connectionString = "mongodb+srv://clementpouillart:PXetdikjakJh6Q4T@boissonsangular.bvhc3no.mongodb.net/test";
var mongoDB = process.env.MONGODB_URI || connectionString;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/', indexRouter);
app.use('/boissons', boissonRouter);
app.use('/bouteilles', bouteilleRouter);

module.exports = app;

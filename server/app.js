var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var mongoose = require('mongoose');

if (process.env.NODE_ENV == 'development') {
  var browserSync = require('browser-sync');
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpackConfig = require('./../webpack.dev.config.js');
  var compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: false,
    publicPath: webpackConfig.output.publicPath,
    stats: {colors: true}
  }));
  app.use(webpackHotMiddleware(compiler));
}

mongoose.connect('mongodb://192.168.33.10/db', {socketOptions: {keepAlive: 1}});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '/../public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

if (process.env.NODE_ENV == 'development') {
  // avoid index.html conflict
  app.use('/assets', express.static(path.join(__dirname, '/../public/assets')));
} else {
  app.use(express.static(path.join(__dirname, '/../public')));
}

app.use('/api', require('./routes/api'));
app.use('/api/*', function (req, res, next) {
  res.json({error: {code: 1}});
});

app.route('*').get((req, res, next) => {
  if (process.env.NODE_ENV == 'development') {
    var filename = path.join(compiler.outputPath, '/../', 'index.html');

    compiler.outputFileSystem.readFile(filename, function (err, content) {
      if (err) {
        return next(err);
      }

      res.set('content-type', 'text/html');
      res.send(content);
      res.end();
    });
  } else {
    res.sendFile('public/index.html', {root: __dirname + '/../'});
  }
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

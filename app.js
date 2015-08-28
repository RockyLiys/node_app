var express = require('express');
var birds = require('./route/birds');
var app = express();

app.use(function (req, res, next) {
  console.log('Time:', Date.now(), req.method, req.originalUrl);
  next();
});

//template
app.set('views', './views')
app.set('view engine', 'jade');

//static
app.use('/media', express.static('./media'));
app.use('/files', express.static('./files'));
app.use('/uploads', express.static('./uploads'))

app.use('/birds', birds);

app.get('/', function (req, res) {
    //res.send('Hello World!');
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});

// error 
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('<h1>ERROR</h1>');
});


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

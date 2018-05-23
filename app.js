const express = require('express'),
      path = require('path'),
      favicon = require('serve-favicon'),
      logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      http = require('http'),

      index = require('./routes/index'),
      users = require('./routes/users'),

      app = express(),

      { generateTime, generateCommands, generateVolumeLevel } = require('./public/javascripts/generateFunctions');

const   socketIO = require('socket.io'),
        server = http.createServer(app),
        io = socketIO(server);

  // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


io.on('connection', (socket) => {
  socket.on('time', (time) => {
    socket.broadcast.emit("newTime", generateTime(time));
  });

  socket.on('videoCmd', (cmd) => {
    socket.broadcast.emit("pauseOrPlay", generateCommands(cmd));
  });

  socket.on('VolumeSetting', (volume) => {
    socket.broadcast.emit("VolumeLevels", generateVolumeLevel(volume));
  });

  socket.on('linkOfVideo', (link) => {
    socket.broadcast.emit("vidLink", link);
  });
  
  socket.on("newUserConnected", (msg)=>{
    socket.broadcast.emit("aNewUserConnected", msg);
  });

  io.of('/').clients((error, clients) => {
    if (error) throw error;
    console.log(clients.length); // => [PZDoMHjiu8PYfRiKAAAF, Anw2LatarvGVVXEIAAAD]
    io.emit('UsersLength', clients.length); // number of clients connected.
  });

})


server.listen(process.env.PORT || 3000, () => console.log('app is on 3000'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
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

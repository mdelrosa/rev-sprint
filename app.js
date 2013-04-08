
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , Facebook = require('facebook-node-sdk')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser(process.env.COOKIE_SECRET));
  app.use(express.session({secret: 'cats'}));
  app.use(Facebook.middleware({ appId: '182707635213483', secret: 'a355f15dcbadfa787e00a3956c60db03' }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.set('host', 'localhost:' + process.env.PORT)
  app.use(express.errorHandler());
});

//req.user is actually facebook ID not name
function facebookGetUser() {
  return function(req, res, next) {
    req.facebook.getUser( function(err, user) {
      if (!user || err){
        // res.render('login', { title: 'TaskMaster' });
        res.render('login', {title: 'Taskmaster'})
      } else {
        req.user = user;
        req.session.user = user;
        next();
      }
    });
  }
}

app.get('/', facebookGetUser(), user.main);
app.get('/current', facebookGetUser(), user.current);
app.get('/history', facebookGetUser(), user.history);

app.get('/login', Facebook.loginRequired(), function(req, res){
  res.redirect('/');
});
app.get('/logout', facebookGetUser(), function(req, res){
  req.user = null;
  req.session.destroy();
  res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
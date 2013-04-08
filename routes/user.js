
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.main = function(req, res){
  req.facebook.api('/me', function(err, user) {
    name = user.name;
    res.render('index', {title: 'Taskmaster', name: name})
  });
}

exports.current = function(req, res){
  res.render('current', {title: 'Current Tasks'})
}

exports.history = function(req, res){
  res.render('history', {title: 'Task History'})
}

exports.login = function(req, res){
  res.render('login', {title: 'Taskmaster'})
}
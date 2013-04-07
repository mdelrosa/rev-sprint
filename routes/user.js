
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.main = function(req, res){
  res.render('index', {title: 'Taskmaster'})
}

exports.login = function(req, res){
  res.render('login', {title: 'Taskmaster'})
}
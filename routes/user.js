
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.main = function(req, res){
	if (req.session.user)
		res.render('main')
	else
		res.redirect('/login')
}

exports.login = function(req, res){
	res.render('login', {title: 'Taskmaster'})
}
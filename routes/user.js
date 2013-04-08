
/*
 * GET users listing.
 */

var Models = require('../models.js'),
    User = Models.User;

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.main = function(req, res) {
	console.log('session', req.session.user);
	res.render('index', {
		title: 'Taskmaster',
		name: req.session.user.username,
		tasks: req.session.user.tasks
	});
}

exports.main = function(req, res){
  req.facebook.api('/me', function(err, user) {
  	if (err) {console.log(err)}
	else {
		User.findOne({user_id: user.id}).exec(function(err, foundUser) {
			console.log('found user', foundUser)
			if (err) {console.log(err)}
			// found user in db
			else if (foundUser) {
				req.session.user = foundUser;
				console.log('session', req.session.user)
				res.render('index', {
					title: 'Taskmaster',
					name: req.session.user.username,
					tasks: req.session.user.owned_tasks
				});
			}
			// user did not exist in db; create new one
			else if (!foundUser || !foundUser.length) {
				var new_user = new User({user_id: user.id,
					                     username: user.first_name,
					                     owned_tasks: []
					                 });
				new_user.save(function(err) {
					if(err) {console.log(err)}
					else {
						req.session.user = new_user;
						console.log("User saved");
						res.render('index', {
							title: 'Taskmaster',
							name: req.session.user.username,
							tasks: req.session.user.owned_tasks
						});	
					}				
				});
			}
		});
	}
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
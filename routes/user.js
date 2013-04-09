
/*
 * GET users listing.
 */

var Models = require('../models.js'),
    User = Models.User,
    Task = Models.Task;

exports.main = function(req, res){
  req.facebook.api('/me', function(err, user) {
  	if (err) {console.log(err)}
	else {
		User.findOne({user_id: user.id}).exec(function(err, foundUser) {
			if (foundUser == null) {
        console.log("User not found.")
      }
			if (err) {console.log(err)}
			// found user in db
			else if (foundUser) {
        console.log('found user', foundUser)
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
						console.log("New User: ", req.session.user.username);
						console.log("User saved");
            console.log(req.user);
						res.render('index', {
							title: 'Taskmaster',
							name: req.session.user.username,
              ID: req.user,
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

exports.newtask = function(req, res){
  console.log("task name: ", req.body.taskName);
  console.log("duration (ms): ", req.body.duration);
  console.log("Facebook ID: ", req.session.gerbil);
  var dat = new Date();
  var now = dat.getTime();
  var task = new Task({ creator: req.session.gerbil, name: req.body.taskName, date: now, duration: parseInt(req.body.duration) * 60000, score: 0, comment: "", keywords: []});
  task.save(function (err) {
    if (err)
      console.log("Error saving new task");
  });
}
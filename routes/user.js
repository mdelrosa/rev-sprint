
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
        Task.find({creator: req.session.gerbil},function(err,doc){
          if(err){
            console.log(err);
          }
          else{
            var openTasks = 0;
            var currentTask;
            var start;
            var finish;
            var startReadable;
            var finishReadable;
            doc.forEach(function(task){
              console.log(task);
              if(task.status == "open") {
                openTasks = 1;
                currentTask = task;
                start = new Date(task.date);
                finish = new Date(task.date + task.duration);
                startReadable = start.toLocaleTimeString();
                finishReadable = finish.toLocaleTimeString();
              }
            });
            console.log(openTasks);
            console.log(currentTask);
            res.render('index', {
              title: 'Taskmaster',
              name: req.session.user.username,
              tasks: doc,
              currentTask: currentTask,
              openTasks: openTasks,
              start: startReadable,
              finish: finishReadable
            });
          }
        });
			}
			// user did not exist in db; create new one
			else if (!foundUser || !foundUser.length) {
				var new_user = new User({user_id: user.id,
					                     username: user.first_name,
					                     owned_tasks: [],
                               current_task: {}
					                 });
				new_user.save(function(err) {
					if(err) {console.log(err)}
					else {
						req.session.user = new_user;
						console.log("New User: ", req.session.user.username);
						console.log("User saved");
            console.log(req.user);
            var hamster
            res.render('index', {
              title: 'Taskmaster',
              name: req.session.user.username,
              currentTask: hamster,
              openTasks: 0,
              tasks: [],
              start: 0,
              finish: 0
						});
            Task.find({creator: req.session.gerbil, status: "complete"},function(err,doc){
              if(err){
                console.log(err);
              }
              else{
                res.render('index', {
                  title: 'Taskmaster',
                  name: req.session.user.username,
                  tasks: doc
                });
              }
            });
					}
				});
			}
		});
	}
  });
}

exports.login = function(req, res){
  res.render('login', {title: 'Taskmaster'})
}

exports.newtask = function(req, res){
  console.log("task name: ", req.body.taskName);
  console.log("duration (ms): ", req.body.duration);
  console.log("keywords", req.body.keywords);
  console.log("Facebook ID: ", req.session.gerbil);
  var dat = new Date();
  var now = dat.getTime();
  var durMS = parseInt(req.body.duration) * 60000;
  var task = new Task({ creator: req.session.gerbil, name: req.body.taskName, date: now,
    duration: durMS, score: [], scoretime: [], comment: "", keywords: req.body.keywords, sum: 0, status: "open", URLs: []});
  task.score[0] = 0;
  task.scoretime[0] = 0;
  task.save(function (err, task) {
    if(err) {
      console.log("Error saving new task");
    }
    res.send("YEAAAAA");
  });
}

exports.current_ext = function(req,res) {
  res.send(true);
}

exports.checkTask = function(req,res) {
  console.log("Checking for open task...");
  console.log(req.body);
  Task.findOne({creator: parseInt(req.body.fbID), status: "open"}, function(err,doc) {
    console.log(err);
    console.log(doc);
    if(err){
      console.log("Error finding open task.");
    }
    if(doc){
      var newscore = parseFloat(req.body.scoreIncr);
      var newsum = 0;
      doc.score.push(newscore);
      for (var i = 0; i < doc.score.length; i++) {
        newsum += parseFloat(doc.score[i]);
      }
      doc.sum = newsum;
      
      var timeElapsed = req.body.time - doc.date;
      doc.scoretime.push(timeElapsed);
      if(timeElapsed >= doc.duration){
        doc.status = "complete";
        console.log("Task complete.");
      }
      
      doc.URLs.push(req.body.url);
      
      doc.save(function (err) {
        if(err){
          console.log("Error updating task status.");
        }
        else{
          console.log("Successfully updated task.");
        }
      });
      
      if(timeElapsed < doc.duration){
        res.send(doc.duration - timeElapsed);
      }
      if(timeElapsed >= doc.duration){
        res.send("Task complete.");
      }
    }
  })
}

exports.abandon = function(req,res) {
  Task.findOne({creator: req.session.gerbil, status: "open"}).exec(function (err, task) {
    if (err)
      console.log(err)
    else
      task.status = "complete";
      task.save(function(err){
        if(err)
          console.log(err);
      });
      res.send("Task abandoned.");
  });
}

exports.review = function(req,res) {
  Task.findOne({creator: req.session.gerbil, URLs: req.body.URLs}).exec(function (err, task) {
    if (err)
      console.log(err)
    else
      res.render('review', {urls: task.URLs});
  });
}

exports.checkoff = function(req,res) {
  Task.findOne({creator: req.session.gerbil, URLs: req.body.oldURLs}).exec(function (err, task) {
    if (err)
      console.log(err)
    else
      task.URLs = req.body.newURLs;
      task.save(function (err) {
        if(err){
          console.log("Error updating URL list.");
        }
        else{
          res.send("Successfully updated URLs.");
        }
      });
  });
}

exports.getwords = function(req,res) {
  Task.findOne({creator: req.body.fbID, status: "open"}, function(err,task) {
    if(err)
      console.log(err);
    if(task)
      res.send(task.keywords);
  });
}
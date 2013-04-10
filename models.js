/**
 * Models
 */

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/recall');

var userSchema = mongoose.Schema({
    username: String,
    owned_tasks: Array,
    user_id: Number
})

var taskSchema = mongoose.Schema({
	creator: Number,
  name: String,
	date: Number,
	duration: Number,
  keywords: Array,
  score: Array,
  scoretime: Array,
  comment: String,
  status: String
})

var User = mongoose.model('User', userSchema);
var Task = mongoose.model ('Task', taskSchema);

exports.User = User;
exports.Task = Task;


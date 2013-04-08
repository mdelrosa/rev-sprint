/**
 * Models
 */

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/recall');

var userSchema = mongoose.Schema({
    username: String,
    owned_tasks: Array,
    user_id: String
})

var taskSchema = mongoose.Schema({
	creator: String,
	date: String,
	duration: Number,
    keywords: Array,
    score: Number,
    comment: String
})

var User = mongoose.model('User', userSchema);
var Task = mongoose.model ('Task', userSchema);

exports.User = User;
exports.Task = Task;


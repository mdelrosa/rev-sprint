/**
 * Models
 */

 var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/recall');

var userSchema = mongoose.Schema({
    username: String,
    owned_tasks: Object,
    user_id: String
})

var User = mongoose.model('User', userSchema);
exports.User = User;


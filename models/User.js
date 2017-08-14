var mongoose     = require('mongoose'),
    Schema       = mongoose.Schema;

var userSchema   = new mongoose.Schema({
    userName: { type:  Schema.Types.String, required: false },
    email: { type:  Schema.Types.String, required: false },
    password: { type:  Schema.Types.String, required: true },
    mobileNo: { type:  Schema.Types.String, required: true }
});

module.exports = mongoose.model('User', userSchema,'Users');
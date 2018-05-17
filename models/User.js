//models/Expense.js
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String},
    isVerified: {type: Boolean, default: false}
});




module.exports = mongoose.model('User', userSchema);
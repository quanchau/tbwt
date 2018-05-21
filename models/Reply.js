var mongoose = require('mongoose');

var Schema = mongoose.Schema;


const replySchema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    _questionId: {type: mongoose.Schema.Types.ObjectId, required: true, ref:'Question'},
    reply_content: {type: String, required: true, default:''},

    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});



module.exports = mongoose.model('Reply', replySchema);
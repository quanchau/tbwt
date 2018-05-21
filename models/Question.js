var mongoose = require('mongoose');

var Schema = mongoose.Schema;


const questionSchema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    question_content: {type: String, required: true, default:''},
    _categoryId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Category' }
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});



module.exports = mongoose.model('Question', questionSchema);
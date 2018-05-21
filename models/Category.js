var mongoose = require('mongoose');

var Schema = mongoose.Schema;


const categorySchema = new mongoose.Schema({
    category_name: {type: String, required: true, default:'Other'},
});



module.exports = mongoose.model('Category', categorySchema);
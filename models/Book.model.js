var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
    title: String,
    author: String,
    postYear: Number
});

var Book = mongoose.model('Book', BookSchema);
module.exports = Book;
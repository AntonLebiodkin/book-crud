var mongoose = require('mongoose');
var db = 'mongodb://127.0.0.1/books';
mongoose.connect(db);
console.log(db + ' connected!');
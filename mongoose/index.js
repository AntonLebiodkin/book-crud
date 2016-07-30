var mongoose = require('mongoose');
var db = 'mongodb://localhost/books';
mongoose.connect(db);
console.log(db + ' connected!');
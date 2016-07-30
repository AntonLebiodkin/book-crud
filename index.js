
//APP
var express = require('express'),
    app = express(),
    db = require('./mongoose/index');
    mongoose = require('mongoose');

//MODELS

var models = require('./models/index'),
    Book = models.bookModel;

//LIBS
var jade = require('jade'),
    bodyParser = require('body-parser');

var port = 3000;

app.set('view-engine', jade);
app.set('views', './views');

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(port, function(){
    console.log("Server is running on *:" + port);
});

//API ROUTES SETTING
app.get('/', function(req, res){
    res.render('index.jade');
});

app.get('/books', function(req, res){
    Book.find(function(err, books){
        res.send(JSON.stringify(books));
    });

});
app.put('/add-book', function(req, res){
    var title = req.body.title.toLowerCase(),
        author = req.body.author.toLowerCase(),
        postYear = req.body.postYear;

    Book.find({
        title: title,
        author: author,
        postYear: postYear
    }, function(err, books){
        var saved = false;
        if (books.length == 0){
            var book = new Book({
                title: title,
                author: author,
                postYear: postYear
            });
            book.save();
            saved = true;
        }
        res.send(saved);
    });
});

app.post('/edit-book', function(req, res){
    console.log("EDITING");
    var id = req.body.id,
        title = req.body.new_title.toLowerCase(),
        author = req.body.new_author.toLowerCase(),
        postYear = req.body.new_postYear;
    Book.find({_id: id}, function(err, book){
        book.title = title;
        book.author = author;
        book.postYear = postYear;
        book.save();
    })
});

app.delete('/delete-book', function(req, res){
    var bookID = req.body.id;
    console.log("REMOVED");
    Book.find({_id: bookID}).remove().exec();
});



/**
 * Created by root on 29.07.16.
 */
$(document).ready(function(){
    loadBooks();
});

function loadBooks(){
    $('#books').empty();
    $.ajax({
        url:'/books',
        method: 'GET',
        success: function(data){
            console.log(data);
            var books = JSON.parse(data);
            $.each(books, function(index, book){
                $('#books').append('' +
                    '<div class="book-item well">' +
                        '<ul>' +
                            '<li><h3>Title: </h3><h4 class="title">'+book.title+'</h4>' +
                            '<li><h3>Author: </h3><h4 class="author">'+book.author+'</h4></li>' +
                            '<li><h3>Post Year: </h3><h4 class="postYear">'+book.postYear+'</h4></li>' +
                            '<li hidden><p class="id">'+book._id+'</p></li>' +
                        '</ul>' +
                        '<button class="btn btn-warning edit-book pull-right" data-toggle="modal" data-target="#edit_modal">Edit</button>'+
                        '<button class="btn btn-danger delete-book pull-right">Delete</button>'+
                    '</div>'
                );
            });
            $(".edit-book").click(function(){
                var book = $(this).parent(),
                    title = book.find(".title").text(),
                    author = book.find(".author").text(),
                    postYear = book.find(".postYear").text(),
                    id = book.find(".id").text();
                $('#edit_modal')
                    .find('#edit-title').val(title).end()
                    .find('#edit-author').val(author).end()
                    .find('#edit-postYear').val(postYear).end()
                    .find('#edit-id').text(id).end();
            });
            $(".delete-book").click(function(){
                var book = $(this).parent(),
                    id = book.find(".id").text();
                book.remove();
                $.ajax({
                    url: '/delete-book',
                    method: 'DELETE',
                    data: {id: id},
                })
            })
        }
    })
}



$("#add-book-form").submit(function(){
    var book = $(this);
    $.ajax({
        url: '/add-book',
        method: 'PUT',
        data: book.serialize(),
        success: function(saved){
            var saved = !!saved;
            if (!saved){
                $('#exist-error').text("Book already exist");
            } else {
                $('#save-success').text("Saved");
                loadBooks();
            }
            console.log("SAVED " + saved);
        }
    });
});

$("#edit-book-form").submit(function(){
    var new_book = $(this).parent(),
        current_id = new_book.find("#edit-id").text(),
        new_title = new_book.find("#edit-title").text(),
        new_author = new_book.find('#edit-author').val(),
        new_postYear = new_book.find('#edit-postYear').val();
    console.log("CUR ID " + current_id + new_title);
    $.ajax({
        url: '/edit-book',
        method: 'POST',
        data: {
            id: current_id,
            new_title: new_title,
            new_author: new_author,
            new_postYear: new_postYear
        },
        success: loadBooks()
    })

});

function deleteBook(){

}

function editBook(){

}

$("#add").click(function(){
    clearAddForm();
});
function clearAddForm(){
    $("input[type=text]").val("");
    $("#exist-error").text("");
    $('#save-success').text("")
}
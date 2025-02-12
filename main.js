/* eslint-disable prefer-arrow-callback */
/* eslint-disable object-shorthand */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

var books = [];

var renderBooks = function () {
  $('.books').empty();

  for (var i = 0; i < books.length; i++) {
    var source = $('#book-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template(books[i]);

    $('.books').append(newHTML);
  }
};

var addBooks = function (data) {
  for (var i = 0; i < data.items.length; i++) {
    var book = {
      title: data.items[i].volumeInfo.title || null,
      author: data.items[i].volumeInfo.authors
        ? data.items[i].volumeInfo.authors[0]
        : null,
      imageURL: data.items[i].volumeInfo.imageLinks
        ? data.items[i].volumeInfo.imageLinks.thumbnail
        : null,
      isbn: data.items[i].volumeInfo.industryIdentifiers
        ? data.items[i].volumeInfo.industryIdentifiers[0].identifier
        : null,
      pageCount: data.items[i].volumeInfo.pageCount || null,
    };
    books.push(book);
  }
  renderBooks();
};

var fetch = function (query) {
  $.ajax({
    method: 'GET',
    url: 'https://www.googleapis.com/books/v1/volumes?q=' + query,
    dataType: 'json',
    success: function (data) {
      addBooks(data);
      $('.loading-img').css('display', 'none');
      $('.results-header').css('display', 'block');
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    },
  });
};

$('.search').on('click', function () {
  $('.loading-img').css('display', 'block');
  var searchValue = $('#search-query').val();
  fetch(searchValue);
});

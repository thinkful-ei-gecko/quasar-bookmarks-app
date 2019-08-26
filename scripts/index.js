'use strict';

const index = (function() {


  api.getBookmarks()
    .then(res => res.json())
    .then(bookmarkArray => {
      bookmarkArray.forEach( bookmark => {
        STORE.addBookmark(bookmark);
        console.log(bookmark);
      });
      bookmarks.render();
    });

  bookmarks.bindEventListeners();
  bookmarks.render();



}());


$(index);

// $(document).ready(function() {
//   bookmarks.handleClickMenu();

// });
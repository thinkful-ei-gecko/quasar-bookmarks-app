'use strict';

const index = (function() {

  api.getBookmarks()
    .then(bookmarkArray => {
      bookmarkArray.forEach( bookmark => {
        console.log(bookmark);
        STORE.addBookmark(bookmark);
        bookmarks.render();
      });
    })
    .catch(err => console.log(err.message));
  bookmarks.bindEventListeners();

}());


$(index);

// $(document).ready(function() {
//   bookmarks.handleClickMenu();

// });
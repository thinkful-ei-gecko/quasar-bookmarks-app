'use strict';

const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/quasar';

  const getBookmarks = function() {
    return fetch(`${BASE_URL}/bookmarks`);
  };

  const createBookmark = function(bookmark) {
    return fetch(`${BASE_URL}/bookmarks`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: bookmark
    })
      .then(res => {
        return res.json();
      })
      .then((serverBookmark) => {
        STORE.addBookmark(serverBookmark);
        bookmarks.render();
      });
  };

  const updateBookmark = function(id, updateData) {
    return fetch(`${BASE_URL}/bookmarks/${id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updateData)
    });
      // .then(res => res.json())
      // .then(())
  };

  const deleteBookmark = function(id) {
    return fetch(`${BASE_URL}/bookmarks/${id}`, {
      method: 'DELETE'})
      .then(res=>res.json())
      .then(json => {
        STORE.removeBookmark(id);
        bookmarks.render();
      });
  };

  return {
    getBookmarks,
    createBookmark,
    updateBookmark,
    deleteBookmark
  };

}());
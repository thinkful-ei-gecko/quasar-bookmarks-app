'use strict';

const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/quasar';

  const getBookmarks = function() {
    return fetch(`${BASE_URL}/bookmarks`);
  };

  const createBookmark = function() {

  };

  const updateBookmark = function() {

  };

  const deleteBookmark = function() {

  };

  return {
    getBookmarks,
    createBookmark,
    updateBookmark,
    deleteBookmark
  };

}());
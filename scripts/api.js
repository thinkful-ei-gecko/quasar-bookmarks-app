'use strict';

const api = (function() {
  
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/quasar';


  /**
   * bookmarkApiFetch - wrapper function for native 'fetch' to standardize error handling
   */
  const bookmarkApiFetch = function (...args) {
    let error;
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
        // if response is not 2xx, start building error object
          error = { code: res.status };

          // if response is not JSON type, place status text in error object and 
          // immediately reject promise
          if (!res.headers.get('content-type').includes('json')) {
            error.message = res.statusText;
            return Promise.reject(error);
          }
        }
        return res.json();
      })
      .then (data => {
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }

        return data;
      });
  };

  /**
   * get bookmarks
   */
  const getBookmarks = function() {
    return bookmarkApiFetch(`${BASE_URL}/bookmarks`);
  };

  /**
   * 
   * @param {object} bookmark object
   */
  const createBookmark = function(bookmark) {
    return bookmarkApiFetch(`${BASE_URL}/bookmarks`, {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: bookmark
    });
  };

  /**
   * 
   * @param {id} id of object wanting to update
   * @param {object} updateData object containing key/value pairs that will be updated
   */
  const updateBookmark = function(id, updateData) {
    return bookmarkApiFetch(`${BASE_URL}/bookmarks/${id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: updateData
    });
  };

  /**
   * 
   * @param {id} id object id
   */
  const deleteBookmark = function(id) {
    return bookmarkApiFetch(`${BASE_URL}/bookmarks/${id}`, {
      method: 'DELETE'});
  };

  return {
    getBookmarks,
    createBookmark,
    updateBookmark,
    deleteBookmark
  };

}());
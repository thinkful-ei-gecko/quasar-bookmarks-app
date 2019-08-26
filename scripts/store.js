'use strict';

const STORE = (function() {

  let bookmarkList = [
    // {id: cuid(), title: 'Sample 1', url: 'www.google.com', 
    // desc: 'sample site 1', rating: 5, favicon: '', expanded: false},
  ];

  let adding = false;
  let editing = false;
  let editingID = '';
  let showError = false;
  let optionsExpanded = false;

  const addBookmark = function(bookmark) {
    this.bookmarkList.push(bookmark);
  };

  const getBookmark = function() {

  };

  const removeBookmark = function(id) {
    this.bookmarkList = this.bookmarkList.filter(item => item.id !== id);
  };

  const updateBookmark = function() {

  };



  return {
    bookmarkList,
    adding,
    editing,
    editingID,
    showError,
    optionsExpanded,

    addBookmark,
    getBookmark,
    removeBookmark,
    updateBookmark
  };



}());
'use strict';

const STORE = (function() {

  let bookmarks = [
    {id: cuid(), title: 'Sample 1', link: 'www.google.com', description: 'sample site 1', rating: 5, favicon: '', expanded: false},
    {id: cuid(), title: 'Sample 2', link: 'www.bing.com', description: 'sample site 2', rating: 2, favicon: '', expanded: true},
    {id: cuid(), title: 'Sample 3', link: 'www.cryengine.com', description: 'sample site 3', rating: 1, favicon: '', expanded: false},
    {id: cuid(), title: 'Sample 4', link: 'www.artstation.com', description: 'sample site 4', rating: 3, favicon: '', expanded: false},
    {id: cuid(), title: 'Sample 5', link: 'www.sketchfab.com', description: 'sample site 5', rating: 4, favicon: '', expanded: false}
  ];

  let adding = false;
  let editing = false;
  let showError = false;

  const addBookmark = function() {
    this.bookmarks.push();
  };

  const removeBookmark = function() {
    this.items = 
  };

  return {
    bookmarks,
    adding,
    editing,
    showError
  };



}());
'use strict';

const STORE = (function() {

  let bookmarkList = [
    {id: cuid(), title: 'Sample 1', url: 'www.google.com', desc: 'sample site 1', rating: 5, favicon: '', expanded: false},
    {id: cuid(), title: 'Sample 2', url: 'www.bing.com', desc: 'sample site 2', rating: 2, favicon: '', expanded: true},
    {id: cuid(), title: 'Sample 3', url: 'www.cryengine.com', desc: 'sample site 3', rating: 1, favicon: '', expanded: false},
    {id: cuid(), title: 'Sample 4', url: 'www.artstation.com', desc: 'sample site 4', rating: 3, favicon: '', expanded: false},
    {id: cuid(), title: 'Sample 5', url: 'www.sketchfab.com', desc: 'sample site 5', rating: 4, favicon: '', expanded: false}
  ];

  let adding = false;
  let editing = false;
  let showError = false;

  const addBookmark = function() {
    this.bookmarkList.push();
  };

  const removeBookmark = function(id) {
    this.bookmarkList = this.bookmarkList.filter(item => item.id !== id);
  };

  

  return {
    bookmarkList,
    adding,
    editing,
    showError
  };



}());
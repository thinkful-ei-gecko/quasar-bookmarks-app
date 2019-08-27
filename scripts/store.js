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
  let filter = '';
  let faviconArray = [];

  const addBookmark = function(bookmark) {
    bookmark.favicon = getFavicon(bookmark.url);
    this.bookmarkList.push(bookmark);
    // let favReturn = alternateGetFavicon(bookmark.url, bookmark)
    //   .then( favObj => {
    //     bookmark.favicon = favObj.src;
    //     // console.log(`fav return: ${Object.keys(favObj)}`);
        

    //   });

    // console.log(`${Object.keys(favObject)}`);

    // bookmark.favicon = favObject.icons.find( item => item.src.endsWith('png'));

    // console.log(bookmark.favicon);


  };

  const getBookmark = function() {

  };

  const removeBookmark = function(id) {
    this.bookmarkList = this.bookmarkList.filter(item => item.id !== id);
  };

  const updateBookmark = function() {

  };

  const getFavicon = function(url) {
    // return `https://api.statvoo.com/favicon/?url=${url}`;
    const shortenedURL = url.substring(9);
    return `https://api.statvoo.com/favicon/?url=${url}`;
  };

  const alternateGetFavicon = function(url, bookmark) {
    const favEndpoint = 'http://favicongrabber.com/api/grab';
    let hostname = (new URL(url)).hostname;
    console.log(hostname);
    let tempFavicon;

    return fetch(`${favEndpoint}/${hostname}`)
      .then(res => {
        // console.log(res);
        return res.json();
      })
      .then(json => {
        // console.log(json);
        //json.icons.forEach(item => console.log(`${hostname} favicon: ${item.src}`));
        tempFavicon = json.icons.find( item => item.src.endsWith('png'));
        if (!tempFavicon) {
          tempFavicon = json.icons.find( item => item.src.endsWith('ico'));
        }
       return tempFavicon;
      });

    // return faviconObject;

  };



  return {
    bookmarkList,
    adding,
    editing,
    editingID,
    showError,
    optionsExpanded,
    filter,

    addBookmark,
    getBookmark,
    removeBookmark,
    updateBookmark,
    getFavicon
  };



}());
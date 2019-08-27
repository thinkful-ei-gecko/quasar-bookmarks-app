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


  /**
   * 
   * @param {object} bookmark object we want to add to our STORE
   *  - pushes bookmark to STORE
   *  - calls one of the get Favicon functions 
   *    - add favicon to object before pushing
   */
  const addBookmark = function(bookmark) {
    bookmark.favicon = getFavicon(bookmark.url);
    this.bookmarkList.push(bookmark);
    
    // let favReturn = alternateGetFavicon(bookmark.url, bookmark)
    //   .then( favObj => {
    //     bookmark.favicon = favObj.src;
    //     this.bookmarkList.push(bookmark);
    //   });

    // this.bookmarkList.push(bookmark);

    // console.log(`${Object.keys(favObject)}`);

    // bookmark.favicon = favObject.icons.find( item => item.src.endsWith('png'));

    // console.log(bookmark.favicon);
  };

  const getBookmark = function() {

  };

  /**
   * 
   * @param {id} id 
   *  - remove object matching id from array
   */
  const removeBookmark = function(id) {
    this.bookmarkList = this.bookmarkList.filter(item => item.id !== id);
  };

  const updateBookmark = function() {

  };

  /**
   * FAVICON
   * @param {url} url you name it
   */
  const getFavicon = function(url) {
    // return `https://api.statvoo.com/favicon/?url=${url}`;
    // https://www.google.com/s2/favicons?domain=
    
    let hostname = (new URL(url)).hostname;
    return `https://api.faviconkit.com/${hostname}/144`;
  };

  /**
   * FAVICON
   * @param {url} url you name it
   */
  const anotherGetFavicon = function(url) {
    let hostname = (new URL(url)).hostname;
    console.log(hostname);
    return `${hostname}/favicon.ico`;
  };

  /**
   * FAVICON
   * @param {url} url you name it
   */
  const alternateGetFavicon = function(url, bookmark) {
    const favEndpoint = 'http://favicongrabber.com/api/grab';
    let hostname = (new URL(url)).hostname;
    console.log(hostname);
    let tempFavicon;

    return fetch(`${favEndpoint}/${hostname}`)
      .then(res => res.json())
      .then(json => {
        // console.log(json);
        //json.icons.forEach(item => console.log(`${hostname} favicon: ${item.src}`));
        tempFavicon = json.icons.find( item => item.src.endsWith('png'));
        if (!tempFavicon) {
          tempFavicon = json.icons.find( item => item.src.endsWith('ico'));
        }
        return tempFavicon;
      });
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
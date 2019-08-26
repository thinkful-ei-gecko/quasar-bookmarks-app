'use strict';

const bookmarks = (function() {

  function generateAddBookmark() {
    let addWindow = `
      <section class='add-bookmark js-add-bookmark'>
        <form>
          <fieldset>
            <legend>Add Bookmark</legend>
            <label for='title-input'>Title
              <input type='text' name='title' id='title-input' required></input>
            </label>
            <label for='url-input'>URL
              <input type='text' name='url' id='url-input' required></input>
            </label>
          </fieldset>
          <input type='submit' class='js-submit' value='Submit'></input>
        </form>
      </section>
      `;
  }

  const generateBookmarkHTML = function(item) {
    console.log(`generate html item url = ${item.url}`);
    let bookmarkHTML = `
      <li class='bookmark-item'>
        <div class='bookmark-favicon bookmark-section'>A</div>
        <button class='js-bookmark-title bookmark-title bookmark-section'><h2>${item.title}</h2></button>
        <button class='bookmark-rating bookmark-section stars' style="--rating: 4;" aria-label="Rating of this product is 2.3 out of 5."></button>

        <!-- <div class'bookmark-section menu-group'> -->
        <ul class='js-options-list options-list bookmark-section'>
          <li class='js-options-edit-item options-list-item'><button >Edit</button></li>
          <li class='js-options-delete-item options-list-item'><button >Delete</button></li>
        </ul> 

        <button class='bookmark-options bookmark-section' value="5">
          <div class='menu-dot'></div>
          <div class='menu-dot'></div>
          <div class='menu-dot'></div>
        </button>
      <!-- </div> -->

        <div class='js-bookmark-body bookmark-body bookmark-section'>
          <a href='${item.url}'>${item.url}</a>
          <h3>Description:</h3>
          <p>${item.desc}</p>
        </div>
      </li>`;
    return bookmarkHTML;
  };

  const generateAllBookmarksHTML = function(bookmarksList) {
    const bookmarks = bookmarksList.map((item) => generateBookmarkHTML(item));
    return bookmarks.join('');
  };

  const render = function() {
    let items = [...STORE.bookmarkList];

    console.log(`items: ${items}`);
    console.log(`item 1 = ${items[0].title}`);
    
    const bookmarksString = generateAllBookmarksHTML(items);
    console.log(`bookmarksString: ${bookmarksString}`);

    $('#js-bookmarks-ul').html(bookmarksString);

  };



  const toggleBookmark = function() {

  };

  // expands options menu when clicked on
  const handleClickMenu = function() {
    $('#js-bookmarks-ul').on('click', '.bookmark-options', e => {
      console.log('menu clicked');
      // $(e.currentTarget).siblings('.js-options-list').toggleClass('hidden');
      $(e.currentTarget).siblings('.js-options-list').toggleClass('expanded');
    });

  };

  const handleMenuLoseFocus = function() {
    // $('#js-bookmarks-ul').on('focusout', '.bookmark-options', e => {

    //   $('#js-bookmarks-ul').on('click', '.js-options-delete-item', e => {
    //     console.log('delete item clicked');
    //   });
    //   // $(e.currentTarget).siblings('.js-options-list').toggleClass('hidden');
    //   $(e.currentTarget).siblings('.js-options-list').removeClass('expanded');
    // });
  };

  // handles deleting bookmark when click on 'delete' button
  const handleClickDeleteMenu = function() {
    $('#js-bookmarks-ul').on('click', '.js-options-delete-item', e => {
      console.log('delete item clicked');
    });
  };

  const expandBookmark = function() {

  };

  // expand descriptions when click on bookmark title
  const handleClickExpand = function() {
    $('#js-bookmarks-ul').on('click', '.js-bookmark-title', e => {
      console.log('title clicked');
      $(e.currentTarget).siblings('.js-bookmark-body').toggleClass('expanded');
    });
  };

  // submit bookmark creates new bookmark with api
  const handleSubmitBookmark = function() {
    $('#add-bookmark-form').on('submit', e => {
      e.preventDefault();

      console.log('adding bookmark');
      const newTitle = $('#title-entry').val();
      const newURL = $('#url-entry').val();
      console.log(`new title: ${newTitle}`);
      console.log(`new url: ${newURL}`);
      $('#title-entry').val('');
      $('#url-entry').val('');

      api.createBookmark({ 'title': newTitle, 'url': newURL});
    }); 
  };

  // handles css change style/appearance for 'add bookmark' button
  const handleAddButtonClick = function() {
    $('.js-add-bookmark-button').on('click', e => {
      console.log('add button clicked');
      $(e.currentTarget).toggleClass('active');
    });
  };



  const bindEventListeners = function() {
    handleClickMenu();
    handleClickExpand();
    handleClickDeleteMenu();
    handleMenuLoseFocus();
    handleSubmitBookmark();
    handleAddButtonClick();
  };



  return {
    bindEventListeners,
    render
  };


}());
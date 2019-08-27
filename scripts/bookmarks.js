'use strict';

const bookmarks = (function() {

  // unused
  function generateAddBookmark() {
    let addWindow = `
    <form id='add-bookmark-form'>
      <fieldset>
        <legend class='add-bookmark-legend'><h2>Add Bookmark</h2></legend>
        <label for='title-entry' class='title-entry-label'>Title
          <input type='text' name='title' id='title-entry' required/>
        </label>
        <label for='url-entry' class='url-entry-label'>URL
          <input type='url' name='url' id='url-entry' required/>
        </label>
        <div class='flex-break'></div>
        <label for='desc-entry' class='desc-entry-label'>Description
          <textarea rows="4" name='desc' id='desc-entry'required> </textarea>
        </label>
        <div class='flex-break-column'></div>
        <fieldset id='rating-fieldset'>
          <legend class='rating-legend'>Rating</legend>
          <div class='star-div-width-limiter'>
            <div class='star-div'>
              <input type='radio' style="--rating: 1;" id='rating-5' class='js-star-entry' name='rating' value='5'><span></span></input>
              <input type='radio' style="--rating: 2;" id='rating-4' class='js-star-entry' name='rating' value='4'><span></span></input>
              <input type='radio' style="--rating: 3;" id='rating-3' class='js-star-entry' name='rating' value='3'/><span></span></input>
              <input type='radio' style="--rating: 4;" id='rating-2' class='js-star-entry' name='rating' value='2'/><span></span></input>
              <input type='radio' style="--rating: 5;" id='rating-1' class='js-star-entry' name='rating' value='1'/><span></span></input>
            </div>
          </div>
        </fieldset>
      </fieldset>
      <input type='submit' value='Submit' class='add-bookmark-form-button' />
      <input type='reset' value='Cancel' class='add-bookmark-form-button'/>
    </form>
      `;
  }

  const generateBookmarkHTML = function(item) {

    let isExpanded = '';
    let isOptionsExpanded = '';
    let editSaveButtonClass = 'js-edit-button';
    let editSaveButtonText = 'Edit';
    let editSaveButtonType = 'button';


    let bookmarkTitle = `
      <button class='js-bookmark-title bookmark-title bookmark-section'>
      <h2>${item.title}</h2></button>`;

    let bookmarkURL = `
      <a href='${item.url}'>${item.url}</a>
      `;

    let bookmarkDescription = `
      <p>${item.desc}</p>
      `;

    if (STORE.editing && item.id === STORE.editingID) {
      bookmarkTitle = `
        <form class='js-edit-bookmark js-edit-title bookmark-title bookmark-section js-bookmark-title'>
          <input type='text' value='${item.title}' />
        </form>
      `;

      bookmarkURL = `
        <form class='js-edit-bookmark js-edit-url'>
          <input type='text' value='${item.url}' />
        </form>
      `;

      bookmarkDescription = `
        <form class='js-edit-bookmark js-edit-description'>
          <input type='text' value='${item.desc}' />
        </form>
      `;

      isExpanded = 'expanded';
      editSaveButtonClass = 'js-save-button';
      editSaveButtonText = 'Save';
      editSaveButtonType = 'submit';

      STORE.optionsExpanded ? isOptionsExpanded = 'expanded' : isOptionsExpanded = '';
    }
    
    let bookmarkHTML = `
      <li class='bookmark-item' data-item-id='${item.id}'>
        <div class='bookmark-favicon bookmark-section'>A</div>
        ${bookmarkTitle}
        <button class='bookmark-rating bookmark-section stars' style="--rating: ${item.rating};" aria-label="Rating of this product is ${item.rating} out of 5."></button>

            <div class='js-options-container bookmark-section bookmark-options-container'>
              <div class='js-options-list options-list bookmark-section ${isOptionsExpanded}'>
                <button type='${editSaveButtonType}' class='${editSaveButtonClass} options-list-item'>${editSaveButtonText}</button>
                <button class='js-delete-button options-list-item'>Delete</button>
              </div> 
      
              <button class='bookmark-options bookmark-section' value="5">
                <div class='menu-dot'></div>
                <div class='menu-dot'></div>
                <div class='menu-dot'></div>
              </button>
            </div>

        <div class='js-bookmark-body bookmark-body bookmark-section ${isExpanded}'>
          ${bookmarkURL}
          <h3>Description:</h3>
          ${bookmarkDescription}
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
    let filteredItems = [];

    if(STORE.filter) {
      items = items.filter( item => item.rating >= STORE.filter);
    }
    const bookmarksString = generateAllBookmarksHTML(items);
    if (!items.length) {
      renderSadFace();
    } else {
      $('#js-bookmarks-ul').html(bookmarksString);
    }
  };

  const renderSadFace = function() {
    console.log('no bookmarks sadface');

    // $('.js-bookmarks').html('<h2>(T＿T)</h2>');
    let sadface = `
    <li class='sadface'><h2>o(╥﹏╥)o</h2></li>
    <li class='sadface'><h4>NO BOOKMARKS </h4></li>`;
    $('#js-bookmarks-ul').html(sadface);
  };



  const toggleBookmark = function() {

  };

  // expands options menu when clicked on
  const handleClickMenu = function() {
    $('#js-bookmarks-ul').on('click', '.bookmark-options', e => {
      console.log('menu clicked');
      STORE.optionsExpanded = !STORE.optionsExpanded;
      // $(e.currentTarget).siblings('.js-options-list').toggleClass('hidden');
      $(e.currentTarget).siblings('.js-options-list').toggleClass('expanded');
      // if ($(e.currentTarget).hasClass('expanded'))
      // {
      //   STORE.optionsExpanded = true;
      // }
    });

  };

  const handleMenuLoseFocus = function() {
    $('#js-bookmarks-ul').on('blur', '.js-options-container', e => {
      // $(e.currentTarget).find('.js-options-list').removeClass('expanded');

    });
  };

  // handles deleting bookmark when click on 'delete' button
  const handleClickDeleteMenu = function() {
    $('#js-bookmarks-ul').on('click', '.js-delete-button', e => {
      console.log('delete item clicked');
      STORE.optionsExpanded = false;
      const id = getItemIdFromElement(e.currentTarget);
      api.deleteBookmark(id);
      
    });
  };

  // handle click edit button - change elements to form so editable and re-render
  const handleClickEditMenu = function() {
    $('#js-bookmarks-ul').on('click', '.js-edit-button', e => {
      console.log('editing item lone function');
      console.log(`class of item is ${$(e.currentTarget).attr('class')}`);
      const id = getItemIdFromElement(e.currentTarget);

      // then change edit button to save button (if STORE.editing === true, add save class, remove edit class))
      STORE.editing = true;
      STORE.editingID = id;

      render();
      
    });
  };

  const saveChanges = function() {

  };


  // handle click on 'save' when editing bookmark
  const handleClickSaveMenu = function() {
    $('#js-bookmarks-ul').on('click', '.js-save-button', e => {
      console.log('saving item');
      const id=getItemIdFromElement(e.currentTarget);

      STORE.editing = false;
      const saveID = STORE.editingID;
      STORE.editingID = '';
      saveChanges();
      render();

    });
  };

  const getItemIdFromElement = function(item) {
    return $(item)
      .closest('.bookmark-item')
      .data('item-id');
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

  const serializeJson = function(form) {
    const formData = new FormData(form);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    return JSON.stringify(o);
  };

  // submit bookmark creates new bookmark with api
  const handleSubmitBookmark = function() {
    $('#add-bookmark-form').on('submit', e => {
      e.preventDefault();

      let formElement = $('#add-bookmark-form')[0];
      console.log(`adding bookmark: ${serializeJson(formElement)}`);
      // const newTitle = $('#title-entry').val();
      // const newURL = $('#url-entry').val();
      // console.log(`new title: ${newTitle}`);
      // console.log(`new url: ${newURL}`);

      api.createBookmark(serializeJson(formElement));
      $('#title-entry').val('');
      $('#url-entry').val('');
      $('#desc-entry').val('');
      $('.js-star-entry').prop('checked', false);
      
    }); 
  };



  // handles css change style/appearance for 'add bookmark' button
  const handleAddButtonClick = function() {
    $('.js-add-bookmark-button').on('click', e => {
      console.log('add button clicked');
      $(e.currentTarget).toggleClass('active');
    });
  };

  const handleToggleFilter = function() {
    $('#filter-form').on('change', '#filter-dropdown', e => {
      STORE.filter = $('#filter-dropdown').val();
      console.log(`${STORE.filter}`);
      render();
    });
  };



  const bindEventListeners = function() {
    handleClickMenu();
    handleClickExpand();
    handleClickDeleteMenu();
    handleClickEditMenu();
    handleClickSaveMenu();
    handleMenuLoseFocus();
    handleSubmitBookmark();
    handleAddButtonClick();
    handleToggleFilter();
  };



  return {
    bindEventListeners,
    render
  };


}());
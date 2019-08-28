'use strict';

const bookmarks = (function() {

  /**
   * GENERATE HTML
   * @returns {string} html string
   *  - just the 'add bookmark' form in header
   */
  const generateAddFormHTML = function() {
    let addWindow = `
      <form id='add-bookmark-form'>
        <fieldset>
          <legend class='add-bookmark-legend'><h2>Add Bookmark</h2></legend>
          
          <div class='title-url-div'>
            <label for='title-entry' class='title-entry-label entry-label'>Title
              <input type='text' name='title' id='title-entry' placeholder='Artstation' required/>
            </label>
            <label for='url-entry' class='url-entry-label entry-label'>URL
              <input type='url' name='url' id='url-entry' placeholder='https://www.artstation.com' required/>
            </label>
          </div>

          <div class='desc-rating-div'>
            <label for='desc-entry' class='desc-entry-label entry-label'>Description
              <textarea rows="4" name='desc' id='desc-entry' placeholder='A portfolio website, blog, and marketplace for artists' required> </textarea>
            </label>
            <fieldset id='rating-fieldset'>
              <legend class='rating-legend'><h3>Rating</h3></legend>
              <div class='star-div-width-limiter'>
                <div class='star-div'>
                    
                  <input aria-label='5 stars' type='radio' style="--rating: 1;" id='rating-5' class='js-star-entry' name='rating' value='5'><span></span></input>
                  <input aria-label='4 stars' type='radio' style="--rating: 2;" id='rating-4' class='js-star-entry' name='rating' value='4'><span></span></input>
                  <input aria-label='3 stars' type='radio' style="--rating: 3;" id='rating-3' class='js-star-entry' name='rating' value='3'><span></span></input>
                  <input aria-label='2 stars' type='radio' style="--rating: 4;" id='rating-2' class='js-star-entry' name='rating' value='2'><span></span></input>
                  <input aria-label='1 star' type='radio' style="--rating: 5;" id='rating-1' class='js-star-entry' name='rating' value='1'><span></span></input>
                
                </div>
              </div>
            </fieldset>
          </div>

          <div class='flex-break'></div>

          <div class='button-flex-div'>
            <input type='submit' value='Submit' class='add-bookmark-form-button' />
            <input type='reset' value='Cancel' class='add-bookmark-form-button'/>
          </div>

          <div class='error-div'>
          </div>
        </fieldset>  
      </form>
      `;

    return addWindow;
  };

  const renderError = function() {
    $('.error-div').html(`Error: ${STORE.errorMessage}`);
  };

  /**
 * RENDERS HTML
 *  - append form to header
 */
  const renderAddForm = function() {
    if ($('#add-bookmark-button').hasClass('active')) {
      $('header').append(generateAddFormHTML);
    } else {
      $('header').children().last().remove();
    }
  };

  // const removeAddForm = function() {
  // };

  /**
   * generateBookmarkHTML
   * @param {object} item takes bookmark object 
   * @returns {string} bookmarkHTML string for li element representing bookmark 
   */
  const generateBookmarkHTML = function(item) {

    let isExpanded = '';
    let isOptionsExpanded = '';
    let editSaveButtonClass = 'js-edit-button';
    let editSaveButtonText = 'Edit';
    let editSaveButtonType = 'button';
    let bookmarkHTML = '';

    item.expanded ? isExpanded = 'expanded' : isExpanded = '';

    if (item.id === STORE.optionsExpandedId && STORE.optionsExpanded) {
      isOptionsExpanded = 'expanded';
    }

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
      let radio1 = '';
      let radio2 = '';
      let radio3 = '';
      let radio4 = '';
      let radio5 = '';

      bookmarkTitle = `
      <label for='edit-title-entry' class='bookmark-title bookmark-section'>
          <input type='text' name='title' id='edit-title-entry' value='${item.title}' required></input>
      </label>
      `;

      bookmarkURL = `
          <input aria-label='Enter new URL' type='url' name='url' id='edit-url-entry' value='${item.url}' required/>
      `;

      bookmarkDescription = `
          <textarea aria-label='Enter new description' rows='3' cols='40' name='desc' id='edit-desc-entry'>${item.desc}</textarea>
      `;

      isExpanded = 'expanded';
      editSaveButtonClass = 'js-save-button';
      editSaveButtonText = 'Save';
      editSaveButtonType = 'submit';
      if (item.rating === 1) {radio1 = 'checked'; }
      if (item.rating === 2) {radio2 = 'checked'; }
      if (item.rating === 3) {radio3 = 'checked'; }
      if (item.rating === 4) {radio4 = 'checked'; }
      if (item.rating === 5) {radio5 = 'checked'; }

      bookmarkHTML = `
      <form id='edit-form'>
      <li class='bookmark-item' data-item-id='${item.id}'>
        <div class='bookmark-favicon bookmark-section'><img class='favicon-img' src=${item.favicon}/></div>
        ${bookmarkTitle}
        <div class='star-div-width-limiter-edit' style="--rating: ${item.rating};" aria-label="Rating of this bookmark is ${item.rating} out of 5.">
          <div class='star-div-edit'>
              
            <input aria-label='5 stars' type='radio' style="--rating: 1;" id='rating-5' class='js-star-entry' name='rating' value='5'${radio5}><span></span></input>
            <input aria-label='4 stars' type='radio' style="--rating: 2;" id='rating-4' class='js-star-entry' name='rating' value='4'${radio4}><span></span></input>
            <input aria-label='3 stars' type='radio' style="--rating: 3;" id='rating-3' class='js-star-entry' name='rating' value='3'${radio3}><span></span></input>
            <input aria-label='2 stars' type='radio' style="--rating: 4;" id='rating-2' class='js-star-entry' name='rating' value='2'${radio2}><span></span></input>
            <input aria-label='1 star' type='radio' style="--rating: 5;" id='rating-1' class='js-star-entry' name='rating' value='1'${radio1}><span></span></input>
          
          </div>
        </div>

            <div class='js-options-container bookmark-section bookmark-options-container'>
              <div class='js-options-list options-list bookmark-section ${isOptionsExpanded}'>
                <button aria-label='Save Changes' type='${editSaveButtonType}' class='${editSaveButtonClass} options-list-item'>${editSaveButtonText}</button>
                <button aria-label='Cancel Edit'type='button' class='js-cancel-edit-button options-list-item'>Cancel</button>
              </div> 
      
              <button type='button' class='bookmark-options bookmark-section' value="5">
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
      </li>
      </form>`;

      radio1 = '';
      radio2 = '';
      radio3 = '';
      radio4 = '';
      radio5 = '';
    } else {
      bookmarkHTML = `
      <li class='bookmark-item' data-item-id='${item.id}'>
        <div class='bookmark-favicon bookmark-section'><img class='favicon-img' src=${item.favicon}/></div>
        ${bookmarkTitle}
        <button class='js-bookmark-title bookmark-rating bookmark-section stars' style="--rating: ${item.rating};" aria-label="Rating of this bookmark is ${item.rating} out of 5."></button>

            <div class='js-options-container bookmark-section bookmark-options-container'>
              <div class='js-options-list options-list bookmark-section ${isOptionsExpanded}'>
                <button aria-label='Edit Bookmark' tabindex='0' type='${editSaveButtonType}' class='${editSaveButtonClass} options-list-item'>${editSaveButtonText}</button>
                <button aria-label='Delete Bookmark' tabindex='0' class='js-delete-button options-list-item'>Delete</button>
              </div> 
      
              <button aria-label='options' class='bookmark-options bookmark-section' value="5">
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
    }
    

    return bookmarkHTML;
  };

  /**
   * generateAllBookmarksHTML
   * @param {array} bookmarksList array of bookmark objects
   * @returns {string} all li elements as string in html representation for bookmarks
   */
  const generateAllBookmarksHTML = function(bookmarksList) {
    const bookmarks = bookmarksList.map((item) => generateBookmarkHTML(item));
    return bookmarks.join('');
  };

  /**
   * RENDER
   * returns nothing, main render function
   */
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

  /**
   * SAD FACE
   * renders sad face for no bookmarks
   */
  const renderSadFace = function() {
    console.log('no bookmarks sadface');
    let sadface = `
    <li class='sadface'><h2>༼ つ ◕_◕ ༽つ</h2></li>
    <li class='sadface'><h3>GIVE ME SOME BOOKMARKS</h3></li>`;
    $('#js-bookmarks-ul').html(sadface);
  };

  /**
   * unused so far, delete?
   */
  const toggleBookmark = function() {
  };

  // expand descriptions when click on bookmark title
  /**
   * EVENT HANDLER
   * Click Bookmark Title
   *  - expand bookmark via toggleClass 'expanded'
   *  - if STORE.editing, don't
   */
  const handleClickExpand = function() {
    $('#js-bookmarks-ul').on('click', '.js-bookmark-title', e => {
      const id = getItemIdFromElement(e.currentTarget);
      if (!STORE.editing) {
        const item = STORE.findById(id);
        item.expanded = !item.expanded;
        // $(e.currentTarget).siblings('.js-bookmark-body').toggleClass('expanded');    //originally had this for animation
      }
      render();
    });
  };

  /**
   * EVENT HANDLER
   * Click Options Menu
   *  - expands 'delete-edit' menu when clicked on, toggles class 'expanded'
   *  - don't if editing
   */
  const handleClickMenu = function() {
    $('#js-bookmarks-ul').on('click', '.bookmark-options', e => {
      const id = getItemIdFromElement(e.currentTarget);
      const oldExpandedID = STORE.optionsExpandedId;

      if (!STORE.editing) {
        if (oldExpandedID === id) {
          STORE.optionsExpanded = !STORE.optionsExpanded;
        } else {
          STORE.optionsExpandedId = id;
          STORE.optionsExpanded = true;
        }
        render();
      }
      // STORE.optionsExpanded = !STORE.optionsExpanded;
      // $(e.currentTarget).siblings('.js-options-list').toggleClass('hidden');
      // $(e.currentTarget).siblings('.js-options-list').toggleClass('expanded');
      // if ($(e.currentTarget).hasClass('expanded'))
      // {
      //   STORE.optionsExpanded = true;
      // }
    });
  };

  /**
   * EVENT HANDLER
   * Focus Out Options
   *  - hide 'delete-edit' menu when container loses focus
   *  - if 'edit' is clicked on, make sure menu stays expanded
   *  - watch out for order of render()
   */
  const handleMenuLoseFocus = function() {
    $('#js-bookmarks-ul').on('blur', '.bookmark-options', e => {
      // STORE.optionsExpandedId = undefined;
      // STORE.optionsExpanded = false;
      // render();
      // $(e.currentTarget).find('.js-options-list').removeClass('expanded');
    });
  };

  /**
   * EVENT HANDLER
   * Click Delete 
   *  - hide menu, delete api
   */
  const handleClickDeleteMenu = function() {
    $('#js-bookmarks-ul').on('click', '.js-delete-button', e => {
      STORE.optionsExpanded = false;
      const id = getItemIdFromElement(e.currentTarget);

      api.deleteBookmark(id)
        .then(() => {
          STORE.removeBookmark(id);
          render();
        })
        .catch((err) => {
          console.log(err);
          STORE.setError(err.message);
          // renderError();
        });
    });
  };


  /**
   * EVENT HANDLER
   * Click Edit Button
   *  - render editable form for item's bookmark
   *  - make sure description stays expanded (in handleClickTitle)
   */
  const handleClickEditMenu = function() {
    $('#js-bookmarks-ul').on('click', '.js-edit-button', e => {
      const id = getItemIdFromElement(e.currentTarget);

      // then change edit button to save button (if STORE.editing === true, add save class, remove edit class))
      STORE.editing = true;
      STORE.editingID = id;

      render();
    });
  };

  /**
   * Save Changes to bookmark item
   *  - send update PATCH api
   */
  const saveChanges = function() {

  };

  // handle click on 'save' when editing bookmark
  /**
   * EVENT HANDLER
   * CLick Save Button
   *  - call saveCChanges
   *  - render
   */
  const handleClickSaveMenu = function() {
    $('#js-bookmarks-ul').on('submit', '#edit-form', e => {
      e.preventDefault();
      console.log('saving item');
      const saveID = STORE.editingID;

      let formElement = $(e.currentTarget)[0];
      console.log(`updating bookmark: ${serializeJson(formElement)}`);

      const formData = new FormData(formElement);
      const o = {};
      formData.forEach((val, name) => o[name] = val);

      api.updateBookmark(saveID, serializeJson(formElement))
        .then((data) => {
          STORE.updateBookmark(saveID, o);
          console.log('local copy is updated');
          STORE.editing = false;
          STORE.editingID = '';
          render();
        })
        .catch((err) => {
          STORE.setError(err.message);
          // renderError();
        });
    });
  };

  const handleClickCancelEdit = function() {
    $('#js-bookmarks-ul').on('click', '.js-cancel-edit-button', e => {
      e.preventDefault();
      console.log('canceling');
      STORE.editing = false;
      STORE.editingID = '';
      render();
    });
  };

  /**
   * 
   * @param {element} item element from DOM
   * @returns {id} id for bookmark represented by li parent 
   *                of item element stored in data-item-id attribute
   */
  const getItemIdFromElement = function(item) {
    return $(item)
      .closest('.bookmark-item')
      .data('item-id');
  };

  /**
   * UNUSED EMPTY
   */
  const expandBookmark = function() {

  };

  /**
   * FORM SUBMISSION
   * @param {*} form form data
   * @returns {string} form data in object string representation of bookmark with relevant keys
   */
  const serializeJson = function(form) {
    const formData = new FormData(form);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    return JSON.stringify(o);
  };

  /**
   * EVENT HANDLER
   * Submit Bookmark Form
   *  - createBookmark with API
   *  - reset form
   *  - toggle active class on button
   *  - render form
   */
  const handleSubmitBookmark = function() {
    $('header').on('submit', '#add-bookmark-form', e => {
      e.preventDefault();

      let formElement = $(e.currentTarget)[0];
      console.log(`adding bookmark: ${serializeJson(formElement)}`);
      api.createBookmark(serializeJson(formElement))
        .then((newBookmark) => {
          STORE.addBookmark(newBookmark);
          render();
        })
        .catch((err) => {
          STORE.setError(err.message);
          renderError();
        });

      // toggle add button button
      $('#add-bookmark-button').toggleClass('active');
      renderAddForm();

      $('#title-entry').val('');
      $('#url-entry').val('');
      $('#desc-entry').val('');
      $('.js-star-entry').prop('checked', false);
    }); 
  };

  /**
   * EVENT HANDLER
   * Click Add Button 
   *  - toggles class 'active' to expand or hide form
   */
  const handleAddButtonClick = function() {
    $('#add-bookmark-button').on('click', e => {
      $(e.currentTarget).toggleClass('active');
      renderAddForm();
    });
  };

  /**
   * EVENT HANDLER
   * Change Filter by Rating Value
   *  - get value, render
   */
  const handleToggleFilter = function() {
    $('#filter-form').on('change', '#filter-dropdown', e => {
      STORE.filter = $('#filter-dropdown').val();
      console.log(`${STORE.filter}`);
      render();
    });
  };

  /**
   * ALL EVENT HANDLERS
   */
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
    handleClickCancelEdit();
  };

  return {
    bindEventListeners,
    render,
    renderAddForm
  };
}());
'use strict';

const bookmarks = (function() {

  // unused
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

    let isExpanded = '';
    let isOptionsExpanded = '';
    let editSaveButtonClass = 'js-edit-button';
    let editSaveButtonText = 'Edit';


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
        <form class='js-edit-title bookmark-title bookmark-section js-bookmark-title'>
          <input type='text' value='${item.title}' />
        </form>
      `;

      bookmarkURL = `
        <form class='js-edit-url'>
          <input type='text' value='${item.url}' />
        </form>
      `;

      bookmarkDescription = `
        <form class='js-edit-description'>
          <input type='text' value='${item.desc}' />
        </form>
      `;

      isExpanded = 'expanded';
      editSaveButtonClass = 'js-save-button';
      editSaveButtonText = 'Save';

      STORE.optionsExpanded ? isOptionsExpanded = 'expanded' : isOptionsExpanded = '';
    }
    
    let bookmarkHTML = `
      <li class='bookmark-item' data-item-id='${item.id}'>
        <div class='bookmark-favicon bookmark-section'>A</div>
        ${bookmarkTitle}
        <button class='bookmark-rating bookmark-section stars' style="--rating: 4;" aria-label="Rating of this product is 2.3 out of 5."></button>

            <div class='js-options-container bookmark-section bookmark-options-container'>
              <div class='js-options-list options-list bookmark-section ${isOptionsExpanded}'>
                <button class='${editSaveButtonClass} options-list-item'>${editSaveButtonText}</button>
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
      $(e.currentTarget).find('.js-options-list').removeClass('expanded');

      // $('#js-bookmarks-ul').on('click', '.js-edit-button', () => {
      //   STORE.editing = true;
      //   console.log('store editing is now true');
      // });
      // if (!STORE.editing) {
      //   STORE.optionsExpanded = false;
      //   console.log('2nd part');
      //   $(e.currentTarget).find('.js-options-list').removeClass('expanded');
      // }
      // if ($('.js-edit-button').is(':focus')) {
      //   console.log('js edit butto nis focused ');
      //   $(e.currentTarget).find('.js-options-list').removeClass('expanded');
      // }

      // if (STORE.optionsExpanded === true && STORE.editing === true ) {
        // $(e.currentTarget).find('.js-options-list').removeClass('expanded');
      // }

      // $(e.currentTarget).siblings('.js-options-list').toggleClass('hidden');
      // if ($('#js-bookmarks-ul').on('click', '.js-delete-button'))
      // {
      //   console.log('delete item clicked inside losefocus');
      //   $(e.currentTarget).find('.js-options-list').addClass('expanded');
      // } else if ($('#js-bookmarks-ul').on('click', '.js-edit-button')) {
      //   console.log('edit item clicked inside losefocus');
      //   $(e.currentTarget).find('.js-options-list').addClass('expanded');
      // } else {
      //   $(e.currentTarget).find('.js-options-list').removeClass('expanded');
      // }

      // $('#js-bookmarks-ul').on('click', '.js-delete-button', e => {
      //   console.log('delete item clicked inside losefocus');
      //   $(e.currentTarget).parents('.js-options-list').addClass('expanded');
      // });

      // $('#js-bookmarks-ul').on('click', '.js-edit-button', e => {
      //   console.log('edit item clicked inside losefocus');
      //   $(e.currentTarget).parents('.js-options-list').addClass('expanded');
      // });

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

  const handleClickSaveMenu = function() {
    $('#js-bookmarks-ul').on('click', '.js-options-save-item', e => {

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
    handleClickEditMenu();
    handleClickSaveMenu();
    handleMenuLoseFocus();
    handleSubmitBookmark();
    handleAddButtonClick();
  };



  return {
    bindEventListeners,
    render
  };


}());
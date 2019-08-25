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

  function addBookmark() {
    
  }



}());
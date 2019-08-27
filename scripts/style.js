'use strict';

/**
 * set margin of main on page load
 */
$(document).ready(function() {
  var contentPlacement = $('header').position().top + $('header').height() + 35;
  $('.bookmarks-section').css('margin-top',contentPlacement);
});
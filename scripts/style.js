'use strict';

$(document).ready(function() {
  var contentPlacement = $('header').position().top + $('header').height() + 50;
  $('.bookmarks-section').css('margin-top',contentPlacement);
});
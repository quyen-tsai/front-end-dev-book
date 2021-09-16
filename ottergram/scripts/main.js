var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = "Escape";
var temp_arr = getThumbnailsArray();
var i = 0;

function setDetails(imageUrl, titleText) {
  'use strict';
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;


}

function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  'use strict';
  thumb.addEventListener('click', function (event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
    showDetails();
  });

}

function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;

}

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addKeyPressHandler();
  next(thumbnails);
  prev(thumbnails);

}

function hideDetails() {
  'use strict';
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
  'use strict';
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function () {
    frame.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
}


function addKeyPressHandler() {
  'use strict';
  document.body.addEventListener('keyup', function (event) {
    event.preventDefault();
    console.log(event.key);
    if (event.key === ESC_KEY) {
      hideDetails();
    }

  });
}

function next(thumb) {
  'use strict';
  var next = document.querySelector(".button-next");
  iterifyArr(thumb);
  next.addEventListener('click', function (event) {

    event.preventDefault();
    var temp = thumb.next();
    setDetailsFromThumb(temp);
    showDetails();
  });


}


function prev(thumb) {
  'use strict';
  var prevs = document.querySelector(".button-prev");
  iterifyArr(thumb);
  prevs.addEventListener('click', function (event) {
    event.preventDefault();
    var temp = thumb.prev();
    setDetailsFromThumb(temp);
    showDetails();
  });


}

var iterifyArr = function (arr) {
  var cur = 0;
  arr.next = (function () {
    return (++cur >= this.length) ? (this[cur = 0]) : this[cur];
  });
  arr.prev = (function () {
    return (--cur < 0) ? this[cur = this.length - 1] : this[cur];
  });
  return arr;
};


initializeEvents();
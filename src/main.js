// css
require('./theme.css');
require('./photoSwipe/photoswipe.css');
require('./photoSwipe/default-skin/default-skin.css');

// js
const swipe = require('./swipe.init');
const lazyload = require('./lazyload');

// todo: fix window

const lazy = {
  init() {
    const $img = document.getElementsByClassName('js-image');
    const $wrapArr = document.getElementsByClassName('img-wrap');
    const wrap = {
      width: 300,
      height: 200,
    };
    if ($wrapArr && $wrapArr[0]) {
      const rectObj = $wrapArr[0].getBoundingClientRect();
      wrap.width = rectObj.width;
      wrap.height = rectObj.height;
    }

    for (let i = 0, len = $img.length; i < len; i++) {
      lazyload({
        container: document.getElementsByTagName('body')[0],
        wrap,
        $target: $img[i],
        selector: '.js-image',
      });
    }
  },
};

window.onload = function() {
  swipe.init();
  lazy.init();
};

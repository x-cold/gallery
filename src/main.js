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

var inputFile = document.getElementById("file")
inputFile ?
  inputFile.addEventListener('change', function (e) {
    var file = e.target.files[0]

    if (!file.type.match('image.*')) {
      return false
    }

    var reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = function (arg) {
      var img = document.createElement('img')
      img.src = arg.target.result
      img.alt = 'preview'
      var parent = document.querySelector('.preview-box')
      parent.append(img)
      parent.style.display = 'block'
    }
  }, false) :
  null
window.onload = function () {
  swipe.init();
  lazy.init();
};
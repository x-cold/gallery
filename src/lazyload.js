module.exports = lazyload;

const inView = require('in-view');
const lazyAttrs = [ 'data-src' ];

let isInit = false;

// Provide libs using getAttribute early to get the good src
// and not the fake data-src
// replaceGetAttribute('Image');
// replaceGetAttribute('IFrame');

function registerLazyAttr(attr) {
  if (indexOf.call(lazyAttrs, attr) === -1) {
    lazyAttrs.push(attr);
  }
}

function lazyload(opts) {
  opts = merge({
    wrap: {},
    src: 'data-src',
    container: false,
  }, opts || {});

  const elt = opts.$target;
  const wrapW = opts.wrap.width;
  const wrapH = opts.wrap.height;

  if (typeof opts.src === 'string') {
    registerLazyAttr(opts.src);
  }

  const elts = [];

  function show(elt) {
    if (elt.getAttribute('data-lzled')) {
      return;
    }
    const src = findRealSrc(elt);

    if (src) {
      const $preloadImg = new Image();
      $preloadImg.src = src;
      $preloadImg.onload = function() {
        const preW = $preloadImg.width;
        const preH = $preloadImg.height;
        if (wrapW / wrapH < preW / preH) {
          elt.style.height = wrapH;
          var result = (wrapW - wrapH * preW / preH) / 2;
          if (result < 0) {
            elt.style.marginLeft = result + 'px';
          }
        } else {
          elt.style.width = wrapW;
          var result = (wrapH - wrapW * preH / preW) / 2;
          if (result < 0) {
            elt.style.marginTop = result + 'px';
          }
        }
        elt.src = src;
        elt.removeAttribute('data-not-lz');
        elt.setAttribute('data-lzled', true);
      };
    }
    elts[indexOf.call(elts, elt)] = null;
  }

  function findRealSrc(elt) {
    if (typeof opts.src === 'function') {
      return opts.src(elt);
    }

    return elt.getAttribute(opts.src);
  }

  function register(elt) {
    // unsubscribe onload
    // needed by IE < 9, otherwise we get another onload when changing the src
    elt.onload = null;
    elt.removeAttribute('onload');

    // https://github.com/vvo/lazyload/issues/62
    elt.onerror = null;
    elt.removeAttribute('onerror');

    if (indexOf.call(elts, elt) === -1 && !isInit) {
      inView(opts.selector).on('enter', show);
      isInit = true;
    }

    if (inView.is(elt)) {
      show(elt);
    }
  }
  register(elt);
}

function replaceGetAttribute(elementName) {
  const fullname = 'HTML' + elementName + 'Element';
  if (fullname in global === false) {
    return;
  }

  const original = global[fullname].prototype.getAttribute;
  global[fullname].prototype.getAttribute = function(name) {
    if (name === 'src') {
      let realSrc;
      for (let i = 0, max = lazyAttrs.length; i < max; i++) {
        realSrc = original.call(this, lazyAttrs[i]);
        if (realSrc) {
          break;
        }
      }

      return realSrc || original.call(this, name);
    }

    // our own lazyloader will go through theses lines
    // because we use getAttribute(opts.src)
    return original.call(this, name);
  };
}

function merge(defaults, opts) {
  for (const name in defaults) {
    if (opts[name] === undefined) {
      opts[name] = defaults[name];
    }
  }

  return opts;
}

// http://webreflection.blogspot.fr/2011/06/partial-polyfills.html
function indexOf(value) {
  for (var i = this.length; i-- && this[i] !== value;) {}
  return i;
}

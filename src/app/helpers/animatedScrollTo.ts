
// easing functions http://goo.gl/5HLl8
const easeInOutQuad = function (t, b, c, d) {
  t /= d / 2;
  if (t < 1) {
    return c / 2 * t * t + b
  }
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

const easeInCubic = function (t, b, c, d) {
  const tc = (t /= d) * t * t;
  return b + c * (tc);
};

const inOutQuintic = function (t, b, c, d) {
  const ts = (t /= d) * t,
    tc = ts * t;
  return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc);
};

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts


const requestAnimFrame = (function () {
  //@ts-ignore
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60); };
})();

export function scrollTo(to, callback, duration) {
  // because it's so fucking difficult to detect the scrolling element, just move them all
  function move(amount) {
    document.documentElement.scrollTop = amount;
    //@ts-ignore
    document.body.parentNode.scrollTop = amount;
    document.body.scrollTop = amount;
  }
  function position() {
    //@ts-ignore
    return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
  }
  const start = position(),
    change = to - start,
    increment = 20;
  let currentTime = 0;  
  duration = (typeof (duration) === 'undefined') ? 500 : duration;
  const animateScroll = function () {
    // increment the time
    currentTime += increment;
    // find the value with the quadratic in-out easing function
    var val = inOutQuintic(currentTime, start, change, duration);
    // move the document.body
    move(val);
    // do the animation unless its over
    if (currentTime < duration) {
      requestAnimFrame(animateScroll);
    } else {
      if (callback && typeof (callback) === 'function') {
        // the animation is done so lets callback
        callback();
      }
    }
  };
  animateScroll();
}
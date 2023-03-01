/**
 * Image Helper Functions
 * -----------------------------------------------------------------------------
 * https://github.com/Shopify/slate.git.
 *
 */

/**
 * Preloads an image in memory and uses the browsers cache to store it until needed.
 *
 * @param {Array} images - A list of image urls
 * @param {String} size - A shopify image size attribute
 */

export function preload(images: string[], size: string): void {
  for (let i = 0; i < images.length; i++) {
    const image: string = images[i];
    loadImage(getSizedImageUrl(image, size));
  }
}

/**
 * Loads and caches an image in the browsers cache.
 * @param {string} path - An image url
 */
export function loadImage(path: string): void {
  new Image().src = path;
}

/**
 * Find the Shopify image attribute size
 *
 * @param {string} src
 * @returns {null}
 */
export function imageSize(src: string): string | null {
  const match = src.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/);

  if (match) {
    return match[1];
  } else {
    return null;
  }
}

/**
 * Adds a Shopify size attribute to a URL
 *
 * @param src
 * @param size
 * @returns {*}
 */
export function getSizedImageUrl(src: any, size: string): string | null {
  if (typeof src === 'object') {
    src = src?.src
  }

  if(!src) {
    return ''
  }

  if (size === null || size === '0x' || src.includes('googleapis') || src.includes('amazonaws.com') || imageSize(src)) {
    return src;
  }

  if (size === "master") {
    return removeProtocol(src);
  }

  const match = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);

  if (match) {
    const prefix = src.split(match[0]);
    const suffix = match[0];
    return removeProtocol(`${prefix[0]}_${size}${suffix}`);
  } else {
    return null;
  }
}

export function removeProtocol(path: string): string {
  return path.replace(/http(s)?:/, "");
}

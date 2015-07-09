/**
 * Copyright (c) 2014 Tim Kuijsten
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

/**
 * Iterate over all object keys (and optionally recurse) and run a transformation
 * on each key. Modify the object in-place.
 *
 * @param {Object} obj  object to transform
 * @param {Function} iterator  first parameter will be the key to transform, second
 *                             parameter is the value of that key (though this is
 *                             informational only). This function should return the
 *                             new key to be used.
 * @param {Boolean, default: false} recurse  whether or not to recurse
 * @return {undefined}  replaces keys in-place
 */
function transform(obj, iterator, recurse) {
  if (typeof obj !== 'object') { throw new TypeError('obj must be an object'); }
  if (typeof iterator !== 'function') { throw new TypeError('iterator must be a function'); }

  recurse = recurse || false;
  if (typeof recurse !== 'boolean') { throw new TypeError('recurse must be a boolean'); }

  Object.keys(obj).forEach(function(key) {
    // recurse if requested and possible
    if (recurse && typeof obj[key] !== null && obj[key] === 'object' && Object.keys(obj[key]).length) {
      transform(obj[key], iterator, recurse);
    }

    var transformed = iterator(key, obj[key]);
    if (transformed !== key) {
      obj[transformed] = obj[key];
      delete obj[key];
    }
  });
}

module.exports = transform;

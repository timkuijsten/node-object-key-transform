/**
 * Copyright (c) 2014, 2015 Tim Kuijsten
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
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
    if (recurse && typeof obj[key] === 'object' && obj[key] !== null && Object.keys(obj[key]).length) {
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

# object-key-transform

Transform object keys with a custom transformation function, optionally recurse.

## Example

Append "2" to each key of an object:

    var transform = require('object-key-transform');

    var obj = {
      foo: 'bar',
      baz: { fu: 'quz' }
    };

    // the transformation function
    var iterator = function(key, val) {
      return key + '2';
      // note: val is there for informational purposes only
    }

    transform(obj, iterator);

    // console.log(obj);
    // {
    //   foo2: 'bar',
    //   baz2: { fu: 'quz' }
    // };


Same thing but recursively:

    transform(obj, iterator, true);

    // console.log(obj);
    // {
    //   foo2: 'bar',
    //   baz2: { fu2: 'quz' }
    // };

## Installation

    $ npm install object-key-transform

## API

### transform(obj, iterator, [recurse])
* obj {Object} object to transform
* iterator {Function} first parameter will be the key to transform, second
  parameter is the value of that key (though this is informational only). This
  function should return the new key to be used.
* recurse {Boolean, default: false} whether or not to recurse
* @return {undefined}  replaces keys in-place

Iterate over all object keys (and optionally recurse) and run a transformation
on each key. Modify the object in-place.

## Tests

    $ mocha test

## License

ISC

Copyright (c) 2014, 2015 Tim Kuijsten

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

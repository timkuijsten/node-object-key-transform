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

MIT, see LICENSE

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

/*jshint -W068 */

var should = require('should');

var transform = require('../index');

describe('transform', function () {
  it('should require obj to be an object', function() {
    (function() { transform(); }).should.throw('obj must be an object');
  });

  it('should require transformer to be a function', function() {
    (function() { transform({}); }).should.throw('transformer must be a function');
  });

  it('should require recurse to be a boolean', function() {
    (function() { transform({}, function(a) { return a; }, []); }).should.throw('recurse must be a boolean');
  });

  it('should work with empty object', function() {
    var obj = {};
    transform(obj, function(a) { return a; });
    should.deepEqual(obj, {});
  });

  it('should use transformation', function() {
    var obj = { $: '$' };
    transform(obj, function() { return 'b'; });
    should.deepEqual(obj, { b: '$' });
  });

  it('should not recurse', function() {
    var obj = { $: '$', foo: { $: '$' } };
    transform(obj, function(a) { return a + 'b'; });
    should.deepEqual(obj, { $b: '$', foob: { $: '$' } });
  });

  it('should pass values as well', function() {
    var obj = { foo: 'bar' };
    transform(obj, function(key, val) { should.strictEqual(val, 'bar'); });
  });

  it('should recurse', function() {
    var obj = { $: '$', foo: { $: '$', bar: { some: 'other' } }, a: 'b' };
    transform(obj, function(a) { return a + 'b'; }, true);
    should.deepEqual(obj, { $b: '$', foob: { $b: '$', barb: { someb: 'other' } } , ab: 'b'});
  });
});

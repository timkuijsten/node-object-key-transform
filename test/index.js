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

/*jshint -W068 */

var should = require('should');

var transform = require('../index');

describe('transform', function () {
  it('should require obj to be an object', function() {
    (function() { transform(); }).should.throw('obj must be an object');
  });

  it('should require transformer to be a function', function() {
    (function() { transform({}); }).should.throw('iterator must be a function');
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

  it('should not recurse when a value equals null', function() {
    var obj = {
      test: {
        value: null
      }
    };

    transform(obj, function(a) { return a + 'b'; }, true);
    should.deepEqual(obj, { testb: { valueb: null } });
  });

  it('should recurse', function() {
    var obj = { $: '$', foo: { $: '$', bar: { some: 'other' } }, a: 'b' };
    transform(obj, function(a) { return a + 'b'; }, true);
    should.deepEqual(obj, { $b: '$', foob: { $b: '$', barb: { someb: 'other' } } , ab: 'b'});
  });
});

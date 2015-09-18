import baseKeys from '../internal/baseKeys';
import initKeys from '../internal/initKeys';
import isArrayLike from '../lang/isArrayLike';
import isIndex from '../internal/isIndex';
import isPrototype from '../internal/isPrototype';

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  var isProto = isPrototype(object);
  if (!(isProto || isArrayLike(object))) {
    return baseKeys(object);
  }
  var result = initKeys(object),
      length = result.length,
      skipIndexes = !!length;

  for (var key in object) {
    if (hasOwnProperty.call(object, key) &&
        !(skipIndexes && isIndex(key, length)) &&
        !(isProto && key == 'constructor')) {
      result.push(key);
    }
  }
  return result;
}

export default keys;

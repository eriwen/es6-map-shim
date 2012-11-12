//! Copyright 2012 Eric Wendelin - MIT License

/**
 * es6-map-shim.js is a DESTRUCTIVE shim that follows the latest Map specification as closely as possible.
 * It is destructive in the sense that it overrides native implementations.
 *
 * This library assumes ES5 functionality: Object.create, Object.defineProperty, Array.indexOf, Function.bind
 */
function Map() {
    var _items = [];
    var _keys = [];
    var _values = [];
    var is = Object.is || function(a, b) {
        return a === b ?
            a !== 0 || 1 / a == 1 / b :
            a != a && b != b;
    };

    // a more reliable indexOf
    var betterIndexOf = function(value) {
        if(value != value || value === 0) {
            for(var i = this.length; i-- && !is(this[i], value););
        } else {
            i = [].indexOf.call(this, value);
        }
        return i;
    };

    // TODO: look at other shims for this
    var MapIterator = function MapIterator(kind) {
        var _m;
        var _itemKind = kind;
        var _index = 0;

        return Object.create({}, {
            next: {
                value: function() {
                    // check if index is within bounds

                }
            },
            iterator: {
                value: this
            },
            toString: {
                value: function() {
                    return '[Object Map Iterator]';
                }
            }
        });
    };

    // TODO: allow construction with arrays

    return Object.create({}, {
        items:{
            value:function() {
                return [].slice.call(_items);
            }
        },
        keys:{
            value:function() {
                return [].slice.call(_keys);
            }
        },
        values:{
            value:function() {
                return [].slice.call(_values);
            }
        },
        has:{
            value:function(key) {
                // TODO: check how spec reads about null values
                var index = betterIndexOf.call(_keys, key);
                return index > -1;
            }
        },
        get:{
            value:function(key) {
                var index = betterIndexOf.call(_keys, key);
                return index > -1 ? _values[index] : undefined;
            }
        },
        set:{
            value:function(key, value) {
                // check if key exists and overwrite
                var index = betterIndexOf.call(_keys, key);
                if (index > -1) {
                    _items[index] = value;
                    _values[index] = value;
                } else {
                    _items.push([key, value]);
                    _keys.push(key);
                    _values.push(value);
                }
            }
        },
        size:{
            get:function() {
                return _items.length;
            }
        },
        clear:{
            value:function() {
                _keys.length = _values.length = _items.length = 0;
            }
        },
        'delete':{
            value:function(key) {
                var index = betterIndexOf.call(_keys, key);
                if (index > -1) {
                    _keys.splice(index, 1);
                    _values.splice(index, 1);
                    _items.splice(index, 1);
                    return true;
                }
                return false;
            }
        },
        forEach:{
            value:function(callbackfn/*, thisArg*/) {
                // TODO: implement me
            }
        },
        iterator:{
            value: new MapIterator(this, 'keys+values')
        },
        toString:{
            value: function() {
                return '[Object Map]';
            }
        }
    });
}

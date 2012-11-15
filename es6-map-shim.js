//! Copyright 2012 Eric Wendelin - MIT License

/**
 * es6-map-shim.js is a DESTRUCTIVE shim that follows the latest Map specification as closely as possible.
 * It is destructive in the sense that it overrides native implementations.
 *
 * This library assumes ES5 functionality: Object.create, Object.defineProperty, Array.indexOf, Function.bind
 */
function Map(iterable) {
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

    var MapIterator = function MapIterator(map, kind) {
        var _index = 0;

        return Object.create({}, {
            next: {
                value: function() {
                    // check if index is within bounds
                    if (_index < map.items().length) {
                        switch(kind) {
                            case 'keys': return map.keys()[_index++];
                            case 'values': return map.values()[_index++];
                            case 'keys+values': return [].slice.call(map.items()[_index++]);
                            default: throw new TypeError('Invalid iterator type');
                        }
                    }
                    // TODO: make sure I'm interpreting the spec correctly here
                    throw new Error('Stop Iteration');
                }
            },
            iterator: {
                value: function() {
                    return this;
                }
            },
            toString: {
                value: function() {
                    return '[object Map Iterator]';
                }
            }
        });
    };

    var _set = function(key, value) {
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
    };

    var setItem = function(item) {
        if (item.length !== 2) {
            throw new TypeError('Invalid iterable passed to Map constructor');
        }

        _set(item[0], item[1]);
    };

    // FIXME: accommodate any class that defines an @@iterator method that returns
    //      an iterator object that produces two element array-like objects
    if (Array.isArray(iterable)) {
        iterable.forEach(setItem);
    } else if (iterable !== undefined) {
        throw new TypeError('Invalid Map');
    }

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
            value: _set
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
            value:function(callbackfn /*, thisArg*/) {
                if (typeof callbackfn != 'function') {
                    throw new TypeError('Invalid callback function given to forEach');
                }

                for (var i = 0; i < _keys.length; i++) {
                    if (this.has(_keys[i])) {
                        callbackfn.apply(arguments[1], [_values[i], _keys[i], this]);
                    }
                }
            }
        },
        iterator:{
            value: function() {
                return new MapIterator(this, 'keys+values');
            }
        },
        toString:{
            value: function() {
                return '[Object Map]';
            }
        }
    });
}

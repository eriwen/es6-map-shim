describe('es6-map-shim', function() {
    describe('Map::constructor', function() {
        it('should allow empty constructor args', function() {
            expect(function() { new Map(); }).not.toThrow();
            expect(function() { new Map([]); }).not.toThrow();
        });

        it('should populate items, keys, and values given a valid iterable', function() {
            var iterable = [['foo', undefined], [42, {}]];
            var map = new Map(iterable);
            expect(map.items()).toEqual(iterable);
            expect(map.keys()).toEqual(['foo', 42]);
            expect(map.values()).toEqual([undefined, {}]);
        });

        it('should overwrite items with duplicate keys', function() {
            var map = new Map([['foo', 'bar'], ['foo', Infinity]]);
            expect(map.get('foo')).toEqual(Infinity);
            expect(map.size).toEqual(1);
        });

        it('should throw a TypeError given an invalid iterable', function() {
            expect(function() { new Map([[0]]); }).toThrow(new TypeError('Invalid iterable passed to Map constructor'));
            expect(function() { new Map('foo'); }).toThrow(new TypeError('Invalid Map'));
        });
    });

    describe('Map::items', function() {
        it('should have empty items Array if Map was constructed with no arguments', function() {
            var map = new Map();
            expect(map.items()).toEqual([]);
        });

        it('should contain all items that have been added but not deleted', function() {
            var map = new Map();
            map.set(0, 5);
            map.set('foo', 'bar');
            expect(map.items()).toEqual([[0, 5], ['foo', 'bar']]);
            map.delete('foo');
            expect(map.items()).toEqual([[0, 5]]);
        });

        it('should return a copy of items, not a reference to the Map items object', function() {
            var map = new Map([['foo', 'bar'], [{}, 42]]);
            expect(map.items()).toEqual([['foo', 'bar'], [{}, 42]]);
            var keese = map.items();
            keese = [['baz', 3]];
            expect(map.items()).toEqual([['foo', 'bar'], [{}, 42]]);
        });
    });

    describe('Map::keys', function() {
        it('should have empty keys Array if Map was constructed with no arguments', function() {
            var map = new Map();
            expect(map.keys()).toEqual([]);
        });

        it('should contain all keys that have been added but not deleted', function() {
            var map = new Map();
            map.set(0, 5);
            map.set('foo', 'bar');
            expect(map.keys()).toEqual([0, 'foo']);
            map.delete('foo');
            expect(map.keys()).toEqual([0]);
        });

        it('should return a copy of keys, not a reference to the Map keys object', function() {
            var map = new Map([['foo', 'bar'], [{}, 42]]);
            expect(map.keys()).toEqual(['foo', {}]);
            var keese = map.keys();
            keese = ['baz', 3];
            expect(map.keys()).toEqual(['foo', {}]);
        });
    });

    describe('Map::values', function() {
        it('should have empty values Array if Map was constructed with no arguments', function() {
            var map = new Map();
            expect(map.values()).toEqual([]);
        });

        it('should contain all values that have been added but not deleted', function() {
            var map = new Map([[0, 5], ['foo', 'bar']]);
            expect(map.values()).toEqual([5, 'bar']);
            map.delete('foo');
            expect(map.values()).toEqual([5]);
        });

        it('should return a copy of values, not a reference to the Map values object', function() {
            var map = new Map([['foo', 'bar'], [{}, 42]]);
            expect(map.values()).toEqual(['bar', 42]);
            var vals = map.values();
            vals = ['baz', 3];
            expect(map.values()).toEqual(['bar', 42]);
        });
    });

    describe('Map::has', function() {
        it('should return false given a non-existent key', function() {
            var map = new Map();
            expect(map.has('foo')).toBe(false);
        });

        it('should return true given an existing key', function() {
            var map = new Map([['foo', 'bar']]);
            expect(map.has('foo')).toBe(true);
        });

        it('should handle "interesting" keys', function() {
            var obj = {'baz': []};
            var map = new Map([['foo', 'bar'], [null, 42], [obj, function(){}], [-0, 'negative zero'], [0, 'zero']])
            expect(map.has(null)).toBe(true);
            expect(map.has(undefined)).toBe(false);
            expect(map.has(obj)).toBe(true);
            expect(map.has(-0)).toBe(true);
            expect(map.has(0)).toBe(true);
        });
    });

    describe('Map::get', function() {
        it('should return undefined given a non-existent key', function() {
            var map = new Map();
            expect(map.get('foo')).toBe(undefined);
        });

        it('should return object value given an existing key', function() {
            var map = new Map([['foo', 'bar']]);
            expect(map.get('foo')).toEqual('bar');
        });

        it('should handle "interesting" keys', function() {
            var obj = {'baz': []};
            var fn = function(){};
            var map = new Map([['foo', 'bar'], [undefined, 42], [obj, fn], [-0, 'negative zero'], [0, 'zero']])
            expect(map.get(null)).toBe(undefined);
            expect(map.get(undefined)).toBe(42);
            expect(map.get(obj)).toBe(fn);
            expect(map.get(-0)).toBe('negative zero');
            expect(map.get(0)).toBe('zero');
        });
    });

    describe('Map::set', function() {
        it('should add to keys, values, and items', function() {
            var map = new Map();
            map.set('foo', 'bar');
            expect(map.keys()).toEqual(['foo']);
            expect(map.values()).toEqual(['bar']);
            expect(map.items()).toEqual([['foo', 'bar']]);
        });

        it('should add entry for undefined if arguments are undefined', function() {
            var map = new Map();
            map.set();
            expect(map.keys()).toEqual([undefined]);
            expect(map.values()).toEqual([undefined]);
            expect(map.items()).toEqual([[undefined, undefined]]);
        });

        it('should update value given existing key', function() {
            var map = new Map();
            map.set('foo', 'bar');
            map.set('foo', 'baz');
            expect(map.keys()).toEqual(['foo']);
            expect(map.values()).toEqual(['baz']);
            expect(map.items()).toEqual([['foo', 'baz']]);
        });
    });

    describe('Map.size', function() {
        it('should return zero for empty Map', function() {
            var map = new Map();
            expect(map.size).toEqual(0);
        });

        it('should return the length of items()', function() {
            var map = new Map([[function(){}, 'foo'], [[], 'bar'], [3, 'baz']]);
            expect(map.items().length).toEqual(3);
            expect(map.size).toEqual(3);
        })
    });

    describe('Map::delete', function() {
        it('should return false if given non-existent key', function() {
            var map = new Map();
            expect(map.delete('foo')).toBe(false);
        });

        it('should return true and remove item given existing key', function() {
            var map = new Map([['foo', 'bar']]);
            expect(map.delete('foo')).toBe(true);
            expect(map.items()).toEqual([]);
        });
    });

    describe('Map::clear', function() {
        it('should remove all items', function() {
            var map = new Map([['foo', 'bar']]);
            map.set(5, 43);
            expect(map.keys().length).toEqual(2);
            map.clear();
            expect(map.keys().length).toEqual(0);
        });

        it('should not disturb empty Map', function() {
            var map = new Map();
            expect(map.keys().length).toEqual(0);
            map.clear();
            expect(map.keys().length).toEqual(0);
        });
    });

    describe('Map::forEach', function() {
        it('should throw TypeError given non-callable argument', function() {
            expect(function(){ new Map().forEach([]); }).toThrow(new TypeError('Invalid callback function given to forEach'));
        });

        it('should operate on each value and key', function() {
            var map = new Map([['foo', 'bar'], [65, 42]]);
            var sums = [];
            map.forEach(function(value, key, mapRef) {
                sums.push(value + key);
            });
            expect(sums[0]).toEqual('barfoo');
            expect(sums[1]).toEqual(107);
        });

        it('should allow context to be set', function() {
            var map = new Map([['foo', 'bar'], [65, 42]]);
            var sums = [];
            map.forEach(function(value, key, mapRef) {
                if (typeof this[key] == 'function') {
                    sums.push(value + key);
                }
            }, {'foo': function(){}});
            expect(sums.length).toBe(1);
            expect(sums[0]).toEqual('barfoo');
        });

        it('should process new items added', function() {
            var map = new Map([['foo', 'bar'], [65, 42]]);
            var sums = [];
            map.forEach(function(value, key, mapRef) {
                // Add inverse item [value, key]
                if (!mapRef.has(value)) {
                    mapRef.set(value, key);
                }
                sums.push(value + key);
            }, {'foo': function(){}});
            expect(sums.length).toBe(4);
            expect(sums[0]).toEqual('barfoo');
            expect(sums[1]).toEqual(107);
            expect(sums[2]).toEqual('foobar');
            expect(sums[3]).toEqual(107);
        });

        it('should skip items that are deleted before being visited', function() {
            var map = new Map([['foo', 'bar'], [65, 42], [null, function(){}]]);
            var sums = [];
            map.forEach(function(value, key, mapRef) {
                mapRef.delete(65);
                sums.push(value + key);
            }, {'foo': function(){}});
            expect(sums.length).toBe(2);
            expect(sums[0]).toEqual('barfoo');
        });

        it('should not skip anything if items are deleted inline', function() {
            var map = new Map([['foo', 'bar'], [65, 42]]);
            var sums = [];
            map.forEach(function(value, key, mapRef) {
                mapRef.delete(key);
                sums.push(value + key);
            });
            expect(sums.length).toBe(2);
            expect(sums[0]).toEqual('barfoo');
            expect(sums[1]).toEqual(107);
        });
    });

    describe('Map::iterator', function() {
        it('should return an iterator object that responds to next(), iterator(), and toString()', function() {
            var map = new Map([['foo', 'bar']]);
            var iterator = map.iterator();
            expect(typeof iterator.next).toBe('function');
            expect(typeof iterator.iterator).toBe('function');
            expect(iterator.toString()).toBe('[object Map Iterator]');
        });

        it('should yield items as requested', function() {
            var map = new Map([['foo', 'bar'], [undefined, 42]]);
            var iterator = map.iterator();
            expect(iterator.next()).toEqual(['foo', 'bar']);
            expect(iterator.next()).toEqual([undefined, 42]);
            expect(function(){ iterator.next() }).toThrow(new Error('Stop Iteration'));
        });

        it('should handle delete while iterating gracefully', function() {
            var map = new Map([['foo', 'bar'], [1, 2], ['last', 42]]);
            var iterator = map.iterator();
            expect(iterator.next()).toEqual(['foo', 'bar']);
            expect(map.delete(1)).toBe(true);
            expect(iterator.next()).toEqual(['last', 42]);
        });

        it('should return itself', function() {
            var map = new Map([['foo', 'bar'], [undefined, 42]]);
            var iterator = map.iterator();
            expect(iterator.iterator()).toBe(iterator);
        });
    });

    describe('Map::toString', function() {
        it('should return "[Object Map]"', function() {
            var map = new Map();
            expect(map.toString()).toEqual('[Object Map]');
        });
    });
});

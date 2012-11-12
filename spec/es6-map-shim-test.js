describe('es6-map-shim', function() {
    // TODO: test constructor

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

        // TODO: test to make sure keys, values, items stay in sync
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
    });

    describe('Map::values', function() {
        it('should have empty values Array if Map was constructed with no arguments', function() {
            var map = new Map();
            expect(map.values()).toEqual([]);
        });

        it('should contain all values that have been added but not deleted', function() {
            var map = new Map();
            map.set(0, 5);
            map.set('foo', 'bar');
            expect(map.values()).toEqual([5, 'bar']);
            map.delete('foo');
            expect(map.values()).toEqual([5]);
        });
    });

    describe('Map::has', function() {
        it('should return false given a non-existent key', function() {
            var map = new Map();
            expect(map.has('foo')).toBe(false);
        });

        it('should return true given an existing key', function() {
            var map = new Map();
            map.set('foo', 'bar');
            expect(map.has('foo')).toBe(true);
        });

        // TODO: edge cases with null, NaN etc.
    });

    describe('Map::get', function() {
        it('should return undefined given a non-existent key', function() {
            var map = new Map();
            expect(map.get('foo')).toBe(undefined);
        });

        it('should return object value given an existing key', function() {
            var map = new Map();
            map.set('foo', 'bar');
            expect(map.get('foo')).toEqual('bar');
        });
        // TODO: edge cases with null, NaN etc.
    });

    describe('Map::set', function() {
        it('should add to keys, values, and items', function() {
            var map = new Map();
            map.set('foo', 'bar');
            expect(map.keys()).toEqual(['foo']);
            expect(map.values()).toEqual(['bar']);
            expect(map.items()).toEqual([['foo', 'bar']]);
        });
    });

    describe('Map.size', function() {
        it('should return zero for empty Map', function() {
            var map = new Map();
            expect(map.size).toEqual(0);
        });

        it('should return the length of items()', function() {
            var map = new Map();
            map.set(function(){}, 'foo');
            map.set([], 'bar');
            map.set(3, 'baz');
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
            var map = new Map();
            map.set('foo', 'bar');
            expect(map.delete('foo')).toBe(true);
            expect(map.items()).toEqual([]);
        });
    });

    describe('Map::clear', function() {
        it('should remove all items', function() {
            var map = new Map();
            map.set('foo', 'bar');
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
        it('should...', function() {
        });
    });

    describe('Map::iterator', function() {
        it('should...', function() {
        });
    });

    describe('Map::toString', function() {
        it('should return "[Object Map]"', function() {
            var map = new Map();
            expect(map.toString()).toEqual('[Object Map]');
        });
    });
});

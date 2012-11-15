# es6-map-shim - A polyfill for ES6 Maps
This is a *destructive* shim that implements the ES6 Map specification as closely as possible.

```js
var map = new Map([['foo', 'bar'], [-0, function(){}]]);
map.set(null, 42);

map.get(-0);
=> function(){}

map.has(null);
=> true

map.keys();
=> ['foo', -0, null]

map.values();
=> ['bar', function(){}, 42]

map.items();
=> [['foo', 'bar'], [-0, function(){}], [null, 42]]

map.forEach(function(value, key, mapReference) {
  console.log(typeof value);
});
=> 'string'\n'function'\n'number'\n

var iterator = map.iterator();
iterator.next();
=> ['foo', 'bar']
iterator.next();
=> [-0, function(){}]

map.delete(null);
=> true

// Remove all items
map.clear();
map.size;
=> 0

map.toString();
=> '[object Map]'
```

## Installation
In browsers, include [es6-map-shim.js](https://github.com/eriwen/es6-map-shim/downloads) in your page:

```html
<script type="text/javascript" src="https://raw.github.com/eriwen/es6-map-shim/master/es6-map-shim.js"></script>
```

You can install this via:

 * npm for [node.js](http://nodejs.org) v0.8+: `npm install es6-map-shim`
 * [component(1)](https://github.com/component/component): `component install eriwen/es6-map-shim`
 * [bower](http://twitter.github.com/bower/): `bower install es6-map-shim`

### Environment Support
If you also use the [es5-shim](https://github.com/kriskowal/es5-shim), you can use this in:

 * IE7+ (not fully tested yet)
 * Firefox 15+
 * Google Chrome 21+
 * Safari 4+
 * Opera 12+
 * Node.js 0.8+
 * PhantomJS

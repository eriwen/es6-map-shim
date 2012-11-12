# es6-map-shim - A polyfill for ES6 Maps


```js
var map = new Map();
map.set('foo', 'bar');
map.set(0, 42);

// Remove all items
map.clear();
map.items();
=> []
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

 * IE9+
 * Firefox 15+
 * Google Chrome 21+
 * Safari 4+
 * Opera 12+
 * Node.js 0.8+
 * PhantomJS

eventbase
=========

Tiny custom event implementation. Used for more complex system as infrastructure.

## Installation
for Node:

```base
$ npm install eventbase
```
for Browser:

```html
<script src="path/to/eventbase.js"></script>
```
for Require.js

```js
require.config({
  paths: {
    eventbase: "path/to/eventbase.js"
  }
});
require(["eventbase"], function (EventBase) {
  // TODO
});
```

## Usage

```js
var base = new EventBase();
base.on('eventname', function (message) {
  console.log(message);
  // => Hello world!
});
base.fire('eventname', {message: 'Hello world!'});
// and
base.once('eventname', function (data) {
  // TODO
});
base.unbind('eventname'/*, fn */);
```

## License
The MIT License

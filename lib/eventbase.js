/*global define*/
/*!
 * This file is used for define the EventBase library.
 * @author <a href="mailto:shyvo1987@gmail.com">Jackson Tian</a>
 * @version 0.2.2
 * ```
 */
!(function (name, definition) {
  // Check define
  var hasDefine = typeof define === 'function',
    // Check exports
    hasExports = typeof module !== 'undefined' && module.exports;

  if (hasDefine) {
    // AMD Module or CMD Module
    define(definition);
  } else if (hasExports) {
    // Node.js Module
    module.exports = definition();
  } else {
    // Assign to common namespaces or simply the global object (window)
    this[name] = definition();
  }
})('EventBase', function () {

  /*!
   * refs
   */
  var SLICE = Array.prototype.slice;

  /**
   * EventBase. Custom events implementation.
   * Examples:
   * ```js
   * var base = new EventBase();
   * base.on("template", function (data) {
   *   console.log(data);
   * });
   * base.fire("template", template);
   * ```
   */
  var EventBase = function () {
    if (!(this instanceof EventBase)) {
      return new EventBase();
    }
  };

  /**
   * Bind an event, specified by a string name, `eventName`, to a `callback` function.
   * Passing `all` will bind the callback to all events fired.
   * @param {String} eventName Event name.
   * @param {Function} callback Callback.
   */
  EventBase.prototype.addListener = function (eventName, callback) {
    this._callbacks = this._callbacks || {};
    this._callbacks[eventName] = this._callbacks[eventName] || [];
    this._callbacks[eventName].push(callback);
    return this;
  };

  /**
   * `addListener` alias, `bind`
   */
  EventBase.prototype.bind = EventBase.prototype.addListener;
  /**
   * `addListener` alias, `on`
   */
  EventBase.prototype.on = EventBase.prototype.addListener;

  /**
   * Remove one or many callbacks.
   *
   * - If `callback` is null, removes all callbacks for the event.
   * - If `eventName` is null, removes all bound callbacks for all events.
   * @param {String} eventName Event name.
   * @param {Function} callback Callback.
   */
  EventBase.prototype.removeListener = function (eventName, callback) {
    var calls = (this._callbacks = this._callbacks || {});
    if (!eventName) {
      this._callbacks = {};
    } else {
      if (!callback) {
        calls[eventName] = [];
      } else {
        var list = calls[eventName];
        if (list) {
          var l = list.length;
          for (var i = 0; i < l; i++) {
            if (callback === list[i]) {
              list[i] = null;
              break;
            }
          }
        }
      }
    }
    return this;
  };
  /**
   * `removeListener` alias, `unbind`
   */
  EventBase.prototype.unbind = EventBase.prototype.removeListener;

  /**
   * `removeListener` alias, `off`
   */
  EventBase.prototype.off = EventBase.prototype.removeListener;

  /**
   * Trigger an event, firing all bound callbacks. Callbacks are passed the
   * same arguments as `trigger` is, apart from the event name.
   * Listening for `"all"` passes the true event name as the first argument.
   * @param {String} eventName Event name
   * @param {Mix} data Pass in data
   */
  EventBase.prototype.trigger = function (eventName, data) {
    var list, ev, callback, args, i, l;
    var both = 2;
    var calls = (this._callbacks = this._callbacks || {});
    while (both--) {
      ev = both ? eventName : 'all';
      list = calls[ev];
      if (list) {
        for (i = 0, l = list.length; i < l; i++) {
          if (!(callback = list[i])) {
            list.splice(i, 1);
            i--;
            l--;
          } else {
            args = both ? SLICE.call(arguments, 1) : arguments;
            callback.apply(this, args);
          }
        }
      }
    }
    return this;
  };

  /**
   * `trigger` alias `emit`
   */
  EventBase.prototype.emit = EventBase.prototype.trigger;
  /**
   * `trigger` alias `fire`
   */
  EventBase.prototype.fire = EventBase.prototype.trigger;

  /**
   * Bind an event like the bind method, but will remove the listener after it was fired.
   * @param {String} ev Event name
   * @param {Function} callback Callback
   */
  EventBase.prototype.once = function (ev, callback) {
    var self = this;
    var wrapper = function () {
      callback.apply(self, arguments);
      self.unbind(ev, wrapper);
    };
    this.bind(ev, wrapper);
    return this;
  };

  return EventBase;
});

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Flatted = (function (Primitive, primitive) {

  /*!
   * ISC License
   *
   * Copyright (c) 2018, Andrea Giammarchi, @WebReflection
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
   * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
   * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
   * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
   * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
   * OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
   * PERFORMANCE OF THIS SOFTWARE.
   */

  var Flatted = {

    parse: function parse(text) {
      var input = JSON.parse(text, Primitives).map(primitives);
      var value = input[0];
      return typeof value === 'object' && value ?
              revive(input, new Set, value) : value;
    },

    stringify: function stringify(value) {
      for (var
        firstRun,
        known = new Map,
        input = [],
        output = [],
        i = +set(known, input, value),
        replace = function (key, value) {
          if (firstRun) return (firstRun = !firstRun), value;
          switch (typeof value) {
            case 'object':
              if (value === null) return value;
            case primitive:
              return known.get(value) || set(known, input, value);
          }
          return value;
        };
        i < input.length; i++
      ) {
        firstRun = true;
        output[i] = JSON.stringify(input[i], replace);
      }
      return '[' + output.join(',') + ']';
    }

  };

  return Flatted;

  function revive(input, parsed, output) {
    return Object.keys(output).reduce(
      function (output, key) {
        var value = output[key];
        if (value instanceof Primitive) {
          var tmp = input[value];
          if (typeof tmp === 'object' && !parsed.has(tmp)) {
            parsed.add(tmp);
            output[key] = revive(input, parsed, tmp);
          } else {
            output[key] = tmp;
          }
        }
        return output;
      },
      output
    );
  }

  function set(known, input, value) {
    var index = Primitive(input.push(value) - 1);
    known.set(value, index);
    return index;
  }

  function primitives(value) {
    return value instanceof Primitive ? Primitive(value) : value;
  }

  function Primitives(key, value) {
    return typeof value === primitive ? new Primitive(value) : value;
  }

}(String, 'string'));
const parse = Flatted.parse;
const stringify = Flatted.stringify;

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

var MAKE_MOVE = 'MAKE_MOVE';
var GAME_EVENT = 'GAME_EVENT';
var REDO = 'REDO';
var RESET = 'RESET';
var SYNC = 'SYNC';
var UNDO = 'UNDO';
var UPDATE = 'UPDATE';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};













var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};





















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

// Inlined version of Alea from https://github.com/davidbau/seedrandom.

/*
 * Copyright 2015 David Bau.
 *
 * Permission is hereby granted, free of charge,
 * to any person obtaining a copy of this software
 * and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall
 * be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

function Alea(seed) {
  var me = this,
      mash = Mash();

  me.next = function () {
    var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32
    me.s0 = me.s1;
    me.s1 = me.s2;
    return me.s2 = t - (me.c = t | 0);
  };

  // Apply the seeding algorithm from Baagoe.
  me.c = 1;
  me.s0 = mash(' ');
  me.s1 = mash(' ');
  me.s2 = mash(' ');
  me.s0 -= mash(seed);
  if (me.s0 < 0) {
    me.s0 += 1;
  }
  me.s1 -= mash(seed);
  if (me.s1 < 0) {
    me.s1 += 1;
  }
  me.s2 -= mash(seed);
  if (me.s2 < 0) {
    me.s2 += 1;
  }
  mash = null;
}

function copy(f, t) {
  t.c = f.c;
  t.s0 = f.s0;
  t.s1 = f.s1;
  t.s2 = f.s2;
  return t;
}

function Mash() {
  var n = 0xefc8249d;

  var mash = function mash(data) {
    data = data.toString();
    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  return mash;
}

function alea(seed, opts) {
  var xg = new Alea(seed),
      state = opts && opts.state,
      prng = xg.next;
  prng.quick = prng;
  if (state) {
    if ((typeof state === 'undefined' ? 'undefined' : _typeof(state)) == 'object') copy(state, xg);
    prng.state = function () {
      return copy(xg, {});
    };
  }
  return prng;
}

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Random
 *
 * Calls that require a pseudorandom number generator.
 * Uses a seed from ctx, and also persists the PRNG
 * state in ctx so that moves can stay pure.
 */
var Random = function () {
  /**
   * constructor
   * @param {object} ctx - The ctx object to initialize from.
   */
  function Random(ctx) {
    classCallCheck(this, Random);

    // If we are on the client, the seed is not present.
    // Just use a temporary seed to execute the move without
    // crashing it. The move state itself is discarded,
    // so the actual value doesn't matter.
    this.state = ctx._random || { seed: '0' };
  }

  /**
   * Updates ctx with the PRNG state.
   * @param {object} ctx - The ctx object to update.
   */


  createClass(Random, [{
    key: 'update',
    value: function update(state) {
      var ctx = _extends({}, state.ctx, { _random: this.state });
      return _extends({}, state, { ctx: ctx });
    }

    /**
     * Attaches the Random API to ctx.
     * @param {object} ctx - The ctx object to attach to.
     */

  }, {
    key: 'attach',
    value: function attach(ctx) {
      return _extends({}, ctx, { random: this._api() });
    }

    /**
     * Generate a random number.
     */

  }, {
    key: '_random',
    value: function _random() {
      var R = this.state;

      var fn = void 0;
      if (R.prngstate === undefined) {
        // No call to a random function has been made.
        fn = new alea(R.seed, { state: true });
      } else {
        fn = new alea('', { state: R.prngstate });
      }

      var number = fn();

      this.state = _extends({}, R, {
        prngstate: fn.state()
      });

      return number;
    }
  }, {
    key: '_api',
    value: function _api() {
      var random = this._random.bind(this);

      var SpotValue = {
        D4: 4,
        D6: 6,
        D8: 8,
        D10: 10,
        D12: 12,
        D20: 20
      };

      // Generate functions for predefined dice values D4 - D20.
      var predefined = {};

      var _loop = function _loop(key) {
        var spotvalue = SpotValue[key];
        predefined[key] = function (diceCount) {
          if (diceCount === undefined) {
            return Math.floor(random() * spotvalue) + 1;
          } else {
            return [].concat(toConsumableArray(new Array(diceCount).keys())).map(function () {
              return Math.floor(random() * spotvalue) + 1;
            });
          }
        };
      };

      for (var key in SpotValue) {
        _loop(key);
      }

      return _extends({}, predefined, {

        /**
         * Roll a die of specified spot value.
         *
         * @param {number} spotvalue - The die dimension (default: 6).
         * @param {number} diceCount - number of dice to throw.
         *                             if not defined, defaults to 1 and returns the value directly.
         *                             if defined, returns an array containing the random dice values.
         */
        Die: function Die(spotvalue, diceCount) {
          if (spotvalue === undefined) {
            spotvalue = 6;
          }

          if (diceCount === undefined) {
            return Math.floor(random() * spotvalue) + 1;
          } else {
            return [].concat(toConsumableArray(new Array(diceCount).keys())).map(function () {
              return Math.floor(random() * spotvalue) + 1;
            });
          }
        },

        /**
         * Generate a random number between 0 and 1.
         */
        Number: function Number() {
          return random();
        },

        /**
         * Shuffle an array.
         *
         * @param {Array} deck - The array to shuffle. Does not mutate
         *                       the input, but returns the shuffled array.
         */
        Shuffle: function Shuffle(deck) {
          var clone = deck.slice(0);
          var srcIndex = deck.length;
          var dstIndex = 0;
          var shuffled = new Array(srcIndex);

          while (srcIndex) {
            var randIndex = srcIndex * random() | 0;
            shuffled[dstIndex++] = clone[randIndex];
            clone[randIndex] = clone[--srcIndex];
          }

          return shuffled;
        }
      });
    }
  }]);
  return Random;
}();

/**
 * Removes the attached Random api from ctx.
 *
 * @param {object} ctx - The ctx object with the Random API attached.
 * @returns {object} A plain ctx object without the Random API.
 */
Random.detach = function (ctx) {
  var random = ctx.random,
      rest = objectWithoutProperties(ctx, ['random']); // eslint-disable-line no-unused-vars

  return rest;
};

/**
 * Generates a new seed from the current date / time.
 */
Random.seed = function () {
  return (+new Date()).toString(36).slice(-10);
};

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Generate a move to be dispatched to the game move reducer.
 *
 * @param {string} type - The move type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */


/**
 * Generate a game event to be dispatched to the flow reducer.
 *
 * @param {string} type - The event type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */


/**
 * Generate an automatic game event that is a side-effect of a move.
 * @param {string} type - The event type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */
var automaticGameEvent = function automaticGameEvent(type, args, playerID, credentials) {
  return {
    type: GAME_EVENT,
    payload: { type: type, args: args, playerID: playerID, credentials: credentials },
    automatic: true
  };
};

/**
 * Used to reset the Redux store's state on a sync.
 * @param {object} state - The state to restore.
 * @param {Array} log - The log to restore.
 */


/**
 * Used to update the Redux store's state in response to
 * an action coming from another player.
 * @param {object} state - The state to restore.
 * @param {Array} deltalog - A log delta.
 */


/**
 * Used to reset the game state.
 */


/**
 * Used to undo the last move.
 */


/**
 * Used to redo the last undone move.
 */

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Events
 */
var Events = function () {
  function Events(flow, playerID) {
    classCallCheck(this, Events);

    this.flow = flow;
    this.playerID = playerID;
    this.dispatch = [];
  }

  /**
   * Attaches the Events API to ctx.
   * @param {object} ctx - The ctx object to attach to.
   */


  createClass(Events, [{
    key: 'attach',
    value: function attach(ctx) {
      var _this = this;

      var events = {};

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var key = _step.value;

          events[key] = function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            _this.dispatch.push({ key: key, args: args });
          };
        };

        for (var _iterator = this.flow.eventNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return _extends({}, ctx, { events: events });
    }

    /**
     * Updates ctx with the triggered events.
     * @param {object} state - The state object { G, ctx }.
     */

  }, {
    key: 'update',
    value: function update$$1(state) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.dispatch[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var item = _step2.value;

          var action = automaticGameEvent(item.key, item.args, this.playerID);
          state = _extends({}, state, this.flow.processGameEvent(state, action));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return state;
    }
  }]);
  return Events;
}();

/**
 * Detaches the Events API from ctx.
 * @param {object} ctx - The ctx object to strip.
 */
Events.detach = function (ctx) {
  var events = ctx.events,
      rest = objectWithoutProperties(ctx, ['events']); // eslint-disable-line no-unused-vars

  return rest;
};

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};



















var defineProperty$1 = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

function generatePatches(state, basepath, patches, inversePatches, baseValue, resultValue) {
    if (patches) if (Array.isArray(baseValue)) generateArrayPatches(state, basepath, patches, inversePatches, baseValue, resultValue);else generateObjectPatches(state, basepath, patches, inversePatches, baseValue, resultValue);
}

function generateArrayPatches(state, basepath, patches, inversePatches, baseValue, resultValue) {
    var shared = Math.min(baseValue.length, resultValue.length);
    for (var i = 0; i < shared; i++) {
        if (state.assigned[i] && baseValue[i] !== resultValue[i]) {
            var path = basepath.concat(i);
            patches.push({ op: "replace", path: path, value: resultValue[i] });
            inversePatches.push({ op: "replace", path: path, value: baseValue[i] });
        }
    }
    if (shared < resultValue.length) {
        // stuff was added
        for (var _i = shared; _i < resultValue.length; _i++) {
            var _path = basepath.concat(_i);
            patches.push({ op: "add", path: _path, value: resultValue[_i] });
        }
        inversePatches.push({
            op: "replace",
            path: basepath.concat("length"),
            value: baseValue.length
        });
    } else if (shared < baseValue.length) {
        // stuff was removed
        patches.push({
            op: "replace",
            path: basepath.concat("length"),
            value: resultValue.length
        });
        for (var _i2 = shared; _i2 < baseValue.length; _i2++) {
            var _path2 = basepath.concat(_i2);
            inversePatches.push({ op: "add", path: _path2, value: baseValue[_i2] });
        }
    }
}

function generateObjectPatches(state, basepath, patches, inversePatches, baseValue, resultValue) {
    each(state.assigned, function (key, assignedValue) {
        var origValue = baseValue[key];
        var value = resultValue[key];
        var op = !assignedValue ? "remove" : key in baseValue ? "replace" : "add";
        if (origValue === baseValue && op === "replace") return;
        var path = basepath.concat(key);
        patches.push(op === "remove" ? { op: op, path: path } : { op: op, path: path, value: value });
        inversePatches.push(op === "add" ? { op: "remove", path: path } : op === "remove" ? { op: "add", path: path, value: origValue } : { op: "replace", path: path, value: origValue });
    });
}

function applyPatches(draft, patches) {
    for (var i = 0; i < patches.length; i++) {
        var patch = patches[i];
        var path = patch.path;

        if (path.length === 0 && patch.op === "replace") {
            draft = patch.value;
        } else {
            var base = draft;
            for (var _i3 = 0; _i3 < path.length - 1; _i3++) {
                base = base[path[_i3]];
                if (!base || (typeof base === "undefined" ? "undefined" : _typeof$1(base)) !== "object") throw new Error("Cannot apply patch, path doesn't resolve: " + path.join("/"));
            }
            var key = path[path.length - 1];
            switch (patch.op) {
                case "replace":
                case "add":
                    // TODO: add support is not extensive, it does not support insertion or `-` atm!
                    base[key] = patch.value;
                    break;
                case "remove":
                    if (Array.isArray(base)) {
                        if (key === base.length - 1) base.length -= 1;else throw new Error("Remove can only remove the last key of an array, index: " + key + ", length: " + base.length);
                    } else delete base[key];
                    break;
                default:
                    throw new Error("Unsupported patch operation: " + patch.op);
            }
        }
    }
    return draft;
}

var NOTHING = typeof Symbol !== "undefined" ? Symbol("immer-nothing") : defineProperty$1({}, "immer-nothing", true);

var PROXY_STATE = typeof Symbol !== "undefined" ? Symbol("immer-proxy-state") : "__$immer_state";

var RETURNED_AND_MODIFIED_ERROR = "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.";

function verifyMinified() {}

var inProduction = typeof process !== "undefined" && process.env.NODE_ENV === "production" || verifyMinified.name !== "verifyMinified";

var autoFreeze = !inProduction;
var useProxies = typeof Proxy !== "undefined" && typeof Reflect !== "undefined";

function getUseProxies() {
    return useProxies;
}

function isProxy(value) {
    return !!value && !!value[PROXY_STATE];
}

function isProxyable(value) {
    if (!value) return false;
    if ((typeof value === "undefined" ? "undefined" : _typeof$1(value)) !== "object") return false;
    if (Array.isArray(value)) return true;
    var proto = Object.getPrototypeOf(value);
    return proto === null || proto === Object.prototype;
}

function freeze(value) {
    if (autoFreeze) {
        Object.freeze(value);
    }
    return value;
}

var assign = Object.assign || function assign(target, value) {
    for (var key in value) {
        if (has(value, key)) {
            target[key] = value[key];
        }
    }
    return target;
};

function shallowCopy(value) {
    if (Array.isArray(value)) return value.slice();
    var target = value.__proto__ === undefined ? Object.create(null) : {};
    return assign(target, value);
}

function each(value, cb) {
    if (Array.isArray(value)) {
        for (var i = 0; i < value.length; i++) {
            cb(i, value[i]);
        }
    } else {
        for (var key in value) {
            cb(key, value[key]);
        }
    }
}

function has(thing, prop) {
    return Object.prototype.hasOwnProperty.call(thing, prop);
}

// given a base object, returns it if unmodified, or return the changed cloned if modified
function finalize(base, path, patches, inversePatches) {
    if (isProxy(base)) {
        var state = base[PROXY_STATE];
        if (state.modified === true) {
            if (state.finalized === true) return state.copy;
            state.finalized = true;
            var result = finalizeObject(useProxies ? state.copy : state.copy = shallowCopy(base), state, path, patches, inversePatches);
            generatePatches(state, path, patches, inversePatches, state.base, result);
            return result;
        } else {
            return state.base;
        }
    }
    finalizeNonProxiedObject(base);
    return base;
}

function finalizeObject(copy, state, path, patches, inversePatches) {
    var base = state.base;
    each(copy, function (prop, value) {
        if (value !== base[prop]) {
            // if there was an assignment on this property, we don't need to generate
            // patches for the subtree
            var _generatePatches = patches && !has(state.assigned, prop);
            copy[prop] = finalize(value, _generatePatches && path.concat(prop), _generatePatches && patches, inversePatches);
        }
    });
    return freeze(copy);
}

function finalizeNonProxiedObject(parent) {
    // If finalize is called on an object that was not a proxy, it means that it is an object that was not there in the original
    // tree and it could contain proxies at arbitrarily places. Let's find and finalize them as well
    if (!isProxyable(parent)) return;
    if (Object.isFrozen(parent)) return;
    each(parent, function (i, child) {
        if (isProxy(child)) {
            parent[i] = finalize(child);
        } else finalizeNonProxiedObject(child);
    });
}

function is(x, y) {
    // From: https://github.com/facebook/fbjs/blob/c69904a511b900266935168223063dd8772dfc40/packages/fbjs/src/core/shallowEqual.js
    if (x === y) {
        return x !== 0 || 1 / x === 1 / y;
    } else {
        return x !== x && y !== y;
    }
}

// @ts-check

var proxies = null;

var objectTraps = {
    get: get$1,
    has: function has$$1(target, prop) {
        return prop in source(target);
    },
    ownKeys: function ownKeys(target) {
        return Reflect.ownKeys(source(target));
    },

    set: set$1,
    deleteProperty: deleteProperty,
    getOwnPropertyDescriptor: getOwnPropertyDescriptor,
    defineProperty: defineProperty$1$1,
    setPrototypeOf: function setPrototypeOf() {
        throw new Error("Immer does not support `setPrototypeOf()`.");
    }
};

var arrayTraps = {};
each(objectTraps, function (key, fn) {
    arrayTraps[key] = function () {
        arguments[0] = arguments[0][0];
        return fn.apply(this, arguments);
    };
});
arrayTraps.deleteProperty = function (state, prop) {
    if (isNaN(parseInt(prop))) throw new Error("Immer does not support deleting properties from arrays: " + prop);
    return objectTraps.deleteProperty.call(this, state[0], prop);
};
arrayTraps.set = function (state, prop, value) {
    if (prop !== "length" && isNaN(parseInt(prop))) throw new Error("Immer does not support setting non-numeric properties on arrays: " + prop);
    return objectTraps.set.call(this, state[0], prop, value);
};

function createState(parent, base) {
    return {
        modified: false, // this tree is modified (either this object or one of it's children)
        assigned: {}, // true: value was assigned to these props, false: was removed
        finalized: false,
        parent: parent,
        base: base,
        copy: undefined,
        proxies: {}
    };
}

function source(state) {
    return state.modified === true ? state.copy : state.base;
}

function get$1(state, prop) {
    if (prop === PROXY_STATE) return state;
    if (state.modified) {
        var value = state.copy[prop];
        if (value === state.base[prop] && isProxyable(value))
            // only create proxy if it is not yet a proxy, and not a new object
            // (new objects don't need proxying, they will be processed in finalize anyway)
            return state.copy[prop] = createProxy(state, value);
        return value;
    } else {
        if (has(state.proxies, prop)) return state.proxies[prop];
        var _value = state.base[prop];
        if (!isProxy(_value) && isProxyable(_value)) return state.proxies[prop] = createProxy(state, _value);
        return _value;
    }
}

function set$1(state, prop, value) {
    // TODO: optimize
    state.assigned[prop] = true;
    if (!state.modified) {
        if (prop in state.base && is(state.base[prop], value) || has(state.proxies, prop) && state.proxies[prop] === value) return true;
        markChanged(state);
    }
    state.copy[prop] = value;
    return true;
}

function deleteProperty(state, prop) {
    state.assigned[prop] = false;
    markChanged(state);
    delete state.copy[prop];
    return true;
}

function getOwnPropertyDescriptor(state, prop) {
    var owner = state.modified ? state.copy : has(state.proxies, prop) ? state.proxies : state.base;
    var descriptor = Reflect.getOwnPropertyDescriptor(owner, prop);
    if (descriptor && !(Array.isArray(owner) && prop === "length")) descriptor.configurable = true;
    return descriptor;
}

function defineProperty$1$1() {
    throw new Error("Immer does not support defining properties on draft objects.");
}

function markChanged(state) {
    if (!state.modified) {
        state.modified = true;
        state.copy = shallowCopy(state.base);
        // copy the proxies over the base-copy
        Object.assign(state.copy, state.proxies); // yup that works for arrays as well
        if (state.parent) markChanged(state.parent);
    }
}

// creates a proxy for plain objects / arrays
function createProxy(parentState, base) {
    if (isProxy(base)) throw new Error("Immer bug. Plz report.");
    var state = createState(parentState, base);
    var proxy = Array.isArray(base) ? Proxy.revocable([state], arrayTraps) : Proxy.revocable(state, objectTraps);
    proxies.push(proxy);
    return proxy.proxy;
}

function produceProxy(baseState, producer, patchListener) {
    if (isProxy(baseState)) {
        // See #100, don't nest producers
        var returnValue = producer.call(baseState, baseState);
        return returnValue === undefined ? baseState : returnValue;
    }
    var previousProxies = proxies;
    proxies = [];
    var patches = patchListener && [];
    var inversePatches = patchListener && [];
    try {
        // create proxy for root
        var rootProxy = createProxy(undefined, baseState);
        // execute the thunk
        var _returnValue = producer.call(rootProxy, rootProxy);
        // and finalize the modified proxy
        var result = void 0;
        // check whether the draft was modified and/or a value was returned
        if (_returnValue !== undefined && _returnValue !== rootProxy) {
            // something was returned, and it wasn't the proxy itself
            if (rootProxy[PROXY_STATE].modified) throw new Error(RETURNED_AND_MODIFIED_ERROR);

            // See #117
            // Should we just throw when returning a proxy which is not the root, but a subset of the original state?
            // Looks like a wrongly modeled reducer
            result = finalize(_returnValue);
            if (patches) {
                patches.push({ op: "replace", path: [], value: result });
                inversePatches.push({ op: "replace", path: [], value: baseState });
            }
        } else {
            result = finalize(rootProxy, [], patches, inversePatches);
        }
        // revoke all proxies
        each(proxies, function (_, p) {
            return p.revoke();
        });
        patchListener && patchListener(patches, inversePatches);
        return result;
    } finally {
        proxies = previousProxies;
    }
}

// @ts-check

var descriptors = {};
var states = null;

function createState$1(parent, proxy, base) {
    return {
        modified: false,
        assigned: {}, // true: value was assigned to these props, false: was removed
        hasCopy: false,
        parent: parent,
        base: base,
        proxy: proxy,
        copy: undefined,
        finished: false,
        finalizing: false,
        finalized: false
    };
}

function source$1(state) {
    return state.hasCopy ? state.copy : state.base;
}

function _get(state, prop) {
    assertUnfinished(state);
    var value = source$1(state)[prop];
    if (!state.finalizing && value === state.base[prop] && isProxyable(value)) {
        // only create a proxy if the value is proxyable, and the value was in the base state
        // if it wasn't in the base state, the object is already modified and we will process it in finalize
        prepareCopy(state);
        return state.copy[prop] = createProxy$1(state, value);
    }
    return value;
}

function _set(state, prop, value) {
    assertUnfinished(state);
    state.assigned[prop] = true; // optimization; skip this if there is no listener
    if (!state.modified) {
        if (is(source$1(state)[prop], value)) return;
        markChanged$1(state);
        prepareCopy(state);
    }
    state.copy[prop] = value;
}

function markChanged$1(state) {
    if (!state.modified) {
        state.modified = true;
        if (state.parent) markChanged$1(state.parent);
    }
}

function prepareCopy(state) {
    if (state.hasCopy) return;
    state.hasCopy = true;
    state.copy = shallowCopy(state.base);
}

// creates a proxy for plain objects / arrays
function createProxy$1(parent, base) {
    var proxy = shallowCopy(base);
    each(base, function (i) {
        Object.defineProperty(proxy, "" + i, createPropertyProxy("" + i));
    });
    var state = createState$1(parent, proxy, base);
    createHiddenProperty(proxy, PROXY_STATE, state);
    states.push(state);
    return proxy;
}

function createPropertyProxy(prop) {
    return descriptors[prop] || (descriptors[prop] = {
        configurable: true,
        enumerable: true,
        get: function get$$1() {
            return _get(this[PROXY_STATE], prop);
        },
        set: function set$$1(value) {
            _set(this[PROXY_STATE], prop, value);
        }
    });
}

function assertUnfinished(state) {
    if (state.finished === true) throw new Error("Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + JSON.stringify(state.copy || state.base));
}

// this sounds very expensive, but actually it is not that expensive in practice
// as it will only visit proxies, and only do key-based change detection for objects for
// which it is not already know that they are changed (that is, only object for which no known key was changed)
function markChangesSweep() {
    // intentionally we process the proxies in reverse order;
    // ideally we start by processing leafs in the tree, because if a child has changed, we don't have to check the parent anymore
    // reverse order of proxy creation approximates this
    for (var i = states.length - 1; i >= 0; i--) {
        var state = states[i];
        if (state.modified === false) {
            if (Array.isArray(state.base)) {
                if (hasArrayChanges(state)) markChanged$1(state);
            } else if (hasObjectChanges(state)) markChanged$1(state);
        }
    }
}

function markChangesRecursively(object) {
    if (!object || (typeof object === "undefined" ? "undefined" : _typeof$1(object)) !== "object") return;
    var state = object[PROXY_STATE];
    if (!state) return;
    var proxy = state.proxy,
        base = state.base;

    if (Array.isArray(object)) {
        if (hasArrayChanges(state)) {
            markChanged$1(state);
            state.assigned.length = true;
            if (proxy.length < base.length) for (var i = proxy.length; i < base.length; i++) {
                state.assigned[i] = false;
            } else for (var _i = base.length; _i < proxy.length; _i++) {
                state.assigned[_i] = true;
            }each(proxy, function (index, child) {
                if (!state.assigned[index]) markChangesRecursively(child);
            });
        }
    } else {
        var _diffKeys = diffKeys(base, proxy),
            added = _diffKeys.added,
            removed = _diffKeys.removed;

        if (added.length > 0 || removed.length > 0) markChanged$1(state);
        each(added, function (_, key) {
            state.assigned[key] = true;
        });
        each(removed, function (_, key) {
            state.assigned[key] = false;
        });
        each(proxy, function (key, child) {
            if (!state.assigned[key]) markChangesRecursively(child);
        });
    }
}

function diffKeys(from, to) {
    // TODO: optimize
    var a = Object.keys(from);
    var b = Object.keys(to);
    return {
        added: b.filter(function (key) {
            return a.indexOf(key) === -1;
        }),
        removed: a.filter(function (key) {
            return b.indexOf(key) === -1;
        })
    };
}

function hasObjectChanges(state) {
    var base = state.base,
        proxy = state.proxy;

    // Search for added keys. Start at the back, because non-numeric keys
    // are ordered by time of definition on the object.

    var keys = Object.keys(proxy);
    for (var i = keys.length; i !== 0;) {
        var key = keys[--i];

        // The `undefined` check is a fast path for pre-existing keys.
        if (base[key] === undefined && !has(base, key)) {
            return true;
        }
    }

    // Since no keys have been added, we can compare lengths to know if an
    // object has been deleted.
    return keys.length !== Object.keys(base).length;
}

function hasArrayChanges(state) {
    var proxy = state.proxy;

    if (proxy.length !== state.base.length) return true;
    // See #116
    // If we first shorten the length, our array interceptors will be removed.
    // If after that new items are added, result in the same original length,
    // those last items will have no intercepting property.
    // So if there is no own descriptor on the last position, we know that items were removed and added
    // N.B.: splice, unshift, etc only shift values around, but not prop descriptors, so we only have to check
    // the last one
    var descriptor = Object.getOwnPropertyDescriptor(proxy, proxy.length - 1);
    // descriptor can be null, but only for newly created sparse arrays, eg. new Array(10)
    if (descriptor && !descriptor.get) return true;
    // For all other cases, we don't have to compare, as they would have been picked up by the index setters
    return false;
}

function produceEs5(baseState, producer, patchListener) {
    if (isProxy(baseState)) {
        // See #100, don't nest producers
        var returnValue = producer.call(baseState, baseState);
        return returnValue === undefined ? baseState : returnValue;
    }
    var prevStates = states;
    states = [];
    var patches = patchListener && [];
    var inversePatches = patchListener && [];
    try {
        // create proxy for root
        var rootProxy = createProxy$1(undefined, baseState);
        // execute the thunk
        var _returnValue = producer.call(rootProxy, rootProxy);
        // and finalize the modified proxy
        each(states, function (_, state) {
            state.finalizing = true;
        });
        var result = void 0;
        // check whether the draft was modified and/or a value was returned
        if (_returnValue !== undefined && _returnValue !== rootProxy) {
            // something was returned, and it wasn't the proxy itself
            if (rootProxy[PROXY_STATE].modified) throw new Error(RETURNED_AND_MODIFIED_ERROR);
            result = finalize(_returnValue);
            if (patches) {
                patches.push({ op: "replace", path: [], value: result });
                inversePatches.push({ op: "replace", path: [], value: baseState });
            }
        } else {
            if (patchListener) markChangesRecursively(rootProxy);
            markChangesSweep(); // this one is more efficient if we don't need to know which attributes have changed
            result = finalize(rootProxy, [], patches, inversePatches);
        }
        // make sure all proxies become unusable
        each(states, function (_, state) {
            state.finished = true;
        });
        patchListener && patchListener(patches, inversePatches);
        return result;
    } finally {
        states = prevStates;
    }
}

function createHiddenProperty(target, prop, value) {
    Object.defineProperty(target, prop, {
        value: value,
        enumerable: false,
        writable: true
    });
}

/**
 * produce takes a state, and runs a function against it.
 * That function can freely mutate the state, as it will create copies-on-write.
 * This means that the original state will stay unchanged, and once the function finishes, the modified state is returned
 *
 * @export
 * @param {any} baseState - the state to start with
 * @param {Function} producer - function that receives a proxy of the base state as first argument and which can be freely modified
 * @param {Function} patchListener - optional function that will be called with all the patches produced here
 * @returns {any} a new state, or the base state if nothing was modified
 */
function produce(baseState, producer, patchListener) {
    // prettier-ignore
    if (arguments.length < 1 || arguments.length > 3) throw new Error("produce expects 1 to 3 arguments, got " + arguments.length);

    // curried invocation
    if (typeof baseState === "function" && typeof producer !== "function") {
        var initialState = producer;
        var recipe = baseState;

        return function () {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            var currentState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;

            return produce(currentState, function (draft) {
                return recipe.call.apply(recipe, [draft, draft].concat(args));
            });
        };
    }

    // prettier-ignore
    {
        if (typeof producer !== "function") throw new Error("if first argument is not a function, the second argument to produce should be a function");
        if (patchListener !== undefined && typeof patchListener !== "function") throw new Error("the third argument of a producer should not be set or a function");
    }

    // avoid proxying anything except plain objects and arrays
    if (!isProxyable(baseState)) {
        var returnValue = producer(baseState);
        return returnValue === undefined ? baseState : normalizeResult(returnValue);
    }

    return normalizeResult(getUseProxies() ? produceProxy(baseState, producer, patchListener) : produceEs5(baseState, producer, patchListener));
}

function normalizeResult(result) {
    return result === NOTHING ? undefined : result;
}

var applyPatches$1 = produce(applyPatches);

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Plugin that allows using Immer to make immutable changes
 * to G by just mutating it.
 */
var PluginImmer = {
  fnWrap: function fnWrap(move) {
    return produce(move);
  }
};

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * List of plugins that are always added.
 */
var DEFAULT_PLUGINS = [PluginImmer];

/**
 * Applies the provided plugins to ctx during game setup.
 *
 * @param {object} ctx - The ctx object.
 * @param {Array} plugins - Array of plugins.
 */
var SetupCtx = function SetupCtx(ctx, plugins) {
  [].concat(DEFAULT_PLUGINS, toConsumableArray(plugins)).filter(function (plugin) {
    return plugin.setupCtx !== undefined;
  }).forEach(function (plugin) {
    ctx = plugin.setupCtx(ctx);
  });
  return ctx;
};

/**
 * Applies the provided plugins to G.
 *
 * @param {object} G - The G object.
 * @param {object} ctx - The ctx object.
 * @param {Array} plugins - Array of plugins.
 */
var SetupG = function SetupG(G, ctx, plugins) {
  [].concat(DEFAULT_PLUGINS, toConsumableArray(plugins)).filter(function (plugin) {
    return plugin.setupG !== undefined;
  }).forEach(function (plugin) {
    G = plugin.setupG(G, ctx);
  });
  return G;
};

/**
 * Applies the provided plugins to ctx before processing a move / event.
 *
 * @param {object} ctx - The ctx object.
 * @param {Array} plugins - Array of plugins.
 */


/**
 * Removes the provided plugins to ctx after processing a move / event.
 *
 * @param {object} ctx - The ctx object.
 * @param {Array} plugins - Array of plugins.
 */


/**
 * Applies the provided plugins to G before processing a move / event.
 *
 * @param {object} G - The G object.
 * @param {Array} plugins - Array of plugins.
 */


/**
 * Removes the provided plugins to G after processing a move / event.
 *
 * @param {object} G - The G object.
 * @param {Array} plugins - Array of plugins.
 */


/**
 * Applies the provided plugins to the given move / flow function.
 *
 * @param {function} fn - The move function or trigger to apply the plugins to.
 * @param {Array} plugins - Array of plugins.
 */

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Moves can return this when they want to indicate
 * that the combination of arguments is illegal and
 * the move ought to be discarded.
 */
var INVALID_MOVE = 'INVALID_MOVE';

/**
 * Context API to allow writing custom logs in games.
 */
var GameLoggerCtxAPI = function () {
  function GameLoggerCtxAPI() {
    classCallCheck(this, GameLoggerCtxAPI);

    this._payload = undefined;
  }

  createClass(GameLoggerCtxAPI, [{
    key: '_api',
    value: function _api() {
      var _this = this;

      return {
        setPayload: function setPayload(payload) {
          _this._payload = payload;
        }
      };
    }
  }, {
    key: 'attach',
    value: function attach(ctx) {
      return _extends({}, ctx, { log: this._api() });
    }
  }, {
    key: 'update',
    value: function update(state) {
      if (this._payload === undefined) {
        return state;
      }

      // attach the payload to the last log event
      var deltalog = state.deltalog;
      deltalog[deltalog.length - 1] = _extends({}, deltalog[deltalog.length - 1], {
        payload: this._payload
      });
      this._payload = undefined;

      return _extends({}, state, { deltalog: deltalog });
    }
  }], [{
    key: 'detach',
    value: function detach(ctx) {
      var log = ctx.log,
          ctxWithoutLog = objectWithoutProperties(ctx, ['log']); // eslint-disable-line no-unused-vars

      return ctxWithoutLog;
    }
  }]);
  return GameLoggerCtxAPI;
}();

/**
 * This class is used to attach/detach various utility objects
 * onto a ctx, without having to manually attach/detach them
 * all separately.
 */
var ContextEnhancer = function () {
  function ContextEnhancer(ctx, game, player) {
    classCallCheck(this, ContextEnhancer);

    this.random = new Random(ctx);
    this.events = new Events(game.flow, player);
    this.log = new GameLoggerCtxAPI();
  }

  createClass(ContextEnhancer, [{
    key: 'attachToContext',
    value: function attachToContext(ctx) {
      var ctxWithAPI = this.random.attach(ctx);
      ctxWithAPI = this.events.attach(ctxWithAPI);
      ctxWithAPI = this.log.attach(ctxWithAPI);
      return ctxWithAPI;
    }
  }, {
    key: '_update',
    value: function _update(state, updateEvents) {
      var newState = updateEvents ? this.events.update(state) : state;
      newState = this.random.update(newState);
      newState = this.log.update(newState);
      return newState;
    }
  }, {
    key: 'updateAndDetach',
    value: function updateAndDetach(state, updateEvents) {
      var newState = this._update(state, updateEvents);
      newState.ctx = ContextEnhancer.detachAllFromContext(newState.ctx);
      return newState;
    }
  }], [{
    key: 'detachAllFromContext',
    value: function detachAllFromContext(ctx) {
      var ctxWithoutAPI = Random.detach(ctx);
      ctxWithoutAPI = Events.detach(ctxWithoutAPI);
      ctxWithoutAPI = GameLoggerCtxAPI.detach(ctxWithoutAPI);
      return ctxWithoutAPI;
    }
  }]);
  return ContextEnhancer;
}();

/**
 * CreateGameReducer
 *
 * Creates the main game state reducer.
 * @param {...object} game - Return value of Game().
 * @param {...object} numPlayers - The number of players.
 * @param {...object} multiplayer - Set to true if we are in a multiplayer client.
 */
function CreateGameReducer(_ref) {
  var game = _ref.game,
      numPlayers = _ref.numPlayers,
      multiplayer = _ref.multiplayer,
      setupData = _ref.setupData;

  if (!numPlayers) {
    numPlayers = 2;
  }

  var ctx = game.flow.ctx(numPlayers);

  var seed = game.seed;
  if (seed === undefined) {
    seed = Random.seed();
  }
  ctx._random = { seed: seed };

  // Pass ctx through all the plugins that want to modify it.
  ctx = SetupCtx(ctx, game.plugins);

  // Augment ctx with the enhancers (TODO: move these into plugins).
  var apiCtx = new ContextEnhancer(ctx, game, ctx.currentPlayer);
  var ctxWithAPI = apiCtx.attachToContext(ctx);

  var initialG = game.setup(ctxWithAPI, setupData);

  // Pass G through all the plugins that want to modify it.
  initialG = SetupG(initialG, ctxWithAPI, game.plugins);

  var initial = {
    // User managed state.
    G: initialG,

    // Framework managed state.
    ctx: ctx,

    // List of {G, ctx} pairs that can be undone.
    _undo: [],

    // List of {G, ctx} pairs that can be redone.
    _redo: [],

    // A monotonically non-decreasing ID to ensure that
    // state updates are only allowed from clients that
    // are at the same version that the server.
    _stateID: 0,

    // A snapshot of this object so that actions can be
    // replayed over it to view old snapshots.
    _initial: {}
  };

  var state = game.flow.init({ G: initial.G, ctx: ctxWithAPI });

  initial.G = state.G;
  initial._undo = state._undo;
  state = apiCtx.updateAndDetach(state, true);
  initial.ctx = state.ctx;

  var deepCopy = function deepCopy(obj) {
    return parse(stringify(obj));
  };
  initial._initial = deepCopy(initial);

  /**
   * GameReducer
   *
   * Redux reducer that maintains the overall game state.
   * @param {object} state - The state before the action.
   * @param {object} action - A Redux action.
   */
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initial;
    var action = arguments[1];

    switch (action.type) {
      case GAME_EVENT:
        {
          state = _extends({}, state, { deltalog: [] });

          // Process game events only on the server.
          // These events like `endTurn` typically
          // contain code that may rely on secret state
          // and cannot be computed on the client.
          if (multiplayer) {
            return state;
          }

          // Ignore the event if the player isn't allowed to make it.
          if (action.payload.playerID !== null && action.payload.playerID !== undefined && !game.flow.canPlayerCallEvent(state.G, state.ctx, action.payload.playerID)) {
            return state;
          }

          var _apiCtx = new ContextEnhancer(state.ctx, game, action.payload.playerID);
          state.ctx = _apiCtx.attachToContext(state.ctx);

          var newState = game.flow.processGameEvent(state, action);

          newState = _apiCtx.updateAndDetach(newState, true);

          return _extends({}, newState, { _stateID: state._stateID + 1 });
        }

      case MAKE_MOVE:
        {
          state = _extends({}, state, { deltalog: [] });

          // Check whether the game knows the move at all.
          if (!game.moveNames.includes(action.payload.type)) {
            return state;
          }

          // Ignore the move if it isn't allowed at this point.
          if (!game.flow.canMakeMove(state.G, state.ctx, action.payload.type)) {
            return state;
          }

          // Ignore the move if the player isn't allowed to make it.
          if (action.payload.playerID !== null && action.payload.playerID !== undefined && !game.flow.canPlayerMakeMove(state.G, state.ctx, action.payload.playerID)) {
            return state;
          }

          var _apiCtx2 = new ContextEnhancer(state.ctx, game, action.payload.playerID);
          var _ctxWithAPI = _apiCtx2.attachToContext(state.ctx);

          // Process the move.
          var G = game.processMove(state.G, action.payload, _ctxWithAPI);
          if (G === INVALID_MOVE) {
            // the game declared the move as invalid.
            return state;
          }

          // don't call into events here
          var _newState = _apiCtx2.updateAndDetach(_extends({}, state, { deltalog: [{ action: action, _stateID: state._stateID }] }), false);
          var _ctx = _newState.ctx;

          // Undo changes to G if the move should not run on the client.
          if (multiplayer && !game.flow.optimisticUpdate(G, _ctx, action.payload)) {
            G = state.G;
          }

          state = _extends({}, _newState, { G: G, ctx: _ctx, _stateID: state._stateID + 1 });

          // If we're on the client, just process the move
          // and no triggers in multiplayer mode.
          // These will be processed on the server, which
          // will send back a state update.
          if (multiplayer) {
            return state;
          }

          // Allow the flow reducer to process any triggers that happen after moves.
          _ctxWithAPI = _apiCtx2.attachToContext(state.ctx);
          state = game.flow.processMove(_extends({}, state, { ctx: _ctxWithAPI }), action.payload);
          state = _apiCtx2.updateAndDetach(state, true);

          return state;
        }

      case UPDATE:
      case SYNC:
        {
          return action.state;
        }

      case RESET:
        {
          return initial;
        }

      case UNDO:
        {
          var _state = state,
              _undo = _state._undo,
              _redo = _state._redo;


          if (_undo.length < 2) {
            return state;
          }

          var last = _undo[_undo.length - 1];
          var restore = _undo[_undo.length - 2];

          // Only allow undoable moves to be undone.
          if (!game.flow.canUndoMove(state.G, state.ctx, last.moveType)) {
            return state;
          }

          return _extends({}, state, {
            G: restore.G,
            ctx: restore.ctx,
            _undo: _undo.slice(0, _undo.length - 1),
            _redo: [last].concat(toConsumableArray(_redo))
          });
        }

      case REDO:
        {
          var _state2 = state,
              _undo2 = _state2._undo,
              _redo2 = _state2._redo;


          if (_redo2.length == 0) {
            return state;
          }

          var first = _redo2[0];

          return _extends({}, state, {
            G: first.G,
            ctx: first.ctx,
            _undo: [].concat(toConsumableArray(_undo2), [first]),
            _redo: _redo2.slice(1)
          });
        }

      default:
        {
          return state;
        }
    }
  };
}

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

var Router = require('koa-router');
var koaBody = require('koa-body');
var uuid = require('uuid/v4');
var cors = require('@koa/cors');
var Redux = require('redux');

var createCredentials = function createCredentials() {
  return uuid();
};
var getGameMetadataKey = function getGameMetadataKey(gameID) {
  return gameID + ':metadata';
};
var isGameMetadataKey = function isGameMetadataKey(key, gameName) {
  return key.match(gameName + ':.*:metadata');
};
var getNamespacedGameID = function getNamespacedGameID(gameID, gameName) {
  return gameName + ':' + gameID;
};
var getNewGameInstanceID = function getNewGameInstanceID() {
  return uuid();
};
var createGameMetadata = function createGameMetadata() {
  return {
    players: {}
  };
};

var isActionFromAuthenticPlayer = async function isActionFromAuthenticPlayer(_ref) {
  var action = _ref.action,
      db = _ref.db,
      gameID = _ref.gameID,
      playerID = _ref.playerID;

  var gameMetadata = await db.get(getGameMetadataKey(gameID));
  if (!gameMetadata) {
    return true;
  }

  if (!action.payload) {
    return true;
  }

  var hasCredentials = Object.keys(gameMetadata.players).some(function (key) {
    return !!(gameMetadata.players[key] && gameMetadata.players[key].credentials);
  });
  if (!hasCredentials) {
    return true;
  }

  if (!action.payload.credentials) {
    return false;
  }

  if (action.payload.credentials !== gameMetadata.players[playerID].credentials) {
    return false;
  }

  return true;
};

var addApiToServer = function addApiToServer(_ref2) {
  var app = _ref2.app,
      db = _ref2.db,
      games = _ref2.games;

  var router = new Router();

  router.get('/games', async function (ctx) {
    ctx.body = games.map(function (game) {
      return game.name;
    });
  });

  router.post('/games/:name/create', koaBody(), async function (ctx) {
    var gameName = ctx.params.name;
    var numPlayers = parseInt(ctx.request.body.numPlayers);
    if (!numPlayers) {
      numPlayers = 2;
    }

    var gameMetadata = createGameMetadata();

    var game = games.find(function (g) {
      return g.name === gameName;
    });
    var reducer = CreateGameReducer({
      game: game,
      numPlayers: numPlayers,
      setupData: ctx.request.body.setupData
    });
    var store = Redux.createStore(reducer);
    var state = store.getState();

    for (var playerIndex = 0; playerIndex < numPlayers; playerIndex++) {
      var credentials = createCredentials();
      gameMetadata.players[playerIndex] = { id: playerIndex, credentials: credentials };
    }

    var gameID = getNewGameInstanceID();
    var namespacedGameID = getNamespacedGameID(gameID, gameName);

    await db.set(getGameMetadataKey(namespacedGameID), gameMetadata);
    await db.set(namespacedGameID, state);

    ctx.body = {
      gameID: gameID
    };
  });

  router.get('/games/:name', async function (ctx) {
    var gameName = ctx.params.name;
    var gameList = await db.list();
    var gameInstances = [];

    var _arr = [].concat(toConsumableArray(gameList));

    for (var _i = 0; _i < _arr.length; _i++) {
      var key = _arr[_i];
      if (isGameMetadataKey(key, gameName)) {
        var gameID = key.slice(gameName.length + 1, key.lastIndexOf(':metadata'));
        var metadata = await db.get(key);
        gameInstances.push({
          gameID: gameID,
          players: Object.values(metadata.players).map(function (player) {
            // strip away credentials
            return { id: player.id, name: player.name };
          })
        });
      }
    }
    ctx.body = {
      gameInstances: gameInstances
    };
  });

  router.post('/games/:name/:id/join', koaBody(), async function (ctx) {
    var gameName = ctx.params.name;
    var gameID = ctx.params.id;
    var playerID = ctx.request.body.playerID;
    var playerName = ctx.request.body.playerName;
    var namespacedGameID = getNamespacedGameID(gameID, gameName);
    var gameMetadata = await db.get(getGameMetadataKey(namespacedGameID));

    if (!gameMetadata) {
      ctx.throw(404, 'Game ' + gameID + ' not found');
    }
    if (!gameMetadata.players[playerID]) {
      ctx.throw(404, 'Player ' + playerID + ' not found');
    }
    if (gameMetadata.players[playerID].name) {
      ctx.throw(409, 'Player ' + playerID + ' not available');
    }

    gameMetadata.players[playerID].name = playerName;
    var playerCredentials = gameMetadata.players[playerID].credentials;

    await db.set(getGameMetadataKey(namespacedGameID), gameMetadata);

    ctx.body = {
      playerCredentials: playerCredentials
    };
  });

  router.post('/games/:name/:id/leave', koaBody(), async function (ctx) {
    var gameName = ctx.params.name;
    var gameID = ctx.params.id;
    var playerID = ctx.request.body.playerID;
    var playerCredentials = ctx.request.body.playerCredentials;
    var namespacedGameID = getNamespacedGameID(gameID, gameName);
    var gameMetadata = await db.get(getGameMetadataKey(namespacedGameID));

    if (!gameMetadata) {
      ctx.throw(404, 'Game ' + gameID + ' not found');
    }
    if (!gameMetadata.players[playerID]) {
      ctx.throw(404, 'Player ' + playerID + ' not found');
    }
    if (playerCredentials !== gameMetadata.players[playerID].credentials) {
      ctx.throw(403, 'Invalid credentials ' + playerCredentials);
    }

    delete gameMetadata.players[playerID].name;
    if (Object.values(gameMetadata.players).some(function (val) {
      return val.name;
    })) {
      await db.set(getGameMetadataKey(namespacedGameID), gameMetadata);
    } else {
      // remove game
      await db.remove(gameID);
      await db.remove(getGameMetadataKey(namespacedGameID));
    }
    ctx.body = {};
  });

  app.use(cors());

  // If API_SECRET is set, then require that requests set an
  // api-secret header that is set to the same value.
  app.use(async function (ctx, next) {
    if (!!process.env.API_SECRET && ctx.request.headers['api-secret'] !== process.env.API_SECRET) {
      ctx.throw(403, 'Invalid API secret');
    }

    await next();
  });

  app.use(router.routes()).use(router.allowedMethods());

  return app;
};

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * InMemory data storage.
 */
var InMemory = function () {
  /**
   * Creates a new InMemory storage.
   */
  function InMemory() {
    classCallCheck(this, InMemory);

    this.games = new Map();
  }

  /**
   * Connect.
   * No-op for the InMemory instance.
   */


  createClass(InMemory, [{
    key: "connect",
    value: async function connect() {
      return;
    }

    /**
     * Write the game state to the in-memory object.
     * @param {string} id - The game id.
     * @param {object} store - A game state to persist.
     */

  }, {
    key: "set",
    value: async function set$$1(id, state) {
      return await this.games.set(id, state);
    }

    /**
     * Read the game state from the in-memory object.
     * @param {string} id - The game id.
     * @returns {object} - A game state, or undefined
     *                     if no game is found with this id.
     */

  }, {
    key: "get",
    value: async function get$$1(id) {
      return await this.games.get(id);
    }

    /**
     * Check if a particular game id exists.
     * @param {string} id - The game id.
     * @returns {boolean} - True if a game with this id exists.
     */

  }, {
    key: "has",
    value: async function has(id) {
      return await this.games.has(id);
    }

    /**
     * Remove the game state from the in-memory object.
     * @param {string} id - The game id.
     */

  }, {
    key: "remove",
    value: async function remove(id) {
      if (!(await this.games.has(id))) return;
      this.games.delete(id);
    }

    /**
     * Return all keys.
     * @returns {array} - Array of keys (strings)
     */

  }, {
    key: "list",
    value: async function list() {
      return [].concat(toConsumableArray((await this.games.keys())));
    }
  }]);
  return InMemory;
}();

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

var LRU = require('lru-cache');

/**
 * MongoDB connector.
 */
var Mongo = function () {
  /**
   * Creates a new Mongo connector object.
   */
  function Mongo(_ref) {
    var url = _ref.url,
        dbname = _ref.dbname,
        cacheSize = _ref.cacheSize,
        mockClient = _ref.mockClient;
    classCallCheck(this, Mongo);

    if (cacheSize === undefined) cacheSize = 1000;
    if (dbname === undefined) dbname = 'bgio';

    this.client = mockClient || require('mongodb').MongoClient;
    this.url = url;
    this.dbname = dbname;
    this.cache = new LRU({ max: cacheSize });
  }

  /**
   * Connect to the instance.
   */


  createClass(Mongo, [{
    key: 'connect',
    value: async function connect() {
      var c = await this.client.connect(this.url, { useNewUrlParser: true });
      this.db = c.db(this.dbname);
      return;
    }

    /**
     * Write the game state.
     * @param {string} id - The game id.
     * @param {object} store - A game state to persist.
     */

  }, {
    key: 'set',
    value: async function set$$1(id, state) {
      // Don't set a value if the cache has a more recent version.
      // This can occur due a race condition.
      //
      // For example:
      //
      // A --sync--> server | DB => 0 --+
      //                                |
      // A <--sync-- server | DB => 0 --+
      //
      // B --sync--> server | DB => 0 ----+
      //                                  |
      // A --move--> server | DB <= 1 --+ |
      //                                | |
      // A <--sync-- server | DB => 1 --+ |
      //                                  |
      // B <--sync-- server | DB => 0 ----+
      //
      var cacheValue = this.cache.get(id);
      if (cacheValue && cacheValue._stateID >= state._stateID) {
        return;
      }

      this.cache.set(id, state);

      var col = this.db.collection(id);
      delete state._id;
      await col.insertOne(state);

      return;
    }

    /**
     * Read the game state.
     * @param {string} id - The game id.
     * @returns {object} - A game state, or undefined
     *                     if no game is found with this id.
     */

  }, {
    key: 'get',
    value: async function get$$1(id) {
      var cacheValue = this.cache.get(id);
      if (cacheValue !== undefined) {
        return cacheValue;
      }

      var col = this.db.collection(id);
      var docs = await col.find().sort({ _id: -1 }).limit(1).toArray();

      var oldStateID = 0;
      cacheValue = this.cache.get(id);
      /* istanbul ignore next line */
      if (cacheValue !== undefined) {
        /* istanbul ignore next line */
        oldStateID = cacheValue._stateID;
      }

      var newStateID = -1;
      if (docs.length > 0) {
        newStateID = docs[0]._stateID;
      }

      // Update the cache, but only if the read
      // value is newer than the value already in it.
      // A race condition might overwrite the
      // cache with an older value, so we need this.
      if (newStateID >= oldStateID) {
        this.cache.set(id, docs[0]);
      }

      return docs[0];
    }

    /**
     * Check if a particular game exists.
     * @param {string} id - The game id.
     * @returns {boolean} - True if a game with this id exists.
     */

  }, {
    key: 'has',
    value: async function has(id) {
      var cacheValue = this.cache.get(id);
      if (cacheValue !== undefined) {
        return true;
      }

      var col = this.db.collection(id);
      var docs = await col.find().limit(1).toArray();
      return docs.length > 0;
    }

    /**
     * Remove the game state from the DB.
     * @param {string} id - The game id.
     */

  }, {
    key: 'remove',
    value: async function remove(id) {
      if (!(await this.has(id))) return;

      function _dropCollection(db, id) {
        return new Promise(function (ok) {
          db.dropCollection(id, ok);
        });
      }
      await _dropCollection(this.db, id);

      // Update the cache
      this.cache.del(id);
    }

    /**
     * Return all keys.
     * @returns {array} - Array of keys (strings)
     */

  }, {
    key: 'list',
    value: async function list() {
      var keys = await this.db.listCollections().toArray();
      return keys.map(function (r) {
        return r.name;
      });
    }
  }]);
  return Mongo;
}();

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

var LRU$1 = require('lru-cache');

var ENGINE_FIRESTORE = 'Firestore';
var ENGINE_RTDB = 'RTDB';

/**
 * Firebase RTDB/Firestore connector.
 */
var Firebase = function () {
  /**
   * Creates a new Firebase connector object.
   * The default engine is Firestore.
   * @constructor
   */
  function Firebase(_ref) {
    var config = _ref.config,
        dbname = _ref.dbname,
        engine = _ref.engine,
        cacheSize = _ref.cacheSize;
    classCallCheck(this, Firebase);

    if (cacheSize === undefined) {
      cacheSize = 1000;
    }

    if (dbname === undefined) {
      dbname = 'bgio';
    }

    // // TODO: better handling for possible errors
    if (config === undefined) {
      config = {};
    }

    this.client = require('firebase');
    this.engine = engine === ENGINE_RTDB ? engine : ENGINE_FIRESTORE;
    this.config = config;
    this.dbname = dbname;
    this.cache = new LRU$1({ max: cacheSize });
  }

  /**
   * Connect to the instance.
   */


  createClass(Firebase, [{
    key: 'connect',
    value: async function connect() {
      this.client.initializeApp(this.config);
      this.db = this.engine === ENGINE_FIRESTORE ? this.client.firestore() : this.client.database().ref();
      return;
    }

    /**
     * Write the game state.
     * @param {string} id - The game id.
     * @param {object} store - A game state to persist.
     */

  }, {
    key: 'set',
    value: async function set$$1(id, state) {
      var cacheValue = this.cache.get(id);
      if (cacheValue && cacheValue._stateID >= state._stateID) {
        return;
      }

      this.cache.set(id, state);

      var col = this.engine === ENGINE_RTDB ? this.db.child(id) : this.db.collection(this.dbname).doc(id);
      delete state._id;
      await col.set(state);

      return;
    }

    /**
     * Read the game state.
     * @param {string} id - The game id.
     * @returns {object} - A game state, or undefined
     *                     if no game is found with this id.
     */

  }, {
    key: 'get',
    value: async function get$$1(id) {
      var cacheValue = this.cache.get(id);
      if (cacheValue !== undefined) {
        return cacheValue;
      }

      var col = void 0,
          doc = void 0,
          data = void 0;
      if (this.engine === ENGINE_RTDB) {
        col = this.db.child(id);
        data = await col.once('value');
        doc = data.val() ? Object.assign({}, data.val(), { _id: id }) : data.val();
      } else {
        col = this.db.collection(this.dbname).doc(id);
        data = await col.get();
        doc = data.data() ? Object.assign({}, data.data(), { _id: id }) : data.data();
      }

      var oldStateID = 0;
      cacheValue = this.cache.get(id);
      /* istanbul ignore next line */
      if (cacheValue !== undefined) {
        /* istanbul ignore next line */
        oldStateID = cacheValue._stateID;
      }

      var newStateID = -1;
      if (doc) {
        newStateID = doc._stateID;
      }

      // Update the cache, but only if the read
      // value is newer than the value already in it.
      // A race condition might overwrite the
      // cache with an older value, so we need this.
      if (newStateID >= oldStateID) {
        this.cache.set(id, doc);
      }

      return doc;
    }

    /**
     * Check if a particular game exists.
     * @param {string} id - The game id.
     * @returns {boolean} - True if a game with this id exists.
     */

  }, {
    key: 'has',
    value: async function has(id) {
      var cacheValue = this.cache.get(id);
      if (cacheValue !== undefined) {
        return true;
      }

      var col = void 0,
          data = void 0,
          exists = void 0;
      if (this.engine === ENGINE_RTDB) {
        col = this.db.child(id);
        data = await col.once('value');
        exists = data.exists();
      } else {
        col = this.db.collection(this.dbname).doc(id);
        data = await col.get();
        exists = data.exists;
      }

      return exists;
    }

    /**
     * Remove the game state from the DB.
     * @param {string} id - The game id.
     */

  }, {
    key: 'remove',
    value: async function remove(id) {
      if (!(await this.has(id))) return;

      var col = void 0;
      if (this.engine === ENGINE_RTDB) {
        col = this.db.child(id);
        await col.remove();
      } else {
        col = this.db.collection(this.dbname).doc(id);
        await col.delete();
      }

      // Update the cache
      this.cache.del(id);
    }

    /**
     * Return all keys.
     * @returns {array} - Array of keys (strings)
     */

  }, {
    key: 'list',
    value: async function list() {
      if (this.engine === ENGINE_RTDB) {
        // firebase RTDB
        var cols = await this.db.once('value');
        return cols.ref.sortedDataKeys;
      } else {
        // firestore
        var docs = await this.db.collection(this.dbname).get();
        var ids = [];
        docs.forEach(function (doc) {
          return ids.push(doc.id);
        });
        return ids;
      }
    }
  }]);
  return Firebase;
}();

var DBFromEnv = function DBFromEnv() {
  if (process.env.MONGO_URI && process.env.MONGO_DATABASE) {
    return new Mongo({
      url: process.env.MONGO_URI,
      dbname: process.env.MONGO_DATABASE
    });
  } else if (process.env.FIREBASE_APIKEY && process.env.FIREBASE_AUTHDOMAIN && process.env.FIREBASE_DATABASEURL && process.env.FIREBASE_PROJECTID) {
    var config = {
      apiKey: process.env.FIREBASE_APIKEY,
      authDomain: process.env.FIREBASE_AUTHDOMAIN,
      databaseURL: process.env.FIREBASE_DATABASEURL,
      projectId: process.env.FIREBASE_PROJECTID
    };
    return new Firebase({ config: config, engine: process.env.FIREBASE_ENGINE });
  } else {
    return new InMemory();
  }
};

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

var DEV = process.env.NODE_ENV === 'development' || process.env.NODE_ENV == 'test';
var logfn = DEV ? console.log : function () {};

function info(msg) {
  logfn('INFO: ' + msg);
}
function error(msg) {
  logfn('ERROR: ' + msg);
}

function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
}

/* global window */
var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = symbolObservablePonyfill(root);

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT' + Math.random().toString(36).substring(7).split('').join('.'),
  REPLACE: '@@redux/REPLACE' + Math.random().toString(36).substring(7).split('').join('.')
};

var _typeof$2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof$2(obj)) !== 'object' || obj === null) return false;

  var proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */
function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.REPLACE });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if ((typeof observer === 'undefined' ? 'undefined' : _typeof$2(observer)) !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[result] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[result] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty
}

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning("You are currently using minified code outside of NODE_ENV === 'production'. " + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Redact the log.
 *
 * @param {Array} redactedMoves - List of moves to redact.
 * @param {Array} log - The game log (or deltalog).
 * @param {String} playerID - The playerID that this log is
 *                            to be sent to.
 */
function redactLog(redactedMoves, log, playerID) {
  if (redactedMoves === undefined || log === undefined) {
    return log;
  }

  return log.map(function (logEvent) {
    // filter for all other players and a spectator
    if (playerID !== null && +playerID === +logEvent.action.payload.playerID) {
      return logEvent;
    }

    // only filter moves
    if (logEvent.action.type !== 'MAKE_MOVE') {
      return logEvent;
    }

    var moveName = logEvent.action.payload.type;
    var filteredEvent = logEvent;
    if (redactedMoves.includes(moveName)) {
      var newPayload = _extends({}, filteredEvent.action.payload, {
        args: undefined,
        argsRedacted: true
      });
      filteredEvent = _extends({}, filteredEvent, {
        action: _extends({}, filteredEvent.action, { payload: newPayload })
      });
    }

    return filteredEvent;
  });
}

/**
 * Master
 *
 * Class that runs the game and maintains the authoritative state.
 * It uses the transportAPI to communicate with clients and the
 * storageAPI to communicate with the database.
 */
var Master = function () {
  function Master(game, storageAPI, transportAPI, isActionFromAuthenticPlayer) {
    classCallCheck(this, Master);

    this.game = game;
    this.storageAPI = storageAPI;
    this.transportAPI = transportAPI;
    this.isActionFromAuthenticPlayer = function () {
      return true;
    };

    if (isActionFromAuthenticPlayer !== undefined) {
      this.isActionFromAuthenticPlayer = isActionFromAuthenticPlayer;
    }
  }

  /**
   * Called on each move / event made by the client.
   * Computes the new value of the game state and returns it
   * along with a deltalog.
   */


  createClass(Master, [{
    key: 'onUpdate',
    value: async function onUpdate(action, stateID, gameID, playerID) {
      var _this = this;

      var state = await this.storageAPI.get(gameID);

      if (state === undefined) {
        error('game not found, gameID=[' + gameID + ']');
        return { error: 'game not found' };
      }

      var reducer = CreateGameReducer({
        game: this.game,
        numPlayers: state.ctx.numPlayers
      });
      var store = createStore(reducer, state);

      var isActionAuthentic = await this.isActionFromAuthenticPlayer({
        action: action,
        db: this.storageAPI,
        gameID: gameID,
        playerID: playerID
      });
      if (!isActionAuthentic) {
        return { error: 'unauthorized action' };
      }

      // Check whether the player is allowed to make the move.
      if (action.type == MAKE_MOVE && !this.game.flow.canPlayerMakeMove(state.G, state.ctx, playerID)) {
        error('move not processed - canPlayerMakeMove=false, playerID=[' + playerID + ']');
        return;
      }

      // Check whether the player is allowed to call the event.
      if (action.type == GAME_EVENT && !this.game.flow.canPlayerCallEvent(state.G, state.ctx, playerID)) {
        error('event not processed - invalid playerID=[' + playerID + ']');
        return;
      }

      if (state._stateID !== stateID) {
        error('invalid stateID, was=[' + stateID + '], expected=[' + state._stateID + ']');
        return;
      }

      var log = store.getState().log || [];

      // Update server's version of the store.
      store.dispatch(action);
      state = store.getState();

      this.transportAPI.sendAll(function (playerID) {
        var filteredState = _extends({}, state, {
          G: _this.game.playerView(state.G, state.ctx, playerID),
          ctx: _extends({}, state.ctx, { _random: undefined }),
          log: undefined,
          deltalog: undefined
        });

        var log = redactLog(_this.game.flow.redactedMoves, state.deltalog, playerID);

        return {
          type: 'update',
          args: [gameID, filteredState, log]
        };
      });

      // TODO: We currently attach the log back into the state
      // object before storing it, but this should probably
      // sit in a different part of the database eventually.
      log = [].concat(toConsumableArray(log), toConsumableArray(state.deltalog));
      var stateWithLog = _extends({}, state, { log: log });

      await this.storageAPI.set(gameID, stateWithLog);
    }

    /**
     * Called when the client connects / reconnects.
     * Returns the latest game state and the entire log.
     */

  }, {
    key: 'onSync',
    value: async function onSync(gameID, playerID, numPlayers) {
      var reducer = CreateGameReducer({ game: this.game, numPlayers: numPlayers });
      var state = await this.storageAPI.get(gameID);

      if (state === undefined) {
        var store = createStore(reducer);
        state = store.getState();
        await this.storageAPI.set(gameID, state);
      }

      var filteredState = _extends({}, state, {
        G: this.game.playerView(state.G, state.ctx, playerID),
        ctx: _extends({}, state.ctx, { _random: undefined }),
        log: undefined,
        deltalog: undefined
      });

      var log = redactLog(this.game.flow.redactedMoves, state.log, playerID);

      this.transportAPI.send({
        playerID: playerID,
        type: 'sync',
        args: [gameID, filteredState, log]
      });

      return;
    }
  }]);
  return Master;
}();

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

var IO = require('koa-socket-2');

var PING_TIMEOUT = 20 * 1e3;
var PING_INTERVAL = 10 * 1e3;

/**
 * API that's exposed by SocketIO for the Master to send
 * information to the clients.
 */
function TransportAPI(gameID, socket, clientInfo, roomInfo) {
  /**
   * Send a message to a specific client.
   */
  var send = function send(_ref) {
    var type = _ref.type,
        playerID = _ref.playerID,
        args = _ref.args;

    var clients = roomInfo.get(gameID).values();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = clients[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var client = _step.value;

        var info = clientInfo.get(client);
        if (info.playerID == playerID) {
          if (socket.id == client) {
            socket.emit.apply(socket, [type].concat(toConsumableArray(args)));
          } else {
            socket.to(info.socket.id).emit.apply(socket, [type].concat(toConsumableArray(args)));
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };

  /**
   * Send a message to all clients.
   */
  var sendAll = function sendAll(arg) {
    roomInfo.get(gameID).forEach(function (c) {
      var playerID = clientInfo.get(c).playerID;

      if (typeof arg === 'function') {
        var t = arg(playerID);
        t.playerID = playerID;
        send(t);
      } else {
        arg.playerID = playerID;
        send(arg);
      }
    });
  };

  return { send: send, sendAll: sendAll };
}

/**
 * Transport interface that uses socket.io
 */
function SocketIO(_clientInfo, _roomInfo) {
  var clientInfo = _clientInfo || new Map();
  var roomInfo = _roomInfo || new Map();

  return {
    init: function init(app, games) {
      var io = new IO({
        ioOptions: {
          pingTimeout: PING_TIMEOUT,
          pingInterval: PING_INTERVAL
        }
      });

      app.context.io = io;
      io.attach(app);

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        var _loop = function _loop() {
          var game = _step2.value;

          var nsp = app._io.of(game.name);

          nsp.on('connection', function (socket) {
            socket.on('update', async function (action, stateID, gameID, playerID) {
              var master = new Master(game, app.context.db, TransportAPI(gameID, socket, clientInfo, roomInfo), isActionFromAuthenticPlayer);
              await master.onUpdate(action, stateID, gameID, playerID);
            });

            socket.on('sync', async function (gameID, playerID, numPlayers) {
              socket.join(gameID);

              // Remove client from any previous game that it was a part of.
              if (clientInfo.has(socket.id)) {
                var _clientInfo$get = clientInfo.get(socket.id),
                    oldGameID = _clientInfo$get.gameID;

                roomInfo.get(oldGameID).delete(socket.id);
              }

              var roomClients = roomInfo.get(gameID);
              if (roomClients === undefined) {
                roomClients = new Set();
                roomInfo.set(gameID, roomClients);
              }
              roomClients.add(socket.id);

              clientInfo.set(socket.id, { gameID: gameID, playerID: playerID, socket: socket });

              var master = new Master(game, app.context.db, TransportAPI(gameID, socket, clientInfo, roomInfo), isActionFromAuthenticPlayer);
              await master.onSync(gameID, playerID, numPlayers);
            });

            socket.on('disconnect', function () {
              if (clientInfo.has(socket.id)) {
                var _clientInfo$get2 = clientInfo.get(socket.id),
                    gameID = _clientInfo$get2.gameID;

                roomInfo.get(gameID).delete(socket.id);
                clientInfo.delete(socket.id);
              }
            });
          });
        };

        for (var _iterator2 = games[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  };
}

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

var Koa = require('koa');

/**
 * Instantiate a game server.
 *
 * @param {Array} games - The games that this server will handle.
 * @param {object} db - The interface with the database.
 * @param {object} transport - The interface with the clients.
 */
function Server(_ref) {
  var games = _ref.games,
      db = _ref.db,
      transport = _ref.transport;

  var app = new Koa();

  if (db === undefined) {
    db = DBFromEnv();
  }
  app.context.db = db;

  if (transport === undefined) {
    transport = SocketIO();
  }
  transport.init(app, games);

  addApiToServer({ app: app, db: db, games: games });

  return {
    app: app,
    db: db,
    run: async function run(port, callback) {
      await db.connect();
      await app.listen(port, callback);
      info('listening...');
    }
  };
}

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

exports.Server = Server;
exports.Mongo = Mongo;
exports.Firebase = Firebase;

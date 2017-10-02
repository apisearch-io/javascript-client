(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("http"), require("https"), require("url"), require("assert"), require("stream"), require("tty"), require("util"), require("fs"), require("net"), require("zlib"));
	else if(typeof define === 'function' && define.amd)
		define(["http", "https", "url", "assert", "stream", "tty", "util", "fs", "net", "zlib"], factory);
	else if(typeof exports === 'object')
		exports["apisearch"] = factory(require("http"), require("https"), require("url"), require("assert"), require("stream"), require("tty"), require("util"), require("fs"), require("net"), require("zlib"));
	else
		root["apisearch"] = factory(root["http"], root["https"], root["url"], root["assert"], root["stream"], root["tty"], root["util"], root["fs"], root["net"], root["zlib"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_32__, __WEBPACK_EXTERNAL_MODULE_33__, __WEBPACK_EXTERNAL_MODULE_38__, __WEBPACK_EXTERNAL_MODULE_39__, __WEBPACK_EXTERNAL_MODULE_40__, __WEBPACK_EXTERNAL_MODULE_41__, __WEBPACK_EXTERNAL_MODULE_42__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(6);
var isBuffer = __webpack_require__(23);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Coordinate Type cast
 * @param coordinate
 */
var Coordinate = function Coordinate(latitude, longitude) {
    _classCallCheck(this, Coordinate);

    if (typeof latitude === 'undefined' || typeof latitude === 'undefined') {
        throw new Error('Not valid coordinates object type given.');
    }

    this.lat = latitude;
    this.lon = longitude;
};

exports.default = Coordinate;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Abstract Location Range class
 */
var AbstractLocationRange = function AbstractLocationRange() {
    _classCallCheck(this, AbstractLocationRange);

    if (this.constructor.name === AbstractLocationRange) {
        throw TypeError('You can\'t instantiate an Abstract class');
    }

    if (typeof this.toFilterObject === 'undefined') {
        throw new TypeError('toFilterObject() method must be implemented.');
    }
};

exports.default = AbstractLocationRange;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Typechecking
 */
var TypeChecker = function () {
    function TypeChecker() {
        _classCallCheck(this, TypeChecker);
    }

    _createClass(TypeChecker, null, [{
        key: 'isDefined',
        value: function isDefined(value) {
            if (typeof value === 'undefined') {
                throw new TypeError('Method parameter must be defined.');
            }
        }
    }, {
        key: 'isInteger',
        value: function isInteger(integer) {
            if (typeof integer !== 'number') {
                throw new TypeError('\n                "' + integer + '" must be type of Integer, \n                "' + integer.constructor.name + '" given.\n            ');
            }
        }
    }, {
        key: 'isBool',
        value: function isBool(bool) {
            if (typeof bool !== 'boolean') {
                throw new TypeError('\n                "' + bool + '" must be type of Boolean, \n                "' + bool.constructor.name + '" given.\n            ');
            }
        }
    }, {
        key: 'isString',
        value: function isString(string) {
            if (typeof string !== 'string') {
                throw new TypeError('\n                "' + string + '" must be type of String, \n                "' + string.constructor.name + '" given.\n            ');
            }
        }
    }, {
        key: 'isArray',
        value: function isArray(array) {
            if (array instanceof Array === false) {
                throw new TypeError('\n                "' + array + '" must be type of Array, \n                "' + array.constructor.name + '" given.\n            ');
            }
        }
    }, {
        key: 'isObjectTypeOf',
        value: function isObjectTypeOf(givenObject, mustBe) {
            if (givenObject instanceof mustBe !== true) {
                throw new TypeError('\n                "' + givenObject.constructor.name + '" must be type ' + mustBe.name + ', \n                "' + givenObject.constructor.name + '" given.\n            ');
            }
        }
    }]);

    return TypeChecker;
}();

exports.default = TypeChecker;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var normalizeHeaderName = __webpack_require__(25);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(26);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(31);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(8);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(5);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var url = __webpack_require__(13);
var assert = __webpack_require__(32);
var http = __webpack_require__(10);
var https = __webpack_require__(11);
var Writable = __webpack_require__(33).Writable;
var debug = __webpack_require__(34)('follow-redirects');

var nativeProtocols = {'http:': http, 'https:': https};
var schemes = {};
var exports = module.exports = {
	maxRedirects: 21
};
// RFC7231§4.2.1: Of the request methods defined by this specification,
// the GET, HEAD, OPTIONS, and TRACE methods are defined to be safe.
var safeMethods = {GET: true, HEAD: true, OPTIONS: true, TRACE: true};

// Create handlers that pass events from native requests
var eventHandlers = Object.create(null);
['abort', 'aborted', 'error', 'socket'].forEach(function (event) {
	eventHandlers[event] = function (arg) {
		this._redirectable.emit(event, arg);
	};
});

// An HTTP(S) request that can be redirected
function RedirectableRequest(options, responseCallback) {
	// Initialize the request
	Writable.call(this);
	this._options = options;
	this._redirectCount = 0;
	this._bufferedWrites = [];

	// Attach a callback if passed
	if (responseCallback) {
		this.on('response', responseCallback);
	}

	// React to responses of native requests
	var self = this;
	this._onNativeResponse = function (response) {
		self._processResponse(response);
	};

	// Complete the URL object when necessary
	if (!options.pathname && options.path) {
		var searchPos = options.path.indexOf('?');
		if (searchPos < 0) {
			options.pathname = options.path;
		} else {
			options.pathname = options.path.substring(0, searchPos);
			options.search = options.path.substring(searchPos);
		}
	}

	// Perform the first request
	this._performRequest();
}
RedirectableRequest.prototype = Object.create(Writable.prototype);

// Executes the next native request (initial or redirect)
RedirectableRequest.prototype._performRequest = function () {
	// If specified, use the agent corresponding to the protocol
	// (HTTP and HTTPS use different types of agents)
	var protocol = this._options.protocol;
	if (this._options.agents) {
		this._options.agent = this._options.agents[schemes[protocol]];
	}

	// Create the native request
	var nativeProtocol = nativeProtocols[protocol];
	var request = this._currentRequest =
				nativeProtocol.request(this._options, this._onNativeResponse);
	this._currentUrl = url.format(this._options);

	// Set up event handlers
	request._redirectable = this;
	for (var event in eventHandlers) {
		/* istanbul ignore else */
		if (event) {
			request.on(event, eventHandlers[event]);
		}
	}

	// End a redirected request
	// (The first request must be ended explicitly with RedirectableRequest#end)
	if (this._isRedirect) {
		// If the request doesn't have en entity, end directly.
		var bufferedWrites = this._bufferedWrites;
		if (bufferedWrites.length === 0) {
			request.end();
		// Otherwise, write the request entity and end afterwards.
		} else {
			var i = 0;
			(function writeNext() {
				if (i < bufferedWrites.length) {
					var bufferedWrite = bufferedWrites[i++];
					request.write(bufferedWrite.data, bufferedWrite.encoding, writeNext);
				} else {
					request.end();
				}
			})();
		}
	}
};

// Processes a response from the current native request
RedirectableRequest.prototype._processResponse = function (response) {
	// RFC7231§6.4: The 3xx (Redirection) class of status code indicates
	// that further action needs to be taken by the user agent in order to
	// fulfill the request. If a Location header field is provided,
	// the user agent MAY automatically redirect its request to the URI
	// referenced by the Location field value,
	// even if the specific status code is not understood.
	var location = response.headers.location;
	if (location && this._options.followRedirects !== false &&
			response.statusCode >= 300 && response.statusCode < 400) {
		// RFC7231§6.4: A client SHOULD detect and intervene
		// in cyclical redirections (i.e., "infinite" redirection loops).
		if (++this._redirectCount > this._options.maxRedirects) {
			return this.emit('error', new Error('Max redirects exceeded.'));
		}

		// RFC7231§6.4: Automatic redirection needs to done with
		// care for methods not known to be safe […],
		// since the user might not wish to redirect an unsafe request.
		// RFC7231§6.4.7: The 307 (Temporary Redirect) status code indicates
		// that the target resource resides temporarily under a different URI
		// and the user agent MUST NOT change the request method
		// if it performs an automatic redirection to that URI.
		var header;
		var headers = this._options.headers;
		if (response.statusCode !== 307 && !(this._options.method in safeMethods)) {
			this._options.method = 'GET';
			// Drop a possible entity and headers related to it
			this._bufferedWrites = [];
			for (header in headers) {
				if (/^content-/i.test(header)) {
					delete headers[header];
				}
			}
		}

		// Drop the Host header, as the redirect might lead to a different host
		if (!this._isRedirect) {
			for (header in headers) {
				if (/^host$/i.test(header)) {
					delete headers[header];
				}
			}
		}

		// Perform the redirected request
		var redirectUrl = url.resolve(this._currentUrl, location);
		debug('redirecting to', redirectUrl);
		Object.assign(this._options, url.parse(redirectUrl));
		this._isRedirect = true;
		this._performRequest();
	} else {
		// The response is not a redirect; return it as-is
		response.responseUrl = this._currentUrl;
		this.emit('response', response);

		// Clean up
		delete this._options;
		delete this._bufferedWrites;
	}
};

// Aborts the current native request
RedirectableRequest.prototype.abort = function () {
	this._currentRequest.abort();
};

// Flushes the headers of the current native request
RedirectableRequest.prototype.flushHeaders = function () {
	this._currentRequest.flushHeaders();
};

// Sets the noDelay option of the current native request
RedirectableRequest.prototype.setNoDelay = function (noDelay) {
	this._currentRequest.setNoDelay(noDelay);
};

// Sets the socketKeepAlive option of the current native request
RedirectableRequest.prototype.setSocketKeepAlive = function (enable, initialDelay) {
	this._currentRequest.setSocketKeepAlive(enable, initialDelay);
};

// Sets the timeout option of the current native request
RedirectableRequest.prototype.setTimeout = function (timeout, callback) {
	this._currentRequest.setTimeout(timeout, callback);
};

// Writes buffered data to the current native request
RedirectableRequest.prototype.write = function (data, encoding, callback) {
	this._currentRequest.write(data, encoding, callback);
	this._bufferedWrites.push({data: data, encoding: encoding});
};

// Ends the current native request
RedirectableRequest.prototype.end = function (data, encoding, callback) {
	this._currentRequest.end(data, encoding, callback);
	if (data) {
		this._bufferedWrites.push({data: data, encoding: encoding});
	}
};

// Export a redirecting wrapper for each native protocol
Object.keys(nativeProtocols).forEach(function (protocol) {
	var scheme = schemes[protocol] = protocol.substr(0, protocol.length - 1);
	var nativeProtocol = nativeProtocols[protocol];
	var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

	// Executes an HTTP request, following redirects
	wrappedProtocol.request = function (options, callback) {
		if (typeof options === 'string') {
			options = url.parse(options);
			options.maxRedirects = exports.maxRedirects;
		} else {
			options = Object.assign({
				maxRedirects: exports.maxRedirects,
				protocol: protocol
			}, options);
		}
		assert.equal(options.protocol, protocol, 'protocol mismatch');
		debug('options', options);

		return new RedirectableRequest(options, callback);
	};

	// Executes a GET request, following redirects
	wrappedProtocol.get = function (options, callback) {
		var request = wrappedProtocol.request(options, callback);
		request.end();
		return request;
	};
});


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(36);

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * ItemUUID class
 */
var ItemUUID = function () {
    function ItemUUID(id, type) {
        _classCallCheck(this, ItemUUID);

        this.id = id;
        this.type = type;
    }

    _createClass(ItemUUID, [{
        key: "composedUUID",
        value: function composedUUID() {
            return this.type + "~" + this.id;
        }
    }]);

    return ItemUUID;
}();

exports.default = ItemUUID;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * filter constants
 */
var FILTER_IT_DOESNT_MATTER = exports.FILTER_IT_DOESNT_MATTER = 0;
var FILTER_MUST_ALL = exports.FILTER_MUST_ALL = 4;
var FILTER_MUST_ALL_WITH_LEVELS = exports.FILTER_MUST_ALL_WITH_LEVELS = 5;
var FILTER_AT_LEAST_ONE = exports.FILTER_AT_LEAST_ONE = 8;
var FILTER_EXCLUDE = exports.FILTER_EXCLUDE = 16;
var FILTER_PROMOTE = exports.FILTER_PROMOTE = 32;
var FILTER_TYPE_FIELD = exports.FILTER_TYPE_FIELD = 'field';
var FILTER_TYPE_RANGE = exports.FILTER_TYPE_RANGE = 'range';
var FILTER_TYPE_DATE_RANGE = exports.FILTER_TYPE_DATE_RANGE = 'date_range';
var FILTER_TYPE_GEO = exports.FILTER_TYPE_GEO = 'geo';
var FILTER_TYPE_QUERY = exports.FILTER_TYPE_QUERY = 'query';

/**
 * Filter class
 */

var Filter = function () {
    function Filter(field, values, applicationType, filterType) {
        var filterTerms = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

        _classCallCheck(this, Filter);

        this.field = field;
        this.values = values;
        this.application_type = applicationType;
        this.filter_type = filterType;
        this.filter_terms = filterTerms;

        return this;
    }

    _createClass(Filter, null, [{
        key: 'getFilterPathByField',
        value: function getFilterPathByField(field) {
            return ['id', 'type'].indexOf(field) > -1 ? 'uuid.' + field : 'indexed_metadata.' + field;
        }
    }]);

    return Filter;
}();

exports.default = Filter;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _HttpClient = __webpack_require__(60);

var _HttpClient2 = _interopRequireDefault(_HttpClient);

var _SecureObjectFactory = __webpack_require__(51);

var _SecureObjectFactory2 = _interopRequireDefault(_SecureObjectFactory);

var _QueryFactory = __webpack_require__(55);

var _QueryFactory2 = _interopRequireDefault(_QueryFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Entry point for the Apisearch client
 *
 * @param apiKey
 * @param endpoint
 *
 * @returns {Apisearch}
 */
module.exports = function (apiKey, endpoint) {
    if (typeof apiKey === 'undefined') {
        throw new TypeError("ApiKey parameter must be defined.");
    }

    return new Apisearch('apisearch-app-id', apiKey, endpoint);
};

/**
 * Apisearch class
 */

var Apisearch = function () {
    function Apisearch(appId, apiKey) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        _classCallCheck(this, Apisearch);

        this.appId = appId;
        this.apiKey = apiKey;
        this.endpoint = options.endpoint || 'http://127.0.0.1:9002/app.php';

        this.query = _QueryFactory2.default;
        this.createObject = _SecureObjectFactory2.default;

        this.repository = new _HttpClient2.default(options.cache || true);
    }

    _createClass(Apisearch, [{
        key: "search",
        value: function search(query, callback) {
            var encodedQuery = encodeURI(JSON.stringify(query));
            var composedQuery = this.endpoint + "?key=" + this.apiKey + "&query=" + encodedQuery;

            return this.repository.query(composedQuery).then(function (response) {
                return callback(response, null);
            }).catch(function (error) {
                return callback(null, error);
            });
        }
    }]);

    return Apisearch;
}();

/***/ }),
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Cache class
 */
var MemoryCache = function () {
    function MemoryCache() {
        _classCallCheck(this, MemoryCache);

        this.cache = {};
        this.size = 0;

        return this;
    }

    _createClass(MemoryCache, [{
        key: "set",
        value: function set(key, value) {
            this.cache = _extends({}, this.cache, _defineProperty({}, key, value));
            this.size = this.size + 1;

            return this;
        }
    }, {
        key: "get",
        value: function get(key) {
            return this.cache[key];
        }
    }, {
        key: "clear",
        value: function clear() {
            this.cache = {};
            this.size = 0;
        }
    }]);

    return MemoryCache;
}();

exports.default = MemoryCache;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var bind = __webpack_require__(6);
var Axios = __webpack_require__(24);
var defaults = __webpack_require__(4);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(16);
axios.CancelToken = __webpack_require__(49);
axios.isCancel = __webpack_require__(15);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(50);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 23 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(4);
var utils = __webpack_require__(0);
var InterceptorManager = __webpack_require__(44);
var dispatchRequest = __webpack_require__(45);
var isAbsoluteURL = __webpack_require__(47);
var combineURLs = __webpack_require__(48);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var settle = __webpack_require__(7);
var buildURL = __webpack_require__(9);
var parseHeaders = __webpack_require__(27);
var isURLSameOrigin = __webpack_require__(28);
var createError = __webpack_require__(5);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(29);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(30);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var settle = __webpack_require__(7);
var buildURL = __webpack_require__(9);
var http = __webpack_require__(10);
var https = __webpack_require__(11);
var httpFollow = __webpack_require__(12).http;
var httpsFollow = __webpack_require__(12).https;
var url = __webpack_require__(13);
var zlib = __webpack_require__(42);
var pkg = __webpack_require__(43);
var createError = __webpack_require__(5);
var enhanceError = __webpack_require__(8);

/*eslint consistent-return:0*/
module.exports = function httpAdapter(config) {
  return new Promise(function dispatchHttpRequest(resolve, reject) {
    var data = config.data;
    var headers = config.headers;
    var timer;
    var aborted = false;

    // Set User-Agent (required by some servers)
    // Only set header if it hasn't been set in config
    // See https://github.com/mzabriskie/axios/issues/69
    if (!headers['User-Agent'] && !headers['user-agent']) {
      headers['User-Agent'] = 'axios/' + pkg.version;
    }

    if (data && !utils.isStream(data)) {
      if (Buffer.isBuffer(data)) {
        // Nothing to do...
      } else if (utils.isArrayBuffer(data)) {
        data = new Buffer(new Uint8Array(data));
      } else if (utils.isString(data)) {
        data = new Buffer(data, 'utf-8');
      } else {
        return reject(createError(
          'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
          config
        ));
      }

      // Add Content-Length header if data exists
      headers['Content-Length'] = data.length;
    }

    // HTTP basic authentication
    var auth = undefined;
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      auth = username + ':' + password;
    }

    // Parse url
    var parsed = url.parse(config.url);
    var protocol = parsed.protocol || 'http:';

    if (!auth && parsed.auth) {
      var urlAuth = parsed.auth.split(':');
      var urlUsername = urlAuth[0] || '';
      var urlPassword = urlAuth[1] || '';
      auth = urlUsername + ':' + urlPassword;
    }

    if (auth) {
      delete headers.Authorization;
    }

    var isHttps = protocol === 'https:';
    var agent = isHttps ? config.httpsAgent : config.httpAgent;

    var options = {
      hostname: parsed.hostname,
      port: parsed.port,
      path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
      method: config.method,
      headers: headers,
      agent: agent,
      auth: auth
    };

    var proxy = config.proxy;
    if (!proxy) {
      var proxyEnv = protocol.slice(0, -1) + '_proxy';
      var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
      if (proxyUrl) {
        var parsedProxyUrl = url.parse(proxyUrl);
        proxy = {
          host: parsedProxyUrl.hostname,
          port: parsedProxyUrl.port
        };

        if (parsedProxyUrl.auth) {
          var proxyUrlAuth = parsedProxyUrl.auth.split(':');
          proxy.auth = {
            username: proxyUrlAuth[0],
            password: proxyUrlAuth[1]
          };
        }
      }
    }

    if (proxy) {
      options.hostname = proxy.host;
      options.host = proxy.host;
      options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
      options.port = proxy.port;
      options.path = protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path;

      // Basic proxy authorization
      if (proxy.auth) {
        var base64 = new Buffer(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
        options.headers['Proxy-Authorization'] = 'Basic ' + base64;
      }
    }

    var transport;
    if (config.maxRedirects === 0) {
      transport = isHttps ? https : http;
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }
      transport = isHttps ? httpsFollow : httpFollow;
    }

    // Create the request
    var req = transport.request(options, function handleResponse(res) {
      if (aborted) return;

      // Response has been received so kill timer that handles request timeout
      clearTimeout(timer);
      timer = null;

      // uncompress the response body transparently if required
      var stream = res;
      switch (res.headers['content-encoding']) {
      /*eslint default-case:0*/
      case 'gzip':
      case 'compress':
      case 'deflate':
        // add the unzipper to the body stream processing pipeline
        stream = stream.pipe(zlib.createUnzip());

        // remove the content-encoding in order to not confuse downstream operations
        delete res.headers['content-encoding'];
        break;
      }

      // return the last request in case of redirects
      var lastRequest = res.req || req;

      var response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        config: config,
        request: lastRequest
      };

      if (config.responseType === 'stream') {
        response.data = stream;
        settle(resolve, reject, response);
      } else {
        var responseBuffer = [];
        stream.on('data', function handleStreamData(chunk) {
          responseBuffer.push(chunk);

          // make sure the content length is not over the maxContentLength if specified
          if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
            reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
              config, null, lastRequest));
          }
        });

        stream.on('error', function handleStreamError(err) {
          if (aborted) return;
          reject(enhanceError(err, config, null, lastRequest));
        });

        stream.on('end', function handleStreamEnd() {
          var responseData = Buffer.concat(responseBuffer);
          if (config.responseType !== 'arraybuffer') {
            responseData = responseData.toString('utf8');
          }

          response.data = responseData;
          settle(resolve, reject, response);
        });
      }
    });

    // Handle errors
    req.on('error', function handleRequestError(err) {
      if (aborted) return;
      reject(enhanceError(err, config, null, req));
    });

    // Handle request timeout
    if (config.timeout && !timer) {
      timer = setTimeout(function handleRequestTimeout() {
        req.abort();
        reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', req));
        aborted = true;
      }, config.timeout);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (aborted) {
          return;
        }

        req.abort();
        reject(cancel);
        aborted = true;
      });
    }

    // Send the request
    if (utils.isStream(data)) {
      data.pipe(req);
    } else {
      req.end(data);
    }
  });
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Detect Electron renderer process, which is node, but we should
 * treat as a browser.
 */

if (typeof process !== 'undefined' && process.type === 'renderer') {
  module.exports = __webpack_require__(35);
} else {
  module.exports = __webpack_require__(37);
}


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(14);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}


/***/ }),
/* 36 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var tty = __webpack_require__(38);
var util = __webpack_require__(39);

/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(14);
exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return /^debug_/i.test(key);
}).reduce(function (obj, key) {
  // camel-case
  var prop = key
    .substring(6)
    .toLowerCase()
    .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

  // coerce string value into JS value
  var val = process.env[key];
  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
  else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
  else if (val === 'null') val = null;
  else val = Number(val);

  obj[prop] = val;
  return obj;
}, {});

/**
 * The file descriptor to write the `debug()` calls to.
 * Set the `DEBUG_FD` env variable to override with another value. i.e.:
 *
 *   $ DEBUG_FD=3 node script.js 3>debug.log
 */

var fd = parseInt(process.env.DEBUG_FD, 10) || 2;

if (1 !== fd && 2 !== fd) {
  util.deprecate(function(){}, 'except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)')()
}

var stream = 1 === fd ? process.stdout :
             2 === fd ? process.stderr :
             createWritableStdioStream(fd);

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts
    ? Boolean(exports.inspectOpts.colors)
    : tty.isatty(fd);
}

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

exports.formatters.o = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts)
    .replace(/\s*\n\s*/g, ' ');
};

/**
 * Map %o to `util.inspect()`, allowing multiple lines if needed.
 */

exports.formatters.O = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var name = this.namespace;
  var useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var prefix = '  \u001b[3' + c + ';1m' + name + ' ' + '\u001b[0m';

    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push('\u001b[3' + c + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
  } else {
    args[0] = new Date().toUTCString()
      + ' ' + name + ' ' + args[0];
  }
}

/**
 * Invokes `util.format()` with the specified arguments and writes to `stream`.
 */

function log() {
  return stream.write(util.format.apply(util, arguments) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  if (null == namespaces) {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  } else {
    process.env.DEBUG = namespaces;
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  return process.env.DEBUG;
}

/**
 * Copied from `node/src/node.js`.
 *
 * XXX: It's lame that node doesn't expose this API out-of-the-box. It also
 * relies on the undocumented `tty_wrap.guessHandleType()` which is also lame.
 */

function createWritableStdioStream (fd) {
  var stream;
  var tty_wrap = process.binding('tty_wrap');

  // Note stream._type is used for test-module-load-list.js

  switch (tty_wrap.guessHandleType(fd)) {
    case 'TTY':
      stream = new tty.WriteStream(fd);
      stream._type = 'tty';

      // Hack to have stream not keep the event loop alive.
      // See https://github.com/joyent/node/issues/1726
      if (stream._handle && stream._handle.unref) {
        stream._handle.unref();
      }
      break;

    case 'FILE':
      var fs = __webpack_require__(40);
      stream = new fs.SyncWriteStream(fd, { autoClose: false });
      stream._type = 'fs';
      break;

    case 'PIPE':
    case 'TCP':
      var net = __webpack_require__(41);
      stream = new net.Socket({
        fd: fd,
        readable: false,
        writable: true
      });

      // FIXME Should probably have an option in net.Socket to create a
      // stream from an existing fd which is writable only. But for now
      // we'll just add this hack and set the `readable` member to false.
      // Test: ./node test/fixtures/echo.js < /etc/passwd
      stream.readable = false;
      stream.read = null;
      stream._type = 'pipe';

      // FIXME Hack to have stream not keep the event loop alive.
      // See https://github.com/joyent/node/issues/1726
      if (stream._handle && stream._handle.unref) {
        stream._handle.unref();
      }
      break;

    default:
      // Probably an error on in uv_guess_handle()
      throw new Error('Implement me. Unknown stream file type!');
  }

  // For supporting legacy API we put the FD here.
  stream.fd = fd;

  stream._isStdio = true;

  return stream;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init (debug) {
  debug.inspectOpts = {};

  var keys = Object.keys(exports.inspectOpts);
  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

exports.enable(load());


/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = {"_from":"axios","_id":"axios@0.16.2","_inBundle":false,"_integrity":"sha1-uk+S8XFn37q0CYN4VFS5rBScPG0=","_location":"/axios","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"axios","name":"axios","escapedName":"axios","rawSpec":"","saveSpec":null,"fetchSpec":"latest"},"_requiredBy":["#USER","/"],"_resolved":"https://registry.npmjs.org/axios/-/axios-0.16.2.tgz","_shasum":"ba4f92f17167dfbab40983785454b9ac149c3c6d","_spec":"axios","_where":"/Users/alexhoma/dev/puntmig/apisearch/js-search","author":{"name":"Matt Zabriskie"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"bugs":{"url":"https://github.com/mzabriskie/axios/issues"},"bundleDependencies":false,"dependencies":{"follow-redirects":"^1.2.3","is-buffer":"^1.1.5"},"deprecated":false,"description":"Promise based HTTP client for the browser and node.js","devDependencies":{"coveralls":"^2.11.9","es6-promise":"^4.0.5","grunt":"^1.0.1","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.0.0","grunt-contrib-nodeunit":"^1.0.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^19.0.0","grunt-karma":"^2.0.0","grunt-ts":"^6.0.0-beta.3","grunt-webpack":"^1.0.18","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^1.3.0","karma-chrome-launcher":"^2.0.0","karma-coverage":"^1.0.0","karma-firefox-launcher":"^1.0.0","karma-jasmine":"^1.0.2","karma-jasmine-ajax":"^0.1.13","karma-opera-launcher":"^1.0.0","karma-phantomjs-launcher":"^1.0.0","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^1.1.0","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.7","karma-webpack":"^1.7.0","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","phantomjs-prebuilt":"^2.1.7","sinon":"^1.17.4","typescript":"^2.0.3","url-search-params":"^0.6.1","webpack":"^1.13.1","webpack-dev-server":"^1.14.1"},"homepage":"https://github.com/mzabriskie/axios","keywords":["xhr","http","ajax","promise","node"],"license":"MIT","main":"index.js","name":"axios","repository":{"type":"git","url":"git+https://github.com/mzabriskie/axios.git"},"scripts":{"build":"NODE_ENV=production grunt build","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","examples":"node ./examples/server.js","postversion":"git push && git push --tags","preversion":"npm test","start":"node ./sandbox/server.js","test":"grunt test","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json"},"typings":"./index.d.ts","version":"0.16.2"}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var transformData = __webpack_require__(46);
var isCancel = __webpack_require__(15);
var defaults = __webpack_require__(4);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(16);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ItemUUID = __webpack_require__(17);

var _ItemUUID2 = _interopRequireDefault(_ItemUUID);

var _Coordinate = __webpack_require__(1);

var _Coordinate2 = _interopRequireDefault(_Coordinate);

var _CoordinateAndDistance = __webpack_require__(52);

var _CoordinateAndDistance2 = _interopRequireDefault(_CoordinateAndDistance);

var _Square = __webpack_require__(53);

var _Square2 = _interopRequireDefault(_Square);

var _Polygon = __webpack_require__(54);

var _Polygon2 = _interopRequireDefault(_Polygon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * SecureObjectFactory class.
 */
var SecureObjectFactory = function () {
    function SecureObjectFactory() {
        _classCallCheck(this, SecureObjectFactory);
    }

    _createClass(SecureObjectFactory, null, [{
        key: "uuid",
        value: function uuid(id, type) {
            return new _ItemUUID2.default(id, type);
        }
    }, {
        key: "coordinate",
        value: function coordinate(lat, lon) {
            return new _Coordinate2.default(lat, lon);
        }
    }, {
        key: "coordinateAndDistance",
        value: function coordinateAndDistance(coordinate, distance) {
            return new _CoordinateAndDistance2.default(coordinate, distance);
        }
    }, {
        key: "square",
        value: function square(topLeftCoordinate, bottomRightCoordinate) {
            return new _Square2.default(topLeftCoordinate, bottomRightCoordinate);
        }
    }, {
        key: "polygon",
        value: function polygon() {
            for (var _len = arguments.length, coordinates = Array(_len), _key = 0; _key < _len; _key++) {
                coordinates[_key] = arguments[_key];
            }

            return new (Function.prototype.bind.apply(_Polygon2.default, [null].concat(coordinates)))();
        }
    }]);

    return SecureObjectFactory;
}();

exports.default = SecureObjectFactory;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractLocationRange = __webpack_require__(2);

var _AbstractLocationRange2 = _interopRequireDefault(_AbstractLocationRange);

var _Coordinate = __webpack_require__(1);

var _Coordinate2 = _interopRequireDefault(_Coordinate);

var _TypeChecker = __webpack_require__(3);

var _TypeChecker2 = _interopRequireDefault(_TypeChecker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CoordinateAndDistance = function (_AbstractLocationRang) {
    _inherits(CoordinateAndDistance, _AbstractLocationRang);

    function CoordinateAndDistance(coordinate, distance) {
        var _ret;

        _classCallCheck(this, CoordinateAndDistance);

        var _this = _possibleConstructorReturn(this, (CoordinateAndDistance.__proto__ || Object.getPrototypeOf(CoordinateAndDistance)).call(this));

        _TypeChecker2.default.isObjectTypeOf(coordinate, _Coordinate2.default);
        _TypeChecker2.default.isString(distance);

        _this.coordinate = coordinate;
        _this.distance = distance;

        return _ret = _this, _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CoordinateAndDistance, [{
        key: "toFilterObject",
        value: function toFilterObject() {
            return {
                type: this.constructor.name,
                data: {
                    coordinate: this.coordinate,
                    distance: this.distance
                }
            };
        }
    }]);

    return CoordinateAndDistance;
}(_AbstractLocationRange2.default);

exports.default = CoordinateAndDistance;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractLocationRange = __webpack_require__(2);

var _AbstractLocationRange2 = _interopRequireDefault(_AbstractLocationRange);

var _Coordinate = __webpack_require__(1);

var _Coordinate2 = _interopRequireDefault(_Coordinate);

var _TypeChecker = __webpack_require__(3);

var _TypeChecker2 = _interopRequireDefault(_TypeChecker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Square = function (_AbstractLocationRang) {
    _inherits(Square, _AbstractLocationRang);

    function Square(topLeftCoordinate, bottomRightCoordinate) {
        var _ret;

        _classCallCheck(this, Square);

        _TypeChecker2.default.isObjectTypeOf(topLeftCoordinate, _Coordinate2.default);
        _TypeChecker2.default.isObjectTypeOf(bottomRightCoordinate, _Coordinate2.default);

        var _this = _possibleConstructorReturn(this, (Square.__proto__ || Object.getPrototypeOf(Square)).call(this));

        _this.topLeftCoordinate = topLeftCoordinate;
        _this.bottomRightCoordinate = bottomRightCoordinate;

        return _ret = _this, _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Square, [{
        key: "toFilterObject",
        value: function toFilterObject() {
            return {
                type: this.constructor.name,
                data: {
                    0: this.topLeftCoordinate,
                    1: this.bottomRightCoordinate
                }
            };
        }
    }]);

    return Square;
}(_AbstractLocationRange2.default);

exports.default = Square;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractLocationRange = __webpack_require__(2);

var _AbstractLocationRange2 = _interopRequireDefault(_AbstractLocationRange);

var _Coordinate = __webpack_require__(1);

var _Coordinate2 = _interopRequireDefault(_Coordinate);

var _TypeChecker = __webpack_require__(3);

var _TypeChecker2 = _interopRequireDefault(_TypeChecker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Polygon = function (_AbstractLocationRang) {
    _inherits(Polygon, _AbstractLocationRang);

    function Polygon() {
        var _ret;

        _classCallCheck(this, Polygon);

        var _this = _possibleConstructorReturn(this, (Polygon.__proto__ || Object.getPrototypeOf(Polygon)).call(this));

        for (var _len = arguments.length, coordinates = Array(_len), _key = 0; _key < _len; _key++) {
            coordinates[_key] = arguments[_key];
        }

        if (coordinates.length < 3) {
            throw new Error("A polygon needs more than two coordinates.");
        }

        _this.coordinates = coordinates.map(function (coordinate) {
            _TypeChecker2.default.isObjectTypeOf(coordinate, _Coordinate2.default);

            return coordinate;
        });

        return _ret = _this, _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Polygon, [{
        key: "toFilterObject",
        value: function toFilterObject() {
            return {
                type: this.constructor.name,
                data: this.coordinates
            };
        }
    }]);

    return Polygon;
}(_AbstractLocationRange2.default);

exports.default = Polygon;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Query = __webpack_require__(56);

var _Query2 = _interopRequireDefault(_Query);

var _Filter = __webpack_require__(18);

var _Filter2 = _interopRequireDefault(_Filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * QueryFactory class
 */
var QueryFactory = function () {
    function QueryFactory() {
        _classCallCheck(this, QueryFactory);
    }

    _createClass(QueryFactory, null, [{
        key: "create",
        value: function create(q) {
            var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Query.QUERY_DEFAULT_PAGE;
            var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Query.QUERY_DEFAULT_SIZE;

            return new _Query2.default({
                q: q,
                from: (page - 1) * size,
                page: page,
                size: size
            });
        }
    }, {
        key: "createMatchAll",
        value: function createMatchAll() {
            return new _Query2.default({
                q: '',
                page: _Query.QUERY_DEFAULT_PAGE,
                size: _Query.QUERY_INFINITE_SIZE
            });
        }
    }, {
        key: "createLocated",
        value: function createLocated(coordinate, queryText) {
            var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Query.QUERY_DEFAULT_PAGE;
            var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _Query.QUERY_DEFAULT_SIZE;

            return new _Query2.default({
                coordinate: coordinate,
                page: page,
                size: size,
                q: queryText
            });
        }
    }, {
        key: "createByUUID",
        value: function createByUUID(uuid) {
            return this.createByUUIDs(uuid);
        }
    }, {
        key: "createByUUIDs",
        value: function createByUUIDs() {
            for (var _len = arguments.length, uuids = Array(_len), _key = 0; _key < _len; _key++) {
                uuids[_key] = arguments[_key];
            }

            var ids = uuids.map(function (uuid) {
                return uuid.composedUUID();
            });
            var query = new _Query2.default({
                q: '',
                page: _Query.QUERY_DEFAULT_PAGE,
                size: _Query.QUERY_INFINITE_SIZE
            });

            query.disableAggregations().disableSuggestions();

            query.filters = _extends({}, query.filters, _defineProperty({}, '_id', new _Filter2.default('_id', ids.filter(function (item, pos) {
                return ids.indexOf(item) === pos;
            }), _Filter.FILTER_AT_LEAST_ONE, _Filter.FILTER_TYPE_FIELD)));

            return query;
        }
    }]);

    return QueryFactory;
}();

exports.default = QueryFactory;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.QUERY_INFINITE_SIZE = exports.QUERY_DEFAULT_SIZE = exports.QUERY_DEFAULT_PAGE = exports.QUERY_DEFAULT_FROM = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ItemUUID = __webpack_require__(17);

var _ItemUUID2 = _interopRequireDefault(_ItemUUID);

var _Coordinate = __webpack_require__(1);

var _Coordinate2 = _interopRequireDefault(_Coordinate);

var _TypeChecker = __webpack_require__(3);

var _TypeChecker2 = _interopRequireDefault(_TypeChecker);

var _User = __webpack_require__(57);

var _User2 = _interopRequireDefault(_User);

var _Aggregation = __webpack_require__(58);

var _Aggregation2 = _interopRequireDefault(_Aggregation);

var _Filter = __webpack_require__(18);

var _Filter2 = _interopRequireDefault(_Filter);

var _AbstractLocationRange = __webpack_require__(2);

var _AbstractLocationRange2 = _interopRequireDefault(_AbstractLocationRange);

var _SortBy = __webpack_require__(59);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Query constants
 */
var QUERY_DEFAULT_FROM = exports.QUERY_DEFAULT_FROM = 0;
var QUERY_DEFAULT_PAGE = exports.QUERY_DEFAULT_PAGE = 1;
var QUERY_DEFAULT_SIZE = exports.QUERY_DEFAULT_SIZE = 10;
var QUERY_INFINITE_SIZE = exports.QUERY_INFINITE_SIZE = 1000;

/**
 * Query class
 */

var Query = function () {
    function Query(params) {
        _classCallCheck(this, Query);

        this.q = params.q;
        this.universe_filters = params.universe_filters || [];
        this.filters = params.filters || [];
        this.items_promoted = params.items_promoted || [];
        this.aggregations = params.aggregations || [];
        this.page = params.aggregations || QUERY_DEFAULT_PAGE;
        this.size = params.size || QUERY_DEFAULT_SIZE;
        this.from = params.from || QUERY_DEFAULT_FROM;
        this.aggregations_enabled = params.aggregations_enabled || true;
        this.suggestions_enabled = params.suggestions_enabled || false;
        this.highlight_enabled = params.highlight_enabled || false;
        this.filter_fields = params.filter_fields || [];
        this.user = params.user || null;
        this.coordinate = typeof params.coordinate !== 'undefined' ? new _Coordinate2.default(params.coordinate.lat, params.coordinate.lon) : null;
        this.sortBy(_SortBy.SORT_BY_SCORE);

        return this;
    }

    _createClass(Query, [{
        key: "filterBy",
        value: function filterBy(filterName, field, values) {
            var applicationType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _Filter.FILTER_AT_LEAST_ONE;
            var aggregate = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
            var aggregationSort = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _Aggregation.AGGREGATION_SORT_BY_COUNT_DESC;

            _TypeChecker2.default.isArray(values);
            _TypeChecker2.default.isArray(aggregationSort);

            var fieldPath = _Filter2.default.getFilterPathByField(field);
            if (values.length !== 0) {
                this.filters = _extends({}, this.filters, _defineProperty({}, filterName, new _Filter2.default(fieldPath, values, applicationType, _Filter.FILTER_TYPE_FIELD)));
            } else {
                delete this.filters[field];
            }

            if (aggregate) {
                this.aggregateBy(filterName, field, applicationType, aggregationSort);
            }

            return this;
        }
    }, {
        key: "filterByTypes",
        value: function filterByTypes(values) {
            var aggregate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var aggregationSort = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Aggregation.AGGREGATION_SORT_BY_COUNT_DESC;

            _TypeChecker2.default.isArray(values);

            var fieldPath = _Filter2.default.getFilterPathByField('type');
            if (values.length !== 0) {
                this.filters = _extends({}, this.filters, _defineProperty({}, 'type', new _Filter2.default(fieldPath, values, _Filter.FILTER_AT_LEAST_ONE, _Filter.FILTER_TYPE_FIELD)));
            } else {
                delete this.filters['type'];
            }

            if (aggregate) {
                this.aggregations = _extends({}, this.aggregations, _defineProperty({}, 'type', new _Aggregation2.default('type', fieldPath, _Filter.FILTER_AT_LEAST_ONE, _Filter.FILTER_TYPE_FIELD, [], aggregationSort)));
            }

            return this;
        }
    }, {
        key: "filterByIds",
        value: function filterByIds(values) {
            _TypeChecker2.default.isArray(values);

            var fieldPath = _Filter2.default.getFilterPathByField('id');
            if (values.length !== 0) {
                this.filters = _extends({}, this.filters, _defineProperty({}, 'id', new _Filter2.default(fieldPath, values, _Filter.FILTER_AT_LEAST_ONE, _Filter.FILTER_TYPE_FIELD)));
            } else {
                delete this.filters['id'];
            }

            return this;
        }
    }, {
        key: "filterByRange",
        value: function filterByRange(filterName, field, options, values) {
            var applicationType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _Filter.FILTER_AT_LEAST_ONE;
            var rangeType = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _Filter.FILTER_TYPE_RANGE;
            var aggregate = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
            var aggregationSort = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : _Aggregation.AGGREGATION_SORT_BY_COUNT_DESC;

            _TypeChecker2.default.isArray(options);
            _TypeChecker2.default.isArray(values);

            var fieldPath = _Filter2.default.getFilterPathByField(field);
            if (values.length !== 0) {
                this.filters = _extends({}, this.filters, _defineProperty({}, filterName, new _Filter2.default(fieldPath, values, applicationType, rangeType)));
            } else {
                delete this.filters[filterName];
            }

            if (aggregate) {
                this.aggregateByRange(filterName, fieldPath, options, applicationType, rangeType, aggregationSort);
            }

            return this;
        }
    }, {
        key: "filterByDateRange",
        value: function filterByDateRange(filterName, field, options, values) {
            var applicationType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _Filter.FILTER_AT_LEAST_ONE;
            var aggregate = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
            var aggregationSort = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : _Aggregation.AGGREGATION_SORT_BY_COUNT_DESC;

            return this.filterByRange(filterName, field, options, values, applicationType, _Filter.FILTER_TYPE_DATE_RANGE, aggregate, aggregationSort);
        }
    }, {
        key: "filterUniverseBy",
        value: function filterUniverseBy(field, values) {
            var applicationType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Filter.FILTER_AT_LEAST_ONE;

            _TypeChecker2.default.isArray(values);

            var fieldPath = _Filter2.default.getFilterPathByField(field);
            if (values.length !== 0) {
                this.universe_filters = _extends({}, this.universe_filters, _defineProperty({}, field, new _Filter2.default(fieldPath, values, applicationType, _Filter.FILTER_TYPE_FIELD)));
            } else {
                delete this.universe_filters[field];
            }

            return this;
        }
    }, {
        key: "filterUniverseByTypes",
        value: function filterUniverseByTypes(values) {
            _TypeChecker2.default.isArray(values);

            var fieldPath = _Filter2.default.getFilterPathByField('type');
            if (values.length !== 0) {
                this.universe_filters = _extends({}, this.universe_filters, _defineProperty({}, 'type', new _Filter2.default(fieldPath, values, _Filter.FILTER_AT_LEAST_ONE, _Filter.FILTER_TYPE_FIELD)));
            } else {
                delete this.universe_filters['type'];
            }

            return this;
        }
    }, {
        key: "filterUniverseByIds",
        value: function filterUniverseByIds(values) {
            _TypeChecker2.default.isArray(values);

            var fieldPath = _Filter2.default.getFilterPathByField('id');
            if (values.length !== 0) {
                this.universe_filters = _extends({}, this.universe_filters, _defineProperty({}, 'id', new _Filter2.default(fieldPath, values, _Filter.FILTER_AT_LEAST_ONE, _Filter.FILTER_TYPE_FIELD)));
            } else {
                delete this.universe_filters['id'];
            }

            return this;
        }
    }, {
        key: "filterUniverseByRange",
        value: function filterUniverseByRange(field, values) {
            var applicationType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Filter.FILTER_AT_LEAST_ONE;
            var rangeType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _Filter.FILTER_TYPE_RANGE;

            _TypeChecker2.default.isArray(values);

            var fieldPath = _Filter2.default.getFilterPathByField(field);
            if (values.length !== 0) {
                this.universe_filters = _extends({}, this.universe_filters, _defineProperty({}, field, new _Filter2.default(fieldPath, values, applicationType, rangeType)));
            } else {
                delete this.universe_filters[field];
            }

            return this;
        }
    }, {
        key: "filterUniverseByDateRange",
        value: function filterUniverseByDateRange(field, values) {
            var applicationType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Filter.FILTER_AT_LEAST_ONE;

            return this.filterUniverseByRange(field, values, applicationType, _Filter.FILTER_TYPE_DATE_RANGE);
        }
    }, {
        key: "filterUniverseByLocation",
        value: function filterUniverseByLocation(locationRange) {
            _TypeChecker2.default.isObjectTypeOf(locationRange, _AbstractLocationRange2.default);

            this.universe_filters = _extends({}, this.universe_filters, _defineProperty({}, 'coordinate', new _Filter2.default('coordinate', locationRange.toFilterObject(), _Filter.FILTER_AT_LEAST_ONE, _Filter.FILTER_TYPE_GEO)));

            return this;
        }
    }, {
        key: "setFilterFields",
        value: function setFilterFields(fields) {
            var _this = this;

            _TypeChecker2.default.isArray(fields);

            if (fields.length === 0) {
                this.filter_fields = [].concat(_toConsumableArray(fields));

                return this;
            }

            fields.map(function (field) {
                _this.filter_fields = [].concat(_toConsumableArray(_this.filter_fields), [field]);
            });

            return this;
        }
    }, {
        key: "sortBy",
        value: function sortBy(sort) {
            var _this2 = this;

            _TypeChecker2.default.isDefined(sort);

            if (typeof sort['_geo_distance'] !== 'undefined') {
                var _geo_distance;

                if (this.coordinate instanceof _Coordinate2.default === false) {
                    throw new Error("\n                    In order to be able to sort by coordinates, you need to \n                    create a Query by using apisearch.query.createLocated(...) \n                    instead of apisearch.query.create(...)\n                ");
                }
                this.sort = _defineProperty({}, '_geo_distance', (_geo_distance = {}, _defineProperty(_geo_distance, 'coordinate', this.coordinate), _defineProperty(_geo_distance, 'order', sort._geo_distance.order), _defineProperty(_geo_distance, 'unit', sort._geo_distance.unit), _geo_distance));
            } else {
                Object.keys(sort).map(function (field) {
                    var direction = sort[field].order;
                    _this2.sort = _defineProperty({}, field, _defineProperty({}, 'order', direction));
                });
            }

            return this;
        }
    }, {
        key: "aggregateBy",
        value: function aggregateBy(filterName, field, applicationType) {
            var aggregationSort = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _Aggregation.AGGREGATION_SORT_BY_COUNT_DESC;
            var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _Aggregation.AGGREGATION_NO_LIMIT;

            _TypeChecker2.default.isDefined(applicationType);
            _TypeChecker2.default.isInteger(applicationType);

            this.aggregations = _extends({}, this.aggregations, _defineProperty({}, filterName, new _Aggregation2.default(filterName, _Filter2.default.getFilterPathByField(field), applicationType, _Filter.FILTER_TYPE_FIELD, [], aggregationSort, limit)));

            return this;
        }
    }, {
        key: "aggregateByRange",
        value: function aggregateByRange(filterName, field, options, applicationType) {
            var rangeType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _Filter.FILTER_TYPE_RANGE;
            var aggregationSort = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _Aggregation.AGGREGATION_SORT_BY_COUNT_DESC;
            var limit = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : _Aggregation.AGGREGATION_NO_LIMIT;

            _TypeChecker2.default.isArray(options);

            if (options.length === 0) {
                return this;
            }

            this.aggregations = _extends({}, this.aggregations, _defineProperty({}, filterName, new _Aggregation2.default(filterName, _Filter2.default.getFilterPathByField(field), applicationType, rangeType, aggregationSort, limit)));

            return this;
        }
    }, {
        key: "aggregateByDateRange",
        value: function aggregateByDateRange(filterName, field, options, applicationType) {
            var aggregationSort = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _Aggregation.AGGREGATION_SORT_BY_COUNT_DESC;
            var limit = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _Aggregation.AGGREGATION_NO_LIMIT;

            _TypeChecker2.default.isArray(options);

            if (options.length === 0) {
                return this;
            }

            this.aggregations = _extends({}, this.aggregations, _defineProperty({}, filterName, new _Aggregation2.default(filterName, _Filter2.default.getFilterPathByField(field), applicationType, _Filter.FILTER_TYPE_DATE_RANGE, aggregationSort, limit)));

            return this;
        }
    }, {
        key: "enableAggregations",
        value: function enableAggregations() {
            this.aggregations_enabled = true;
            return this;
        }
    }, {
        key: "disableAggregations",
        value: function disableAggregations() {
            this.aggregations_enabled = false;
            return this;
        }
    }, {
        key: "enableSuggestions",
        value: function enableSuggestions() {
            this.suggestions_enabled = true;
            return this;
        }
    }, {
        key: "disableSuggestions",
        value: function disableSuggestions() {
            this.suggestions_enabled = false;
            return this;
        }
    }, {
        key: "enableHighlights",
        value: function enableHighlights() {
            this.highlight_enabled = true;
            return this;
        }
    }, {
        key: "disableHighlights",
        value: function disableHighlights() {
            this.highlight_enabled = false;
            return this;
        }
    }, {
        key: "promoteUUID",
        value: function promoteUUID(itemUUID) {
            if (itemUUID instanceof _ItemUUID2.default === false) {
                throw new Error("Excluded item must be type \"ItemUUID\", \"" + itemUUID.constructor.name + "\" given.");
            }
            this.items_promoted = [].concat(_toConsumableArray(this.items_promoted), [itemUUID]);

            return this;
        }
    }, {
        key: "promoteUUIDs",
        value: function promoteUUIDs() {
            var _this3 = this;

            for (var _len = arguments.length, uuids = Array(_len), _key = 0; _key < _len; _key++) {
                uuids[_key] = arguments[_key];
            }

            uuids.forEach(function (uuid) {
                return _this3.promoteUUID(uuid);
            });

            return this;
        }
    }, {
        key: "excludeUUID",
        value: function excludeUUID(itemUUID) {
            _TypeChecker2.default.isObjectTypeOf(itemUUID, _ItemUUID2.default);
            this.excludeUUIDs(itemUUID);

            return this;
        }
    }, {
        key: "excludeUUIDs",
        value: function excludeUUIDs() {
            for (var _len2 = arguments.length, uuids = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                uuids[_key2] = arguments[_key2];
            }

            this.filters = _extends({}, this.filters, _defineProperty({}, 'excluded_ids', new _Filter2.default('_id', uuids.map(function (uuid) {
                return uuid.composedUUID();
            }), _Filter.FILTER_EXCLUDE, _Filter.FILTER_TYPE_FIELD)));

            return this;
        }
    }, {
        key: "byUser",
        value: function byUser(user) {
            _TypeChecker2.default.isObjectTypeOf(user, _User2.default);
            this.user = user;

            return this;
        }
    }, {
        key: "anonymously",
        value: function anonymously() {
            this.user = null;

            return null;
        }
    }]);

    return Query;
}();

exports.default = Query;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * User class
 */
var User = function User(id) {
    _classCallCheck(this, User);

    this.id = id;
};

exports.default = User;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Aggregation constants
 */
var AGGREGATION_SORT_BY_COUNT_ASC = exports.AGGREGATION_SORT_BY_COUNT_ASC = ['_count', 'asc'];
var AGGREGATION_SORT_BY_COUNT_DESC = exports.AGGREGATION_SORT_BY_COUNT_DESC = ['_count', 'desc'];
var AGGREGATION_SORT_BY_NAME_ASC = exports.AGGREGATION_SORT_BY_NAME_ASC = ['_term', 'asc'];
var AGGREGATION_SORT_BY_NAME_DESC = exports.AGGREGATION_SORT_BY_NAME_DESC = ['_term', 'desc'];
var AGGREGATION_NO_LIMIT = exports.AGGREGATION_NO_LIMIT = 0;

/**
 * Aggregation class
 */

var Aggregation = function Aggregation(name, field, applicationType, filterType, subgroup, sort, limit) {
    _classCallCheck(this, Aggregation);

    this.name = name;
    this.field = field;
    this.applicationType = applicationType;
    this.filterType = filterType;
    this.subgroup = subgroup;
    this.sort = sort || AGGREGATION_SORT_BY_COUNT_DESC;
    this.limit = limit || AGGREGATION_NO_LIMIT;
};

exports.default = Aggregation;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 export * Sort by constants
 */

var SORT_BY_SCORE = exports.SORT_BY_SCORE = {
    '_score': {
        'order': 'asc'
    }
};
var SORT_BY_RANDOM = exports.SORT_BY_RANDOM = {
    'random': {
        'order': 'asc'
    }
};
var SORT_BY_ID_ASC = exports.SORT_BY_ID_ASC = {
    'uuid.id': {
        'order': 'asc'
    }
};
var SORT_BY_ID_DESC = exports.SORT_BY_ID_DESC = {
    'uuid.id': {
        'order': 'desc'
    }
};
var SORT_BY_TYPE_ASC = exports.SORT_BY_TYPE_ASC = {
    'uuid.type': {
        'order': 'asc'
    }
};
var SORT_BY_TYPE_DESC = exports.SORT_BY_TYPE_DESC = {
    'uuid.type': {
        'order': 'desc'
    }
};
var SORT_BY_LOCATION_KM_ASC = exports.SORT_BY_LOCATION_KM_ASC = {
    '_geo_distance': {
        'order': 'asc',
        'unit': 'km'
    }
};
var SORT_BY_LOCATION_MI_ASC = exports.SORT_BY_LOCATION_MI_ASC = {
    '_geo_distance': {
        'order': 'asc',
        'unit': 'mi'
    }
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MemoryCache = __webpack_require__(21);

var _MemoryCache2 = _interopRequireDefault(_MemoryCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var axios = __webpack_require__(22);

/**
 * Http class
 */

var HttpClient = function () {
    /**
     * Constructor
     * @param cache
     */
    function HttpClient(cache) {
        _classCallCheck(this, HttpClient);

        this.cache = cache ? new _MemoryCache2.default() : null;
    }

    /**
     * Make query against the server
     * @param query
     * @returns {Promise}
     */


    _createClass(HttpClient, [{
        key: "query",
        value: function query(_query) {
            // check if query exists in cache store
            // return promise with the cached value if key exists
            // if not exists, fetch the data
            if (this.cache !== null) {
                var cachedResponse = this.cache.get(_query);
                if (cachedResponse) {
                    return new Promise(function (resolve) {
                        return resolve(cachedResponse);
                    });
                }
            }

            return this.fetchData(_query);
        }

        /**
         * Fetch data using Axios
         * @param query
         * @returns {Promise}
         */

    }, {
        key: "fetchData",
        value: function fetchData(query) {
            var self = this;

            return new Promise(function (resolve, reject) {
                axios.get(query).then(function (response) {
                    // check if cache is enabled
                    // set the query as a cache key
                    // and the valid response as a cache value
                    if (self.cache !== null) {
                        self.cache.set(query, response.data);
                    }

                    return resolve(response.data);
                }).catch(function (error) {
                    return reject(error);
                });
            });
        }
    }]);

    return HttpClient;
}();

exports.default = HttpClient;

/***/ })
/******/ ]);
});
//# sourceMappingURL=apisearch.node.js.map
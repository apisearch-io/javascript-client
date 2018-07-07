apisearch =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(/*! ./../helpers/btoa */ "./node_modules/axios/lib/helpers/btoa.js");

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
    if ("development" !== 'test' &&
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
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
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
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

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

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

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
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
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

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

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

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");
var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");

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

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

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

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

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

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

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

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

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

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
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

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

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

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

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

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

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
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
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

/***/ "./node_modules/axios/lib/helpers/btoa.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/btoa.js ***!
  \************************************************/
/*! no static exports found */
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

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

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

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
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

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

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

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
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

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

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

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

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
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
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

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");

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
  if (typeof obj !== 'object') {
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

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
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

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./src/Apisearch.ts":
/*!**************************!*\
  !*** ./src/Apisearch.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var AxiosClient_1 = __webpack_require__(/*! ./Http/AxiosClient */ "./src/Http/AxiosClient.ts");
var RetryMap_1 = __webpack_require__(/*! ./Http/RetryMap */ "./src/Http/RetryMap.ts");
var HttpRepository_1 = __webpack_require__(/*! ./Repository/HttpRepository */ "./src/Repository/HttpRepository.ts");
var NoCache_1 = __webpack_require__(/*! ./Cache/NoCache */ "./src/Cache/NoCache.ts");
var Query_1 = __webpack_require__(/*! ./Query/Query */ "./src/Query/Query.ts");
var Query_2 = __webpack_require__(/*! ./Query/Query */ "./src/Query/Query.ts");
var Query_3 = __webpack_require__(/*! ./Query/Query */ "./src/Query/Query.ts");
/**
 * Apisearch class
 */
var Apisearch = /** @class */ (function () {
    function Apisearch() {
    }
    /**
     * Constructor
     *
     * @param config
     *
     * @returns {Repository}
     */
    Apisearch.createRepository = function (config) {
        config.options = __assign({ api_version: 'v1', timeout: 10000, override_queries: true, cache: new NoCache_1["default"]() }, config.options);
        /**
         * Client
         */
        var httpClient = new AxiosClient_1["default"](config.options.endpoint, config.options.api_version, config.options.timeout, new RetryMap_1["default"](), config.options.override_queries, config.options.cache);
        return new HttpRepository_1["default"](httpClient, config.app_id, config.index_id, config.token);
    };
    /**
     * Created located
     *
     * @param coordinate
     * @param queryText
     * @param page
     * @param size
     *
     * @returns {Query}
     */
    Apisearch.createQueryLocated = function (coordinate, queryText, page, size) {
        if (page === void 0) { page = Query_2.QUERY_DEFAULT_PAGE; }
        if (size === void 0) { size = Query_3.QUERY_DEFAULT_SIZE; }
        return Query_1["default"].createLocated(coordinate, queryText, page, size);
    };
    /**
     * Create
     *
     * @param queryText
     * @param page
     * @param size
     *
     * @returns {Query}
     */
    Apisearch.createQuery = function (queryText, page, size) {
        if (page === void 0) { page = Query_2.QUERY_DEFAULT_PAGE; }
        if (size === void 0) { size = Query_3.QUERY_DEFAULT_SIZE; }
        return Query_1["default"].create(queryText, page, size);
    };
    /**
     * Create match all
     *
     * @return {Query}
     */
    Apisearch.createQueryMatchAll = function () {
        return Query_1["default"].createMatchAll();
    };
    /**
     * Create by UUID
     *
     * @param uuid
     *
     * @return {Query}
     */
    Apisearch.createQueryByUUID = function (uuid) {
        return Query_1["default"].createByUUID(uuid);
    };
    /**
     * Create by UUIDs
     *
     * @param uuids
     *
     * @return {Query}
     */
    Apisearch.createQueryByUUIDs = function () {
        var uuids = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            uuids[_i] = arguments[_i];
        }
        return Query_1["default"].createByUUIDs.apply(Query_1["default"], uuids);
    };
    return Apisearch;
}());
exports["default"] = Apisearch;


/***/ }),

/***/ "./src/Cache/NoCache.ts":
/*!******************************!*\
  !*** ./src/Cache/NoCache.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/**
 * Cache class
 */
var NoCache = /** @class */ (function () {
    function NoCache() {
    }
    /**
     * Set cache element
     *
     * @param key
     * @param value
     *
     * @returns {void}
     */
    NoCache.prototype.set = function (key, value) {
        // Empty
    };
    /**
     * Get element from cache
     *
     * @param key
     *
     * @returns {any}
     */
    NoCache.prototype.get = function (key) {
        return undefined;
    };
    /**
     * Deletes element from cache
     *
     * @param key
     */
    NoCache.prototype.del = function (key) {
        // Empty
    };
    /**
     * Clear cache
     */
    NoCache.prototype.clear = function () {
        // Empty
    };
    return NoCache;
}());
exports["default"] = NoCache;


/***/ }),

/***/ "./src/Error/ConnectionError.ts":
/*!**************************************!*\
  !*** ./src/Error/ConnectionError.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ErrorWithMessage_1 = __webpack_require__(/*! ./ErrorWithMessage */ "./src/Error/ErrorWithMessage.ts");
var ConnectionError = /** @class */ (function (_super) {
    __extends(ConnectionError, _super);
    function ConnectionError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get transportable http error
     *
     * @return {number}
     */
    ConnectionError.getTransportableHTTPError = function () {
        return 500;
    };
    return ConnectionError;
}(ErrorWithMessage_1["default"]));
exports["default"] = ConnectionError;


/***/ }),

/***/ "./src/Error/ErrorWithMessage.ts":
/*!***************************************!*\
  !*** ./src/Error/ErrorWithMessage.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/**
 * ConnectError
 */
var ErrorWithMessage = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param message
     */
    function ErrorWithMessage(message) {
        this.message = message;
    }
    return ErrorWithMessage;
}());
exports["default"] = ErrorWithMessage;


/***/ }),

/***/ "./src/Error/InvalidFormatError.ts":
/*!*****************************************!*\
  !*** ./src/Error/InvalidFormatError.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ErrorWithMessage_1 = __webpack_require__(/*! ./ErrorWithMessage */ "./src/Error/ErrorWithMessage.ts");
/**
 * Class InvalidFormatError
 */
var InvalidFormatError = /** @class */ (function (_super) {
    __extends(InvalidFormatError, _super);
    function InvalidFormatError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get transportable http error
     *
     * @return {number}
     */
    InvalidFormatError.getTransportableHTTPError = function () {
        return 400;
    };
    /**
     * Item representation not valid
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.itemRepresentationNotValid = function () {
        return new InvalidFormatError("Item representation not valid. Expecting Item array serialized but found malformed data");
    };
    /**
     * Item UUID representation not valid
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.itemUUIDRepresentationNotValid = function () {
        return new InvalidFormatError("Item UUID representation not valid. Expecting UUID array serialized but found malformed data");
    };
    /**
     * Create Composed UUID bad format.
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.composedItemUUIDNotValid = function () {
        return new InvalidFormatError("A composed UUID should always follow this format: {id}~{type}.");
    };
    /**
     * Create Query sorted by distance without coordinate.
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.querySortedByDistanceWithoutCoordinate = function () {
        return new InvalidFormatError("In order to be able to sort by coordinates, you need to create a Query by using Query::createLocated() instead of Query::create()");
    };
    /**
     * Query representation not valid
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.queryFormatNotValid = function () {
        return new InvalidFormatError("Query Format not valid. Expecting a Query serialized but found malformed data");
    };
    /**
     * Coordinate representation not valid
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.coordinateFormatNotValid = function () {
        return new InvalidFormatError("A Coordinate should always contain a lat (Latitude) and a lon (Longitude)");
    };
    /**
     * Config representation not valid
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.configFormatNotValid = function () {
        return new InvalidFormatError("Config Format not valid. Expecting a Config serialized but found malformed data");
    };
    /**
     * Token representation not valid
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.tokenFormatNotValid = function () {
        return new InvalidFormatError("Token Format not valid. Expecting a Token serialized but found malformed data");
    };
    /**
     * Campaign representation not valid
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.campaignFormatNotValid = function () {
        return new InvalidFormatError("Campaign Format not valid. Expecting a Campaign serialized but found malformed data");
    };
    /**
     * Changes representation not valid
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.changesFormatNotValid = function () {
        return new InvalidFormatError("Changes Format not valid. Expecting a Changes serialized but found malformed data");
    };
    /**
     * Boost clause representation not valid
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.boostClauseFormatNotValid = function () {
        return new InvalidFormatError("Boost clause Format not valid. Expecting a Boost clause serialized but found malformed data");
    };
    /**
     * token uuid representation not valid
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.tokenUUIDFormatNotValid = function () {
        return new InvalidFormatError("Token UUID Format not valid. Expecting a TokenUUID serialized but found malformed data");
    };
    /**
     * User representation not valid
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.userFormatNotValid = function () {
        return new InvalidFormatError("User Format not valid. Expecting a User serialized but found malformed data");
    };
    return InvalidFormatError;
}(ErrorWithMessage_1["default"]));
exports["default"] = InvalidFormatError;


/***/ }),

/***/ "./src/Error/InvalidTokenError.ts":
/*!****************************************!*\
  !*** ./src/Error/InvalidTokenError.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ErrorWithMessage_1 = __webpack_require__(/*! ./ErrorWithMessage */ "./src/Error/ErrorWithMessage.ts");
var InvalidTokenError = /** @class */ (function (_super) {
    __extends(InvalidTokenError, _super);
    function InvalidTokenError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get transportable http error
     *
     * @return {number}
     */
    InvalidTokenError.getTransportableHTTPError = function () {
        return 401;
    };
    /**
     * Invalid token permissions
     *
     * @param tokenReference
     *
     * @return {InvalidTokenError}
     */
    InvalidTokenError.createInvalidTokenPermissions = function (tokenReference) {
        return new InvalidTokenError("Token " + tokenReference + "not valid");
    };
    /**
     * Invalid token permissions
     *
     * @param tokenReference
     * @param maxHitsPerQuery
     *
     * @return {InvalidTokenError}
     */
    InvalidTokenError.createInvalidTokenMaxHitsPerQuery = function (tokenReference, maxHitsPerQuery) {
        return new InvalidTokenError("Token " + tokenReference + "not valid. Max " + maxHitsPerQuery + " hits allowed");
    };
    return InvalidTokenError;
}(ErrorWithMessage_1["default"]));
exports["default"] = InvalidTokenError;


/***/ }),

/***/ "./src/Error/ResourceExistsError.ts":
/*!******************************************!*\
  !*** ./src/Error/ResourceExistsError.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ErrorWithMessage_1 = __webpack_require__(/*! ./ErrorWithMessage */ "./src/Error/ErrorWithMessage.ts");
var ResourceExistsError = /** @class */ (function (_super) {
    __extends(ResourceExistsError, _super);
    function ResourceExistsError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get transportable http error
     *
     * @return {number}
     */
    ResourceExistsError.getTransportableHTTPError = function () {
        return 409;
    };
    /**
     * Index not available
     *
     * @return {InvalidFormatError}
     */
    ResourceExistsError.indexAvailable = function () {
        return new ResourceExistsError("Index exists and cannot be created again");
    };
    /**
     * Events not available
     *
     * @return {InvalidFormatError}
     */
    ResourceExistsError.eventsIndexAvailable = function () {
        return new ResourceExistsError("Events index exists and cannot be created again");
    };
    /**
     * Logs not available
     *
     * @return {InvalidFormatError}
     */
    ResourceExistsError.logsIndexAvailable = function () {
        return new ResourceExistsError("Logs index exists and cannot be created again");
    };
    return ResourceExistsError;
}(ErrorWithMessage_1["default"]));
exports["default"] = ResourceExistsError;


/***/ }),

/***/ "./src/Error/ResourceNotAvailableError.ts":
/*!************************************************!*\
  !*** ./src/Error/ResourceNotAvailableError.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ErrorWithMessage_1 = __webpack_require__(/*! ./ErrorWithMessage */ "./src/Error/ErrorWithMessage.ts");
var ResourceNotAvailableError = /** @class */ (function (_super) {
    __extends(ResourceNotAvailableError, _super);
    function ResourceNotAvailableError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get transportable http error
     *
     * @return {number}
     */
    ResourceNotAvailableError.getTransportableHTTPError = function () {
        return 404;
    };
    /**
     * Index not available
     *
     * @param resourceId
     *
     * @return {InvalidFormatError}
     */
    ResourceNotAvailableError.indexNotAvailable = function (resourceId) {
        return new ResourceNotAvailableError("Index not available - " + resourceId);
    };
    /**
     * Events not available
     *
     * @param resourceId
     *
     * @return {InvalidFormatError}
     */
    ResourceNotAvailableError.eventsIndexNotAvailable = function (resourceId) {
        return new ResourceNotAvailableError("Events not available - " + resourceId);
    };
    /**
     * Logs not available
     *
     * @param resourceId
     *
     * @return {InvalidFormatError}
     */
    ResourceNotAvailableError.logsIndexNotAvailable = function (resourceId) {
        return new ResourceNotAvailableError("Logs not available - " + resourceId);
    };
    /**
     * Engine not available
     *
     * @param resourceId
     *
     * @return {InvalidFormatError}
     */
    ResourceNotAvailableError.engineNotAvailable = function (resourceId) {
        return new ResourceNotAvailableError("Engine not available - " + resourceId);
    };
    return ResourceNotAvailableError;
}(ErrorWithMessage_1["default"]));
exports["default"] = ResourceNotAvailableError;


/***/ }),

/***/ "./src/Http/AxiosClient.ts":
/*!*********************************!*\
  !*** ./src/Http/AxiosClient.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
var Client_1 = __webpack_require__(/*! ./Client */ "./src/Http/Client.ts");
var Response_1 = __webpack_require__(/*! ./Response */ "./src/Http/Response.ts");
/**
 * AxiosClient
 */
var AxiosClient = /** @class */ (function (_super) {
    __extends(AxiosClient, _super);
    /**
     * Constructor
     *
     * @param host
     * @param version
     * @param timeout
     * @param retryMap
     * @param overrideQueries
     * @param cache
     */
    function AxiosClient(host, version, timeout, retryMap, overrideQueries, cache) {
        var _this = _super.call(this, version, retryMap) || this;
        _this.host = host;
        _this.timeout = timeout;
        _this.cache = cache;
        _this.overrideQueries = overrideQueries;
        _this.cancelToken = axios_1["default"].CancelToken.source();
        return _this;
    }
    /**
     * Get
     *
     * @param url
     * @param method
     * @param credentials
     * @param parameters
     * @param data
     *
     * @return {Promise<Response>}
     */
    AxiosClient.prototype.get = function (url, method, credentials, parameters, data) {
        if (parameters === void 0) { parameters = {}; }
        if (data === void 0) { data = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var that;
            var _this = this;
            return __generator(this, function (_a) {
                that = this;
                url = url.replace(/^\/*|\/*$/g, "");
                url = "/" + (this.version + "/" + url).replace(/^\/*|\/*$/g, "");
                method = method.toLowerCase();
                if ("get" === method &&
                    this.overrideQueries) {
                    this.abort();
                }
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var headers = "get" == method
                            ? {}
                            : {
                                "Content-Encoding": "gzip",
                                "Content-Type": "application/json"
                            };
                        //noinspection TypeScriptValidateTypes
                        axios_1["default"]
                            .request({
                            url: url + "?" + Client_1["default"].objectToUrlParameters(__assign({}, credentials, parameters)),
                            data: data,
                            headers: headers,
                            method: method,
                            baseURL: that.host.replace(/\/*$/g, ""),
                            timeout: that.timeout,
                            cancelToken: _this.cancelToken.token,
                            transformRequest: [function (data) { return JSON.stringify(data); }]
                        })
                            .then(function (axiosResponse) {
                            var response = new Response_1["default"](axiosResponse.status, axiosResponse.data);
                            return resolve(response);
                        })["catch"](function (thrown) { return reject(thrown); });
                    })];
            });
        });
    };
    /**
     * Abort current request
     * And regenerate the cancellation token
     */
    AxiosClient.prototype.abort = function () {
        this.cancelToken.cancel();
        this.cancelToken = axios_1["default"].CancelToken.source();
    };
    return AxiosClient;
}(Client_1["default"]));
exports["default"] = AxiosClient;


/***/ }),

/***/ "./src/Http/Client.ts":
/*!****************************!*\
  !*** ./src/Http/Client.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/**
 * Client
 */
var Client = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param version
     * @param retryMap
     */
    function Client(version, retryMap) {
        this.retryMap = retryMap;
        this.version = version.replace(/^\/*|\/*$/g, "");
    }
    /**
     * Build an url parameters array by an object
     *
     * @param params
     *
     * @returns {string}
     */
    Client.objectToUrlParameters = function (params) {
        var builtParams = [];
        for (var i in params) {
            builtParams.push(i + "=" + params[i]);
        }
        return builtParams.join("&");
    };
    return Client;
}());
exports["default"] = Client;


/***/ }),

/***/ "./src/Http/Response.ts":
/*!******************************!*\
  !*** ./src/Http/Response.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/**
 * Response
 */
var Response = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param code
     * @param body
     */
    function Response(code, body) {
        this.code = code;
        this.body = body;
    }
    /**
     * Get code
     *
     * @return {number}
     */
    Response.prototype.getCode = function () {
        return this.code;
    };
    /**
     * Get body
     *
     * @return {any}
     */
    Response.prototype.getBody = function () {
        return this.body;
    };
    return Response;
}());
exports["default"] = Response;


/***/ }),

/***/ "./src/Http/Retry.ts":
/*!***************************!*\
  !*** ./src/Http/Retry.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.DEFAULT_MICROSECONDS_BETWEEN_RETRIES = 1000;
/**
 * Http class
 */
var Retry = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param url
     * @param method
     * @param retries
     * @param microsecondsBetweenRetries
     */
    function Retry(url, method, retries, microsecondsBetweenRetries) {
        this.url = url;
        this.method = method;
        this.retries = retries;
        this.microsecondsBetweenRetries = microsecondsBetweenRetries;
    }
    /**
     * Create from array
     *
     * @param array
     *
     * @return {Retry}
     */
    Retry.createFromArray = function (array) {
        return new Retry(array.url ? array.url : "*", array.method ? array.method : "*", array.retries ? array.retries : 0, array.microseconds_between_retries
            ? array.microseconds_between_retries
            : exports.DEFAULT_MICROSECONDS_BETWEEN_RETRIES);
    };
    /**
     * Get url
     *
     * @return {string}
     */
    Retry.prototype.getUrl = function () {
        return this.url;
    };
    /**
     * Get method
     *
     * @return {string}
     */
    Retry.prototype.getMethod = function () {
        return this.method;
    };
    /**
     * Ge retries
     *
     * @return {number}
     */
    Retry.prototype.getRetries = function () {
        return this.retries;
    };
    /**
     * Get microseconds between retries
     *
     * @return {number}
     */
    Retry.prototype.getMicrosecondsBetweenRetries = function () {
        return this.microsecondsBetweenRetries;
    };
    return Retry;
}());
exports["default"] = Retry;


/***/ }),

/***/ "./src/Http/RetryMap.ts":
/*!******************************!*\
  !*** ./src/Http/RetryMap.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Retry_1 = __webpack_require__(/*! ./Retry */ "./src/Http/Retry.ts");
/**
 * Http class
 */
var RetryMap = /** @class */ (function () {
    function RetryMap() {
        this.retries = {};
    }
    /**
     * Add retry
     *
     * @param retry
     */
    RetryMap.prototype.addRetry = function (retry) {
        this.retries[retry.getUrl() + "~~" + retry.getMethod()] = retry;
    };
    /**
     * Create from array
     */
    RetryMap.createFromArray = function (array) {
        var retryMap = new RetryMap();
        retryMap.retries = array.map(function (retry) { return Retry_1["default"].createFromArray(retry); });
        return retryMap;
    };
    /**
     * Get retry
     *
     * @param url
     * @param method
     *
     * @returns {Retry}
     */
    RetryMap.prototype.getRetry = function (url, method) {
        if (this.retries[url + "~~" + method] instanceof Retry_1["default"]) {
            return this.retries[url + "~~" + method];
        }
        if (this.retries["*~~" + method] instanceof Retry_1["default"]) {
            return this.retries["*~~" + method];
        }
        if (this.retries[url + "~~*"] instanceof Retry_1["default"]) {
            return this.retries[url + "~~*"];
        }
        if (this.retries["*~~*"] instanceof Retry_1["default"]) {
            return this.retries["*~~*"];
        }
        return null;
    };
    return RetryMap;
}());
exports["default"] = RetryMap;


/***/ }),

/***/ "./src/Model/Coordinate.ts":
/*!*********************************!*\
  !*** ./src/Model/Coordinate.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var InvalidFormatError_1 = __webpack_require__(/*! ../Error/InvalidFormatError */ "./src/Error/InvalidFormatError.ts");
/**
 * Coordinate Type cast
 * @param coordinate
 */
var Coordinate = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {number} lat
     * @param {number} lon
     */
    function Coordinate(lat, lon) {
        this.lat = lat;
        this.lon = lon;
    }
    /**
     * Get latitude
     *
     * @return float
     */
    Coordinate.prototype.getLatitude = function () {
        return this.lat;
    };
    /**
     * Get longitude
     *
     * @return float
     */
    Coordinate.prototype.getLongitude = function () {
        return this.lon;
    };
    /**
     * To array
     *
     * @return {{lat: number, lon: number}}
     */
    Coordinate.prototype.toArray = function () {
        return {
            lat: this.lat,
            lon: this.lon
        };
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @return Coordinate
     *
     * @throws InvalidFormatError
     */
    Coordinate.createFromArray = function (array) {
        if (typeof array.lat == "undefined" ||
            typeof array.lon == "undefined") {
            throw InvalidFormatError_1["default"].coordinateFormatNotValid();
        }
        return new Coordinate(array.lat, array.lon);
    };
    return Coordinate;
}());
exports["default"] = Coordinate;


/***/ }),

/***/ "./src/Model/Item.ts":
/*!***************************!*\
  !*** ./src/Model/Item.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var InvalidFormatError_1 = __webpack_require__(/*! ../../src/Error/InvalidFormatError */ "./src/Error/InvalidFormatError.ts");
var Coordinate_1 = __webpack_require__(/*! ./Coordinate */ "./src/Model/Coordinate.ts");
var ItemUUID_1 = __webpack_require__(/*! ./ItemUUID */ "./src/Model/ItemUUID.ts");
/**
 * Item class
 */
var Item = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param uuid
     * @param coordinate
     * @param metadata
     * @param indexedMetadata
     * @param searchableMetadata
     * @param exactMatchingMetadata
     * @param suggest
     */
    function Item(uuid, coordinate, metadata, indexedMetadata, searchableMetadata, exactMatchingMetadata, suggest) {
        this.metadata = {};
        this.indexedMetadata = {};
        this.searchableMetadata = {};
        this.exactMatchingMetadata = [];
        this.suggest = [];
        this.highlights = {};
        this.promoted = false;
        this.uuid = uuid;
        this.coordinate = coordinate;
        this.metadata = metadata;
        this.indexedMetadata = indexedMetadata;
        this.searchableMetadata = searchableMetadata;
        this.exactMatchingMetadata = exactMatchingMetadata;
        this.suggest = suggest;
    }
    /**
     * Create new Item
     *
     * @param uuid
     * @param metadata
     * @param indexedMetadata
     * @param searchableMetadata
     * @param exactMatchingMetadata
     * @param suggest
     * @returns {Item}
     */
    Item.create = function (uuid, metadata, indexedMetadata, searchableMetadata, exactMatchingMetadata, suggest) {
        if (metadata === void 0) { metadata = {}; }
        if (indexedMetadata === void 0) { indexedMetadata = {}; }
        if (searchableMetadata === void 0) { searchableMetadata = {}; }
        if (exactMatchingMetadata === void 0) { exactMatchingMetadata = []; }
        if (suggest === void 0) { suggest = []; }
        return new Item(uuid, null, metadata, indexedMetadata, searchableMetadata, exactMatchingMetadata, suggest);
    };
    /**
     * Create new located Item
     *
     * @param uuid
     * @param coordinate
     * @param metadata
     * @param indexedMetadata
     * @param searchableMetadata
     * @param exactMatchingMetadata
     * @param suggest
     * @returns {Item}
     */
    Item.createLocated = function (uuid, coordinate, metadata, indexedMetadata, searchableMetadata, exactMatchingMetadata, suggest) {
        if (metadata === void 0) { metadata = {}; }
        if (indexedMetadata === void 0) { indexedMetadata = {}; }
        if (searchableMetadata === void 0) { searchableMetadata = {}; }
        if (exactMatchingMetadata === void 0) { exactMatchingMetadata = []; }
        if (suggest === void 0) { suggest = []; }
        return new Item(uuid, coordinate, metadata, indexedMetadata, searchableMetadata, exactMatchingMetadata, suggest);
    };
    /**
     * Get uuid
     *
     * @returns ItemUUID
     */
    Item.prototype.getUUID = function () {
        return this.uuid;
    };
    /**
     * Get id
     *
     * @returns string
     */
    Item.prototype.getId = function () {
        return this.uuid.getId();
    };
    /**
     * Get type
     *
     * @returns string
     */
    Item.prototype.getType = function () {
        return this.uuid.getType();
    };
    /**
     * Get coordinate
     *
     * @returns Coordinate|null
     */
    Item.prototype.getCoordinate = function () {
        return this.coordinate;
    };
    /**
     * Get distance
     *
     * @returns int
     */
    Item.prototype.getDistance = function () {
        return this.distance;
    };
    /**
     * Get metadata
     *
     * @returns Array
     */
    Item.prototype.getMetadata = function () {
        return this.metadata;
    };
    /**
     * Set metadata
     *
     * @param metadata
     */
    Item.prototype.setMetadata = function (metadata) {
        this.metadata = metadata;
    };
    /**
     * Add metadata
     *
     * @param key
     * @param value
     */
    Item.prototype.addMetadata = function (key, value) {
        this.metadata[key] = value;
    };
    /**
     * Get indexed metadata
     *
     * @returns Array
     */
    Item.prototype.getIndexedMetadata = function () {
        return this.indexedMetadata;
    };
    /**
     * Set indexed metadata
     *
     * @param indexedMetadata
     */
    Item.prototype.setIndexedMetadata = function (indexedMetadata) {
        this.indexedMetadata = indexedMetadata;
    };
    /**
     * Add indexed metadata
     *
     * @param key
     * @param value
     */
    Item.prototype.addIndexedMetadata = function (key, value) {
        this.indexedMetadata[key] = value;
    };
    /**
     * Get searchable metadata
     *
     * @returns Array
     */
    Item.prototype.getSearchableMetadata = function () {
        return this.searchableMetadata;
    };
    /**
     * Set searchable metadata
     *
     * @param searchableMetadata
     */
    Item.prototype.setSearchableMetadata = function (searchableMetadata) {
        this.searchableMetadata = searchableMetadata;
    };
    /**
     * Add searchable metadata
     *
     * @param key
     * @param value
     */
    Item.prototype.addSearchableMetadata = function (key, value) {
        this.searchableMetadata[key] = value;
    };
    /**
     * Get exactMatching metadata
     *
     * @returns Array
     */
    Item.prototype.getExactMatchingMetadata = function () {
        return this.exactMatchingMetadata;
    };
    /**
     * Set exactMatching metadata
     *
     * @param exactMatchingMetadata
     */
    Item.prototype.setExactMatchingMetadata = function (exactMatchingMetadata) {
        this.exactMatchingMetadata = exactMatchingMetadata;
    };
    /**
     * Add exactMatching metadata
     *
     * @param value
     */
    Item.prototype.addExactMatchingMetadata = function (value) {
        this.exactMatchingMetadata.push(value);
    };
    /**
     * Get all metadata
     *
     * @returns {{}}
     */
    Item.prototype.getAllMetadata = function () {
        return __assign({}, this.metadata, this.indexedMetadata);
    };
    /**
     * Get
     *
     * @param key
     *
     * @returns mixed|null
     */
    Item.prototype.get = function (key) {
        var allMetadata = this.getAllMetadata();
        return (typeof allMetadata[key] != "undefined")
            ? allMetadata[key]
            : null;
    };
    /**
     * Get suggest
     *
     * @returns Array
     */
    Item.prototype.getSuggest = function () {
        return this.suggest;
    };
    /**
     * Get highlights
     *
     * @returns Array
     */
    Item.prototype.getHighlights = function () {
        return this.highlights;
    };
    /**
     * Get highlight
     *
     * @param key
     *
     * @return string|null
     */
    Item.prototype.getHighlight = function (key) {
        return (typeof this.highlights[key] != "undefined")
            ? this.highlights[key]
            : null;
    };
    /**
     * Is promoted
     *
     * @returns boolean
     */
    Item.prototype.isPromoted = function () {
        return this.promoted;
    };
    /**
     * To array
     */
    Item.prototype.toArray = function () {
        var itemAsArray = {
            uuid: this.uuid.toArray()
        };
        if (this.coordinate instanceof Coordinate_1["default"]) {
            itemAsArray.coordinate = this.coordinate.toArray();
        }
        if (Object.keys(this.metadata).length > 0) {
            itemAsArray.metadata = this.metadata;
        }
        if (Object.keys(this.indexedMetadata).length > 0) {
            itemAsArray.indexed_metadata = this.indexedMetadata;
        }
        if (Object.keys(this.searchableMetadata).length > 0) {
            itemAsArray.searchable_metadata = this.searchableMetadata;
        }
        if (this.exactMatchingMetadata.length > 0) {
            itemAsArray.exact_matching_metadata = this.exactMatchingMetadata;
        }
        if (this.suggest.length > 0) {
            itemAsArray.suggest = this.suggest;
        }
        if (Object.keys(this.highlights).length > 0) {
            itemAsArray.highlights = this.highlights;
        }
        if (this.isPromoted()) {
            itemAsArray.is_promoted = true;
        }
        if (typeof this.distance != "undefined") {
            itemAsArray.distance = this.distance;
        }
        return itemAsArray;
    };
    /**
     * Create from array
     *
     * @param array
     */
    Item.createFromArray = function (array) {
        array = JSON.parse(JSON.stringify(array));
        if (typeof array.uuid != "object") {
            throw InvalidFormatError_1["default"].itemUUIDRepresentationNotValid();
        }
        if (typeof array.coordinate != "undefined" &&
            typeof array.coordinate != "object") {
            throw InvalidFormatError_1["default"].coordinateFormatNotValid();
        }
        var item = (typeof array.coordinate == "object" &&
            array.coordinate != null)
            ? Item.createLocated(ItemUUID_1["default"].createFromArray(array.uuid), Coordinate_1["default"].createFromArray(array.coordinate), ((typeof array.metadata == "undefined") ? {} : array.metadata), ((typeof array.indexed_metadata == "undefined") ? {} : array.indexed_metadata), ((typeof array.searchable_metadata == "undefined") ? {} : array.searchable_metadata), ((typeof array.exact_matching_metadata == "undefined") ? [] : array.exact_matching_metadata), ((typeof array.suggest == "undefined") ? [] : array.suggest))
            : Item.create(ItemUUID_1["default"].createFromArray(array.uuid), ((typeof array.metadata == "undefined") ? {} : array.metadata), ((typeof array.indexed_metadata == "undefined") ? {} : array.indexed_metadata), ((typeof array.searchable_metadata == "undefined") ? {} : array.searchable_metadata), ((typeof array.exact_matching_metadata == "undefined") ? [] : array.exact_matching_metadata), ((typeof array.suggest == "undefined") ? [] : array.suggest));
        if (typeof array.distance != "undefined" &&
            array.distance != null) {
            item.distance = array.distance;
        }
        if (typeof array.highlights == "object" &&
            array.distance != null) {
            item.highlights = array.highlights;
        }
        if (array.is_promoted) {
            item.promoted = true;
        }
        return item;
    };
    /**
     * Compose uuid
     *
     * @returns string
     */
    Item.prototype.composeUUID = function () {
        return this.uuid.composedUUID();
    };
    return Item;
}());
exports["default"] = Item;


/***/ }),

/***/ "./src/Model/ItemUUID.ts":
/*!*******************************!*\
  !*** ./src/Model/ItemUUID.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var InvalidFormatError_1 = __webpack_require__(/*! ../../src/Error/InvalidFormatError */ "./src/Error/InvalidFormatError.ts");
/**
 * ItemUUID class
 */
var ItemUUID = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param id
     * @param type
     */
    function ItemUUID(id, type) {
        this.id = id;
        this.type = type;
    }
    /**
     * Create composed UUID
     *
     * @param composedUUID
     *
     * @returns {ItemUUID}
     */
    ItemUUID.createByComposedUUID = function (composedUUID) {
        var parts = composedUUID.split("~");
        if (2 != parts.length) {
            throw InvalidFormatError_1["default"].composedItemUUIDNotValid();
        }
        return new ItemUUID(parts[0], parts[1]);
    };
    /**
     * Return id
     *
     * @returns {string}
     */
    ItemUUID.prototype.getId = function () {
        return this.id;
    };
    /**
     * Get type
     *
     * @returns {string}
     */
    ItemUUID.prototype.getType = function () {
        return this.type;
    };
    /**
     * To array
     *
     * @returns {{id: *, type: *}}
     */
    ItemUUID.prototype.toArray = function () {
        return {
            id: this.id,
            type: this.type
        };
    };
    /**
     * Create from array
     *
     * @param array {{id:string, type:string}}
     *
     * @return {ItemUUID}
     */
    ItemUUID.createFromArray = function (array) {
        array = JSON.parse(JSON.stringify(array));
        return new ItemUUID(array.id, array.type);
    };
    /**
     * Compose unique id
     *
     * @returns {string}
     */
    ItemUUID.prototype.composedUUID = function () {
        return this.id + "~" + this.type;
    };
    return ItemUUID;
}());
exports["default"] = ItemUUID;


/***/ }),

/***/ "./src/Model/Metadata.ts":
/*!*******************************!*\
  !*** ./src/Model/Metadata.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/**
 * User class
 */
var Metadata = /** @class */ (function () {
    function Metadata() {
    }
    /**
     * To metadata
     *
     * @param array:{}
     *
     * @returns {string}
     */
    Metadata.toMetadata = function (array) {
        array = JSON.parse(JSON.stringify(array));
        var parts = [];
        for (var key in array) {
            parts.push(key + "##" + array[key]);
        }
        return parts.join("~~");
    };
    /**
     * From metadata
     *
     * @param metadata
     *
     * @return {{}}
     */
    Metadata.fromMetadata = function (metadata) {
        var values = {};
        var splittedParts = metadata.split("~~");
        var iterator = 0;
        var size = 0;
        var lastElement = null;
        for (var key in splittedParts) {
            var part = splittedParts[key];
            var parts = part.split("##");
            if (parts.length > 1) {
                lastElement = parts[1];
                values[parts[0]] = lastElement;
            }
            else {
                lastElement = part;
                values[iterator++] = lastElement;
            }
            size++;
        }
        if (size == 1) {
            values = {
                id: lastElement,
                name: lastElement
            };
        }
        if (typeof values.id == "undefined") {
            return null;
        }
        return values;
    };
    return Metadata;
}());
exports["default"] = Metadata;


/***/ }),

/***/ "./src/Model/User.ts":
/*!***************************!*\
  !*** ./src/Model/User.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var InvalidFormatError_1 = __webpack_require__(/*! ../Error/InvalidFormatError */ "./src/Error/InvalidFormatError.ts");
/**
 * User class
 */
var User = /** @class */ (function () {
    /**
     * Construct
     *
     * @param id string
     * @param attributes Array
     */
    function User(id, attributes) {
        if (attributes === void 0) { attributes = {}; }
        this.id = id;
        this.attributes = attributes;
    }
    /**
     * Return the user id
     *
     * @return {string}
     */
    User.prototype.getId = function () {
        return this.id;
    };
    /**
     * Return array
     *
     * @returns {{}}
     */
    User.prototype.getAttributes = function () {
        return this.attributes;
    };
    /**
     * To array
     *
     * @returns {{id: string, attributes: {}}}
     */
    User.prototype.toArray = function () {
        var array = {
            id: this.id
        };
        if (Object.keys(this.attributes).length > 0) {
            array.attributes = this.attributes;
        }
        return array;
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @return User
     */
    User.createFromArray = function (array) {
        if (array == null ||
            typeof array.id == "undefined" ||
            array.id == null) {
            throw InvalidFormatError_1["default"].userFormatNotValid();
        }
        var attributes = typeof array.attributes === typeof {}
            ? array.attributes
            : {};
        return new User(array.id, attributes);
    };
    return User;
}());
exports["default"] = User;


/***/ }),

/***/ "./src/Query/Aggregation.ts":
/*!**********************************!*\
  !*** ./src/Query/Aggregation.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Filter_1 = __webpack_require__(/*! ./Filter */ "./src/Query/Filter.ts");
/**
 * Aggregation constants
 */
exports.AGGREGATION_SORT_BY_COUNT_ASC = ["_count", "asc"];
exports.AGGREGATION_SORT_BY_COUNT_DESC = ["_count", "desc"];
exports.AGGREGATION_SORT_BY_NAME_ASC = ["_term", "asc"];
exports.AGGREGATION_SORT_BY_NAME_DESC = ["_term", "desc"];
exports.AGGREGATION_NO_LIMIT = 0;
/**
 * Aggregation class
 */
var Aggregation = /** @class */ (function () {
    /**
     * Construct
     *
     * @param name
     * @param field
     * @param applicationType
     * @param filterType
     * @param subgroup
     * @param sort
     * @param limit
     */
    function Aggregation(name, field, applicationType, filterType, subgroup, sort, limit) {
        this.subgroup = [];
        this.name = name;
        this.field = field;
        this.applicationType = applicationType;
        this.filterType = filterType;
        this.subgroup = subgroup;
        this.sort = sort;
        this.limit = limit;
    }
    /**
     * Get name
     *
     * @returns {string}
     */
    Aggregation.prototype.getName = function () {
        return this.name;
    };
    /**
     * Get field
     *
     * @returns {string}
     */
    Aggregation.prototype.getField = function () {
        return this.field;
    };
    /**
     * getApplicationType
     *
     * @returns {number}
     */
    Aggregation.prototype.getApplicationType = function () {
        return this.applicationType;
    };
    /**
     * Get filter type
     *
     * @return {string}
     */
    Aggregation.prototype.getFilterType = function () {
        return this.filterType;
    };
    /**
     * Get subgroup
     *
     * @return {[]}
     */
    Aggregation.prototype.getSubgroup = function () {
        return this.subgroup;
    };
    /**
     * Get sort
     *
     * @return {[]}
     */
    Aggregation.prototype.getSort = function () {
        return this.sort;
    };
    /**
     * Get limit
     *
     * @return {number}
     */
    Aggregation.prototype.getLimit = function () {
        return this.limit;
    };
    /**
     * Create
     *
     * @param name
     * @param field
     * @param applicationType
     * @param filterType
     * @param subgroup
     * @param sort
     * @param limit
     *
     * @returns {Aggregation}
     */
    Aggregation.create = function (name, field, applicationType, filterType, subgroup, sort, limit) {
        if (subgroup === void 0) { subgroup = []; }
        if (sort === void 0) { sort = exports.AGGREGATION_SORT_BY_COUNT_DESC; }
        if (limit === void 0) { limit = exports.AGGREGATION_NO_LIMIT; }
        return new Aggregation(name, field, applicationType, filterType, subgroup, sort, limit);
    };
    /**
     * To array
     *
     * @returns {Array}
     */
    Aggregation.prototype.toArray = function () {
        var aggregationAsArray = {
            name: this.name
        };
        if (this.field != "uuid.type") {
            aggregationAsArray.field = this.field;
        }
        if (this.applicationType != Filter_1.FILTER_AT_LEAST_ONE) {
            aggregationAsArray.application_type = this.applicationType;
        }
        if (this.filterType != Filter_1.FILTER_TYPE_FIELD) {
            aggregationAsArray.filter_type = this.filterType;
        }
        if (this.subgroup.length > 0) {
            aggregationAsArray.subgroup = this.subgroup;
        }
        if (JSON.stringify(this.sort) !== JSON.stringify(exports.AGGREGATION_SORT_BY_COUNT_DESC)) {
            aggregationAsArray.sort = this.sort;
        }
        if (this.limit != exports.AGGREGATION_NO_LIMIT) {
            aggregationAsArray.limit = this.limit;
        }
        return aggregationAsArray;
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @returns {Aggregation}
     */
    Aggregation.createFromArray = function (array) {
        array = JSON.parse(JSON.stringify(array));
        if (typeof array.field == "undefined") {
            array.field = "uuid.type";
        }
        if (typeof array.application_type == "undefined") {
            array.application_type = Filter_1.FILTER_AT_LEAST_ONE;
        }
        if (typeof array.filter_type == "undefined") {
            array.filter_type = Filter_1.FILTER_TYPE_FIELD;
        }
        if (typeof array.subgroup == "undefined") {
            array.subgroup = [];
        }
        if (typeof array.sort == "undefined") {
            array.sort = exports.AGGREGATION_SORT_BY_COUNT_DESC;
        }
        if (typeof array.limit == "undefined") {
            array.limit = exports.AGGREGATION_NO_LIMIT;
        }
        return Aggregation.create(array.name, array.field, array.application_type, array.filter_type, array.subgroup, array.sort, array.limit);
    };
    return Aggregation;
}());
exports["default"] = Aggregation;


/***/ }),

/***/ "./src/Query/Filter.ts":
/*!*****************************!*\
  !*** ./src/Query/Filter.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/**
 * filter constants
 */
exports.FILTER_MUST_ALL = 4;
exports.FILTER_MUST_ALL_WITH_LEVELS = 5;
exports.FILTER_AT_LEAST_ONE = 8;
exports.FILTER_EXCLUDE = 16;
exports.FILTER_PROMOTE = 32;
exports.FILTER_TYPE_FIELD = "field";
exports.FILTER_TYPE_RANGE = "range";
exports.FILTER_TYPE_DATE_RANGE = "date_range";
exports.FILTER_TYPE_GEO = "geo";
exports.FILTER_TYPE_QUERY = "query";
/**
 * Filter class
 */
var Filter = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param field
     * @param values
     * @param applicationType
     * @param filterType
     * @param filterTerms
     */
    function Filter(field, values, applicationType, filterType, filterTerms) {
        this.field = field;
        this.values = values;
        this.applicationType = applicationType;
        this.filterType = filterType;
        this.filterTerms = filterTerms;
    }
    /**
     * Get field
     *
     * @returns {string}
     */
    Filter.prototype.getField = function () {
        return this.field;
    };
    /**
     * Get values
     *
     * @returns {any}
     */
    Filter.prototype.getValues = function () {
        return this.values;
    };
    /**
     * Has value
     *
     * @param value
     *
     * @returns {boolean}
     */
    Filter.prototype.hasValue = function (value) {
        return typeof this.values[value] == "undefined";
    };
    /**
     * getApplicationType
     *
     * @returns {number}
     */
    Filter.prototype.getApplicationType = function () {
        return this.applicationType;
    };
    /**
     * Get filter type
     *
     * @return {string}
     */
    Filter.prototype.getFilterType = function () {
        return this.filterType;
    };
    /**
     * Get filter type
     *
     * @return {{}}
     */
    Filter.prototype.getFilterTerms = function () {
        return this.filterTerms;
    };
    /**
     * Create
     *
     * @param field
     * @param values
     * @param applicationType
     * @param filterType
     * @param filterTerms
     *
     * @return {Filter}
     */
    Filter.create = function (field, values, applicationType, filterType, filterTerms) {
        if (filterTerms === void 0) { filterTerms = []; }
        return new Filter(field, values, applicationType, filterType, filterTerms);
    };
    /**
     * To array
     *
     * @returns {Array}
     */
    Filter.prototype.toArray = function () {
        var filterAsArray = {};
        if (this.field != "uuid.type") {
            filterAsArray.field = this.field;
        }
        if (this.values.length > 0 ||
            Object.keys(this.values).length > 0) {
            filterAsArray.values = this.values;
        }
        if (this.applicationType != exports.FILTER_AT_LEAST_ONE) {
            filterAsArray.application_type = this.applicationType;
        }
        if (this.filterType != exports.FILTER_TYPE_FIELD) {
            filterAsArray.filter_type = this.filterType;
        }
        if (this.filterTerms.length > 0) {
            filterAsArray.filter_terms = this.filterTerms;
        }
        return filterAsArray;
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @returns {Filter}
     */
    Filter.createFromArray = function (array) {
        array = JSON.parse(JSON.stringify(array));
        if (typeof array.field == "undefined") {
            array.field = "uuid.type";
        }
        if (typeof array.values == "undefined") {
            array.values = [];
        }
        if (typeof array.application_type == "undefined") {
            array.application_type = exports.FILTER_AT_LEAST_ONE;
        }
        if (typeof array.filter_type == "undefined") {
            array.filter_type = exports.FILTER_TYPE_FIELD;
        }
        if (typeof array.filter_terms == "undefined") {
            array.filter_terms = [];
        }
        return Filter.create(array.field, array.values, array.application_type, array.filter_type, array.filter_terms);
    };
    /**
     * Get path by field.
     *
     * @param field
     *
     * @returns {string}
     */
    Filter.getFilterPathByField = function (field) {
        return (["id", "type"].indexOf(field) > -1)
            ? "uuid." + field
            : "indexed_metadata." + field;
    };
    return Filter;
}());
exports["default"] = Filter;


/***/ }),

/***/ "./src/Query/Query.ts":
/*!****************************!*\
  !*** ./src/Query/Query.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var Coordinate_1 = __webpack_require__(/*! ../Model/Coordinate */ "./src/Model/Coordinate.ts");
var ItemUUID_1 = __webpack_require__(/*! ../Model/ItemUUID */ "./src/Model/ItemUUID.ts");
var User_1 = __webpack_require__(/*! ../Model/User */ "./src/Model/User.ts");
var Aggregation_1 = __webpack_require__(/*! ./Aggregation */ "./src/Query/Aggregation.ts");
var Filter_1 = __webpack_require__(/*! ./Filter */ "./src/Query/Filter.ts");
var Filter_2 = __webpack_require__(/*! ./Filter */ "./src/Query/Filter.ts");
var Aggregation_2 = __webpack_require__(/*! ./Aggregation */ "./src/Query/Aggregation.ts");
var InvalidFormatError_1 = __webpack_require__(/*! ../Error/InvalidFormatError */ "./src/Error/InvalidFormatError.ts");
var Filter_3 = __webpack_require__(/*! ./Filter */ "./src/Query/Filter.ts");
var ScoreStrategy_1 = __webpack_require__(/*! ./ScoreStrategy */ "./src/Query/ScoreStrategy.ts");
var SortBy_1 = __webpack_require__(/*! ./SortBy */ "./src/Query/SortBy.ts");
/**
 * Query constants
 */
exports.QUERY_DEFAULT_FROM = 0;
exports.QUERY_DEFAULT_PAGE = 1;
exports.QUERY_DEFAULT_SIZE = 10;
exports.QUERY_INFINITE_SIZE = 1000;
/**
 * Query class
 */
var Query = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param queryText
     */
    function Query(queryText) {
        this.universeFilters = {};
        this.filters = {};
        this.itemsPromoted = [];
        this.sortByInstance = SortBy_1["default"].create();
        this.filters._query = Filter_1["default"].create("", [queryText], 0, Filter_3.FILTER_TYPE_QUERY);
    }
    /**
     * Created located
     *
     * @param coordinate
     * @param queryText
     * @param page
     * @param size
     *
     * @returns {Query}
     */
    Query.createLocated = function (coordinate, queryText, page, size) {
        if (page === void 0) { page = exports.QUERY_DEFAULT_PAGE; }
        if (size === void 0) { size = exports.QUERY_DEFAULT_SIZE; }
        var query = Query.create(queryText, page, size);
        query.coordinate = coordinate;
        return query;
    };
    /**
     * Create
     *
     * @param queryText
     * @param page
     * @param size
     *
     * @returns {Query}
     */
    Query.create = function (queryText, page, size) {
        if (page === void 0) { page = exports.QUERY_DEFAULT_PAGE; }
        if (size === void 0) { size = exports.QUERY_DEFAULT_SIZE; }
        page = Math.max(1, page);
        var query = new Query(queryText);
        query.from = (page - 1) * size;
        query.size = size;
        query.page = page;
        return query;
    };
    /**
     * Create match all
     *
     * @return {Query}
     */
    Query.createMatchAll = function () {
        return Query.create("", exports.QUERY_DEFAULT_PAGE, exports.QUERY_DEFAULT_SIZE);
    };
    /**
     * Create by UUID
     *
     * @param uuid
     *
     * @return {Query}
     */
    Query.createByUUID = function (uuid) {
        return Query.createByUUIDs(uuid);
    };
    /**
     * Create by UUIDs
     *
     * @param uuids
     *
     * @return {Query}
     */
    Query.createByUUIDs = function () {
        var uuids = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            uuids[_i] = arguments[_i];
        }
        var ids = [];
        for (var i in uuids) {
            ids.push(uuids[i].composedUUID());
        }
        var query = Query.create("", exports.QUERY_DEFAULT_PAGE, ids.length)
            .disableAggregations()
            .disableSuggestions();
        query.filters._id = Filter_1["default"].create("_id", ids, Filter_2.FILTER_AT_LEAST_ONE, Filter_2.FILTER_TYPE_FIELD);
        return query;
    };
    /**
     * Filter universe by types
     *
     * @param values
     *
     * @return {Query}
     */
    Query.prototype.filterUniverseByTypes = function (values) {
        var _a;
        var fieldPath = Filter_1["default"].getFilterPathByField("type");
        if (values.length > 0) {
            this.universeFilters = __assign({}, this.universeFilters, (_a = {}, _a["type"] = Filter_1["default"].create(fieldPath, values, Filter_2.FILTER_AT_LEAST_ONE, Filter_2.FILTER_TYPE_FIELD), _a));
        }
        else {
            delete this.universeFilters.type;
        }
        return this;
    };
    /**
     * Filter by types
     *
     * @param values
     * @param aggregate
     * @param aggregationSort
     *
     * @return {Query}
     */
    Query.prototype.filterByTypes = function (values, aggregate, aggregationSort) {
        if (aggregate === void 0) { aggregate = true; }
        if (aggregationSort === void 0) { aggregationSort = Aggregation_2.AGGREGATION_SORT_BY_COUNT_DESC; }
        var _a, _b;
        var fieldPath = Filter_1["default"].getFilterPathByField("type");
        if (values.length > 0) {
            this.filters = __assign({}, this.filters, (_a = {}, _a["type"] = Filter_1["default"].create(fieldPath, values, Filter_2.FILTER_AT_LEAST_ONE, Filter_2.FILTER_TYPE_FIELD), _a));
        }
        else {
            delete this.filters.type;
        }
        if (aggregate) {
            this.aggregations = __assign({}, this.aggregations, (_b = {}, _b["type"] = Aggregation_1["default"].create("type", fieldPath, Filter_2.FILTER_AT_LEAST_ONE, Filter_2.FILTER_TYPE_FIELD, [], aggregationSort), _b));
        }
        return this;
    };
    /**
     * Filter universe by ids
     *
     * @param values
     *
     * @return {Query}
     */
    Query.prototype.filterUniverseByIds = function (values) {
        var _a;
        var fieldPath = Filter_1["default"].getFilterPathByField("id");
        if (values.length > 0) {
            this.universeFilters = __assign({}, this.universeFilters, (_a = {}, _a["id"] = Filter_1["default"].create(fieldPath, values, Filter_2.FILTER_AT_LEAST_ONE, Filter_2.FILTER_TYPE_FIELD), _a));
        }
        else {
            delete this.universeFilters.id;
        }
        return this;
    };
    /**
     * Filter by ids
     *
     * @param values
     *
     * @return {Query}
     */
    Query.prototype.filterByIds = function (values) {
        var _a;
        var fieldPath = Filter_1["default"].getFilterPathByField("id");
        if (values.length > 0) {
            this.filters = __assign({}, this.filters, (_a = {}, _a["id"] = Filter_1["default"].create(fieldPath, values, Filter_2.FILTER_AT_LEAST_ONE, Filter_2.FILTER_TYPE_FIELD), _a));
        }
        else {
            delete this.filters.id;
        }
        return this;
    };
    /**
     * Filter universe by
     *
     * @param field
     * @param values
     * @param applicationType
     *
     * @return {Query}
     */
    Query.prototype.filterUniverseBy = function (field, values, applicationType) {
        if (applicationType === void 0) { applicationType = Filter_2.FILTER_AT_LEAST_ONE; }
        var _a;
        var fieldPath = Filter_1["default"].getFilterPathByField(field);
        if (values.length > 0) {
            this.universeFilters = __assign({}, this.universeFilters, (_a = {}, _a[field] = Filter_1["default"].create(fieldPath, values, applicationType, Filter_2.FILTER_TYPE_FIELD), _a));
        }
        else {
            delete this.universeFilters[field];
        }
        return this;
    };
    /**
     * Filter by
     *
     * @param filterName
     * @param field
     * @param values
     * @param applicationType
     * @param aggregate
     * @param aggregationSort
     *
     * @return {Query}
     */
    Query.prototype.filterBy = function (filterName, field, values, applicationType, aggregate, aggregationSort) {
        if (applicationType === void 0) { applicationType = Filter_2.FILTER_AT_LEAST_ONE; }
        if (aggregate === void 0) { aggregate = true; }
        if (aggregationSort === void 0) { aggregationSort = Aggregation_2.AGGREGATION_SORT_BY_COUNT_DESC; }
        var _a;
        var fieldPath = Filter_1["default"].getFilterPathByField(field);
        if (values.length > 0) {
            this.filters = __assign({}, this.filters, (_a = {}, _a[filterName] = Filter_1["default"].create(fieldPath, values, applicationType, Filter_2.FILTER_TYPE_FIELD), _a));
        }
        else {
            delete this.filters[filterName];
        }
        if (aggregate) {
            this.aggregateBy(filterName, field, applicationType, aggregationSort);
        }
        return this;
    };
    /**
     * Filter universe by range
     *
     * @param field
     * @param values
     * @param applicationType
     * @param rangeType
     *
     * @return {Query}
     */
    Query.prototype.filterUniverseByRange = function (field, values, applicationType, rangeType) {
        if (applicationType === void 0) { applicationType = Filter_2.FILTER_AT_LEAST_ONE; }
        if (rangeType === void 0) { rangeType = Filter_2.FILTER_TYPE_RANGE; }
        var _a;
        var fieldPath = Filter_1["default"].getFilterPathByField(field);
        if (values.length > 0) {
            this.universeFilters = __assign({}, this.universeFilters, (_a = {}, _a[field] = Filter_1["default"].create(fieldPath, values, applicationType, rangeType), _a));
        }
        else {
            delete this.universeFilters[field];
        }
        return this;
    };
    /**
     * Filter universe by date range
     *
     * @param field
     * @param values
     * @param applicationType
     *
     * @return {Query}
     */
    Query.prototype.filterUniverseByDateRange = function (field, values, applicationType) {
        if (applicationType === void 0) { applicationType = Filter_2.FILTER_AT_LEAST_ONE; }
        return this.filterUniverseByRange(field, values, applicationType, Filter_2.FILTER_TYPE_DATE_RANGE);
    };
    /**
     * Filter by range
     *
     * @param filterName
     * @param field
     * @param options
     * @param values
     * @param applicationType
     * @param rangeType
     * @param aggregate
     * @param aggregationSort
     *
     * @return {Query}
     */
    Query.prototype.filterByRange = function (filterName, field, options, values, applicationType, rangeType, aggregate, aggregationSort) {
        if (applicationType === void 0) { applicationType = Filter_2.FILTER_AT_LEAST_ONE; }
        if (rangeType === void 0) { rangeType = Filter_2.FILTER_TYPE_RANGE; }
        if (aggregate === void 0) { aggregate = true; }
        if (aggregationSort === void 0) { aggregationSort = Aggregation_2.AGGREGATION_SORT_BY_COUNT_DESC; }
        var _a;
        var fieldPath = Filter_1["default"].getFilterPathByField(field);
        if (values.length !== 0) {
            this.filters = __assign({}, this.filters, (_a = {}, _a[filterName] = Filter_1["default"].create(fieldPath, values, applicationType, rangeType), _a));
        }
        else {
            delete this.filters[filterName];
        }
        if (aggregate) {
            this.aggregateByRange(filterName, fieldPath, options, applicationType, rangeType, aggregationSort);
        }
        return this;
    };
    /**
     * Filter by date range
     *
     * @param filterName
     * @param field
     * @param options
     * @param values
     * @param applicationType
     * @param aggregate
     * @param aggregationSort
     *
     * @return {Query}
     */
    Query.prototype.filterByDateRange = function (filterName, field, options, values, applicationType, aggregate, aggregationSort) {
        if (applicationType === void 0) { applicationType = Filter_2.FILTER_AT_LEAST_ONE; }
        if (aggregate === void 0) { aggregate = true; }
        if (aggregationSort === void 0) { aggregationSort = Aggregation_2.AGGREGATION_SORT_BY_COUNT_DESC; }
        return this.filterByRange(filterName, field, options, values, applicationType, Filter_2.FILTER_TYPE_DATE_RANGE, aggregate, aggregationSort);
    };
    /**
     * Filter universe by location
     *
     * @param locationRange
     *
     * @return {Query}
     */
    Query.prototype.filterUniverseByLocation = function (locationRange) {
        var _a;
        this.universeFilters = __assign({}, this.universeFilters, (_a = {}, _a["coordinate"] = Filter_1["default"].create("coordinate", locationRange.toArray(), Filter_2.FILTER_AT_LEAST_ONE, Filter_2.FILTER_TYPE_GEO), _a));
        return this;
    };
    /**
     * Set filter fields
     *
     * @param filterFields
     *
     * @return {Query}
     */
    Query.prototype.setFilterFields = function (filterFields) {
        this.filterFields = filterFields;
        return this;
    };
    /**
     * Get filter fields
     *
     * @return {string[]}
     */
    Query.prototype.getFilterFields = function () {
        return this.filterFields;
    };
    /**
     * Sort by
     *
     * @param sortBy
     *
     * @return {Query}
     */
    Query.prototype.sortBy = function (sortBy) {
        if (sortBy.isSortedByGeoDistance()) {
            if (!(this.coordinate instanceof Coordinate_1["default"])) {
                throw InvalidFormatError_1["default"].querySortedByDistanceWithoutCoordinate();
            }
            sortBy.setCoordinate(this.coordinate);
        }
        this.sortByInstance = sortBy;
        return this;
    };
    /**
     * Aggregate by
     *
     * @param filterName
     * @param field
     * @param applicationType
     * @param aggregationSort
     * @param limit
     *
     * @return {Query}
     */
    Query.prototype.aggregateBy = function (filterName, field, applicationType, aggregationSort, limit) {
        if (aggregationSort === void 0) { aggregationSort = Aggregation_2.AGGREGATION_SORT_BY_COUNT_DESC; }
        if (limit === void 0) { limit = Aggregation_2.AGGREGATION_NO_LIMIT; }
        var _a;
        this.aggregations = __assign({}, this.aggregations, (_a = {}, _a[filterName] = Aggregation_1["default"].create(filterName, Filter_1["default"].getFilterPathByField(field), applicationType, Filter_2.FILTER_TYPE_FIELD, [], aggregationSort, limit), _a));
        return this;
    };
    /**
     * Aggregate by range
     *
     * @param filterName
     * @param field
     * @param options
     * @param applicationType
     * @param rangeType
     * @param aggregationSort
     * @param limit
     *
     * @return {Query}
     */
    Query.prototype.aggregateByRange = function (filterName, field, options, applicationType, rangeType, aggregationSort, limit) {
        if (rangeType === void 0) { rangeType = Filter_2.FILTER_TYPE_RANGE; }
        if (aggregationSort === void 0) { aggregationSort = Aggregation_2.AGGREGATION_SORT_BY_COUNT_DESC; }
        if (limit === void 0) { limit = Aggregation_2.AGGREGATION_NO_LIMIT; }
        var _a;
        if (options.length === 0) {
            return this;
        }
        this.aggregations = __assign({}, this.aggregations, (_a = {}, _a[filterName] = Aggregation_1["default"].create(filterName, Filter_1["default"].getFilterPathByField(field), applicationType, rangeType, options, aggregationSort, limit), _a));
        return this;
    };
    /**
     * Aggregate by date range
     *
     * @param filterName
     * @param field
     * @param options
     * @param applicationType
     * @param aggregationSort
     * @param limit
     *
     * @return {Query}
     */
    Query.prototype.aggregateByDateRange = function (filterName, field, options, applicationType, aggregationSort, limit) {
        if (aggregationSort === void 0) { aggregationSort = Aggregation_2.AGGREGATION_SORT_BY_COUNT_DESC; }
        if (limit === void 0) { limit = Aggregation_2.AGGREGATION_NO_LIMIT; }
        return this.aggregateByRange(filterName, field, options, applicationType, Filter_2.FILTER_TYPE_DATE_RANGE, aggregationSort, limit);
    };
    /**
     * Get aggregations
     *
     * @return {{}}
     */
    Query.prototype.getAggregations = function () {
        return this.aggregations;
    };
    /**
     * Get aggregation by name
     *
     * @param aggregationName
     *
     * @return {Aggregation|null}
     */
    Query.prototype.getAggregation = function (aggregationName) {
        return this.aggregations[aggregationName] instanceof Aggregation_1["default"]
            ? this.aggregations[aggregationName]
            : null;
    };
    /**
     * Get query text
     *
     * @return {string}
     */
    Query.prototype.getQueryText = function () {
        var filter = this.filters._query;
        return filter instanceof Filter_1["default"]
            ? filter.getValues()[0]
            : "";
    };
    /**
     * Get universe filters
     *
     * @return {{}}
     */
    Query.prototype.getUniverseFilters = function () {
        return this.universeFilters;
    };
    /**
     * Get universe filter by name
     *
     * @param filterName
     *
     * @return {Filter|null}
     */
    Query.prototype.getUniverseFilter = function (filterName) {
        return this.universeFilters[filterName] instanceof Filter_1["default"]
            ? this.universeFilters[filterName]
            : null;
    };
    /**
     * Get filters
     *
     * @return {{}}
     */
    Query.prototype.getFilters = function () {
        return this.filters;
    };
    /**
     * Get filter by name
     *
     * @param filterName
     *
     * @return {Filter|null}
     */
    Query.prototype.getFilter = function (filterName) {
        return this.filters[filterName] instanceof Filter_1["default"]
            ? this.filters[filterName]
            : null;
    };
    /**
     * Get filter by field
     *
     * @param fieldName
     *
     * @return {Filter|null}
     */
    Query.prototype.getFilterByField = function (fieldName) {
        var fieldPath = Filter_1["default"].getFilterPathByField(fieldName);
        for (var i in this.filters) {
            if (this.filters[i].getField() == fieldPath) {
                return this.filters[i];
            }
        }
        return null;
    };
    /**
     * Get sort by
     *
     * @return {SortBy}
     */
    Query.prototype.getSortBy = function () {
        return this.sortByInstance;
    };
    /**
     * Get from
     *
     * @return {number}
     */
    Query.prototype.getFrom = function () {
        return this.from;
    };
    /**
     * Get size
     *
     * @return {number}
     */
    Query.prototype.getSize = function () {
        return this.size;
    };
    /**
     * Get page
     *
     * @return {number}
     */
    Query.prototype.getPage = function () {
        return this.page;
    };
    /**
     * Enable results
     *
     * @return {Query}
     */
    Query.prototype.enableResults = function () {
        this.resultsEnabled = true;
        return this;
    };
    /**
     * Disable results
     *
     * @return {Query}
     */
    Query.prototype.disableResults = function () {
        this.resultsEnabled = false;
        return this;
    };
    /**
     * Are results enabled
     *
     * @return {boolean}
     */
    Query.prototype.areResultsEnabled = function () {
        return this.resultsEnabled;
    };
    /**
     * Enable aggregations
     *
     * @return {Query}
     */
    Query.prototype.enableAggregations = function () {
        this.aggregationsEnabled = true;
        return this;
    };
    /**
     * Disable aggregations
     *
     * @return {Query}
     */
    Query.prototype.disableAggregations = function () {
        this.aggregationsEnabled = false;
        return this;
    };
    /**
     * Are aggregations enabled
     *
     * @return {boolean}
     */
    Query.prototype.areAggregationsEnabled = function () {
        return this.aggregationsEnabled;
    };
    /**
     * Enable suggestions
     *
     * @return {Query}
     */
    Query.prototype.enableSuggestions = function () {
        this.suggestionsEnabled = true;
        return this;
    };
    /**
     * Disable suggestions
     *
     * @return {Query}
     */
    Query.prototype.disableSuggestions = function () {
        this.suggestionsEnabled = false;
        return this;
    };
    /**
     * Are suggestions enabled
     *
     * @return {boolean}
     */
    Query.prototype.areSuggestionsEnabled = function () {
        return this.suggestionsEnabled;
    };
    /**
     * Enable highlights
     *
     * @return {Query}
     */
    Query.prototype.enableHighlights = function () {
        this.highlightsEnabled = true;
        return this;
    };
    /**
     * Disable highlights
     *
     * @return {Query}
     */
    Query.prototype.disableHighlights = function () {
        this.highlightsEnabled = false;
        return this;
    };
    /**
     * Are highlights enabled
     *
     * @return {boolean}
     */
    Query.prototype.areHighlightsEnabled = function () {
        return this.highlightsEnabled;
    };
    /**
     * Promote uuid
     *
     * @param itemUUID
     *
     * @return {Query}
     */
    Query.prototype.promoteUUID = function (itemUUID) {
        this
            .itemsPromoted
            .push(itemUUID);
        return this;
    };
    /**
     * Promote UUIDs
     *
     * @param uuids
     *
     * @return {Query}
     */
    Query.prototype.promoteUUIDs = function () {
        var uuids = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            uuids[_i] = arguments[_i];
        }
        this.itemsPromoted = uuids;
        return this;
    };
    /**
     * Get promoted UUIDs
     *
     * @return {ItemUUID[]}
     */
    Query.prototype.getItemsPromoted = function () {
        return this.itemsPromoted;
    };
    /**
     * Exclude id
     *
     * @param itemUUID
     *
     * @return {Query}
     */
    Query.prototype.excludeUUID = function (itemUUID) {
        this.excludeUUIDs(itemUUID);
        return this;
    };
    /**
     * Exclude UUIDs
     *
     * @param uuids
     *
     * @return {Query}
     */
    Query.prototype.excludeUUIDs = function () {
        var uuids = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            uuids[_i] = arguments[_i];
        }
        var _a;
        this.filters = __assign({}, this.filters, (_a = {}, _a["excluded_ids"] = Filter_1["default"].create("_id", uuids.map(function (uuid) { return uuid.composedUUID(); }), Filter_2.FILTER_EXCLUDE, Filter_2.FILTER_TYPE_FIELD), _a));
        return this;
    };
    /**
     * Get score strategy
     *
     * @return {ScoreStrategy}
     */
    Query.prototype.getScoreStrategy = function () {
        return this.scoreStrategy;
    };
    /**
     * Set score strategy
     *
     * @param scoreStrategy
     */
    Query.prototype.setScoreStrategy = function (scoreStrategy) {
        this.scoreStrategy = scoreStrategy;
        return this;
    };
    /**
     * By user
     *
     * @param user
     *
     * @return {Query}
     */
    Query.prototype.byUser = function (user) {
        this.user = user;
        return this;
    };
    /**
     * By anyone
     *
     * @return {null}
     */
    Query.prototype.anonymously = function () {
        this.user = null;
        return null;
    };
    /**
     * Get user
     *
     * @return {User}
     */
    Query.prototype.getUser = function () {
        return this.user;
    };
    /**
     * To array
     *
     * @return {any}
     */
    Query.prototype.toArray = function () {
        var array = {};
        if (this.getQueryText() !== "") {
            array.q = this.getQueryText();
        }
        if (this.coordinate instanceof Coordinate_1["default"]) {
            array.coordinate = this.coordinate.toArray();
        }
        /**
         * Universe Filters
         */
        if (Object.keys(this.universeFilters).length) {
            array.universe_filters = {};
            for (var i in this.universeFilters) {
                var universeFilter = this.universeFilters[i];
                array.universe_filters[i] = universeFilter.toArray();
            }
        }
        /**
         * Filters
         */
        if (this.filters instanceof Object &&
            Object.keys(this.filters).length) {
            array.filters = {};
            for (var i in this.filters) {
                var filter = this.filters[i];
                if (filter.getFilterType() !== Filter_3.FILTER_TYPE_QUERY) {
                    array.filters[i] = filter.toArray();
                }
            }
        }
        /**
         * Aggregations
         */
        if (this.aggregations instanceof Object &&
            Object.keys(this.aggregations).length) {
            array.aggregations = {};
            for (var i in this.aggregations) {
                var aggregation = this.aggregations[i];
                array.aggregations[i] = aggregation.toArray();
            }
        }
        /**
         * Sort
         */
        var sort = this.sortByInstance.toArray();
        if (Object.keys(sort).length) {
            array.sort = sort;
        }
        /**
         * Page
         */
        var page = this.page;
        if (page !== exports.QUERY_DEFAULT_PAGE) {
            array.page = page;
        }
        /**
         * Size
         */
        var size = this.size;
        if (size !== exports.QUERY_DEFAULT_SIZE) {
            array.size = size;
        }
        /**
         * Booleans
         */
        if (this.resultsEnabled === false) {
            array.results_enabled = false;
        }
        if (this.suggestionsEnabled === true) {
            array.suggestions_enabled = true;
        }
        if (this.highlightsEnabled === true) {
            array.highlights_enabled = true;
        }
        if (this.aggregationsEnabled === false) {
            array.aggregations_enabled = false;
        }
        /**
         * Filter fields
         */
        if (this.filterFields instanceof Array &&
            this.filterFields.length > 0) {
            array.filter_fields = this.filterFields;
        }
        /**
         * Score strategy
         */
        if (this.scoreStrategy instanceof ScoreStrategy_1["default"]) {
            var scoreStrategyAsArray = this.scoreStrategy.toArray();
            if (Object.keys(scoreStrategyAsArray).length > 0) {
                array.score_strategy = scoreStrategyAsArray;
            }
        }
        /**
         * User
         */
        if (this.user instanceof User_1["default"]) {
            var userAsArray = this.user.toArray();
            if (Object.keys(userAsArray).length > 0) {
                array.user = userAsArray;
            }
        }
        /**
         * items promoted
         */
        if (this.itemsPromoted.length > 0) {
            array.items_promoted = [];
            for (var i in this.itemsPromoted) {
                array
                    .items_promoted
                    .push(this.itemsPromoted[i].toArray);
            }
        }
        return array;
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @returns {Query}
     */
    Query.createFromArray = function (array) {
        var query = array.coordinate instanceof Object
            ? Query.createLocated(Coordinate_1["default"].createFromArray(array.coordinate), array.q ? array.q : "", array.page ? array.page : exports.QUERY_DEFAULT_PAGE, array.size ? array.size : exports.QUERY_DEFAULT_SIZE)
            : Query.create(array.q ? array.q : "", array.page ? array.page : exports.QUERY_DEFAULT_PAGE, array.size ? array.size : exports.QUERY_DEFAULT_SIZE);
        /**
         * Aggregations
         */
        var aggregationsAsArray = typeof array.aggregations === typeof {}
            ? array.aggregations
            : {};
        for (var i in aggregationsAsArray) {
            query.aggregations[i] = Aggregation_1["default"].createFromArray(aggregationsAsArray[i]);
        }
        /**
         * Sort
         */
        var sortAsArray = typeof array.sort === typeof {}
            ? array.sort
            : {};
        if (Object.keys(sortAsArray).length > 0) {
            query.sortByInstance = SortBy_1["default"].createFromArray(sortAsArray);
        }
        /**
         * Filters
         */
        var filtersAsArray = typeof array.filters === typeof {}
            ? array.filters
            : {};
        for (var i in filtersAsArray) {
            query.filters[i] = Filter_1["default"].createFromArray(filtersAsArray[i]);
        }
        /**
         * Universe Filters
         */
        var universeFiltersAsArray = typeof array.universe_filters === typeof {}
            ? array.universe_filters
            : {};
        for (var i in universeFiltersAsArray) {
            query.universeFilters[i] = Filter_1["default"].createFromArray(universeFiltersAsArray[i]);
        }
        /**
         * Booleans
         */
        query.resultsEnabled = typeof array.results_enabled === "boolean"
            ? array.results_enabled
            : true;
        query.suggestionsEnabled = typeof array.suggestions_enabled === "boolean"
            ? array.suggestions_enabled
            : false;
        query.aggregationsEnabled = typeof array.aggregations_enabled === "boolean"
            ? array.aggregations_enabled
            : true;
        query.highlightsEnabled = typeof array.highlights_enabled === "boolean"
            ? array.highlights_enabled
            : false;
        /**
         * Items promoted
         */
        var itemsPromotedAsArray = typeof array.items_promoted === typeof {}
            ? array.items_promoted
            : {};
        for (var i in itemsPromotedAsArray) {
            query
                .itemsPromoted
                .push(ItemUUID_1["default"].createFromArray(itemsPromotedAsArray[i]));
        }
        /**
         * Filter fields
         */
        query.filterFields = array.filter_fields instanceof Array
            ? array.filter_fields
            : [];
        query.scoreStrategy = array.score_strategy instanceof Object
            ? ScoreStrategy_1["default"].createFromArray(array.score_stategy)
            : null;
        query.user = array.user instanceof Object
            ? User_1["default"].createFromArray(array.user)
            : null;
        return query;
    };
    return Query;
}());
exports["default"] = Query;


/***/ }),

/***/ "./src/Query/ScoreStrategy.ts":
/*!************************************!*\
  !*** ./src/Query/ScoreStrategy.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/**
 * Aggregation constants
 */
exports.SCORE_STRATEGY_DEFAULT = 0;
exports.SCORE_STRATEGY_BOOSTING_RELEVANCE_FIELD = 1;
exports.SCORE_STRATEGY_BOOSTING_CUSTOM_FUNCTION = 2;
/**
 * ScoreStrategy
 */
var ScoreStrategy = /** @class */ (function () {
    function ScoreStrategy() {
        this.type = exports.SCORE_STRATEGY_DEFAULT;
        this.innerFunction = null;
    }
    /**
     * Get type
     *
     * @returns {number}
     */
    ScoreStrategy.prototype.getType = function () {
        return this.type;
    };
    /**
     * Get function
     *
     * @returns {string}
     */
    ScoreStrategy.prototype.getFunction = function () {
        return this.innerFunction;
    };
    /**
     * Create default
     *
     * @return {ScoreStrategy}
     */
    ScoreStrategy.createDefault = function () {
        return new ScoreStrategy();
    };
    /**
     * Create relevance boosting
     *
     * @return {ScoreStrategy}
     */
    ScoreStrategy.createRelevanceBoosting = function () {
        var scoreStrategy = ScoreStrategy.createDefault();
        scoreStrategy.type = exports.SCORE_STRATEGY_BOOSTING_RELEVANCE_FIELD;
        return scoreStrategy;
    };
    /**
     * Create relevance boosting
     *
     * @param innerFunction
     *
     * @return {ScoreStrategy}
     */
    ScoreStrategy.createCustomFunction = function (innerFunction) {
        var scoreStrategy = ScoreStrategy.createDefault();
        scoreStrategy.type = exports.SCORE_STRATEGY_BOOSTING_CUSTOM_FUNCTION;
        scoreStrategy.innerFunction = innerFunction;
        return scoreStrategy;
    };
    /**
     *
     * @return {{type: number, function: string}}
     */
    ScoreStrategy.prototype.toArray = function () {
        return {
            type: this.type,
            "function": this.innerFunction
        };
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @return {ScoreStrategy}
     */
    ScoreStrategy.createFromArray = function (array) {
        array = JSON.parse(JSON.stringify(array));
        var scoreStrategy = ScoreStrategy.createDefault();
        if (typeof array.type == "undefined") {
            array.type = exports.SCORE_STRATEGY_DEFAULT;
        }
        if (typeof array["function"] == "undefined") {
            array.innerFunction = null;
        }
        scoreStrategy.type = array.type;
        scoreStrategy.innerFunction = array["function"];
        return scoreStrategy;
    };
    return ScoreStrategy;
}());
exports["default"] = ScoreStrategy;


/***/ }),

/***/ "./src/Query/SortBy.ts":
/*!*****************************!*\
  !*** ./src/Query/SortBy.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/**
 export * Sort by constants
 */
exports.SORT_BY_TYPE_FIELD = 1;
exports.SORT_BY_TYPE_NESTED = 2;
exports.SORT_BY_ASC = "asc";
exports.SORT_BY_DESC = "desc";
exports.SORT_BY_MODE_AVG = "avg";
exports.SORT_BY_MODE_SUM = "sum";
exports.SORT_BY_MODE_MIN = "min";
exports.SORT_BY_MODE_MAX = "max";
exports.SORT_BY_MODE_MEDIAN = "median";
exports.SORT_BY_SCORE = {
    _score: {
        order: exports.SORT_BY_ASC
    }
};
exports.SORT_BY_RANDOM = {
    random: {
        order: exports.SORT_BY_ASC
    }
};
exports.SORT_BY_AL_TUN_TUN = exports.SORT_BY_RANDOM;
exports.SORT_BY_ID_ASC = {
    "uuid.id": {
        order: exports.SORT_BY_ASC
    }
};
exports.SORT_BY_ID_DESC = {
    "uuid.id": {
        order: exports.SORT_BY_DESC
    }
};
exports.SORT_BY_TYPE_ASC = {
    "uuid.type": {
        order: exports.SORT_BY_ASC
    }
};
exports.SORT_BY_TYPE_DESC = {
    "uuid.type": {
        order: exports.SORT_BY_DESC
    }
};
exports.SORT_BY_LOCATION_KM_ASC = {
    _geo_distance: {
        order: exports.SORT_BY_ASC,
        unit: "km"
    }
};
exports.SORT_BY_LOCATION_MI_ASC = {
    _geo_distance: {
        order: exports.SORT_BY_DESC,
        unit: "mi"
    }
};
var Coordinate_1 = __webpack_require__(/*! ../../src/Model/Coordinate */ "./src/Model/Coordinate.ts");
var Filter_1 = __webpack_require__(/*! ../../src/Query/Filter */ "./src/Query/Filter.ts");
/**
 * ScoreStrategy
 */
var SortBy = /** @class */ (function () {
    function SortBy() {
        this.sortsBy = [];
    }
    /**
     * Create
     *
     * @return {SortBy}
     */
    SortBy.create = function () {
        return new SortBy;
    };
    /**
     * Sort By fields values
     *
     * @param shortSortByElements
     *
     * @return {SortBy}
     */
    SortBy.byFieldsValues = function (shortSortByElements) {
        var sortBy = SortBy.create();
        for (var key in shortSortByElements) {
            sortBy.byFieldValue(key, shortSortByElements[key]);
        }
        return sortBy;
    };
    /**
     * All
     *
     * @return {Array}
     */
    SortBy.prototype.all = function () {
        return this.sortsBy.length > 0
            ? this.sortsBy
            : [exports.SORT_BY_SCORE];
    };
    /**
     * Sort by value
     *
     * @param value
     *
     * @return {SortBy}
     */
    SortBy.prototype.byValue = function (value) {
        if (exports.SORT_BY_SCORE != value &&
            exports.SORT_BY_RANDOM != value) {
            if (typeof value.type == "undefined") {
                value.type = exports.SORT_BY_TYPE_FIELD;
            }
        }
        if (exports.SORT_BY_SCORE != value) {
            this.sortsBy.push(value);
        }
        return this;
    };
    /**
     * Sort by field value
     *
     * @param field
     * @param order
     *
     * @return {SortBy}
     */
    SortBy.prototype.byFieldValue = function (field, order) {
        var object = {
            type: exports.SORT_BY_TYPE_FIELD
        };
        object["indexed_metadata." + field] = {
            order: order
        };
        this.sortsBy.push(object);
        return this;
    };
    /**
     * Sort by nested field
     *
     * @param field
     * @param order
     * @param mode
     *
     * @return {SortBy}
     */
    SortBy.prototype.byNestedField = function (field, order, mode) {
        if (mode === void 0) { mode = exports.SORT_BY_MODE_AVG; }
        var object = {
            type: exports.SORT_BY_TYPE_NESTED,
            mode: mode
        };
        object["indexed_metadata." + field] = {
            order: order
        };
        this.sortsBy.push(object);
        return this;
    };
    /**
     * Sort by nested field and filter
     *
     * @param field
     * @param order
     * @param filter
     * @param mode
     *
     * @return {SortBy}
     */
    SortBy.prototype.byNestedFieldAndFilter = function (field, order, filter, mode) {
        if (mode === void 0) { mode = exports.SORT_BY_MODE_AVG; }
        var fieldPath = Filter_1["default"].getFilterPathByField(filter.getField());
        var filterAsArray = filter.toArray();
        filterAsArray.field = fieldPath;
        filter = Filter_1["default"].createFromArray(filterAsArray);
        var object = {
            type: exports.SORT_BY_TYPE_NESTED,
            mode: mode,
            filter: filter
        };
        object["indexed_metadata." + field] = {
            order: order
        };
        this.sortsBy.push(object);
        return this;
    };
    /**
     * Is sorted by geo distance
     *
     * @return {boolean}
     */
    SortBy.prototype.isSortedByGeoDistance = function () {
        for (var i in this.sortsBy) {
            if (typeof this.sortsBy[i]._geo_distance === typeof {}) {
                return true;
            }
        }
        return false;
    };
    /**
     * Set coordinate
     *
     * @param coordinate
     *
     * @return {SortBy}
     */
    SortBy.prototype.setCoordinate = function (coordinate) {
        for (var i in this.sortsBy) {
            if (typeof this.sortsBy[i]._geo_distance === typeof {}) {
                this.sortsBy[i]._geo_distance.coordinate = coordinate;
            }
        }
        return this;
    };
    /**
     * Has random sort
     *
     * @return {boolean}
     */
    SortBy.prototype.hasRandomSort = function () {
        for (var i in this.sortsBy) {
            if (JSON.stringify(this.sortsBy[i]) === JSON.stringify(exports.SORT_BY_RANDOM)) {
                return true;
            }
        }
        return false;
    };
    /**
     * To array
     *
     * @return {[]}
     */
    SortBy.prototype.toArray = function () {
        var copySortBy = this.copy();
        var sortsByAsArray = copySortBy.sortsBy;
        for (var i in sortsByAsArray) {
            if (sortsByAsArray[i].type == exports.SORT_BY_TYPE_FIELD) {
                delete sortsByAsArray[i].type;
            }
            if (typeof sortsByAsArray[i].filter === typeof {} &&
                sortsByAsArray[i].filter != null) {
                sortsByAsArray[i].filter = sortsByAsArray[i].filter.toArray();
            }
            if (typeof sortsByAsArray[i]._geo_distance === typeof {} &&
                sortsByAsArray[i]._geo_distance !== null &&
                sortsByAsArray[i]._geo_distance.coordinate instanceof Coordinate_1["default"]) {
                sortsByAsArray[i]._geo_distance.coordinate = sortsByAsArray[i]._geo_distance.coordinate.toArray();
            }
        }
        return sortsByAsArray;
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @returns {SortBy}
     */
    SortBy.createFromArray = function (array) {
        var innerArray = JSON.parse(JSON.stringify(array));
        var sortBy = SortBy.create();
        for (var i in innerArray) {
            var element = innerArray[i];
            if (JSON.stringify(element) !== JSON.stringify(exports.SORT_BY_RANDOM) &&
                JSON.stringify(element) !== JSON.stringify(exports.SORT_BY_SCORE)) {
                if (typeof element.type == "undefined") {
                    element.type = exports.SORT_BY_TYPE_FIELD;
                }
            }
            if (typeof element.filter === typeof {} &&
                element.filter != null) {
                element.filter = Filter_1["default"].createFromArray(element.filter);
            }
            if (typeof element._geo_distance === typeof {} &&
                element._geo_distance != null &&
                typeof element._geo_distance.coordinate === typeof {}) {
                element._geo_distance.coordinate = Coordinate_1["default"].createFromArray(element._geo_distance.coordinate);
            }
            sortBy.sortsBy.push(element);
        }
        return sortBy;
    };
    /**
     * Make a copy of this
     *
     * @returns {SortBy}
     */
    SortBy.prototype.copy = function () {
        var newSortBy = SortBy.create();
        for (var i in this.sortsBy) {
            var sortBy = this.sortsBy[i];
            var sortByAsArray = JSON.parse(JSON.stringify(sortBy));
            if (typeof sortBy.filter === typeof {} &&
                sortBy.filter != null) {
                sortByAsArray.filter = Filter_1["default"].createFromArray(sortBy.filter.toArray());
            }
            if (typeof sortBy._geo_distance === typeof {} &&
                sortBy._geo_distance != null &&
                typeof sortBy._geo_distance.coordinate == typeof {}) {
                sortByAsArray._geo_distance.coordinate = Coordinate_1["default"].createFromArray(sortBy._geo_distance.coordinate.toArray());
            }
            newSortBy.sortsBy.push(sortByAsArray);
        }
        return newSortBy;
    };
    return SortBy;
}());
exports["default"] = SortBy;


/***/ }),

/***/ "./src/Repository/HttpRepository.ts":
/*!******************************************!*\
  !*** ./src/Repository/HttpRepository.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var ConnectionError_1 = __webpack_require__(/*! ../Error/ConnectionError */ "./src/Error/ConnectionError.ts");
var InvalidFormatError_1 = __webpack_require__(/*! ../Error/InvalidFormatError */ "./src/Error/InvalidFormatError.ts");
var InvalidTokenError_1 = __webpack_require__(/*! ../Error/InvalidTokenError */ "./src/Error/InvalidTokenError.ts");
var ResourceExistsError_1 = __webpack_require__(/*! ../Error/ResourceExistsError */ "./src/Error/ResourceExistsError.ts");
var ResourceNotAvailableError_1 = __webpack_require__(/*! ../Error/ResourceNotAvailableError */ "./src/Error/ResourceNotAvailableError.ts");
var Result_1 = __webpack_require__(/*! ../Result/Result */ "./src/Result/Result.ts");
var Repository_1 = __webpack_require__(/*! ./Repository */ "./src/Repository/Repository.ts");
/**
 * Aggregation class
 */
var HttpRepository = /** @class */ (function (_super) {
    __extends(HttpRepository, _super);
    /**
     * Constructor
     *
     * @param httpClient
     * @param appId
     * @param indexId
     * @param token
     */
    function HttpRepository(httpClient, appId, indexId, token) {
        var _this = _super.call(this, appId, indexId, token) || this;
        _this.httpClient = httpClient;
        return _this;
    }
    /**
     * flush items
     *
     * @param itemsToUpdate
     * @param itemsToDelete
     *
     * @Returns {Promise<void>}
     */
    HttpRepository.prototype.flushItems = function (itemsToUpdate, itemsToDelete) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = Promise).all;
                        return [4 /*yield*/, this.flushUpdateItems(itemsToUpdate)];
                    case 1:
                        _c = [
                            _d.sent()
                        ];
                        return [4 /*yield*/, this.flushDeleteItems(itemsToDelete)];
                    case 2: return [4 /*yield*/, _b.apply(_a, [_c.concat([
                                _d.sent()
                            ])]).then(function (_) {
                            return;
                        })];
                    case 3:
                        _d.sent();
                        return [2 /*return*/, new Promise(function (resolve) { return resolve(); })];
                }
            });
        });
    };
    /**
     * Flush update items
     *
     * @param itemsToUpdate
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.flushUpdateItems = function (itemsToUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (itemsToUpdate.length > 0)];
                    case 1: return [2 /*return*/, (_a.sent())
                            ? this
                                .httpClient
                                .get("/items", "post", this.getCredentials(), {}, {
                                items: itemsToUpdate.map(function (item) {
                                    return item.toArray();
                                })
                            })
                                .then(function (response) {
                                HttpRepository.throwTransportableExceptionIfNeeded(response);
                            })
                            : new Promise(function (resolve) { return resolve(); })];
                }
            });
        });
    };
    /**
     * Flush delete items
     *
     * @param itemsToDelete
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.flushDeleteItems = function (itemsToDelete) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (itemsToDelete.length > 0)];
                    case 1: return [2 /*return*/, (_a.sent())
                            ? this
                                .httpClient
                                .get("/items", "delete", this.getCredentials(), {}, {
                                items: itemsToDelete.map(function (itemUUID) {
                                    return itemUUID.toArray();
                                })
                            })
                                .then(function (response) {
                                HttpRepository.throwTransportableExceptionIfNeeded(response);
                            })
                            : new Promise(function (resolve) { return resolve(); })];
                }
            });
        });
    };
    /**
     * Query
     *
     * @param query
     *
     * @return {Promise<Result>}
     */
    HttpRepository.prototype.query = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this
                            .httpClient
                            .get("/", "get", this.getCredentials(), {
                            query: JSON.stringify(query.toArray())
                        }, {})
                            .then(function (response) {
                            HttpRepository.throwTransportableExceptionIfNeeded(response);
                            return Result_1["default"].createFromArray(response.getBody());
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Update items
     *
     * @param query
     * @param changes
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.updateItems = function (query, changes) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this
                            .httpClient
                            .get("/items", "put", this.getCredentials(), {}, {
                            query: query.toArray(),
                            changes: changes.toArray()
                        })
                            .then(function (response) {
                            HttpRepository.throwTransportableExceptionIfNeeded(response);
                            return;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Create index
     *
     * @param immutableConfig
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.createIndex = function (immutableConfig) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this
                            .httpClient
                            .get("/index", "post", this.getCredentials(), {}, {
                            config: immutableConfig.toArray()
                        })
                            .then(function (response) {
                            HttpRepository.throwTransportableExceptionIfNeeded(response);
                            return;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Delete index
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.deleteIndex = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this
                            .httpClient
                            .get("/index", "delete", this.getCredentials(), {}, {})
                            .then(function (response) {
                            HttpRepository.throwTransportableExceptionIfNeeded(response);
                            return;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Reset index
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.resetIndex = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this
                            .httpClient
                            .get("/index/reset", "post", this.getCredentials(), {}, {})
                            .then(function (response) {
                            HttpRepository.throwTransportableExceptionIfNeeded(response);
                            return;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Check index
     *
     * @return {Promise<boolean>}
     */
    HttpRepository.prototype.checkIndex = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this
                            .httpClient
                            .get("/index", "head", this.getCredentials(), {}, {})
                            .then(function (response) {
                            HttpRepository.throwTransportableExceptionIfNeeded(response);
                            return response.getCode() === 200;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Configure index
     *
     * @param config
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.configureIndex = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this
                            .httpClient
                            .get("/index/config", "post", this.getCredentials(), {}, {
                            config: config.toArray()
                        })
                            .then(function (response) {
                            HttpRepository.throwTransportableExceptionIfNeeded(response);
                            return;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get query values
     *
     * @returns any
     */
    HttpRepository.prototype.getCredentials = function () {
        return {
            app_id: this.appId,
            index: this.indexId,
            token: this.token
        };
    };
    /**
     * throw error if needed
     *
     * @param response
     */
    HttpRepository.throwTransportableExceptionIfNeeded = function (response) {
        if (typeof response.getCode() == "undefined") {
            return;
        }
        switch (response.getCode()) {
            case ResourceNotAvailableError_1["default"].getTransportableHTTPError():
                throw new ResourceNotAvailableError_1["default"](response.getBody().message);
            case InvalidTokenError_1["default"].getTransportableHTTPError():
                throw new InvalidTokenError_1["default"](response.getBody().message);
            case InvalidFormatError_1["default"].getTransportableHTTPError():
                throw new InvalidFormatError_1["default"](response.getBody().message);
            case ResourceExistsError_1["default"].getTransportableHTTPError():
                throw new ResourceExistsError_1["default"](response.getBody().message);
            case ConnectionError_1["default"].getTransportableHTTPError():
                throw new ConnectionError_1["default"](response.getBody().message);
        }
    };
    return HttpRepository;
}(Repository_1["default"]));
exports["default"] = HttpRepository;


/***/ }),

/***/ "./src/Repository/Repository.ts":
/*!**************************************!*\
  !*** ./src/Repository/Repository.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
/**
 * Aggregation class
 */
var Repository = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param appId
     * @param indexId
     * @param token
     */
    function Repository(appId, indexId, token) {
        this.itemsToUpdate = [];
        this.itemsToDelete = [];
        this.appId = appId;
        this.indexId = indexId;
        this.token = token;
    }
    /**
     * Reset cached elements
     */
    Repository.prototype.resetCachedElements = function () {
        this.itemsToUpdate = [];
        this.itemsToDelete = [];
    };
    /**
     * Add element
     *
     * @param item
     */
    Repository.prototype.addItem = function (item) {
        this.itemsToUpdate.push(item);
    };
    /**
     * Add elements
     *
     * @param items
     */
    Repository.prototype.addItems = function (items) {
        for (var i in items) {
            this.addItem(items[i]);
        }
    };
    /**
     * Delete item
     *
     * @param itemUUID
     */
    Repository.prototype.deleteItem = function (itemUUID) {
        this.itemsToDelete.push(itemUUID);
    };
    /**
     * Delete items
     *
     * @param itemsUUID
     */
    Repository.prototype.deleteItems = function (itemsUUID) {
        for (var i in itemsUUID) {
            this.deleteItem(itemsUUID[i]);
        }
    };
    /**
     * flush
     *
     * @param bulkNumber
     * @param skipIfLess
     *
     * @return {Promise<void>}
     */
    Repository.prototype.flush = function (bulkNumber, skipIfLess) {
        if (bulkNumber === void 0) { bulkNumber = 500; }
        if (skipIfLess === void 0) { skipIfLess = false; }
        return __awaiter(this, void 0, void 0, function () {
            var offset, items, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (skipIfLess &&
                            this.itemsToUpdate.length < bulkNumber) {
                            return [2 /*return*/, new Promise(function (resolve) { return resolve(); })];
                        }
                        offset = 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        _a.label = 2;
                    case 2:
                        if (false) {}
                        items = this
                            .itemsToUpdate
                            .slice(offset, offset + bulkNumber);
                        if (items.length === 0) {
                            return [3 /*break*/, 4];
                        }
                        return [4 /*yield*/, this.flushItems(items, [])];
                    case 3:
                        _a.sent();
                        offset += bulkNumber;
                        return [3 /*break*/, 2];
                    case 4: return [4 /*yield*/, this.flushItems([], this.itemsToDelete)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        this.resetCachedElements();
                        throw error_1;
                    case 7:
                        this.resetCachedElements();
                        return [2 /*return*/, new Promise(function (resolve) { return resolve(); })];
                }
            });
        });
    };
    return Repository;
}());
exports["default"] = Repository;


/***/ }),

/***/ "./src/Result/Aggregation.ts":
/*!***********************************!*\
  !*** ./src/Result/Aggregation.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var Filter_1 = __webpack_require__(/*! ./../Query/Filter */ "./src/Query/Filter.ts");
var Counter_1 = __webpack_require__(/*! ./Counter */ "./src/Result/Counter.ts");
/**
 * Aggregation class
 */
var Aggregation = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param name
     * @param applicationType
     * @param totalElements
     * @param activeElements
     */
    function Aggregation(name, applicationType, totalElements, activeElements) {
        this.counters = {};
        this.highestActiveElement = 0;
        this.name = name;
        this.applicationType = applicationType;
        this.totalElements = totalElements;
        this.activeElements = {};
        for (var i in activeElements) {
            var activeElement = activeElements[i];
            this.activeElements[activeElement] = activeElement;
        }
    }
    /**
     * Add counter
     *
     * @param name
     * @param counter
     */
    Aggregation.prototype.addCounter = function (name, counter) {
        if (counter == 0) {
            return;
        }
        var counterInstance = Counter_1["default"].createByActiveElements(name, counter, Object.keys(this.activeElements));
        if (!(counterInstance instanceof Counter_1["default"])) {
            return;
        }
        if ((this.applicationType & Filter_1.FILTER_MUST_ALL_WITH_LEVELS) &&
            (this.applicationType & ~Filter_1.FILTER_MUST_ALL) &&
            counterInstance.isUsed()) {
            this.activeElements[counterInstance.getId()] = counterInstance;
            this.highestActiveElement = Math.max(counterInstance.getLevel(), this.highestActiveElement);
            return;
        }
        this.counters[counterInstance.getId()] = counterInstance;
    };
    /**
     * Get name
     *
     * @return {string}
     */
    Aggregation.prototype.getName = function () {
        return this.name;
    };
    /**
     * Get counter
     *
     * @return {any}
     */
    Aggregation.prototype.getCounters = function () {
        return this.counters;
    };
    /**
     * Return if the aggregation belongs to a filter.
     *
     * @return {boolean}
     */
    Aggregation.prototype.isFilter = function () {
        return (this.applicationType & Filter_1.FILTER_MUST_ALL) > 0;
    };
    /**
     * Aggregation has levels.
     *
     * @return {boolean}
     */
    Aggregation.prototype.hasLevels = function () {
        return (this.applicationType & Filter_1.FILTER_MUST_ALL_WITH_LEVELS) > 0;
    };
    /**
     * Get counter by name
     *
     * @param name
     *
     * @return {null}
     */
    Aggregation.prototype.getCounter = function (name) {
        return this.counters[name] instanceof Counter_1["default"]
            ? this.counters[name]
            : null;
    };
    /**
     * Get all elements
     *
     * @return {{}}
     */
    Aggregation.prototype.getAllElements = function () {
        return __assign({}, this.activeElements, this.counters);
    };
    /**
     * Get total elements
     *
     * @return {number}
     */
    Aggregation.prototype.getTotalElements = function () {
        return this.totalElements;
    };
    /**
     * Get active elements
     *
     * @return {any}
     */
    Aggregation.prototype.getActiveElements = function () {
        if (Object.keys(this.activeElements).length === 0) {
            return {};
        }
        if (this.applicationType === Filter_1.FILTER_MUST_ALL_WITH_LEVELS) {
            var value = null;
            for (var i in this.activeElements) {
                var activeElement = this.activeElements[i];
                if (!(activeElement instanceof Counter_1["default"])) {
                    continue;
                }
                if (value == null) {
                    value = activeElement;
                }
                value = value.getLevel() > activeElement.getLevel()
                    ? value
                    : activeElement;
            }
            return value instanceof Counter_1["default"]
                ? { 0: value }
                : null;
        }
        return this.activeElements;
    };
    /**
     * Clean results by level and remove all levels higher than the lowest.
     */
    Aggregation.prototype.cleanCountersByLevel = function () {
        for (var i in this.counters) {
            var counter = this.counters[i];
            if (counter.getLevel() !== this.highestActiveElement + 1) {
                delete this.counters[i];
            }
        }
    };
    /**
     * Is empty
     *
     * @returns {boolean}
     */
    Aggregation.prototype.isEmpty = function () {
        return Object.keys(this.activeElements).length == 0 &&
            Object.keys(this.counters).length == 0;
    };
    Aggregation.prototype.toArray = function () {
        var array = {
            name: this.name,
            counters: [],
            active_elements: []
        };
        for (var i in this.counters) {
            array.counters.push(this.counters[i].toArray());
        }
        if (this.applicationType !== Filter_1.FILTER_AT_LEAST_ONE) {
            array.application_type = this.applicationType;
        }
        if (this.totalElements > 0) {
            array.total_elements = this.totalElements;
        }
        for (var i in this.activeElements) {
            var activeElement = this.activeElements[i];
            array.active_elements.push(activeElement instanceof Counter_1["default"]
                ? activeElement.toArray()
                : activeElement);
        }
        if (this.highestActiveElement > 0) {
            array.highest_active_level = this.highestActiveElement;
        }
        if (array.counters.length === 0) {
            delete array.counters;
        }
        if (array.active_elements.length === 0) {
            delete array.active_elements;
        }
        return array;
    };
    /**
     * Create from array
     *
     * @param array
     */
    Aggregation.createFromArray = function (array) {
        var activeElements = [];
        var activeElementsAsArray = array.active_elements;
        activeElementsAsArray = typeof activeElementsAsArray === typeof []
            ? activeElementsAsArray
            : [];
        for (var i in activeElementsAsArray) {
            var activeElementAsArray = activeElementsAsArray[i];
            activeElements.push(typeof activeElementAsArray === typeof {}
                ? Counter_1["default"].createFromArray(activeElementAsArray)
                : activeElementAsArray);
        }
        var aggregation = new Aggregation(array.name, parseInt(array.application_type ? array.application_type : Filter_1.FILTER_AT_LEAST_ONE), parseInt(array.total_elements ? array.total_elements : 0), []);
        aggregation.activeElements = activeElements;
        var countersAsArray = typeof array.counters === typeof []
            ? array.counters
            : [];
        for (var i in countersAsArray) {
            var counterAsArray = countersAsArray[i];
            var counter = Counter_1["default"].createFromArray(counterAsArray);
            aggregation.counters[counter.getId()] = counter;
        }
        aggregation.highestActiveElement = typeof array.highest_active_level === "number"
            ? array.highest_active_level
            : 0;
        return aggregation;
    };
    return Aggregation;
}());
exports["default"] = Aggregation;


/***/ }),

/***/ "./src/Result/Aggregations.ts":
/*!************************************!*\
  !*** ./src/Result/Aggregations.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Aggregation_1 = __webpack_require__(/*! ./Aggregation */ "./src/Result/Aggregation.ts");
/**
 * Aggregation class
 */
var Aggregations = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param totalElements
     */
    function Aggregations(totalElements) {
        this.aggregations = {};
        this.totalElements = totalElements;
    }
    /**
     * Add aggregation
     *
     * @param name
     * @param aggregation
     */
    Aggregations.prototype.addAggregation = function (name, aggregation) {
        this.aggregations[name] = aggregation;
    };
    /**
     * Get aggregations
     *
     * @returns {{}}
     */
    Aggregations.prototype.getAggregations = function () {
        return this.aggregations;
    };
    /**
     * Get aggregation
     *
     * @param name
     *
     * @returns {Aggregation|null}
     */
    Aggregations.prototype.getAggregation = function (name) {
        return this.aggregations[name] instanceof Aggregation_1["default"]
            ? this.aggregations[name]
            : null;
    };
    /**
     * Has not empty aggregation
     *
     * @param name
     *
     * @returns {boolean}
     */
    Aggregations.prototype.hasNotEmptyAggregation = function (name) {
        var aggregation = this.getAggregation(name);
        return (aggregation instanceof Aggregation_1["default"]) &&
            (!aggregation.isEmpty());
    };
    /**
     * Get total elements
     *
     * @return {number}
     */
    Aggregations.prototype.getTotalElements = function () {
        return this.totalElements;
    };
    /**
     * To array
     *
     * @return {{total_elements?: number, aggregations?: {}}}
     */
    Aggregations.prototype.toArray = function () {
        var aggregationCollection = {};
        for (var i in this.aggregations) {
            aggregationCollection[i] = this.aggregations[i].toArray();
        }
        var array = {};
        if (this.totalElements > 0) {
            array.total_elements = this.totalElements;
        }
        if (Object.keys(aggregationCollection).length > 0) {
            array.aggregations = aggregationCollection;
        }
        return array;
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @return {Aggregations}
     */
    Aggregations.createFromArray = function (array) {
        var aggregations = new Aggregations(typeof array.total_elements === "number"
            ? array.total_elements
            : 0);
        if (typeof array.aggregations === typeof {}) {
            for (var i in array.aggregations) {
                aggregations.addAggregation(i, Aggregation_1["default"].createFromArray(array.aggregations[i]));
            }
        }
        return aggregations;
    };
    return Aggregations;
}());
exports["default"] = Aggregations;


/***/ }),

/***/ "./src/Result/Counter.ts":
/*!*******************************!*\
  !*** ./src/Result/Counter.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Metadata_1 = __webpack_require__(/*! ../../src/Model/Metadata */ "./src/Model/Metadata.ts");
/**
 * Aggregation class
 */
var Counter = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param values
     * @param used
     * @param n
     */
    function Counter(values, used, n) {
        this.values = values;
        this.used = used;
        this.n = n;
    }
    /**
     * Get id
     *
     * @return {string|null}
     */
    Counter.prototype.getId = function () {
        return typeof this.values.id == "string"
            ? this.values.id
            : null;
    };
    /**
     * Get name
     *
     * @return {string|null}
     */
    Counter.prototype.getName = function () {
        return typeof this.values.name == "string"
            ? this.values.name
            : null;
    };
    /**
     * Get slug
     *
     * @return {string|null}
     */
    Counter.prototype.getSlug = function () {
        return typeof this.values.slug == "string"
            ? this.values.slug
            : null;
    };
    /**
     * Get level
     *
     * @return {number}
     */
    Counter.prototype.getLevel = function () {
        return typeof this.values.level == "number"
            ? this.values.level
            : 0;
    };
    /**
     * Get values
     *
     * @returns {{}}
     */
    Counter.prototype.getValues = function () {
        return this.values;
    };
    /**
     * Is used
     *
     * @returns {boolean}
     */
    Counter.prototype.isUsed = function () {
        return this.used;
    };
    /**
     * Get N
     *
     * @returns {number}
     */
    Counter.prototype.getN = function () {
        return this.n;
    };
    /**
     * Create by active elements
     *
     * @param name
     * @param n
     * @param activeElements
     */
    Counter.createByActiveElements = function (name, n, activeElements) {
        var values = Metadata_1["default"].fromMetadata(name);
        if (values == null) {
            return null;
        }
        var i = activeElements.length;
        var inActiveElements = false;
        while (i--) {
            if (activeElements[i] == values.id) {
                inActiveElements = true;
            }
        }
        return new Counter(values, inActiveElements, n);
    };
    /**
     * To array
     *
     * @return {{}}
     */
    Counter.prototype.toArray = function () {
        var values = {
            values: this.values,
            n: this.n
        };
        if (this.used === true) {
            values.used = true;
        }
        return values;
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @return {Counter}
     */
    Counter.createFromArray = function (array) {
        array = JSON.parse(JSON.stringify(array));
        return new Counter(array.values, (typeof array.used == "boolean")
            ? array.used
            : false, array.n);
    };
    return Counter;
}());
exports["default"] = Counter;


/***/ }),

/***/ "./src/Result/Result.ts":
/*!******************************!*\
  !*** ./src/Result/Result.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Item_1 = __webpack_require__(/*! ../Model/Item */ "./src/Model/Item.ts");
var Query_1 = __webpack_require__(/*! ../Query/Query */ "./src/Query/Query.ts");
var Aggregations_1 = __webpack_require__(/*! ./Aggregations */ "./src/Result/Aggregations.ts");
/**
 * Result class
 */
var Result = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param query
     * @param totalItems
     * @param totalHits
     */
    function Result(query, totalItems, totalHits) {
        this.items = [];
        this.suggests = [];
        this.query = query;
        this.totalItems = totalItems;
        this.totalHits = totalHits;
    }
    /**
     * Create
     *
     * @param query
     * @param totalItems
     * @param totalHits
     * @param aggregations
     * @param suggests
     * @param items
     *
     * @returns {Result}
     */
    Result.create = function (query, totalItems, totalHits, aggregations, suggests, items) {
        var result = new Result(query, totalItems, totalHits);
        result.aggregations = aggregations;
        result.suggests = suggests;
        result.items = items;
        return result;
    };
    /**
     * Add item
     *
     * @param item
     */
    Result.prototype.addItem = function (item) {
        this.items.push(item);
    };
    /**
     * Get items
     *
     * @return {Item[]}
     */
    Result.prototype.getItems = function () {
        return this.items;
    };
    /**
     * Get items grouped by types
     *
     * @return {any[]}
     */
    Result.prototype.getItemsGroupedByTypes = function () {
        if (this.itemsGroupedByTypeCache instanceof Object &&
            Object.keys(this.itemsGroupedByTypeCache).length > 0) {
            return this.itemsGroupedByTypeCache;
        }
        var itemsGroupedByTypes = {};
        for (var i in this.items) {
            var item = this.items[i];
            if (!(itemsGroupedByTypes[item.getType()] instanceof Array)) {
                itemsGroupedByTypes[item.getType()] = [];
            }
            itemsGroupedByTypes[item.getType()].push(item);
        }
        this.itemsGroupedByTypeCache = itemsGroupedByTypes;
        return itemsGroupedByTypes;
    };
    /**
     * Get items by type
     *
     * @param type
     *
     * @return {Array}
     */
    Result.prototype.getItemsByType = function (type) {
        var itemsGroupedByTypes = this.getItemsGroupedByTypes();
        return itemsGroupedByTypes[type] == null
            ? []
            : itemsGroupedByTypes[type];
    };
    /**
     * Get items by types
     *
     * @param types
     */
    Result.prototype.getItemsByTypes = function (types) {
        return this.items.filter(function (item) { return types.indexOf(item.getType()) >= 0; });
    };
    /**
     * Get first item
     *
     * @return {Item}
     */
    Result.prototype.getFirstItem = function () {
        return this.items.length > 0
            ? this.items[0]
            : null;
    };
    /**
     * Set aggregations
     *
     * @param aggregations
     */
    Result.prototype.setAggregations = function (aggregations) {
        this.aggregations = aggregations;
    };
    /**
     * Get aggregations
     *
     * @return {Aggregations}
     */
    Result.prototype.getAggregations = function () {
        return this.aggregations instanceof Aggregations_1["default"]
            ? this.aggregations
            : null;
    };
    /**
     * Get aggregation
     *
     * @param name
     *
     * @return {null}
     */
    Result.prototype.getAggregation = function (name) {
        return this.aggregations == null
            ? null
            : this.aggregations.getAggregation(name);
    };
    /**
     * Has no empty aggregation
     *
     * @param name
     *
     * @return {boolean}
     */
    Result.prototype.hasNotEmptyAggregation = function (name) {
        return this.aggregations == null
            ? false
            : this.aggregations.hasNotEmptyAggregation(name);
    };
    /**
     * Add suggest
     *
     * @param suggest
     */
    Result.prototype.addSuggest = function (suggest) {
        this.suggests.push(suggest);
    };
    /**
     * Get suggests
     *
     * @return {string[]}
     */
    Result.prototype.getSuggests = function () {
        return this.suggests;
    };
    /**
     * Get query
     *
     * @return {Query}
     */
    Result.prototype.getQuery = function () {
        return this.query;
    };
    /**
     * Get total elements
     *
     * @return {number}
     */
    Result.prototype.getTotalItems = function () {
        return this.totalItems;
    };
    /**
     * Get total hits
     *
     * @return {number}
     */
    Result.prototype.getTotalHits = function () {
        return this.totalHits;
    };
    /**
     * to array
     *
     * @return {{query: any, total_items: number, total_hits: number, items:any[], aggregations: any, suggests: string[]}}
     */
    Result.prototype.toArray = function () {
        return {
            query: this.query.toArray(),
            total_items: this.totalItems,
            total_hits: this.totalHits,
            items: this.items.map(function (item) { return item.toArray(); }),
            aggregations: this.aggregations == null
                ? null
                : this.aggregations.toArray(),
            suggests: this.suggests
        };
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @return {Result}
     */
    Result.createFromArray = function (array) {
        return Result.create(Query_1["default"].createFromArray(array.query), array.total_items
            ? array.total_items
            : 0, array.total_hits
            ? array.total_hits
            : 0, array.aggregations instanceof Object
            ? Aggregations_1["default"].createFromArray(array.aggregations)
            : null, array.suggests
            ? array.suggests
            : null, array.items instanceof Array
            ? array.items.map(function (itemAsArray) { return Item_1["default"].createFromArray(itemAsArray); })
            : []);
    };
    return Result;
}());
exports["default"] = Result;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Apisearch_1 = __webpack_require__(/*! ./Apisearch */ "./src/Apisearch.ts");
exports["default"] = Apisearch_1["default"];


/***/ })

/******/ })["default"];
//# sourceMappingURL=apisearch.node.js.map
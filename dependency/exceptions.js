/* jslint browser: true, jquery: true, devel: true*/

/*
  Dependencies: Tumblr.Flags

  Tumblr.Utils.exceptions will automatically log window.onerror.

  DO NOT write code like this. This is written to handle weird cases
  where normal code should probably just fail.
*/

;(function(root, exports) {
  'use strict';

  // Keep local copies of globals in case they change.
  // We should also protect against prototype hijacking, but not today.
  var document = root.document;
  var encodeURIComponent = root.encodeURIComponent;
  var navigator = root.navigator;
  var parseInt = root.parseInt;
  var performance = root.performance;
  var window = root.window;
  var Date = root.Date;
  var Error = root.Error;
  var Math = root.Math;
  var XMLHttpRequest = root.XMLHttpRequest;


  // Stores
  var ephemeral = [];
  var errors = [];
  var perf = {};
  var windowDidLoad = false;

  // oldIE addEventListener shim
  function addEventListener(el, type, listener, useCapture) {
    el.addEventListener ?
      el.addEventListener(type, listener, !!useCapture) :
      el.attachEvent && el.attachEvent('on' + type, listener, !!useCapture);
  }

  // Truncate strings in the middle.
  // If an extension or a bookmarklet throws an error, the message returned is the entire file.
  // This protects against that
  function truncate(str, max) {
    return (typeof str === 'string') && (str.length > max) ?
      [str.slice(0, max/2), '...', str.length-max, '...', str.slice(-max/2)].join('') : str;
  }

  // http://stackoverflow.com/questions/1714786/querystring-encoding-of-a-javascript-object
  function toQueryString(obj, prefix) {
    var str = [];
    for(var p in obj) {
      /*jshint -W089 */
      if (!obj.hasOwnProperty(p)) continue;
      var k = prefix ? (prefix + '[' + p + ']') : p, v = obj[p];
      str.push(typeof v === 'object' ?
        toQueryString(v, k) :
        encodeURIComponent(k) + '=' + encodeURIComponent(v));
    }
    return str.join('&');
  }

  var keys = (function(Object) {
    return (Object && Object.keys) || function(obj) {
      var result = [];
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      for(var k in obj) {
        /*jshint -W089 */
        hasOwnProperty.call(obj, k) && result.push(k);
      }
      return result;
    };
  })(root.Object);

  var forEach = function(arr, fn, ctx) {
    if (typeof fn !== 'function') return;
    var len = (arr && arr.length) >>> 0;
    for (var i = 0; i < len; i++) {
      fn.call(ctx, arr[i], i, arr);
    }
  };

  // var some = function(arr, fn, ctx) {
  //     if (typeof fn !== 'function') return false;
  //     var len = (arr && arr.length) >>> 0;
  //     for (var i = 0; i < len; i++) {
  //       if (i in arr && fn.call(ctx, arr[i], i, arr)) {
  //         return true;
  //       }
  //     }
  //     return false;
  // };

  // Even if JSON.stringify exists, it can still throw a RangeError
  // if you pass in a very large object or one with recursive refs.
  // Ex: JSON.stringify(window.navigator) // Range Error
  var stringify = (function(JSON) {
    return (JSON && JSON.stringify && function(obj) {
        try {
          return JSON.stringify(obj);
        } catch (err) {
          exceptions(err);
          return '"FAILED_JSON_STRINGIFY"';
        }
      }) || function() {
        return '"NO_JSON_STRINGIFY"';
      };
  })(root.JSON);

  // Emulate Tumblr.Flags if it's not present (DON'T EVER DO THIS!)
  var doods = (function(Tumblr) {
    return (Tumblr && Tumblr.Flags) || (function() {
      // Log missing Tumblr.Flags (only once)
      exceptions(new Error('Missing Tumblr.Flags in exceptions.js'));
      // Emulate Tumblr.Flags
      var store = {
        // Always log if Tumblr.Flags is missing
        'enable_js_errors_log': true,
        'enable_js_ephemeral_log': true
      };
      function maybecall(fn, val) {
        // jshint validthis:true
        return (typeof fn === 'function') ? fn.call(this, val) : fn;
      }
      return function(name) {
        var has = !!(store[name]);
        return function feature(accept, reject) {
          var result = maybecall.call(this, (has ? accept : reject), has);
          return (result !== void 0) ? result : feature;
        };
      };
    })();
  })(root.Tumblr);

  // Passing an Error object (like from a try/catch) will log the error as if
  // it were intercepted by "onerror". Otherwise, it'll go the special ephemeral log.
  // "doSometimes" takes a decimal proportion of time. So:
  // 0.10 means 10% of the time actually record this error.
  // 1 means always record (or if ommited also always record).
  function exceptions(data, doSometimes) {
    // (0 <= Math.random() < 1 )
    if (typeof doSometimes === 'number' && Math.random() > doSometimes) return;
    if (data instanceof Error) {
      // Error instances don't really have a 'url', 'ln', or 'col' properties, but
      // pass them anyway just in case they were manually added.
      // Set 'url' for proper Indef tagging
      data.url || (data.url = '//www.tumblr.com/');
      onError(data.message, data.url, data.ln, data.col, data);
    } else {
      // Please see Andres before you use the ephemeral log :)
      ephemeral.push(stringify(data));
    }
  }

  var reHasUrl = /https?:\/\//;
  var reHasTumblrUrl = /https?:\/\/[^/]*tumblr[^/]*/;

  // This gets called by the browser
  // It helps us filter out errors that might not be ours
  function onError(msg, url, ln, col, err) {
    try {
      // We only care about things that (1) Don't have a url, or (2) if
      // they have url, then that at least one must have "tumblr" in the host.
      url = truncate(url, 300) || '';
      if (reHasUrl.test(url) && !reHasTumblrUrl.test(url)) return;
      err = stringify(truncate(err && err.stack, 1000) || '');
      if (reHasUrl.test(err) && !reHasTumblrUrl.test(err)) return;
      errors.push({
        path: (document.location || {}).pathname || 'NO_LOCATION_OR_PATHNAME',
        // not sending lang for now
        // lang: (navigator.language || navigator.userLanguage || '').toLowerCase()
        msg: truncate(msg, 200) || '',
        // url's for errors from bookmarklets are the entire source of the bookmarklet.
        url: url,
        ln: parseInt(ln, 10) || -1,
        // Only Chrome 31+ report col and err
        col: parseInt(col, 10) || -1,
        err: err,
        group: doods('js_errors_a')('A', doods('js_errors_b')('B', '*'))
      });


    } catch (err) {
      // Do nothing. If something fails while recording an error,
      // then we're probably fucked - but lets not get stuck in a 
      // error logging loop.
    }
  }

  // If you have MissingE, we don't trust any errors coming from your browser
  function isMissingE() {
    return ((document.head||{}).innerHTML||'').indexOf('#missinge_button') !== -1;
  }

  // Build more information around an error
  var debugDump = exceptions.debugDump = function() {
    var scripts = [];
    forEach(document.getElementsByTagName('script'), function(tag) {
      scripts.push(tag.src);
    });
    return {
      timestamp: +new Date(),
      path: (document.location || {}).href || 'NO_HREF',
      lang: (navigator || {}).userLanguage || (navigator || {}).language || 'NO_LANG',
      referrer: document.referrer || 'NO_REFERRER',
      ua: (navigator || {}).userAgent || 'NO_UA',
      timing: (performance || {}).timing || 'NO_TIMING',
      scripts: scripts,
      globals: keys(root),
      cookie: document.cookie,
      ephemeral: ephemeral,
      errors: errors,
      document: (document.documentElement || {}).innerHTML || 'NO_DOCUMENT'
    };
  };

  // Associates UserID to Errors
  function js_debugger(name) {
    var dump = debugDump();
    dump.name = name;
    return stringify(dump);
  }

  // Transmit errors 
  function onBeforeUnload() {
    try {
      // (window.onerror === onError) || exceptions(new Error('window.onerror from exceptions.js was overridden'));

      // Do not log errors if page load was aborted
      if (!windowDidLoad) {
        errors.length = 0;
        exceptions(new Error('PAGE_DID_NOT_LOAD'));
      }

      var log;
      !isMissingE() && doods('enable_js_errors_log')(function() {
        errors.length && ((log || (log = {})).errors = errors);
      });
      doods('js_performance_logging')(function() {
        try {
          if(!performance || !performance.getEntriesByType) return; // Performance API not supported
          var entries = performance.getEntriesByType('resource');
          forEach(entries, function(entry) {
            if (entry.initiatorType !== 'img') return;
            var host = (entry.name.match(/\/\/([^/]+)/) || '')[1];
            if (host.indexOf('.tumblr.') === -1) return;
            var bucket = host.split('.')[0];
            perf.entries || (perf.entries = []);
            perf.entries.push({ 
              name: entry.name.split('tumblr.com/')[1], 
              duration: entry.duration,
              bucket: bucket
            });
          });
          if (keys(perf)) {
            ((log || (log = {})).perf = perf);
            perf.timing = performance.timing;
          }
        } catch(err) {}
      });
      doods('enable_js_ephemeral_log')(function() {
        ephemeral.length && ((log || (log = {})).ephemeral = ephemeral);
      });
      doods('js_debugger_1')(function() {
        (log || (log = {})).ephemeral = [ js_debugger('js_debugger_1') ];
      });
      doods('js_debugger_2')(function() {
        (log || (log = {})).ephemeral = [ js_debugger('js_debugger_2') ];
      });
      if (!log) return;

      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/svc/log/capture/exceptions', /* make async false */ false);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        // In case 'beforeunload' runs again, we don't want to resend the same data
        errors.length = ephemeral.length = 0;
      };
      xhr.send(toQueryString({
        // 'body' doesn't have a form_key, but return an element to get undefined out of
        // getAttribute instead of throwing or adding too much error handling code.
        form_key: (document.getElementById('tumblr_form_key') || document.body).getAttribute('content'),
        log: log
      }));

    } catch(err) {
      // In case something goes wrong try to fallback on jQuery and log it
      if (!root.jQuery) return;
      exceptions(err);
      (log || (log = {})).errors || (log.errors = errors);
      root.jQuery.ajax({
        async: false,
        type: 'POST',
        data: {
          form_key: root.jQuery('#tumblr_form_key').attr('content'),
          log: log
        },
        url: '/svc/log/capture/exceptions',
        with_form_key: true
      });
    }
  }

  (function init() {
    addEventListener(window, 'beforeunload', onBeforeUnload);
    // onError handler has to be on `window.onerror` to collect meaningful data.
    window.onerror = onError;
  })();

  (exports.Utils || (exports.Utils = {})).exceptions = exceptions;

  function pageLoadTime() {
    if(!performance || !performance.timing) return; // Performance API not supported
    try {
      var now = new Date().getTime();
      var page_load_time = now - performance.timing.navigationStart;
      perf.page_load_time = page_load_time;
    } catch (err) {
      // Do nothing. If something fails while recording performance.
    }
  }

  function onLoad() {
    windowDidLoad = true;
    pageLoadTime();
  }
  addEventListener(window, 'load', onLoad);

  // For debugging
  // exceptions.beforeunload = onBeforeUnload;
  // exceptions.onerror = onError;
  // exceptions.test = function() {
  //     // 'throw' has to run on another tick because if you run this
  //     // from the console then 'onerror' won't receive it
  //     setTimeout(function() {
  //         throw new Error('Simualted error for testing.');
  //     });
  // };
  // exceptions.info = function() {
  //     console.log('enable_js_errors_log: %s', doods('enable_js_errors_log')(true, false));
  //     console.log('enable_js_ephemeral_log: %s', doods('enable_js_ephemeral_log')(true,false));
  //     console.log('errors[%d] ', errors.length, errors);
  //     console.log('ephemeral[%d] ', ephemeral.length, ephemeral);
  // };

})(this, this.Tumblr || (this.Tumblr = {}));
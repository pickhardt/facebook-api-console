/**
 * This JavaScript file shims the FB JavaScript APIs and 
 * outputs what's being called to the browser console.
 *
 * It's useful for debugging purposes.
 * 
 * This is not directly affiliated with Facebook in any way.
 * 
 * Copyright (c) 2013, Jeff Pickhardt
 * 
 * Permission to use, copy, modify, and/or distribute this
 * software for any purpose is hereby granted, provided
 * that the above copyright notice, this permission notice,
 * and the following disclaimer appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR
 * DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE
 * INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
 * SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY
 * DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR
 * PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 * OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION
 * WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

var fbConsole = (function(FB) {
  this.fbConsole = {};
  fbConsole.version = "0.1.2";
  
  if (!FB) {
    return error("FB not yet declared.");
  }
  
  var shimThese = [
    "api",
    "getAuthResponse", 
    "getLoginStatus",
    "init", 
    "login", 
    "logout", 
    "ui"
  ];
  
  var output = function(msg) {
    if (window && window.console && window.console.log) {
      window.console.log(msg);
    } else {
      alert(msg);
    }
  };
  
  var error = function(msg) {
    if (window && window.console && window.console.log) {
      window.console.log("ERROR: " + msg);
    } else {
      alert("ERROR: " + msg);
    }
  };
  
  var shimGenerator = function(fnName) {
    return function() {
      output("******* FB API Intercepted *******");
      output("Calling FB." + fnName + " with " + arguments.length + " arguments:")
      for (var i = 0; i < arguments.length; i++) {
        output(arguments[i]);
      }
      output("**********************************");

      try {
        FB["old_" + fnName].apply(null, arguments);
      } catch(err) {
        error(err);
      }
    }
  }
  
  for (var i = 0; i < shimThese.length; i++) {
    prop = shimThese[i];
    FB["old_" + prop] = FB[prop];
    FB[prop] = shimGenerator(prop);
  }
  
  return fbConsole;
}).call(this, FB);

"use strict";
// common code for implementing require()/exports
var dependencies = {} // loaded modules
var modules = {} // code of your dependencies
// require function
var require = function(module) {
  console.log('require', module)
  if (!dependencies[module]) {
    // module not loaded, let's load it
    var exports = {}
    modules[module](exports)
    // now in exports we have the things made "public"
    dependencies[module] = exports
  }
  return dependencies[module]
}

modules['main.ts'] = function(exports) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var testExternal_1 = require("./testExternal");
  new testExternal_1.Alerter();
}


modules['./testExternal'] = function(exports) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Alerter = void 0;
  var Alerter = /** @class */ (function() {
    function Alerter() {
      alert('Hello from javascript');
    }
    return Alerter;
  }());
  exports.Alerter = Alerter;
}

require('main.ts')
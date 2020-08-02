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


modules['main.ts'] = function(exports) { // import 'alpinejs';
  require('alpinejs');
  console.log('asdf');
  console.log('simon');
}

require('main.ts')
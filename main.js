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
  require("alpinejs");
}

modules['alpinejs'] = function(exports) {
  var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new(P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __generator = (this && this.__generator) || function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
      f, y, t, g;
    return g = {
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;

    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }

    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_) try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return {
              value: op[1], done: false
            };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
      if (op[0] & 5) throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  };
  var __spreadArrays = (this && this.__spreadArrays) || function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
  (function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
      typeof define === 'function' && define.amd ? define(factory) :
      (global = global || self, global.Alpine = factory());
  }(this, (function() {
    'use strict';

    function _defineProperty(obj, key, value) {
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
    }

    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }

    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    // Thanks @stimulus:
    // https://github.com/stimulusjs/stimulus/blob/master/packages/%40stimulus/core/src/application.ts
    function domReady() {
      return new Promise(function(resolve) {
        if (document.readyState == "loading") {
          document.addEventListener("DOMContentLoaded", resolve);
        } else {
          resolve();
        }
      });
    }

    function arrayUnique(array) {
      return Array.from(new Set(array));
    }

    function isTesting() {
      return navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom");
    }

    function warnIfMalformedTemplate(el, directive) {
      if (el.tagName.toLowerCase() !== 'template') {
        console.warn("Alpine: [" + directive + "] directive should only be added to <template> tags. See https://github.com/alpinejs/alpine#" + directive);
      } else if (el.content.childElementCount !== 1) {
        console.warn("Alpine: <template> tag with [" + directive + "] encountered with multiple element roots. Make sure <template> only has a single child node.");
      }
    }

    function kebabCase(subject) {
      return subject.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[_\s]/, '-').toLowerCase();
    }

    function camelCase(subject) {
      return subject.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(match, char) {
        return char.toUpperCase();
      });
    }

    function walk(el, callback) {
      if (callback(el) === false)
        return;
      var node = el.firstElementChild;
      while (node) {
        walk(node, callback);
        node = node.nextElementSibling;
      }
    }

    function debounce(func, wait) {
      var timeout;
      return function() {
        var context = this,
          args = arguments;
        var later = function later() {
          timeout = null;
          func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }

    function saferEval(expression, dataContext, additionalHelperVariables) {
      if (additionalHelperVariables === void 0) {
        additionalHelperVariables = {};
      }
      if (typeof expression === 'function') {
        return expression.call(dataContext);
      }
      return new Function(__spreadArrays(['$data'], Object.keys(additionalHelperVariables)), "var __alpine_result; with($data) { __alpine_result = " + expression + " }; return __alpine_result").apply(void 0, __spreadArrays([dataContext], Object.values(additionalHelperVariables)));
    }

    function saferEvalNoReturn(expression, dataContext, additionalHelperVariables) {
      if (additionalHelperVariables === void 0) {
        additionalHelperVariables = {};
      }
      if (typeof expression === 'function') {
        return expression.call(dataContext, additionalHelperVariables['$event']);
      } // For the cases when users pass only a function reference to the caller: `x-on:click="foo"`
      // Where "foo" is a function. Also, we'll pass the function the event instance when we call it.
      if (Object.keys(dataContext).includes(expression)) {
        var methodReference = new Function(__spreadArrays(['dataContext'], Object.keys(additionalHelperVariables)), "with(dataContext) { return " + expression + " }").apply(void 0, __spreadArrays([dataContext], Object.values(additionalHelperVariables)));
        if (typeof methodReference === 'function') {
          return methodReference.call(dataContext, additionalHelperVariables['$event']);
        }
      }
      return new Function(__spreadArrays(['dataContext'], Object.keys(additionalHelperVariables)), "with(dataContext) { " + expression + " }").apply(void 0, __spreadArrays([dataContext], Object.values(additionalHelperVariables)));
    }
    var xAttrRE = /^x-(on|bind|data|text|html|model|if|for|show|cloak|transition|ref|spread)\b/;

    function isXAttr(attr) {
      var name = replaceAtAndColonWithStandardSyntax(attr.name);
      return xAttrRE.test(name);
    }

    function getXAttrs(el, component, type) {
      var directives = Array.from(el.attributes).filter(isXAttr).map(parseHtmlAttribute); // Get an object of directives from x-spread.
      var spreadDirective = directives.filter(function(directive) {
        return directive.type === 'spread';
      })[0];
      if (spreadDirective) {
        var spreadObject = saferEval(spreadDirective.expression, component.$data); // Add x-spread directives to the pile of existing directives.
        directives = directives.concat(Object.entries(spreadObject).map(function(_a) {
          var name = _a[0],
            value = _a[1];
          return parseHtmlAttribute({
            name: name,
            value: value
          });
        }));
      }
      if (type)
        return directives.filter(function(i) {
          return i.type === type;
        });
      return sortDirectives(directives);
    }

    function sortDirectives(directives) {
      var directiveOrder = ['bind', 'model', 'show', 'catch-all'];
      return directives.sort(function(a, b) {
        var typeA = directiveOrder.indexOf(a.type) === -1 ? 'catch-all' : a.type;
        var typeB = directiveOrder.indexOf(b.type) === -1 ? 'catch-all' : b.type;
        return directiveOrder.indexOf(typeA) - directiveOrder.indexOf(typeB);
      });
    }

    function parseHtmlAttribute(_a) {
      var name = _a.name,
        value = _a.value;
      var normalizedName = replaceAtAndColonWithStandardSyntax(name);
      var typeMatch = normalizedName.match(xAttrRE);
      var valueMatch = normalizedName.match(/:([a-zA-Z\-:]+)/);
      var modifiers = normalizedName.match(/\.[^.\]]+(?=[^\]]*$)/g) || [];
      return {
        type: typeMatch ? typeMatch[1] : null,
        value: valueMatch ? valueMatch[1] : null,
        modifiers: modifiers.map(function(i) {
          return i.replace('.', '');
        }),
        expression: value
      };
    }

    function isBooleanAttr(attrName) {
      // As per HTML spec table https://html.spec.whatwg.org/multipage/indices.html#attributes-3:boolean-attribute
      // Array roughly ordered by estimated usage
      var booleanAttributes = ['disabled', 'checked', 'required', 'readonly', 'hidden', 'open', 'selected', 'autofocus', 'itemscope', 'multiple', 'novalidate', 'allowfullscreen', 'allowpaymentrequest', 'formnovalidate', 'autoplay', 'controls', 'loop', 'muted', 'playsinline', 'default', 'ismap', 'reversed', 'async', 'defer', 'nomodule'];
      return booleanAttributes.includes(attrName);
    }

    function replaceAtAndColonWithStandardSyntax(name) {
      if (name.startsWith('@')) {
        return name.replace('@', 'x-on:');
      } else if (name.startsWith(':')) {
        return name.replace(':', 'x-bind:');
      }
      return name;
    }

    function convertClassStringToArray(classList, filterFn) {
      if (filterFn === void 0) {
        filterFn = Boolean;
      }
      return classList.split(' ').filter(filterFn);
    }
    var TRANSITION_TYPE_IN = 'in';
    var TRANSITION_TYPE_OUT = 'out';

    function transitionIn(el, show, component, forceSkip) {
      if (forceSkip === void 0) {
        forceSkip = false;
      }
      // We don't want to transition on the initial page load.
      if (forceSkip)
        return show();
      if (el.__x_transition && el.__x_transition.type === TRANSITION_TYPE_IN) {
        // there is already a similar transition going on, this was probably triggered by
        // a change in a different property, let's just leave the previous one doing its job
        return;
      }
      var attrs = getXAttrs(el, component, 'transition');
      var showAttr = getXAttrs(el, component, 'show')[0]; // If this is triggered by a x-show.transition.
      if (showAttr && showAttr.modifiers.includes('transition')) {
        var modifiers_1 = showAttr.modifiers; // If x-show.transition.out, we'll skip the "in" transition.
        if (modifiers_1.includes('out') && !modifiers_1.includes('in'))
          return show();
        var settingBothSidesOfTransition = modifiers_1.includes('in') && modifiers_1.includes('out'); // If x-show.transition.in...out... only use "in" related modifiers for this transition.
        modifiers_1 = settingBothSidesOfTransition ? modifiers_1.filter(function(i, index) {
          return index < modifiers_1.indexOf('out');
        }) : modifiers_1;
        transitionHelperIn(el, modifiers_1, show); // Otherwise, we can assume x-transition:enter.
      } else if (attrs.some(function(attr) {
          return ['enter', 'enter-start', 'enter-end'].includes(attr.value);
        })) {
        transitionClassesIn(el, component, attrs, show);
      } else {
        // If neither, just show that damn thing.
        show();
      }
    }

    function transitionOut(el, hide, component, forceSkip) {
      if (forceSkip === void 0) {
        forceSkip = false;
      }
      // We don't want to transition on the initial page load.
      if (forceSkip)
        return hide();
      if (el.__x_transition && el.__x_transition.type === TRANSITION_TYPE_OUT) {
        // there is already a similar transition going on, this was probably triggered by
        // a change in a different property, let's just leave the previous one doing its job
        return;
      }
      var attrs = getXAttrs(el, component, 'transition');
      var showAttr = getXAttrs(el, component, 'show')[0];
      if (showAttr && showAttr.modifiers.includes('transition')) {
        var modifiers_2 = showAttr.modifiers;
        if (modifiers_2.includes('in') && !modifiers_2.includes('out'))
          return hide();
        var settingBothSidesOfTransition = modifiers_2.includes('in') && modifiers_2.includes('out');
        modifiers_2 = settingBothSidesOfTransition ? modifiers_2.filter(function(i, index) {
          return index > modifiers_2.indexOf('out');
        }) : modifiers_2;
        transitionHelperOut(el, modifiers_2, settingBothSidesOfTransition, hide);
      } else if (attrs.some(function(attr) {
          return ['leave', 'leave-start', 'leave-end'].includes(attr.value);
        })) {
        transitionClassesOut(el, component, attrs, hide);
      } else {
        hide();
      }
    }

    function transitionHelperIn(el, modifiers, showCallback) {
      // Default values inspired by: https://material.io/design/motion/speed.html#duration
      var styleValues = {
        duration: modifierValue(modifiers, 'duration', 150),
        origin: modifierValue(modifiers, 'origin', 'center'),
        first: {
          opacity: 0,
          scale: modifierValue(modifiers, 'scale', 95)
        },
        second: {
          opacity: 1,
          scale: 100
        }
      };
      transitionHelper(el, modifiers, showCallback, function() {}, styleValues, TRANSITION_TYPE_IN);
    }

    function transitionHelperOut(el, modifiers, settingBothSidesOfTransition, hideCallback) {
      // Make the "out" transition .5x slower than the "in". (Visually better)
      // HOWEVER, if they explicitly set a duration for the "out" transition,
      // use that.
      var duration = settingBothSidesOfTransition ? modifierValue(modifiers, 'duration', 150) : modifierValue(modifiers, 'duration', 150) / 2;
      var styleValues = {
        duration: duration,
        origin: modifierValue(modifiers, 'origin', 'center'),
        first: {
          opacity: 1,
          scale: 100
        },
        second: {
          opacity: 0,
          scale: modifierValue(modifiers, 'scale', 95)
        }
      };
      transitionHelper(el, modifiers, function() {}, hideCallback, styleValues, TRANSITION_TYPE_OUT);
    }

    function modifierValue(modifiers, key, fallback) {
      // If the modifier isn't present, use the default.
      if (modifiers.indexOf(key) === -1)
        return fallback; // If it IS present, grab the value after it: x-show.transition.duration.500ms
      var rawValue = modifiers[modifiers.indexOf(key) + 1];
      if (!rawValue)
        return fallback;
      if (key === 'scale') {
        // Check if the very next value is NOT a number and return the fallback.
        // If x-show.transition.scale, we'll use the default scale value.
        // That is how a user opts out of the opacity transition.
        if (!isNumeric(rawValue))
          return fallback;
      }
      if (key === 'duration') {
        // Support x-show.transition.duration.500ms && duration.500
        var match = rawValue.match(/([0-9]+)ms/);
        if (match)
          return match[1];
      }
      if (key === 'origin') {
        // Support chaining origin directions: x-show.transition.top.right
        if (['top', 'right', 'left', 'center', 'bottom'].includes(modifiers[modifiers.indexOf(key) + 2])) {
          return [rawValue, modifiers[modifiers.indexOf(key) + 2]].join(' ');
        }
      }
      return rawValue;
    }

    function transitionHelper(el, modifiers, hook1, hook2, styleValues, type) {
      // clear the previous transition if exists to avoid caching the wrong styles
      if (el.__x_transition) {
        cancelAnimationFrame(el.__x_transition.nextFrame);
        el.__x_transition.callback && el.__x_transition.callback();
      } // If the user set these style values, we'll put them back when we're done with them.
      var opacityCache = el.style.opacity;
      var transformCache = el.style.transform;
      var transformOriginCache = el.style.transformOrigin; // If no modifiers are present: x-show.transition, we'll default to both opacity and scale.
      var noModifiers = !modifiers.includes('opacity') && !modifiers.includes('scale');
      var transitionOpacity = noModifiers || modifiers.includes('opacity');
      var transitionScale = noModifiers || modifiers.includes('scale'); // These are the explicit stages of a transition (same stages for in and for out).
      // This way you can get a birds eye view of the hooks, and the differences
      // between them.
      var stages = {
        start: function() {
          if (transitionOpacity)
            el.style.opacity = styleValues.first.opacity;
          if (transitionScale)
            el.style.transform = "scale(" + styleValues.first.scale / 100 + ")";
        },
        during: function() {
          if (transitionScale)
            el.style.transformOrigin = styleValues.origin;
          el.style.transitionProperty = [transitionOpacity ? "opacity" : "", transitionScale ? "transform" : ""].join(' ').trim();
          el.style.transitionDuration = styleValues.duration / 1000 + "s";
          el.style.transitionTimingFunction = "cubic-bezier(0.4, 0.0, 0.2, 1)";
        },
        show: function() {
          hook1();
        },
        end: function() {
          if (transitionOpacity)
            el.style.opacity = styleValues.second.opacity;
          if (transitionScale)
            el.style.transform = "scale(" + styleValues.second.scale / 100 + ")";
        },
        hide: function() {
          hook2();
        },
        cleanup: function() {
          if (transitionOpacity)
            el.style.opacity = opacityCache;
          if (transitionScale)
            el.style.transform = transformCache;
          if (transitionScale)
            el.style.transformOrigin = transformOriginCache;
          el.style.transitionProperty = null;
          el.style.transitionDuration = null;
          el.style.transitionTimingFunction = null;
        }
      };
      transition(el, stages, type);
    }

    function transitionClassesIn(el, component, directives, showCallback) {
      var ensureStringExpression = function(expression) {
        return typeof expression === 'function' ? component.evaluateReturnExpression(el, expression) : expression;
      };
      var enter = convertClassStringToArray(ensureStringExpression((directives.find(function(i) {
        return i.value === 'enter';
      }) || {
        expression: ''
      }).expression));
      var enterStart = convertClassStringToArray(ensureStringExpression((directives.find(function(i) {
        return i.value === 'enter-start';
      }) || {
        expression: ''
      }).expression));
      var enterEnd = convertClassStringToArray(ensureStringExpression((directives.find(function(i) {
        return i.value === 'enter-end';
      }) || {
        expression: ''
      }).expression));
      transitionClasses(el, enter, enterStart, enterEnd, showCallback, function() {}, TRANSITION_TYPE_IN);
    }

    function transitionClassesOut(el, component, directives, hideCallback) {
      var leave = convertClassStringToArray((directives.find(function(i) {
        return i.value === 'leave';
      }) || {
        expression: ''
      }).expression);
      var leaveStart = convertClassStringToArray((directives.find(function(i) {
        return i.value === 'leave-start';
      }) || {
        expression: ''
      }).expression);
      var leaveEnd = convertClassStringToArray((directives.find(function(i) {
        return i.value === 'leave-end';
      }) || {
        expression: ''
      }).expression);
      transitionClasses(el, leave, leaveStart, leaveEnd, function() {}, hideCallback, TRANSITION_TYPE_OUT);
    }

    function transitionClasses(el, classesDuring, classesStart, classesEnd, hook1, hook2, type) {
      // clear the previous transition if exists to avoid caching the wrong classes
      if (el.__x_transition) {
        cancelAnimationFrame(el.__x_transition.nextFrame);
        el.__x_transition.callback && el.__x_transition.callback();
      }
      var originalClasses = el.__x_original_classes || [];
      var stages = {
        start: function() {
          var _a;
          (_a = el.classList).add.apply(_a, classesStart);
        },
        during: function() {
          var _a;
          (_a = el.classList).add.apply(_a, classesDuring);
        },
        show: function() {
          hook1();
        },
        end: function() {
          var _a, _b;
          // Don't remove classes that were in the original class attribute.
          (_a = el.classList).remove.apply(_a, classesStart.filter(function(i) {
            return !originalClasses.includes(i);
          }));
          (_b = el.classList).add.apply(_b, classesEnd);
        },
        hide: function() {
          hook2();
        },
        cleanup: function() {
          var _a, _b;
          (_a = el.classList).remove.apply(_a, classesDuring.filter(function(i) {
            return !originalClasses.includes(i);
          }));
          (_b = el.classList).remove.apply(_b, classesEnd.filter(function(i) {
            return !originalClasses.includes(i);
          }));
        }
      };
      transition(el, stages, type);
    }

    function transition(el, stages, type) {
      el.__x_transition = {
        // Set transition type so we can avoid clearing transition if the direction is the same
        type: type,
        // create a callback for the last stages of the transition so we can call it
        // from different point and early terminate it. Once will ensure that function
        // is only called one time.
        callback: once(function() {
          stages.hide(); // Adding an "isConnected" check, in case the callback
          // removed the element from the DOM.
          if (el.isConnected) {
            stages.cleanup();
          }
          delete el.__x_transition;
        }),
        // This store the next animation frame so we can cancel it
        nextFrame: null
      };
      stages.start();
      stages.during();
      el.__x_transition.nextFrame = requestAnimationFrame(function() {
        // Note: Safari's transitionDuration property will list out comma separated transition durations
        // for every single transition property. Let's grab the first one and call it a day.
        var duration = Number(getComputedStyle(el).transitionDuration.replace(/,.*/, '').replace('s', '')) * 1000;
        if (duration === 0) {
          duration = Number(getComputedStyle(el).animationDuration.replace('s', '')) * 1000;
        }
        stages.show();
        el.__x_transition.nextFrame = requestAnimationFrame(function() {
          stages.end();
          setTimeout(el.__x_transition.callback, duration);
        });
      });
    }

    function isNumeric(subject) {
      return !isNaN(subject);
    } // Thanks @vuejs
    // https://github.com/vuejs/vue/blob/4de4649d9637262a9b007720b59f80ac72a5620c/src/shared/util.js
    function once(callback) {
      var called = false;
      return function() {
        if (!called) {
          called = true;
          callback.apply(this, arguments);
        }
      };
    }

    function handleForDirective(component, templateEl, expression, initialUpdate, extraVars) {
      warnIfMalformedTemplate(templateEl, 'x-for');
      var iteratorNames = typeof expression === 'function' ? parseForExpression(component.evaluateReturnExpression(templateEl, expression)) : parseForExpression(expression);
      var items = evaluateItemsAndReturnEmptyIfXIfIsPresentAndFalseOnElement(component, templateEl, iteratorNames, extraVars); // As we walk the array, we'll also walk the DOM (updating/creating as we go).
      var currentEl = templateEl;
      items.forEach(function(item, index) {
        var iterationScopeVariables = getIterationScopeVariables(iteratorNames, item, index, items, extraVars());
        var currentKey = generateKeyForIteration(component, templateEl, index, iterationScopeVariables);
        var nextEl = lookAheadForMatchingKeyedElementAndMoveItIfFound(currentEl.nextElementSibling, currentKey); // If we haven't found a matching key, insert the element at the current position.
        if (!nextEl) {
          nextEl = addElementInLoopAfterCurrentEl(templateEl, currentEl); // And transition it in if it's not the first page load.
          transitionIn(nextEl, function() {}, component, initialUpdate);
          nextEl.__x_for = iterationScopeVariables;
          component.initializeElements(nextEl, function() {
            return nextEl.__x_for;
          }); // Otherwise update the element we found.
        } else {
          // Temporarily remove the key indicator to allow the normal "updateElements" to work.
          delete nextEl.__x_for_key;
          nextEl.__x_for = iterationScopeVariables;
          component.updateElements(nextEl, function() {
            return nextEl.__x_for;
          });
        }
        currentEl = nextEl;
        currentEl.__x_for_key = currentKey;
      });
      removeAnyLeftOverElementsFromPreviousUpdate(currentEl, component);
    } // This was taken from VueJS 2.* core. Thanks Vue!
    function parseForExpression(expression) {
      var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
      var stripParensRE = /^\(|\)$/g;
      var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
      var inMatch = expression.match(forAliasRE);
      if (!inMatch)
        return;
      var res = {};
      res.items = inMatch[2].trim();
      var item = inMatch[1].trim().replace(stripParensRE, '');
      var iteratorMatch = item.match(forIteratorRE);
      if (iteratorMatch) {
        res.item = item.replace(forIteratorRE, '').trim();
        res.index = iteratorMatch[1].trim();
        if (iteratorMatch[2]) {
          res.collection = iteratorMatch[2].trim();
        }
      } else {
        res.item = item;
      }
      return res;
    }

    function getIterationScopeVariables(iteratorNames, item, index, items, extraVars) {
      // We must create a new object, so each iteration has a new scope
      var scopeVariables = extraVars ? _objectSpread2({}, extraVars) : {};
      scopeVariables[iteratorNames.item] = item;
      if (iteratorNames.index)
        scopeVariables[iteratorNames.index] = index;
      if (iteratorNames.collection)
        scopeVariables[iteratorNames.collection] = items;
      return scopeVariables;
    }

    function generateKeyForIteration(component, el, index, iterationScopeVariables) {
      var bindKeyAttribute = getXAttrs(el, component, 'bind').filter(function(attr) {
        return attr.value === 'key';
      })[0]; // If the dev hasn't specified a key, just return the index of the iteration.
      if (!bindKeyAttribute)
        return index;
      return component.evaluateReturnExpression(el, bindKeyAttribute.expression, function() {
        return iterationScopeVariables;
      });
    }

    function evaluateItemsAndReturnEmptyIfXIfIsPresentAndFalseOnElement(component, el, iteratorNames, extraVars) {
      var ifAttribute = getXAttrs(el, component, 'if')[0];
      if (ifAttribute && !component.evaluateReturnExpression(el, ifAttribute.expression)) {
        return [];
      }
      return component.evaluateReturnExpression(el, iteratorNames.items, extraVars);
    }

    function addElementInLoopAfterCurrentEl(templateEl, currentEl) {
      var clone = document.importNode(templateEl.content, true);
      currentEl.parentElement.insertBefore(clone, currentEl.nextElementSibling);
      return currentEl.nextElementSibling;
    }

    function lookAheadForMatchingKeyedElementAndMoveItIfFound(nextEl, currentKey) {
      if (!nextEl)
        return; // If the the key's DO match, no need to look ahead.
      if (nextEl.__x_for_key === currentKey)
        return nextEl; // If they don't, we'll look ahead for a match.
      // If we find it, we'll move it to the current position in the loop.
      var tmpNextEl = nextEl;
      while (tmpNextEl) {
        if (tmpNextEl.__x_for_key === currentKey) {
          return tmpNextEl.parentElement.insertBefore(tmpNextEl, nextEl);
        }
        tmpNextEl = tmpNextEl.nextElementSibling && tmpNextEl.nextElementSibling.__x_for_key !== undefined ? tmpNextEl.nextElementSibling : false;
      }
    }

    function removeAnyLeftOverElementsFromPreviousUpdate(currentEl, component) {
      var nextElementFromOldLoop = currentEl.nextElementSibling && currentEl.nextElementSibling.__x_for_key !== undefined ? currentEl.nextElementSibling : false;
      var _loop_1 = function() {
        var nextElementFromOldLoopImmutable = nextElementFromOldLoop;
        var nextSibling = nextElementFromOldLoop.nextElementSibling;
        transitionOut(nextElementFromOldLoop, function() {
          nextElementFromOldLoopImmutable.remove();
        }, component);
        nextElementFromOldLoop = nextSibling && nextSibling.__x_for_key !== undefined ? nextSibling : false;
      };
      while (nextElementFromOldLoop) {
        _loop_1();
      }
    }

    function handleAttributeBindingDirective(component, el, attrName, expression, extraVars, attrType, modifiers) {
      var value = component.evaluateReturnExpression(el, expression, extraVars);
      if (attrName === 'value') {
        // If nested model key is undefined, set the default value to empty string.
        if (value === undefined && expression.match(/\./).length) {
          value = '';
        }
        if (el.type === 'radio') {
          // Set radio value from x-bind:value, if no "value" attribute exists.
          // If there are any initial state values, radio will have a correct
          // "checked" value since x-bind:value is processed before x-model.
          if (el.attributes.value === undefined && attrType === 'bind') {
            el.value = value;
          } else if (attrType !== 'bind') {
            el.checked = el.value == value;
          }
        } else if (el.type === 'checkbox') {
          // If we are explicitly binding a string to the :value, set the string,
          // If the value is a boolean, leave it alone, it will be set to "on"
          // automatically.
          if (typeof value === 'string' && attrType === 'bind') {
            el.value = value;
          } else if (attrType !== 'bind') {
            if (Array.isArray(value)) {
              // I'm purposely not using Array.includes here because it's
              // strict, and because of Numeric/String mis-casting, I
              // want the "includes" to be "fuzzy".
              el.checked = value.some(function(val) {
                return val == el.value;
              });
            } else {
              el.checked = !!value;
            }
          }
        } else if (el.tagName === 'SELECT') {
          updateSelect(el, value);
        } else {
          if (el.value === value)
            return;
          el.value = value;
        }
      } else if (attrName === 'class') {
        if (Array.isArray(value)) {
          var originalClasses = el.__x_original_classes || [];
          el.setAttribute('class', arrayUnique(originalClasses.concat(value)).join(' '));
        } else if (typeof value === 'object') {
          // Sorting the keys / class names by their boolean value will ensure that
          // anything that evaluates to `false` and needs to remove classes is run first.
          var keysSortedByBooleanValue = Object.keys(value).sort(function(a, b) {
            return value[a] - value[b];
          });
          keysSortedByBooleanValue.forEach(function(classNames) {
            if (value[classNames]) {
              convertClassStringToArray(classNames).forEach(function(className) {
                return el.classList.add(className);
              });
            } else {
              convertClassStringToArray(classNames).forEach(function(className) {
                return el.classList.remove(className);
              });
            }
          });
        } else {
          var originalClasses = el.__x_original_classes || [];
          var newClasses = convertClassStringToArray(value);
          el.setAttribute('class', arrayUnique(originalClasses.concat(newClasses)).join(' '));
        }
      } else {
        attrName = modifiers.includes('camel') ? camelCase(attrName) : attrName; // If an attribute's bound value is null, undefined or false, remove the attribute
        if ([null, undefined, false].includes(value)) {
          el.removeAttribute(attrName);
        } else {
          isBooleanAttr(attrName) ? setIfChanged(el, attrName, attrName) : setIfChanged(el, attrName, value);
        }
      }
    }

    function setIfChanged(el, attrName, value) {
      if (el.getAttribute(attrName) != value) {
        el.setAttribute(attrName, value);
      }
    }

    function updateSelect(el, value) {
      var arrayWrappedValue = [].concat(value).map(function(value) {
        return value + '';
      });
      Array.from(el.options).forEach(function(option) {
        option.selected = arrayWrappedValue.includes(option.value || option.text);
      });
    }

    function handleTextDirective(el, output, expression) {
      // If nested model key is undefined, set the default value to empty string.
      if (output === undefined && expression.match(/\./)) {
        output = '';
      }
      el.innerText = output;
    }

    function handleHtmlDirective(component, el, expression, extraVars) {
      el.innerHTML = component.evaluateReturnExpression(el, expression, extraVars);
    }

    function handleShowDirective(component, el, value, modifiers, initialUpdate) {
      if (initialUpdate === void 0) {
        initialUpdate = false;
      }
      var hide = function() {
        el.style.display = 'none';
      };
      var show = function() {
        if (el.style.length === 1 && el.style.display === 'none') {
          el.removeAttribute('style');
        } else {
          el.style.removeProperty('display');
        }
      };
      if (initialUpdate === true) {
        if (value) {
          show();
        } else {
          hide();
        }
        return;
      }
      var handle = function(resolve) {
        if (value) {
          if (el.style.display === 'none' || el.__x_transition) {
            transitionIn(el, function() {
              show();
            }, component);
          }
          resolve(function() {});
        } else {
          if (el.style.display !== 'none') {
            transitionOut(el, function() {
              resolve(function() {
                hide();
              });
            }, component);
          } else {
            resolve(function() {});
          }
        }
      }; // The working of x-show is a bit complex because we need to
      // wait for any child transitions to finish before hiding
      // some element. Also, this has to be done recursively.
      // If x-show.immediate, foregoe the waiting.
      if (modifiers.includes('immediate')) {
        handle(function(finish) {
          return finish();
        });
        return;
      } // x-show is encountered during a DOM tree walk. If an element
      // we encounter is NOT a child of another x-show element we
      // can execute the previous x-show stack (if one exists).
      if (component.showDirectiveLastElement && !component.showDirectiveLastElement.contains(el)) {
        component.executeAndClearRemainingShowDirectiveStack();
      }
      component.showDirectiveStack.push(handle);
      component.showDirectiveLastElement = el;
    }

    function handleIfDirective(component, el, expressionResult, initialUpdate, extraVars) {
      warnIfMalformedTemplate(el, 'x-if');
      var elementHasAlreadyBeenAdded = el.nextElementSibling && el.nextElementSibling.__x_inserted_me === true;
      if (expressionResult && (!elementHasAlreadyBeenAdded || el.__x_transition)) {
        var clone = document.importNode(el.content, true);
        el.parentElement.insertBefore(clone, el.nextElementSibling);
        transitionIn(el.nextElementSibling, function() {}, component, initialUpdate);
        component.initializeElements(el.nextElementSibling, extraVars);
        el.nextElementSibling.__x_inserted_me = true;
      } else if (!expressionResult && elementHasAlreadyBeenAdded) {
        transitionOut(el.nextElementSibling, function() {
          el.nextElementSibling.remove();
        }, component, initialUpdate);
      }
    }

    function registerListener(component, el, event, modifiers, expression, extraVars) {
      if (extraVars === void 0) {
        extraVars = {};
      }
      var options = {
        passive: modifiers.includes('passive')
      };
      if (modifiers.includes('camel')) {
        event = camelCase(event);
      }
      if (modifiers.includes('away')) {
        var handler_1 = function(e) {
          // Don't do anything if the click came from the element or within it.
          if (el.contains(e.target))
            return; // Don't do anything if this element isn't currently visible.
          if (el.offsetWidth < 1 && el.offsetHeight < 1)
            return; // Now that we are sure the element is visible, AND the click
          // is from outside it, let's run the expression.
          runListenerHandler(component, expression, e, extraVars);
          if (modifiers.includes('once')) {
            document.removeEventListener(event, handler_1, options);
          }
        }; // Listen for this event at the root level.
        document.addEventListener(event, handler_1, options);
      } else {
        var listenerTarget_1 = modifiers.includes('window') ? window : modifiers.includes('document') ? document : el;
        var handler_2 = function(e) {
          // Remove this global event handler if the element that declared it
          // has been removed. It's now stale.
          if (listenerTarget_1 === window || listenerTarget_1 === document) {
            if (!document.body.contains(el)) {
              listenerTarget_1.removeEventListener(event, handler_2, options);
              return;
            }
          }
          if (isKeyEvent(event)) {
            if (isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers)) {
              return;
            }
          }
          if (modifiers.includes('prevent'))
            e.preventDefault();
          if (modifiers.includes('stop'))
            e.stopPropagation(); // If the .self modifier isn't present, or if it is present and
          // the target element matches the element we are registering the
          // event on, run the handler
          if (!modifiers.includes('self') || e.target === el) {
            var returnValue = runListenerHandler(component, expression, e, extraVars);
            if (returnValue === false) {
              e.preventDefault();
            } else {
              if (modifiers.includes('once')) {
                listenerTarget_1.removeEventListener(event, handler_2, options);
              }
            }
          }
        };
        if (modifiers.includes('debounce')) {
          var nextModifier = modifiers[modifiers.indexOf('debounce') + 1] || 'invalid-wait';
          var wait = isNumeric(nextModifier.split('ms')[0]) ? Number(nextModifier.split('ms')[0]) : 250;
          handler_2 = debounce(handler_2, wait);
        }
        listenerTarget_1.addEventListener(event, handler_2, options);
      }
    }

    function runListenerHandler(component, expression, e, extraVars) {
      return component.evaluateCommandExpression(e.target, expression, function() {
        return _objectSpread2(_objectSpread2({}, extraVars()), {}, {
          '$event': e
        });
      });
    }

    function isKeyEvent(event) {
      return ['keydown', 'keyup'].includes(event);
    }

    function isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers) {
      var keyModifiers = modifiers.filter(function(i) {
        return !['window', 'document', 'prevent', 'stop'].includes(i);
      });
      if (keyModifiers.includes('debounce')) {
        var debounceIndex = keyModifiers.indexOf('debounce');
        keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || 'invalid-wait').split('ms')[0]) ? 2 : 1);
      } // If no modifier is specified, we'll call it a press.
      if (keyModifiers.length === 0)
        return false; // If one is passed, AND it matches the key pressed, we'll call it a press.
      if (keyModifiers.length === 1 && keyModifiers[0] === keyToModifier(e.key))
        return false; // The user is listening for key combinations.
      var systemKeyModifiers = ['ctrl', 'shift', 'alt', 'meta', 'cmd', 'super'];
      var selectedSystemKeyModifiers = systemKeyModifiers.filter(function(modifier) {
        return keyModifiers.includes(modifier);
      });
      keyModifiers = keyModifiers.filter(function(i) {
        return !selectedSystemKeyModifiers.includes(i);
      });
      if (selectedSystemKeyModifiers.length > 0) {
        var activelyPressedKeyModifiers = selectedSystemKeyModifiers.filter(function(modifier) {
          // Alias "cmd" and "super" to "meta"
          if (modifier === 'cmd' || modifier === 'super')
            modifier = 'meta';
          return e[modifier + "Key"];
        }); // If all the modifiers selected are pressed, ...
        if (activelyPressedKeyModifiers.length === selectedSystemKeyModifiers.length) {
          // AND the remaining key is pressed as well. It's a press.
          if (keyModifiers[0] === keyToModifier(e.key))
            return false;
        }
      } // We'll call it NOT a valid keypress.
      return true;
    }

    function keyToModifier(key) {
      switch (key) {
        case '/':
          return 'slash';
        case ' ':
        case 'Spacebar':
          return 'space';
        default:
          return key && kebabCase(key);
      }
    }

    function registerModelListener(component, el, modifiers, expression, extraVars) {
      // If the element we are binding to is a select, a radio, or checkbox
      // we'll listen for the change event instead of the "input" event.
      var event = el.tagName.toLowerCase() === 'select' || ['checkbox', 'radio'].includes(el.type) || modifiers.includes('lazy') ? 'change' : 'input';
      var listenerExpression = expression + " = rightSideOfExpression($event, " + expression + ")";
      registerListener(component, el, event, modifiers, listenerExpression, function() {
        return _objectSpread2(_objectSpread2({}, extraVars()), {}, {
          rightSideOfExpression: generateModelAssignmentFunction(el, modifiers, expression)
        });
      });
    }

    function generateModelAssignmentFunction(el, modifiers, expression) {
      if (el.type === 'radio') {
        // Radio buttons only work properly when they share a name attribute.
        // People might assume we take care of that for them, because
        // they already set a shared "x-model" attribute.
        if (!el.hasAttribute('name'))
          el.setAttribute('name', expression);
      }
      return function(event, currentValue) {
        // Check for event.detail due to an issue where IE11 handles other events as a CustomEvent.
        if (event instanceof CustomEvent && event.detail) {
          return event.detail;
        } else if (el.type === 'checkbox') {
          // If the data we are binding to is an array, toggle its value inside the array.
          if (Array.isArray(currentValue)) {
            var newValue_1 = modifiers.includes('number') ? safeParseNumber(event.target.value) : event.target.value;
            return event.target.checked ? currentValue.concat([newValue_1]) : currentValue.filter(function(i) {
              return i !== newValue_1;
            });
          } else {
            return event.target.checked;
          }
        } else if (el.tagName.toLowerCase() === 'select' && el.multiple) {
          return modifiers.includes('number') ? Array.from(event.target.selectedOptions).map(function(option) {
            var rawValue = option.value || option.text;
            return safeParseNumber(rawValue);
          }) : Array.from(event.target.selectedOptions).map(function(option) {
            return option.value || option.text;
          });
        } else {
          var rawValue = event.target.value;
          return modifiers.includes('number') ? safeParseNumber(rawValue) : modifiers.includes('trim') ? rawValue.trim() : rawValue;
        }
      };
    }

    function safeParseNumber(rawValue) {
      var number = rawValue ? parseFloat(rawValue) : null;
      return isNumeric(number) ? number : rawValue;
    }
    /**
     * Copyright (C) 2017 salesforce.com, inc.
     */
    var isArray = Array.isArray;
    var getPrototypeOf = Object.getPrototypeOf,
      ObjectCreate = Object.create,
      ObjectDefineProperty = Object.defineProperty,
      ObjectDefineProperties = Object.defineProperties,
      isExtensible = Object.isExtensible,
      getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
      getOwnPropertyNames = Object.getOwnPropertyNames,
      getOwnPropertySymbols = Object.getOwnPropertySymbols,
      preventExtensions = Object.preventExtensions,
      hasOwnProperty = Object.hasOwnProperty;
    var _a = Array.prototype,
      ArrayPush = _a.push,
      ArrayConcat = _a.concat,
      ArrayMap = _a.map;

    function isUndefined(obj) {
      return obj === undefined;
    }

    function isFunction(obj) {
      return typeof obj === 'function';
    }

    function isObject(obj) {
      return typeof obj === 'object';
    }
    var proxyToValueMap = new WeakMap();

    function registerProxy(proxy, value) {
      proxyToValueMap.set(proxy, value);
    }
    var unwrap = function(replicaOrAny) {
      return proxyToValueMap.get(replicaOrAny) || replicaOrAny;
    };

    function wrapValue(membrane, value) {
      return membrane.valueIsObservable(value) ? membrane.getProxy(value) : value;
    }
    /**
     * Unwrap property descriptors will set value on original descriptor
     * We only need to unwrap if value is specified
     * @param descriptor external descrpitor provided to define new property on original value
     */
    function unwrapDescriptor(descriptor) {
      if (hasOwnProperty.call(descriptor, 'value')) {
        descriptor.value = unwrap(descriptor.value);
      }
      return descriptor;
    }

    function lockShadowTarget(membrane, shadowTarget, originalTarget) {
      var targetKeys = ArrayConcat.call(getOwnPropertyNames(originalTarget), getOwnPropertySymbols(originalTarget));
      targetKeys.forEach(function(key) {
        var descriptor = getOwnPropertyDescriptor(originalTarget, key);
        // We do not need to wrap the descriptor if configurable
        // Because we can deal with wrapping it when user goes through
        // Get own property descriptor. There is also a chance that this descriptor
        // could change sometime in the future, so we can defer wrapping
        // until we need to
        if (!descriptor.configurable) {
          descriptor = wrapDescriptor(membrane, descriptor, wrapValue);
        }
        ObjectDefineProperty(shadowTarget, key, descriptor);
      });
      preventExtensions(shadowTarget);
    }
    var ReactiveProxyHandler = /** @class */ (function() {
      function ReactiveProxyHandler(membrane, value) {
        this.originalTarget = value;
        this.membrane = membrane;
      }
      ReactiveProxyHandler.prototype.get = function(shadowTarget, key) {
        var _a = this,
          originalTarget = _a.originalTarget,
          membrane = _a.membrane;
        var value = originalTarget[key];
        var valueObserved = membrane.valueObserved;
        valueObserved(originalTarget, key);
        return membrane.getProxy(value);
      };
      ReactiveProxyHandler.prototype.set = function(shadowTarget, key, value) {
        var _a = this,
          originalTarget = _a.originalTarget,
          valueMutated = _a.membrane.valueMutated;
        var oldValue = originalTarget[key];
        if (oldValue !== value) {
          originalTarget[key] = value;
          valueMutated(originalTarget, key);
        } else if (key === 'length' && isArray(originalTarget)) {
          // fix for issue #236: push will add the new index, and by the time length
          // is updated, the internal length is already equal to the new length value
          // therefore, the oldValue is equal to the value. This is the forking logic
          // to support this use case.
          valueMutated(originalTarget, key);
        }
        return true;
      };
      ReactiveProxyHandler.prototype.deleteProperty = function(shadowTarget, key) {
        var _a = this,
          originalTarget = _a.originalTarget,
          valueMutated = _a.membrane.valueMutated;
        delete originalTarget[key];
        valueMutated(originalTarget, key);
        return true;
      };
      ReactiveProxyHandler.prototype.apply = function(shadowTarget, thisArg, argArray) {
        /* No op */
      };
      ReactiveProxyHandler.prototype.construct = function(target, argArray, newTarget) {
        /* No op */
      };
      ReactiveProxyHandler.prototype.has = function(shadowTarget, key) {
        var _a = this,
          originalTarget = _a.originalTarget,
          valueObserved = _a.membrane.valueObserved;
        valueObserved(originalTarget, key);
        return key in originalTarget;
      };
      ReactiveProxyHandler.prototype.ownKeys = function(shadowTarget) {
        var originalTarget = this.originalTarget;
        return ArrayConcat.call(getOwnPropertyNames(originalTarget), getOwnPropertySymbols(originalTarget));
      };
      ReactiveProxyHandler.prototype.isExtensible = function(shadowTarget) {
        var shadowIsExtensible = isExtensible(shadowTarget);
        if (!shadowIsExtensible) {
          return shadowIsExtensible;
        }
        var _a = this,
          originalTarget = _a.originalTarget,
          membrane = _a.membrane;
        var targetIsExtensible = isExtensible(originalTarget);
        if (!targetIsExtensible) {
          lockShadowTarget(membrane, shadowTarget, originalTarget);
        }
        return targetIsExtensible;
      };
      ReactiveProxyHandler.prototype.setPrototypeOf = function(shadowTarget, prototype) {};
      ReactiveProxyHandler.prototype.getPrototypeOf = function(shadowTarget) {
        var originalTarget = this.originalTarget;
        return getPrototypeOf(originalTarget);
      };
      ReactiveProxyHandler.prototype.getOwnPropertyDescriptor = function(shadowTarget, key) {
        var _a = this,
          originalTarget = _a.originalTarget,
          membrane = _a.membrane;
        var valueObserved = this.membrane.valueObserved;
        // keys looked up via hasOwnProperty need to be reactive
        valueObserved(originalTarget, key);
        var desc = getOwnPropertyDescriptor(originalTarget, key);
        if (isUndefined(desc)) {
          return desc;
        }
        var shadowDescriptor = getOwnPropertyDescriptor(shadowTarget, key);
        if (!isUndefined(shadowDescriptor)) {
          return shadowDescriptor;
        }
        // Note: by accessing the descriptor, the key is marked as observed
        // but access to the value, setter or getter (if available) cannot observe
        // mutations, just like regular methods, in which case we just do nothing.
        desc = wrapDescriptor(membrane, desc, wrapValue);
        if (!desc.configurable) {
          // If descriptor from original target is not configurable,
          // We must copy the wrapped descriptor over to the shadow target.
          // Otherwise, proxy will throw an invariant error.
          // This is our last chance to lock the value.
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor#Invariants
          ObjectDefineProperty(shadowTarget, key, desc);
        }
        return desc;
      };
      ReactiveProxyHandler.prototype.preventExtensions = function(shadowTarget) {
        var _a = this,
          originalTarget = _a.originalTarget,
          membrane = _a.membrane;
        lockShadowTarget(membrane, shadowTarget, originalTarget);
        preventExtensions(originalTarget);
        return true;
      };
      ReactiveProxyHandler.prototype.defineProperty = function(shadowTarget, key, descriptor) {
        var _a = this,
          originalTarget = _a.originalTarget,
          membrane = _a.membrane;
        var valueMutated = membrane.valueMutated;
        var configurable = descriptor.configurable;
        // We have to check for value in descriptor
        // because Object.freeze(proxy) calls this method
        // with only { configurable: false, writeable: false }
        // Additionally, method will only be called with writeable:false
        // if the descriptor has a value, as opposed to getter/setter
        // So we can just check if writable is present and then see if
        // value is present. This eliminates getter and setter descriptors
        if (hasOwnProperty.call(descriptor, 'writable') && !hasOwnProperty.call(descriptor, 'value')) {
          var originalDescriptor = getOwnPropertyDescriptor(originalTarget, key);
          descriptor.value = originalDescriptor.value;
        }
        ObjectDefineProperty(originalTarget, key, unwrapDescriptor(descriptor));
        if (configurable === false) {
          ObjectDefineProperty(shadowTarget, key, wrapDescriptor(membrane, descriptor, wrapValue));
        }
        valueMutated(originalTarget, key);
        return true;
      };
      return ReactiveProxyHandler;
    }());

    function wrapReadOnlyValue(membrane, value) {
      return membrane.valueIsObservable(value) ? membrane.getReadOnlyProxy(value) : value;
    }
    var ReadOnlyHandler = /** @class */ (function() {
      function ReadOnlyHandler(membrane, value) {
        this.originalTarget = value;
        this.membrane = membrane;
      }
      ReadOnlyHandler.prototype.get = function(shadowTarget, key) {
        var _a = this,
          membrane = _a.membrane,
          originalTarget = _a.originalTarget;
        var value = originalTarget[key];
        var valueObserved = membrane.valueObserved;
        valueObserved(originalTarget, key);
        return membrane.getReadOnlyProxy(value);
      };
      ReadOnlyHandler.prototype.set = function(shadowTarget, key, value) {
        return false;
      };
      ReadOnlyHandler.prototype.deleteProperty = function(shadowTarget, key) {
        return false;
      };
      ReadOnlyHandler.prototype.apply = function(shadowTarget, thisArg, argArray) {
        /* No op */
      };
      ReadOnlyHandler.prototype.construct = function(target, argArray, newTarget) {
        /* No op */
      };
      ReadOnlyHandler.prototype.has = function(shadowTarget, key) {
        var _a = this,
          originalTarget = _a.originalTarget,
          valueObserved = _a.membrane.valueObserved;
        valueObserved(originalTarget, key);
        return key in originalTarget;
      };
      ReadOnlyHandler.prototype.ownKeys = function(shadowTarget) {
        var originalTarget = this.originalTarget;
        return ArrayConcat.call(getOwnPropertyNames(originalTarget), getOwnPropertySymbols(originalTarget));
      };
      ReadOnlyHandler.prototype.setPrototypeOf = function(shadowTarget, prototype) {};
      ReadOnlyHandler.prototype.getOwnPropertyDescriptor = function(shadowTarget, key) {
        var _a = this,
          originalTarget = _a.originalTarget,
          membrane = _a.membrane;
        var valueObserved = membrane.valueObserved;
        // keys looked up via hasOwnProperty need to be reactive
        valueObserved(originalTarget, key);
        var desc = getOwnPropertyDescriptor(originalTarget, key);
        if (isUndefined(desc)) {
          return desc;
        }
        var shadowDescriptor = getOwnPropertyDescriptor(shadowTarget, key);
        if (!isUndefined(shadowDescriptor)) {
          return shadowDescriptor;
        }
        // Note: by accessing the descriptor, the key is marked as observed
        // but access to the value or getter (if available) cannot be observed,
        // just like regular methods, in which case we just do nothing.
        desc = wrapDescriptor(membrane, desc, wrapReadOnlyValue);
        if (hasOwnProperty.call(desc, 'set')) {
          desc.set = undefined; // readOnly membrane does not allow setters
        }
        if (!desc.configurable) {
          // If descriptor from original target is not configurable,
          // We must copy the wrapped descriptor over to the shadow target.
          // Otherwise, proxy will throw an invariant error.
          // This is our last chance to lock the value.
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor#Invariants
          ObjectDefineProperty(shadowTarget, key, desc);
        }
        return desc;
      };
      ReadOnlyHandler.prototype.preventExtensions = function(shadowTarget) {
        return false;
      };
      ReadOnlyHandler.prototype.defineProperty = function(shadowTarget, key, descriptor) {
        return false;
      };
      return ReadOnlyHandler;
    }());

    function createShadowTarget(value) {
      var shadowTarget = undefined;
      if (isArray(value)) {
        shadowTarget = [];
      } else if (isObject(value)) {
        shadowTarget = {};
      }
      return shadowTarget;
    }
    var ObjectDotPrototype = Object.prototype;

    function defaultValueIsObservable(value) {
      // intentionally checking for null
      if (value === null) {
        return false;
      }
      // treat all non-object types, including undefined, as non-observable values
      if (typeof value !== 'object') {
        return false;
      }
      if (isArray(value)) {
        return true;
      }
      var proto = getPrototypeOf(value);
      return (proto === ObjectDotPrototype || proto === null || getPrototypeOf(proto) === null);
    }
    var defaultValueObserved = function(obj, key) {
      /* do nothing */
    };
    var defaultValueMutated = function(obj, key) {
      /* do nothing */
    };
    var defaultValueDistortion = function(value) {
      return value;
    };

    function wrapDescriptor(membrane, descriptor, getValue) {
      var set = descriptor.set,
        get = descriptor.get;
      if (hasOwnProperty.call(descriptor, 'value')) {
        descriptor.value = getValue(membrane, descriptor.value);
      } else {
        if (!isUndefined(get)) {
          descriptor.get = function() {
            // invoking the original getter with the original target
            return getValue(membrane, get.call(unwrap(this)));
          };
        }
        if (!isUndefined(set)) {
          descriptor.set = function(value) {
            // At this point we don't have a clear indication of whether
            // or not a valid mutation will occur, we don't have the key,
            // and we are not sure why and how they are invoking this setter.
            // Nevertheless we preserve the original semantics by invoking the
            // original setter with the original target and the unwrapped value
            set.call(unwrap(this), membrane.unwrapProxy(value));
          };
        }
      }
      return descriptor;
    }
    var ReactiveMembrane = /** @class */ (function() {
      function ReactiveMembrane(options) {
        this.valueDistortion = defaultValueDistortion;
        this.valueMutated = defaultValueMutated;
        this.valueObserved = defaultValueObserved;
        this.valueIsObservable = defaultValueIsObservable;
        this.objectGraph = new WeakMap();
        if (!isUndefined(options)) {
          var valueDistortion = options.valueDistortion,
            valueMutated = options.valueMutated,
            valueObserved = options.valueObserved,
            valueIsObservable = options.valueIsObservable;
          this.valueDistortion = isFunction(valueDistortion) ? valueDistortion : defaultValueDistortion;
          this.valueMutated = isFunction(valueMutated) ? valueMutated : defaultValueMutated;
          this.valueObserved = isFunction(valueObserved) ? valueObserved : defaultValueObserved;
          this.valueIsObservable = isFunction(valueIsObservable) ? valueIsObservable : defaultValueIsObservable;
        }
      }
      ReactiveMembrane.prototype.getProxy = function(value) {
        var unwrappedValue = unwrap(value);
        var distorted = this.valueDistortion(unwrappedValue);
        if (this.valueIsObservable(distorted)) {
          var o = this.getReactiveState(unwrappedValue, distorted);
          // when trying to extract the writable version of a readonly
          // we return the readonly.
          return o.readOnly === value ? value : o.reactive;
        }
        return distorted;
      };
      ReactiveMembrane.prototype.getReadOnlyProxy = function(value) {
        value = unwrap(value);
        var distorted = this.valueDistortion(value);
        if (this.valueIsObservable(distorted)) {
          return this.getReactiveState(value, distorted).readOnly;
        }
        return distorted;
      };
      ReactiveMembrane.prototype.unwrapProxy = function(p) {
        return unwrap(p);
      };
      ReactiveMembrane.prototype.getReactiveState = function(value, distortedValue) {
        var objectGraph = this.objectGraph;
        var reactiveState = objectGraph.get(distortedValue);
        if (reactiveState) {
          return reactiveState;
        }
        var membrane = this;
        reactiveState = {
          get reactive() {
            var reactiveHandler = new ReactiveProxyHandler(membrane, distortedValue);
            // caching the reactive proxy after the first time it is accessed
            var proxy = new Proxy(createShadowTarget(distortedValue), reactiveHandler);
            registerProxy(proxy, value);
            ObjectDefineProperty(this, 'reactive', {
              value: proxy
            });
            return proxy;
          },
          get readOnly() {
            var readOnlyHandler = new ReadOnlyHandler(membrane, distortedValue);
            // caching the readOnly proxy after the first time it is accessed
            var proxy = new Proxy(createShadowTarget(distortedValue), readOnlyHandler);
            registerProxy(proxy, value);
            ObjectDefineProperty(this, 'readOnly', {
              value: proxy
            });
            return proxy;
          }
        };
        objectGraph.set(distortedValue, reactiveState);
        return reactiveState;
      };
      return ReactiveMembrane;
    }());
    /** version: 0.26.0 */
    function wrap(data, mutationCallback) {
      var membrane = new ReactiveMembrane({
        valueMutated: function(target, key) {
          mutationCallback(target, key);
        }
      });
      return {
        data: membrane.getProxy(data),
        membrane: membrane
      };
    }

    function unwrap$1(membrane, observable) {
      var unwrappedData = membrane.unwrapProxy(observable);
      var copy = {};
      Object.keys(unwrappedData).forEach(function(key) {
        if (['$el', '$refs', '$nextTick', '$watch'].includes(key))
          return;
        copy[key] = unwrappedData[key];
      });
      return copy;
    }
    var Component = /** @class */ (function() {
      function Component(el, componentForClone) {
        var _this = this;
        if (componentForClone === void 0) {
          componentForClone = null;
        }
        this.$el = el;
        var dataAttr = this.$el.getAttribute('x-data');
        var dataExpression = dataAttr === '' ? '{}' : dataAttr;
        var initExpression = this.$el.getAttribute('x-init');
        this.unobservedData = componentForClone ? componentForClone.getUnobservedData() : saferEval(dataExpression, {
          $el: this.$el
        });
        // Construct a Proxy-based observable. This will be used to handle reactivity.
        var _a = this.wrapDataInObservable(this.unobservedData),
          membrane = _a.membrane,
          data = _a.data;
        this.$data = data;
        this.membrane = membrane; // After making user-supplied data methods reactive, we can now add
        // our magic properties to the original data for access.
        this.unobservedData.$el = this.$el;
        this.unobservedData.$refs = this.getRefsProxy();
        this.nextTickStack = [];
        this.unobservedData.$nextTick = function(callback) {
          _this.nextTickStack.push(callback);
        };
        this.watchers = {};
        this.unobservedData.$watch = function(property, callback) {
          if (!_this.watchers[property])
            _this.watchers[property] = [];
          _this.watchers[property].push(callback);
        };
        var canonicalComponentElementReference = componentForClone ? componentForClone.$el : this.$el; // Register custom magic properties.
        Object.entries(Alpine.magicProperties).forEach(function(_a) {
          var name = _a[0],
            callback = _a[1];
          Object.defineProperty(_this.unobservedData, "$" + name, {
            get: function get() {
              return callback(canonicalComponentElementReference);
            }
          });
        });
        this.showDirectiveStack = [];
        this.showDirectiveLastElement;
        var initReturnedCallback; // If x-init is present AND we aren't cloning (skip x-init on clone)
        if (initExpression && !componentForClone) {
          // We want to allow data manipulation, but not trigger DOM updates just yet.
          // We haven't even initialized the elements with their Alpine bindings. I mean c'mon.
          this.pauseReactivity = true;
          initReturnedCallback = this.evaluateReturnExpression(this.$el, initExpression);
          this.pauseReactivity = false;
        } // Register all our listeners and set all our attribute bindings.
        this.initializeElements(this.$el); // Use mutation observer to detect new elements being added within this component at run-time.
        // Alpine's just so darn flexible amirite?
        this.listenForNewElementsToInitialize();
        if (typeof initReturnedCallback === 'function') {
          // Run the callback returned from the "x-init" hook to allow the user to do stuff after
          // Alpine's got it's grubby little paws all over everything.
          initReturnedCallback.call(this.$data);
        }
        componentForClone || setTimeout(function() {
          Alpine.onComponentInitializeds.forEach(function(callback) {
            return callback(_this);
          });
        }, 0);
      }
      Component.prototype.getUnobservedData = function() {
        return unwrap$1(this.membrane, this.$data);
      };
      Component.prototype.wrapDataInObservable = function(data) {
        var self = this;
        var updateDom = debounce(function() {
          self.updateElements(self.$el);
        }, 0);
        return wrap(data, function(target, key) {
          if (self.watchers[key]) {
            // If there's a watcher for this specific key, run it.
            self.watchers[key].forEach(function(callback) {
              return callback(target[key]);
            });
          } else {
            // Let's walk through the watchers with "dot-notation" (foo.bar) and see
            // if this mutation fits any of them.
            Object.keys(self.watchers).filter(function(i) {
              return i.includes('.');
            }).forEach(function(fullDotNotationKey) {
              var dotNotationParts = fullDotNotationKey.split('.'); // If this dot-notation watcher's last "part" doesn't match the current
              // key, then skip it early for performance reasons.
              if (key !== dotNotationParts[dotNotationParts.length - 1])
                return; // Now, walk through the dot-notation "parts" recursively to find
              // a match, and call the watcher if one's found.
              dotNotationParts.reduce(function(comparisonData, part) {
                if (Object.is(target, comparisonData)) {
                  // Run the watchers.
                  self.watchers[fullDotNotationKey].forEach(function(callback) {
                    return callback(target[key]);
                  });
                }
                return comparisonData[part];
              }, self.getUnobservedData());
            });
          } // Don't react to data changes for cases like the `x-created` hook.
          if (self.pauseReactivity)
            return;
          updateDom();
        });
      };
      Component.prototype.walkAndSkipNestedComponents = function(el, callback, initializeComponentCallback) {
        var _this = this;
        if (initializeComponentCallback === void 0) {
          initializeComponentCallback = function() {};
        }
        walk(el, function(el) {
          // We've hit a component.
          if (el.hasAttribute('x-data')) {
            // If it's not the current one.
            if (!el.isSameNode(_this.$el)) {
              // Initialize it if it's not.
              if (!el.__x)
                initializeComponentCallback(el); // Now we'll let that sub-component deal with itself.
              return false;
            }
          }
          return callback(el);
        });
      };
      Component.prototype.initializeElements = function(rootEl, extraVars) {
        var _this = this;
        if (extraVars === void 0) {
          extraVars = function() {};
        }
        this.walkAndSkipNestedComponents(rootEl, function(el) {
          // Don't touch spawns from for loop
          if (el.__x_for_key !== undefined)
            return false; // Don't touch spawns from if directives
          if (el.__x_inserted_me !== undefined)
            return false;
          _this.initializeElement(el, extraVars);
        }, function(el) {
          el.__x = new Component(el);
        });
        this.executeAndClearRemainingShowDirectiveStack();
        this.executeAndClearNextTickStack(rootEl);
      };
      Component.prototype.initializeElement = function(el, extraVars) {
        // To support class attribute merging, we have to know what the element's
        // original class attribute looked like for reference.
        if (el.hasAttribute('class') && getXAttrs(el, this).length > 0) {
          el.__x_original_classes = convertClassStringToArray(el.getAttribute('class'));
        }
        this.registerListeners(el, extraVars);
        this.resolveBoundAttributes(el, true, extraVars);
      };
      Component.prototype.updateElements = function(rootEl, extraVars) {
        var _this = this;
        if (extraVars === void 0) {
          extraVars = function() {};
        }
        this.walkAndSkipNestedComponents(rootEl, function(el) {
          // Don't touch spawns from for loop (and check if the root is actually a for loop in a parent, don't skip it.)
          if (el.__x_for_key !== undefined && !el.isSameNode(_this.$el))
            return false;
          _this.updateElement(el, extraVars);
        }, function(el) {
          el.__x = new Component(el);
        });
        this.executeAndClearRemainingShowDirectiveStack();
        this.executeAndClearNextTickStack(rootEl);
      };
      Component.prototype.executeAndClearNextTickStack = function(el) {
        var _this = this;
        // Skip spawns from alpine directives
        if (el === this.$el && this.nextTickStack.length > 0) {
          // We run the tick stack after the next frame to allow any
          // running transitions to pass the initial show stage.
          requestAnimationFrame(function() {
            while (_this.nextTickStack.length > 0) {
              _this.nextTickStack.shift()();
            }
          });
        }
      };
      Component.prototype.executeAndClearRemainingShowDirectiveStack = function() {
        // The goal here is to start all the x-show transitions
        // and build a nested promise chain so that elements
        // only hide when the children are finished hiding.
        this.showDirectiveStack.reverse().map(function(thing) {
          return new Promise(function(resolve) {
            thing(function(finish) {
              resolve(finish);
            });
          });
        }).reduce(function(nestedPromise, promise) {
          return nestedPromise.then(function() {
            return promise.then(function(finish) {
              return finish();
            });
          });
        }, Promise.resolve(function() {})); // We've processed the handler stack. let's clear it.
        this.showDirectiveStack = [];
        this.showDirectiveLastElement = undefined;
      };
      Component.prototype.updateElement = function(el, extraVars) {
        this.resolveBoundAttributes(el, false, extraVars);
      };
      Component.prototype.registerListeners = function(el, extraVars) {
        var _this = this;
        getXAttrs(el, this).forEach(function(_a) {
          var type = _a.type,
            value = _a.value,
            modifiers = _a.modifiers,
            expression = _a.expression;
          switch (type) {
            case 'on':
              registerListener(_this, el, value, modifiers, expression, extraVars);
              break;
            case 'model':
              registerModelListener(_this, el, modifiers, expression, extraVars);
              break;
          }
        });
      };
      Component.prototype.resolveBoundAttributes = function(el, initialUpdate, extraVars) {
        var _this = this;
        if (initialUpdate === void 0) {
          initialUpdate = false;
        }
        var attrs = getXAttrs(el, this);
        if (el.type !== undefined && el.type === 'radio') {
          // If there's an x-model on a radio input, move it to end of attribute list
          // to ensure that x-bind:value (if present) is processed first.
          var modelIdx = attrs.findIndex(function(attr) {
            return attr.type === 'model';
          });
          if (modelIdx > -1) {
            attrs.push(attrs.splice(modelIdx, 1)[0]);
          }
        }
        attrs.forEach(function(_a) {
          var type = _a.type,
            value = _a.value,
            modifiers = _a.modifiers,
            expression = _a.expression;
          switch (type) {
            case 'model':
              handleAttributeBindingDirective(_this, el, 'value', expression, extraVars, type, modifiers);
              break;
            case 'bind':
              // The :key binding on an x-for is special, ignore it.
              if (el.tagName.toLowerCase() === 'template' && value === 'key')
                return;
              handleAttributeBindingDirective(_this, el, value, expression, extraVars, type, modifiers);
              break;
            case 'text':
              var output = _this.evaluateReturnExpression(el, expression, extraVars);
              handleTextDirective(el, output, expression);
              break;
            case 'html':
              handleHtmlDirective(_this, el, expression, extraVars);
              break;
            case 'show':
              var output = _this.evaluateReturnExpression(el, expression, extraVars);
              handleShowDirective(_this, el, output, modifiers, initialUpdate);
              break;
            case 'if':
              // If this element also has x-for on it, don't process x-if.
              // We will let the "x-for" directive handle the "if"ing.
              if (attrs.some(function(i) {
                  return i.type === 'for';
                }))
                return;
              var output = _this.evaluateReturnExpression(el, expression, extraVars);
              handleIfDirective(_this, el, output, initialUpdate, extraVars);
              break;
            case 'for':
              handleForDirective(_this, el, expression, initialUpdate, extraVars);
              break;
            case 'cloak':
              el.removeAttribute('x-cloak');
              break;
          }
        });
      };
      Component.prototype.evaluateReturnExpression = function(el, expression, extraVars) {
        if (extraVars === void 0) {
          extraVars = function() {};
        }
        return saferEval(expression, this.$data, _objectSpread2(_objectSpread2({}, extraVars()), {}, {
          $dispatch: this.getDispatchFunction(el)
        }));
      };
      Component.prototype.evaluateCommandExpression = function(el, expression, extraVars) {
        if (extraVars === void 0) {
          extraVars = function() {};
        }
        return saferEvalNoReturn(expression, this.$data, _objectSpread2(_objectSpread2({}, extraVars()), {}, {
          $dispatch: this.getDispatchFunction(el)
        }));
      };
      Component.prototype.getDispatchFunction = function(el) {
        return function(event, detail) {
          if (detail === void 0) {
            detail = {};
          }
          el.dispatchEvent(new CustomEvent(event, {
            detail: detail,
            bubbles: true
          }));
        };
      };
      Component.prototype.listenForNewElementsToInitialize = function() {
        var _this = this;
        var targetNode = this.$el;
        var observerOptions = {
          childList: true,
          attributes: true,
          subtree: true
        };
        var observer = new MutationObserver(function(mutations) {
          var _loop_2 = function(i) {
            // Filter out mutations triggered from child components.
            var closestParentComponent = mutations[i].target.closest('[x-data]');
            if (!(closestParentComponent && closestParentComponent.isSameNode(_this.$el)))
              return "continue";
            if (mutations[i].type === 'attributes' && mutations[i].attributeName === 'x-data') {
              var rawData_1 = saferEval(mutations[i].target.getAttribute('x-data') || '{}', {
                $el: _this.$el
              });
              Object.keys(rawData_1).forEach(function(key) {
                if (_this.$data[key] !== rawData_1[key]) {
                  _this.$data[key] = rawData_1[key];
                }
              });
            }
            if (mutations[i].addedNodes.length > 0) {
              mutations[i].addedNodes.forEach(function(node) {
                if (node.nodeType !== 1 || node.__x_inserted_me)
                  return;
                if (node.matches('[x-data]') && !node.__x) {
                  node.__x = new Component(node);
                  return;
                }
                _this.initializeElements(node);
              });
            }
          };
          for (var i = 0; i < mutations.length; i++) {
            _loop_2(i);
          }
        });
        observer.observe(targetNode, observerOptions);
      };
      Component.prototype.getRefsProxy = function() {
        var self = this;
        var refObj = {};
        // One of the goals of this is to not hold elements in memory, but rather re-evaluate
        // the DOM when the system needs something from it. This way, the framework is flexible and
        // friendly to outside DOM changes from libraries like Vue/Livewire.
        // For this reason, I'm using an "on-demand" proxy to fake a "$refs" object.
        return new Proxy(refObj, {
          get: function(object, property) {
            if (property === '$isAlpineProxy')
              return true;
            var ref; // We can't just query the DOM because it's hard to filter out refs in
            // nested components.
            self.walkAndSkipNestedComponents(self.$el, function(el) {
              if (el.hasAttribute('x-ref') && el.getAttribute('x-ref') === property) {
                ref = el;
              }
            });
            return ref;
          }
        });
      };
      return Component;
    }());
    var Alpine = {
      version: "2.5.0",
      pauseMutationObserver: false,
      magicProperties: {},
      onComponentInitializeds: [],
      start: function start() {
        return __awaiter(this, void 0, void 0, function() {
          var _this = this;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                if (!!isTesting()) return [3 /*break*/ , 2];
                return [4 /*yield*/ , domReady()];
              case 1:
                _a.sent();
                _a.label = 2;
              case 2:
                this.discoverComponents(function(el) {
                  _this.initializeComponent(el);
                }); // It's easier and more performant to just support Turbolinks than listen
                // to MutationObserver mutations at the document level.
                document.addEventListener("turbolinks:load", function() {
                  _this.discoverUninitializedComponents(function(el) {
                    _this.initializeComponent(el);
                  });
                });
                this.listenForNewUninitializedComponentsAtRunTime(function(el) {
                  _this.initializeComponent(el);
                });
                return [2 /*return*/ ];
            }
          });
        });
      },
      discoverComponents: function discoverComponents(callback) {
        var rootEls = document.querySelectorAll('[x-data]');
        rootEls.forEach(function(rootEl) {
          callback(rootEl);
        });
      },
      discoverUninitializedComponents: function discoverUninitializedComponents(callback, el) {
        if (el === void 0) {
          el = null;
        }
        var rootEls = (el || document).querySelectorAll('[x-data]');
        Array.from(rootEls).filter(function(el) {
          return el.__x === undefined;
        }).forEach(function(rootEl) {
          callback(rootEl);
        });
      },
      listenForNewUninitializedComponentsAtRunTime: function listenForNewUninitializedComponentsAtRunTime(callback) {
        var _this = this;
        var targetNode = document.querySelector('body');
        var observerOptions = {
          childList: true,
          attributes: true,
          subtree: true
        };
        var observer = new MutationObserver(function(mutations) {
          if (_this.pauseMutationObserver)
            return;
          for (var i = 0; i < mutations.length; i++) {
            if (mutations[i].addedNodes.length > 0) {
              mutations[i].addedNodes.forEach(function(node) {
                // Discard non-element nodes (like line-breaks)
                if (node.nodeType !== 1)
                  return; // Discard any changes happening within an existing component.
                // They will take care of themselves.
                if (node.parentElement && node.parentElement.closest('[x-data]'))
                  return;
                _this.discoverUninitializedComponents(function(el) {
                  _this.initializeComponent(el);
                }, node.parentElement);
              });
            }
          }
        });
        observer.observe(targetNode, observerOptions);
      },
      initializeComponent: function initializeComponent(el) {
        if (!el.__x) {
          // Wrap in a try/catch so that we don't prevent other components
          // from initializing when one component contains an error.
          try {
            el.__x = new Component(el);
          } catch (error) {
            setTimeout(function() {
              throw error;
            }, 0);
          }
        }
      },
      clone: function clone(component, newEl) {
        if (!newEl.__x) {
          newEl.__x = new Component(newEl, component);
        }
      },
      addMagicProperty: function addMagicProperty(name, callback) {
        this.magicProperties[name] = callback;
      },
      onComponentInitialized: function onComponentInitialized(callback) {
        this.onComponentInitializeds.push(callback);
      }
    };
    if (!isTesting()) {
      window.Alpine = Alpine;
      if (window.deferLoadingAlpine) {
        window.deferLoadingAlpine(function() {
          window.Alpine.start();
        });
      } else {
        window.Alpine.start();
      }
    }
    return Alpine;
  })));
}

require('main.ts')
var ZT = Object.defineProperty;
var eR = (y, S, b) => S in y ? ZT(y, S, { enumerable: !0, configurable: !0, writable: !0, value: b }) : y[S] = b;
var L0 = (y, S, b) => eR(y, typeof S != "symbol" ? S + "" : S, b);
var B0 = { exports: {} }, cv = {}, V0 = { exports: {} }, Mt = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var O5;
function tR() {
  if (O5) return Mt;
  O5 = 1;
  var y = Symbol.for("react.element"), S = Symbol.for("react.portal"), b = Symbol.for("react.fragment"), C = Symbol.for("react.strict_mode"), L = Symbol.for("react.profiler"), Y = Symbol.for("react.provider"), Z = Symbol.for("react.context"), g = Symbol.for("react.forward_ref"), oe = Symbol.for("react.suspense"), ee = Symbol.for("react.memo"), I = Symbol.for("react.lazy"), fe = Symbol.iterator;
  function J(k) {
    return k === null || typeof k != "object" ? null : (k = fe && k[fe] || k["@@iterator"], typeof k == "function" ? k : null);
  }
  var De = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, ae = Object.assign, H = {};
  function ue(k, M, se) {
    this.props = k, this.context = M, this.refs = H, this.updater = se || De;
  }
  ue.prototype.isReactComponent = {}, ue.prototype.setState = function(k, M) {
    if (typeof k != "object" && typeof k != "function" && k != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, k, M, "setState");
  }, ue.prototype.forceUpdate = function(k) {
    this.updater.enqueueForceUpdate(this, k, "forceUpdate");
  };
  function et() {
  }
  et.prototype = ue.prototype;
  function ot(k, M, se) {
    this.props = k, this.context = M, this.refs = H, this.updater = se || De;
  }
  var Pe = ot.prototype = new et();
  Pe.constructor = ot, ae(Pe, ue.prototype), Pe.isPureReactComponent = !0;
  var Me = Array.isArray, G = Object.prototype.hasOwnProperty, be = { current: null }, it = { key: !0, ref: !0, __self: !0, __source: !0 };
  function qe(k, M, se) {
    var he, pe = {}, Ee = null, Ce = null;
    if (M != null) for (he in M.ref !== void 0 && (Ce = M.ref), M.key !== void 0 && (Ee = "" + M.key), M) G.call(M, he) && !it.hasOwnProperty(he) && (pe[he] = M[he]);
    var me = arguments.length - 2;
    if (me === 1) pe.children = se;
    else if (1 < me) {
      for (var Ae = Array(me), Ye = 0; Ye < me; Ye++) Ae[Ye] = arguments[Ye + 2];
      pe.children = Ae;
    }
    if (k && k.defaultProps) for (he in me = k.defaultProps, me) pe[he] === void 0 && (pe[he] = me[he]);
    return { $$typeof: y, type: k, key: Ee, ref: Ce, props: pe, _owner: be.current };
  }
  function Wt(k, M) {
    return { $$typeof: y, type: k.type, key: M, ref: k.ref, props: k.props, _owner: k._owner };
  }
  function Ct(k) {
    return typeof k == "object" && k !== null && k.$$typeof === y;
  }
  function Vt(k) {
    var M = { "=": "=0", ":": "=2" };
    return "$" + k.replace(/[=:]/g, function(se) {
      return M[se];
    });
  }
  var zt = /\/+/g;
  function xt(k, M) {
    return typeof k == "object" && k !== null && k.key != null ? Vt("" + k.key) : M.toString(36);
  }
  function We(k, M, se, he, pe) {
    var Ee = typeof k;
    (Ee === "undefined" || Ee === "boolean") && (k = null);
    var Ce = !1;
    if (k === null) Ce = !0;
    else switch (Ee) {
      case "string":
      case "number":
        Ce = !0;
        break;
      case "object":
        switch (k.$$typeof) {
          case y:
          case S:
            Ce = !0;
        }
    }
    if (Ce) return Ce = k, pe = pe(Ce), k = he === "" ? "." + xt(Ce, 0) : he, Me(pe) ? (se = "", k != null && (se = k.replace(zt, "$&/") + "/"), We(pe, M, se, "", function(Ye) {
      return Ye;
    })) : pe != null && (Ct(pe) && (pe = Wt(pe, se + (!pe.key || Ce && Ce.key === pe.key ? "" : ("" + pe.key).replace(zt, "$&/") + "/") + k)), M.push(pe)), 1;
    if (Ce = 0, he = he === "" ? "." : he + ":", Me(k)) for (var me = 0; me < k.length; me++) {
      Ee = k[me];
      var Ae = he + xt(Ee, me);
      Ce += We(Ee, M, se, Ae, pe);
    }
    else if (Ae = J(k), typeof Ae == "function") for (k = Ae.call(k), me = 0; !(Ee = k.next()).done; ) Ee = Ee.value, Ae = he + xt(Ee, me++), Ce += We(Ee, M, se, Ae, pe);
    else if (Ee === "object") throw M = String(k), Error("Objects are not valid as a React child (found: " + (M === "[object Object]" ? "object with keys {" + Object.keys(k).join(", ") + "}" : M) + "). If you meant to render a collection of children, use an array instead.");
    return Ce;
  }
  function Dt(k, M, se) {
    if (k == null) return k;
    var he = [], pe = 0;
    return We(k, he, "", "", function(Ee) {
      return M.call(se, Ee, pe++);
    }), he;
  }
  function gt(k) {
    if (k._status === -1) {
      var M = k._result;
      M = M(), M.then(function(se) {
        (k._status === 0 || k._status === -1) && (k._status = 1, k._result = se);
      }, function(se) {
        (k._status === 0 || k._status === -1) && (k._status = 2, k._result = se);
      }), k._status === -1 && (k._status = 0, k._result = M);
    }
    if (k._status === 1) return k._result.default;
    throw k._result;
  }
  var tt = { current: null }, X = { transition: null }, Ne = { ReactCurrentDispatcher: tt, ReactCurrentBatchConfig: X, ReactCurrentOwner: be };
  function ye() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return Mt.Children = { map: Dt, forEach: function(k, M, se) {
    Dt(k, function() {
      M.apply(this, arguments);
    }, se);
  }, count: function(k) {
    var M = 0;
    return Dt(k, function() {
      M++;
    }), M;
  }, toArray: function(k) {
    return Dt(k, function(M) {
      return M;
    }) || [];
  }, only: function(k) {
    if (!Ct(k)) throw Error("React.Children.only expected to receive a single React element child.");
    return k;
  } }, Mt.Component = ue, Mt.Fragment = b, Mt.Profiler = L, Mt.PureComponent = ot, Mt.StrictMode = C, Mt.Suspense = oe, Mt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ne, Mt.act = ye, Mt.cloneElement = function(k, M, se) {
    if (k == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + k + ".");
    var he = ae({}, k.props), pe = k.key, Ee = k.ref, Ce = k._owner;
    if (M != null) {
      if (M.ref !== void 0 && (Ee = M.ref, Ce = be.current), M.key !== void 0 && (pe = "" + M.key), k.type && k.type.defaultProps) var me = k.type.defaultProps;
      for (Ae in M) G.call(M, Ae) && !it.hasOwnProperty(Ae) && (he[Ae] = M[Ae] === void 0 && me !== void 0 ? me[Ae] : M[Ae]);
    }
    var Ae = arguments.length - 2;
    if (Ae === 1) he.children = se;
    else if (1 < Ae) {
      me = Array(Ae);
      for (var Ye = 0; Ye < Ae; Ye++) me[Ye] = arguments[Ye + 2];
      he.children = me;
    }
    return { $$typeof: y, type: k.type, key: pe, ref: Ee, props: he, _owner: Ce };
  }, Mt.createContext = function(k) {
    return k = { $$typeof: Z, _currentValue: k, _currentValue2: k, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, k.Provider = { $$typeof: Y, _context: k }, k.Consumer = k;
  }, Mt.createElement = qe, Mt.createFactory = function(k) {
    var M = qe.bind(null, k);
    return M.type = k, M;
  }, Mt.createRef = function() {
    return { current: null };
  }, Mt.forwardRef = function(k) {
    return { $$typeof: g, render: k };
  }, Mt.isValidElement = Ct, Mt.lazy = function(k) {
    return { $$typeof: I, _payload: { _status: -1, _result: k }, _init: gt };
  }, Mt.memo = function(k, M) {
    return { $$typeof: ee, type: k, compare: M === void 0 ? null : M };
  }, Mt.startTransition = function(k) {
    var M = X.transition;
    X.transition = {};
    try {
      k();
    } finally {
      X.transition = M;
    }
  }, Mt.unstable_act = ye, Mt.useCallback = function(k, M) {
    return tt.current.useCallback(k, M);
  }, Mt.useContext = function(k) {
    return tt.current.useContext(k);
  }, Mt.useDebugValue = function() {
  }, Mt.useDeferredValue = function(k) {
    return tt.current.useDeferredValue(k);
  }, Mt.useEffect = function(k, M) {
    return tt.current.useEffect(k, M);
  }, Mt.useId = function() {
    return tt.current.useId();
  }, Mt.useImperativeHandle = function(k, M, se) {
    return tt.current.useImperativeHandle(k, M, se);
  }, Mt.useInsertionEffect = function(k, M) {
    return tt.current.useInsertionEffect(k, M);
  }, Mt.useLayoutEffect = function(k, M) {
    return tt.current.useLayoutEffect(k, M);
  }, Mt.useMemo = function(k, M) {
    return tt.current.useMemo(k, M);
  }, Mt.useReducer = function(k, M, se) {
    return tt.current.useReducer(k, M, se);
  }, Mt.useRef = function(k) {
    return tt.current.useRef(k);
  }, Mt.useState = function(k) {
    return tt.current.useState(k);
  }, Mt.useSyncExternalStore = function(k, M, se) {
    return tt.current.useSyncExternalStore(k, M, se);
  }, Mt.useTransition = function() {
    return tt.current.useTransition();
  }, Mt.version = "18.3.1", Mt;
}
var pv = { exports: {} };
pv.exports;
var z5;
function rR() {
  return z5 || (z5 = 1, function(y, S) {
    var b = {};
    /**
     * @license React
     * react.development.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    b.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var C = "18.3.1", L = Symbol.for("react.element"), Y = Symbol.for("react.portal"), Z = Symbol.for("react.fragment"), g = Symbol.for("react.strict_mode"), oe = Symbol.for("react.profiler"), ee = Symbol.for("react.provider"), I = Symbol.for("react.context"), fe = Symbol.for("react.forward_ref"), J = Symbol.for("react.suspense"), De = Symbol.for("react.suspense_list"), ae = Symbol.for("react.memo"), H = Symbol.for("react.lazy"), ue = Symbol.for("react.offscreen"), et = Symbol.iterator, ot = "@@iterator";
      function Pe(h) {
        if (h === null || typeof h != "object")
          return null;
        var T = et && h[et] || h[ot];
        return typeof T == "function" ? T : null;
      }
      var Me = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, G = {
        transition: null
      }, be = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, it = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, qe = {}, Wt = null;
      function Ct(h) {
        Wt = h;
      }
      qe.setExtraStackFrame = function(h) {
        Wt = h;
      }, qe.getCurrentStack = null, qe.getStackAddendum = function() {
        var h = "";
        Wt && (h += Wt);
        var T = qe.getCurrentStack;
        return T && (h += T() || ""), h;
      };
      var Vt = !1, zt = !1, xt = !1, We = !1, Dt = !1, gt = {
        ReactCurrentDispatcher: Me,
        ReactCurrentBatchConfig: G,
        ReactCurrentOwner: it
      };
      gt.ReactDebugCurrentFrame = qe, gt.ReactCurrentActQueue = be;
      function tt(h) {
        {
          for (var T = arguments.length, P = new Array(T > 1 ? T - 1 : 0), $ = 1; $ < T; $++)
            P[$ - 1] = arguments[$];
          Ne("warn", h, P);
        }
      }
      function X(h) {
        {
          for (var T = arguments.length, P = new Array(T > 1 ? T - 1 : 0), $ = 1; $ < T; $++)
            P[$ - 1] = arguments[$];
          Ne("error", h, P);
        }
      }
      function Ne(h, T, P) {
        {
          var $ = gt.ReactDebugCurrentFrame, de = $.getStackAddendum();
          de !== "" && (T += "%s", P = P.concat([de]));
          var Fe = P.map(function(Oe) {
            return String(Oe);
          });
          Fe.unshift("Warning: " + T), Function.prototype.apply.call(console[h], console, Fe);
        }
      }
      var ye = {};
      function k(h, T) {
        {
          var P = h.constructor, $ = P && (P.displayName || P.name) || "ReactClass", de = $ + "." + T;
          if (ye[de])
            return;
          X("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", T, $), ye[de] = !0;
        }
      }
      var M = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(h) {
          return !1;
        },
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function(h, T, P) {
          k(h, "forceUpdate");
        },
        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function(h, T, P, $) {
          k(h, "replaceState");
        },
        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function(h, T, P, $) {
          k(h, "setState");
        }
      }, se = Object.assign, he = {};
      Object.freeze(he);
      function pe(h, T, P) {
        this.props = h, this.context = T, this.refs = he, this.updater = P || M;
      }
      pe.prototype.isReactComponent = {}, pe.prototype.setState = function(h, T) {
        if (typeof h != "object" && typeof h != "function" && h != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, h, T, "setState");
      }, pe.prototype.forceUpdate = function(h) {
        this.updater.enqueueForceUpdate(this, h, "forceUpdate");
      };
      {
        var Ee = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, Ce = function(h, T) {
          Object.defineProperty(pe.prototype, h, {
            get: function() {
              tt("%s(...) is deprecated in plain JavaScript React classes. %s", T[0], T[1]);
            }
          });
        };
        for (var me in Ee)
          Ee.hasOwnProperty(me) && Ce(me, Ee[me]);
      }
      function Ae() {
      }
      Ae.prototype = pe.prototype;
      function Ye(h, T, P) {
        this.props = h, this.context = T, this.refs = he, this.updater = P || M;
      }
      var Je = Ye.prototype = new Ae();
      Je.constructor = Ye, se(Je, pe.prototype), Je.isPureReactComponent = !0;
      function Pt() {
        var h = {
          current: null
        };
        return Object.seal(h), h;
      }
      var ve = Array.isArray;
      function Yt(h) {
        return ve(h);
      }
      function Or(h) {
        {
          var T = typeof Symbol == "function" && Symbol.toStringTag, P = T && h[Symbol.toStringTag] || h.constructor.name || "Object";
          return P;
        }
      }
      function Cr(h) {
        try {
          return Pr(h), !1;
        } catch {
          return !0;
        }
      }
      function Pr(h) {
        return "" + h;
      }
      function ha(h) {
        if (Cr(h))
          return X("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Or(h)), Pr(h);
      }
      function Ka(h, T, P) {
        var $ = h.displayName;
        if ($)
          return $;
        var de = T.displayName || T.name || "";
        return de !== "" ? P + "(" + de + ")" : P;
      }
      function zn(h) {
        return h.displayName || "Context";
      }
      function Qr(h) {
        if (h == null)
          return null;
        if (typeof h.tag == "number" && X("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof h == "function")
          return h.displayName || h.name || null;
        if (typeof h == "string")
          return h;
        switch (h) {
          case Z:
            return "Fragment";
          case Y:
            return "Portal";
          case oe:
            return "Profiler";
          case g:
            return "StrictMode";
          case J:
            return "Suspense";
          case De:
            return "SuspenseList";
        }
        if (typeof h == "object")
          switch (h.$$typeof) {
            case I:
              var T = h;
              return zn(T) + ".Consumer";
            case ee:
              var P = h;
              return zn(P._context) + ".Provider";
            case fe:
              return Ka(h, h.render, "ForwardRef");
            case ae:
              var $ = h.displayName || null;
              return $ !== null ? $ : Qr(h.type) || "Memo";
            case H: {
              var de = h, Fe = de._payload, Oe = de._init;
              try {
                return Qr(Oe(Fe));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var Jr = Object.prototype.hasOwnProperty, Zr = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, kn, Ja, Fr;
      Fr = {};
      function sn(h) {
        if (Jr.call(h, "ref")) {
          var T = Object.getOwnPropertyDescriptor(h, "ref").get;
          if (T && T.isReactWarning)
            return !1;
        }
        return h.ref !== void 0;
      }
      function qn(h) {
        if (Jr.call(h, "key")) {
          var T = Object.getOwnPropertyDescriptor(h, "key").get;
          if (T && T.isReactWarning)
            return !1;
        }
        return h.key !== void 0;
      }
      function Fo(h, T) {
        var P = function() {
          kn || (kn = !0, X("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", T));
        };
        P.isReactWarning = !0, Object.defineProperty(h, "key", {
          get: P,
          configurable: !0
        });
      }
      function ma(h, T) {
        var P = function() {
          Ja || (Ja = !0, X("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", T));
        };
        P.isReactWarning = !0, Object.defineProperty(h, "ref", {
          get: P,
          configurable: !0
        });
      }
      function ge(h) {
        if (typeof h.ref == "string" && it.current && h.__self && it.current.stateNode !== h.__self) {
          var T = Qr(it.current.type);
          Fr[T] || (X('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', T, h.ref), Fr[T] = !0);
        }
      }
      var Ge = function(h, T, P, $, de, Fe, Oe) {
        var nt = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: L,
          // Built-in properties that belong on the element
          type: h,
          key: T,
          ref: P,
          props: Oe,
          // Record the component responsible for creating this element.
          _owner: Fe
        };
        return nt._store = {}, Object.defineProperty(nt._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(nt, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: $
        }), Object.defineProperty(nt, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: de
        }), Object.freeze && (Object.freeze(nt.props), Object.freeze(nt)), nt;
      };
      function mt(h, T, P) {
        var $, de = {}, Fe = null, Oe = null, nt = null, wt = null;
        if (T != null) {
          sn(T) && (Oe = T.ref, ge(T)), qn(T) && (ha(T.key), Fe = "" + T.key), nt = T.__self === void 0 ? null : T.__self, wt = T.__source === void 0 ? null : T.__source;
          for ($ in T)
            Jr.call(T, $) && !Zr.hasOwnProperty($) && (de[$] = T[$]);
        }
        var Xt = arguments.length - 2;
        if (Xt === 1)
          de.children = P;
        else if (Xt > 1) {
          for (var rr = Array(Xt), nr = 0; nr < Xt; nr++)
            rr[nr] = arguments[nr + 2];
          Object.freeze && Object.freeze(rr), de.children = rr;
        }
        if (h && h.defaultProps) {
          var vt = h.defaultProps;
          for ($ in vt)
            de[$] === void 0 && (de[$] = vt[$]);
        }
        if (Fe || Oe) {
          var ur = typeof h == "function" ? h.displayName || h.name || "Unknown" : h;
          Fe && Fo(de, ur), Oe && ma(de, ur);
        }
        return Ge(h, Fe, Oe, nt, wt, it.current, de);
      }
      function It(h, T) {
        var P = Ge(h.type, T, h.ref, h._self, h._source, h._owner, h.props);
        return P;
      }
      function vr(h, T, P) {
        if (h == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + h + ".");
        var $, de = se({}, h.props), Fe = h.key, Oe = h.ref, nt = h._self, wt = h._source, Xt = h._owner;
        if (T != null) {
          sn(T) && (Oe = T.ref, Xt = it.current), qn(T) && (ha(T.key), Fe = "" + T.key);
          var rr;
          h.type && h.type.defaultProps && (rr = h.type.defaultProps);
          for ($ in T)
            Jr.call(T, $) && !Zr.hasOwnProperty($) && (T[$] === void 0 && rr !== void 0 ? de[$] = rr[$] : de[$] = T[$]);
        }
        var nr = arguments.length - 2;
        if (nr === 1)
          de.children = P;
        else if (nr > 1) {
          for (var vt = Array(nr), ur = 0; ur < nr; ur++)
            vt[ur] = arguments[ur + 2];
          de.children = vt;
        }
        return Ge(h.type, Fe, Oe, nt, wt, Xt, de);
      }
      function hr(h) {
        return typeof h == "object" && h !== null && h.$$typeof === L;
      }
      var mr = ".", en = ":";
      function fr(h) {
        var T = /[=:]/g, P = {
          "=": "=0",
          ":": "=2"
        }, $ = h.replace(T, function(de) {
          return P[de];
        });
        return "$" + $;
      }
      var er = !1, $t = /\/+/g;
      function ga(h) {
        return h.replace($t, "$&/");
      }
      function za(h, T) {
        return typeof h == "object" && h !== null && h.key != null ? (ha(h.key), fr("" + h.key)) : T.toString(36);
      }
      function La(h, T, P, $, de) {
        var Fe = typeof h;
        (Fe === "undefined" || Fe === "boolean") && (h = null);
        var Oe = !1;
        if (h === null)
          Oe = !0;
        else
          switch (Fe) {
            case "string":
            case "number":
              Oe = !0;
              break;
            case "object":
              switch (h.$$typeof) {
                case L:
                case Y:
                  Oe = !0;
              }
          }
        if (Oe) {
          var nt = h, wt = de(nt), Xt = $ === "" ? mr + za(nt, 0) : $;
          if (Yt(wt)) {
            var rr = "";
            Xt != null && (rr = ga(Xt) + "/"), La(wt, T, rr, "", function(df) {
              return df;
            });
          } else wt != null && (hr(wt) && (wt.key && (!nt || nt.key !== wt.key) && ha(wt.key), wt = It(
            wt,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            P + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            (wt.key && (!nt || nt.key !== wt.key) ? (
              // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
              // eslint-disable-next-line react-internal/safe-string-coercion
              ga("" + wt.key) + "/"
            ) : "") + Xt
          )), T.push(wt));
          return 1;
        }
        var nr, vt, ur = 0, Lr = $ === "" ? mr : $ + en;
        if (Yt(h))
          for (var cl = 0; cl < h.length; cl++)
            nr = h[cl], vt = Lr + za(nr, cl), ur += La(nr, T, P, vt, de);
        else {
          var lu = Pe(h);
          if (typeof lu == "function") {
            var qo = h;
            lu === qo.entries && (er || tt("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), er = !0);
            for (var dl = lu.call(qo), su, cf = 0; !(su = dl.next()).done; )
              nr = su.value, vt = Lr + za(nr, cf++), ur += La(nr, T, P, vt, de);
          } else if (Fe === "object") {
            var kc = String(h);
            throw new Error("Objects are not valid as a React child (found: " + (kc === "[object Object]" ? "object with keys {" + Object.keys(h).join(", ") + "}" : kc) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return ur;
      }
      function Ho(h, T, P) {
        if (h == null)
          return h;
        var $ = [], de = 0;
        return La(h, $, "", "", function(Fe) {
          return T.call(P, Fe, de++);
        }), $;
      }
      function rl(h) {
        var T = 0;
        return Ho(h, function() {
          T++;
        }), T;
      }
      function nl(h, T, P) {
        Ho(h, function() {
          T.apply(this, arguments);
        }, P);
      }
      function Bo(h) {
        return Ho(h, function(T) {
          return T;
        }) || [];
      }
      function al(h) {
        if (!hr(h))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return h;
      }
      function ho(h) {
        var T = {
          $$typeof: I,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: h,
          _currentValue2: h,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null,
          // Add these to use same hidden class in VM as ServerContext
          _defaultValue: null,
          _globalName: null
        };
        T.Provider = {
          $$typeof: ee,
          _context: T
        };
        var P = !1, $ = !1, de = !1;
        {
          var Fe = {
            $$typeof: I,
            _context: T
          };
          Object.defineProperties(Fe, {
            Provider: {
              get: function() {
                return $ || ($ = !0, X("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), T.Provider;
              },
              set: function(Oe) {
                T.Provider = Oe;
              }
            },
            _currentValue: {
              get: function() {
                return T._currentValue;
              },
              set: function(Oe) {
                T._currentValue = Oe;
              }
            },
            _currentValue2: {
              get: function() {
                return T._currentValue2;
              },
              set: function(Oe) {
                T._currentValue2 = Oe;
              }
            },
            _threadCount: {
              get: function() {
                return T._threadCount;
              },
              set: function(Oe) {
                T._threadCount = Oe;
              }
            },
            Consumer: {
              get: function() {
                return P || (P = !0, X("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), T.Consumer;
              }
            },
            displayName: {
              get: function() {
                return T.displayName;
              },
              set: function(Oe) {
                de || (tt("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", Oe), de = !0);
              }
            }
          }), T.Consumer = Fe;
        }
        return T._currentRenderer = null, T._currentRenderer2 = null, T;
      }
      var ya = -1, un = 0, wa = 1, Gn = 2;
      function mo(h) {
        if (h._status === ya) {
          var T = h._result, P = T();
          if (P.then(function(Fe) {
            if (h._status === un || h._status === ya) {
              var Oe = h;
              Oe._status = wa, Oe._result = Fe;
            }
          }, function(Fe) {
            if (h._status === un || h._status === ya) {
              var Oe = h;
              Oe._status = Gn, Oe._result = Fe;
            }
          }), h._status === ya) {
            var $ = h;
            $._status = un, $._result = P;
          }
        }
        if (h._status === wa) {
          var de = h._result;
          return de === void 0 && X(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, de), "default" in de || X(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, de), de.default;
        } else
          throw h._result;
      }
      function go(h) {
        var T = {
          // We use these fields to store the result.
          _status: ya,
          _result: h
        }, P = {
          $$typeof: H,
          _payload: T,
          _init: mo
        };
        {
          var $, de;
          Object.defineProperties(P, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return $;
              },
              set: function(Fe) {
                X("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), $ = Fe, Object.defineProperty(P, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return de;
              },
              set: function(Fe) {
                X("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), de = Fe, Object.defineProperty(P, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return P;
      }
      function Vo(h) {
        h != null && h.$$typeof === ae ? X("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof h != "function" ? X("forwardRef requires a render function but was given %s.", h === null ? "null" : typeof h) : h.length !== 0 && h.length !== 2 && X("forwardRef render functions accept exactly two parameters: props and ref. %s", h.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), h != null && (h.defaultProps != null || h.propTypes != null) && X("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var T = {
          $$typeof: fe,
          render: h
        };
        {
          var P;
          Object.defineProperty(T, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return P;
            },
            set: function($) {
              P = $, !h.name && !h.displayName && (h.displayName = $);
            }
          });
        }
        return T;
      }
      var R;
      R = Symbol.for("react.module.reference");
      function te(h) {
        return !!(typeof h == "string" || typeof h == "function" || h === Z || h === oe || Dt || h === g || h === J || h === De || We || h === ue || Vt || zt || xt || typeof h == "object" && h !== null && (h.$$typeof === H || h.$$typeof === ae || h.$$typeof === ee || h.$$typeof === I || h.$$typeof === fe || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        h.$$typeof === R || h.getModuleId !== void 0));
      }
      function Se(h, T) {
        te(h) || X("memo: The first argument must be a component. Instead received: %s", h === null ? "null" : typeof h);
        var P = {
          $$typeof: ae,
          type: h,
          compare: T === void 0 ? null : T
        };
        {
          var $;
          Object.defineProperty(P, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return $;
            },
            set: function(de) {
              $ = de, !h.name && !h.displayName && (h.displayName = de);
            }
          });
        }
        return P;
      }
      function Te() {
        var h = Me.current;
        return h === null && X(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), h;
      }
      function kt(h) {
        var T = Te();
        if (h._context !== void 0) {
          var P = h._context;
          P.Consumer === h ? X("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : P.Provider === h && X("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return T.useContext(h);
      }
      function ut(h) {
        var T = Te();
        return T.useState(h);
      }
      function Tt(h, T, P) {
        var $ = Te();
        return $.useReducer(h, T, P);
      }
      function yt(h) {
        var T = Te();
        return T.useRef(h);
      }
      function zr(h, T) {
        var P = Te();
        return P.useEffect(h, T);
      }
      function pr(h, T) {
        var P = Te();
        return P.useInsertionEffect(h, T);
      }
      function gr(h, T) {
        var P = Te();
        return P.useLayoutEffect(h, T);
      }
      function En(h, T) {
        var P = Te();
        return P.useCallback(h, T);
      }
      function Za(h, T) {
        var P = Te();
        return P.useMemo(h, T);
      }
      function Qt(h, T, P) {
        var $ = Te();
        return $.useImperativeHandle(h, T, P);
      }
      function br(h, T) {
        {
          var P = Te();
          return P.useDebugValue(h, T);
        }
      }
      function ft() {
        var h = Te();
        return h.useTransition();
      }
      function yo(h) {
        var T = Te();
        return T.useDeferredValue(h);
      }
      function Yo() {
        var h = Te();
        return h.useId();
      }
      function wc(h, T, P) {
        var $ = Te();
        return $.useSyncExternalStore(h, T, P);
      }
      var Io = 0, mi, Kn, tu, Ln, ru, bc, xc;
      function $o() {
      }
      $o.__reactDisabledLog = !0;
      function gi() {
        {
          if (Io === 0) {
            mi = console.log, Kn = console.info, tu = console.warn, Ln = console.error, ru = console.group, bc = console.groupCollapsed, xc = console.groupEnd;
            var h = {
              configurable: !0,
              enumerable: !0,
              value: $o,
              writable: !0
            };
            Object.defineProperties(console, {
              info: h,
              log: h,
              warn: h,
              error: h,
              group: h,
              groupCollapsed: h,
              groupEnd: h
            });
          }
          Io++;
        }
      }
      function Jn() {
        {
          if (Io--, Io === 0) {
            var h = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: se({}, h, {
                value: mi
              }),
              info: se({}, h, {
                value: Kn
              }),
              warn: se({}, h, {
                value: tu
              }),
              error: se({}, h, {
                value: Ln
              }),
              group: se({}, h, {
                value: ru
              }),
              groupCollapsed: se({}, h, {
                value: bc
              }),
              groupEnd: se({}, h, {
                value: xc
              })
            });
          }
          Io < 0 && X("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var wo = gt.ReactCurrentDispatcher, yi;
      function Gl(h, T, P) {
        {
          if (yi === void 0)
            try {
              throw Error();
            } catch (de) {
              var $ = de.stack.trim().match(/\n( *(at )?)/);
              yi = $ && $[1] || "";
            }
          return `
` + yi + h;
        }
      }
      var Qo = !1, ol;
      {
        var il = typeof WeakMap == "function" ? WeakMap : Map;
        ol = new il();
      }
      function wi(h, T) {
        if (!h || Qo)
          return "";
        {
          var P = ol.get(h);
          if (P !== void 0)
            return P;
        }
        var $;
        Qo = !0;
        var de = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var Fe;
        Fe = wo.current, wo.current = null, gi();
        try {
          if (T) {
            var Oe = function() {
              throw Error();
            };
            if (Object.defineProperty(Oe.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(Oe, []);
              } catch (Lr) {
                $ = Lr;
              }
              Reflect.construct(h, [], Oe);
            } else {
              try {
                Oe.call();
              } catch (Lr) {
                $ = Lr;
              }
              h.call(Oe.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (Lr) {
              $ = Lr;
            }
            h();
          }
        } catch (Lr) {
          if (Lr && $ && typeof Lr.stack == "string") {
            for (var nt = Lr.stack.split(`
`), wt = $.stack.split(`
`), Xt = nt.length - 1, rr = wt.length - 1; Xt >= 1 && rr >= 0 && nt[Xt] !== wt[rr]; )
              rr--;
            for (; Xt >= 1 && rr >= 0; Xt--, rr--)
              if (nt[Xt] !== wt[rr]) {
                if (Xt !== 1 || rr !== 1)
                  do
                    if (Xt--, rr--, rr < 0 || nt[Xt] !== wt[rr]) {
                      var nr = `
` + nt[Xt].replace(" at new ", " at ");
                      return h.displayName && nr.includes("<anonymous>") && (nr = nr.replace("<anonymous>", h.displayName)), typeof h == "function" && ol.set(h, nr), nr;
                    }
                  while (Xt >= 1 && rr >= 0);
                break;
              }
          }
        } finally {
          Qo = !1, wo.current = Fe, Jn(), Error.prepareStackTrace = de;
        }
        var vt = h ? h.displayName || h.name : "", ur = vt ? Gl(vt) : "";
        return typeof h == "function" && ol.set(h, ur), ur;
      }
      function nu(h, T, P) {
        return wi(h, !1);
      }
      function au(h) {
        var T = h.prototype;
        return !!(T && T.isReactComponent);
      }
      function Nt(h, T, P) {
        if (h == null)
          return "";
        if (typeof h == "function")
          return wi(h, au(h));
        if (typeof h == "string")
          return Gl(h);
        switch (h) {
          case J:
            return Gl("Suspense");
          case De:
            return Gl("SuspenseList");
        }
        if (typeof h == "object")
          switch (h.$$typeof) {
            case fe:
              return nu(h.render);
            case ae:
              return Nt(h.type, T, P);
            case H: {
              var $ = h, de = $._payload, Fe = $._init;
              try {
                return Nt(Fe(de), T, P);
              } catch {
              }
            }
          }
        return "";
      }
      var ou = {}, Kl = gt.ReactDebugCurrentFrame;
      function At(h) {
        if (h) {
          var T = h._owner, P = Nt(h.type, h._source, T ? T.type : null);
          Kl.setExtraStackFrame(P);
        } else
          Kl.setExtraStackFrame(null);
      }
      function Sc(h, T, P, $, de) {
        {
          var Fe = Function.call.bind(Jr);
          for (var Oe in h)
            if (Fe(h, Oe)) {
              var nt = void 0;
              try {
                if (typeof h[Oe] != "function") {
                  var wt = Error(($ || "React class") + ": " + P + " type `" + Oe + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof h[Oe] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw wt.name = "Invariant Violation", wt;
                }
                nt = h[Oe](T, Oe, $, P, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (Xt) {
                nt = Xt;
              }
              nt && !(nt instanceof Error) && (At(de), X("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", $ || "React class", P, Oe, typeof nt), At(null)), nt instanceof Error && !(nt.message in ou) && (ou[nt.message] = !0, At(de), X("Failed %s type: %s", P, nt.message), At(null));
            }
        }
      }
      function bo(h) {
        if (h) {
          var T = h._owner, P = Nt(h.type, h._source, T ? T.type : null);
          Ct(P);
        } else
          Ct(null);
      }
      var lt;
      lt = !1;
      function ll() {
        if (it.current) {
          var h = Qr(it.current.type);
          if (h)
            return `

Check the render method of \`` + h + "`.";
        }
        return "";
      }
      function tn(h) {
        if (h !== void 0) {
          var T = h.fileName.replace(/^.*[\\\/]/, ""), P = h.lineNumber;
          return `

Check your code at ` + T + ":" + P + ".";
        }
        return "";
      }
      function Zn(h) {
        return h != null ? tn(h.__source) : "";
      }
      var Mn = {};
      function xo(h) {
        var T = ll();
        if (!T) {
          var P = typeof h == "string" ? h : h.displayName || h.name;
          P && (T = `

Check the top-level render call using <` + P + ">.");
        }
        return T;
      }
      function Tr(h, T) {
        if (!(!h._store || h._store.validated || h.key != null)) {
          h._store.validated = !0;
          var P = xo(T);
          if (!Mn[P]) {
            Mn[P] = !0;
            var $ = "";
            h && h._owner && h._owner !== it.current && ($ = " It was passed a child from " + Qr(h._owner.type) + "."), bo(h), X('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', P, $), bo(null);
          }
        }
      }
      function tr(h, T) {
        if (typeof h == "object") {
          if (Yt(h))
            for (var P = 0; P < h.length; P++) {
              var $ = h[P];
              hr($) && Tr($, T);
            }
          else if (hr(h))
            h._store && (h._store.validated = !0);
          else if (h) {
            var de = Pe(h);
            if (typeof de == "function" && de !== h.entries)
              for (var Fe = de.call(h), Oe; !(Oe = Fe.next()).done; )
                hr(Oe.value) && Tr(Oe.value, T);
          }
        }
      }
      function eo(h) {
        {
          var T = h.type;
          if (T == null || typeof T == "string")
            return;
          var P;
          if (typeof T == "function")
            P = T.propTypes;
          else if (typeof T == "object" && (T.$$typeof === fe || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          T.$$typeof === ae))
            P = T.propTypes;
          else
            return;
          if (P) {
            var $ = Qr(T);
            Sc(P, h.props, "prop", $, h);
          } else if (T.PropTypes !== void 0 && !lt) {
            lt = !0;
            var de = Qr(T);
            X("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", de || "Unknown");
          }
          typeof T.getDefaultProps == "function" && !T.getDefaultProps.isReactClassApproved && X("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Ma(h) {
        {
          for (var T = Object.keys(h.props), P = 0; P < T.length; P++) {
            var $ = T[P];
            if ($ !== "children" && $ !== "key") {
              bo(h), X("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", $), bo(null);
              break;
            }
          }
          h.ref !== null && (bo(h), X("Invalid attribute `ref` supplied to `React.Fragment`."), bo(null));
        }
      }
      function Cn(h, T, P) {
        var $ = te(h);
        if (!$) {
          var de = "";
          (h === void 0 || typeof h == "object" && h !== null && Object.keys(h).length === 0) && (de += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Fe = Zn(T);
          Fe ? de += Fe : de += ll();
          var Oe;
          h === null ? Oe = "null" : Yt(h) ? Oe = "array" : h !== void 0 && h.$$typeof === L ? (Oe = "<" + (Qr(h.type) || "Unknown") + " />", de = " Did you accidentally export a JSX literal instead of a component?") : Oe = typeof h, X("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Oe, de);
        }
        var nt = mt.apply(this, arguments);
        if (nt == null)
          return nt;
        if ($)
          for (var wt = 2; wt < arguments.length; wt++)
            tr(arguments[wt], h);
        return h === Z ? Ma(nt) : eo(nt), nt;
      }
      var Nn = !1;
      function uf(h) {
        var T = Cn.bind(null, h);
        return T.type = h, Nn || (Nn = !0, tt("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(T, "type", {
          enumerable: !1,
          get: function() {
            return tt("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: h
            }), h;
          }
        }), T;
      }
      function Jl(h, T, P) {
        for (var $ = vr.apply(this, arguments), de = 2; de < arguments.length; de++)
          tr(arguments[de], $.type);
        return eo($), $;
      }
      function sl(h, T) {
        var P = G.transition;
        G.transition = {};
        var $ = G.transition;
        G.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          h();
        } finally {
          if (G.transition = P, P === null && $._updatedFibers) {
            var de = $._updatedFibers.size;
            de > 10 && tt("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), $._updatedFibers.clear();
          }
        }
      }
      var Zl = !1, es = null;
      function ul(h) {
        if (es === null)
          try {
            var T = ("require" + Math.random()).slice(0, 7), P = y && y[T];
            es = P.call(y, "timers").setImmediate;
          } catch {
            es = function(de) {
              Zl === !1 && (Zl = !0, typeof MessageChannel > "u" && X("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var Fe = new MessageChannel();
              Fe.port1.onmessage = de, Fe.port2.postMessage(void 0);
            };
          }
        return es(h);
      }
      var Na = 0, Aa = !1;
      function bi(h) {
        {
          var T = Na;
          Na++, be.current === null && (be.current = []);
          var P = be.isBatchingLegacy, $;
          try {
            if (be.isBatchingLegacy = !0, $ = h(), !P && be.didScheduleLegacyUpdate) {
              var de = be.current;
              de !== null && (be.didScheduleLegacyUpdate = !1, Xo(de));
            }
          } catch (vt) {
            throw Wo(T), vt;
          } finally {
            be.isBatchingLegacy = P;
          }
          if ($ !== null && typeof $ == "object" && typeof $.then == "function") {
            var Fe = $, Oe = !1, nt = {
              then: function(vt, ur) {
                Oe = !0, Fe.then(function(Lr) {
                  Wo(T), Na === 0 ? ts(Lr, vt, ur) : vt(Lr);
                }, function(Lr) {
                  Wo(T), ur(Lr);
                });
              }
            };
            return !Aa && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              Oe || (Aa = !0, X("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), nt;
          } else {
            var wt = $;
            if (Wo(T), Na === 0) {
              var Xt = be.current;
              Xt !== null && (Xo(Xt), be.current = null);
              var rr = {
                then: function(vt, ur) {
                  be.current === null ? (be.current = [], ts(wt, vt, ur)) : vt(wt);
                }
              };
              return rr;
            } else {
              var nr = {
                then: function(vt, ur) {
                  vt(wt);
                }
              };
              return nr;
            }
          }
        }
      }
      function Wo(h) {
        h !== Na - 1 && X("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Na = h;
      }
      function ts(h, T, P) {
        {
          var $ = be.current;
          if ($ !== null)
            try {
              Xo($), ul(function() {
                $.length === 0 ? (be.current = null, T(h)) : ts(h, T, P);
              });
            } catch (de) {
              P(de);
            }
          else
            T(h);
        }
      }
      var xi = !1;
      function Xo(h) {
        if (!xi) {
          xi = !0;
          var T = 0;
          try {
            for (; T < h.length; T++) {
              var P = h[T];
              do
                P = P(!0);
              while (P !== null);
            }
            h.length = 0;
          } catch ($) {
            throw h = h.slice(T + 1), $;
          } finally {
            xi = !1;
          }
        }
      }
      var rs = Cn, iu = Jl, Ua = uf, ns = {
        map: Ho,
        forEach: nl,
        count: rl,
        toArray: Bo,
        only: al
      };
      S.Children = ns, S.Component = pe, S.Fragment = Z, S.Profiler = oe, S.PureComponent = Ye, S.StrictMode = g, S.Suspense = J, S.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = gt, S.act = bi, S.cloneElement = iu, S.createContext = ho, S.createElement = rs, S.createFactory = Ua, S.createRef = Pt, S.forwardRef = Vo, S.isValidElement = hr, S.lazy = go, S.memo = Se, S.startTransition = sl, S.unstable_act = bi, S.useCallback = En, S.useContext = kt, S.useDebugValue = br, S.useDeferredValue = yo, S.useEffect = zr, S.useId = Yo, S.useImperativeHandle = Qt, S.useInsertionEffect = pr, S.useLayoutEffect = gr, S.useMemo = Za, S.useReducer = Tt, S.useRef = yt, S.useState = ut, S.useSyncExternalStore = wc, S.useTransition = ft, S.version = C, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(pv, pv.exports)), pv.exports;
}
var nR = {};
nR.NODE_ENV === "production" ? V0.exports = tR() : V0.exports = rR();
var po = V0.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var L5;
function aR() {
  if (L5) return cv;
  L5 = 1;
  var y = po, S = Symbol.for("react.element"), b = Symbol.for("react.fragment"), C = Object.prototype.hasOwnProperty, L = y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Y = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Z(g, oe, ee) {
    var I, fe = {}, J = null, De = null;
    ee !== void 0 && (J = "" + ee), oe.key !== void 0 && (J = "" + oe.key), oe.ref !== void 0 && (De = oe.ref);
    for (I in oe) C.call(oe, I) && !Y.hasOwnProperty(I) && (fe[I] = oe[I]);
    if (g && g.defaultProps) for (I in oe = g.defaultProps, oe) fe[I] === void 0 && (fe[I] = oe[I]);
    return { $$typeof: S, type: g, key: J, ref: De, props: fe, _owner: L.current };
  }
  return cv.Fragment = b, cv.jsx = Z, cv.jsxs = Z, cv;
}
var dv = {}, M5;
function oR() {
  if (M5) return dv;
  M5 = 1;
  var y = {};
  /**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  return y.NODE_ENV !== "production" && function() {
    var S = po, b = Symbol.for("react.element"), C = Symbol.for("react.portal"), L = Symbol.for("react.fragment"), Y = Symbol.for("react.strict_mode"), Z = Symbol.for("react.profiler"), g = Symbol.for("react.provider"), oe = Symbol.for("react.context"), ee = Symbol.for("react.forward_ref"), I = Symbol.for("react.suspense"), fe = Symbol.for("react.suspense_list"), J = Symbol.for("react.memo"), De = Symbol.for("react.lazy"), ae = Symbol.for("react.offscreen"), H = Symbol.iterator, ue = "@@iterator";
    function et(R) {
      if (R === null || typeof R != "object")
        return null;
      var te = H && R[H] || R[ue];
      return typeof te == "function" ? te : null;
    }
    var ot = S.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function Pe(R) {
      {
        for (var te = arguments.length, Se = new Array(te > 1 ? te - 1 : 0), Te = 1; Te < te; Te++)
          Se[Te - 1] = arguments[Te];
        Me("error", R, Se);
      }
    }
    function Me(R, te, Se) {
      {
        var Te = ot.ReactDebugCurrentFrame, kt = Te.getStackAddendum();
        kt !== "" && (te += "%s", Se = Se.concat([kt]));
        var ut = Se.map(function(Tt) {
          return String(Tt);
        });
        ut.unshift("Warning: " + te), Function.prototype.apply.call(console[R], console, ut);
      }
    }
    var G = !1, be = !1, it = !1, qe = !1, Wt = !1, Ct;
    Ct = Symbol.for("react.module.reference");
    function Vt(R) {
      return !!(typeof R == "string" || typeof R == "function" || R === L || R === Z || Wt || R === Y || R === I || R === fe || qe || R === ae || G || be || it || typeof R == "object" && R !== null && (R.$$typeof === De || R.$$typeof === J || R.$$typeof === g || R.$$typeof === oe || R.$$typeof === ee || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      R.$$typeof === Ct || R.getModuleId !== void 0));
    }
    function zt(R, te, Se) {
      var Te = R.displayName;
      if (Te)
        return Te;
      var kt = te.displayName || te.name || "";
      return kt !== "" ? Se + "(" + kt + ")" : Se;
    }
    function xt(R) {
      return R.displayName || "Context";
    }
    function We(R) {
      if (R == null)
        return null;
      if (typeof R.tag == "number" && Pe("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof R == "function")
        return R.displayName || R.name || null;
      if (typeof R == "string")
        return R;
      switch (R) {
        case L:
          return "Fragment";
        case C:
          return "Portal";
        case Z:
          return "Profiler";
        case Y:
          return "StrictMode";
        case I:
          return "Suspense";
        case fe:
          return "SuspenseList";
      }
      if (typeof R == "object")
        switch (R.$$typeof) {
          case oe:
            var te = R;
            return xt(te) + ".Consumer";
          case g:
            var Se = R;
            return xt(Se._context) + ".Provider";
          case ee:
            return zt(R, R.render, "ForwardRef");
          case J:
            var Te = R.displayName || null;
            return Te !== null ? Te : We(R.type) || "Memo";
          case De: {
            var kt = R, ut = kt._payload, Tt = kt._init;
            try {
              return We(Tt(ut));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Dt = Object.assign, gt = 0, tt, X, Ne, ye, k, M, se;
    function he() {
    }
    he.__reactDisabledLog = !0;
    function pe() {
      {
        if (gt === 0) {
          tt = console.log, X = console.info, Ne = console.warn, ye = console.error, k = console.group, M = console.groupCollapsed, se = console.groupEnd;
          var R = {
            configurable: !0,
            enumerable: !0,
            value: he,
            writable: !0
          };
          Object.defineProperties(console, {
            info: R,
            log: R,
            warn: R,
            error: R,
            group: R,
            groupCollapsed: R,
            groupEnd: R
          });
        }
        gt++;
      }
    }
    function Ee() {
      {
        if (gt--, gt === 0) {
          var R = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Dt({}, R, {
              value: tt
            }),
            info: Dt({}, R, {
              value: X
            }),
            warn: Dt({}, R, {
              value: Ne
            }),
            error: Dt({}, R, {
              value: ye
            }),
            group: Dt({}, R, {
              value: k
            }),
            groupCollapsed: Dt({}, R, {
              value: M
            }),
            groupEnd: Dt({}, R, {
              value: se
            })
          });
        }
        gt < 0 && Pe("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ce = ot.ReactCurrentDispatcher, me;
    function Ae(R, te, Se) {
      {
        if (me === void 0)
          try {
            throw Error();
          } catch (kt) {
            var Te = kt.stack.trim().match(/\n( *(at )?)/);
            me = Te && Te[1] || "";
          }
        return `
` + me + R;
      }
    }
    var Ye = !1, Je;
    {
      var Pt = typeof WeakMap == "function" ? WeakMap : Map;
      Je = new Pt();
    }
    function ve(R, te) {
      if (!R || Ye)
        return "";
      {
        var Se = Je.get(R);
        if (Se !== void 0)
          return Se;
      }
      var Te;
      Ye = !0;
      var kt = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var ut;
      ut = Ce.current, Ce.current = null, pe();
      try {
        if (te) {
          var Tt = function() {
            throw Error();
          };
          if (Object.defineProperty(Tt.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(Tt, []);
            } catch (br) {
              Te = br;
            }
            Reflect.construct(R, [], Tt);
          } else {
            try {
              Tt.call();
            } catch (br) {
              Te = br;
            }
            R.call(Tt.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (br) {
            Te = br;
          }
          R();
        }
      } catch (br) {
        if (br && Te && typeof br.stack == "string") {
          for (var yt = br.stack.split(`
`), zr = Te.stack.split(`
`), pr = yt.length - 1, gr = zr.length - 1; pr >= 1 && gr >= 0 && yt[pr] !== zr[gr]; )
            gr--;
          for (; pr >= 1 && gr >= 0; pr--, gr--)
            if (yt[pr] !== zr[gr]) {
              if (pr !== 1 || gr !== 1)
                do
                  if (pr--, gr--, gr < 0 || yt[pr] !== zr[gr]) {
                    var En = `
` + yt[pr].replace(" at new ", " at ");
                    return R.displayName && En.includes("<anonymous>") && (En = En.replace("<anonymous>", R.displayName)), typeof R == "function" && Je.set(R, En), En;
                  }
                while (pr >= 1 && gr >= 0);
              break;
            }
        }
      } finally {
        Ye = !1, Ce.current = ut, Ee(), Error.prepareStackTrace = kt;
      }
      var Za = R ? R.displayName || R.name : "", Qt = Za ? Ae(Za) : "";
      return typeof R == "function" && Je.set(R, Qt), Qt;
    }
    function Yt(R, te, Se) {
      return ve(R, !1);
    }
    function Or(R) {
      var te = R.prototype;
      return !!(te && te.isReactComponent);
    }
    function Cr(R, te, Se) {
      if (R == null)
        return "";
      if (typeof R == "function")
        return ve(R, Or(R));
      if (typeof R == "string")
        return Ae(R);
      switch (R) {
        case I:
          return Ae("Suspense");
        case fe:
          return Ae("SuspenseList");
      }
      if (typeof R == "object")
        switch (R.$$typeof) {
          case ee:
            return Yt(R.render);
          case J:
            return Cr(R.type, te, Se);
          case De: {
            var Te = R, kt = Te._payload, ut = Te._init;
            try {
              return Cr(ut(kt), te, Se);
            } catch {
            }
          }
        }
      return "";
    }
    var Pr = Object.prototype.hasOwnProperty, ha = {}, Ka = ot.ReactDebugCurrentFrame;
    function zn(R) {
      if (R) {
        var te = R._owner, Se = Cr(R.type, R._source, te ? te.type : null);
        Ka.setExtraStackFrame(Se);
      } else
        Ka.setExtraStackFrame(null);
    }
    function Qr(R, te, Se, Te, kt) {
      {
        var ut = Function.call.bind(Pr);
        for (var Tt in R)
          if (ut(R, Tt)) {
            var yt = void 0;
            try {
              if (typeof R[Tt] != "function") {
                var zr = Error((Te || "React class") + ": " + Se + " type `" + Tt + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof R[Tt] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw zr.name = "Invariant Violation", zr;
              }
              yt = R[Tt](te, Tt, Te, Se, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (pr) {
              yt = pr;
            }
            yt && !(yt instanceof Error) && (zn(kt), Pe("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Te || "React class", Se, Tt, typeof yt), zn(null)), yt instanceof Error && !(yt.message in ha) && (ha[yt.message] = !0, zn(kt), Pe("Failed %s type: %s", Se, yt.message), zn(null));
          }
      }
    }
    var Jr = Array.isArray;
    function Zr(R) {
      return Jr(R);
    }
    function kn(R) {
      {
        var te = typeof Symbol == "function" && Symbol.toStringTag, Se = te && R[Symbol.toStringTag] || R.constructor.name || "Object";
        return Se;
      }
    }
    function Ja(R) {
      try {
        return Fr(R), !1;
      } catch {
        return !0;
      }
    }
    function Fr(R) {
      return "" + R;
    }
    function sn(R) {
      if (Ja(R))
        return Pe("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", kn(R)), Fr(R);
    }
    var qn = ot.ReactCurrentOwner, Fo = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ma, ge;
    function Ge(R) {
      if (Pr.call(R, "ref")) {
        var te = Object.getOwnPropertyDescriptor(R, "ref").get;
        if (te && te.isReactWarning)
          return !1;
      }
      return R.ref !== void 0;
    }
    function mt(R) {
      if (Pr.call(R, "key")) {
        var te = Object.getOwnPropertyDescriptor(R, "key").get;
        if (te && te.isReactWarning)
          return !1;
      }
      return R.key !== void 0;
    }
    function It(R, te) {
      typeof R.ref == "string" && qn.current;
    }
    function vr(R, te) {
      {
        var Se = function() {
          ma || (ma = !0, Pe("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", te));
        };
        Se.isReactWarning = !0, Object.defineProperty(R, "key", {
          get: Se,
          configurable: !0
        });
      }
    }
    function hr(R, te) {
      {
        var Se = function() {
          ge || (ge = !0, Pe("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", te));
        };
        Se.isReactWarning = !0, Object.defineProperty(R, "ref", {
          get: Se,
          configurable: !0
        });
      }
    }
    var mr = function(R, te, Se, Te, kt, ut, Tt) {
      var yt = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: b,
        // Built-in properties that belong on the element
        type: R,
        key: te,
        ref: Se,
        props: Tt,
        // Record the component responsible for creating this element.
        _owner: ut
      };
      return yt._store = {}, Object.defineProperty(yt._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(yt, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Te
      }), Object.defineProperty(yt, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: kt
      }), Object.freeze && (Object.freeze(yt.props), Object.freeze(yt)), yt;
    };
    function en(R, te, Se, Te, kt) {
      {
        var ut, Tt = {}, yt = null, zr = null;
        Se !== void 0 && (sn(Se), yt = "" + Se), mt(te) && (sn(te.key), yt = "" + te.key), Ge(te) && (zr = te.ref, It(te, kt));
        for (ut in te)
          Pr.call(te, ut) && !Fo.hasOwnProperty(ut) && (Tt[ut] = te[ut]);
        if (R && R.defaultProps) {
          var pr = R.defaultProps;
          for (ut in pr)
            Tt[ut] === void 0 && (Tt[ut] = pr[ut]);
        }
        if (yt || zr) {
          var gr = typeof R == "function" ? R.displayName || R.name || "Unknown" : R;
          yt && vr(Tt, gr), zr && hr(Tt, gr);
        }
        return mr(R, yt, zr, kt, Te, qn.current, Tt);
      }
    }
    var fr = ot.ReactCurrentOwner, er = ot.ReactDebugCurrentFrame;
    function $t(R) {
      if (R) {
        var te = R._owner, Se = Cr(R.type, R._source, te ? te.type : null);
        er.setExtraStackFrame(Se);
      } else
        er.setExtraStackFrame(null);
    }
    var ga;
    ga = !1;
    function za(R) {
      return typeof R == "object" && R !== null && R.$$typeof === b;
    }
    function La() {
      {
        if (fr.current) {
          var R = We(fr.current.type);
          if (R)
            return `

Check the render method of \`` + R + "`.";
        }
        return "";
      }
    }
    function Ho(R) {
      return "";
    }
    var rl = {};
    function nl(R) {
      {
        var te = La();
        if (!te) {
          var Se = typeof R == "string" ? R : R.displayName || R.name;
          Se && (te = `

Check the top-level render call using <` + Se + ">.");
        }
        return te;
      }
    }
    function Bo(R, te) {
      {
        if (!R._store || R._store.validated || R.key != null)
          return;
        R._store.validated = !0;
        var Se = nl(te);
        if (rl[Se])
          return;
        rl[Se] = !0;
        var Te = "";
        R && R._owner && R._owner !== fr.current && (Te = " It was passed a child from " + We(R._owner.type) + "."), $t(R), Pe('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', Se, Te), $t(null);
      }
    }
    function al(R, te) {
      {
        if (typeof R != "object")
          return;
        if (Zr(R))
          for (var Se = 0; Se < R.length; Se++) {
            var Te = R[Se];
            za(Te) && Bo(Te, te);
          }
        else if (za(R))
          R._store && (R._store.validated = !0);
        else if (R) {
          var kt = et(R);
          if (typeof kt == "function" && kt !== R.entries)
            for (var ut = kt.call(R), Tt; !(Tt = ut.next()).done; )
              za(Tt.value) && Bo(Tt.value, te);
        }
      }
    }
    function ho(R) {
      {
        var te = R.type;
        if (te == null || typeof te == "string")
          return;
        var Se;
        if (typeof te == "function")
          Se = te.propTypes;
        else if (typeof te == "object" && (te.$$typeof === ee || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        te.$$typeof === J))
          Se = te.propTypes;
        else
          return;
        if (Se) {
          var Te = We(te);
          Qr(Se, R.props, "prop", Te, R);
        } else if (te.PropTypes !== void 0 && !ga) {
          ga = !0;
          var kt = We(te);
          Pe("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", kt || "Unknown");
        }
        typeof te.getDefaultProps == "function" && !te.getDefaultProps.isReactClassApproved && Pe("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ya(R) {
      {
        for (var te = Object.keys(R.props), Se = 0; Se < te.length; Se++) {
          var Te = te[Se];
          if (Te !== "children" && Te !== "key") {
            $t(R), Pe("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Te), $t(null);
            break;
          }
        }
        R.ref !== null && ($t(R), Pe("Invalid attribute `ref` supplied to `React.Fragment`."), $t(null));
      }
    }
    var un = {};
    function wa(R, te, Se, Te, kt, ut) {
      {
        var Tt = Vt(R);
        if (!Tt) {
          var yt = "";
          (R === void 0 || typeof R == "object" && R !== null && Object.keys(R).length === 0) && (yt += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var zr = Ho();
          zr ? yt += zr : yt += La();
          var pr;
          R === null ? pr = "null" : Zr(R) ? pr = "array" : R !== void 0 && R.$$typeof === b ? (pr = "<" + (We(R.type) || "Unknown") + " />", yt = " Did you accidentally export a JSX literal instead of a component?") : pr = typeof R, Pe("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", pr, yt);
        }
        var gr = en(R, te, Se, kt, ut);
        if (gr == null)
          return gr;
        if (Tt) {
          var En = te.children;
          if (En !== void 0)
            if (Te)
              if (Zr(En)) {
                for (var Za = 0; Za < En.length; Za++)
                  al(En[Za], R);
                Object.freeze && Object.freeze(En);
              } else
                Pe("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              al(En, R);
        }
        if (Pr.call(te, "key")) {
          var Qt = We(R), br = Object.keys(te).filter(function(Yo) {
            return Yo !== "key";
          }), ft = br.length > 0 ? "{key: someKey, " + br.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!un[Qt + ft]) {
            var yo = br.length > 0 ? "{" + br.join(": ..., ") + ": ...}" : "{}";
            Pe(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ft, Qt, yo, Qt), un[Qt + ft] = !0;
          }
        }
        return R === L ? ya(gr) : ho(gr), gr;
      }
    }
    function Gn(R, te, Se) {
      return wa(R, te, Se, !0);
    }
    function mo(R, te, Se) {
      return wa(R, te, Se, !1);
    }
    var go = mo, Vo = Gn;
    dv.Fragment = L, dv.jsx = go, dv.jsxs = Vo;
  }(), dv;
}
var iR = {};
iR.NODE_ENV === "production" ? B0.exports = aR() : B0.exports = oR();
var bt = B0.exports, vv = {}, Y0 = { exports: {} }, qa = {}, lg = { exports: {} }, M0 = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var N5;
function lR() {
  return N5 || (N5 = 1, function(y) {
    function S(X, Ne) {
      var ye = X.length;
      X.push(Ne);
      e: for (; 0 < ye; ) {
        var k = ye - 1 >>> 1, M = X[k];
        if (0 < L(M, Ne)) X[k] = Ne, X[ye] = M, ye = k;
        else break e;
      }
    }
    function b(X) {
      return X.length === 0 ? null : X[0];
    }
    function C(X) {
      if (X.length === 0) return null;
      var Ne = X[0], ye = X.pop();
      if (ye !== Ne) {
        X[0] = ye;
        e: for (var k = 0, M = X.length, se = M >>> 1; k < se; ) {
          var he = 2 * (k + 1) - 1, pe = X[he], Ee = he + 1, Ce = X[Ee];
          if (0 > L(pe, ye)) Ee < M && 0 > L(Ce, pe) ? (X[k] = Ce, X[Ee] = ye, k = Ee) : (X[k] = pe, X[he] = ye, k = he);
          else if (Ee < M && 0 > L(Ce, ye)) X[k] = Ce, X[Ee] = ye, k = Ee;
          else break e;
        }
      }
      return Ne;
    }
    function L(X, Ne) {
      var ye = X.sortIndex - Ne.sortIndex;
      return ye !== 0 ? ye : X.id - Ne.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var Y = performance;
      y.unstable_now = function() {
        return Y.now();
      };
    } else {
      var Z = Date, g = Z.now();
      y.unstable_now = function() {
        return Z.now() - g;
      };
    }
    var oe = [], ee = [], I = 1, fe = null, J = 3, De = !1, ae = !1, H = !1, ue = typeof setTimeout == "function" ? setTimeout : null, et = typeof clearTimeout == "function" ? clearTimeout : null, ot = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Pe(X) {
      for (var Ne = b(ee); Ne !== null; ) {
        if (Ne.callback === null) C(ee);
        else if (Ne.startTime <= X) C(ee), Ne.sortIndex = Ne.expirationTime, S(oe, Ne);
        else break;
        Ne = b(ee);
      }
    }
    function Me(X) {
      if (H = !1, Pe(X), !ae) if (b(oe) !== null) ae = !0, gt(G);
      else {
        var Ne = b(ee);
        Ne !== null && tt(Me, Ne.startTime - X);
      }
    }
    function G(X, Ne) {
      ae = !1, H && (H = !1, et(qe), qe = -1), De = !0;
      var ye = J;
      try {
        for (Pe(Ne), fe = b(oe); fe !== null && (!(fe.expirationTime > Ne) || X && !Vt()); ) {
          var k = fe.callback;
          if (typeof k == "function") {
            fe.callback = null, J = fe.priorityLevel;
            var M = k(fe.expirationTime <= Ne);
            Ne = y.unstable_now(), typeof M == "function" ? fe.callback = M : fe === b(oe) && C(oe), Pe(Ne);
          } else C(oe);
          fe = b(oe);
        }
        if (fe !== null) var se = !0;
        else {
          var he = b(ee);
          he !== null && tt(Me, he.startTime - Ne), se = !1;
        }
        return se;
      } finally {
        fe = null, J = ye, De = !1;
      }
    }
    var be = !1, it = null, qe = -1, Wt = 5, Ct = -1;
    function Vt() {
      return !(y.unstable_now() - Ct < Wt);
    }
    function zt() {
      if (it !== null) {
        var X = y.unstable_now();
        Ct = X;
        var Ne = !0;
        try {
          Ne = it(!0, X);
        } finally {
          Ne ? xt() : (be = !1, it = null);
        }
      } else be = !1;
    }
    var xt;
    if (typeof ot == "function") xt = function() {
      ot(zt);
    };
    else if (typeof MessageChannel < "u") {
      var We = new MessageChannel(), Dt = We.port2;
      We.port1.onmessage = zt, xt = function() {
        Dt.postMessage(null);
      };
    } else xt = function() {
      ue(zt, 0);
    };
    function gt(X) {
      it = X, be || (be = !0, xt());
    }
    function tt(X, Ne) {
      qe = ue(function() {
        X(y.unstable_now());
      }, Ne);
    }
    y.unstable_IdlePriority = 5, y.unstable_ImmediatePriority = 1, y.unstable_LowPriority = 4, y.unstable_NormalPriority = 3, y.unstable_Profiling = null, y.unstable_UserBlockingPriority = 2, y.unstable_cancelCallback = function(X) {
      X.callback = null;
    }, y.unstable_continueExecution = function() {
      ae || De || (ae = !0, gt(G));
    }, y.unstable_forceFrameRate = function(X) {
      0 > X || 125 < X ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Wt = 0 < X ? Math.floor(1e3 / X) : 5;
    }, y.unstable_getCurrentPriorityLevel = function() {
      return J;
    }, y.unstable_getFirstCallbackNode = function() {
      return b(oe);
    }, y.unstable_next = function(X) {
      switch (J) {
        case 1:
        case 2:
        case 3:
          var Ne = 3;
          break;
        default:
          Ne = J;
      }
      var ye = J;
      J = Ne;
      try {
        return X();
      } finally {
        J = ye;
      }
    }, y.unstable_pauseExecution = function() {
    }, y.unstable_requestPaint = function() {
    }, y.unstable_runWithPriority = function(X, Ne) {
      switch (X) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          X = 3;
      }
      var ye = J;
      J = X;
      try {
        return Ne();
      } finally {
        J = ye;
      }
    }, y.unstable_scheduleCallback = function(X, Ne, ye) {
      var k = y.unstable_now();
      switch (typeof ye == "object" && ye !== null ? (ye = ye.delay, ye = typeof ye == "number" && 0 < ye ? k + ye : k) : ye = k, X) {
        case 1:
          var M = -1;
          break;
        case 2:
          M = 250;
          break;
        case 5:
          M = 1073741823;
          break;
        case 4:
          M = 1e4;
          break;
        default:
          M = 5e3;
      }
      return M = ye + M, X = { id: I++, callback: Ne, priorityLevel: X, startTime: ye, expirationTime: M, sortIndex: -1 }, ye > k ? (X.sortIndex = ye, S(ee, X), b(oe) === null && X === b(ee) && (H ? (et(qe), qe = -1) : H = !0, tt(Me, ye - k))) : (X.sortIndex = M, S(oe, X), ae || De || (ae = !0, gt(G))), X;
    }, y.unstable_shouldYield = Vt, y.unstable_wrapCallback = function(X) {
      var Ne = J;
      return function() {
        var ye = J;
        J = Ne;
        try {
          return X.apply(this, arguments);
        } finally {
          J = ye;
        }
      };
    };
  }(M0)), M0;
}
var N0 = {}, A5;
function sR() {
  return A5 || (A5 = 1, function(y) {
    var S = {};
    /**
     * @license React
     * scheduler.development.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    S.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var b = !1, C = 5;
      function L(ge, Ge) {
        var mt = ge.length;
        ge.push(Ge), g(ge, Ge, mt);
      }
      function Y(ge) {
        return ge.length === 0 ? null : ge[0];
      }
      function Z(ge) {
        if (ge.length === 0)
          return null;
        var Ge = ge[0], mt = ge.pop();
        return mt !== Ge && (ge[0] = mt, oe(ge, mt, 0)), Ge;
      }
      function g(ge, Ge, mt) {
        for (var It = mt; It > 0; ) {
          var vr = It - 1 >>> 1, hr = ge[vr];
          if (ee(hr, Ge) > 0)
            ge[vr] = Ge, ge[It] = hr, It = vr;
          else
            return;
        }
      }
      function oe(ge, Ge, mt) {
        for (var It = mt, vr = ge.length, hr = vr >>> 1; It < hr; ) {
          var mr = (It + 1) * 2 - 1, en = ge[mr], fr = mr + 1, er = ge[fr];
          if (ee(en, Ge) < 0)
            fr < vr && ee(er, en) < 0 ? (ge[It] = er, ge[fr] = Ge, It = fr) : (ge[It] = en, ge[mr] = Ge, It = mr);
          else if (fr < vr && ee(er, Ge) < 0)
            ge[It] = er, ge[fr] = Ge, It = fr;
          else
            return;
        }
      }
      function ee(ge, Ge) {
        var mt = ge.sortIndex - Ge.sortIndex;
        return mt !== 0 ? mt : ge.id - Ge.id;
      }
      var I = 1, fe = 2, J = 3, De = 4, ae = 5;
      function H(ge, Ge) {
      }
      var ue = typeof performance == "object" && typeof performance.now == "function";
      if (ue) {
        var et = performance;
        y.unstable_now = function() {
          return et.now();
        };
      } else {
        var ot = Date, Pe = ot.now();
        y.unstable_now = function() {
          return ot.now() - Pe;
        };
      }
      var Me = 1073741823, G = -1, be = 250, it = 5e3, qe = 1e4, Wt = Me, Ct = [], Vt = [], zt = 1, xt = null, We = J, Dt = !1, gt = !1, tt = !1, X = typeof setTimeout == "function" ? setTimeout : null, Ne = typeof clearTimeout == "function" ? clearTimeout : null, ye = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function k(ge) {
        for (var Ge = Y(Vt); Ge !== null; ) {
          if (Ge.callback === null)
            Z(Vt);
          else if (Ge.startTime <= ge)
            Z(Vt), Ge.sortIndex = Ge.expirationTime, L(Ct, Ge);
          else
            return;
          Ge = Y(Vt);
        }
      }
      function M(ge) {
        if (tt = !1, k(ge), !gt)
          if (Y(Ct) !== null)
            gt = !0, Fr(se);
          else {
            var Ge = Y(Vt);
            Ge !== null && sn(M, Ge.startTime - ge);
          }
      }
      function se(ge, Ge) {
        gt = !1, tt && (tt = !1, qn()), Dt = !0;
        var mt = We;
        try {
          var It;
          if (!b) return he(ge, Ge);
        } finally {
          xt = null, We = mt, Dt = !1;
        }
      }
      function he(ge, Ge) {
        var mt = Ge;
        for (k(mt), xt = Y(Ct); xt !== null && !(xt.expirationTime > mt && (!ge || Ka())); ) {
          var It = xt.callback;
          if (typeof It == "function") {
            xt.callback = null, We = xt.priorityLevel;
            var vr = xt.expirationTime <= mt, hr = It(vr);
            mt = y.unstable_now(), typeof hr == "function" ? xt.callback = hr : xt === Y(Ct) && Z(Ct), k(mt);
          } else
            Z(Ct);
          xt = Y(Ct);
        }
        if (xt !== null)
          return !0;
        var mr = Y(Vt);
        return mr !== null && sn(M, mr.startTime - mt), !1;
      }
      function pe(ge, Ge) {
        switch (ge) {
          case I:
          case fe:
          case J:
          case De:
          case ae:
            break;
          default:
            ge = J;
        }
        var mt = We;
        We = ge;
        try {
          return Ge();
        } finally {
          We = mt;
        }
      }
      function Ee(ge) {
        var Ge;
        switch (We) {
          case I:
          case fe:
          case J:
            Ge = J;
            break;
          default:
            Ge = We;
            break;
        }
        var mt = We;
        We = Ge;
        try {
          return ge();
        } finally {
          We = mt;
        }
      }
      function Ce(ge) {
        var Ge = We;
        return function() {
          var mt = We;
          We = Ge;
          try {
            return ge.apply(this, arguments);
          } finally {
            We = mt;
          }
        };
      }
      function me(ge, Ge, mt) {
        var It = y.unstable_now(), vr;
        if (typeof mt == "object" && mt !== null) {
          var hr = mt.delay;
          typeof hr == "number" && hr > 0 ? vr = It + hr : vr = It;
        } else
          vr = It;
        var mr;
        switch (ge) {
          case I:
            mr = G;
            break;
          case fe:
            mr = be;
            break;
          case ae:
            mr = Wt;
            break;
          case De:
            mr = qe;
            break;
          case J:
          default:
            mr = it;
            break;
        }
        var en = vr + mr, fr = {
          id: zt++,
          callback: Ge,
          priorityLevel: ge,
          startTime: vr,
          expirationTime: en,
          sortIndex: -1
        };
        return vr > It ? (fr.sortIndex = vr, L(Vt, fr), Y(Ct) === null && fr === Y(Vt) && (tt ? qn() : tt = !0, sn(M, vr - It))) : (fr.sortIndex = en, L(Ct, fr), !gt && !Dt && (gt = !0, Fr(se))), fr;
      }
      function Ae() {
      }
      function Ye() {
        !gt && !Dt && (gt = !0, Fr(se));
      }
      function Je() {
        return Y(Ct);
      }
      function Pt(ge) {
        ge.callback = null;
      }
      function ve() {
        return We;
      }
      var Yt = !1, Or = null, Cr = -1, Pr = C, ha = -1;
      function Ka() {
        var ge = y.unstable_now() - ha;
        return !(ge < Pr);
      }
      function zn() {
      }
      function Qr(ge) {
        if (ge < 0 || ge > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        ge > 0 ? Pr = Math.floor(1e3 / ge) : Pr = C;
      }
      var Jr = function() {
        if (Or !== null) {
          var ge = y.unstable_now();
          ha = ge;
          var Ge = !0, mt = !0;
          try {
            mt = Or(Ge, ge);
          } finally {
            mt ? Zr() : (Yt = !1, Or = null);
          }
        } else
          Yt = !1;
      }, Zr;
      if (typeof ye == "function")
        Zr = function() {
          ye(Jr);
        };
      else if (typeof MessageChannel < "u") {
        var kn = new MessageChannel(), Ja = kn.port2;
        kn.port1.onmessage = Jr, Zr = function() {
          Ja.postMessage(null);
        };
      } else
        Zr = function() {
          X(Jr, 0);
        };
      function Fr(ge) {
        Or = ge, Yt || (Yt = !0, Zr());
      }
      function sn(ge, Ge) {
        Cr = X(function() {
          ge(y.unstable_now());
        }, Ge);
      }
      function qn() {
        Ne(Cr), Cr = -1;
      }
      var Fo = zn, ma = null;
      y.unstable_IdlePriority = ae, y.unstable_ImmediatePriority = I, y.unstable_LowPriority = De, y.unstable_NormalPriority = J, y.unstable_Profiling = ma, y.unstable_UserBlockingPriority = fe, y.unstable_cancelCallback = Pt, y.unstable_continueExecution = Ye, y.unstable_forceFrameRate = Qr, y.unstable_getCurrentPriorityLevel = ve, y.unstable_getFirstCallbackNode = Je, y.unstable_next = Ee, y.unstable_pauseExecution = Ae, y.unstable_requestPaint = Fo, y.unstable_runWithPriority = pe, y.unstable_scheduleCallback = me, y.unstable_shouldYield = Ka, y.unstable_wrapCallback = Ce, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(N0)), N0;
}
var U5;
function q5() {
  if (U5) return lg.exports;
  U5 = 1;
  var y = {};
  return y.NODE_ENV === "production" ? lg.exports = lR() : lg.exports = sR(), lg.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var j5;
function uR() {
  if (j5) return qa;
  j5 = 1;
  var y = po, S = q5();
  function b(r) {
    for (var n = "https://reactjs.org/docs/error-decoder.html?invariant=" + r, i = 1; i < arguments.length; i++) n += "&args[]=" + encodeURIComponent(arguments[i]);
    return "Minified React error #" + r + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var C = /* @__PURE__ */ new Set(), L = {};
  function Y(r, n) {
    Z(r, n), Z(r + "Capture", n);
  }
  function Z(r, n) {
    for (L[r] = n, r = 0; r < n.length; r++) C.add(n[r]);
  }
  var g = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), oe = Object.prototype.hasOwnProperty, ee = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, I = {}, fe = {};
  function J(r) {
    return oe.call(fe, r) ? !0 : oe.call(I, r) ? !1 : ee.test(r) ? fe[r] = !0 : (I[r] = !0, !1);
  }
  function De(r, n, i, s) {
    if (i !== null && i.type === 0) return !1;
    switch (typeof n) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return s ? !1 : i !== null ? !i.acceptsBooleans : (r = r.toLowerCase().slice(0, 5), r !== "data-" && r !== "aria-");
      default:
        return !1;
    }
  }
  function ae(r, n, i, s) {
    if (n === null || typeof n > "u" || De(r, n, i, s)) return !0;
    if (s) return !1;
    if (i !== null) switch (i.type) {
      case 3:
        return !n;
      case 4:
        return n === !1;
      case 5:
        return isNaN(n);
      case 6:
        return isNaN(n) || 1 > n;
    }
    return !1;
  }
  function H(r, n, i, s, c, f, m) {
    this.acceptsBooleans = n === 2 || n === 3 || n === 4, this.attributeName = s, this.attributeNamespace = c, this.mustUseProperty = i, this.propertyName = r, this.type = n, this.sanitizeURL = f, this.removeEmptyString = m;
  }
  var ue = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(r) {
    ue[r] = new H(r, 0, !1, r, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(r) {
    var n = r[0];
    ue[n] = new H(n, 1, !1, r[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(r) {
    ue[r] = new H(r, 2, !1, r.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(r) {
    ue[r] = new H(r, 2, !1, r, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(r) {
    ue[r] = new H(r, 3, !1, r.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(r) {
    ue[r] = new H(r, 3, !0, r, null, !1, !1);
  }), ["capture", "download"].forEach(function(r) {
    ue[r] = new H(r, 4, !1, r, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(r) {
    ue[r] = new H(r, 6, !1, r, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(r) {
    ue[r] = new H(r, 5, !1, r.toLowerCase(), null, !1, !1);
  });
  var et = /[\-:]([a-z])/g;
  function ot(r) {
    return r[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(r) {
    var n = r.replace(
      et,
      ot
    );
    ue[n] = new H(n, 1, !1, r, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(r) {
    var n = r.replace(et, ot);
    ue[n] = new H(n, 1, !1, r, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(r) {
    var n = r.replace(et, ot);
    ue[n] = new H(n, 1, !1, r, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(r) {
    ue[r] = new H(r, 1, !1, r.toLowerCase(), null, !1, !1);
  }), ue.xlinkHref = new H("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(r) {
    ue[r] = new H(r, 1, !1, r.toLowerCase(), null, !0, !0);
  });
  function Pe(r, n, i, s) {
    var c = ue.hasOwnProperty(n) ? ue[n] : null;
    (c !== null ? c.type !== 0 : s || !(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (ae(n, i, c, s) && (i = null), s || c === null ? J(n) && (i === null ? r.removeAttribute(n) : r.setAttribute(n, "" + i)) : c.mustUseProperty ? r[c.propertyName] = i === null ? c.type === 3 ? !1 : "" : i : (n = c.attributeName, s = c.attributeNamespace, i === null ? r.removeAttribute(n) : (c = c.type, i = c === 3 || c === 4 && i === !0 ? "" : "" + i, s ? r.setAttributeNS(s, n, i) : r.setAttribute(n, i))));
  }
  var Me = y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, G = Symbol.for("react.element"), be = Symbol.for("react.portal"), it = Symbol.for("react.fragment"), qe = Symbol.for("react.strict_mode"), Wt = Symbol.for("react.profiler"), Ct = Symbol.for("react.provider"), Vt = Symbol.for("react.context"), zt = Symbol.for("react.forward_ref"), xt = Symbol.for("react.suspense"), We = Symbol.for("react.suspense_list"), Dt = Symbol.for("react.memo"), gt = Symbol.for("react.lazy"), tt = Symbol.for("react.offscreen"), X = Symbol.iterator;
  function Ne(r) {
    return r === null || typeof r != "object" ? null : (r = X && r[X] || r["@@iterator"], typeof r == "function" ? r : null);
  }
  var ye = Object.assign, k;
  function M(r) {
    if (k === void 0) try {
      throw Error();
    } catch (i) {
      var n = i.stack.trim().match(/\n( *(at )?)/);
      k = n && n[1] || "";
    }
    return `
` + k + r;
  }
  var se = !1;
  function he(r, n) {
    if (!r || se) return "";
    se = !0;
    var i = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (n) if (n = function() {
        throw Error();
      }, Object.defineProperty(n.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(n, []);
        } catch (B) {
          var s = B;
        }
        Reflect.construct(r, [], n);
      } else {
        try {
          n.call();
        } catch (B) {
          s = B;
        }
        r.call(n.prototype);
      }
      else {
        try {
          throw Error();
        } catch (B) {
          s = B;
        }
        r();
      }
    } catch (B) {
      if (B && s && typeof B.stack == "string") {
        for (var c = B.stack.split(`
`), f = s.stack.split(`
`), m = c.length - 1, E = f.length - 1; 1 <= m && 0 <= E && c[m] !== f[E]; ) E--;
        for (; 1 <= m && 0 <= E; m--, E--) if (c[m] !== f[E]) {
          if (m !== 1 || E !== 1)
            do
              if (m--, E--, 0 > E || c[m] !== f[E]) {
                var _ = `
` + c[m].replace(" at new ", " at ");
                return r.displayName && _.includes("<anonymous>") && (_ = _.replace("<anonymous>", r.displayName)), _;
              }
            while (1 <= m && 0 <= E);
          break;
        }
      }
    } finally {
      se = !1, Error.prepareStackTrace = i;
    }
    return (r = r ? r.displayName || r.name : "") ? M(r) : "";
  }
  function pe(r) {
    switch (r.tag) {
      case 5:
        return M(r.type);
      case 16:
        return M("Lazy");
      case 13:
        return M("Suspense");
      case 19:
        return M("SuspenseList");
      case 0:
      case 2:
      case 15:
        return r = he(r.type, !1), r;
      case 11:
        return r = he(r.type.render, !1), r;
      case 1:
        return r = he(r.type, !0), r;
      default:
        return "";
    }
  }
  function Ee(r) {
    if (r == null) return null;
    if (typeof r == "function") return r.displayName || r.name || null;
    if (typeof r == "string") return r;
    switch (r) {
      case it:
        return "Fragment";
      case be:
        return "Portal";
      case Wt:
        return "Profiler";
      case qe:
        return "StrictMode";
      case xt:
        return "Suspense";
      case We:
        return "SuspenseList";
    }
    if (typeof r == "object") switch (r.$$typeof) {
      case Vt:
        return (r.displayName || "Context") + ".Consumer";
      case Ct:
        return (r._context.displayName || "Context") + ".Provider";
      case zt:
        var n = r.render;
        return r = r.displayName, r || (r = n.displayName || n.name || "", r = r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef"), r;
      case Dt:
        return n = r.displayName || null, n !== null ? n : Ee(r.type) || "Memo";
      case gt:
        n = r._payload, r = r._init;
        try {
          return Ee(r(n));
        } catch {
        }
    }
    return null;
  }
  function Ce(r) {
    var n = r.type;
    switch (r.tag) {
      case 24:
        return "Cache";
      case 9:
        return (n.displayName || "Context") + ".Consumer";
      case 10:
        return (n._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return r = n.render, r = r.displayName || r.name || "", n.displayName || (r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return n;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return Ee(n);
      case 8:
        return n === qe ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof n == "function") return n.displayName || n.name || null;
        if (typeof n == "string") return n;
    }
    return null;
  }
  function me(r) {
    switch (typeof r) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return r;
      case "object":
        return r;
      default:
        return "";
    }
  }
  function Ae(r) {
    var n = r.type;
    return (r = r.nodeName) && r.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function Ye(r) {
    var n = Ae(r) ? "checked" : "value", i = Object.getOwnPropertyDescriptor(r.constructor.prototype, n), s = "" + r[n];
    if (!r.hasOwnProperty(n) && typeof i < "u" && typeof i.get == "function" && typeof i.set == "function") {
      var c = i.get, f = i.set;
      return Object.defineProperty(r, n, { configurable: !0, get: function() {
        return c.call(this);
      }, set: function(m) {
        s = "" + m, f.call(this, m);
      } }), Object.defineProperty(r, n, { enumerable: i.enumerable }), { getValue: function() {
        return s;
      }, setValue: function(m) {
        s = "" + m;
      }, stopTracking: function() {
        r._valueTracker = null, delete r[n];
      } };
    }
  }
  function Je(r) {
    r._valueTracker || (r._valueTracker = Ye(r));
  }
  function Pt(r) {
    if (!r) return !1;
    var n = r._valueTracker;
    if (!n) return !0;
    var i = n.getValue(), s = "";
    return r && (s = Ae(r) ? r.checked ? "true" : "false" : r.value), r = s, r !== i ? (n.setValue(r), !0) : !1;
  }
  function ve(r) {
    if (r = r || (typeof document < "u" ? document : void 0), typeof r > "u") return null;
    try {
      return r.activeElement || r.body;
    } catch {
      return r.body;
    }
  }
  function Yt(r, n) {
    var i = n.checked;
    return ye({}, n, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: i ?? r._wrapperState.initialChecked });
  }
  function Or(r, n) {
    var i = n.defaultValue == null ? "" : n.defaultValue, s = n.checked != null ? n.checked : n.defaultChecked;
    i = me(n.value != null ? n.value : i), r._wrapperState = { initialChecked: s, initialValue: i, controlled: n.type === "checkbox" || n.type === "radio" ? n.checked != null : n.value != null };
  }
  function Cr(r, n) {
    n = n.checked, n != null && Pe(r, "checked", n, !1);
  }
  function Pr(r, n) {
    Cr(r, n);
    var i = me(n.value), s = n.type;
    if (i != null) s === "number" ? (i === 0 && r.value === "" || r.value != i) && (r.value = "" + i) : r.value !== "" + i && (r.value = "" + i);
    else if (s === "submit" || s === "reset") {
      r.removeAttribute("value");
      return;
    }
    n.hasOwnProperty("value") ? Ka(r, n.type, i) : n.hasOwnProperty("defaultValue") && Ka(r, n.type, me(n.defaultValue)), n.checked == null && n.defaultChecked != null && (r.defaultChecked = !!n.defaultChecked);
  }
  function ha(r, n, i) {
    if (n.hasOwnProperty("value") || n.hasOwnProperty("defaultValue")) {
      var s = n.type;
      if (!(s !== "submit" && s !== "reset" || n.value !== void 0 && n.value !== null)) return;
      n = "" + r._wrapperState.initialValue, i || n === r.value || (r.value = n), r.defaultValue = n;
    }
    i = r.name, i !== "" && (r.name = ""), r.defaultChecked = !!r._wrapperState.initialChecked, i !== "" && (r.name = i);
  }
  function Ka(r, n, i) {
    (n !== "number" || ve(r.ownerDocument) !== r) && (i == null ? r.defaultValue = "" + r._wrapperState.initialValue : r.defaultValue !== "" + i && (r.defaultValue = "" + i));
  }
  var zn = Array.isArray;
  function Qr(r, n, i, s) {
    if (r = r.options, n) {
      n = {};
      for (var c = 0; c < i.length; c++) n["$" + i[c]] = !0;
      for (i = 0; i < r.length; i++) c = n.hasOwnProperty("$" + r[i].value), r[i].selected !== c && (r[i].selected = c), c && s && (r[i].defaultSelected = !0);
    } else {
      for (i = "" + me(i), n = null, c = 0; c < r.length; c++) {
        if (r[c].value === i) {
          r[c].selected = !0, s && (r[c].defaultSelected = !0);
          return;
        }
        n !== null || r[c].disabled || (n = r[c]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function Jr(r, n) {
    if (n.dangerouslySetInnerHTML != null) throw Error(b(91));
    return ye({}, n, { value: void 0, defaultValue: void 0, children: "" + r._wrapperState.initialValue });
  }
  function Zr(r, n) {
    var i = n.value;
    if (i == null) {
      if (i = n.children, n = n.defaultValue, i != null) {
        if (n != null) throw Error(b(92));
        if (zn(i)) {
          if (1 < i.length) throw Error(b(93));
          i = i[0];
        }
        n = i;
      }
      n == null && (n = ""), i = n;
    }
    r._wrapperState = { initialValue: me(i) };
  }
  function kn(r, n) {
    var i = me(n.value), s = me(n.defaultValue);
    i != null && (i = "" + i, i !== r.value && (r.value = i), n.defaultValue == null && r.defaultValue !== i && (r.defaultValue = i)), s != null && (r.defaultValue = "" + s);
  }
  function Ja(r) {
    var n = r.textContent;
    n === r._wrapperState.initialValue && n !== "" && n !== null && (r.value = n);
  }
  function Fr(r) {
    switch (r) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function sn(r, n) {
    return r == null || r === "http://www.w3.org/1999/xhtml" ? Fr(n) : r === "http://www.w3.org/2000/svg" && n === "foreignObject" ? "http://www.w3.org/1999/xhtml" : r;
  }
  var qn, Fo = function(r) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(n, i, s, c) {
      MSApp.execUnsafeLocalFunction(function() {
        return r(n, i, s, c);
      });
    } : r;
  }(function(r, n) {
    if (r.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in r) r.innerHTML = n;
    else {
      for (qn = qn || document.createElement("div"), qn.innerHTML = "<svg>" + n.valueOf().toString() + "</svg>", n = qn.firstChild; r.firstChild; ) r.removeChild(r.firstChild);
      for (; n.firstChild; ) r.appendChild(n.firstChild);
    }
  });
  function ma(r, n) {
    if (n) {
      var i = r.firstChild;
      if (i && i === r.lastChild && i.nodeType === 3) {
        i.nodeValue = n;
        return;
      }
    }
    r.textContent = n;
  }
  var ge = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, Ge = ["Webkit", "ms", "Moz", "O"];
  Object.keys(ge).forEach(function(r) {
    Ge.forEach(function(n) {
      n = n + r.charAt(0).toUpperCase() + r.substring(1), ge[n] = ge[r];
    });
  });
  function mt(r, n, i) {
    return n == null || typeof n == "boolean" || n === "" ? "" : i || typeof n != "number" || n === 0 || ge.hasOwnProperty(r) && ge[r] ? ("" + n).trim() : n + "px";
  }
  function It(r, n) {
    r = r.style;
    for (var i in n) if (n.hasOwnProperty(i)) {
      var s = i.indexOf("--") === 0, c = mt(i, n[i], s);
      i === "float" && (i = "cssFloat"), s ? r.setProperty(i, c) : r[i] = c;
    }
  }
  var vr = ye({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function hr(r, n) {
    if (n) {
      if (vr[r] && (n.children != null || n.dangerouslySetInnerHTML != null)) throw Error(b(137, r));
      if (n.dangerouslySetInnerHTML != null) {
        if (n.children != null) throw Error(b(60));
        if (typeof n.dangerouslySetInnerHTML != "object" || !("__html" in n.dangerouslySetInnerHTML)) throw Error(b(61));
      }
      if (n.style != null && typeof n.style != "object") throw Error(b(62));
    }
  }
  function mr(r, n) {
    if (r.indexOf("-") === -1) return typeof n.is == "string";
    switch (r) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var en = null;
  function fr(r) {
    return r = r.target || r.srcElement || window, r.correspondingUseElement && (r = r.correspondingUseElement), r.nodeType === 3 ? r.parentNode : r;
  }
  var er = null, $t = null, ga = null;
  function za(r) {
    if (r = Su(r)) {
      if (typeof er != "function") throw Error(b(280));
      var n = r.stateNode;
      n && (n = Zo(n), er(r.stateNode, r.type, n));
    }
  }
  function La(r) {
    $t ? ga ? ga.push(r) : ga = [r] : $t = r;
  }
  function Ho() {
    if ($t) {
      var r = $t, n = ga;
      if (ga = $t = null, za(r), n) for (r = 0; r < n.length; r++) za(n[r]);
    }
  }
  function rl(r, n) {
    return r(n);
  }
  function nl() {
  }
  var Bo = !1;
  function al(r, n, i) {
    if (Bo) return r(n, i);
    Bo = !0;
    try {
      return rl(r, n, i);
    } finally {
      Bo = !1, ($t !== null || ga !== null) && (nl(), Ho());
    }
  }
  function ho(r, n) {
    var i = r.stateNode;
    if (i === null) return null;
    var s = Zo(i);
    if (s === null) return null;
    i = s[n];
    e: switch (n) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (s = !s.disabled) || (r = r.type, s = !(r === "button" || r === "input" || r === "select" || r === "textarea")), r = !s;
        break e;
      default:
        r = !1;
    }
    if (r) return null;
    if (i && typeof i != "function") throw Error(b(231, n, typeof i));
    return i;
  }
  var ya = !1;
  if (g) try {
    var un = {};
    Object.defineProperty(un, "passive", { get: function() {
      ya = !0;
    } }), window.addEventListener("test", un, un), window.removeEventListener("test", un, un);
  } catch {
    ya = !1;
  }
  function wa(r, n, i, s, c, f, m, E, _) {
    var B = Array.prototype.slice.call(arguments, 3);
    try {
      n.apply(i, B);
    } catch (ne) {
      this.onError(ne);
    }
  }
  var Gn = !1, mo = null, go = !1, Vo = null, R = { onError: function(r) {
    Gn = !0, mo = r;
  } };
  function te(r, n, i, s, c, f, m, E, _) {
    Gn = !1, mo = null, wa.apply(R, arguments);
  }
  function Se(r, n, i, s, c, f, m, E, _) {
    if (te.apply(this, arguments), Gn) {
      if (Gn) {
        var B = mo;
        Gn = !1, mo = null;
      } else throw Error(b(198));
      go || (go = !0, Vo = B);
    }
  }
  function Te(r) {
    var n = r, i = r;
    if (r.alternate) for (; n.return; ) n = n.return;
    else {
      r = n;
      do
        n = r, n.flags & 4098 && (i = n.return), r = n.return;
      while (r);
    }
    return n.tag === 3 ? i : null;
  }
  function kt(r) {
    if (r.tag === 13) {
      var n = r.memoizedState;
      if (n === null && (r = r.alternate, r !== null && (n = r.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function ut(r) {
    if (Te(r) !== r) throw Error(b(188));
  }
  function Tt(r) {
    var n = r.alternate;
    if (!n) {
      if (n = Te(r), n === null) throw Error(b(188));
      return n !== r ? null : r;
    }
    for (var i = r, s = n; ; ) {
      var c = i.return;
      if (c === null) break;
      var f = c.alternate;
      if (f === null) {
        if (s = c.return, s !== null) {
          i = s;
          continue;
        }
        break;
      }
      if (c.child === f.child) {
        for (f = c.child; f; ) {
          if (f === i) return ut(c), r;
          if (f === s) return ut(c), n;
          f = f.sibling;
        }
        throw Error(b(188));
      }
      if (i.return !== s.return) i = c, s = f;
      else {
        for (var m = !1, E = c.child; E; ) {
          if (E === i) {
            m = !0, i = c, s = f;
            break;
          }
          if (E === s) {
            m = !0, s = c, i = f;
            break;
          }
          E = E.sibling;
        }
        if (!m) {
          for (E = f.child; E; ) {
            if (E === i) {
              m = !0, i = f, s = c;
              break;
            }
            if (E === s) {
              m = !0, s = f, i = c;
              break;
            }
            E = E.sibling;
          }
          if (!m) throw Error(b(189));
        }
      }
      if (i.alternate !== s) throw Error(b(190));
    }
    if (i.tag !== 3) throw Error(b(188));
    return i.stateNode.current === i ? r : n;
  }
  function yt(r) {
    return r = Tt(r), r !== null ? zr(r) : null;
  }
  function zr(r) {
    if (r.tag === 5 || r.tag === 6) return r;
    for (r = r.child; r !== null; ) {
      var n = zr(r);
      if (n !== null) return n;
      r = r.sibling;
    }
    return null;
  }
  var pr = S.unstable_scheduleCallback, gr = S.unstable_cancelCallback, En = S.unstable_shouldYield, Za = S.unstable_requestPaint, Qt = S.unstable_now, br = S.unstable_getCurrentPriorityLevel, ft = S.unstable_ImmediatePriority, yo = S.unstable_UserBlockingPriority, Yo = S.unstable_NormalPriority, wc = S.unstable_LowPriority, Io = S.unstable_IdlePriority, mi = null, Kn = null;
  function tu(r) {
    if (Kn && typeof Kn.onCommitFiberRoot == "function") try {
      Kn.onCommitFiberRoot(mi, r, void 0, (r.current.flags & 128) === 128);
    } catch {
    }
  }
  var Ln = Math.clz32 ? Math.clz32 : xc, ru = Math.log, bc = Math.LN2;
  function xc(r) {
    return r >>>= 0, r === 0 ? 32 : 31 - (ru(r) / bc | 0) | 0;
  }
  var $o = 64, gi = 4194304;
  function Jn(r) {
    switch (r & -r) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return r & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return r & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return r;
    }
  }
  function wo(r, n) {
    var i = r.pendingLanes;
    if (i === 0) return 0;
    var s = 0, c = r.suspendedLanes, f = r.pingedLanes, m = i & 268435455;
    if (m !== 0) {
      var E = m & ~c;
      E !== 0 ? s = Jn(E) : (f &= m, f !== 0 && (s = Jn(f)));
    } else m = i & ~c, m !== 0 ? s = Jn(m) : f !== 0 && (s = Jn(f));
    if (s === 0) return 0;
    if (n !== 0 && n !== s && !(n & c) && (c = s & -s, f = n & -n, c >= f || c === 16 && (f & 4194240) !== 0)) return n;
    if (s & 4 && (s |= i & 16), n = r.entangledLanes, n !== 0) for (r = r.entanglements, n &= s; 0 < n; ) i = 31 - Ln(n), c = 1 << i, s |= r[i], n &= ~c;
    return s;
  }
  function yi(r, n) {
    switch (r) {
      case 1:
      case 2:
      case 4:
        return n + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Gl(r, n) {
    for (var i = r.suspendedLanes, s = r.pingedLanes, c = r.expirationTimes, f = r.pendingLanes; 0 < f; ) {
      var m = 31 - Ln(f), E = 1 << m, _ = c[m];
      _ === -1 ? (!(E & i) || E & s) && (c[m] = yi(E, n)) : _ <= n && (r.expiredLanes |= E), f &= ~E;
    }
  }
  function Qo(r) {
    return r = r.pendingLanes & -1073741825, r !== 0 ? r : r & 1073741824 ? 1073741824 : 0;
  }
  function ol() {
    var r = $o;
    return $o <<= 1, !($o & 4194240) && ($o = 64), r;
  }
  function il(r) {
    for (var n = [], i = 0; 31 > i; i++) n.push(r);
    return n;
  }
  function wi(r, n, i) {
    r.pendingLanes |= n, n !== 536870912 && (r.suspendedLanes = 0, r.pingedLanes = 0), r = r.eventTimes, n = 31 - Ln(n), r[n] = i;
  }
  function nu(r, n) {
    var i = r.pendingLanes & ~n;
    r.pendingLanes = n, r.suspendedLanes = 0, r.pingedLanes = 0, r.expiredLanes &= n, r.mutableReadLanes &= n, r.entangledLanes &= n, n = r.entanglements;
    var s = r.eventTimes;
    for (r = r.expirationTimes; 0 < i; ) {
      var c = 31 - Ln(i), f = 1 << c;
      n[c] = 0, s[c] = -1, r[c] = -1, i &= ~f;
    }
  }
  function au(r, n) {
    var i = r.entangledLanes |= n;
    for (r = r.entanglements; i; ) {
      var s = 31 - Ln(i), c = 1 << s;
      c & n | r[s] & n && (r[s] |= n), i &= ~c;
    }
  }
  var Nt = 0;
  function ou(r) {
    return r &= -r, 1 < r ? 4 < r ? r & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var Kl, At, Sc, bo, lt, ll = !1, tn = [], Zn = null, Mn = null, xo = null, Tr = /* @__PURE__ */ new Map(), tr = /* @__PURE__ */ new Map(), eo = [], Ma = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Cn(r, n) {
    switch (r) {
      case "focusin":
      case "focusout":
        Zn = null;
        break;
      case "dragenter":
      case "dragleave":
        Mn = null;
        break;
      case "mouseover":
      case "mouseout":
        xo = null;
        break;
      case "pointerover":
      case "pointerout":
        Tr.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        tr.delete(n.pointerId);
    }
  }
  function Nn(r, n, i, s, c, f) {
    return r === null || r.nativeEvent !== f ? (r = { blockedOn: n, domEventName: i, eventSystemFlags: s, nativeEvent: f, targetContainers: [c] }, n !== null && (n = Su(n), n !== null && At(n)), r) : (r.eventSystemFlags |= s, n = r.targetContainers, c !== null && n.indexOf(c) === -1 && n.push(c), r);
  }
  function uf(r, n, i, s, c) {
    switch (n) {
      case "focusin":
        return Zn = Nn(Zn, r, n, i, s, c), !0;
      case "dragenter":
        return Mn = Nn(Mn, r, n, i, s, c), !0;
      case "mouseover":
        return xo = Nn(xo, r, n, i, s, c), !0;
      case "pointerover":
        var f = c.pointerId;
        return Tr.set(f, Nn(Tr.get(f) || null, r, n, i, s, c)), !0;
      case "gotpointercapture":
        return f = c.pointerId, tr.set(f, Nn(tr.get(f) || null, r, n, i, s, c)), !0;
    }
    return !1;
  }
  function Jl(r) {
    var n = ml(r.target);
    if (n !== null) {
      var i = Te(n);
      if (i !== null) {
        if (n = i.tag, n === 13) {
          if (n = kt(i), n !== null) {
            r.blockedOn = n, lt(r.priority, function() {
              Sc(i);
            });
            return;
          }
        } else if (n === 3 && i.stateNode.current.memoizedState.isDehydrated) {
          r.blockedOn = i.tag === 3 ? i.stateNode.containerInfo : null;
          return;
        }
      }
    }
    r.blockedOn = null;
  }
  function sl(r) {
    if (r.blockedOn !== null) return !1;
    for (var n = r.targetContainers; 0 < n.length; ) {
      var i = rs(r.domEventName, r.eventSystemFlags, n[0], r.nativeEvent);
      if (i === null) {
        i = r.nativeEvent;
        var s = new i.constructor(i.type, i);
        en = s, i.target.dispatchEvent(s), en = null;
      } else return n = Su(i), n !== null && At(n), r.blockedOn = i, !1;
      n.shift();
    }
    return !0;
  }
  function Zl(r, n, i) {
    sl(r) && i.delete(n);
  }
  function es() {
    ll = !1, Zn !== null && sl(Zn) && (Zn = null), Mn !== null && sl(Mn) && (Mn = null), xo !== null && sl(xo) && (xo = null), Tr.forEach(Zl), tr.forEach(Zl);
  }
  function ul(r, n) {
    r.blockedOn === n && (r.blockedOn = null, ll || (ll = !0, S.unstable_scheduleCallback(S.unstable_NormalPriority, es)));
  }
  function Na(r) {
    function n(c) {
      return ul(c, r);
    }
    if (0 < tn.length) {
      ul(tn[0], r);
      for (var i = 1; i < tn.length; i++) {
        var s = tn[i];
        s.blockedOn === r && (s.blockedOn = null);
      }
    }
    for (Zn !== null && ul(Zn, r), Mn !== null && ul(Mn, r), xo !== null && ul(xo, r), Tr.forEach(n), tr.forEach(n), i = 0; i < eo.length; i++) s = eo[i], s.blockedOn === r && (s.blockedOn = null);
    for (; 0 < eo.length && (i = eo[0], i.blockedOn === null); ) Jl(i), i.blockedOn === null && eo.shift();
  }
  var Aa = Me.ReactCurrentBatchConfig, bi = !0;
  function Wo(r, n, i, s) {
    var c = Nt, f = Aa.transition;
    Aa.transition = null;
    try {
      Nt = 1, xi(r, n, i, s);
    } finally {
      Nt = c, Aa.transition = f;
    }
  }
  function ts(r, n, i, s) {
    var c = Nt, f = Aa.transition;
    Aa.transition = null;
    try {
      Nt = 4, xi(r, n, i, s);
    } finally {
      Nt = c, Aa.transition = f;
    }
  }
  function xi(r, n, i, s) {
    if (bi) {
      var c = rs(r, n, i, s);
      if (c === null) Sf(r, n, s, Xo, i), Cn(r, s);
      else if (uf(c, r, n, i, s)) s.stopPropagation();
      else if (Cn(r, s), n & 4 && -1 < Ma.indexOf(r)) {
        for (; c !== null; ) {
          var f = Su(c);
          if (f !== null && Kl(f), f = rs(r, n, i, s), f === null && Sf(r, n, s, Xo, i), f === c) break;
          c = f;
        }
        c !== null && s.stopPropagation();
      } else Sf(r, n, s, null, i);
    }
  }
  var Xo = null;
  function rs(r, n, i, s) {
    if (Xo = null, r = fr(s), r = ml(r), r !== null) if (n = Te(r), n === null) r = null;
    else if (i = n.tag, i === 13) {
      if (r = kt(n), r !== null) return r;
      r = null;
    } else if (i === 3) {
      if (n.stateNode.current.memoizedState.isDehydrated) return n.tag === 3 ? n.stateNode.containerInfo : null;
      r = null;
    } else n !== r && (r = null);
    return Xo = r, null;
  }
  function iu(r) {
    switch (r) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (br()) {
          case ft:
            return 1;
          case yo:
            return 4;
          case Yo:
          case wc:
            return 16;
          case Io:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Ua = null, ns = null, h = null;
  function T() {
    if (h) return h;
    var r, n = ns, i = n.length, s, c = "value" in Ua ? Ua.value : Ua.textContent, f = c.length;
    for (r = 0; r < i && n[r] === c[r]; r++) ;
    var m = i - r;
    for (s = 1; s <= m && n[i - s] === c[f - s]; s++) ;
    return h = c.slice(r, 1 < s ? 1 - s : void 0);
  }
  function P(r) {
    var n = r.keyCode;
    return "charCode" in r ? (r = r.charCode, r === 0 && n === 13 && (r = 13)) : r = n, r === 10 && (r = 13), 32 <= r || r === 13 ? r : 0;
  }
  function $() {
    return !0;
  }
  function de() {
    return !1;
  }
  function Fe(r) {
    function n(i, s, c, f, m) {
      this._reactName = i, this._targetInst = c, this.type = s, this.nativeEvent = f, this.target = m, this.currentTarget = null;
      for (var E in r) r.hasOwnProperty(E) && (i = r[E], this[E] = i ? i(f) : f[E]);
      return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? $ : de, this.isPropagationStopped = de, this;
    }
    return ye(n.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var i = this.nativeEvent;
      i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = $);
    }, stopPropagation: function() {
      var i = this.nativeEvent;
      i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = $);
    }, persist: function() {
    }, isPersistent: $ }), n;
  }
  var Oe = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(r) {
    return r.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, nt = Fe(Oe), wt = ye({}, Oe, { view: 0, detail: 0 }), Xt = Fe(wt), rr, nr, vt, ur = ye({}, wt, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: to, button: 0, buttons: 0, relatedTarget: function(r) {
    return r.relatedTarget === void 0 ? r.fromElement === r.srcElement ? r.toElement : r.fromElement : r.relatedTarget;
  }, movementX: function(r) {
    return "movementX" in r ? r.movementX : (r !== vt && (vt && r.type === "mousemove" ? (rr = r.screenX - vt.screenX, nr = r.screenY - vt.screenY) : nr = rr = 0, vt = r), rr);
  }, movementY: function(r) {
    return "movementY" in r ? r.movementY : nr;
  } }), Lr = Fe(ur), cl = ye({}, ur, { dataTransfer: 0 }), lu = Fe(cl), qo = ye({}, wt, { relatedTarget: 0 }), dl = Fe(qo), su = ye({}, Oe, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), cf = Fe(su), kc = ye({}, Oe, { clipboardData: function(r) {
    return "clipboardData" in r ? r.clipboardData : window.clipboardData;
  } }), df = Fe(kc), mv = ye({}, Oe, { data: 0 }), Ec = Fe(mv), gv = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, yv = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, wv = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function hg(r) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(r) : (r = wv[r]) ? !!n[r] : !1;
  }
  function to() {
    return hg;
  }
  var mg = ye({}, wt, { key: function(r) {
    if (r.key) {
      var n = gv[r.key] || r.key;
      if (n !== "Unidentified") return n;
    }
    return r.type === "keypress" ? (r = P(r), r === 13 ? "Enter" : String.fromCharCode(r)) : r.type === "keydown" || r.type === "keyup" ? yv[r.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: to, charCode: function(r) {
    return r.type === "keypress" ? P(r) : 0;
  }, keyCode: function(r) {
    return r.type === "keydown" || r.type === "keyup" ? r.keyCode : 0;
  }, which: function(r) {
    return r.type === "keypress" ? P(r) : r.type === "keydown" || r.type === "keyup" ? r.keyCode : 0;
  } }), ff = Fe(mg), pf = ye({}, ur, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Cc = Fe(pf), gg = ye({}, wt, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: to }), Tc = Fe(gg), bv = ye({}, Oe, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), ea = Fe(bv), Go = ye({}, ur, {
    deltaX: function(r) {
      return "deltaX" in r ? r.deltaX : "wheelDeltaX" in r ? -r.wheelDeltaX : 0;
    },
    deltaY: function(r) {
      return "deltaY" in r ? r.deltaY : "wheelDeltaY" in r ? -r.wheelDeltaY : "wheelDelta" in r ? -r.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Hr = Fe(Go), Ko = [9, 13, 27, 32], uu = g && "CompositionEvent" in window, Si = null;
  g && "documentMode" in document && (Si = document.documentMode);
  var yg = g && "TextEvent" in window && !Si, as = g && (!uu || Si && 8 < Si && 11 >= Si), xv = " ", Sv = !1;
  function Rc(r, n) {
    switch (r) {
      case "keyup":
        return Ko.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function kv(r) {
    return r = r.detail, typeof r == "object" && "data" in r ? r.data : null;
  }
  var os = !1;
  function wg(r, n) {
    switch (r) {
      case "compositionend":
        return kv(n);
      case "keypress":
        return n.which !== 32 ? null : (Sv = !0, xv);
      case "textInput":
        return r = n.data, r === xv && Sv ? null : r;
      default:
        return null;
    }
  }
  function Ev(r, n) {
    if (os) return r === "compositionend" || !uu && Rc(r, n) ? (r = T(), h = ns = Ua = null, os = !1, r) : null;
    switch (r) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || n.ctrlKey && n.altKey) {
          if (n.char && 1 < n.char.length) return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return as && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var bg = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Cv(r) {
    var n = r && r.nodeName && r.nodeName.toLowerCase();
    return n === "input" ? !!bg[r.type] : n === "textarea";
  }
  function Tv(r, n, i, s) {
    La(s), n = wu(n, "onChange"), 0 < n.length && (i = new nt("onChange", "change", null, i, s), r.push({ event: i, listeners: n }));
  }
  var is = null, So = null;
  function vf(r) {
    zc(r, 0);
  }
  function cu(r) {
    var n = $e(r);
    if (Pt(n)) return r;
  }
  function Rv(r, n) {
    if (r === "change") return n;
  }
  var _v = !1;
  if (g) {
    var hf;
    if (g) {
      var mf = "oninput" in document;
      if (!mf) {
        var Dv = document.createElement("div");
        Dv.setAttribute("oninput", "return;"), mf = typeof Dv.oninput == "function";
      }
      hf = mf;
    } else hf = !1;
    _v = hf && (!document.documentMode || 9 < document.documentMode);
  }
  function Ov() {
    is && (is.detachEvent("onpropertychange", zv), So = is = null);
  }
  function zv(r) {
    if (r.propertyName === "value" && cu(So)) {
      var n = [];
      Tv(n, So, r, fr(r)), al(vf, n);
    }
  }
  function xg(r, n, i) {
    r === "focusin" ? (Ov(), is = n, So = i, is.attachEvent("onpropertychange", zv)) : r === "focusout" && Ov();
  }
  function Sg(r) {
    if (r === "selectionchange" || r === "keyup" || r === "keydown") return cu(So);
  }
  function Lv(r, n) {
    if (r === "click") return cu(n);
  }
  function kg(r, n) {
    if (r === "input" || r === "change") return cu(n);
  }
  function Mv(r, n) {
    return r === n && (r !== 0 || 1 / r === 1 / n) || r !== r && n !== n;
  }
  var ro = typeof Object.is == "function" ? Object.is : Mv;
  function du(r, n) {
    if (ro(r, n)) return !0;
    if (typeof r != "object" || r === null || typeof n != "object" || n === null) return !1;
    var i = Object.keys(r), s = Object.keys(n);
    if (i.length !== s.length) return !1;
    for (s = 0; s < i.length; s++) {
      var c = i[s];
      if (!oe.call(n, c) || !ro(r[c], n[c])) return !1;
    }
    return !0;
  }
  function Nv(r) {
    for (; r && r.firstChild; ) r = r.firstChild;
    return r;
  }
  function Av(r, n) {
    var i = Nv(r);
    r = 0;
    for (var s; i; ) {
      if (i.nodeType === 3) {
        if (s = r + i.textContent.length, r <= n && s >= n) return { node: i, offset: n - r };
        r = s;
      }
      e: {
        for (; i; ) {
          if (i.nextSibling) {
            i = i.nextSibling;
            break e;
          }
          i = i.parentNode;
        }
        i = void 0;
      }
      i = Nv(i);
    }
  }
  function _c(r, n) {
    return r && n ? r === n ? !0 : r && r.nodeType === 3 ? !1 : n && n.nodeType === 3 ? _c(r, n.parentNode) : "contains" in r ? r.contains(n) : r.compareDocumentPosition ? !!(r.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function ki() {
    for (var r = window, n = ve(); n instanceof r.HTMLIFrameElement; ) {
      try {
        var i = typeof n.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) r = n.contentWindow;
      else break;
      n = ve(r.document);
    }
    return n;
  }
  function ls(r) {
    var n = r && r.nodeName && r.nodeName.toLowerCase();
    return n && (n === "input" && (r.type === "text" || r.type === "search" || r.type === "tel" || r.type === "url" || r.type === "password") || n === "textarea" || r.contentEditable === "true");
  }
  function Uv(r) {
    var n = ki(), i = r.focusedElem, s = r.selectionRange;
    if (n !== i && i && i.ownerDocument && _c(i.ownerDocument.documentElement, i)) {
      if (s !== null && ls(i)) {
        if (n = s.start, r = s.end, r === void 0 && (r = n), "selectionStart" in i) i.selectionStart = n, i.selectionEnd = Math.min(r, i.value.length);
        else if (r = (n = i.ownerDocument || document) && n.defaultView || window, r.getSelection) {
          r = r.getSelection();
          var c = i.textContent.length, f = Math.min(s.start, c);
          s = s.end === void 0 ? f : Math.min(s.end, c), !r.extend && f > s && (c = s, s = f, f = c), c = Av(i, f);
          var m = Av(
            i,
            s
          );
          c && m && (r.rangeCount !== 1 || r.anchorNode !== c.node || r.anchorOffset !== c.offset || r.focusNode !== m.node || r.focusOffset !== m.offset) && (n = n.createRange(), n.setStart(c.node, c.offset), r.removeAllRanges(), f > s ? (r.addRange(n), r.extend(m.node, m.offset)) : (n.setEnd(m.node, m.offset), r.addRange(n)));
        }
      }
      for (n = [], r = i; r = r.parentNode; ) r.nodeType === 1 && n.push({ element: r, left: r.scrollLeft, top: r.scrollTop });
      for (typeof i.focus == "function" && i.focus(), i = 0; i < n.length; i++) r = n[i], r.element.scrollLeft = r.left, r.element.scrollTop = r.top;
    }
  }
  var ss = g && "documentMode" in document && 11 >= document.documentMode, us = null, gf = null, fu = null, yf = !1;
  function jv(r, n, i) {
    var s = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    yf || us == null || us !== ve(s) || (s = us, "selectionStart" in s && ls(s) ? s = { start: s.selectionStart, end: s.selectionEnd } : (s = (s.ownerDocument && s.ownerDocument.defaultView || window).getSelection(), s = { anchorNode: s.anchorNode, anchorOffset: s.anchorOffset, focusNode: s.focusNode, focusOffset: s.focusOffset }), fu && du(fu, s) || (fu = s, s = wu(gf, "onSelect"), 0 < s.length && (n = new nt("onSelect", "select", null, n, i), r.push({ event: n, listeners: s }), n.target = us)));
  }
  function pu(r, n) {
    var i = {};
    return i[r.toLowerCase()] = n.toLowerCase(), i["Webkit" + r] = "webkit" + n, i["Moz" + r] = "moz" + n, i;
  }
  var cs = { animationend: pu("Animation", "AnimationEnd"), animationiteration: pu("Animation", "AnimationIteration"), animationstart: pu("Animation", "AnimationStart"), transitionend: pu("Transition", "TransitionEnd") }, Dc = {}, Tn = {};
  g && (Tn = document.createElement("div").style, "AnimationEvent" in window || (delete cs.animationend.animation, delete cs.animationiteration.animation, delete cs.animationstart.animation), "TransitionEvent" in window || delete cs.transitionend.transition);
  function vu(r) {
    if (Dc[r]) return Dc[r];
    if (!cs[r]) return r;
    var n = cs[r], i;
    for (i in n) if (n.hasOwnProperty(i) && i in Tn) return Dc[r] = n[i];
    return r;
  }
  var Pv = vu("animationend"), Fv = vu("animationiteration"), Hv = vu("animationstart"), Bv = vu("transitionend"), Vv = /* @__PURE__ */ new Map(), wf = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function ko(r, n) {
    Vv.set(r, n), Y(n, [r]);
  }
  for (var fl = 0; fl < wf.length; fl++) {
    var bf = wf[fl], hu = bf.toLowerCase(), Eg = bf[0].toUpperCase() + bf.slice(1);
    ko(hu, "on" + Eg);
  }
  ko(Pv, "onAnimationEnd"), ko(Fv, "onAnimationIteration"), ko(Hv, "onAnimationStart"), ko("dblclick", "onDoubleClick"), ko("focusin", "onFocus"), ko("focusout", "onBlur"), ko(Bv, "onTransitionEnd"), Z("onMouseEnter", ["mouseout", "mouseover"]), Z("onMouseLeave", ["mouseout", "mouseover"]), Z("onPointerEnter", ["pointerout", "pointerover"]), Z("onPointerLeave", ["pointerout", "pointerover"]), Y("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Y("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Y("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Y("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Y("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Y("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var mu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Cg = new Set("cancel close invalid load scroll toggle".split(" ").concat(mu));
  function Oc(r, n, i) {
    var s = r.type || "unknown-event";
    r.currentTarget = i, Se(s, n, void 0, r), r.currentTarget = null;
  }
  function zc(r, n) {
    n = (n & 4) !== 0;
    for (var i = 0; i < r.length; i++) {
      var s = r[i], c = s.event;
      s = s.listeners;
      e: {
        var f = void 0;
        if (n) for (var m = s.length - 1; 0 <= m; m--) {
          var E = s[m], _ = E.instance, B = E.currentTarget;
          if (E = E.listener, _ !== f && c.isPropagationStopped()) break e;
          Oc(c, E, B), f = _;
        }
        else for (m = 0; m < s.length; m++) {
          if (E = s[m], _ = E.instance, B = E.currentTarget, E = E.listener, _ !== f && c.isPropagationStopped()) break e;
          Oc(c, E, B), f = _;
        }
      }
    }
    if (go) throw r = Vo, go = !1, Vo = null, r;
  }
  function qt(r, n) {
    var i = n[kf];
    i === void 0 && (i = n[kf] = /* @__PURE__ */ new Set());
    var s = r + "__bubble";
    i.has(s) || (xf(n, r, 2, !1), i.add(s));
  }
  function Ei(r, n, i) {
    var s = 0;
    n && (s |= 4), xf(i, r, s, n);
  }
  var gu = "_reactListening" + Math.random().toString(36).slice(2);
  function yu(r) {
    if (!r[gu]) {
      r[gu] = !0, C.forEach(function(i) {
        i !== "selectionchange" && (Cg.has(i) || Ei(i, !1, r), Ei(i, !0, r));
      });
      var n = r.nodeType === 9 ? r : r.ownerDocument;
      n === null || n[gu] || (n[gu] = !0, Ei("selectionchange", !1, n));
    }
  }
  function xf(r, n, i, s) {
    switch (iu(n)) {
      case 1:
        var c = Wo;
        break;
      case 4:
        c = ts;
        break;
      default:
        c = xi;
    }
    i = c.bind(null, n, i, r), c = void 0, !ya || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (c = !0), s ? c !== void 0 ? r.addEventListener(n, i, { capture: !0, passive: c }) : r.addEventListener(n, i, !0) : c !== void 0 ? r.addEventListener(n, i, { passive: c }) : r.addEventListener(n, i, !1);
  }
  function Sf(r, n, i, s, c) {
    var f = s;
    if (!(n & 1) && !(n & 2) && s !== null) e: for (; ; ) {
      if (s === null) return;
      var m = s.tag;
      if (m === 3 || m === 4) {
        var E = s.stateNode.containerInfo;
        if (E === c || E.nodeType === 8 && E.parentNode === c) break;
        if (m === 4) for (m = s.return; m !== null; ) {
          var _ = m.tag;
          if ((_ === 3 || _ === 4) && (_ = m.stateNode.containerInfo, _ === c || _.nodeType === 8 && _.parentNode === c)) return;
          m = m.return;
        }
        for (; E !== null; ) {
          if (m = ml(E), m === null) return;
          if (_ = m.tag, _ === 5 || _ === 6) {
            s = f = m;
            continue e;
          }
          E = E.parentNode;
        }
      }
      s = s.return;
    }
    al(function() {
      var B = f, ne = fr(i), ie = [];
      e: {
        var re = Vv.get(r);
        if (re !== void 0) {
          var ze = nt, He = r;
          switch (r) {
            case "keypress":
              if (P(i) === 0) break e;
            case "keydown":
            case "keyup":
              ze = ff;
              break;
            case "focusin":
              He = "focus", ze = dl;
              break;
            case "focusout":
              He = "blur", ze = dl;
              break;
            case "beforeblur":
            case "afterblur":
              ze = dl;
              break;
            case "click":
              if (i.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              ze = Lr;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              ze = lu;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              ze = Tc;
              break;
            case Pv:
            case Fv:
            case Hv:
              ze = cf;
              break;
            case Bv:
              ze = ea;
              break;
            case "scroll":
              ze = Xt;
              break;
            case "wheel":
              ze = Hr;
              break;
            case "copy":
            case "cut":
            case "paste":
              ze = df;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              ze = Cc;
          }
          var Ve = (n & 4) !== 0, Ur = !Ve && r === "scroll", N = Ve ? re !== null ? re + "Capture" : null : re;
          Ve = [];
          for (var O = B, j; O !== null; ) {
            j = O;
            var ce = j.stateNode;
            if (j.tag === 5 && ce !== null && (j = ce, N !== null && (ce = ho(O, N), ce != null && Ve.push(ds(O, ce, j)))), Ur) break;
            O = O.return;
          }
          0 < Ve.length && (re = new ze(re, He, null, i, ne), ie.push({ event: re, listeners: Ve }));
        }
      }
      if (!(n & 7)) {
        e: {
          if (re = r === "mouseover" || r === "pointerover", ze = r === "mouseout" || r === "pointerout", re && i !== en && (He = i.relatedTarget || i.fromElement) && (ml(He) || He[Jo])) break e;
          if ((ze || re) && (re = ne.window === ne ? ne : (re = ne.ownerDocument) ? re.defaultView || re.parentWindow : window, ze ? (He = i.relatedTarget || i.toElement, ze = B, He = He ? ml(He) : null, He !== null && (Ur = Te(He), He !== Ur || He.tag !== 5 && He.tag !== 6) && (He = null)) : (ze = null, He = B), ze !== He)) {
            if (Ve = Lr, ce = "onMouseLeave", N = "onMouseEnter", O = "mouse", (r === "pointerout" || r === "pointerover") && (Ve = Cc, ce = "onPointerLeave", N = "onPointerEnter", O = "pointer"), Ur = ze == null ? re : $e(ze), j = He == null ? re : $e(He), re = new Ve(ce, O + "leave", ze, i, ne), re.target = Ur, re.relatedTarget = j, ce = null, ml(ne) === B && (Ve = new Ve(N, O + "enter", He, i, ne), Ve.target = j, Ve.relatedTarget = Ur, ce = Ve), Ur = ce, ze && He) t: {
              for (Ve = ze, N = He, O = 0, j = Ve; j; j = pl(j)) O++;
              for (j = 0, ce = N; ce; ce = pl(ce)) j++;
              for (; 0 < O - j; ) Ve = pl(Ve), O--;
              for (; 0 < j - O; ) N = pl(N), j--;
              for (; O--; ) {
                if (Ve === N || N !== null && Ve === N.alternate) break t;
                Ve = pl(Ve), N = pl(N);
              }
              Ve = null;
            }
            else Ve = null;
            ze !== null && Lc(ie, re, ze, Ve, !1), He !== null && Ur !== null && Lc(ie, Ur, He, Ve, !0);
          }
        }
        e: {
          if (re = B ? $e(B) : window, ze = re.nodeName && re.nodeName.toLowerCase(), ze === "select" || ze === "input" && re.type === "file") var Re = Rv;
          else if (Cv(re)) if (_v) Re = kg;
          else {
            Re = Sg;
            var Xe = xg;
          }
          else (ze = re.nodeName) && ze.toLowerCase() === "input" && (re.type === "checkbox" || re.type === "radio") && (Re = Lv);
          if (Re && (Re = Re(r, B))) {
            Tv(ie, Re, i, ne);
            break e;
          }
          Xe && Xe(r, re, B), r === "focusout" && (Xe = re._wrapperState) && Xe.controlled && re.type === "number" && Ka(re, "number", re.value);
        }
        switch (Xe = B ? $e(B) : window, r) {
          case "focusin":
            (Cv(Xe) || Xe.contentEditable === "true") && (us = Xe, gf = B, fu = null);
            break;
          case "focusout":
            fu = gf = us = null;
            break;
          case "mousedown":
            yf = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            yf = !1, jv(ie, i, ne);
            break;
          case "selectionchange":
            if (ss) break;
          case "keydown":
          case "keyup":
            jv(ie, i, ne);
        }
        var Ze;
        if (uu) e: {
          switch (r) {
            case "compositionstart":
              var st = "onCompositionStart";
              break e;
            case "compositionend":
              st = "onCompositionEnd";
              break e;
            case "compositionupdate":
              st = "onCompositionUpdate";
              break e;
          }
          st = void 0;
        }
        else os ? Rc(r, i) && (st = "onCompositionEnd") : r === "keydown" && i.keyCode === 229 && (st = "onCompositionStart");
        st && (as && i.locale !== "ko" && (os || st !== "onCompositionStart" ? st === "onCompositionEnd" && os && (Ze = T()) : (Ua = ne, ns = "value" in Ua ? Ua.value : Ua.textContent, os = !0)), Xe = wu(B, st), 0 < Xe.length && (st = new Ec(st, r, null, i, ne), ie.push({ event: st, listeners: Xe }), Ze ? st.data = Ze : (Ze = kv(i), Ze !== null && (st.data = Ze)))), (Ze = yg ? wg(r, i) : Ev(r, i)) && (B = wu(B, "onBeforeInput"), 0 < B.length && (ne = new Ec("onBeforeInput", "beforeinput", null, i, ne), ie.push({ event: ne, listeners: B }), ne.data = Ze));
      }
      zc(ie, n);
    });
  }
  function ds(r, n, i) {
    return { instance: r, listener: n, currentTarget: i };
  }
  function wu(r, n) {
    for (var i = n + "Capture", s = []; r !== null; ) {
      var c = r, f = c.stateNode;
      c.tag === 5 && f !== null && (c = f, f = ho(r, i), f != null && s.unshift(ds(r, f, c)), f = ho(r, n), f != null && s.push(ds(r, f, c))), r = r.return;
    }
    return s;
  }
  function pl(r) {
    if (r === null) return null;
    do
      r = r.return;
    while (r && r.tag !== 5);
    return r || null;
  }
  function Lc(r, n, i, s, c) {
    for (var f = n._reactName, m = []; i !== null && i !== s; ) {
      var E = i, _ = E.alternate, B = E.stateNode;
      if (_ !== null && _ === s) break;
      E.tag === 5 && B !== null && (E = B, c ? (_ = ho(i, f), _ != null && m.unshift(ds(i, _, E))) : c || (_ = ho(i, f), _ != null && m.push(ds(i, _, E)))), i = i.return;
    }
    m.length !== 0 && r.push({ event: n, listeners: m });
  }
  var Tg = /\r\n?/g, Yv = /\u0000|\uFFFD/g;
  function Iv(r) {
    return (typeof r == "string" ? r : "" + r).replace(Tg, `
`).replace(Yv, "");
  }
  function Mc(r, n, i) {
    if (n = Iv(n), Iv(r) !== n && i) throw Error(b(425));
  }
  function Nc() {
  }
  var vl = null, bu = null;
  function hl(r, n) {
    return r === "textarea" || r === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Ac = typeof setTimeout == "function" ? setTimeout : void 0, $v = typeof clearTimeout == "function" ? clearTimeout : void 0, Uc = typeof Promise == "function" ? Promise : void 0, Rg = typeof queueMicrotask == "function" ? queueMicrotask : typeof Uc < "u" ? function(r) {
    return Uc.resolve(null).then(r).catch(fs);
  } : Ac;
  function fs(r) {
    setTimeout(function() {
      throw r;
    });
  }
  function ps(r, n) {
    var i = n, s = 0;
    do {
      var c = i.nextSibling;
      if (r.removeChild(i), c && c.nodeType === 8) if (i = c.data, i === "/$") {
        if (s === 0) {
          r.removeChild(c), Na(n);
          return;
        }
        s--;
      } else i !== "$" && i !== "$?" && i !== "$!" || s++;
      i = c;
    } while (i);
    Na(n);
  }
  function no(r) {
    for (; r != null; r = r.nextSibling) {
      var n = r.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (n = r.data, n === "$" || n === "$!" || n === "$?") break;
        if (n === "/$") return null;
      }
    }
    return r;
  }
  function jc(r) {
    r = r.previousSibling;
    for (var n = 0; r; ) {
      if (r.nodeType === 8) {
        var i = r.data;
        if (i === "$" || i === "$!" || i === "$?") {
          if (n === 0) return r;
          n--;
        } else i === "/$" && n++;
      }
      r = r.previousSibling;
    }
    return null;
  }
  var vs = Math.random().toString(36).slice(2), ja = "__reactFiber$" + vs, xu = "__reactProps$" + vs, Jo = "__reactContainer$" + vs, kf = "__reactEvents$" + vs, Ef = "__reactListeners$" + vs, hs = "__reactHandles$" + vs;
  function ml(r) {
    var n = r[ja];
    if (n) return n;
    for (var i = r.parentNode; i; ) {
      if (n = i[Jo] || i[ja]) {
        if (i = n.alternate, n.child !== null || i !== null && i.child !== null) for (r = jc(r); r !== null; ) {
          if (i = r[ja]) return i;
          r = jc(r);
        }
        return n;
      }
      r = i, i = r.parentNode;
    }
    return null;
  }
  function Su(r) {
    return r = r[ja] || r[Jo], !r || r.tag !== 5 && r.tag !== 6 && r.tag !== 13 && r.tag !== 3 ? null : r;
  }
  function $e(r) {
    if (r.tag === 5 || r.tag === 6) return r.stateNode;
    throw Error(b(33));
  }
  function Zo(r) {
    return r[xu] || null;
  }
  var Rr = [], Rt = -1;
  function ta(r) {
    return { current: r };
  }
  function Kt(r) {
    0 > Rt || (r.current = Rr[Rt], Rr[Rt] = null, Rt--);
  }
  function cr(r, n) {
    Rt++, Rr[Rt] = r.current, r.current = n;
  }
  var St = {}, xr = ta(St), Br = ta(!1), Pa = St;
  function ba(r, n) {
    var i = r.type.contextTypes;
    if (!i) return St;
    var s = r.stateNode;
    if (s && s.__reactInternalMemoizedUnmaskedChildContext === n) return s.__reactInternalMemoizedMaskedChildContext;
    var c = {}, f;
    for (f in i) c[f] = n[f];
    return s && (r = r.stateNode, r.__reactInternalMemoizedUnmaskedChildContext = n, r.__reactInternalMemoizedMaskedChildContext = c), c;
  }
  function _r(r) {
    return r = r.childContextTypes, r != null;
  }
  function Eo() {
    Kt(Br), Kt(xr);
  }
  function Pc(r, n, i) {
    if (xr.current !== St) throw Error(b(168));
    cr(xr, n), cr(Br, i);
  }
  function Qv(r, n, i) {
    var s = r.stateNode;
    if (n = n.childContextTypes, typeof s.getChildContext != "function") return i;
    s = s.getChildContext();
    for (var c in s) if (!(c in n)) throw Error(b(108, Ce(r) || "Unknown", c));
    return ye({}, i, s);
  }
  function gl(r) {
    return r = (r = r.stateNode) && r.__reactInternalMemoizedMergedChildContext || St, Pa = xr.current, cr(xr, r), cr(Br, Br.current), !0;
  }
  function Rn(r, n, i) {
    var s = r.stateNode;
    if (!s) throw Error(b(169));
    i ? (r = Qv(r, n, Pa), s.__reactInternalMemoizedMergedChildContext = r, Kt(Br), Kt(xr), cr(xr, r)) : Kt(Br), cr(Br, i);
  }
  var ao = null, ku = !1, Eu = !1;
  function Ci(r) {
    ao === null ? ao = [r] : ao.push(r);
  }
  function Cf(r) {
    ku = !0, Ci(r);
  }
  function An() {
    if (!Eu && ao !== null) {
      Eu = !0;
      var r = 0, n = Nt;
      try {
        var i = ao;
        for (Nt = 1; r < i.length; r++) {
          var s = i[r];
          do
            s = s(!0);
          while (s !== null);
        }
        ao = null, ku = !1;
      } catch (c) {
        throw ao !== null && (ao = ao.slice(r + 1)), pr(ft, An), c;
      } finally {
        Nt = n, Eu = !1;
      }
    }
    return null;
  }
  var Ti = [], Ri = 0, ms = null, _i = 0, cn = [], Vr = 0, yl = null, Un = 1, Co = "";
  function Di(r, n) {
    Ti[Ri++] = _i, Ti[Ri++] = ms, ms = r, _i = n;
  }
  function Wv(r, n, i) {
    cn[Vr++] = Un, cn[Vr++] = Co, cn[Vr++] = yl, yl = r;
    var s = Un;
    r = Co;
    var c = 32 - Ln(s) - 1;
    s &= ~(1 << c), i += 1;
    var f = 32 - Ln(n) + c;
    if (30 < f) {
      var m = c - c % 5;
      f = (s & (1 << m) - 1).toString(32), s >>= m, c -= m, Un = 1 << 32 - Ln(n) + c | i << c | s, Co = f + r;
    } else Un = 1 << f | i << c | s, Co = r;
  }
  function Tf(r) {
    r.return !== null && (Di(r, 1), Wv(r, 1, 0));
  }
  function Fc(r) {
    for (; r === ms; ) ms = Ti[--Ri], Ti[Ri] = null, _i = Ti[--Ri], Ti[Ri] = null;
    for (; r === yl; ) yl = cn[--Vr], cn[Vr] = null, Co = cn[--Vr], cn[Vr] = null, Un = cn[--Vr], cn[Vr] = null;
  }
  var ra = null, na = null, yr = !1, oo = null;
  function Rf(r, n) {
    var i = Ya(5, null, null, 0);
    i.elementType = "DELETED", i.stateNode = n, i.return = r, n = r.deletions, n === null ? (r.deletions = [i], r.flags |= 16) : n.push(i);
  }
  function _f(r, n) {
    switch (r.tag) {
      case 5:
        var i = r.type;
        return n = n.nodeType !== 1 || i.toLowerCase() !== n.nodeName.toLowerCase() ? null : n, n !== null ? (r.stateNode = n, ra = r, na = no(n.firstChild), !0) : !1;
      case 6:
        return n = r.pendingProps === "" || n.nodeType !== 3 ? null : n, n !== null ? (r.stateNode = n, ra = r, na = null, !0) : !1;
      case 13:
        return n = n.nodeType !== 8 ? null : n, n !== null ? (i = yl !== null ? { id: Un, overflow: Co } : null, r.memoizedState = { dehydrated: n, treeContext: i, retryLane: 1073741824 }, i = Ya(18, null, null, 0), i.stateNode = n, i.return = r, r.child = i, ra = r, na = null, !0) : !1;
      default:
        return !1;
    }
  }
  function Df(r) {
    return (r.mode & 1) !== 0 && (r.flags & 128) === 0;
  }
  function Of(r) {
    if (yr) {
      var n = na;
      if (n) {
        var i = n;
        if (!_f(r, n)) {
          if (Df(r)) throw Error(b(418));
          n = no(i.nextSibling);
          var s = ra;
          n && _f(r, n) ? Rf(s, i) : (r.flags = r.flags & -4097 | 2, yr = !1, ra = r);
        }
      } else {
        if (Df(r)) throw Error(b(418));
        r.flags = r.flags & -4097 | 2, yr = !1, ra = r;
      }
    }
  }
  function Xv(r) {
    for (r = r.return; r !== null && r.tag !== 5 && r.tag !== 3 && r.tag !== 13; ) r = r.return;
    ra = r;
  }
  function Mr(r) {
    if (r !== ra) return !1;
    if (!yr) return Xv(r), yr = !0, !1;
    var n;
    if ((n = r.tag !== 3) && !(n = r.tag !== 5) && (n = r.type, n = n !== "head" && n !== "body" && !hl(r.type, r.memoizedProps)), n && (n = na)) {
      if (Df(r)) throw qv(), Error(b(418));
      for (; n; ) Rf(r, n), n = no(n.nextSibling);
    }
    if (Xv(r), r.tag === 13) {
      if (r = r.memoizedState, r = r !== null ? r.dehydrated : null, !r) throw Error(b(317));
      e: {
        for (r = r.nextSibling, n = 0; r; ) {
          if (r.nodeType === 8) {
            var i = r.data;
            if (i === "/$") {
              if (n === 0) {
                na = no(r.nextSibling);
                break e;
              }
              n--;
            } else i !== "$" && i !== "$!" && i !== "$?" || n++;
          }
          r = r.nextSibling;
        }
        na = null;
      }
    } else na = ra ? no(r.stateNode.nextSibling) : null;
    return !0;
  }
  function qv() {
    for (var r = na; r; ) r = no(r.nextSibling);
  }
  function ei() {
    na = ra = null, yr = !1;
  }
  function Cu(r) {
    oo === null ? oo = [r] : oo.push(r);
  }
  var wl = Me.ReactCurrentBatchConfig;
  function Tu(r, n, i) {
    if (r = i.ref, r !== null && typeof r != "function" && typeof r != "object") {
      if (i._owner) {
        if (i = i._owner, i) {
          if (i.tag !== 1) throw Error(b(309));
          var s = i.stateNode;
        }
        if (!s) throw Error(b(147, r));
        var c = s, f = "" + r;
        return n !== null && n.ref !== null && typeof n.ref == "function" && n.ref._stringRef === f ? n.ref : (n = function(m) {
          var E = c.refs;
          m === null ? delete E[f] : E[f] = m;
        }, n._stringRef = f, n);
      }
      if (typeof r != "string") throw Error(b(284));
      if (!i._owner) throw Error(b(290, r));
    }
    return r;
  }
  function gs(r, n) {
    throw r = Object.prototype.toString.call(n), Error(b(31, r === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : r));
  }
  function Gv(r) {
    var n = r._init;
    return n(r._payload);
  }
  function Kv(r) {
    function n(N, O) {
      if (r) {
        var j = N.deletions;
        j === null ? (N.deletions = [O], N.flags |= 16) : j.push(O);
      }
    }
    function i(N, O) {
      if (!r) return null;
      for (; O !== null; ) n(N, O), O = O.sibling;
      return null;
    }
    function s(N, O) {
      for (N = /* @__PURE__ */ new Map(); O !== null; ) O.key !== null ? N.set(O.key, O) : N.set(O.index, O), O = O.sibling;
      return N;
    }
    function c(N, O) {
      return N = Hi(N, O), N.index = 0, N.sibling = null, N;
    }
    function f(N, O, j) {
      return N.index = j, r ? (j = N.alternate, j !== null ? (j = j.index, j < O ? (N.flags |= 2, O) : j) : (N.flags |= 2, O)) : (N.flags |= 1048576, O);
    }
    function m(N) {
      return r && N.alternate === null && (N.flags |= 2), N;
    }
    function E(N, O, j, ce) {
      return O === null || O.tag !== 6 ? (O = Ul(j, N.mode, ce), O.return = N, O) : (O = c(O, j), O.return = N, O);
    }
    function _(N, O, j, ce) {
      var Re = j.type;
      return Re === it ? ne(N, O, j.props.children, ce, j.key) : O !== null && (O.elementType === Re || typeof Re == "object" && Re !== null && Re.$$typeof === gt && Gv(Re) === O.type) ? (ce = c(O, j.props), ce.ref = Tu(N, O, j), ce.return = N, ce) : (ce = Ed(j.type, j.key, j.props, null, N.mode, ce), ce.ref = Tu(N, O, j), ce.return = N, ce);
    }
    function B(N, O, j, ce) {
      return O === null || O.tag !== 4 || O.stateNode.containerInfo !== j.containerInfo || O.stateNode.implementation !== j.implementation ? (O = lp(j, N.mode, ce), O.return = N, O) : (O = c(O, j.children || []), O.return = N, O);
    }
    function ne(N, O, j, ce, Re) {
      return O === null || O.tag !== 7 ? (O = Bi(j, N.mode, ce, Re), O.return = N, O) : (O = c(O, j), O.return = N, O);
    }
    function ie(N, O, j) {
      if (typeof O == "string" && O !== "" || typeof O == "number") return O = Ul("" + O, N.mode, j), O.return = N, O;
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case G:
            return j = Ed(O.type, O.key, O.props, null, N.mode, j), j.ref = Tu(N, null, O), j.return = N, j;
          case be:
            return O = lp(O, N.mode, j), O.return = N, O;
          case gt:
            var ce = O._init;
            return ie(N, ce(O._payload), j);
        }
        if (zn(O) || Ne(O)) return O = Bi(O, N.mode, j, null), O.return = N, O;
        gs(N, O);
      }
      return null;
    }
    function re(N, O, j, ce) {
      var Re = O !== null ? O.key : null;
      if (typeof j == "string" && j !== "" || typeof j == "number") return Re !== null ? null : E(N, O, "" + j, ce);
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case G:
            return j.key === Re ? _(N, O, j, ce) : null;
          case be:
            return j.key === Re ? B(N, O, j, ce) : null;
          case gt:
            return Re = j._init, re(
              N,
              O,
              Re(j._payload),
              ce
            );
        }
        if (zn(j) || Ne(j)) return Re !== null ? null : ne(N, O, j, ce, null);
        gs(N, j);
      }
      return null;
    }
    function ze(N, O, j, ce, Re) {
      if (typeof ce == "string" && ce !== "" || typeof ce == "number") return N = N.get(j) || null, E(O, N, "" + ce, Re);
      if (typeof ce == "object" && ce !== null) {
        switch (ce.$$typeof) {
          case G:
            return N = N.get(ce.key === null ? j : ce.key) || null, _(O, N, ce, Re);
          case be:
            return N = N.get(ce.key === null ? j : ce.key) || null, B(O, N, ce, Re);
          case gt:
            var Xe = ce._init;
            return ze(N, O, j, Xe(ce._payload), Re);
        }
        if (zn(ce) || Ne(ce)) return N = N.get(j) || null, ne(O, N, ce, Re, null);
        gs(O, ce);
      }
      return null;
    }
    function He(N, O, j, ce) {
      for (var Re = null, Xe = null, Ze = O, st = O = 0, Gr = null; Ze !== null && st < j.length; st++) {
        Ze.index > st ? (Gr = Ze, Ze = null) : Gr = Ze.sibling;
        var Ft = re(N, Ze, j[st], ce);
        if (Ft === null) {
          Ze === null && (Ze = Gr);
          break;
        }
        r && Ze && Ft.alternate === null && n(N, Ze), O = f(Ft, O, st), Xe === null ? Re = Ft : Xe.sibling = Ft, Xe = Ft, Ze = Gr;
      }
      if (st === j.length) return i(N, Ze), yr && Di(N, st), Re;
      if (Ze === null) {
        for (; st < j.length; st++) Ze = ie(N, j[st], ce), Ze !== null && (O = f(Ze, O, st), Xe === null ? Re = Ze : Xe.sibling = Ze, Xe = Ze);
        return yr && Di(N, st), Re;
      }
      for (Ze = s(N, Ze); st < j.length; st++) Gr = ze(Ze, N, st, j[st], ce), Gr !== null && (r && Gr.alternate !== null && Ze.delete(Gr.key === null ? st : Gr.key), O = f(Gr, O, st), Xe === null ? Re = Gr : Xe.sibling = Gr, Xe = Gr);
      return r && Ze.forEach(function(Yi) {
        return n(N, Yi);
      }), yr && Di(N, st), Re;
    }
    function Ve(N, O, j, ce) {
      var Re = Ne(j);
      if (typeof Re != "function") throw Error(b(150));
      if (j = Re.call(j), j == null) throw Error(b(151));
      for (var Xe = Re = null, Ze = O, st = O = 0, Gr = null, Ft = j.next(); Ze !== null && !Ft.done; st++, Ft = j.next()) {
        Ze.index > st ? (Gr = Ze, Ze = null) : Gr = Ze.sibling;
        var Yi = re(N, Ze, Ft.value, ce);
        if (Yi === null) {
          Ze === null && (Ze = Gr);
          break;
        }
        r && Ze && Yi.alternate === null && n(N, Ze), O = f(Yi, O, st), Xe === null ? Re = Yi : Xe.sibling = Yi, Xe = Yi, Ze = Gr;
      }
      if (Ft.done) return i(
        N,
        Ze
      ), yr && Di(N, st), Re;
      if (Ze === null) {
        for (; !Ft.done; st++, Ft = j.next()) Ft = ie(N, Ft.value, ce), Ft !== null && (O = f(Ft, O, st), Xe === null ? Re = Ft : Xe.sibling = Ft, Xe = Ft);
        return yr && Di(N, st), Re;
      }
      for (Ze = s(N, Ze); !Ft.done; st++, Ft = j.next()) Ft = ze(Ze, N, st, Ft.value, ce), Ft !== null && (r && Ft.alternate !== null && Ze.delete(Ft.key === null ? st : Ft.key), O = f(Ft, O, st), Xe === null ? Re = Ft : Xe.sibling = Ft, Xe = Ft);
      return r && Ze.forEach(function(Bg) {
        return n(N, Bg);
      }), yr && Di(N, st), Re;
    }
    function Ur(N, O, j, ce) {
      if (typeof j == "object" && j !== null && j.type === it && j.key === null && (j = j.props.children), typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case G:
            e: {
              for (var Re = j.key, Xe = O; Xe !== null; ) {
                if (Xe.key === Re) {
                  if (Re = j.type, Re === it) {
                    if (Xe.tag === 7) {
                      i(N, Xe.sibling), O = c(Xe, j.props.children), O.return = N, N = O;
                      break e;
                    }
                  } else if (Xe.elementType === Re || typeof Re == "object" && Re !== null && Re.$$typeof === gt && Gv(Re) === Xe.type) {
                    i(N, Xe.sibling), O = c(Xe, j.props), O.ref = Tu(N, Xe, j), O.return = N, N = O;
                    break e;
                  }
                  i(N, Xe);
                  break;
                } else n(N, Xe);
                Xe = Xe.sibling;
              }
              j.type === it ? (O = Bi(j.props.children, N.mode, ce, j.key), O.return = N, N = O) : (ce = Ed(j.type, j.key, j.props, null, N.mode, ce), ce.ref = Tu(N, O, j), ce.return = N, N = ce);
            }
            return m(N);
          case be:
            e: {
              for (Xe = j.key; O !== null; ) {
                if (O.key === Xe) if (O.tag === 4 && O.stateNode.containerInfo === j.containerInfo && O.stateNode.implementation === j.implementation) {
                  i(N, O.sibling), O = c(O, j.children || []), O.return = N, N = O;
                  break e;
                } else {
                  i(N, O);
                  break;
                }
                else n(N, O);
                O = O.sibling;
              }
              O = lp(j, N.mode, ce), O.return = N, N = O;
            }
            return m(N);
          case gt:
            return Xe = j._init, Ur(N, O, Xe(j._payload), ce);
        }
        if (zn(j)) return He(N, O, j, ce);
        if (Ne(j)) return Ve(N, O, j, ce);
        gs(N, j);
      }
      return typeof j == "string" && j !== "" || typeof j == "number" ? (j = "" + j, O !== null && O.tag === 6 ? (i(N, O.sibling), O = c(O, j), O.return = N, N = O) : (i(N, O), O = Ul(j, N.mode, ce), O.return = N, N = O), m(N)) : i(N, O);
    }
    return Ur;
  }
  var io = Kv(!0), dn = Kv(!1), xe = ta(null), xa = null, _n = null, zf = null;
  function Lf() {
    zf = _n = xa = null;
  }
  function Mf(r) {
    var n = xe.current;
    Kt(xe), r._currentValue = n;
  }
  function Nf(r, n, i) {
    for (; r !== null; ) {
      var s = r.alternate;
      if ((r.childLanes & n) !== n ? (r.childLanes |= n, s !== null && (s.childLanes |= n)) : s !== null && (s.childLanes & n) !== n && (s.childLanes |= n), r === i) break;
      r = r.return;
    }
  }
  function ys(r, n) {
    xa = r, zf = _n = null, r = r.dependencies, r !== null && r.firstContext !== null && (r.lanes & n && (an = !0), r.firstContext = null);
  }
  function Jt(r) {
    var n = r._currentValue;
    if (zf !== r) if (r = { context: r, memoizedValue: n, next: null }, _n === null) {
      if (xa === null) throw Error(b(308));
      _n = r, xa.dependencies = { lanes: 0, firstContext: r };
    } else _n = _n.next = r;
    return n;
  }
  var bl = null;
  function Af(r) {
    bl === null ? bl = [r] : bl.push(r);
  }
  function Jv(r, n, i, s) {
    var c = n.interleaved;
    return c === null ? (i.next = i, Af(n)) : (i.next = c.next, c.next = i), n.interleaved = i, To(r, s);
  }
  function To(r, n) {
    r.lanes |= n;
    var i = r.alternate;
    for (i !== null && (i.lanes |= n), i = r, r = r.return; r !== null; ) r.childLanes |= n, i = r.alternate, i !== null && (i.childLanes |= n), i = r, r = r.return;
    return i.tag === 3 ? i.stateNode : null;
  }
  var Fa = !1;
  function Oi(r) {
    r.updateQueue = { baseState: r.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function Zv(r, n) {
    r = r.updateQueue, n.updateQueue === r && (n.updateQueue = { baseState: r.baseState, firstBaseUpdate: r.firstBaseUpdate, lastBaseUpdate: r.lastBaseUpdate, shared: r.shared, effects: r.effects });
  }
  function ti(r, n) {
    return { eventTime: r, lane: n, tag: 0, payload: null, callback: null, next: null };
  }
  function zi(r, n, i) {
    var s = r.updateQueue;
    if (s === null) return null;
    if (s = s.shared, _t & 2) {
      var c = s.pending;
      return c === null ? n.next = n : (n.next = c.next, c.next = n), s.pending = n, To(r, i);
    }
    return c = s.interleaved, c === null ? (n.next = n, Af(s)) : (n.next = c.next, c.next = n), s.interleaved = n, To(r, i);
  }
  function Hc(r, n, i) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (i & 4194240) !== 0)) {
      var s = n.lanes;
      s &= r.pendingLanes, i |= s, n.lanes = i, au(r, i);
    }
  }
  function eh(r, n) {
    var i = r.updateQueue, s = r.alternate;
    if (s !== null && (s = s.updateQueue, i === s)) {
      var c = null, f = null;
      if (i = i.firstBaseUpdate, i !== null) {
        do {
          var m = { eventTime: i.eventTime, lane: i.lane, tag: i.tag, payload: i.payload, callback: i.callback, next: null };
          f === null ? c = f = m : f = f.next = m, i = i.next;
        } while (i !== null);
        f === null ? c = f = n : f = f.next = n;
      } else c = f = n;
      i = { baseState: s.baseState, firstBaseUpdate: c, lastBaseUpdate: f, shared: s.shared, effects: s.effects }, r.updateQueue = i;
      return;
    }
    r = i.lastBaseUpdate, r === null ? i.firstBaseUpdate = n : r.next = n, i.lastBaseUpdate = n;
  }
  function Bc(r, n, i, s) {
    var c = r.updateQueue;
    Fa = !1;
    var f = c.firstBaseUpdate, m = c.lastBaseUpdate, E = c.shared.pending;
    if (E !== null) {
      c.shared.pending = null;
      var _ = E, B = _.next;
      _.next = null, m === null ? f = B : m.next = B, m = _;
      var ne = r.alternate;
      ne !== null && (ne = ne.updateQueue, E = ne.lastBaseUpdate, E !== m && (E === null ? ne.firstBaseUpdate = B : E.next = B, ne.lastBaseUpdate = _));
    }
    if (f !== null) {
      var ie = c.baseState;
      m = 0, ne = B = _ = null, E = f;
      do {
        var re = E.lane, ze = E.eventTime;
        if ((s & re) === re) {
          ne !== null && (ne = ne.next = {
            eventTime: ze,
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          });
          e: {
            var He = r, Ve = E;
            switch (re = n, ze = i, Ve.tag) {
              case 1:
                if (He = Ve.payload, typeof He == "function") {
                  ie = He.call(ze, ie, re);
                  break e;
                }
                ie = He;
                break e;
              case 3:
                He.flags = He.flags & -65537 | 128;
              case 0:
                if (He = Ve.payload, re = typeof He == "function" ? He.call(ze, ie, re) : He, re == null) break e;
                ie = ye({}, ie, re);
                break e;
              case 2:
                Fa = !0;
            }
          }
          E.callback !== null && E.lane !== 0 && (r.flags |= 64, re = c.effects, re === null ? c.effects = [E] : re.push(E));
        } else ze = { eventTime: ze, lane: re, tag: E.tag, payload: E.payload, callback: E.callback, next: null }, ne === null ? (B = ne = ze, _ = ie) : ne = ne.next = ze, m |= re;
        if (E = E.next, E === null) {
          if (E = c.shared.pending, E === null) break;
          re = E, E = re.next, re.next = null, c.lastBaseUpdate = re, c.shared.pending = null;
        }
      } while (!0);
      if (ne === null && (_ = ie), c.baseState = _, c.firstBaseUpdate = B, c.lastBaseUpdate = ne, n = c.shared.interleaved, n !== null) {
        c = n;
        do
          m |= c.lane, c = c.next;
        while (c !== n);
      } else f === null && (c.shared.lanes = 0);
      Ol |= m, r.lanes = m, r.memoizedState = ie;
    }
  }
  function Uf(r, n, i) {
    if (r = n.effects, n.effects = null, r !== null) for (n = 0; n < r.length; n++) {
      var s = r[n], c = s.callback;
      if (c !== null) {
        if (s.callback = null, s = i, typeof c != "function") throw Error(b(191, c));
        c.call(s);
      }
    }
  }
  var ws = {}, Ro = ta(ws), Ru = ta(ws), _u = ta(ws);
  function xl(r) {
    if (r === ws) throw Error(b(174));
    return r;
  }
  function jf(r, n) {
    switch (cr(_u, n), cr(Ru, r), cr(Ro, ws), r = n.nodeType, r) {
      case 9:
      case 11:
        n = (n = n.documentElement) ? n.namespaceURI : sn(null, "");
        break;
      default:
        r = r === 8 ? n.parentNode : n, n = r.namespaceURI || null, r = r.tagName, n = sn(n, r);
    }
    Kt(Ro), cr(Ro, n);
  }
  function bs() {
    Kt(Ro), Kt(Ru), Kt(_u);
  }
  function Pf(r) {
    xl(_u.current);
    var n = xl(Ro.current), i = sn(n, r.type);
    n !== i && (cr(Ru, r), cr(Ro, i));
  }
  function Ff(r) {
    Ru.current === r && (Kt(Ro), Kt(Ru));
  }
  var Sr = ta(0);
  function Vc(r) {
    for (var n = r; n !== null; ) {
      if (n.tag === 13) {
        var i = n.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || i.data === "$?" || i.data === "$!")) return n;
      } else if (n.tag === 19 && n.memoizedProps.revealOrder !== void 0) {
        if (n.flags & 128) return n;
      } else if (n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === r) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === r) return null;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
    return null;
  }
  var Hf = [];
  function Du() {
    for (var r = 0; r < Hf.length; r++) Hf[r]._workInProgressVersionPrimary = null;
    Hf.length = 0;
  }
  var Qe = Me.ReactCurrentDispatcher, Et = Me.ReactCurrentBatchConfig, Lt = 0, pt = null, ar = null, Wr = null, Yc = !1, Ou = !1, zu = 0, Bf = 0;
  function q() {
    throw Error(b(321));
  }
  function Yr(r, n) {
    if (n === null) return !1;
    for (var i = 0; i < n.length && i < r.length; i++) if (!ro(r[i], n[i])) return !1;
    return !0;
  }
  function rt(r, n, i, s, c, f) {
    if (Lt = f, pt = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, Qe.current = r === null || r.memoizedState === null ? ad : od, r = i(s, c), Ou) {
      f = 0;
      do {
        if (Ou = !1, zu = 0, 25 <= f) throw Error(b(301));
        f += 1, Wr = ar = null, n.updateQueue = null, Qe.current = Uu, r = i(s, c);
      } while (Ou);
    }
    if (Qe.current = Zt, n = ar !== null && ar.next !== null, Lt = 0, Wr = ar = pt = null, Yc = !1, n) throw Error(b(300));
    return r;
  }
  function Li() {
    var r = zu !== 0;
    return zu = 0, r;
  }
  function rn() {
    var r = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Wr === null ? pt.memoizedState = Wr = r : Wr = Wr.next = r, Wr;
  }
  function nn() {
    if (ar === null) {
      var r = pt.alternate;
      r = r !== null ? r.memoizedState : null;
    } else r = ar.next;
    var n = Wr === null ? pt.memoizedState : Wr.next;
    if (n !== null) Wr = n, ar = r;
    else {
      if (r === null) throw Error(b(310));
      ar = r, r = { memoizedState: ar.memoizedState, baseState: ar.baseState, baseQueue: ar.baseQueue, queue: ar.queue, next: null }, Wr === null ? pt.memoizedState = Wr = r : Wr = Wr.next = r;
    }
    return Wr;
  }
  function aa(r, n) {
    return typeof n == "function" ? n(r) : n;
  }
  function Sl(r) {
    var n = nn(), i = n.queue;
    if (i === null) throw Error(b(311));
    i.lastRenderedReducer = r;
    var s = ar, c = s.baseQueue, f = i.pending;
    if (f !== null) {
      if (c !== null) {
        var m = c.next;
        c.next = f.next, f.next = m;
      }
      s.baseQueue = c = f, i.pending = null;
    }
    if (c !== null) {
      f = c.next, s = s.baseState;
      var E = m = null, _ = null, B = f;
      do {
        var ne = B.lane;
        if ((Lt & ne) === ne) _ !== null && (_ = _.next = { lane: 0, action: B.action, hasEagerState: B.hasEagerState, eagerState: B.eagerState, next: null }), s = B.hasEagerState ? B.eagerState : r(s, B.action);
        else {
          var ie = {
            lane: ne,
            action: B.action,
            hasEagerState: B.hasEagerState,
            eagerState: B.eagerState,
            next: null
          };
          _ === null ? (E = _ = ie, m = s) : _ = _.next = ie, pt.lanes |= ne, Ol |= ne;
        }
        B = B.next;
      } while (B !== null && B !== f);
      _ === null ? m = s : _.next = E, ro(s, n.memoizedState) || (an = !0), n.memoizedState = s, n.baseState = m, n.baseQueue = _, i.lastRenderedState = s;
    }
    if (r = i.interleaved, r !== null) {
      c = r;
      do
        f = c.lane, pt.lanes |= f, Ol |= f, c = c.next;
      while (c !== r);
    } else c === null && (i.lanes = 0);
    return [n.memoizedState, i.dispatch];
  }
  function Mi(r) {
    var n = nn(), i = n.queue;
    if (i === null) throw Error(b(311));
    i.lastRenderedReducer = r;
    var s = i.dispatch, c = i.pending, f = n.memoizedState;
    if (c !== null) {
      i.pending = null;
      var m = c = c.next;
      do
        f = r(f, m.action), m = m.next;
      while (m !== c);
      ro(f, n.memoizedState) || (an = !0), n.memoizedState = f, n.baseQueue === null && (n.baseState = f), i.lastRenderedState = f;
    }
    return [f, s];
  }
  function xs() {
  }
  function Ic(r, n) {
    var i = pt, s = nn(), c = n(), f = !ro(s.memoizedState, c);
    if (f && (s.memoizedState = c, an = !0), s = s.queue, Lu(Wc.bind(null, i, s, r), [r]), s.getSnapshot !== n || f || Wr !== null && Wr.memoizedState.tag & 1) {
      if (i.flags |= 2048, kl(9, Qc.bind(null, i, s, c, n), void 0, null), Ir === null) throw Error(b(349));
      Lt & 30 || $c(i, n, c);
    }
    return c;
  }
  function $c(r, n, i) {
    r.flags |= 16384, r = { getSnapshot: n, value: i }, n = pt.updateQueue, n === null ? (n = { lastEffect: null, stores: null }, pt.updateQueue = n, n.stores = [r]) : (i = n.stores, i === null ? n.stores = [r] : i.push(r));
  }
  function Qc(r, n, i, s) {
    n.value = i, n.getSnapshot = s, Xc(n) && qc(r);
  }
  function Wc(r, n, i) {
    return i(function() {
      Xc(n) && qc(r);
    });
  }
  function Xc(r) {
    var n = r.getSnapshot;
    r = r.value;
    try {
      var i = n();
      return !ro(r, i);
    } catch {
      return !0;
    }
  }
  function qc(r) {
    var n = To(r, 1);
    n !== null && Ca(n, r, 1, -1);
  }
  function Gc(r) {
    var n = rn();
    return typeof r == "function" && (r = r()), n.memoizedState = n.baseState = r, r = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: aa, lastRenderedState: r }, n.queue = r, r = r.dispatch = Au.bind(null, pt, r), [n.memoizedState, r];
  }
  function kl(r, n, i, s) {
    return r = { tag: r, create: n, destroy: i, deps: s, next: null }, n = pt.updateQueue, n === null ? (n = { lastEffect: null, stores: null }, pt.updateQueue = n, n.lastEffect = r.next = r) : (i = n.lastEffect, i === null ? n.lastEffect = r.next = r : (s = i.next, i.next = r, r.next = s, n.lastEffect = r)), r;
  }
  function Kc() {
    return nn().memoizedState;
  }
  function Ss(r, n, i, s) {
    var c = rn();
    pt.flags |= r, c.memoizedState = kl(1 | n, i, void 0, s === void 0 ? null : s);
  }
  function ks(r, n, i, s) {
    var c = nn();
    s = s === void 0 ? null : s;
    var f = void 0;
    if (ar !== null) {
      var m = ar.memoizedState;
      if (f = m.destroy, s !== null && Yr(s, m.deps)) {
        c.memoizedState = kl(n, i, f, s);
        return;
      }
    }
    pt.flags |= r, c.memoizedState = kl(1 | n, i, f, s);
  }
  function Jc(r, n) {
    return Ss(8390656, 8, r, n);
  }
  function Lu(r, n) {
    return ks(2048, 8, r, n);
  }
  function Zc(r, n) {
    return ks(4, 2, r, n);
  }
  function ed(r, n) {
    return ks(4, 4, r, n);
  }
  function Mu(r, n) {
    if (typeof n == "function") return r = r(), n(r), function() {
      n(null);
    };
    if (n != null) return r = r(), n.current = r, function() {
      n.current = null;
    };
  }
  function El(r, n, i) {
    return i = i != null ? i.concat([r]) : null, ks(4, 4, Mu.bind(null, n, r), i);
  }
  function Nu() {
  }
  function td(r, n) {
    var i = nn();
    n = n === void 0 ? null : n;
    var s = i.memoizedState;
    return s !== null && n !== null && Yr(n, s[1]) ? s[0] : (i.memoizedState = [r, n], r);
  }
  function rd(r, n) {
    var i = nn();
    n = n === void 0 ? null : n;
    var s = i.memoizedState;
    return s !== null && n !== null && Yr(n, s[1]) ? s[0] : (r = r(), i.memoizedState = [r, n], r);
  }
  function nd(r, n, i) {
    return Lt & 21 ? (ro(i, n) || (i = ol(), pt.lanes |= i, Ol |= i, r.baseState = !0), n) : (r.baseState && (r.baseState = !1, an = !0), r.memoizedState = i);
  }
  function th(r, n) {
    var i = Nt;
    Nt = i !== 0 && 4 > i ? i : 4, r(!0);
    var s = Et.transition;
    Et.transition = {};
    try {
      r(!1), n();
    } finally {
      Nt = i, Et.transition = s;
    }
  }
  function Es() {
    return nn().memoizedState;
  }
  function rh(r, n, i) {
    var s = Ea(r);
    if (i = { lane: s, action: i, hasEagerState: !1, eagerState: null, next: null }, Ni(r)) oa(n, i);
    else if (i = Jv(r, n, i, s), i !== null) {
      var c = dr();
      Ca(i, r, s, c), nh(i, n, s);
    }
  }
  function Au(r, n, i) {
    var s = Ea(r), c = { lane: s, action: i, hasEagerState: !1, eagerState: null, next: null };
    if (Ni(r)) oa(n, c);
    else {
      var f = r.alternate;
      if (r.lanes === 0 && (f === null || f.lanes === 0) && (f = n.lastRenderedReducer, f !== null)) try {
        var m = n.lastRenderedState, E = f(m, i);
        if (c.hasEagerState = !0, c.eagerState = E, ro(E, m)) {
          var _ = n.interleaved;
          _ === null ? (c.next = c, Af(n)) : (c.next = _.next, _.next = c), n.interleaved = c;
          return;
        }
      } catch {
      } finally {
      }
      i = Jv(r, n, c, s), i !== null && (c = dr(), Ca(i, r, s, c), nh(i, n, s));
    }
  }
  function Ni(r) {
    var n = r.alternate;
    return r === pt || n !== null && n === pt;
  }
  function oa(r, n) {
    Ou = Yc = !0;
    var i = r.pending;
    i === null ? n.next = n : (n.next = i.next, i.next = n), r.pending = n;
  }
  function nh(r, n, i) {
    if (i & 4194240) {
      var s = n.lanes;
      s &= r.pendingLanes, i |= s, n.lanes = i, au(r, i);
    }
  }
  var Zt = { readContext: Jt, useCallback: q, useContext: q, useEffect: q, useImperativeHandle: q, useInsertionEffect: q, useLayoutEffect: q, useMemo: q, useReducer: q, useRef: q, useState: q, useDebugValue: q, useDeferredValue: q, useTransition: q, useMutableSource: q, useSyncExternalStore: q, useId: q, unstable_isNewReconciler: !1 }, ad = { readContext: Jt, useCallback: function(r, n) {
    return rn().memoizedState = [r, n === void 0 ? null : n], r;
  }, useContext: Jt, useEffect: Jc, useImperativeHandle: function(r, n, i) {
    return i = i != null ? i.concat([r]) : null, Ss(
      4194308,
      4,
      Mu.bind(null, n, r),
      i
    );
  }, useLayoutEffect: function(r, n) {
    return Ss(4194308, 4, r, n);
  }, useInsertionEffect: function(r, n) {
    return Ss(4, 2, r, n);
  }, useMemo: function(r, n) {
    var i = rn();
    return n = n === void 0 ? null : n, r = r(), i.memoizedState = [r, n], r;
  }, useReducer: function(r, n, i) {
    var s = rn();
    return n = i !== void 0 ? i(n) : n, s.memoizedState = s.baseState = n, r = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: r, lastRenderedState: n }, s.queue = r, r = r.dispatch = rh.bind(null, pt, r), [s.memoizedState, r];
  }, useRef: function(r) {
    var n = rn();
    return r = { current: r }, n.memoizedState = r;
  }, useState: Gc, useDebugValue: Nu, useDeferredValue: function(r) {
    return rn().memoizedState = r;
  }, useTransition: function() {
    var r = Gc(!1), n = r[0];
    return r = th.bind(null, r[1]), rn().memoizedState = r, [n, r];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(r, n, i) {
    var s = pt, c = rn();
    if (yr) {
      if (i === void 0) throw Error(b(407));
      i = i();
    } else {
      if (i = n(), Ir === null) throw Error(b(349));
      Lt & 30 || $c(s, n, i);
    }
    c.memoizedState = i;
    var f = { value: i, getSnapshot: n };
    return c.queue = f, Jc(Wc.bind(
      null,
      s,
      f,
      r
    ), [r]), s.flags |= 2048, kl(9, Qc.bind(null, s, f, i, n), void 0, null), i;
  }, useId: function() {
    var r = rn(), n = Ir.identifierPrefix;
    if (yr) {
      var i = Co, s = Un;
      i = (s & ~(1 << 32 - Ln(s) - 1)).toString(32) + i, n = ":" + n + "R" + i, i = zu++, 0 < i && (n += "H" + i.toString(32)), n += ":";
    } else i = Bf++, n = ":" + n + "r" + i.toString(32) + ":";
    return r.memoizedState = n;
  }, unstable_isNewReconciler: !1 }, od = {
    readContext: Jt,
    useCallback: td,
    useContext: Jt,
    useEffect: Lu,
    useImperativeHandle: El,
    useInsertionEffect: Zc,
    useLayoutEffect: ed,
    useMemo: rd,
    useReducer: Sl,
    useRef: Kc,
    useState: function() {
      return Sl(aa);
    },
    useDebugValue: Nu,
    useDeferredValue: function(r) {
      var n = nn();
      return nd(n, ar.memoizedState, r);
    },
    useTransition: function() {
      var r = Sl(aa)[0], n = nn().memoizedState;
      return [r, n];
    },
    useMutableSource: xs,
    useSyncExternalStore: Ic,
    useId: Es,
    unstable_isNewReconciler: !1
  }, Uu = { readContext: Jt, useCallback: td, useContext: Jt, useEffect: Lu, useImperativeHandle: El, useInsertionEffect: Zc, useLayoutEffect: ed, useMemo: rd, useReducer: Mi, useRef: Kc, useState: function() {
    return Mi(aa);
  }, useDebugValue: Nu, useDeferredValue: function(r) {
    var n = nn();
    return ar === null ? n.memoizedState = r : nd(n, ar.memoizedState, r);
  }, useTransition: function() {
    var r = Mi(aa)[0], n = nn().memoizedState;
    return [r, n];
  }, useMutableSource: xs, useSyncExternalStore: Ic, useId: Es, unstable_isNewReconciler: !1 };
  function ia(r, n) {
    if (r && r.defaultProps) {
      n = ye({}, n), r = r.defaultProps;
      for (var i in r) n[i] === void 0 && (n[i] = r[i]);
      return n;
    }
    return n;
  }
  function Vf(r, n, i, s) {
    n = r.memoizedState, i = i(s, n), i = i == null ? n : ye({}, n, i), r.memoizedState = i, r.lanes === 0 && (r.updateQueue.baseState = i);
  }
  var id = { isMounted: function(r) {
    return (r = r._reactInternals) ? Te(r) === r : !1;
  }, enqueueSetState: function(r, n, i) {
    r = r._reactInternals;
    var s = dr(), c = Ea(r), f = ti(s, c);
    f.payload = n, i != null && (f.callback = i), n = zi(r, f, c), n !== null && (Ca(n, r, c, s), Hc(n, r, c));
  }, enqueueReplaceState: function(r, n, i) {
    r = r._reactInternals;
    var s = dr(), c = Ea(r), f = ti(s, c);
    f.tag = 1, f.payload = n, i != null && (f.callback = i), n = zi(r, f, c), n !== null && (Ca(n, r, c, s), Hc(n, r, c));
  }, enqueueForceUpdate: function(r, n) {
    r = r._reactInternals;
    var i = dr(), s = Ea(r), c = ti(i, s);
    c.tag = 2, n != null && (c.callback = n), n = zi(r, c, s), n !== null && (Ca(n, r, s, i), Hc(n, r, s));
  } };
  function ah(r, n, i, s, c, f, m) {
    return r = r.stateNode, typeof r.shouldComponentUpdate == "function" ? r.shouldComponentUpdate(s, f, m) : n.prototype && n.prototype.isPureReactComponent ? !du(i, s) || !du(c, f) : !0;
  }
  function oh(r, n, i) {
    var s = !1, c = St, f = n.contextType;
    return typeof f == "object" && f !== null ? f = Jt(f) : (c = _r(n) ? Pa : xr.current, s = n.contextTypes, f = (s = s != null) ? ba(r, c) : St), n = new n(i, f), r.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = id, r.stateNode = n, n._reactInternals = r, s && (r = r.stateNode, r.__reactInternalMemoizedUnmaskedChildContext = c, r.__reactInternalMemoizedMaskedChildContext = f), n;
  }
  function ld(r, n, i, s) {
    r = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(i, s), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(i, s), n.state !== r && id.enqueueReplaceState(n, n.state, null);
  }
  function Yf(r, n, i, s) {
    var c = r.stateNode;
    c.props = i, c.state = r.memoizedState, c.refs = {}, Oi(r);
    var f = n.contextType;
    typeof f == "object" && f !== null ? c.context = Jt(f) : (f = _r(n) ? Pa : xr.current, c.context = ba(r, f)), c.state = r.memoizedState, f = n.getDerivedStateFromProps, typeof f == "function" && (Vf(r, n, f, i), c.state = r.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (n = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), n !== c.state && id.enqueueReplaceState(c, c.state, null), Bc(r, i, c, s), c.state = r.memoizedState), typeof c.componentDidMount == "function" && (r.flags |= 4194308);
  }
  function Ai(r, n) {
    try {
      var i = "", s = n;
      do
        i += pe(s), s = s.return;
      while (s);
      var c = i;
    } catch (f) {
      c = `
Error generating stack: ` + f.message + `
` + f.stack;
    }
    return { value: r, source: n, stack: c, digest: null };
  }
  function sd(r, n, i) {
    return { value: r, source: null, stack: i ?? null, digest: n ?? null };
  }
  function If(r, n) {
    try {
      console.error(n.value);
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  var _g = typeof WeakMap == "function" ? WeakMap : Map;
  function ju(r, n, i) {
    i = ti(-1, i), i.tag = 3, i.payload = { element: null };
    var s = n.value;
    return i.callback = function() {
      ji || (ji = !0, $u = s), If(r, n);
    }, i;
  }
  function ih(r, n, i) {
    i = ti(-1, i), i.tag = 3;
    var s = r.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var c = n.value;
      i.payload = function() {
        return s(c);
      }, i.callback = function() {
        If(r, n);
      };
    }
    var f = r.stateNode;
    return f !== null && typeof f.componentDidCatch == "function" && (i.callback = function() {
      If(r, n), typeof s != "function" && (Va === null ? Va = /* @__PURE__ */ new Set([this]) : Va.add(this));
      var m = n.stack;
      this.componentDidCatch(n.value, { componentStack: m !== null ? m : "" });
    }), i;
  }
  function $f(r, n, i) {
    var s = r.pingCache;
    if (s === null) {
      s = r.pingCache = new _g();
      var c = /* @__PURE__ */ new Set();
      s.set(n, c);
    } else c = s.get(n), c === void 0 && (c = /* @__PURE__ */ new Set(), s.set(n, c));
    c.has(i) || (c.add(i), r = ap.bind(null, r, n, i), n.then(r, r));
  }
  function Qf(r) {
    do {
      var n;
      if ((n = r.tag === 13) && (n = r.memoizedState, n = n !== null ? n.dehydrated !== null : !0), n) return r;
      r = r.return;
    } while (r !== null);
    return null;
  }
  function lh(r, n, i, s, c) {
    return r.mode & 1 ? (r.flags |= 65536, r.lanes = c, r) : (r === n ? r.flags |= 65536 : (r.flags |= 128, i.flags |= 131072, i.flags &= -52805, i.tag === 1 && (i.alternate === null ? i.tag = 17 : (n = ti(-1, 1), n.tag = 2, zi(i, n, 1))), i.lanes |= 1), r);
  }
  var Cl = Me.ReactCurrentOwner, an = !1;
  function Nr(r, n, i, s) {
    n.child = r === null ? dn(n, null, i, s) : io(n, r.child, i, s);
  }
  function ud(r, n, i, s, c) {
    i = i.render;
    var f = n.ref;
    return ys(n, c), s = rt(r, n, i, s, f, c), i = Li(), r !== null && !an ? (n.updateQueue = r.updateQueue, n.flags &= -2053, r.lanes &= ~c, fn(r, n, c)) : (yr && i && Tf(n), n.flags |= 1, Nr(r, n, s, c), n.child);
  }
  function la(r, n, i, s, c) {
    if (r === null) {
      var f = i.type;
      return typeof f == "function" && !ip(f) && f.defaultProps === void 0 && i.compare === null && i.defaultProps === void 0 ? (n.tag = 15, n.type = f, Tl(r, n, f, s, c)) : (r = Ed(i.type, null, s, n, n.mode, c), r.ref = n.ref, r.return = n, n.child = r);
    }
    if (f = r.child, !(r.lanes & c)) {
      var m = f.memoizedProps;
      if (i = i.compare, i = i !== null ? i : du, i(m, s) && r.ref === n.ref) return fn(r, n, c);
    }
    return n.flags |= 1, r = Hi(f, s), r.ref = n.ref, r.return = n, n.child = r;
  }
  function Tl(r, n, i, s, c) {
    if (r !== null) {
      var f = r.memoizedProps;
      if (du(f, s) && r.ref === n.ref) if (an = !1, n.pendingProps = s = f, (r.lanes & c) !== 0) r.flags & 131072 && (an = !0);
      else return n.lanes = r.lanes, fn(r, n, c);
    }
    return cd(r, n, i, s, c);
  }
  function ht(r, n, i) {
    var s = n.pendingProps, c = s.children, f = r !== null ? r.memoizedState : null;
    if (s.mode === "hidden") if (!(n.mode & 1)) n.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, cr(_s, ka), ka |= i;
    else {
      if (!(i & 1073741824)) return r = f !== null ? f.baseLanes | i : i, n.lanes = n.childLanes = 1073741824, n.memoizedState = { baseLanes: r, cachePool: null, transitions: null }, n.updateQueue = null, cr(_s, ka), ka |= r, null;
      n.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, s = f !== null ? f.baseLanes : i, cr(_s, ka), ka |= s;
    }
    else f !== null ? (s = f.baseLanes | i, n.memoizedState = null) : s = i, cr(_s, ka), ka |= s;
    return Nr(r, n, c, i), n.child;
  }
  function Pu(r, n) {
    var i = n.ref;
    (r === null && i !== null || r !== null && r.ref !== i) && (n.flags |= 512, n.flags |= 2097152);
  }
  function cd(r, n, i, s, c) {
    var f = _r(i) ? Pa : xr.current;
    return f = ba(n, f), ys(n, c), i = rt(r, n, i, s, f, c), s = Li(), r !== null && !an ? (n.updateQueue = r.updateQueue, n.flags &= -2053, r.lanes &= ~c, fn(r, n, c)) : (yr && s && Tf(n), n.flags |= 1, Nr(r, n, i, c), n.child);
  }
  function Dg(r, n, i, s, c) {
    if (_r(i)) {
      var f = !0;
      gl(n);
    } else f = !1;
    if (ys(n, c), n.stateNode === null) Ha(r, n), oh(n, i, s), Yf(n, i, s, c), s = !0;
    else if (r === null) {
      var m = n.stateNode, E = n.memoizedProps;
      m.props = E;
      var _ = m.context, B = i.contextType;
      typeof B == "object" && B !== null ? B = Jt(B) : (B = _r(i) ? Pa : xr.current, B = ba(n, B));
      var ne = i.getDerivedStateFromProps, ie = typeof ne == "function" || typeof m.getSnapshotBeforeUpdate == "function";
      ie || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (E !== s || _ !== B) && ld(n, m, s, B), Fa = !1;
      var re = n.memoizedState;
      m.state = re, Bc(n, s, m, c), _ = n.memoizedState, E !== s || re !== _ || Br.current || Fa ? (typeof ne == "function" && (Vf(n, i, ne, s), _ = n.memoizedState), (E = Fa || ah(n, i, E, s, re, _, B)) ? (ie || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount()), typeof m.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof m.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = s, n.memoizedState = _), m.props = s, m.state = _, m.context = B, s = E) : (typeof m.componentDidMount == "function" && (n.flags |= 4194308), s = !1);
    } else {
      m = n.stateNode, Zv(r, n), E = n.memoizedProps, B = n.type === n.elementType ? E : ia(n.type, E), m.props = B, ie = n.pendingProps, re = m.context, _ = i.contextType, typeof _ == "object" && _ !== null ? _ = Jt(_) : (_ = _r(i) ? Pa : xr.current, _ = ba(n, _));
      var ze = i.getDerivedStateFromProps;
      (ne = typeof ze == "function" || typeof m.getSnapshotBeforeUpdate == "function") || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (E !== ie || re !== _) && ld(n, m, s, _), Fa = !1, re = n.memoizedState, m.state = re, Bc(n, s, m, c);
      var He = n.memoizedState;
      E !== ie || re !== He || Br.current || Fa ? (typeof ze == "function" && (Vf(n, i, ze, s), He = n.memoizedState), (B = Fa || ah(n, i, B, s, re, He, _) || !1) ? (ne || typeof m.UNSAFE_componentWillUpdate != "function" && typeof m.componentWillUpdate != "function" || (typeof m.componentWillUpdate == "function" && m.componentWillUpdate(s, He, _), typeof m.UNSAFE_componentWillUpdate == "function" && m.UNSAFE_componentWillUpdate(s, He, _)), typeof m.componentDidUpdate == "function" && (n.flags |= 4), typeof m.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof m.componentDidUpdate != "function" || E === r.memoizedProps && re === r.memoizedState || (n.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || E === r.memoizedProps && re === r.memoizedState || (n.flags |= 1024), n.memoizedProps = s, n.memoizedState = He), m.props = s, m.state = He, m.context = _, s = B) : (typeof m.componentDidUpdate != "function" || E === r.memoizedProps && re === r.memoizedState || (n.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || E === r.memoizedProps && re === r.memoizedState || (n.flags |= 1024), s = !1);
    }
    return Wf(r, n, i, s, f, c);
  }
  function Wf(r, n, i, s, c, f) {
    Pu(r, n);
    var m = (n.flags & 128) !== 0;
    if (!s && !m) return c && Rn(n, i, !1), fn(r, n, f);
    s = n.stateNode, Cl.current = n;
    var E = m && typeof i.getDerivedStateFromError != "function" ? null : s.render();
    return n.flags |= 1, r !== null && m ? (n.child = io(n, r.child, null, f), n.child = io(n, null, E, f)) : Nr(r, n, E, f), n.memoizedState = s.state, c && Rn(n, i, !0), n.child;
  }
  function dd(r) {
    var n = r.stateNode;
    n.pendingContext ? Pc(r, n.pendingContext, n.pendingContext !== n.context) : n.context && Pc(r, n.context, !1), jf(r, n.containerInfo);
  }
  function Cs(r, n, i, s, c) {
    return ei(), Cu(c), n.flags |= 256, Nr(r, n, i, s), n.child;
  }
  var Xf = { dehydrated: null, treeContext: null, retryLane: 0 };
  function fd(r) {
    return { baseLanes: r, cachePool: null, transitions: null };
  }
  function sh(r, n, i) {
    var s = n.pendingProps, c = Sr.current, f = !1, m = (n.flags & 128) !== 0, E;
    if ((E = m) || (E = r !== null && r.memoizedState === null ? !1 : (c & 2) !== 0), E ? (f = !0, n.flags &= -129) : (r === null || r.memoizedState !== null) && (c |= 1), cr(Sr, c & 1), r === null)
      return Of(n), r = n.memoizedState, r !== null && (r = r.dehydrated, r !== null) ? (n.mode & 1 ? r.data === "$!" ? n.lanes = 8 : n.lanes = 1073741824 : n.lanes = 1, null) : (m = s.children, r = s.fallback, f ? (s = n.mode, f = n.child, m = { mode: "hidden", children: m }, !(s & 1) && f !== null ? (f.childLanes = 0, f.pendingProps = m) : f = Ns(m, s, 0, null), r = Bi(r, s, i, null), f.return = n, r.return = n, f.sibling = r, n.child = f, n.child.memoizedState = fd(i), n.memoizedState = Xf, r) : Fu(n, m));
    if (c = r.memoizedState, c !== null && (E = c.dehydrated, E !== null)) return uh(r, n, m, s, E, c, i);
    if (f) {
      f = s.fallback, m = n.mode, c = r.child, E = c.sibling;
      var _ = { mode: "hidden", children: s.children };
      return !(m & 1) && n.child !== c ? (s = n.child, s.childLanes = 0, s.pendingProps = _, n.deletions = null) : (s = Hi(c, _), s.subtreeFlags = c.subtreeFlags & 14680064), E !== null ? f = Hi(E, f) : (f = Bi(f, m, i, null), f.flags |= 2), f.return = n, s.return = n, s.sibling = f, n.child = s, s = f, f = n.child, m = r.child.memoizedState, m = m === null ? fd(i) : { baseLanes: m.baseLanes | i, cachePool: null, transitions: m.transitions }, f.memoizedState = m, f.childLanes = r.childLanes & ~i, n.memoizedState = Xf, s;
    }
    return f = r.child, r = f.sibling, s = Hi(f, { mode: "visible", children: s.children }), !(n.mode & 1) && (s.lanes = i), s.return = n, s.sibling = null, r !== null && (i = n.deletions, i === null ? (n.deletions = [r], n.flags |= 16) : i.push(r)), n.child = s, n.memoizedState = null, s;
  }
  function Fu(r, n) {
    return n = Ns({ mode: "visible", children: n }, r.mode, 0, null), n.return = r, r.child = n;
  }
  function pd(r, n, i, s) {
    return s !== null && Cu(s), io(n, r.child, null, i), r = Fu(n, n.pendingProps.children), r.flags |= 2, n.memoizedState = null, r;
  }
  function uh(r, n, i, s, c, f, m) {
    if (i)
      return n.flags & 256 ? (n.flags &= -257, s = sd(Error(b(422))), pd(r, n, m, s)) : n.memoizedState !== null ? (n.child = r.child, n.flags |= 128, null) : (f = s.fallback, c = n.mode, s = Ns({ mode: "visible", children: s.children }, c, 0, null), f = Bi(f, c, m, null), f.flags |= 2, s.return = n, f.return = n, s.sibling = f, n.child = s, n.mode & 1 && io(n, r.child, null, m), n.child.memoizedState = fd(m), n.memoizedState = Xf, f);
    if (!(n.mode & 1)) return pd(r, n, m, null);
    if (c.data === "$!") {
      if (s = c.nextSibling && c.nextSibling.dataset, s) var E = s.dgst;
      return s = E, f = Error(b(419)), s = sd(f, s, void 0), pd(r, n, m, s);
    }
    if (E = (m & r.childLanes) !== 0, an || E) {
      if (s = Ir, s !== null) {
        switch (m & -m) {
          case 4:
            c = 2;
            break;
          case 16:
            c = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            c = 32;
            break;
          case 536870912:
            c = 268435456;
            break;
          default:
            c = 0;
        }
        c = c & (s.suspendedLanes | m) ? 0 : c, c !== 0 && c !== f.retryLane && (f.retryLane = c, To(r, c), Ca(s, r, c, -1));
      }
      return rp(), s = sd(Error(b(421))), pd(r, n, m, s);
    }
    return c.data === "$?" ? (n.flags |= 128, n.child = r.child, n = Ag.bind(null, r), c._reactRetry = n, null) : (r = f.treeContext, na = no(c.nextSibling), ra = n, yr = !0, oo = null, r !== null && (cn[Vr++] = Un, cn[Vr++] = Co, cn[Vr++] = yl, Un = r.id, Co = r.overflow, yl = n), n = Fu(n, s.children), n.flags |= 4096, n);
  }
  function qf(r, n, i) {
    r.lanes |= n;
    var s = r.alternate;
    s !== null && (s.lanes |= n), Nf(r.return, n, i);
  }
  function vd(r, n, i, s, c) {
    var f = r.memoizedState;
    f === null ? r.memoizedState = { isBackwards: n, rendering: null, renderingStartTime: 0, last: s, tail: i, tailMode: c } : (f.isBackwards = n, f.rendering = null, f.renderingStartTime = 0, f.last = s, f.tail = i, f.tailMode = c);
  }
  function sa(r, n, i) {
    var s = n.pendingProps, c = s.revealOrder, f = s.tail;
    if (Nr(r, n, s.children, i), s = Sr.current, s & 2) s = s & 1 | 2, n.flags |= 128;
    else {
      if (r !== null && r.flags & 128) e: for (r = n.child; r !== null; ) {
        if (r.tag === 13) r.memoizedState !== null && qf(r, i, n);
        else if (r.tag === 19) qf(r, i, n);
        else if (r.child !== null) {
          r.child.return = r, r = r.child;
          continue;
        }
        if (r === n) break e;
        for (; r.sibling === null; ) {
          if (r.return === null || r.return === n) break e;
          r = r.return;
        }
        r.sibling.return = r.return, r = r.sibling;
      }
      s &= 1;
    }
    if (cr(Sr, s), !(n.mode & 1)) n.memoizedState = null;
    else switch (c) {
      case "forwards":
        for (i = n.child, c = null; i !== null; ) r = i.alternate, r !== null && Vc(r) === null && (c = i), i = i.sibling;
        i = c, i === null ? (c = n.child, n.child = null) : (c = i.sibling, i.sibling = null), vd(n, !1, c, i, f);
        break;
      case "backwards":
        for (i = null, c = n.child, n.child = null; c !== null; ) {
          if (r = c.alternate, r !== null && Vc(r) === null) {
            n.child = c;
            break;
          }
          r = c.sibling, c.sibling = i, i = c, c = r;
        }
        vd(n, !0, i, null, f);
        break;
      case "together":
        vd(n, !1, null, null, void 0);
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function Ha(r, n) {
    !(n.mode & 1) && r !== null && (r.alternate = null, n.alternate = null, n.flags |= 2);
  }
  function fn(r, n, i) {
    if (r !== null && (n.dependencies = r.dependencies), Ol |= n.lanes, !(i & n.childLanes)) return null;
    if (r !== null && n.child !== r.child) throw Error(b(153));
    if (n.child !== null) {
      for (r = n.child, i = Hi(r, r.pendingProps), n.child = i, i.return = n; r.sibling !== null; ) r = r.sibling, i = i.sibling = Hi(r, r.pendingProps), i.return = n;
      i.sibling = null;
    }
    return n.child;
  }
  function hd(r, n, i) {
    switch (n.tag) {
      case 3:
        dd(n), ei();
        break;
      case 5:
        Pf(n);
        break;
      case 1:
        _r(n.type) && gl(n);
        break;
      case 4:
        jf(n, n.stateNode.containerInfo);
        break;
      case 10:
        var s = n.type._context, c = n.memoizedProps.value;
        cr(xe, s._currentValue), s._currentValue = c;
        break;
      case 13:
        if (s = n.memoizedState, s !== null)
          return s.dehydrated !== null ? (cr(Sr, Sr.current & 1), n.flags |= 128, null) : i & n.child.childLanes ? sh(r, n, i) : (cr(Sr, Sr.current & 1), r = fn(r, n, i), r !== null ? r.sibling : null);
        cr(Sr, Sr.current & 1);
        break;
      case 19:
        if (s = (i & n.childLanes) !== 0, r.flags & 128) {
          if (s) return sa(r, n, i);
          n.flags |= 128;
        }
        if (c = n.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), cr(Sr, Sr.current), s) break;
        return null;
      case 22:
      case 23:
        return n.lanes = 0, ht(r, n, i);
    }
    return fn(r, n, i);
  }
  var Ts, Sa, Xr, ch;
  Ts = function(r, n) {
    for (var i = n.child; i !== null; ) {
      if (i.tag === 5 || i.tag === 6) r.appendChild(i.stateNode);
      else if (i.tag !== 4 && i.child !== null) {
        i.child.return = i, i = i.child;
        continue;
      }
      if (i === n) break;
      for (; i.sibling === null; ) {
        if (i.return === null || i.return === n) return;
        i = i.return;
      }
      i.sibling.return = i.return, i = i.sibling;
    }
  }, Sa = function() {
  }, Xr = function(r, n, i, s) {
    var c = r.memoizedProps;
    if (c !== s) {
      r = n.stateNode, xl(Ro.current);
      var f = null;
      switch (i) {
        case "input":
          c = Yt(r, c), s = Yt(r, s), f = [];
          break;
        case "select":
          c = ye({}, c, { value: void 0 }), s = ye({}, s, { value: void 0 }), f = [];
          break;
        case "textarea":
          c = Jr(r, c), s = Jr(r, s), f = [];
          break;
        default:
          typeof c.onClick != "function" && typeof s.onClick == "function" && (r.onclick = Nc);
      }
      hr(i, s);
      var m;
      i = null;
      for (B in c) if (!s.hasOwnProperty(B) && c.hasOwnProperty(B) && c[B] != null) if (B === "style") {
        var E = c[B];
        for (m in E) E.hasOwnProperty(m) && (i || (i = {}), i[m] = "");
      } else B !== "dangerouslySetInnerHTML" && B !== "children" && B !== "suppressContentEditableWarning" && B !== "suppressHydrationWarning" && B !== "autoFocus" && (L.hasOwnProperty(B) ? f || (f = []) : (f = f || []).push(B, null));
      for (B in s) {
        var _ = s[B];
        if (E = c != null ? c[B] : void 0, s.hasOwnProperty(B) && _ !== E && (_ != null || E != null)) if (B === "style") if (E) {
          for (m in E) !E.hasOwnProperty(m) || _ && _.hasOwnProperty(m) || (i || (i = {}), i[m] = "");
          for (m in _) _.hasOwnProperty(m) && E[m] !== _[m] && (i || (i = {}), i[m] = _[m]);
        } else i || (f || (f = []), f.push(
          B,
          i
        )), i = _;
        else B === "dangerouslySetInnerHTML" ? (_ = _ ? _.__html : void 0, E = E ? E.__html : void 0, _ != null && E !== _ && (f = f || []).push(B, _)) : B === "children" ? typeof _ != "string" && typeof _ != "number" || (f = f || []).push(B, "" + _) : B !== "suppressContentEditableWarning" && B !== "suppressHydrationWarning" && (L.hasOwnProperty(B) ? (_ != null && B === "onScroll" && qt("scroll", r), f || E === _ || (f = [])) : (f = f || []).push(B, _));
      }
      i && (f = f || []).push("style", i);
      var B = f;
      (n.updateQueue = B) && (n.flags |= 4);
    }
  }, ch = function(r, n, i, s) {
    i !== s && (n.flags |= 4);
  };
  function Hu(r, n) {
    if (!yr) switch (r.tailMode) {
      case "hidden":
        n = r.tail;
        for (var i = null; n !== null; ) n.alternate !== null && (i = n), n = n.sibling;
        i === null ? r.tail = null : i.sibling = null;
        break;
      case "collapsed":
        i = r.tail;
        for (var s = null; i !== null; ) i.alternate !== null && (s = i), i = i.sibling;
        s === null ? n || r.tail === null ? r.tail = null : r.tail.sibling = null : s.sibling = null;
    }
  }
  function Dn(r) {
    var n = r.alternate !== null && r.alternate.child === r.child, i = 0, s = 0;
    if (n) for (var c = r.child; c !== null; ) i |= c.lanes | c.childLanes, s |= c.subtreeFlags & 14680064, s |= c.flags & 14680064, c.return = r, c = c.sibling;
    else for (c = r.child; c !== null; ) i |= c.lanes | c.childLanes, s |= c.subtreeFlags, s |= c.flags, c.return = r, c = c.sibling;
    return r.subtreeFlags |= s, r.childLanes = i, n;
  }
  function Gf(r, n, i) {
    var s = n.pendingProps;
    switch (Fc(n), n.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Dn(n), null;
      case 1:
        return _r(n.type) && Eo(), Dn(n), null;
      case 3:
        return s = n.stateNode, bs(), Kt(Br), Kt(xr), Du(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), (r === null || r.child === null) && (Mr(n) ? n.flags |= 4 : r === null || r.memoizedState.isDehydrated && !(n.flags & 256) || (n.flags |= 1024, oo !== null && (qu(oo), oo = null))), Sa(r, n), Dn(n), null;
      case 5:
        Ff(n);
        var c = xl(_u.current);
        if (i = n.type, r !== null && n.stateNode != null) Xr(r, n, i, s, c), r.ref !== n.ref && (n.flags |= 512, n.flags |= 2097152);
        else {
          if (!s) {
            if (n.stateNode === null) throw Error(b(166));
            return Dn(n), null;
          }
          if (r = xl(Ro.current), Mr(n)) {
            s = n.stateNode, i = n.type;
            var f = n.memoizedProps;
            switch (s[ja] = n, s[xu] = f, r = (n.mode & 1) !== 0, i) {
              case "dialog":
                qt("cancel", s), qt("close", s);
                break;
              case "iframe":
              case "object":
              case "embed":
                qt("load", s);
                break;
              case "video":
              case "audio":
                for (c = 0; c < mu.length; c++) qt(mu[c], s);
                break;
              case "source":
                qt("error", s);
                break;
              case "img":
              case "image":
              case "link":
                qt(
                  "error",
                  s
                ), qt("load", s);
                break;
              case "details":
                qt("toggle", s);
                break;
              case "input":
                Or(s, f), qt("invalid", s);
                break;
              case "select":
                s._wrapperState = { wasMultiple: !!f.multiple }, qt("invalid", s);
                break;
              case "textarea":
                Zr(s, f), qt("invalid", s);
            }
            hr(i, f), c = null;
            for (var m in f) if (f.hasOwnProperty(m)) {
              var E = f[m];
              m === "children" ? typeof E == "string" ? s.textContent !== E && (f.suppressHydrationWarning !== !0 && Mc(s.textContent, E, r), c = ["children", E]) : typeof E == "number" && s.textContent !== "" + E && (f.suppressHydrationWarning !== !0 && Mc(
                s.textContent,
                E,
                r
              ), c = ["children", "" + E]) : L.hasOwnProperty(m) && E != null && m === "onScroll" && qt("scroll", s);
            }
            switch (i) {
              case "input":
                Je(s), ha(s, f, !0);
                break;
              case "textarea":
                Je(s), Ja(s);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof f.onClick == "function" && (s.onclick = Nc);
            }
            s = c, n.updateQueue = s, s !== null && (n.flags |= 4);
          } else {
            m = c.nodeType === 9 ? c : c.ownerDocument, r === "http://www.w3.org/1999/xhtml" && (r = Fr(i)), r === "http://www.w3.org/1999/xhtml" ? i === "script" ? (r = m.createElement("div"), r.innerHTML = "<script><\/script>", r = r.removeChild(r.firstChild)) : typeof s.is == "string" ? r = m.createElement(i, { is: s.is }) : (r = m.createElement(i), i === "select" && (m = r, s.multiple ? m.multiple = !0 : s.size && (m.size = s.size))) : r = m.createElementNS(r, i), r[ja] = n, r[xu] = s, Ts(r, n, !1, !1), n.stateNode = r;
            e: {
              switch (m = mr(i, s), i) {
                case "dialog":
                  qt("cancel", r), qt("close", r), c = s;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  qt("load", r), c = s;
                  break;
                case "video":
                case "audio":
                  for (c = 0; c < mu.length; c++) qt(mu[c], r);
                  c = s;
                  break;
                case "source":
                  qt("error", r), c = s;
                  break;
                case "img":
                case "image":
                case "link":
                  qt(
                    "error",
                    r
                  ), qt("load", r), c = s;
                  break;
                case "details":
                  qt("toggle", r), c = s;
                  break;
                case "input":
                  Or(r, s), c = Yt(r, s), qt("invalid", r);
                  break;
                case "option":
                  c = s;
                  break;
                case "select":
                  r._wrapperState = { wasMultiple: !!s.multiple }, c = ye({}, s, { value: void 0 }), qt("invalid", r);
                  break;
                case "textarea":
                  Zr(r, s), c = Jr(r, s), qt("invalid", r);
                  break;
                default:
                  c = s;
              }
              hr(i, c), E = c;
              for (f in E) if (E.hasOwnProperty(f)) {
                var _ = E[f];
                f === "style" ? It(r, _) : f === "dangerouslySetInnerHTML" ? (_ = _ ? _.__html : void 0, _ != null && Fo(r, _)) : f === "children" ? typeof _ == "string" ? (i !== "textarea" || _ !== "") && ma(r, _) : typeof _ == "number" && ma(r, "" + _) : f !== "suppressContentEditableWarning" && f !== "suppressHydrationWarning" && f !== "autoFocus" && (L.hasOwnProperty(f) ? _ != null && f === "onScroll" && qt("scroll", r) : _ != null && Pe(r, f, _, m));
              }
              switch (i) {
                case "input":
                  Je(r), ha(r, s, !1);
                  break;
                case "textarea":
                  Je(r), Ja(r);
                  break;
                case "option":
                  s.value != null && r.setAttribute("value", "" + me(s.value));
                  break;
                case "select":
                  r.multiple = !!s.multiple, f = s.value, f != null ? Qr(r, !!s.multiple, f, !1) : s.defaultValue != null && Qr(
                    r,
                    !!s.multiple,
                    s.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof c.onClick == "function" && (r.onclick = Nc);
              }
              switch (i) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  s = !!s.autoFocus;
                  break e;
                case "img":
                  s = !0;
                  break e;
                default:
                  s = !1;
              }
            }
            s && (n.flags |= 4);
          }
          n.ref !== null && (n.flags |= 512, n.flags |= 2097152);
        }
        return Dn(n), null;
      case 6:
        if (r && n.stateNode != null) ch(r, n, r.memoizedProps, s);
        else {
          if (typeof s != "string" && n.stateNode === null) throw Error(b(166));
          if (i = xl(_u.current), xl(Ro.current), Mr(n)) {
            if (s = n.stateNode, i = n.memoizedProps, s[ja] = n, (f = s.nodeValue !== i) && (r = ra, r !== null)) switch (r.tag) {
              case 3:
                Mc(s.nodeValue, i, (r.mode & 1) !== 0);
                break;
              case 5:
                r.memoizedProps.suppressHydrationWarning !== !0 && Mc(s.nodeValue, i, (r.mode & 1) !== 0);
            }
            f && (n.flags |= 4);
          } else s = (i.nodeType === 9 ? i : i.ownerDocument).createTextNode(s), s[ja] = n, n.stateNode = s;
        }
        return Dn(n), null;
      case 13:
        if (Kt(Sr), s = n.memoizedState, r === null || r.memoizedState !== null && r.memoizedState.dehydrated !== null) {
          if (yr && na !== null && n.mode & 1 && !(n.flags & 128)) qv(), ei(), n.flags |= 98560, f = !1;
          else if (f = Mr(n), s !== null && s.dehydrated !== null) {
            if (r === null) {
              if (!f) throw Error(b(318));
              if (f = n.memoizedState, f = f !== null ? f.dehydrated : null, !f) throw Error(b(317));
              f[ja] = n;
            } else ei(), !(n.flags & 128) && (n.memoizedState = null), n.flags |= 4;
            Dn(n), f = !1;
          } else oo !== null && (qu(oo), oo = null), f = !0;
          if (!f) return n.flags & 65536 ? n : null;
        }
        return n.flags & 128 ? (n.lanes = i, n) : (s = s !== null, s !== (r !== null && r.memoizedState !== null) && s && (n.child.flags |= 8192, n.mode & 1 && (r === null || Sr.current & 1 ? qr === 0 && (qr = 3) : rp())), n.updateQueue !== null && (n.flags |= 4), Dn(n), null);
      case 4:
        return bs(), Sa(r, n), r === null && yu(n.stateNode.containerInfo), Dn(n), null;
      case 10:
        return Mf(n.type._context), Dn(n), null;
      case 17:
        return _r(n.type) && Eo(), Dn(n), null;
      case 19:
        if (Kt(Sr), f = n.memoizedState, f === null) return Dn(n), null;
        if (s = (n.flags & 128) !== 0, m = f.rendering, m === null) if (s) Hu(f, !1);
        else {
          if (qr !== 0 || r !== null && r.flags & 128) for (r = n.child; r !== null; ) {
            if (m = Vc(r), m !== null) {
              for (n.flags |= 128, Hu(f, !1), s = m.updateQueue, s !== null && (n.updateQueue = s, n.flags |= 4), n.subtreeFlags = 0, s = i, i = n.child; i !== null; ) f = i, r = s, f.flags &= 14680066, m = f.alternate, m === null ? (f.childLanes = 0, f.lanes = r, f.child = null, f.subtreeFlags = 0, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = m.childLanes, f.lanes = m.lanes, f.child = m.child, f.subtreeFlags = 0, f.deletions = null, f.memoizedProps = m.memoizedProps, f.memoizedState = m.memoizedState, f.updateQueue = m.updateQueue, f.type = m.type, r = m.dependencies, f.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }), i = i.sibling;
              return cr(Sr, Sr.current & 1 | 2), n.child;
            }
            r = r.sibling;
          }
          f.tail !== null && Qt() > Os && (n.flags |= 128, s = !0, Hu(f, !1), n.lanes = 4194304);
        }
        else {
          if (!s) if (r = Vc(m), r !== null) {
            if (n.flags |= 128, s = !0, i = r.updateQueue, i !== null && (n.updateQueue = i, n.flags |= 4), Hu(f, !0), f.tail === null && f.tailMode === "hidden" && !m.alternate && !yr) return Dn(n), null;
          } else 2 * Qt() - f.renderingStartTime > Os && i !== 1073741824 && (n.flags |= 128, s = !0, Hu(f, !1), n.lanes = 4194304);
          f.isBackwards ? (m.sibling = n.child, n.child = m) : (i = f.last, i !== null ? i.sibling = m : n.child = m, f.last = m);
        }
        return f.tail !== null ? (n = f.tail, f.rendering = n, f.tail = n.sibling, f.renderingStartTime = Qt(), n.sibling = null, i = Sr.current, cr(Sr, s ? i & 1 | 2 : i & 1), n) : (Dn(n), null);
      case 22:
      case 23:
        return tp(), s = n.memoizedState !== null, r !== null && r.memoizedState !== null !== s && (n.flags |= 8192), s && n.mode & 1 ? ka & 1073741824 && (Dn(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Dn(n), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(b(156, n.tag));
  }
  function dh(r, n) {
    switch (Fc(n), n.tag) {
      case 1:
        return _r(n.type) && Eo(), r = n.flags, r & 65536 ? (n.flags = r & -65537 | 128, n) : null;
      case 3:
        return bs(), Kt(Br), Kt(xr), Du(), r = n.flags, r & 65536 && !(r & 128) ? (n.flags = r & -65537 | 128, n) : null;
      case 5:
        return Ff(n), null;
      case 13:
        if (Kt(Sr), r = n.memoizedState, r !== null && r.dehydrated !== null) {
          if (n.alternate === null) throw Error(b(340));
          ei();
        }
        return r = n.flags, r & 65536 ? (n.flags = r & -65537 | 128, n) : null;
      case 19:
        return Kt(Sr), null;
      case 4:
        return bs(), null;
      case 10:
        return Mf(n.type._context), null;
      case 22:
      case 23:
        return tp(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Rl = !1, pn = !1, Og = typeof WeakSet == "function" ? WeakSet : Set, je = null;
  function Ui(r, n) {
    var i = r.ref;
    if (i !== null) if (typeof i == "function") try {
      i(null);
    } catch (s) {
      Dr(r, n, s);
    }
    else i.current = null;
  }
  function Kf(r, n, i) {
    try {
      i();
    } catch (s) {
      Dr(r, n, s);
    }
  }
  var Jf = !1;
  function zg(r, n) {
    if (vl = bi, r = ki(), ls(r)) {
      if ("selectionStart" in r) var i = { start: r.selectionStart, end: r.selectionEnd };
      else e: {
        i = (i = r.ownerDocument) && i.defaultView || window;
        var s = i.getSelection && i.getSelection();
        if (s && s.rangeCount !== 0) {
          i = s.anchorNode;
          var c = s.anchorOffset, f = s.focusNode;
          s = s.focusOffset;
          try {
            i.nodeType, f.nodeType;
          } catch {
            i = null;
            break e;
          }
          var m = 0, E = -1, _ = -1, B = 0, ne = 0, ie = r, re = null;
          t: for (; ; ) {
            for (var ze; ie !== i || c !== 0 && ie.nodeType !== 3 || (E = m + c), ie !== f || s !== 0 && ie.nodeType !== 3 || (_ = m + s), ie.nodeType === 3 && (m += ie.nodeValue.length), (ze = ie.firstChild) !== null; )
              re = ie, ie = ze;
            for (; ; ) {
              if (ie === r) break t;
              if (re === i && ++B === c && (E = m), re === f && ++ne === s && (_ = m), (ze = ie.nextSibling) !== null) break;
              ie = re, re = ie.parentNode;
            }
            ie = ze;
          }
          i = E === -1 || _ === -1 ? null : { start: E, end: _ };
        } else i = null;
      }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (bu = { focusedElem: r, selectionRange: i }, bi = !1, je = n; je !== null; ) if (n = je, r = n.child, (n.subtreeFlags & 1028) !== 0 && r !== null) r.return = n, je = r;
    else for (; je !== null; ) {
      n = je;
      try {
        var He = n.alternate;
        if (n.flags & 1024) switch (n.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (He !== null) {
              var Ve = He.memoizedProps, Ur = He.memoizedState, N = n.stateNode, O = N.getSnapshotBeforeUpdate(n.elementType === n.type ? Ve : ia(n.type, Ve), Ur);
              N.__reactInternalSnapshotBeforeUpdate = O;
            }
            break;
          case 3:
            var j = n.stateNode.containerInfo;
            j.nodeType === 1 ? j.textContent = "" : j.nodeType === 9 && j.documentElement && j.removeChild(j.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(b(163));
        }
      } catch (ce) {
        Dr(n, n.return, ce);
      }
      if (r = n.sibling, r !== null) {
        r.return = n.return, je = r;
        break;
      }
      je = n.return;
    }
    return He = Jf, Jf = !1, He;
  }
  function Rs(r, n, i) {
    var s = n.updateQueue;
    if (s = s !== null ? s.lastEffect : null, s !== null) {
      var c = s = s.next;
      do {
        if ((c.tag & r) === r) {
          var f = c.destroy;
          c.destroy = void 0, f !== void 0 && Kf(n, i, f);
        }
        c = c.next;
      } while (c !== s);
    }
  }
  function md(r, n) {
    if (n = n.updateQueue, n = n !== null ? n.lastEffect : null, n !== null) {
      var i = n = n.next;
      do {
        if ((i.tag & r) === r) {
          var s = i.create;
          i.destroy = s();
        }
        i = i.next;
      } while (i !== n);
    }
  }
  function gd(r) {
    var n = r.ref;
    if (n !== null) {
      var i = r.stateNode;
      switch (r.tag) {
        case 5:
          r = i;
          break;
        default:
          r = i;
      }
      typeof n == "function" ? n(r) : n.current = r;
    }
  }
  function fh(r) {
    var n = r.alternate;
    n !== null && (r.alternate = null, fh(n)), r.child = null, r.deletions = null, r.sibling = null, r.tag === 5 && (n = r.stateNode, n !== null && (delete n[ja], delete n[xu], delete n[kf], delete n[Ef], delete n[hs])), r.stateNode = null, r.return = null, r.dependencies = null, r.memoizedProps = null, r.memoizedState = null, r.pendingProps = null, r.stateNode = null, r.updateQueue = null;
  }
  function yd(r) {
    return r.tag === 5 || r.tag === 3 || r.tag === 4;
  }
  function Bu(r) {
    e: for (; ; ) {
      for (; r.sibling === null; ) {
        if (r.return === null || yd(r.return)) return null;
        r = r.return;
      }
      for (r.sibling.return = r.return, r = r.sibling; r.tag !== 5 && r.tag !== 6 && r.tag !== 18; ) {
        if (r.flags & 2 || r.child === null || r.tag === 4) continue e;
        r.child.return = r, r = r.child;
      }
      if (!(r.flags & 2)) return r.stateNode;
    }
  }
  function _o(r, n, i) {
    var s = r.tag;
    if (s === 5 || s === 6) r = r.stateNode, n ? i.nodeType === 8 ? i.parentNode.insertBefore(r, n) : i.insertBefore(r, n) : (i.nodeType === 8 ? (n = i.parentNode, n.insertBefore(r, i)) : (n = i, n.appendChild(r)), i = i._reactRootContainer, i != null || n.onclick !== null || (n.onclick = Nc));
    else if (s !== 4 && (r = r.child, r !== null)) for (_o(r, n, i), r = r.sibling; r !== null; ) _o(r, n, i), r = r.sibling;
  }
  function Do(r, n, i) {
    var s = r.tag;
    if (s === 5 || s === 6) r = r.stateNode, n ? i.insertBefore(r, n) : i.appendChild(r);
    else if (s !== 4 && (r = r.child, r !== null)) for (Do(r, n, i), r = r.sibling; r !== null; ) Do(r, n, i), r = r.sibling;
  }
  var kr = null, jn = !1;
  function Ba(r, n, i) {
    for (i = i.child; i !== null; ) ri(r, n, i), i = i.sibling;
  }
  function ri(r, n, i) {
    if (Kn && typeof Kn.onCommitFiberUnmount == "function") try {
      Kn.onCommitFiberUnmount(mi, i);
    } catch {
    }
    switch (i.tag) {
      case 5:
        pn || Ui(i, n);
      case 6:
        var s = kr, c = jn;
        kr = null, Ba(r, n, i), kr = s, jn = c, kr !== null && (jn ? (r = kr, i = i.stateNode, r.nodeType === 8 ? r.parentNode.removeChild(i) : r.removeChild(i)) : kr.removeChild(i.stateNode));
        break;
      case 18:
        kr !== null && (jn ? (r = kr, i = i.stateNode, r.nodeType === 8 ? ps(r.parentNode, i) : r.nodeType === 1 && ps(r, i), Na(r)) : ps(kr, i.stateNode));
        break;
      case 4:
        s = kr, c = jn, kr = i.stateNode.containerInfo, jn = !0, Ba(r, n, i), kr = s, jn = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!pn && (s = i.updateQueue, s !== null && (s = s.lastEffect, s !== null))) {
          c = s = s.next;
          do {
            var f = c, m = f.destroy;
            f = f.tag, m !== void 0 && (f & 2 || f & 4) && Kf(i, n, m), c = c.next;
          } while (c !== s);
        }
        Ba(r, n, i);
        break;
      case 1:
        if (!pn && (Ui(i, n), s = i.stateNode, typeof s.componentWillUnmount == "function")) try {
          s.props = i.memoizedProps, s.state = i.memoizedState, s.componentWillUnmount();
        } catch (E) {
          Dr(i, n, E);
        }
        Ba(r, n, i);
        break;
      case 21:
        Ba(r, n, i);
        break;
      case 22:
        i.mode & 1 ? (pn = (s = pn) || i.memoizedState !== null, Ba(r, n, i), pn = s) : Ba(r, n, i);
        break;
      default:
        Ba(r, n, i);
    }
  }
  function ph(r) {
    var n = r.updateQueue;
    if (n !== null) {
      r.updateQueue = null;
      var i = r.stateNode;
      i === null && (i = r.stateNode = new Og()), n.forEach(function(s) {
        var c = Ug.bind(null, r, s);
        i.has(s) || (i.add(s), s.then(c, c));
      });
    }
  }
  function lo(r, n) {
    var i = n.deletions;
    if (i !== null) for (var s = 0; s < i.length; s++) {
      var c = i[s];
      try {
        var f = r, m = n, E = m;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 5:
              kr = E.stateNode, jn = !1;
              break e;
            case 3:
              kr = E.stateNode.containerInfo, jn = !0;
              break e;
            case 4:
              kr = E.stateNode.containerInfo, jn = !0;
              break e;
          }
          E = E.return;
        }
        if (kr === null) throw Error(b(160));
        ri(f, m, c), kr = null, jn = !1;
        var _ = c.alternate;
        _ !== null && (_.return = null), c.return = null;
      } catch (B) {
        Dr(c, n, B);
      }
    }
    if (n.subtreeFlags & 12854) for (n = n.child; n !== null; ) vh(n, r), n = n.sibling;
  }
  function vh(r, n) {
    var i = r.alternate, s = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (lo(n, r), so(r), s & 4) {
          try {
            Rs(3, r, r.return), md(3, r);
          } catch (Ve) {
            Dr(r, r.return, Ve);
          }
          try {
            Rs(5, r, r.return);
          } catch (Ve) {
            Dr(r, r.return, Ve);
          }
        }
        break;
      case 1:
        lo(n, r), so(r), s & 512 && i !== null && Ui(i, i.return);
        break;
      case 5:
        if (lo(n, r), so(r), s & 512 && i !== null && Ui(i, i.return), r.flags & 32) {
          var c = r.stateNode;
          try {
            ma(c, "");
          } catch (Ve) {
            Dr(r, r.return, Ve);
          }
        }
        if (s & 4 && (c = r.stateNode, c != null)) {
          var f = r.memoizedProps, m = i !== null ? i.memoizedProps : f, E = r.type, _ = r.updateQueue;
          if (r.updateQueue = null, _ !== null) try {
            E === "input" && f.type === "radio" && f.name != null && Cr(c, f), mr(E, m);
            var B = mr(E, f);
            for (m = 0; m < _.length; m += 2) {
              var ne = _[m], ie = _[m + 1];
              ne === "style" ? It(c, ie) : ne === "dangerouslySetInnerHTML" ? Fo(c, ie) : ne === "children" ? ma(c, ie) : Pe(c, ne, ie, B);
            }
            switch (E) {
              case "input":
                Pr(c, f);
                break;
              case "textarea":
                kn(c, f);
                break;
              case "select":
                var re = c._wrapperState.wasMultiple;
                c._wrapperState.wasMultiple = !!f.multiple;
                var ze = f.value;
                ze != null ? Qr(c, !!f.multiple, ze, !1) : re !== !!f.multiple && (f.defaultValue != null ? Qr(
                  c,
                  !!f.multiple,
                  f.defaultValue,
                  !0
                ) : Qr(c, !!f.multiple, f.multiple ? [] : "", !1));
            }
            c[xu] = f;
          } catch (Ve) {
            Dr(r, r.return, Ve);
          }
        }
        break;
      case 6:
        if (lo(n, r), so(r), s & 4) {
          if (r.stateNode === null) throw Error(b(162));
          c = r.stateNode, f = r.memoizedProps;
          try {
            c.nodeValue = f;
          } catch (Ve) {
            Dr(r, r.return, Ve);
          }
        }
        break;
      case 3:
        if (lo(n, r), so(r), s & 4 && i !== null && i.memoizedState.isDehydrated) try {
          Na(n.containerInfo);
        } catch (Ve) {
          Dr(r, r.return, Ve);
        }
        break;
      case 4:
        lo(n, r), so(r);
        break;
      case 13:
        lo(n, r), so(r), c = r.child, c.flags & 8192 && (f = c.memoizedState !== null, c.stateNode.isHidden = f, !f || c.alternate !== null && c.alternate.memoizedState !== null || (ep = Qt())), s & 4 && ph(r);
        break;
      case 22:
        if (ne = i !== null && i.memoizedState !== null, r.mode & 1 ? (pn = (B = pn) || ne, lo(n, r), pn = B) : lo(n, r), so(r), s & 8192) {
          if (B = r.memoizedState !== null, (r.stateNode.isHidden = B) && !ne && r.mode & 1) for (je = r, ne = r.child; ne !== null; ) {
            for (ie = je = ne; je !== null; ) {
              switch (re = je, ze = re.child, re.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Rs(4, re, re.return);
                  break;
                case 1:
                  Ui(re, re.return);
                  var He = re.stateNode;
                  if (typeof He.componentWillUnmount == "function") {
                    s = re, i = re.return;
                    try {
                      n = s, He.props = n.memoizedProps, He.state = n.memoizedState, He.componentWillUnmount();
                    } catch (Ve) {
                      Dr(s, i, Ve);
                    }
                  }
                  break;
                case 5:
                  Ui(re, re.return);
                  break;
                case 22:
                  if (re.memoizedState !== null) {
                    mh(ie);
                    continue;
                  }
              }
              ze !== null ? (ze.return = re, je = ze) : mh(ie);
            }
            ne = ne.sibling;
          }
          e: for (ne = null, ie = r; ; ) {
            if (ie.tag === 5) {
              if (ne === null) {
                ne = ie;
                try {
                  c = ie.stateNode, B ? (f = c.style, typeof f.setProperty == "function" ? f.setProperty("display", "none", "important") : f.display = "none") : (E = ie.stateNode, _ = ie.memoizedProps.style, m = _ != null && _.hasOwnProperty("display") ? _.display : null, E.style.display = mt("display", m));
                } catch (Ve) {
                  Dr(r, r.return, Ve);
                }
              }
            } else if (ie.tag === 6) {
              if (ne === null) try {
                ie.stateNode.nodeValue = B ? "" : ie.memoizedProps;
              } catch (Ve) {
                Dr(r, r.return, Ve);
              }
            } else if ((ie.tag !== 22 && ie.tag !== 23 || ie.memoizedState === null || ie === r) && ie.child !== null) {
              ie.child.return = ie, ie = ie.child;
              continue;
            }
            if (ie === r) break e;
            for (; ie.sibling === null; ) {
              if (ie.return === null || ie.return === r) break e;
              ne === ie && (ne = null), ie = ie.return;
            }
            ne === ie && (ne = null), ie.sibling.return = ie.return, ie = ie.sibling;
          }
        }
        break;
      case 19:
        lo(n, r), so(r), s & 4 && ph(r);
        break;
      case 21:
        break;
      default:
        lo(
          n,
          r
        ), so(r);
    }
  }
  function so(r) {
    var n = r.flags;
    if (n & 2) {
      try {
        e: {
          for (var i = r.return; i !== null; ) {
            if (yd(i)) {
              var s = i;
              break e;
            }
            i = i.return;
          }
          throw Error(b(160));
        }
        switch (s.tag) {
          case 5:
            var c = s.stateNode;
            s.flags & 32 && (ma(c, ""), s.flags &= -33);
            var f = Bu(r);
            Do(r, f, c);
            break;
          case 3:
          case 4:
            var m = s.stateNode.containerInfo, E = Bu(r);
            _o(r, E, m);
            break;
          default:
            throw Error(b(161));
        }
      } catch (_) {
        Dr(r, r.return, _);
      }
      r.flags &= -3;
    }
    n & 4096 && (r.flags &= -4097);
  }
  function Vu(r, n, i) {
    je = r, hh(r);
  }
  function hh(r, n, i) {
    for (var s = (r.mode & 1) !== 0; je !== null; ) {
      var c = je, f = c.child;
      if (c.tag === 22 && s) {
        var m = c.memoizedState !== null || Rl;
        if (!m) {
          var E = c.alternate, _ = E !== null && E.memoizedState !== null || pn;
          E = Rl;
          var B = pn;
          if (Rl = m, (pn = _) && !B) for (je = c; je !== null; ) m = je, _ = m.child, m.tag === 22 && m.memoizedState !== null ? Yu(c) : _ !== null ? (_.return = m, je = _) : Yu(c);
          for (; f !== null; ) je = f, hh(f), f = f.sibling;
          je = c, Rl = E, pn = B;
        }
        Zf(r);
      } else c.subtreeFlags & 8772 && f !== null ? (f.return = c, je = f) : Zf(r);
    }
  }
  function Zf(r) {
    for (; je !== null; ) {
      var n = je;
      if (n.flags & 8772) {
        var i = n.alternate;
        try {
          if (n.flags & 8772) switch (n.tag) {
            case 0:
            case 11:
            case 15:
              pn || md(5, n);
              break;
            case 1:
              var s = n.stateNode;
              if (n.flags & 4 && !pn) if (i === null) s.componentDidMount();
              else {
                var c = n.elementType === n.type ? i.memoizedProps : ia(n.type, i.memoizedProps);
                s.componentDidUpdate(c, i.memoizedState, s.__reactInternalSnapshotBeforeUpdate);
              }
              var f = n.updateQueue;
              f !== null && Uf(n, f, s);
              break;
            case 3:
              var m = n.updateQueue;
              if (m !== null) {
                if (i = null, n.child !== null) switch (n.child.tag) {
                  case 5:
                    i = n.child.stateNode;
                    break;
                  case 1:
                    i = n.child.stateNode;
                }
                Uf(n, m, i);
              }
              break;
            case 5:
              var E = n.stateNode;
              if (i === null && n.flags & 4) {
                i = E;
                var _ = n.memoizedProps;
                switch (n.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    _.autoFocus && i.focus();
                    break;
                  case "img":
                    _.src && (i.src = _.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (n.memoizedState === null) {
                var B = n.alternate;
                if (B !== null) {
                  var ne = B.memoizedState;
                  if (ne !== null) {
                    var ie = ne.dehydrated;
                    ie !== null && Na(ie);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(b(163));
          }
          pn || n.flags & 512 && gd(n);
        } catch (re) {
          Dr(n, n.return, re);
        }
      }
      if (n === r) {
        je = null;
        break;
      }
      if (i = n.sibling, i !== null) {
        i.return = n.return, je = i;
        break;
      }
      je = n.return;
    }
  }
  function mh(r) {
    for (; je !== null; ) {
      var n = je;
      if (n === r) {
        je = null;
        break;
      }
      var i = n.sibling;
      if (i !== null) {
        i.return = n.return, je = i;
        break;
      }
      je = n.return;
    }
  }
  function Yu(r) {
    for (; je !== null; ) {
      var n = je;
      try {
        switch (n.tag) {
          case 0:
          case 11:
          case 15:
            var i = n.return;
            try {
              md(4, n);
            } catch (_) {
              Dr(n, i, _);
            }
            break;
          case 1:
            var s = n.stateNode;
            if (typeof s.componentDidMount == "function") {
              var c = n.return;
              try {
                s.componentDidMount();
              } catch (_) {
                Dr(n, c, _);
              }
            }
            var f = n.return;
            try {
              gd(n);
            } catch (_) {
              Dr(n, f, _);
            }
            break;
          case 5:
            var m = n.return;
            try {
              gd(n);
            } catch (_) {
              Dr(n, m, _);
            }
        }
      } catch (_) {
        Dr(n, n.return, _);
      }
      if (n === r) {
        je = null;
        break;
      }
      var E = n.sibling;
      if (E !== null) {
        E.return = n.return, je = E;
        break;
      }
      je = n.return;
    }
  }
  var gh = Math.ceil, wd = Me.ReactCurrentDispatcher, _l = Me.ReactCurrentOwner, On = Me.ReactCurrentBatchConfig, _t = 0, Ir = null, Ar = null, vn = 0, ka = 0, _s = ta(0), qr = 0, Dl = null, Ol = 0, zl = 0, Iu = 0, Ds = null, ua = null, ep = 0, Os = 1 / 0, ni = null, ji = !1, $u = null, Va = null, bd = !1, Pi = null, Qu = 0, zs = 0, Ls = null, Ll = -1, Wu = 0;
  function dr() {
    return _t & 6 ? Qt() : Ll !== -1 ? Ll : Ll = Qt();
  }
  function Ea(r) {
    return r.mode & 1 ? _t & 2 && vn !== 0 ? vn & -vn : wl.transition !== null ? (Wu === 0 && (Wu = ol()), Wu) : (r = Nt, r !== 0 || (r = window.event, r = r === void 0 ? 16 : iu(r.type)), r) : 1;
  }
  function Ca(r, n, i, s) {
    if (50 < zs) throw zs = 0, Ls = null, Error(b(185));
    wi(r, i, s), (!(_t & 2) || r !== Ir) && (r === Ir && (!(_t & 2) && (zl |= i), qr === 4 && Fi(r, vn)), on(r, s), i === 1 && _t === 0 && !(n.mode & 1) && (Os = Qt() + 500, ku && An()));
  }
  function on(r, n) {
    var i = r.callbackNode;
    Gl(r, n);
    var s = wo(r, r === Ir ? vn : 0);
    if (s === 0) i !== null && gr(i), r.callbackNode = null, r.callbackPriority = 0;
    else if (n = s & -s, r.callbackPriority !== n) {
      if (i != null && gr(i), n === 1) r.tag === 0 ? Cf(Ku.bind(null, r)) : Ci(Ku.bind(null, r)), Rg(function() {
        !(_t & 6) && An();
      }), i = null;
      else {
        switch (ou(s)) {
          case 1:
            i = ft;
            break;
          case 4:
            i = yo;
            break;
          case 16:
            i = Yo;
            break;
          case 536870912:
            i = Io;
            break;
          default:
            i = Yo;
        }
        i = kh(i, yh.bind(null, r));
      }
      r.callbackPriority = n, r.callbackNode = i;
    }
  }
  function yh(r, n) {
    if (Ll = -1, Wu = 0, _t & 6) throw Error(b(327));
    var i = r.callbackNode;
    if (Ms() && r.callbackNode !== i) return null;
    var s = wo(r, r === Ir ? vn : 0);
    if (s === 0) return null;
    if (s & 30 || s & r.expiredLanes || n) n = kd(r, s);
    else {
      n = s;
      var c = _t;
      _t |= 2;
      var f = wh();
      (Ir !== r || vn !== n) && (ni = null, Os = Qt() + 500, Nl(r, n));
      do
        try {
          Mg();
          break;
        } catch (E) {
          Sd(r, E);
        }
      while (!0);
      Lf(), wd.current = f, _t = c, Ar !== null ? n = 0 : (Ir = null, vn = 0, n = qr);
    }
    if (n !== 0) {
      if (n === 2 && (c = Qo(r), c !== 0 && (s = c, n = Xu(r, c))), n === 1) throw i = Dl, Nl(r, 0), Fi(r, s), on(r, Qt()), i;
      if (n === 6) Fi(r, s);
      else {
        if (c = r.current.alternate, !(s & 30) && !Gu(c) && (n = kd(r, s), n === 2 && (f = Qo(r), f !== 0 && (s = f, n = Xu(r, f))), n === 1)) throw i = Dl, Nl(r, 0), Fi(r, s), on(r, Qt()), i;
        switch (r.finishedWork = c, r.finishedLanes = s, n) {
          case 0:
          case 1:
            throw Error(b(345));
          case 2:
            Al(r, ua, ni);
            break;
          case 3:
            if (Fi(r, s), (s & 130023424) === s && (n = ep + 500 - Qt(), 10 < n)) {
              if (wo(r, 0) !== 0) break;
              if (c = r.suspendedLanes, (c & s) !== s) {
                dr(), r.pingedLanes |= r.suspendedLanes & c;
                break;
              }
              r.timeoutHandle = Ac(Al.bind(null, r, ua, ni), n);
              break;
            }
            Al(r, ua, ni);
            break;
          case 4:
            if (Fi(r, s), (s & 4194240) === s) break;
            for (n = r.eventTimes, c = -1; 0 < s; ) {
              var m = 31 - Ln(s);
              f = 1 << m, m = n[m], m > c && (c = m), s &= ~f;
            }
            if (s = c, s = Qt() - s, s = (120 > s ? 120 : 480 > s ? 480 : 1080 > s ? 1080 : 1920 > s ? 1920 : 3e3 > s ? 3e3 : 4320 > s ? 4320 : 1960 * gh(s / 1960)) - s, 10 < s) {
              r.timeoutHandle = Ac(Al.bind(null, r, ua, ni), s);
              break;
            }
            Al(r, ua, ni);
            break;
          case 5:
            Al(r, ua, ni);
            break;
          default:
            throw Error(b(329));
        }
      }
    }
    return on(r, Qt()), r.callbackNode === i ? yh.bind(null, r) : null;
  }
  function Xu(r, n) {
    var i = Ds;
    return r.current.memoizedState.isDehydrated && (Nl(r, n).flags |= 256), r = kd(r, n), r !== 2 && (n = ua, ua = i, n !== null && qu(n)), r;
  }
  function qu(r) {
    ua === null ? ua = r : ua.push.apply(ua, r);
  }
  function Gu(r) {
    for (var n = r; ; ) {
      if (n.flags & 16384) {
        var i = n.updateQueue;
        if (i !== null && (i = i.stores, i !== null)) for (var s = 0; s < i.length; s++) {
          var c = i[s], f = c.getSnapshot;
          c = c.value;
          try {
            if (!ro(f(), c)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (i = n.child, n.subtreeFlags & 16384 && i !== null) i.return = n, n = i;
      else {
        if (n === r) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === r) return !0;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
    }
    return !0;
  }
  function Fi(r, n) {
    for (n &= ~Iu, n &= ~zl, r.suspendedLanes |= n, r.pingedLanes &= ~n, r = r.expirationTimes; 0 < n; ) {
      var i = 31 - Ln(n), s = 1 << i;
      r[i] = -1, n &= ~s;
    }
  }
  function Ku(r) {
    if (_t & 6) throw Error(b(327));
    Ms();
    var n = wo(r, 0);
    if (!(n & 1)) return on(r, Qt()), null;
    var i = kd(r, n);
    if (r.tag !== 0 && i === 2) {
      var s = Qo(r);
      s !== 0 && (n = s, i = Xu(r, s));
    }
    if (i === 1) throw i = Dl, Nl(r, 0), Fi(r, n), on(r, Qt()), i;
    if (i === 6) throw Error(b(345));
    return r.finishedWork = r.current.alternate, r.finishedLanes = n, Al(r, ua, ni), on(r, Qt()), null;
  }
  function xd(r, n) {
    var i = _t;
    _t |= 1;
    try {
      return r(n);
    } finally {
      _t = i, _t === 0 && (Os = Qt() + 500, ku && An());
    }
  }
  function Ml(r) {
    Pi !== null && Pi.tag === 0 && !(_t & 6) && Ms();
    var n = _t;
    _t |= 1;
    var i = On.transition, s = Nt;
    try {
      if (On.transition = null, Nt = 1, r) return r();
    } finally {
      Nt = s, On.transition = i, _t = n, !(_t & 6) && An();
    }
  }
  function tp() {
    ka = _s.current, Kt(_s);
  }
  function Nl(r, n) {
    r.finishedWork = null, r.finishedLanes = 0;
    var i = r.timeoutHandle;
    if (i !== -1 && (r.timeoutHandle = -1, $v(i)), Ar !== null) for (i = Ar.return; i !== null; ) {
      var s = i;
      switch (Fc(s), s.tag) {
        case 1:
          s = s.type.childContextTypes, s != null && Eo();
          break;
        case 3:
          bs(), Kt(Br), Kt(xr), Du();
          break;
        case 5:
          Ff(s);
          break;
        case 4:
          bs();
          break;
        case 13:
          Kt(Sr);
          break;
        case 19:
          Kt(Sr);
          break;
        case 10:
          Mf(s.type._context);
          break;
        case 22:
        case 23:
          tp();
      }
      i = i.return;
    }
    if (Ir = r, Ar = r = Hi(r.current, null), vn = ka = n, qr = 0, Dl = null, Iu = zl = Ol = 0, ua = Ds = null, bl !== null) {
      for (n = 0; n < bl.length; n++) if (i = bl[n], s = i.interleaved, s !== null) {
        i.interleaved = null;
        var c = s.next, f = i.pending;
        if (f !== null) {
          var m = f.next;
          f.next = c, s.next = m;
        }
        i.pending = s;
      }
      bl = null;
    }
    return r;
  }
  function Sd(r, n) {
    do {
      var i = Ar;
      try {
        if (Lf(), Qe.current = Zt, Yc) {
          for (var s = pt.memoizedState; s !== null; ) {
            var c = s.queue;
            c !== null && (c.pending = null), s = s.next;
          }
          Yc = !1;
        }
        if (Lt = 0, Wr = ar = pt = null, Ou = !1, zu = 0, _l.current = null, i === null || i.return === null) {
          qr = 1, Dl = n, Ar = null;
          break;
        }
        e: {
          var f = r, m = i.return, E = i, _ = n;
          if (n = vn, E.flags |= 32768, _ !== null && typeof _ == "object" && typeof _.then == "function") {
            var B = _, ne = E, ie = ne.tag;
            if (!(ne.mode & 1) && (ie === 0 || ie === 11 || ie === 15)) {
              var re = ne.alternate;
              re ? (ne.updateQueue = re.updateQueue, ne.memoizedState = re.memoizedState, ne.lanes = re.lanes) : (ne.updateQueue = null, ne.memoizedState = null);
            }
            var ze = Qf(m);
            if (ze !== null) {
              ze.flags &= -257, lh(ze, m, E, f, n), ze.mode & 1 && $f(f, B, n), n = ze, _ = B;
              var He = n.updateQueue;
              if (He === null) {
                var Ve = /* @__PURE__ */ new Set();
                Ve.add(_), n.updateQueue = Ve;
              } else He.add(_);
              break e;
            } else {
              if (!(n & 1)) {
                $f(f, B, n), rp();
                break e;
              }
              _ = Error(b(426));
            }
          } else if (yr && E.mode & 1) {
            var Ur = Qf(m);
            if (Ur !== null) {
              !(Ur.flags & 65536) && (Ur.flags |= 256), lh(Ur, m, E, f, n), Cu(Ai(_, E));
              break e;
            }
          }
          f = _ = Ai(_, E), qr !== 4 && (qr = 2), Ds === null ? Ds = [f] : Ds.push(f), f = m;
          do {
            switch (f.tag) {
              case 3:
                f.flags |= 65536, n &= -n, f.lanes |= n;
                var N = ju(f, _, n);
                eh(f, N);
                break e;
              case 1:
                E = _;
                var O = f.type, j = f.stateNode;
                if (!(f.flags & 128) && (typeof O.getDerivedStateFromError == "function" || j !== null && typeof j.componentDidCatch == "function" && (Va === null || !Va.has(j)))) {
                  f.flags |= 65536, n &= -n, f.lanes |= n;
                  var ce = ih(f, E, n);
                  eh(f, ce);
                  break e;
                }
            }
            f = f.return;
          } while (f !== null);
        }
        bh(i);
      } catch (Re) {
        n = Re, Ar === i && i !== null && (Ar = i = i.return);
        continue;
      }
      break;
    } while (!0);
  }
  function wh() {
    var r = wd.current;
    return wd.current = Zt, r === null ? Zt : r;
  }
  function rp() {
    (qr === 0 || qr === 3 || qr === 2) && (qr = 4), Ir === null || !(Ol & 268435455) && !(zl & 268435455) || Fi(Ir, vn);
  }
  function kd(r, n) {
    var i = _t;
    _t |= 2;
    var s = wh();
    (Ir !== r || vn !== n) && (ni = null, Nl(r, n));
    do
      try {
        Lg();
        break;
      } catch (c) {
        Sd(r, c);
      }
    while (!0);
    if (Lf(), _t = i, wd.current = s, Ar !== null) throw Error(b(261));
    return Ir = null, vn = 0, qr;
  }
  function Lg() {
    for (; Ar !== null; ) np(Ar);
  }
  function Mg() {
    for (; Ar !== null && !En(); ) np(Ar);
  }
  function np(r) {
    var n = op(r.alternate, r, ka);
    r.memoizedProps = r.pendingProps, n === null ? bh(r) : Ar = n, _l.current = null;
  }
  function bh(r) {
    var n = r;
    do {
      var i = n.alternate;
      if (r = n.return, n.flags & 32768) {
        if (i = dh(i, n), i !== null) {
          i.flags &= 32767, Ar = i;
          return;
        }
        if (r !== null) r.flags |= 32768, r.subtreeFlags = 0, r.deletions = null;
        else {
          qr = 6, Ar = null;
          return;
        }
      } else if (i = Gf(i, n, ka), i !== null) {
        Ar = i;
        return;
      }
      if (n = n.sibling, n !== null) {
        Ar = n;
        return;
      }
      Ar = n = r;
    } while (n !== null);
    qr === 0 && (qr = 5);
  }
  function Al(r, n, i) {
    var s = Nt, c = On.transition;
    try {
      On.transition = null, Nt = 1, Ng(r, n, i, s);
    } finally {
      On.transition = c, Nt = s;
    }
    return null;
  }
  function Ng(r, n, i, s) {
    do
      Ms();
    while (Pi !== null);
    if (_t & 6) throw Error(b(327));
    i = r.finishedWork;
    var c = r.finishedLanes;
    if (i === null) return null;
    if (r.finishedWork = null, r.finishedLanes = 0, i === r.current) throw Error(b(177));
    r.callbackNode = null, r.callbackPriority = 0;
    var f = i.lanes | i.childLanes;
    if (nu(r, f), r === Ir && (Ar = Ir = null, vn = 0), !(i.subtreeFlags & 2064) && !(i.flags & 2064) || bd || (bd = !0, kh(Yo, function() {
      return Ms(), null;
    })), f = (i.flags & 15990) !== 0, i.subtreeFlags & 15990 || f) {
      f = On.transition, On.transition = null;
      var m = Nt;
      Nt = 1;
      var E = _t;
      _t |= 4, _l.current = null, zg(r, i), vh(i, r), Uv(bu), bi = !!vl, bu = vl = null, r.current = i, Vu(i), Za(), _t = E, Nt = m, On.transition = f;
    } else r.current = i;
    if (bd && (bd = !1, Pi = r, Qu = c), f = r.pendingLanes, f === 0 && (Va = null), tu(i.stateNode), on(r, Qt()), n !== null) for (s = r.onRecoverableError, i = 0; i < n.length; i++) c = n[i], s(c.value, { componentStack: c.stack, digest: c.digest });
    if (ji) throw ji = !1, r = $u, $u = null, r;
    return Qu & 1 && r.tag !== 0 && Ms(), f = r.pendingLanes, f & 1 ? r === Ls ? zs++ : (zs = 0, Ls = r) : zs = 0, An(), null;
  }
  function Ms() {
    if (Pi !== null) {
      var r = ou(Qu), n = On.transition, i = Nt;
      try {
        if (On.transition = null, Nt = 16 > r ? 16 : r, Pi === null) var s = !1;
        else {
          if (r = Pi, Pi = null, Qu = 0, _t & 6) throw Error(b(331));
          var c = _t;
          for (_t |= 4, je = r.current; je !== null; ) {
            var f = je, m = f.child;
            if (je.flags & 16) {
              var E = f.deletions;
              if (E !== null) {
                for (var _ = 0; _ < E.length; _++) {
                  var B = E[_];
                  for (je = B; je !== null; ) {
                    var ne = je;
                    switch (ne.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Rs(8, ne, f);
                    }
                    var ie = ne.child;
                    if (ie !== null) ie.return = ne, je = ie;
                    else for (; je !== null; ) {
                      ne = je;
                      var re = ne.sibling, ze = ne.return;
                      if (fh(ne), ne === B) {
                        je = null;
                        break;
                      }
                      if (re !== null) {
                        re.return = ze, je = re;
                        break;
                      }
                      je = ze;
                    }
                  }
                }
                var He = f.alternate;
                if (He !== null) {
                  var Ve = He.child;
                  if (Ve !== null) {
                    He.child = null;
                    do {
                      var Ur = Ve.sibling;
                      Ve.sibling = null, Ve = Ur;
                    } while (Ve !== null);
                  }
                }
                je = f;
              }
            }
            if (f.subtreeFlags & 2064 && m !== null) m.return = f, je = m;
            else e: for (; je !== null; ) {
              if (f = je, f.flags & 2048) switch (f.tag) {
                case 0:
                case 11:
                case 15:
                  Rs(9, f, f.return);
              }
              var N = f.sibling;
              if (N !== null) {
                N.return = f.return, je = N;
                break e;
              }
              je = f.return;
            }
          }
          var O = r.current;
          for (je = O; je !== null; ) {
            m = je;
            var j = m.child;
            if (m.subtreeFlags & 2064 && j !== null) j.return = m, je = j;
            else e: for (m = O; je !== null; ) {
              if (E = je, E.flags & 2048) try {
                switch (E.tag) {
                  case 0:
                  case 11:
                  case 15:
                    md(9, E);
                }
              } catch (Re) {
                Dr(E, E.return, Re);
              }
              if (E === m) {
                je = null;
                break e;
              }
              var ce = E.sibling;
              if (ce !== null) {
                ce.return = E.return, je = ce;
                break e;
              }
              je = E.return;
            }
          }
          if (_t = c, An(), Kn && typeof Kn.onPostCommitFiberRoot == "function") try {
            Kn.onPostCommitFiberRoot(mi, r);
          } catch {
          }
          s = !0;
        }
        return s;
      } finally {
        Nt = i, On.transition = n;
      }
    }
    return !1;
  }
  function xh(r, n, i) {
    n = Ai(i, n), n = ju(r, n, 1), r = zi(r, n, 1), n = dr(), r !== null && (wi(r, 1, n), on(r, n));
  }
  function Dr(r, n, i) {
    if (r.tag === 3) xh(r, r, i);
    else for (; n !== null; ) {
      if (n.tag === 3) {
        xh(n, r, i);
        break;
      } else if (n.tag === 1) {
        var s = n.stateNode;
        if (typeof n.type.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && (Va === null || !Va.has(s))) {
          r = Ai(i, r), r = ih(n, r, 1), n = zi(n, r, 1), r = dr(), n !== null && (wi(n, 1, r), on(n, r));
          break;
        }
      }
      n = n.return;
    }
  }
  function ap(r, n, i) {
    var s = r.pingCache;
    s !== null && s.delete(n), n = dr(), r.pingedLanes |= r.suspendedLanes & i, Ir === r && (vn & i) === i && (qr === 4 || qr === 3 && (vn & 130023424) === vn && 500 > Qt() - ep ? Nl(r, 0) : Iu |= i), on(r, n);
  }
  function Sh(r, n) {
    n === 0 && (r.mode & 1 ? (n = gi, gi <<= 1, !(gi & 130023424) && (gi = 4194304)) : n = 1);
    var i = dr();
    r = To(r, n), r !== null && (wi(r, n, i), on(r, i));
  }
  function Ag(r) {
    var n = r.memoizedState, i = 0;
    n !== null && (i = n.retryLane), Sh(r, i);
  }
  function Ug(r, n) {
    var i = 0;
    switch (r.tag) {
      case 13:
        var s = r.stateNode, c = r.memoizedState;
        c !== null && (i = c.retryLane);
        break;
      case 19:
        s = r.stateNode;
        break;
      default:
        throw Error(b(314));
    }
    s !== null && s.delete(n), Sh(r, i);
  }
  var op;
  op = function(r, n, i) {
    if (r !== null) if (r.memoizedProps !== n.pendingProps || Br.current) an = !0;
    else {
      if (!(r.lanes & i) && !(n.flags & 128)) return an = !1, hd(r, n, i);
      an = !!(r.flags & 131072);
    }
    else an = !1, yr && n.flags & 1048576 && Wv(n, _i, n.index);
    switch (n.lanes = 0, n.tag) {
      case 2:
        var s = n.type;
        Ha(r, n), r = n.pendingProps;
        var c = ba(n, xr.current);
        ys(n, i), c = rt(null, n, s, r, c, i);
        var f = Li();
        return n.flags |= 1, typeof c == "object" && c !== null && typeof c.render == "function" && c.$$typeof === void 0 ? (n.tag = 1, n.memoizedState = null, n.updateQueue = null, _r(s) ? (f = !0, gl(n)) : f = !1, n.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, Oi(n), c.updater = id, n.stateNode = c, c._reactInternals = n, Yf(n, s, r, i), n = Wf(null, n, s, !0, f, i)) : (n.tag = 0, yr && f && Tf(n), Nr(null, n, c, i), n = n.child), n;
      case 16:
        s = n.elementType;
        e: {
          switch (Ha(r, n), r = n.pendingProps, c = s._init, s = c(s._payload), n.type = s, c = n.tag = Pg(s), r = ia(s, r), c) {
            case 0:
              n = cd(null, n, s, r, i);
              break e;
            case 1:
              n = Dg(null, n, s, r, i);
              break e;
            case 11:
              n = ud(null, n, s, r, i);
              break e;
            case 14:
              n = la(null, n, s, ia(s.type, r), i);
              break e;
          }
          throw Error(b(
            306,
            s,
            ""
          ));
        }
        return n;
      case 0:
        return s = n.type, c = n.pendingProps, c = n.elementType === s ? c : ia(s, c), cd(r, n, s, c, i);
      case 1:
        return s = n.type, c = n.pendingProps, c = n.elementType === s ? c : ia(s, c), Dg(r, n, s, c, i);
      case 3:
        e: {
          if (dd(n), r === null) throw Error(b(387));
          s = n.pendingProps, f = n.memoizedState, c = f.element, Zv(r, n), Bc(n, s, null, i);
          var m = n.memoizedState;
          if (s = m.element, f.isDehydrated) if (f = { element: s, isDehydrated: !1, cache: m.cache, pendingSuspenseBoundaries: m.pendingSuspenseBoundaries, transitions: m.transitions }, n.updateQueue.baseState = f, n.memoizedState = f, n.flags & 256) {
            c = Ai(Error(b(423)), n), n = Cs(r, n, s, i, c);
            break e;
          } else if (s !== c) {
            c = Ai(Error(b(424)), n), n = Cs(r, n, s, i, c);
            break e;
          } else for (na = no(n.stateNode.containerInfo.firstChild), ra = n, yr = !0, oo = null, i = dn(n, null, s, i), n.child = i; i; ) i.flags = i.flags & -3 | 4096, i = i.sibling;
          else {
            if (ei(), s === c) {
              n = fn(r, n, i);
              break e;
            }
            Nr(r, n, s, i);
          }
          n = n.child;
        }
        return n;
      case 5:
        return Pf(n), r === null && Of(n), s = n.type, c = n.pendingProps, f = r !== null ? r.memoizedProps : null, m = c.children, hl(s, c) ? m = null : f !== null && hl(s, f) && (n.flags |= 32), Pu(r, n), Nr(r, n, m, i), n.child;
      case 6:
        return r === null && Of(n), null;
      case 13:
        return sh(r, n, i);
      case 4:
        return jf(n, n.stateNode.containerInfo), s = n.pendingProps, r === null ? n.child = io(n, null, s, i) : Nr(r, n, s, i), n.child;
      case 11:
        return s = n.type, c = n.pendingProps, c = n.elementType === s ? c : ia(s, c), ud(r, n, s, c, i);
      case 7:
        return Nr(r, n, n.pendingProps, i), n.child;
      case 8:
        return Nr(r, n, n.pendingProps.children, i), n.child;
      case 12:
        return Nr(r, n, n.pendingProps.children, i), n.child;
      case 10:
        e: {
          if (s = n.type._context, c = n.pendingProps, f = n.memoizedProps, m = c.value, cr(xe, s._currentValue), s._currentValue = m, f !== null) if (ro(f.value, m)) {
            if (f.children === c.children && !Br.current) {
              n = fn(r, n, i);
              break e;
            }
          } else for (f = n.child, f !== null && (f.return = n); f !== null; ) {
            var E = f.dependencies;
            if (E !== null) {
              m = f.child;
              for (var _ = E.firstContext; _ !== null; ) {
                if (_.context === s) {
                  if (f.tag === 1) {
                    _ = ti(-1, i & -i), _.tag = 2;
                    var B = f.updateQueue;
                    if (B !== null) {
                      B = B.shared;
                      var ne = B.pending;
                      ne === null ? _.next = _ : (_.next = ne.next, ne.next = _), B.pending = _;
                    }
                  }
                  f.lanes |= i, _ = f.alternate, _ !== null && (_.lanes |= i), Nf(
                    f.return,
                    i,
                    n
                  ), E.lanes |= i;
                  break;
                }
                _ = _.next;
              }
            } else if (f.tag === 10) m = f.type === n.type ? null : f.child;
            else if (f.tag === 18) {
              if (m = f.return, m === null) throw Error(b(341));
              m.lanes |= i, E = m.alternate, E !== null && (E.lanes |= i), Nf(m, i, n), m = f.sibling;
            } else m = f.child;
            if (m !== null) m.return = f;
            else for (m = f; m !== null; ) {
              if (m === n) {
                m = null;
                break;
              }
              if (f = m.sibling, f !== null) {
                f.return = m.return, m = f;
                break;
              }
              m = m.return;
            }
            f = m;
          }
          Nr(r, n, c.children, i), n = n.child;
        }
        return n;
      case 9:
        return c = n.type, s = n.pendingProps.children, ys(n, i), c = Jt(c), s = s(c), n.flags |= 1, Nr(r, n, s, i), n.child;
      case 14:
        return s = n.type, c = ia(s, n.pendingProps), c = ia(s.type, c), la(r, n, s, c, i);
      case 15:
        return Tl(r, n, n.type, n.pendingProps, i);
      case 17:
        return s = n.type, c = n.pendingProps, c = n.elementType === s ? c : ia(s, c), Ha(r, n), n.tag = 1, _r(s) ? (r = !0, gl(n)) : r = !1, ys(n, i), oh(n, s, c), Yf(n, s, c, i), Wf(null, n, s, !0, r, i);
      case 19:
        return sa(r, n, i);
      case 22:
        return ht(r, n, i);
    }
    throw Error(b(156, n.tag));
  };
  function kh(r, n) {
    return pr(r, n);
  }
  function jg(r, n, i, s) {
    this.tag = r, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = s, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ya(r, n, i, s) {
    return new jg(r, n, i, s);
  }
  function ip(r) {
    return r = r.prototype, !(!r || !r.isReactComponent);
  }
  function Pg(r) {
    if (typeof r == "function") return ip(r) ? 1 : 0;
    if (r != null) {
      if (r = r.$$typeof, r === zt) return 11;
      if (r === Dt) return 14;
    }
    return 2;
  }
  function Hi(r, n) {
    var i = r.alternate;
    return i === null ? (i = Ya(r.tag, n, r.key, r.mode), i.elementType = r.elementType, i.type = r.type, i.stateNode = r.stateNode, i.alternate = r, r.alternate = i) : (i.pendingProps = n, i.type = r.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = r.flags & 14680064, i.childLanes = r.childLanes, i.lanes = r.lanes, i.child = r.child, i.memoizedProps = r.memoizedProps, i.memoizedState = r.memoizedState, i.updateQueue = r.updateQueue, n = r.dependencies, i.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, i.sibling = r.sibling, i.index = r.index, i.ref = r.ref, i;
  }
  function Ed(r, n, i, s, c, f) {
    var m = 2;
    if (s = r, typeof r == "function") ip(r) && (m = 1);
    else if (typeof r == "string") m = 5;
    else e: switch (r) {
      case it:
        return Bi(i.children, c, f, n);
      case qe:
        m = 8, c |= 8;
        break;
      case Wt:
        return r = Ya(12, i, n, c | 2), r.elementType = Wt, r.lanes = f, r;
      case xt:
        return r = Ya(13, i, n, c), r.elementType = xt, r.lanes = f, r;
      case We:
        return r = Ya(19, i, n, c), r.elementType = We, r.lanes = f, r;
      case tt:
        return Ns(i, c, f, n);
      default:
        if (typeof r == "object" && r !== null) switch (r.$$typeof) {
          case Ct:
            m = 10;
            break e;
          case Vt:
            m = 9;
            break e;
          case zt:
            m = 11;
            break e;
          case Dt:
            m = 14;
            break e;
          case gt:
            m = 16, s = null;
            break e;
        }
        throw Error(b(130, r == null ? r : typeof r, ""));
    }
    return n = Ya(m, i, n, c), n.elementType = r, n.type = s, n.lanes = f, n;
  }
  function Bi(r, n, i, s) {
    return r = Ya(7, r, s, n), r.lanes = i, r;
  }
  function Ns(r, n, i, s) {
    return r = Ya(22, r, s, n), r.elementType = tt, r.lanes = i, r.stateNode = { isHidden: !1 }, r;
  }
  function Ul(r, n, i) {
    return r = Ya(6, r, null, n), r.lanes = i, r;
  }
  function lp(r, n, i) {
    return n = Ya(4, r.children !== null ? r.children : [], r.key, n), n.lanes = i, n.stateNode = { containerInfo: r.containerInfo, pendingChildren: null, implementation: r.implementation }, n;
  }
  function Eh(r, n, i, s, c) {
    this.tag = n, this.containerInfo = r, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = il(0), this.expirationTimes = il(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = il(0), this.identifierPrefix = s, this.onRecoverableError = c, this.mutableSourceEagerHydrationData = null;
  }
  function Cd(r, n, i, s, c, f, m, E, _) {
    return r = new Eh(r, n, i, E, _), n === 1 ? (n = 1, f === !0 && (n |= 8)) : n = 0, f = Ya(3, null, null, n), r.current = f, f.stateNode = r, f.memoizedState = { element: s, isDehydrated: i, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Oi(f), r;
  }
  function Ch(r, n, i) {
    var s = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: be, key: s == null ? null : "" + s, children: r, containerInfo: n, implementation: i };
  }
  function Th(r) {
    if (!r) return St;
    r = r._reactInternals;
    e: {
      if (Te(r) !== r || r.tag !== 1) throw Error(b(170));
      var n = r;
      do {
        switch (n.tag) {
          case 3:
            n = n.stateNode.context;
            break e;
          case 1:
            if (_r(n.type)) {
              n = n.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        n = n.return;
      } while (n !== null);
      throw Error(b(171));
    }
    if (r.tag === 1) {
      var i = r.type;
      if (_r(i)) return Qv(r, i, n);
    }
    return n;
  }
  function sp(r, n, i, s, c, f, m, E, _) {
    return r = Cd(i, s, !0, r, c, f, m, E, _), r.context = Th(null), i = r.current, s = dr(), c = Ea(i), f = ti(s, c), f.callback = n ?? null, zi(i, f, c), r.current.lanes = c, wi(r, c, s), on(r, s), r;
  }
  function Td(r, n, i, s) {
    var c = n.current, f = dr(), m = Ea(c);
    return i = Th(i), n.context === null ? n.context = i : n.pendingContext = i, n = ti(f, m), n.payload = { element: r }, s = s === void 0 ? null : s, s !== null && (n.callback = s), r = zi(c, n, m), r !== null && (Ca(r, c, m, f), Hc(r, c, m)), m;
  }
  function Rd(r) {
    if (r = r.current, !r.child) return null;
    switch (r.child.tag) {
      case 5:
        return r.child.stateNode;
      default:
        return r.child.stateNode;
    }
  }
  function Rh(r, n) {
    if (r = r.memoizedState, r !== null && r.dehydrated !== null) {
      var i = r.retryLane;
      r.retryLane = i !== 0 && i < n ? i : n;
    }
  }
  function _d(r, n) {
    Rh(r, n), (r = r.alternate) && Rh(r, n);
  }
  function _h() {
    return null;
  }
  var up = typeof reportError == "function" ? reportError : function(r) {
    console.error(r);
  };
  function Vi(r) {
    this._internalRoot = r;
  }
  Dd.prototype.render = Vi.prototype.render = function(r) {
    var n = this._internalRoot;
    if (n === null) throw Error(b(409));
    Td(r, n, null, null);
  }, Dd.prototype.unmount = Vi.prototype.unmount = function() {
    var r = this._internalRoot;
    if (r !== null) {
      this._internalRoot = null;
      var n = r.containerInfo;
      Ml(function() {
        Td(null, r, null, null);
      }), n[Jo] = null;
    }
  };
  function Dd(r) {
    this._internalRoot = r;
  }
  Dd.prototype.unstable_scheduleHydration = function(r) {
    if (r) {
      var n = bo();
      r = { blockedOn: null, target: r, priority: n };
      for (var i = 0; i < eo.length && n !== 0 && n < eo[i].priority; i++) ;
      eo.splice(i, 0, r), i === 0 && Jl(r);
    }
  };
  function cp(r) {
    return !(!r || r.nodeType !== 1 && r.nodeType !== 9 && r.nodeType !== 11);
  }
  function Od(r) {
    return !(!r || r.nodeType !== 1 && r.nodeType !== 9 && r.nodeType !== 11 && (r.nodeType !== 8 || r.nodeValue !== " react-mount-point-unstable "));
  }
  function Dh() {
  }
  function Fg(r, n, i, s, c) {
    if (c) {
      if (typeof s == "function") {
        var f = s;
        s = function() {
          var B = Rd(m);
          f.call(B);
        };
      }
      var m = sp(n, s, r, 0, null, !1, !1, "", Dh);
      return r._reactRootContainer = m, r[Jo] = m.current, yu(r.nodeType === 8 ? r.parentNode : r), Ml(), m;
    }
    for (; c = r.lastChild; ) r.removeChild(c);
    if (typeof s == "function") {
      var E = s;
      s = function() {
        var B = Rd(_);
        E.call(B);
      };
    }
    var _ = Cd(r, 0, !1, null, null, !1, !1, "", Dh);
    return r._reactRootContainer = _, r[Jo] = _.current, yu(r.nodeType === 8 ? r.parentNode : r), Ml(function() {
      Td(n, _, i, s);
    }), _;
  }
  function zd(r, n, i, s, c) {
    var f = i._reactRootContainer;
    if (f) {
      var m = f;
      if (typeof c == "function") {
        var E = c;
        c = function() {
          var _ = Rd(m);
          E.call(_);
        };
      }
      Td(n, m, r, c);
    } else m = Fg(i, n, r, c, s);
    return Rd(m);
  }
  Kl = function(r) {
    switch (r.tag) {
      case 3:
        var n = r.stateNode;
        if (n.current.memoizedState.isDehydrated) {
          var i = Jn(n.pendingLanes);
          i !== 0 && (au(n, i | 1), on(n, Qt()), !(_t & 6) && (Os = Qt() + 500, An()));
        }
        break;
      case 13:
        Ml(function() {
          var s = To(r, 1);
          if (s !== null) {
            var c = dr();
            Ca(s, r, 1, c);
          }
        }), _d(r, 1);
    }
  }, At = function(r) {
    if (r.tag === 13) {
      var n = To(r, 134217728);
      if (n !== null) {
        var i = dr();
        Ca(n, r, 134217728, i);
      }
      _d(r, 134217728);
    }
  }, Sc = function(r) {
    if (r.tag === 13) {
      var n = Ea(r), i = To(r, n);
      if (i !== null) {
        var s = dr();
        Ca(i, r, n, s);
      }
      _d(r, n);
    }
  }, bo = function() {
    return Nt;
  }, lt = function(r, n) {
    var i = Nt;
    try {
      return Nt = r, n();
    } finally {
      Nt = i;
    }
  }, er = function(r, n, i) {
    switch (n) {
      case "input":
        if (Pr(r, i), n = i.name, i.type === "radio" && n != null) {
          for (i = r; i.parentNode; ) i = i.parentNode;
          for (i = i.querySelectorAll("input[name=" + JSON.stringify("" + n) + '][type="radio"]'), n = 0; n < i.length; n++) {
            var s = i[n];
            if (s !== r && s.form === r.form) {
              var c = Zo(s);
              if (!c) throw Error(b(90));
              Pt(s), Pr(s, c);
            }
          }
        }
        break;
      case "textarea":
        kn(r, i);
        break;
      case "select":
        n = i.value, n != null && Qr(r, !!i.multiple, n, !1);
    }
  }, rl = xd, nl = Ml;
  var Oh = { usingClientEntryPoint: !1, Events: [Su, $e, Zo, La, Ho, xd] }, Ju = { findFiberByHostInstance: ml, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Hg = { bundleType: Ju.bundleType, version: Ju.version, rendererPackageName: Ju.rendererPackageName, rendererConfig: Ju.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Me.ReactCurrentDispatcher, findHostInstanceByFiber: function(r) {
    return r = yt(r), r === null ? null : r.stateNode;
  }, findFiberByHostInstance: Ju.findFiberByHostInstance || _h, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Zu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Zu.isDisabled && Zu.supportsFiber) try {
      mi = Zu.inject(Hg), Kn = Zu;
    } catch {
    }
  }
  return qa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Oh, qa.createPortal = function(r, n) {
    var i = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!cp(n)) throw Error(b(200));
    return Ch(r, n, null, i);
  }, qa.createRoot = function(r, n) {
    if (!cp(r)) throw Error(b(299));
    var i = !1, s = "", c = up;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (s = n.identifierPrefix), n.onRecoverableError !== void 0 && (c = n.onRecoverableError)), n = Cd(r, 1, !1, null, null, i, !1, s, c), r[Jo] = n.current, yu(r.nodeType === 8 ? r.parentNode : r), new Vi(n);
  }, qa.findDOMNode = function(r) {
    if (r == null) return null;
    if (r.nodeType === 1) return r;
    var n = r._reactInternals;
    if (n === void 0)
      throw typeof r.render == "function" ? Error(b(188)) : (r = Object.keys(r).join(","), Error(b(268, r)));
    return r = yt(n), r = r === null ? null : r.stateNode, r;
  }, qa.flushSync = function(r) {
    return Ml(r);
  }, qa.hydrate = function(r, n, i) {
    if (!Od(n)) throw Error(b(200));
    return zd(null, r, n, !0, i);
  }, qa.hydrateRoot = function(r, n, i) {
    if (!cp(r)) throw Error(b(405));
    var s = i != null && i.hydratedSources || null, c = !1, f = "", m = up;
    if (i != null && (i.unstable_strictMode === !0 && (c = !0), i.identifierPrefix !== void 0 && (f = i.identifierPrefix), i.onRecoverableError !== void 0 && (m = i.onRecoverableError)), n = sp(n, null, r, 1, i ?? null, c, !1, f, m), r[Jo] = n.current, yu(r), s) for (r = 0; r < s.length; r++) i = s[r], c = i._getVersion, c = c(i._source), n.mutableSourceEagerHydrationData == null ? n.mutableSourceEagerHydrationData = [i, c] : n.mutableSourceEagerHydrationData.push(
      i,
      c
    );
    return new Dd(n);
  }, qa.render = function(r, n, i) {
    if (!Od(n)) throw Error(b(200));
    return zd(null, r, n, !1, i);
  }, qa.unmountComponentAtNode = function(r) {
    if (!Od(r)) throw Error(b(40));
    return r._reactRootContainer ? (Ml(function() {
      zd(null, null, r, !1, function() {
        r._reactRootContainer = null, r[Jo] = null;
      });
    }), !0) : !1;
  }, qa.unstable_batchedUpdates = xd, qa.unstable_renderSubtreeIntoContainer = function(r, n, i, s) {
    if (!Od(i)) throw Error(b(200));
    if (r == null || r._reactInternals === void 0) throw Error(b(38));
    return zd(r, n, i, !1, s);
  }, qa.version = "18.3.1-next-f1338f8080-20240426", qa;
}
var Ga = {}, P5;
function cR() {
  if (P5) return Ga;
  P5 = 1;
  var y = {};
  /**
   * @license React
   * react-dom.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  return y.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var S = po, b = q5(), C = S.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, L = !1;
    function Y(e) {
      L = e;
    }
    function Z(e) {
      if (!L) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
          a[o - 1] = arguments[o];
        oe("warn", e, a);
      }
    }
    function g(e) {
      if (!L) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
          a[o - 1] = arguments[o];
        oe("error", e, a);
      }
    }
    function oe(e, t, a) {
      {
        var o = C.ReactDebugCurrentFrame, l = o.getStackAddendum();
        l !== "" && (t += "%s", a = a.concat([l]));
        var u = a.map(function(d) {
          return String(d);
        });
        u.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, u);
      }
    }
    var ee = 0, I = 1, fe = 2, J = 3, De = 4, ae = 5, H = 6, ue = 7, et = 8, ot = 9, Pe = 10, Me = 11, G = 12, be = 13, it = 14, qe = 15, Wt = 16, Ct = 17, Vt = 18, zt = 19, xt = 21, We = 22, Dt = 23, gt = 24, tt = 25, X = !0, Ne = !1, ye = !1, k = !1, M = !1, se = !0, he = !0, pe = !0, Ee = !0, Ce = /* @__PURE__ */ new Set(), me = {}, Ae = {};
    function Ye(e, t) {
      Je(e, t), Je(e + "Capture", t);
    }
    function Je(e, t) {
      me[e] && g("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), me[e] = t;
      {
        var a = e.toLowerCase();
        Ae[a] = e, e === "onDoubleClick" && (Ae.ondblclick = e);
      }
      for (var o = 0; o < t.length; o++)
        Ce.add(t[o]);
    }
    var Pt = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", ve = Object.prototype.hasOwnProperty;
    function Yt(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function Or(e) {
      try {
        return Cr(e), !1;
      } catch {
        return !0;
      }
    }
    function Cr(e) {
      return "" + e;
    }
    function Pr(e, t) {
      if (Or(e))
        return g("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Yt(e)), Cr(e);
    }
    function ha(e) {
      if (Or(e))
        return g("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Yt(e)), Cr(e);
    }
    function Ka(e, t) {
      if (Or(e))
        return g("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Yt(e)), Cr(e);
    }
    function zn(e, t) {
      if (Or(e))
        return g("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Yt(e)), Cr(e);
    }
    function Qr(e) {
      if (Or(e))
        return g("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", Yt(e)), Cr(e);
    }
    function Jr(e) {
      if (Or(e))
        return g("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", Yt(e)), Cr(e);
    }
    var Zr = 0, kn = 1, Ja = 2, Fr = 3, sn = 4, qn = 5, Fo = 6, ma = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ge = ma + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", Ge = new RegExp("^[" + ma + "][" + ge + "]*$"), mt = {}, It = {};
    function vr(e) {
      return ve.call(It, e) ? !0 : ve.call(mt, e) ? !1 : Ge.test(e) ? (It[e] = !0, !0) : (mt[e] = !0, g("Invalid attribute name: `%s`", e), !1);
    }
    function hr(e, t, a) {
      return t !== null ? t.type === Zr : a ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function mr(e, t, a, o) {
      if (a !== null && a.type === Zr)
        return !1;
      switch (typeof t) {
        case "function":
        case "symbol":
          return !0;
        case "boolean": {
          if (o)
            return !1;
          if (a !== null)
            return !a.acceptsBooleans;
          var l = e.toLowerCase().slice(0, 5);
          return l !== "data-" && l !== "aria-";
        }
        default:
          return !1;
      }
    }
    function en(e, t, a, o) {
      if (t === null || typeof t > "u" || mr(e, t, a, o))
        return !0;
      if (o)
        return !1;
      if (a !== null)
        switch (a.type) {
          case Fr:
            return !t;
          case sn:
            return t === !1;
          case qn:
            return isNaN(t);
          case Fo:
            return isNaN(t) || t < 1;
        }
      return !1;
    }
    function fr(e) {
      return $t.hasOwnProperty(e) ? $t[e] : null;
    }
    function er(e, t, a, o, l, u, d) {
      this.acceptsBooleans = t === Ja || t === Fr || t === sn, this.attributeName = o, this.attributeNamespace = l, this.mustUseProperty = a, this.propertyName = e, this.type = t, this.sanitizeURL = u, this.removeEmptyString = d;
    }
    var $t = {}, ga = [
      "children",
      "dangerouslySetInnerHTML",
      // TODO: This prevents the assignment of defaultValue to regular
      // elements (not just inputs). Now that ReactDOMInput assigns to the
      // defaultValue property -- do we need this?
      "defaultValue",
      "defaultChecked",
      "innerHTML",
      "suppressContentEditableWarning",
      "suppressHydrationWarning",
      "style"
    ];
    ga.forEach(function(e) {
      $t[e] = new er(
        e,
        Zr,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
      var t = e[0], a = e[1];
      $t[t] = new er(
        t,
        kn,
        !1,
        // mustUseProperty
        a,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
      $t[e] = new er(
        e,
        Ja,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
      $t[e] = new er(
        e,
        Ja,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "allowFullScreen",
      "async",
      // Note: there is a special case that prevents it from being written to the DOM
      // on the client side because the browsers are inconsistent. Instead we call focus().
      "autoFocus",
      "autoPlay",
      "controls",
      "default",
      "defer",
      "disabled",
      "disablePictureInPicture",
      "disableRemotePlayback",
      "formNoValidate",
      "hidden",
      "loop",
      "noModule",
      "noValidate",
      "open",
      "playsInline",
      "readOnly",
      "required",
      "reversed",
      "scoped",
      "seamless",
      // Microdata
      "itemScope"
    ].forEach(function(e) {
      $t[e] = new er(
        e,
        Fr,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "checked",
      // Note: `option.selected` is not updated if `select.multiple` is
      // disabled with `removeAttribute`. We have special logic for handling this.
      "multiple",
      "muted",
      "selected"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      $t[e] = new er(
        e,
        Fr,
        !0,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "capture",
      "download"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      $t[e] = new er(
        e,
        sn,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "cols",
      "rows",
      "size",
      "span"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      $t[e] = new er(
        e,
        Fo,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["rowSpan", "start"].forEach(function(e) {
      $t[e] = new er(
        e,
        qn,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var za = /[\-\:]([a-z])/g, La = function(e) {
      return e[1].toUpperCase();
    };
    [
      "accent-height",
      "alignment-baseline",
      "arabic-form",
      "baseline-shift",
      "cap-height",
      "clip-path",
      "clip-rule",
      "color-interpolation",
      "color-interpolation-filters",
      "color-profile",
      "color-rendering",
      "dominant-baseline",
      "enable-background",
      "fill-opacity",
      "fill-rule",
      "flood-color",
      "flood-opacity",
      "font-family",
      "font-size",
      "font-size-adjust",
      "font-stretch",
      "font-style",
      "font-variant",
      "font-weight",
      "glyph-name",
      "glyph-orientation-horizontal",
      "glyph-orientation-vertical",
      "horiz-adv-x",
      "horiz-origin-x",
      "image-rendering",
      "letter-spacing",
      "lighting-color",
      "marker-end",
      "marker-mid",
      "marker-start",
      "overline-position",
      "overline-thickness",
      "paint-order",
      "panose-1",
      "pointer-events",
      "rendering-intent",
      "shape-rendering",
      "stop-color",
      "stop-opacity",
      "strikethrough-position",
      "strikethrough-thickness",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke-width",
      "text-anchor",
      "text-decoration",
      "text-rendering",
      "underline-position",
      "underline-thickness",
      "unicode-bidi",
      "unicode-range",
      "units-per-em",
      "v-alphabetic",
      "v-hanging",
      "v-ideographic",
      "v-mathematical",
      "vector-effect",
      "vert-adv-y",
      "vert-origin-x",
      "vert-origin-y",
      "word-spacing",
      "writing-mode",
      "xmlns:xlink",
      "x-height"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(za, La);
      $t[t] = new er(
        t,
        kn,
        !1,
        // mustUseProperty
        e,
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xlink:actuate",
      "xlink:arcrole",
      "xlink:role",
      "xlink:show",
      "xlink:title",
      "xlink:type"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(za, La);
      $t[t] = new er(
        t,
        kn,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/1999/xlink",
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xml:base",
      "xml:lang",
      "xml:space"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(za, La);
      $t[t] = new er(
        t,
        kn,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      $t[e] = new er(
        e,
        kn,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var Ho = "xlinkHref";
    $t[Ho] = new er(
      "xlinkHref",
      kn,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      $t[e] = new er(
        e,
        kn,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !0,
        // sanitizeURL
        !0
      );
    });
    var rl = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, nl = !1;
    function Bo(e) {
      !nl && rl.test(e) && (nl = !0, g("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function al(e, t, a, o) {
      if (o.mustUseProperty) {
        var l = o.propertyName;
        return e[l];
      } else {
        Pr(a, t), o.sanitizeURL && Bo("" + a);
        var u = o.attributeName, d = null;
        if (o.type === sn) {
          if (e.hasAttribute(u)) {
            var p = e.getAttribute(u);
            return p === "" ? !0 : en(t, a, o, !1) ? p : p === "" + a ? a : p;
          }
        } else if (e.hasAttribute(u)) {
          if (en(t, a, o, !1))
            return e.getAttribute(u);
          if (o.type === Fr)
            return a;
          d = e.getAttribute(u);
        }
        return en(t, a, o, !1) ? d === null ? a : d : d === "" + a ? a : d;
      }
    }
    function ho(e, t, a, o) {
      {
        if (!vr(t))
          return;
        if (!e.hasAttribute(t))
          return a === void 0 ? void 0 : null;
        var l = e.getAttribute(t);
        return Pr(a, t), l === "" + a ? a : l;
      }
    }
    function ya(e, t, a, o) {
      var l = fr(t);
      if (!hr(t, l, o)) {
        if (en(t, a, l, o) && (a = null), o || l === null) {
          if (vr(t)) {
            var u = t;
            a === null ? e.removeAttribute(u) : (Pr(a, t), e.setAttribute(u, "" + a));
          }
          return;
        }
        var d = l.mustUseProperty;
        if (d) {
          var p = l.propertyName;
          if (a === null) {
            var v = l.type;
            e[p] = v === Fr ? !1 : "";
          } else
            e[p] = a;
          return;
        }
        var w = l.attributeName, x = l.attributeNamespace;
        if (a === null)
          e.removeAttribute(w);
        else {
          var z = l.type, D;
          z === Fr || z === sn && a === !0 ? D = "" : (Pr(a, w), D = "" + a, l.sanitizeURL && Bo(D.toString())), x ? e.setAttributeNS(x, w, D) : e.setAttribute(w, D);
        }
      }
    }
    var un = Symbol.for("react.element"), wa = Symbol.for("react.portal"), Gn = Symbol.for("react.fragment"), mo = Symbol.for("react.strict_mode"), go = Symbol.for("react.profiler"), Vo = Symbol.for("react.provider"), R = Symbol.for("react.context"), te = Symbol.for("react.forward_ref"), Se = Symbol.for("react.suspense"), Te = Symbol.for("react.suspense_list"), kt = Symbol.for("react.memo"), ut = Symbol.for("react.lazy"), Tt = Symbol.for("react.scope"), yt = Symbol.for("react.debug_trace_mode"), zr = Symbol.for("react.offscreen"), pr = Symbol.for("react.legacy_hidden"), gr = Symbol.for("react.cache"), En = Symbol.for("react.tracing_marker"), Za = Symbol.iterator, Qt = "@@iterator";
    function br(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = Za && e[Za] || e[Qt];
      return typeof t == "function" ? t : null;
    }
    var ft = Object.assign, yo = 0, Yo, wc, Io, mi, Kn, tu, Ln;
    function ru() {
    }
    ru.__reactDisabledLog = !0;
    function bc() {
      {
        if (yo === 0) {
          Yo = console.log, wc = console.info, Io = console.warn, mi = console.error, Kn = console.group, tu = console.groupCollapsed, Ln = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ru,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        yo++;
      }
    }
    function xc() {
      {
        if (yo--, yo === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: ft({}, e, {
              value: Yo
            }),
            info: ft({}, e, {
              value: wc
            }),
            warn: ft({}, e, {
              value: Io
            }),
            error: ft({}, e, {
              value: mi
            }),
            group: ft({}, e, {
              value: Kn
            }),
            groupCollapsed: ft({}, e, {
              value: tu
            }),
            groupEnd: ft({}, e, {
              value: Ln
            })
          });
        }
        yo < 0 && g("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var $o = C.ReactCurrentDispatcher, gi;
    function Jn(e, t, a) {
      {
        if (gi === void 0)
          try {
            throw Error();
          } catch (l) {
            var o = l.stack.trim().match(/\n( *(at )?)/);
            gi = o && o[1] || "";
          }
        return `
` + gi + e;
      }
    }
    var wo = !1, yi;
    {
      var Gl = typeof WeakMap == "function" ? WeakMap : Map;
      yi = new Gl();
    }
    function Qo(e, t) {
      if (!e || wo)
        return "";
      {
        var a = yi.get(e);
        if (a !== void 0)
          return a;
      }
      var o;
      wo = !0;
      var l = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var u;
      u = $o.current, $o.current = null, bc();
      try {
        if (t) {
          var d = function() {
            throw Error();
          };
          if (Object.defineProperty(d.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(d, []);
            } catch (V) {
              o = V;
            }
            Reflect.construct(e, [], d);
          } else {
            try {
              d.call();
            } catch (V) {
              o = V;
            }
            e.call(d.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (V) {
            o = V;
          }
          e();
        }
      } catch (V) {
        if (V && o && typeof V.stack == "string") {
          for (var p = V.stack.split(`
`), v = o.stack.split(`
`), w = p.length - 1, x = v.length - 1; w >= 1 && x >= 0 && p[w] !== v[x]; )
            x--;
          for (; w >= 1 && x >= 0; w--, x--)
            if (p[w] !== v[x]) {
              if (w !== 1 || x !== 1)
                do
                  if (w--, x--, x < 0 || p[w] !== v[x]) {
                    var z = `
` + p[w].replace(" at new ", " at ");
                    return e.displayName && z.includes("<anonymous>") && (z = z.replace("<anonymous>", e.displayName)), typeof e == "function" && yi.set(e, z), z;
                  }
                while (w >= 1 && x >= 0);
              break;
            }
        }
      } finally {
        wo = !1, $o.current = u, xc(), Error.prepareStackTrace = l;
      }
      var D = e ? e.displayName || e.name : "", F = D ? Jn(D) : "";
      return typeof e == "function" && yi.set(e, F), F;
    }
    function ol(e, t, a) {
      return Qo(e, !0);
    }
    function il(e, t, a) {
      return Qo(e, !1);
    }
    function wi(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function nu(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Qo(e, wi(e));
      if (typeof e == "string")
        return Jn(e);
      switch (e) {
        case Se:
          return Jn("Suspense");
        case Te:
          return Jn("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case te:
            return il(e.render);
          case kt:
            return nu(e.type, t, a);
          case ut: {
            var o = e, l = o._payload, u = o._init;
            try {
              return nu(u(l), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    function au(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case ae:
          return Jn(e.type);
        case Wt:
          return Jn("Lazy");
        case be:
          return Jn("Suspense");
        case zt:
          return Jn("SuspenseList");
        case ee:
        case fe:
        case qe:
          return il(e.type);
        case Me:
          return il(e.type.render);
        case I:
          return ol(e.type);
        default:
          return "";
      }
    }
    function Nt(e) {
      try {
        var t = "", a = e;
        do
          t += au(a), a = a.return;
        while (a);
        return t;
      } catch (o) {
        return `
Error generating stack: ` + o.message + `
` + o.stack;
      }
    }
    function ou(e, t, a) {
      var o = e.displayName;
      if (o)
        return o;
      var l = t.displayName || t.name || "";
      return l !== "" ? a + "(" + l + ")" : a;
    }
    function Kl(e) {
      return e.displayName || "Context";
    }
    function At(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && g("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case Gn:
          return "Fragment";
        case wa:
          return "Portal";
        case go:
          return "Profiler";
        case mo:
          return "StrictMode";
        case Se:
          return "Suspense";
        case Te:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case R:
            var t = e;
            return Kl(t) + ".Consumer";
          case Vo:
            var a = e;
            return Kl(a._context) + ".Provider";
          case te:
            return ou(e, e.render, "ForwardRef");
          case kt:
            var o = e.displayName || null;
            return o !== null ? o : At(e.type) || "Memo";
          case ut: {
            var l = e, u = l._payload, d = l._init;
            try {
              return At(d(u));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function Sc(e, t, a) {
      var o = t.displayName || t.name || "";
      return e.displayName || (o !== "" ? a + "(" + o + ")" : a);
    }
    function bo(e) {
      return e.displayName || "Context";
    }
    function lt(e) {
      var t = e.tag, a = e.type;
      switch (t) {
        case gt:
          return "Cache";
        case ot:
          var o = a;
          return bo(o) + ".Consumer";
        case Pe:
          var l = a;
          return bo(l._context) + ".Provider";
        case Vt:
          return "DehydratedFragment";
        case Me:
          return Sc(a, a.render, "ForwardRef");
        case ue:
          return "Fragment";
        case ae:
          return a;
        case De:
          return "Portal";
        case J:
          return "Root";
        case H:
          return "Text";
        case Wt:
          return At(a);
        case et:
          return a === mo ? "StrictMode" : "Mode";
        case We:
          return "Offscreen";
        case G:
          return "Profiler";
        case xt:
          return "Scope";
        case be:
          return "Suspense";
        case zt:
          return "SuspenseList";
        case tt:
          return "TracingMarker";
        case I:
        case ee:
        case Ct:
        case fe:
        case it:
        case qe:
          if (typeof a == "function")
            return a.displayName || a.name || null;
          if (typeof a == "string")
            return a;
          break;
      }
      return null;
    }
    var ll = C.ReactDebugCurrentFrame, tn = null, Zn = !1;
    function Mn() {
      {
        if (tn === null)
          return null;
        var e = tn._debugOwner;
        if (e !== null && typeof e < "u")
          return lt(e);
      }
      return null;
    }
    function xo() {
      return tn === null ? "" : Nt(tn);
    }
    function Tr() {
      ll.getCurrentStack = null, tn = null, Zn = !1;
    }
    function tr(e) {
      ll.getCurrentStack = e === null ? null : xo, tn = e, Zn = !1;
    }
    function eo() {
      return tn;
    }
    function Ma(e) {
      Zn = e;
    }
    function Cn(e) {
      return "" + e;
    }
    function Nn(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return Jr(e), e;
        default:
          return "";
      }
    }
    var uf = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function Jl(e, t) {
      uf[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || g("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || g("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function sl(e) {
      var t = e.type, a = e.nodeName;
      return a && a.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function Zl(e) {
      return e._valueTracker;
    }
    function es(e) {
      e._valueTracker = null;
    }
    function ul(e) {
      var t = "";
      return e && (sl(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
    }
    function Na(e) {
      var t = sl(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      Jr(e[t]);
      var o = "" + e[t];
      if (!(e.hasOwnProperty(t) || typeof a > "u" || typeof a.get != "function" || typeof a.set != "function")) {
        var l = a.get, u = a.set;
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return l.call(this);
          },
          set: function(p) {
            Jr(p), o = "" + p, u.call(this, p);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        });
        var d = {
          getValue: function() {
            return o;
          },
          setValue: function(p) {
            Jr(p), o = "" + p;
          },
          stopTracking: function() {
            es(e), delete e[t];
          }
        };
        return d;
      }
    }
    function Aa(e) {
      Zl(e) || (e._valueTracker = Na(e));
    }
    function bi(e) {
      if (!e)
        return !1;
      var t = Zl(e);
      if (!t)
        return !0;
      var a = t.getValue(), o = ul(e);
      return o !== a ? (t.setValue(o), !0) : !1;
    }
    function Wo(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var ts = !1, xi = !1, Xo = !1, rs = !1;
    function iu(e) {
      var t = e.type === "checkbox" || e.type === "radio";
      return t ? e.checked != null : e.value != null;
    }
    function Ua(e, t) {
      var a = e, o = t.checked, l = ft({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: o ?? a._wrapperState.initialChecked
      });
      return l;
    }
    function ns(e, t) {
      Jl("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !xi && (g("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Mn() || "A component", t.type), xi = !0), t.value !== void 0 && t.defaultValue !== void 0 && !ts && (g("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Mn() || "A component", t.type), ts = !0);
      var a = e, o = t.defaultValue == null ? "" : t.defaultValue;
      a._wrapperState = {
        initialChecked: t.checked != null ? t.checked : t.defaultChecked,
        initialValue: Nn(t.value != null ? t.value : o),
        controlled: iu(t)
      };
    }
    function h(e, t) {
      var a = e, o = t.checked;
      o != null && ya(a, "checked", o, !1);
    }
    function T(e, t) {
      var a = e;
      {
        var o = iu(t);
        !a._wrapperState.controlled && o && !rs && (g("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), rs = !0), a._wrapperState.controlled && !o && !Xo && (g("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Xo = !0);
      }
      h(e, t);
      var l = Nn(t.value), u = t.type;
      if (l != null)
        u === "number" ? (l === 0 && a.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        a.value != l) && (a.value = Cn(l)) : a.value !== Cn(l) && (a.value = Cn(l));
      else if (u === "submit" || u === "reset") {
        a.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? Fe(a, t.type, l) : t.hasOwnProperty("defaultValue") && Fe(a, t.type, Nn(t.defaultValue)), t.checked == null && t.defaultChecked != null && (a.defaultChecked = !!t.defaultChecked);
    }
    function P(e, t, a) {
      var o = e;
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var l = t.type, u = l === "submit" || l === "reset";
        if (u && (t.value === void 0 || t.value === null))
          return;
        var d = Cn(o._wrapperState.initialValue);
        a || d !== o.value && (o.value = d), o.defaultValue = d;
      }
      var p = o.name;
      p !== "" && (o.name = ""), o.defaultChecked = !o.defaultChecked, o.defaultChecked = !!o._wrapperState.initialChecked, p !== "" && (o.name = p);
    }
    function $(e, t) {
      var a = e;
      T(a, t), de(a, t);
    }
    function de(e, t) {
      var a = t.name;
      if (t.type === "radio" && a != null) {
        for (var o = e; o.parentNode; )
          o = o.parentNode;
        Pr(a, "name");
        for (var l = o.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), u = 0; u < l.length; u++) {
          var d = l[u];
          if (!(d === e || d.form !== e.form)) {
            var p = Wh(d);
            if (!p)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            bi(d), T(d, p);
          }
        }
      }
    }
    function Fe(e, t, a) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || Wo(e.ownerDocument) !== e) && (a == null ? e.defaultValue = Cn(e._wrapperState.initialValue) : e.defaultValue !== Cn(a) && (e.defaultValue = Cn(a)));
    }
    var Oe = !1, nt = !1, wt = !1;
    function Xt(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? S.Children.forEach(t.children, function(a) {
        a != null && (typeof a == "string" || typeof a == "number" || nt || (nt = !0, g("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (wt || (wt = !0, g("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !Oe && (g("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), Oe = !0);
    }
    function rr(e, t) {
      t.value != null && e.setAttribute("value", Cn(Nn(t.value)));
    }
    var nr = Array.isArray;
    function vt(e) {
      return nr(e);
    }
    var ur;
    ur = !1;
    function Lr() {
      var e = Mn();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var cl = ["value", "defaultValue"];
    function lu(e) {
      {
        Jl("select", e);
        for (var t = 0; t < cl.length; t++) {
          var a = cl[t];
          if (e[a] != null) {
            var o = vt(e[a]);
            e.multiple && !o ? g("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", a, Lr()) : !e.multiple && o && g("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", a, Lr());
          }
        }
      }
    }
    function qo(e, t, a, o) {
      var l = e.options;
      if (t) {
        for (var u = a, d = {}, p = 0; p < u.length; p++)
          d["$" + u[p]] = !0;
        for (var v = 0; v < l.length; v++) {
          var w = d.hasOwnProperty("$" + l[v].value);
          l[v].selected !== w && (l[v].selected = w), w && o && (l[v].defaultSelected = !0);
        }
      } else {
        for (var x = Cn(Nn(a)), z = null, D = 0; D < l.length; D++) {
          if (l[D].value === x) {
            l[D].selected = !0, o && (l[D].defaultSelected = !0);
            return;
          }
          z === null && !l[D].disabled && (z = l[D]);
        }
        z !== null && (z.selected = !0);
      }
    }
    function dl(e, t) {
      return ft({}, t, {
        value: void 0
      });
    }
    function su(e, t) {
      var a = e;
      lu(t), a._wrapperState = {
        wasMultiple: !!t.multiple
      }, t.value !== void 0 && t.defaultValue !== void 0 && !ur && (g("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), ur = !0);
    }
    function cf(e, t) {
      var a = e;
      a.multiple = !!t.multiple;
      var o = t.value;
      o != null ? qo(a, !!t.multiple, o, !1) : t.defaultValue != null && qo(a, !!t.multiple, t.defaultValue, !0);
    }
    function kc(e, t) {
      var a = e, o = a._wrapperState.wasMultiple;
      a._wrapperState.wasMultiple = !!t.multiple;
      var l = t.value;
      l != null ? qo(a, !!t.multiple, l, !1) : o !== !!t.multiple && (t.defaultValue != null ? qo(a, !!t.multiple, t.defaultValue, !0) : qo(a, !!t.multiple, t.multiple ? [] : "", !1));
    }
    function df(e, t) {
      var a = e, o = t.value;
      o != null && qo(a, !!t.multiple, o, !1);
    }
    var mv = !1;
    function Ec(e, t) {
      var a = e;
      if (t.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var o = ft({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: Cn(a._wrapperState.initialValue)
      });
      return o;
    }
    function gv(e, t) {
      var a = e;
      Jl("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !mv && (g("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Mn() || "A component"), mv = !0);
      var o = t.value;
      if (o == null) {
        var l = t.children, u = t.defaultValue;
        if (l != null) {
          g("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (u != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (vt(l)) {
              if (l.length > 1)
                throw new Error("<textarea> can only have at most one child.");
              l = l[0];
            }
            u = l;
          }
        }
        u == null && (u = ""), o = u;
      }
      a._wrapperState = {
        initialValue: Nn(o)
      };
    }
    function yv(e, t) {
      var a = e, o = Nn(t.value), l = Nn(t.defaultValue);
      if (o != null) {
        var u = Cn(o);
        u !== a.value && (a.value = u), t.defaultValue == null && a.defaultValue !== u && (a.defaultValue = u);
      }
      l != null && (a.defaultValue = Cn(l));
    }
    function wv(e, t) {
      var a = e, o = a.textContent;
      o === a._wrapperState.initialValue && o !== "" && o !== null && (a.value = o);
    }
    function hg(e, t) {
      yv(e, t);
    }
    var to = "http://www.w3.org/1999/xhtml", mg = "http://www.w3.org/1998/Math/MathML", ff = "http://www.w3.org/2000/svg";
    function pf(e) {
      switch (e) {
        case "svg":
          return ff;
        case "math":
          return mg;
        default:
          return to;
      }
    }
    function Cc(e, t) {
      return e == null || e === to ? pf(t) : e === ff && t === "foreignObject" ? to : e;
    }
    var gg = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, a, o, l) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, a, o, l);
        });
      } : e;
    }, Tc, bv = gg(function(e, t) {
      if (e.namespaceURI === ff && !("innerHTML" in e)) {
        Tc = Tc || document.createElement("div"), Tc.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var a = Tc.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; a.firstChild; )
          e.appendChild(a.firstChild);
        return;
      }
      e.innerHTML = t;
    }), ea = 1, Go = 3, Hr = 8, Ko = 9, uu = 11, Si = function(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === Go) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }, yg = {
      animation: ["animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction"],
      background: ["backgroundAttachment", "backgroundClip", "backgroundColor", "backgroundImage", "backgroundOrigin", "backgroundPositionX", "backgroundPositionY", "backgroundRepeat", "backgroundSize"],
      backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
      border: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth", "borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderBlockEnd: ["borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"],
      borderBlockStart: ["borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"],
      borderBottom: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth"],
      borderColor: ["borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor"],
      borderImage: ["borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth"],
      borderInlineEnd: ["borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"],
      borderInlineStart: ["borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"],
      borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
      borderRadius: ["borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"],
      borderRight: ["borderRightColor", "borderRightStyle", "borderRightWidth"],
      borderStyle: ["borderBottomStyle", "borderLeftStyle", "borderRightStyle", "borderTopStyle"],
      borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderWidth: ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth"],
      columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
      columns: ["columnCount", "columnWidth"],
      flex: ["flexBasis", "flexGrow", "flexShrink"],
      flexFlow: ["flexDirection", "flexWrap"],
      font: ["fontFamily", "fontFeatureSettings", "fontKerning", "fontLanguageOverride", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition", "fontWeight", "lineHeight"],
      fontVariant: ["fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition"],
      gap: ["columnGap", "rowGap"],
      grid: ["gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      gridArea: ["gridColumnEnd", "gridColumnStart", "gridRowEnd", "gridRowStart"],
      gridColumn: ["gridColumnEnd", "gridColumnStart"],
      gridColumnGap: ["columnGap"],
      gridGap: ["columnGap", "rowGap"],
      gridRow: ["gridRowEnd", "gridRowStart"],
      gridRowGap: ["rowGap"],
      gridTemplate: ["gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
      margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
      marker: ["markerEnd", "markerMid", "markerStart"],
      mask: ["maskClip", "maskComposite", "maskImage", "maskMode", "maskOrigin", "maskPositionX", "maskPositionY", "maskRepeat", "maskSize"],
      maskPosition: ["maskPositionX", "maskPositionY"],
      outline: ["outlineColor", "outlineStyle", "outlineWidth"],
      overflow: ["overflowX", "overflowY"],
      padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
      placeContent: ["alignContent", "justifyContent"],
      placeItems: ["alignItems", "justifyItems"],
      placeSelf: ["alignSelf", "justifySelf"],
      textDecoration: ["textDecorationColor", "textDecorationLine", "textDecorationStyle"],
      textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
      transition: ["transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction"],
      wordWrap: ["overflowWrap"]
    }, as = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      // SVG-related properties
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0
    };
    function xv(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var Sv = ["Webkit", "ms", "Moz", "O"];
    Object.keys(as).forEach(function(e) {
      Sv.forEach(function(t) {
        as[xv(t, e)] = as[e];
      });
    });
    function Rc(e, t, a) {
      var o = t == null || typeof t == "boolean" || t === "";
      return o ? "" : !a && typeof t == "number" && t !== 0 && !(as.hasOwnProperty(e) && as[e]) ? t + "px" : (zn(t, e), ("" + t).trim());
    }
    var kv = /([A-Z])/g, os = /^ms-/;
    function wg(e) {
      return e.replace(kv, "-$1").toLowerCase().replace(os, "-ms-");
    }
    var Ev = function() {
    };
    {
      var bg = /^(?:webkit|moz|o)[A-Z]/, Cv = /^-ms-/, Tv = /-(.)/g, is = /;\s*$/, So = {}, vf = {}, cu = !1, Rv = !1, _v = function(e) {
        return e.replace(Tv, function(t, a) {
          return a.toUpperCase();
        });
      }, hf = function(e) {
        So.hasOwnProperty(e) && So[e] || (So[e] = !0, g(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          _v(e.replace(Cv, "ms-"))
        ));
      }, mf = function(e) {
        So.hasOwnProperty(e) && So[e] || (So[e] = !0, g("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, Dv = function(e, t) {
        vf.hasOwnProperty(t) && vf[t] || (vf[t] = !0, g(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(is, "")));
      }, Ov = function(e, t) {
        cu || (cu = !0, g("`NaN` is an invalid value for the `%s` css style property.", e));
      }, zv = function(e, t) {
        Rv || (Rv = !0, g("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      Ev = function(e, t) {
        e.indexOf("-") > -1 ? hf(e) : bg.test(e) ? mf(e) : is.test(t) && Dv(e, t), typeof t == "number" && (isNaN(t) ? Ov(e, t) : isFinite(t) || zv(e, t));
      };
    }
    var xg = Ev;
    function Sg(e) {
      {
        var t = "", a = "";
        for (var o in e)
          if (e.hasOwnProperty(o)) {
            var l = e[o];
            if (l != null) {
              var u = o.indexOf("--") === 0;
              t += a + (u ? o : wg(o)) + ":", t += Rc(o, l, u), a = ";";
            }
          }
        return t || null;
      }
    }
    function Lv(e, t) {
      var a = e.style;
      for (var o in t)
        if (t.hasOwnProperty(o)) {
          var l = o.indexOf("--") === 0;
          l || xg(o, t[o]);
          var u = Rc(o, t[o], l);
          o === "float" && (o = "cssFloat"), l ? a.setProperty(o, u) : a[o] = u;
        }
    }
    function kg(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function Mv(e) {
      var t = {};
      for (var a in e)
        for (var o = yg[a] || [a], l = 0; l < o.length; l++)
          t[o[l]] = a;
      return t;
    }
    function ro(e, t) {
      {
        if (!t)
          return;
        var a = Mv(e), o = Mv(t), l = {};
        for (var u in a) {
          var d = a[u], p = o[u];
          if (p && d !== p) {
            var v = d + "," + p;
            if (l[v])
              continue;
            l[v] = !0, g("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", kg(e[d]) ? "Removing" : "Updating", d, p);
          }
        }
      }
    }
    var du = {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0
      // NOTE: menuitem's close tag should be omitted, but that causes problems.
    }, Nv = ft({
      menuitem: !0
    }, du), Av = "__html";
    function _c(e, t) {
      if (t) {
        if (Nv[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !(Av in t.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && g("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      }
    }
    function ki(e, t) {
      if (e.indexOf("-") === -1)
        return typeof t.is == "string";
      switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var ls = {
      // HTML
      accept: "accept",
      acceptcharset: "acceptCharset",
      "accept-charset": "acceptCharset",
      accesskey: "accessKey",
      action: "action",
      allowfullscreen: "allowFullScreen",
      alt: "alt",
      as: "as",
      async: "async",
      autocapitalize: "autoCapitalize",
      autocomplete: "autoComplete",
      autocorrect: "autoCorrect",
      autofocus: "autoFocus",
      autoplay: "autoPlay",
      autosave: "autoSave",
      capture: "capture",
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      challenge: "challenge",
      charset: "charSet",
      checked: "checked",
      children: "children",
      cite: "cite",
      class: "className",
      classid: "classID",
      classname: "className",
      cols: "cols",
      colspan: "colSpan",
      content: "content",
      contenteditable: "contentEditable",
      contextmenu: "contextMenu",
      controls: "controls",
      controlslist: "controlsList",
      coords: "coords",
      crossorigin: "crossOrigin",
      dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
      data: "data",
      datetime: "dateTime",
      default: "default",
      defaultchecked: "defaultChecked",
      defaultvalue: "defaultValue",
      defer: "defer",
      dir: "dir",
      disabled: "disabled",
      disablepictureinpicture: "disablePictureInPicture",
      disableremoteplayback: "disableRemotePlayback",
      download: "download",
      draggable: "draggable",
      enctype: "encType",
      enterkeyhint: "enterKeyHint",
      for: "htmlFor",
      form: "form",
      formmethod: "formMethod",
      formaction: "formAction",
      formenctype: "formEncType",
      formnovalidate: "formNoValidate",
      formtarget: "formTarget",
      frameborder: "frameBorder",
      headers: "headers",
      height: "height",
      hidden: "hidden",
      high: "high",
      href: "href",
      hreflang: "hrefLang",
      htmlfor: "htmlFor",
      httpequiv: "httpEquiv",
      "http-equiv": "httpEquiv",
      icon: "icon",
      id: "id",
      imagesizes: "imageSizes",
      imagesrcset: "imageSrcSet",
      innerhtml: "innerHTML",
      inputmode: "inputMode",
      integrity: "integrity",
      is: "is",
      itemid: "itemID",
      itemprop: "itemProp",
      itemref: "itemRef",
      itemscope: "itemScope",
      itemtype: "itemType",
      keyparams: "keyParams",
      keytype: "keyType",
      kind: "kind",
      label: "label",
      lang: "lang",
      list: "list",
      loop: "loop",
      low: "low",
      manifest: "manifest",
      marginwidth: "marginWidth",
      marginheight: "marginHeight",
      max: "max",
      maxlength: "maxLength",
      media: "media",
      mediagroup: "mediaGroup",
      method: "method",
      min: "min",
      minlength: "minLength",
      multiple: "multiple",
      muted: "muted",
      name: "name",
      nomodule: "noModule",
      nonce: "nonce",
      novalidate: "noValidate",
      open: "open",
      optimum: "optimum",
      pattern: "pattern",
      placeholder: "placeholder",
      playsinline: "playsInline",
      poster: "poster",
      preload: "preload",
      profile: "profile",
      radiogroup: "radioGroup",
      readonly: "readOnly",
      referrerpolicy: "referrerPolicy",
      rel: "rel",
      required: "required",
      reversed: "reversed",
      role: "role",
      rows: "rows",
      rowspan: "rowSpan",
      sandbox: "sandbox",
      scope: "scope",
      scoped: "scoped",
      scrolling: "scrolling",
      seamless: "seamless",
      selected: "selected",
      shape: "shape",
      size: "size",
      sizes: "sizes",
      span: "span",
      spellcheck: "spellCheck",
      src: "src",
      srcdoc: "srcDoc",
      srclang: "srcLang",
      srcset: "srcSet",
      start: "start",
      step: "step",
      style: "style",
      summary: "summary",
      tabindex: "tabIndex",
      target: "target",
      title: "title",
      type: "type",
      usemap: "useMap",
      value: "value",
      width: "width",
      wmode: "wmode",
      wrap: "wrap",
      // SVG
      about: "about",
      accentheight: "accentHeight",
      "accent-height": "accentHeight",
      accumulate: "accumulate",
      additive: "additive",
      alignmentbaseline: "alignmentBaseline",
      "alignment-baseline": "alignmentBaseline",
      allowreorder: "allowReorder",
      alphabetic: "alphabetic",
      amplitude: "amplitude",
      arabicform: "arabicForm",
      "arabic-form": "arabicForm",
      ascent: "ascent",
      attributename: "attributeName",
      attributetype: "attributeType",
      autoreverse: "autoReverse",
      azimuth: "azimuth",
      basefrequency: "baseFrequency",
      baselineshift: "baselineShift",
      "baseline-shift": "baselineShift",
      baseprofile: "baseProfile",
      bbox: "bbox",
      begin: "begin",
      bias: "bias",
      by: "by",
      calcmode: "calcMode",
      capheight: "capHeight",
      "cap-height": "capHeight",
      clip: "clip",
      clippath: "clipPath",
      "clip-path": "clipPath",
      clippathunits: "clipPathUnits",
      cliprule: "clipRule",
      "clip-rule": "clipRule",
      color: "color",
      colorinterpolation: "colorInterpolation",
      "color-interpolation": "colorInterpolation",
      colorinterpolationfilters: "colorInterpolationFilters",
      "color-interpolation-filters": "colorInterpolationFilters",
      colorprofile: "colorProfile",
      "color-profile": "colorProfile",
      colorrendering: "colorRendering",
      "color-rendering": "colorRendering",
      contentscripttype: "contentScriptType",
      contentstyletype: "contentStyleType",
      cursor: "cursor",
      cx: "cx",
      cy: "cy",
      d: "d",
      datatype: "datatype",
      decelerate: "decelerate",
      descent: "descent",
      diffuseconstant: "diffuseConstant",
      direction: "direction",
      display: "display",
      divisor: "divisor",
      dominantbaseline: "dominantBaseline",
      "dominant-baseline": "dominantBaseline",
      dur: "dur",
      dx: "dx",
      dy: "dy",
      edgemode: "edgeMode",
      elevation: "elevation",
      enablebackground: "enableBackground",
      "enable-background": "enableBackground",
      end: "end",
      exponent: "exponent",
      externalresourcesrequired: "externalResourcesRequired",
      fill: "fill",
      fillopacity: "fillOpacity",
      "fill-opacity": "fillOpacity",
      fillrule: "fillRule",
      "fill-rule": "fillRule",
      filter: "filter",
      filterres: "filterRes",
      filterunits: "filterUnits",
      floodopacity: "floodOpacity",
      "flood-opacity": "floodOpacity",
      floodcolor: "floodColor",
      "flood-color": "floodColor",
      focusable: "focusable",
      fontfamily: "fontFamily",
      "font-family": "fontFamily",
      fontsize: "fontSize",
      "font-size": "fontSize",
      fontsizeadjust: "fontSizeAdjust",
      "font-size-adjust": "fontSizeAdjust",
      fontstretch: "fontStretch",
      "font-stretch": "fontStretch",
      fontstyle: "fontStyle",
      "font-style": "fontStyle",
      fontvariant: "fontVariant",
      "font-variant": "fontVariant",
      fontweight: "fontWeight",
      "font-weight": "fontWeight",
      format: "format",
      from: "from",
      fx: "fx",
      fy: "fy",
      g1: "g1",
      g2: "g2",
      glyphname: "glyphName",
      "glyph-name": "glyphName",
      glyphorientationhorizontal: "glyphOrientationHorizontal",
      "glyph-orientation-horizontal": "glyphOrientationHorizontal",
      glyphorientationvertical: "glyphOrientationVertical",
      "glyph-orientation-vertical": "glyphOrientationVertical",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      hanging: "hanging",
      horizadvx: "horizAdvX",
      "horiz-adv-x": "horizAdvX",
      horizoriginx: "horizOriginX",
      "horiz-origin-x": "horizOriginX",
      ideographic: "ideographic",
      imagerendering: "imageRendering",
      "image-rendering": "imageRendering",
      in2: "in2",
      in: "in",
      inlist: "inlist",
      intercept: "intercept",
      k1: "k1",
      k2: "k2",
      k3: "k3",
      k4: "k4",
      k: "k",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      kerning: "kerning",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      letterspacing: "letterSpacing",
      "letter-spacing": "letterSpacing",
      lightingcolor: "lightingColor",
      "lighting-color": "lightingColor",
      limitingconeangle: "limitingConeAngle",
      local: "local",
      markerend: "markerEnd",
      "marker-end": "markerEnd",
      markerheight: "markerHeight",
      markermid: "markerMid",
      "marker-mid": "markerMid",
      markerstart: "markerStart",
      "marker-start": "markerStart",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      mask: "mask",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      mathematical: "mathematical",
      mode: "mode",
      numoctaves: "numOctaves",
      offset: "offset",
      opacity: "opacity",
      operator: "operator",
      order: "order",
      orient: "orient",
      orientation: "orientation",
      origin: "origin",
      overflow: "overflow",
      overlineposition: "overlinePosition",
      "overline-position": "overlinePosition",
      overlinethickness: "overlineThickness",
      "overline-thickness": "overlineThickness",
      paintorder: "paintOrder",
      "paint-order": "paintOrder",
      panose1: "panose1",
      "panose-1": "panose1",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointerevents: "pointerEvents",
      "pointer-events": "pointerEvents",
      points: "points",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      prefix: "prefix",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      property: "property",
      r: "r",
      radius: "radius",
      refx: "refX",
      refy: "refY",
      renderingintent: "renderingIntent",
      "rendering-intent": "renderingIntent",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      resource: "resource",
      restart: "restart",
      result: "result",
      results: "results",
      rotate: "rotate",
      rx: "rx",
      ry: "ry",
      scale: "scale",
      security: "security",
      seed: "seed",
      shaperendering: "shapeRendering",
      "shape-rendering": "shapeRendering",
      slope: "slope",
      spacing: "spacing",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      speed: "speed",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stemh: "stemh",
      stemv: "stemv",
      stitchtiles: "stitchTiles",
      stopcolor: "stopColor",
      "stop-color": "stopColor",
      stopopacity: "stopOpacity",
      "stop-opacity": "stopOpacity",
      strikethroughposition: "strikethroughPosition",
      "strikethrough-position": "strikethroughPosition",
      strikethroughthickness: "strikethroughThickness",
      "strikethrough-thickness": "strikethroughThickness",
      string: "string",
      stroke: "stroke",
      strokedasharray: "strokeDasharray",
      "stroke-dasharray": "strokeDasharray",
      strokedashoffset: "strokeDashoffset",
      "stroke-dashoffset": "strokeDashoffset",
      strokelinecap: "strokeLinecap",
      "stroke-linecap": "strokeLinecap",
      strokelinejoin: "strokeLinejoin",
      "stroke-linejoin": "strokeLinejoin",
      strokemiterlimit: "strokeMiterlimit",
      "stroke-miterlimit": "strokeMiterlimit",
      strokewidth: "strokeWidth",
      "stroke-width": "strokeWidth",
      strokeopacity: "strokeOpacity",
      "stroke-opacity": "strokeOpacity",
      suppresscontenteditablewarning: "suppressContentEditableWarning",
      suppresshydrationwarning: "suppressHydrationWarning",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textanchor: "textAnchor",
      "text-anchor": "textAnchor",
      textdecoration: "textDecoration",
      "text-decoration": "textDecoration",
      textlength: "textLength",
      textrendering: "textRendering",
      "text-rendering": "textRendering",
      to: "to",
      transform: "transform",
      typeof: "typeof",
      u1: "u1",
      u2: "u2",
      underlineposition: "underlinePosition",
      "underline-position": "underlinePosition",
      underlinethickness: "underlineThickness",
      "underline-thickness": "underlineThickness",
      unicode: "unicode",
      unicodebidi: "unicodeBidi",
      "unicode-bidi": "unicodeBidi",
      unicoderange: "unicodeRange",
      "unicode-range": "unicodeRange",
      unitsperem: "unitsPerEm",
      "units-per-em": "unitsPerEm",
      unselectable: "unselectable",
      valphabetic: "vAlphabetic",
      "v-alphabetic": "vAlphabetic",
      values: "values",
      vectoreffect: "vectorEffect",
      "vector-effect": "vectorEffect",
      version: "version",
      vertadvy: "vertAdvY",
      "vert-adv-y": "vertAdvY",
      vertoriginx: "vertOriginX",
      "vert-origin-x": "vertOriginX",
      vertoriginy: "vertOriginY",
      "vert-origin-y": "vertOriginY",
      vhanging: "vHanging",
      "v-hanging": "vHanging",
      videographic: "vIdeographic",
      "v-ideographic": "vIdeographic",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      visibility: "visibility",
      vmathematical: "vMathematical",
      "v-mathematical": "vMathematical",
      vocab: "vocab",
      widths: "widths",
      wordspacing: "wordSpacing",
      "word-spacing": "wordSpacing",
      writingmode: "writingMode",
      "writing-mode": "writingMode",
      x1: "x1",
      x2: "x2",
      x: "x",
      xchannelselector: "xChannelSelector",
      xheight: "xHeight",
      "x-height": "xHeight",
      xlinkactuate: "xlinkActuate",
      "xlink:actuate": "xlinkActuate",
      xlinkarcrole: "xlinkArcrole",
      "xlink:arcrole": "xlinkArcrole",
      xlinkhref: "xlinkHref",
      "xlink:href": "xlinkHref",
      xlinkrole: "xlinkRole",
      "xlink:role": "xlinkRole",
      xlinkshow: "xlinkShow",
      "xlink:show": "xlinkShow",
      xlinktitle: "xlinkTitle",
      "xlink:title": "xlinkTitle",
      xlinktype: "xlinkType",
      "xlink:type": "xlinkType",
      xmlbase: "xmlBase",
      "xml:base": "xmlBase",
      xmllang: "xmlLang",
      "xml:lang": "xmlLang",
      xmlns: "xmlns",
      "xml:space": "xmlSpace",
      xmlnsxlink: "xmlnsXlink",
      "xmlns:xlink": "xmlnsXlink",
      xmlspace: "xmlSpace",
      y1: "y1",
      y2: "y2",
      y: "y",
      ychannelselector: "yChannelSelector",
      z: "z",
      zoomandpan: "zoomAndPan"
    }, Uv = {
      "aria-current": 0,
      // state
      "aria-description": 0,
      "aria-details": 0,
      "aria-disabled": 0,
      // state
      "aria-hidden": 0,
      // state
      "aria-invalid": 0,
      // state
      "aria-keyshortcuts": 0,
      "aria-label": 0,
      "aria-roledescription": 0,
      // Widget Attributes
      "aria-autocomplete": 0,
      "aria-checked": 0,
      "aria-expanded": 0,
      "aria-haspopup": 0,
      "aria-level": 0,
      "aria-modal": 0,
      "aria-multiline": 0,
      "aria-multiselectable": 0,
      "aria-orientation": 0,
      "aria-placeholder": 0,
      "aria-pressed": 0,
      "aria-readonly": 0,
      "aria-required": 0,
      "aria-selected": 0,
      "aria-sort": 0,
      "aria-valuemax": 0,
      "aria-valuemin": 0,
      "aria-valuenow": 0,
      "aria-valuetext": 0,
      // Live Region Attributes
      "aria-atomic": 0,
      "aria-busy": 0,
      "aria-live": 0,
      "aria-relevant": 0,
      // Drag-and-Drop Attributes
      "aria-dropeffect": 0,
      "aria-grabbed": 0,
      // Relationship Attributes
      "aria-activedescendant": 0,
      "aria-colcount": 0,
      "aria-colindex": 0,
      "aria-colspan": 0,
      "aria-controls": 0,
      "aria-describedby": 0,
      "aria-errormessage": 0,
      "aria-flowto": 0,
      "aria-labelledby": 0,
      "aria-owns": 0,
      "aria-posinset": 0,
      "aria-rowcount": 0,
      "aria-rowindex": 0,
      "aria-rowspan": 0,
      "aria-setsize": 0
    }, ss = {}, us = new RegExp("^(aria)-[" + ge + "]*$"), gf = new RegExp("^(aria)[A-Z][" + ge + "]*$");
    function fu(e, t) {
      {
        if (ve.call(ss, t) && ss[t])
          return !0;
        if (gf.test(t)) {
          var a = "aria-" + t.slice(4).toLowerCase(), o = Uv.hasOwnProperty(a) ? a : null;
          if (o == null)
            return g("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), ss[t] = !0, !0;
          if (t !== o)
            return g("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, o), ss[t] = !0, !0;
        }
        if (us.test(t)) {
          var l = t.toLowerCase(), u = Uv.hasOwnProperty(l) ? l : null;
          if (u == null)
            return ss[t] = !0, !1;
          if (t !== u)
            return g("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, u), ss[t] = !0, !0;
        }
      }
      return !0;
    }
    function yf(e, t) {
      {
        var a = [];
        for (var o in t) {
          var l = fu(e, o);
          l || a.push(o);
        }
        var u = a.map(function(d) {
          return "`" + d + "`";
        }).join(", ");
        a.length === 1 ? g("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", u, e) : a.length > 1 && g("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", u, e);
      }
    }
    function jv(e, t) {
      ki(e, t) || yf(e, t);
    }
    var pu = !1;
    function cs(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !pu && (pu = !0, e === "select" && t.multiple ? g("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : g("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var Dc = function() {
    };
    {
      var Tn = {}, vu = /^on./, Pv = /^on[^A-Z]/, Fv = new RegExp("^(aria)-[" + ge + "]*$"), Hv = new RegExp("^(aria)[A-Z][" + ge + "]*$");
      Dc = function(e, t, a, o) {
        if (ve.call(Tn, t) && Tn[t])
          return !0;
        var l = t.toLowerCase();
        if (l === "onfocusin" || l === "onfocusout")
          return g("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), Tn[t] = !0, !0;
        if (o != null) {
          var u = o.registrationNameDependencies, d = o.possibleRegistrationNames;
          if (u.hasOwnProperty(t))
            return !0;
          var p = d.hasOwnProperty(l) ? d[l] : null;
          if (p != null)
            return g("Invalid event handler property `%s`. Did you mean `%s`?", t, p), Tn[t] = !0, !0;
          if (vu.test(t))
            return g("Unknown event handler property `%s`. It will be ignored.", t), Tn[t] = !0, !0;
        } else if (vu.test(t))
          return Pv.test(t) && g("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), Tn[t] = !0, !0;
        if (Fv.test(t) || Hv.test(t))
          return !0;
        if (l === "innerhtml")
          return g("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Tn[t] = !0, !0;
        if (l === "aria")
          return g("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Tn[t] = !0, !0;
        if (l === "is" && a !== null && a !== void 0 && typeof a != "string")
          return g("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof a), Tn[t] = !0, !0;
        if (typeof a == "number" && isNaN(a))
          return g("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), Tn[t] = !0, !0;
        var v = fr(t), w = v !== null && v.type === Zr;
        if (ls.hasOwnProperty(l)) {
          var x = ls[l];
          if (x !== t)
            return g("Invalid DOM property `%s`. Did you mean `%s`?", t, x), Tn[t] = !0, !0;
        } else if (!w && t !== l)
          return g("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, l), Tn[t] = !0, !0;
        return typeof a == "boolean" && mr(t, a, v, !1) ? (a ? g('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', a, t, t, a, t) : g('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', a, t, t, a, t, t, t), Tn[t] = !0, !0) : w ? !0 : mr(t, a, v, !1) ? (Tn[t] = !0, !1) : ((a === "false" || a === "true") && v !== null && v.type === Fr && (g("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", a, t, a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, a), Tn[t] = !0), !0);
      };
    }
    var Bv = function(e, t, a) {
      {
        var o = [];
        for (var l in t) {
          var u = Dc(e, l, t[l], a);
          u || o.push(l);
        }
        var d = o.map(function(p) {
          return "`" + p + "`";
        }).join(", ");
        o.length === 1 ? g("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", d, e) : o.length > 1 && g("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", d, e);
      }
    };
    function Vv(e, t, a) {
      ki(e, t) || Bv(e, t, a);
    }
    var wf = 1, ko = 2, fl = 4, bf = wf | ko | fl, hu = null;
    function Eg(e) {
      hu !== null && g("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), hu = e;
    }
    function mu() {
      hu === null && g("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), hu = null;
    }
    function Cg(e) {
      return e === hu;
    }
    function Oc(e) {
      var t = e.target || e.srcElement || window;
      return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === Go ? t.parentNode : t;
    }
    var zc = null, qt = null, Ei = null;
    function gu(e) {
      var t = js(e);
      if (t) {
        if (typeof zc != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var a = t.stateNode;
        if (a) {
          var o = Wh(a);
          zc(t.stateNode, t.type, o);
        }
      }
    }
    function yu(e) {
      zc = e;
    }
    function xf(e) {
      qt ? Ei ? Ei.push(e) : Ei = [e] : qt = e;
    }
    function Sf() {
      return qt !== null || Ei !== null;
    }
    function ds() {
      if (qt) {
        var e = qt, t = Ei;
        if (qt = null, Ei = null, gu(e), t)
          for (var a = 0; a < t.length; a++)
            gu(t[a]);
      }
    }
    var wu = function(e, t) {
      return e(t);
    }, pl = function() {
    }, Lc = !1;
    function Tg() {
      var e = Sf();
      e && (pl(), ds());
    }
    function Yv(e, t, a) {
      if (Lc)
        return e(t, a);
      Lc = !0;
      try {
        return wu(e, t, a);
      } finally {
        Lc = !1, Tg();
      }
    }
    function Iv(e, t, a) {
      wu = e, pl = a;
    }
    function Mc(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function Nc(e, t, a) {
      switch (e) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          return !!(a.disabled && Mc(t));
        default:
          return !1;
      }
    }
    function vl(e, t) {
      var a = e.stateNode;
      if (a === null)
        return null;
      var o = Wh(a);
      if (o === null)
        return null;
      var l = o[t];
      if (Nc(t, e.type, o))
        return null;
      if (l && typeof l != "function")
        throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof l + "` type.");
      return l;
    }
    var bu = !1;
    if (Pt)
      try {
        var hl = {};
        Object.defineProperty(hl, "passive", {
          get: function() {
            bu = !0;
          }
        }), window.addEventListener("test", hl, hl), window.removeEventListener("test", hl, hl);
      } catch {
        bu = !1;
      }
    function Ac(e, t, a, o, l, u, d, p, v) {
      var w = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(a, w);
      } catch (x) {
        this.onError(x);
      }
    }
    var $v = Ac;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var Uc = document.createElement("react");
      $v = function(t, a, o, l, u, d, p, v, w) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var x = document.createEvent("Event"), z = !1, D = !0, F = window.event, V = Object.getOwnPropertyDescriptor(window, "event");
        function Q() {
          Uc.removeEventListener(W, Ke, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = F);
        }
        var ke = Array.prototype.slice.call(arguments, 3);
        function Ke() {
          z = !0, Q(), a.apply(o, ke), D = !1;
        }
        var Ie, jt = !1, Ot = !1;
        function A(U) {
          if (Ie = U.error, jt = !0, Ie === null && U.colno === 0 && U.lineno === 0 && (Ot = !0), U.defaultPrevented && Ie != null && typeof Ie == "object")
            try {
              Ie._suppressLogging = !0;
            } catch {
            }
        }
        var W = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", A), Uc.addEventListener(W, Ke, !1), x.initEvent(W, !1, !1), Uc.dispatchEvent(x), V && Object.defineProperty(window, "event", V), z && D && (jt ? Ot && (Ie = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : Ie = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(Ie)), window.removeEventListener("error", A), !z)
          return Q(), Ac.apply(this, arguments);
      };
    }
    var Rg = $v, fs = !1, ps = null, no = !1, jc = null, vs = {
      onError: function(e) {
        fs = !0, ps = e;
      }
    };
    function ja(e, t, a, o, l, u, d, p, v) {
      fs = !1, ps = null, Rg.apply(vs, arguments);
    }
    function xu(e, t, a, o, l, u, d, p, v) {
      if (ja.apply(this, arguments), fs) {
        var w = Ef();
        no || (no = !0, jc = w);
      }
    }
    function Jo() {
      if (no) {
        var e = jc;
        throw no = !1, jc = null, e;
      }
    }
    function kf() {
      return fs;
    }
    function Ef() {
      if (fs) {
        var e = ps;
        return fs = !1, ps = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function hs(e) {
      return e._reactInternals;
    }
    function ml(e) {
      return e._reactInternals !== void 0;
    }
    function Su(e, t) {
      e._reactInternals = t;
    }
    var $e = (
      /*                      */
      0
    ), Zo = (
      /*                */
      1
    ), Rr = (
      /*                    */
      2
    ), Rt = (
      /*                       */
      4
    ), ta = (
      /*                */
      16
    ), Kt = (
      /*                 */
      32
    ), cr = (
      /*                     */
      64
    ), St = (
      /*                   */
      128
    ), xr = (
      /*            */
      256
    ), Br = (
      /*                          */
      512
    ), Pa = (
      /*                     */
      1024
    ), ba = (
      /*                      */
      2048
    ), _r = (
      /*                    */
      4096
    ), Eo = (
      /*                   */
      8192
    ), Pc = (
      /*             */
      16384
    ), Qv = (
      /*               */
      32767
    ), gl = (
      /*                   */
      32768
    ), Rn = (
      /*                */
      65536
    ), ao = (
      /* */
      131072
    ), ku = (
      /*                       */
      1048576
    ), Eu = (
      /*                    */
      2097152
    ), Ci = (
      /*                 */
      4194304
    ), Cf = (
      /*                */
      8388608
    ), An = (
      /*               */
      16777216
    ), Ti = (
      /*              */
      33554432
    ), Ri = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      Rt | Pa | 0
    ), ms = Rr | Rt | ta | Kt | Br | _r | Eo, _i = Rt | cr | Br | Eo, cn = ba | ta, Vr = Ci | Cf | Eu, yl = C.ReactCurrentOwner;
    function Un(e) {
      var t = e, a = e;
      if (e.alternate)
        for (; t.return; )
          t = t.return;
      else {
        var o = t;
        do
          t = o, (t.flags & (Rr | _r)) !== $e && (a = t.return), o = t.return;
        while (o);
      }
      return t.tag === J ? a : null;
    }
    function Co(e) {
      if (e.tag === be) {
        var t = e.memoizedState;
        if (t === null) {
          var a = e.alternate;
          a !== null && (t = a.memoizedState);
        }
        if (t !== null)
          return t.dehydrated;
      }
      return null;
    }
    function Di(e) {
      return e.tag === J ? e.stateNode.containerInfo : null;
    }
    function Wv(e) {
      return Un(e) === e;
    }
    function Tf(e) {
      {
        var t = yl.current;
        if (t !== null && t.tag === I) {
          var a = t, o = a.stateNode;
          o._warnedAboutRefsInRender || g("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", lt(a) || "A component"), o._warnedAboutRefsInRender = !0;
        }
      }
      var l = hs(e);
      return l ? Un(l) === l : !1;
    }
    function Fc(e) {
      if (Un(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function ra(e) {
      var t = e.alternate;
      if (!t) {
        var a = Un(e);
        if (a === null)
          throw new Error("Unable to find node on an unmounted component.");
        return a !== e ? null : e;
      }
      for (var o = e, l = t; ; ) {
        var u = o.return;
        if (u === null)
          break;
        var d = u.alternate;
        if (d === null) {
          var p = u.return;
          if (p !== null) {
            o = l = p;
            continue;
          }
          break;
        }
        if (u.child === d.child) {
          for (var v = u.child; v; ) {
            if (v === o)
              return Fc(u), e;
            if (v === l)
              return Fc(u), t;
            v = v.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (o.return !== l.return)
          o = u, l = d;
        else {
          for (var w = !1, x = u.child; x; ) {
            if (x === o) {
              w = !0, o = u, l = d;
              break;
            }
            if (x === l) {
              w = !0, l = u, o = d;
              break;
            }
            x = x.sibling;
          }
          if (!w) {
            for (x = d.child; x; ) {
              if (x === o) {
                w = !0, o = d, l = u;
                break;
              }
              if (x === l) {
                w = !0, l = d, o = u;
                break;
              }
              x = x.sibling;
            }
            if (!w)
              throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
          }
        }
        if (o.alternate !== l)
          throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
      }
      if (o.tag !== J)
        throw new Error("Unable to find node on an unmounted component.");
      return o.stateNode.current === o ? e : t;
    }
    function na(e) {
      var t = ra(e);
      return t !== null ? yr(t) : null;
    }
    function yr(e) {
      if (e.tag === ae || e.tag === H)
        return e;
      for (var t = e.child; t !== null; ) {
        var a = yr(t);
        if (a !== null)
          return a;
        t = t.sibling;
      }
      return null;
    }
    function oo(e) {
      var t = ra(e);
      return t !== null ? Rf(t) : null;
    }
    function Rf(e) {
      if (e.tag === ae || e.tag === H)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== De) {
          var a = Rf(t);
          if (a !== null)
            return a;
        }
        t = t.sibling;
      }
      return null;
    }
    var _f = b.unstable_scheduleCallback, Df = b.unstable_cancelCallback, Of = b.unstable_shouldYield, Xv = b.unstable_requestPaint, Mr = b.unstable_now, qv = b.unstable_getCurrentPriorityLevel, ei = b.unstable_ImmediatePriority, Cu = b.unstable_UserBlockingPriority, wl = b.unstable_NormalPriority, Tu = b.unstable_LowPriority, gs = b.unstable_IdlePriority, Gv = b.unstable_yieldValue, Kv = b.unstable_setDisableYieldValue, io = null, dn = null, xe = null, xa = !1, _n = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function zf(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled)
        return !0;
      if (!t.supportsFiber)
        return g("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        he && (e = ft({}, e, {
          getLaneLabelMap: Af,
          injectProfilingHooks: bl
        })), io = t.inject(e), dn = t;
      } catch (a) {
        g("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function Lf(e, t) {
      if (dn && typeof dn.onScheduleFiberRoot == "function")
        try {
          dn.onScheduleFiberRoot(io, e, t);
        } catch (a) {
          xa || (xa = !0, g("React instrumentation encountered an error: %s", a));
        }
    }
    function Mf(e, t) {
      if (dn && typeof dn.onCommitFiberRoot == "function")
        try {
          var a = (e.current.flags & St) === St;
          if (pe) {
            var o;
            switch (t) {
              case sa:
                o = ei;
                break;
              case Ha:
                o = Cu;
                break;
              case fn:
                o = wl;
                break;
              case hd:
                o = gs;
                break;
              default:
                o = wl;
                break;
            }
            dn.onCommitFiberRoot(io, e, o, a);
          }
        } catch (l) {
          xa || (xa = !0, g("React instrumentation encountered an error: %s", l));
        }
    }
    function Nf(e) {
      if (dn && typeof dn.onPostCommitFiberRoot == "function")
        try {
          dn.onPostCommitFiberRoot(io, e);
        } catch (t) {
          xa || (xa = !0, g("React instrumentation encountered an error: %s", t));
        }
    }
    function ys(e) {
      if (dn && typeof dn.onCommitFiberUnmount == "function")
        try {
          dn.onCommitFiberUnmount(io, e);
        } catch (t) {
          xa || (xa = !0, g("React instrumentation encountered an error: %s", t));
        }
    }
    function Jt(e) {
      if (typeof Gv == "function" && (Kv(e), Y(e)), dn && typeof dn.setStrictMode == "function")
        try {
          dn.setStrictMode(io, e);
        } catch (t) {
          xa || (xa = !0, g("React instrumentation encountered an error: %s", t));
        }
    }
    function bl(e) {
      xe = e;
    }
    function Af() {
      {
        for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; a < Bf; a++) {
          var o = nh(t);
          e.set(t, o), t *= 2;
        }
        return e;
      }
    }
    function Jv(e) {
      xe !== null && typeof xe.markCommitStarted == "function" && xe.markCommitStarted(e);
    }
    function To() {
      xe !== null && typeof xe.markCommitStopped == "function" && xe.markCommitStopped();
    }
    function Fa(e) {
      xe !== null && typeof xe.markComponentRenderStarted == "function" && xe.markComponentRenderStarted(e);
    }
    function Oi() {
      xe !== null && typeof xe.markComponentRenderStopped == "function" && xe.markComponentRenderStopped();
    }
    function Zv(e) {
      xe !== null && typeof xe.markComponentPassiveEffectMountStarted == "function" && xe.markComponentPassiveEffectMountStarted(e);
    }
    function ti() {
      xe !== null && typeof xe.markComponentPassiveEffectMountStopped == "function" && xe.markComponentPassiveEffectMountStopped();
    }
    function zi(e) {
      xe !== null && typeof xe.markComponentPassiveEffectUnmountStarted == "function" && xe.markComponentPassiveEffectUnmountStarted(e);
    }
    function Hc() {
      xe !== null && typeof xe.markComponentPassiveEffectUnmountStopped == "function" && xe.markComponentPassiveEffectUnmountStopped();
    }
    function eh(e) {
      xe !== null && typeof xe.markComponentLayoutEffectMountStarted == "function" && xe.markComponentLayoutEffectMountStarted(e);
    }
    function Bc() {
      xe !== null && typeof xe.markComponentLayoutEffectMountStopped == "function" && xe.markComponentLayoutEffectMountStopped();
    }
    function Uf(e) {
      xe !== null && typeof xe.markComponentLayoutEffectUnmountStarted == "function" && xe.markComponentLayoutEffectUnmountStarted(e);
    }
    function ws() {
      xe !== null && typeof xe.markComponentLayoutEffectUnmountStopped == "function" && xe.markComponentLayoutEffectUnmountStopped();
    }
    function Ro(e, t, a) {
      xe !== null && typeof xe.markComponentErrored == "function" && xe.markComponentErrored(e, t, a);
    }
    function Ru(e, t, a) {
      xe !== null && typeof xe.markComponentSuspended == "function" && xe.markComponentSuspended(e, t, a);
    }
    function _u(e) {
      xe !== null && typeof xe.markLayoutEffectsStarted == "function" && xe.markLayoutEffectsStarted(e);
    }
    function xl() {
      xe !== null && typeof xe.markLayoutEffectsStopped == "function" && xe.markLayoutEffectsStopped();
    }
    function jf(e) {
      xe !== null && typeof xe.markPassiveEffectsStarted == "function" && xe.markPassiveEffectsStarted(e);
    }
    function bs() {
      xe !== null && typeof xe.markPassiveEffectsStopped == "function" && xe.markPassiveEffectsStopped();
    }
    function Pf(e) {
      xe !== null && typeof xe.markRenderStarted == "function" && xe.markRenderStarted(e);
    }
    function Ff() {
      xe !== null && typeof xe.markRenderYielded == "function" && xe.markRenderYielded();
    }
    function Sr() {
      xe !== null && typeof xe.markRenderStopped == "function" && xe.markRenderStopped();
    }
    function Vc(e) {
      xe !== null && typeof xe.markRenderScheduled == "function" && xe.markRenderScheduled(e);
    }
    function Hf(e, t) {
      xe !== null && typeof xe.markForceUpdateScheduled == "function" && xe.markForceUpdateScheduled(e, t);
    }
    function Du(e, t) {
      xe !== null && typeof xe.markStateUpdateScheduled == "function" && xe.markStateUpdateScheduled(e, t);
    }
    var Qe = (
      /*                         */
      0
    ), Et = (
      /*                 */
      1
    ), Lt = (
      /*                    */
      2
    ), pt = (
      /*               */
      8
    ), ar = (
      /*              */
      16
    ), Wr = Math.clz32 ? Math.clz32 : zu, Yc = Math.log, Ou = Math.LN2;
    function zu(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (Yc(t) / Ou | 0) | 0;
    }
    var Bf = 31, q = (
      /*                        */
      0
    ), Yr = (
      /*                          */
      0
    ), rt = (
      /*                        */
      1
    ), Li = (
      /*    */
      2
    ), rn = (
      /*             */
      4
    ), nn = (
      /*            */
      8
    ), aa = (
      /*                     */
      16
    ), Sl = (
      /*                */
      32
    ), Mi = (
      /*                       */
      4194240
    ), xs = (
      /*                        */
      64
    ), Ic = (
      /*                        */
      128
    ), $c = (
      /*                        */
      256
    ), Qc = (
      /*                        */
      512
    ), Wc = (
      /*                        */
      1024
    ), Xc = (
      /*                        */
      2048
    ), qc = (
      /*                        */
      4096
    ), Gc = (
      /*                        */
      8192
    ), kl = (
      /*                        */
      16384
    ), Kc = (
      /*                       */
      32768
    ), Ss = (
      /*                       */
      65536
    ), ks = (
      /*                       */
      131072
    ), Jc = (
      /*                       */
      262144
    ), Lu = (
      /*                       */
      524288
    ), Zc = (
      /*                       */
      1048576
    ), ed = (
      /*                       */
      2097152
    ), Mu = (
      /*                            */
      130023424
    ), El = (
      /*                             */
      4194304
    ), Nu = (
      /*                             */
      8388608
    ), td = (
      /*                             */
      16777216
    ), rd = (
      /*                             */
      33554432
    ), nd = (
      /*                             */
      67108864
    ), th = El, Es = (
      /*          */
      134217728
    ), rh = (
      /*                          */
      268435455
    ), Au = (
      /*               */
      268435456
    ), Ni = (
      /*                        */
      536870912
    ), oa = (
      /*                   */
      1073741824
    );
    function nh(e) {
      {
        if (e & rt)
          return "Sync";
        if (e & Li)
          return "InputContinuousHydration";
        if (e & rn)
          return "InputContinuous";
        if (e & nn)
          return "DefaultHydration";
        if (e & aa)
          return "Default";
        if (e & Sl)
          return "TransitionHydration";
        if (e & Mi)
          return "Transition";
        if (e & Mu)
          return "Retry";
        if (e & Es)
          return "SelectiveHydration";
        if (e & Au)
          return "IdleHydration";
        if (e & Ni)
          return "Idle";
        if (e & oa)
          return "Offscreen";
      }
    }
    var Zt = -1, ad = xs, od = El;
    function Uu(e) {
      switch (Cl(e)) {
        case rt:
          return rt;
        case Li:
          return Li;
        case rn:
          return rn;
        case nn:
          return nn;
        case aa:
          return aa;
        case Sl:
          return Sl;
        case xs:
        case Ic:
        case $c:
        case Qc:
        case Wc:
        case Xc:
        case qc:
        case Gc:
        case kl:
        case Kc:
        case Ss:
        case ks:
        case Jc:
        case Lu:
        case Zc:
        case ed:
          return e & Mi;
        case El:
        case Nu:
        case td:
        case rd:
        case nd:
          return e & Mu;
        case Es:
          return Es;
        case Au:
          return Au;
        case Ni:
          return Ni;
        case oa:
          return oa;
        default:
          return g("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function ia(e, t) {
      var a = e.pendingLanes;
      if (a === q)
        return q;
      var o = q, l = e.suspendedLanes, u = e.pingedLanes, d = a & rh;
      if (d !== q) {
        var p = d & ~l;
        if (p !== q)
          o = Uu(p);
        else {
          var v = d & u;
          v !== q && (o = Uu(v));
        }
      } else {
        var w = a & ~l;
        w !== q ? o = Uu(w) : u !== q && (o = Uu(u));
      }
      if (o === q)
        return q;
      if (t !== q && t !== o && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (t & l) === q) {
        var x = Cl(o), z = Cl(t);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          x >= z || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          x === aa && (z & Mi) !== q
        )
          return t;
      }
      (o & rn) !== q && (o |= a & aa);
      var D = e.entangledLanes;
      if (D !== q)
        for (var F = e.entanglements, V = o & D; V > 0; ) {
          var Q = Nr(V), ke = 1 << Q;
          o |= F[Q], V &= ~ke;
        }
      return o;
    }
    function Vf(e, t) {
      for (var a = e.eventTimes, o = Zt; t > 0; ) {
        var l = Nr(t), u = 1 << l, d = a[l];
        d > o && (o = d), t &= ~u;
      }
      return o;
    }
    function id(e, t) {
      switch (e) {
        case rt:
        case Li:
        case rn:
          return t + 250;
        case nn:
        case aa:
        case Sl:
        case xs:
        case Ic:
        case $c:
        case Qc:
        case Wc:
        case Xc:
        case qc:
        case Gc:
        case kl:
        case Kc:
        case Ss:
        case ks:
        case Jc:
        case Lu:
        case Zc:
        case ed:
          return t + 5e3;
        case El:
        case Nu:
        case td:
        case rd:
        case nd:
          return Zt;
        case Es:
        case Au:
        case Ni:
        case oa:
          return Zt;
        default:
          return g("Should have found matching lanes. This is a bug in React."), Zt;
      }
    }
    function ah(e, t) {
      for (var a = e.pendingLanes, o = e.suspendedLanes, l = e.pingedLanes, u = e.expirationTimes, d = a; d > 0; ) {
        var p = Nr(d), v = 1 << p, w = u[p];
        w === Zt ? ((v & o) === q || (v & l) !== q) && (u[p] = id(v, t)) : w <= t && (e.expiredLanes |= v), d &= ~v;
      }
    }
    function oh(e) {
      return Uu(e.pendingLanes);
    }
    function ld(e) {
      var t = e.pendingLanes & ~oa;
      return t !== q ? t : t & oa ? oa : q;
    }
    function Yf(e) {
      return (e & rt) !== q;
    }
    function Ai(e) {
      return (e & rh) !== q;
    }
    function sd(e) {
      return (e & Mu) === e;
    }
    function If(e) {
      var t = rt | rn | aa;
      return (e & t) === q;
    }
    function _g(e) {
      return (e & Mi) === e;
    }
    function ju(e, t) {
      var a = Li | rn | nn | aa;
      return (t & a) !== q;
    }
    function ih(e, t) {
      return (t & e.expiredLanes) !== q;
    }
    function $f(e) {
      return (e & Mi) !== q;
    }
    function Qf() {
      var e = ad;
      return ad <<= 1, (ad & Mi) === q && (ad = xs), e;
    }
    function lh() {
      var e = od;
      return od <<= 1, (od & Mu) === q && (od = El), e;
    }
    function Cl(e) {
      return e & -e;
    }
    function an(e) {
      return Cl(e);
    }
    function Nr(e) {
      return 31 - Wr(e);
    }
    function ud(e) {
      return Nr(e);
    }
    function la(e, t) {
      return (e & t) !== q;
    }
    function Tl(e, t) {
      return (e & t) === t;
    }
    function ht(e, t) {
      return e | t;
    }
    function Pu(e, t) {
      return e & ~t;
    }
    function cd(e, t) {
      return e & t;
    }
    function Dg(e) {
      return e;
    }
    function Wf(e, t) {
      return e !== Yr && e < t ? e : t;
    }
    function dd(e) {
      for (var t = [], a = 0; a < Bf; a++)
        t.push(e);
      return t;
    }
    function Cs(e, t, a) {
      e.pendingLanes |= t, t !== Ni && (e.suspendedLanes = q, e.pingedLanes = q);
      var o = e.eventTimes, l = ud(t);
      o[l] = a;
    }
    function Xf(e, t) {
      e.suspendedLanes |= t, e.pingedLanes &= ~t;
      for (var a = e.expirationTimes, o = t; o > 0; ) {
        var l = Nr(o), u = 1 << l;
        a[l] = Zt, o &= ~u;
      }
    }
    function fd(e, t, a) {
      e.pingedLanes |= e.suspendedLanes & t;
    }
    function sh(e, t) {
      var a = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = q, e.pingedLanes = q, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
      for (var o = e.entanglements, l = e.eventTimes, u = e.expirationTimes, d = a; d > 0; ) {
        var p = Nr(d), v = 1 << p;
        o[p] = q, l[p] = Zt, u[p] = Zt, d &= ~v;
      }
    }
    function Fu(e, t) {
      for (var a = e.entangledLanes |= t, o = e.entanglements, l = a; l; ) {
        var u = Nr(l), d = 1 << u;
        // Is this one of the newly entangled lanes?
        d & t | // Is this lane transitively entangled with the newly entangled lanes?
        o[u] & t && (o[u] |= t), l &= ~d;
      }
    }
    function pd(e, t) {
      var a = Cl(t), o;
      switch (a) {
        case rn:
          o = Li;
          break;
        case aa:
          o = nn;
          break;
        case xs:
        case Ic:
        case $c:
        case Qc:
        case Wc:
        case Xc:
        case qc:
        case Gc:
        case kl:
        case Kc:
        case Ss:
        case ks:
        case Jc:
        case Lu:
        case Zc:
        case ed:
        case El:
        case Nu:
        case td:
        case rd:
        case nd:
          o = Sl;
          break;
        case Ni:
          o = Au;
          break;
        default:
          o = Yr;
          break;
      }
      return (o & (e.suspendedLanes | t)) !== Yr ? Yr : o;
    }
    function uh(e, t, a) {
      if (_n)
        for (var o = e.pendingUpdatersLaneMap; a > 0; ) {
          var l = ud(a), u = 1 << l, d = o[l];
          d.add(t), a &= ~u;
        }
    }
    function qf(e, t) {
      if (_n)
        for (var a = e.pendingUpdatersLaneMap, o = e.memoizedUpdaters; t > 0; ) {
          var l = ud(t), u = 1 << l, d = a[l];
          d.size > 0 && (d.forEach(function(p) {
            var v = p.alternate;
            (v === null || !o.has(v)) && o.add(p);
          }), d.clear()), t &= ~u;
        }
    }
    function vd(e, t) {
      return null;
    }
    var sa = rt, Ha = rn, fn = aa, hd = Ni, Ts = Yr;
    function Sa() {
      return Ts;
    }
    function Xr(e) {
      Ts = e;
    }
    function ch(e, t) {
      var a = Ts;
      try {
        return Ts = e, t();
      } finally {
        Ts = a;
      }
    }
    function Hu(e, t) {
      return e !== 0 && e < t ? e : t;
    }
    function Dn(e, t) {
      return e > t ? e : t;
    }
    function Gf(e, t) {
      return e !== 0 && e < t;
    }
    function dh(e) {
      var t = Cl(e);
      return Gf(sa, t) ? Gf(Ha, t) ? Ai(t) ? fn : hd : Ha : sa;
    }
    function Rl(e) {
      var t = e.current.memoizedState;
      return t.isDehydrated;
    }
    var pn;
    function Og(e) {
      pn = e;
    }
    function je(e) {
      pn(e);
    }
    var Ui;
    function Kf(e) {
      Ui = e;
    }
    var Jf;
    function zg(e) {
      Jf = e;
    }
    var Rs;
    function md(e) {
      Rs = e;
    }
    var gd;
    function fh(e) {
      gd = e;
    }
    var yd = !1, Bu = [], _o = null, Do = null, kr = null, jn = /* @__PURE__ */ new Map(), Ba = /* @__PURE__ */ new Map(), ri = [], ph = [
      "mousedown",
      "mouseup",
      "touchcancel",
      "touchend",
      "touchstart",
      "auxclick",
      "dblclick",
      "pointercancel",
      "pointerdown",
      "pointerup",
      "dragend",
      "dragstart",
      "drop",
      "compositionend",
      "compositionstart",
      "keydown",
      "keypress",
      "keyup",
      "input",
      "textInput",
      // Intentionally camelCase
      "copy",
      "cut",
      "paste",
      "click",
      "change",
      "contextmenu",
      "reset",
      "submit"
    ];
    function lo(e) {
      return ph.indexOf(e) > -1;
    }
    function vh(e, t, a, o, l) {
      return {
        blockedOn: e,
        domEventName: t,
        eventSystemFlags: a,
        nativeEvent: l,
        targetContainers: [o]
      };
    }
    function so(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          _o = null;
          break;
        case "dragenter":
        case "dragleave":
          Do = null;
          break;
        case "mouseover":
        case "mouseout":
          kr = null;
          break;
        case "pointerover":
        case "pointerout": {
          var a = t.pointerId;
          jn.delete(a);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var o = t.pointerId;
          Ba.delete(o);
          break;
        }
      }
    }
    function Vu(e, t, a, o, l, u) {
      if (e === null || e.nativeEvent !== u) {
        var d = vh(t, a, o, l, u);
        if (t !== null) {
          var p = js(t);
          p !== null && Ui(p);
        }
        return d;
      }
      e.eventSystemFlags |= o;
      var v = e.targetContainers;
      return l !== null && v.indexOf(l) === -1 && v.push(l), e;
    }
    function hh(e, t, a, o, l) {
      switch (t) {
        case "focusin": {
          var u = l;
          return _o = Vu(_o, e, t, a, o, u), !0;
        }
        case "dragenter": {
          var d = l;
          return Do = Vu(Do, e, t, a, o, d), !0;
        }
        case "mouseover": {
          var p = l;
          return kr = Vu(kr, e, t, a, o, p), !0;
        }
        case "pointerover": {
          var v = l, w = v.pointerId;
          return jn.set(w, Vu(jn.get(w) || null, e, t, a, o, v)), !0;
        }
        case "gotpointercapture": {
          var x = l, z = x.pointerId;
          return Ba.set(z, Vu(Ba.get(z) || null, e, t, a, o, x)), !0;
        }
      }
      return !1;
    }
    function Zf(e) {
      var t = rc(e.target);
      if (t !== null) {
        var a = Un(t);
        if (a !== null) {
          var o = a.tag;
          if (o === be) {
            var l = Co(a);
            if (l !== null) {
              e.blockedOn = l, gd(e.priority, function() {
                Jf(a);
              });
              return;
            }
          } else if (o === J) {
            var u = a.stateNode;
            if (Rl(u)) {
              e.blockedOn = Di(a);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function mh(e) {
      for (var t = Rs(), a = {
        blockedOn: null,
        target: e,
        priority: t
      }, o = 0; o < ri.length && Gf(t, ri[o].priority); o++)
        ;
      ri.splice(o, 0, a), o === 0 && Zf(a);
    }
    function Yu(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var a = t[0], o = Iu(e.domEventName, e.eventSystemFlags, a, e.nativeEvent);
        if (o === null) {
          var l = e.nativeEvent, u = new l.constructor(l.type, l);
          Eg(u), l.target.dispatchEvent(u), mu();
        } else {
          var d = js(o);
          return d !== null && Ui(d), e.blockedOn = o, !1;
        }
        t.shift();
      }
      return !0;
    }
    function gh(e, t, a) {
      Yu(e) && a.delete(t);
    }
    function wd() {
      yd = !1, _o !== null && Yu(_o) && (_o = null), Do !== null && Yu(Do) && (Do = null), kr !== null && Yu(kr) && (kr = null), jn.forEach(gh), Ba.forEach(gh);
    }
    function _l(e, t) {
      e.blockedOn === t && (e.blockedOn = null, yd || (yd = !0, b.unstable_scheduleCallback(b.unstable_NormalPriority, wd)));
    }
    function On(e) {
      if (Bu.length > 0) {
        _l(Bu[0], e);
        for (var t = 1; t < Bu.length; t++) {
          var a = Bu[t];
          a.blockedOn === e && (a.blockedOn = null);
        }
      }
      _o !== null && _l(_o, e), Do !== null && _l(Do, e), kr !== null && _l(kr, e);
      var o = function(p) {
        return _l(p, e);
      };
      jn.forEach(o), Ba.forEach(o);
      for (var l = 0; l < ri.length; l++) {
        var u = ri[l];
        u.blockedOn === e && (u.blockedOn = null);
      }
      for (; ri.length > 0; ) {
        var d = ri[0];
        if (d.blockedOn !== null)
          break;
        Zf(d), d.blockedOn === null && ri.shift();
      }
    }
    var _t = C.ReactCurrentBatchConfig, Ir = !0;
    function Ar(e) {
      Ir = !!e;
    }
    function vn() {
      return Ir;
    }
    function ka(e, t, a) {
      var o = Ds(t), l;
      switch (o) {
        case sa:
          l = _s;
          break;
        case Ha:
          l = qr;
          break;
        case fn:
        default:
          l = Dl;
          break;
      }
      return l.bind(null, t, a, e);
    }
    function _s(e, t, a, o) {
      var l = Sa(), u = _t.transition;
      _t.transition = null;
      try {
        Xr(sa), Dl(e, t, a, o);
      } finally {
        Xr(l), _t.transition = u;
      }
    }
    function qr(e, t, a, o) {
      var l = Sa(), u = _t.transition;
      _t.transition = null;
      try {
        Xr(Ha), Dl(e, t, a, o);
      } finally {
        Xr(l), _t.transition = u;
      }
    }
    function Dl(e, t, a, o) {
      Ir && Ol(e, t, a, o);
    }
    function Ol(e, t, a, o) {
      var l = Iu(e, t, a, o);
      if (l === null) {
        Xg(e, t, o, zl, a), so(e, o);
        return;
      }
      if (hh(l, e, t, a, o)) {
        o.stopPropagation();
        return;
      }
      if (so(e, o), t & fl && lo(e)) {
        for (; l !== null; ) {
          var u = js(l);
          u !== null && je(u);
          var d = Iu(e, t, a, o);
          if (d === null && Xg(e, t, o, zl, a), d === l)
            break;
          l = d;
        }
        l !== null && o.stopPropagation();
        return;
      }
      Xg(e, t, o, null, a);
    }
    var zl = null;
    function Iu(e, t, a, o) {
      zl = null;
      var l = Oc(o), u = rc(l);
      if (u !== null) {
        var d = Un(u);
        if (d === null)
          u = null;
        else {
          var p = d.tag;
          if (p === be) {
            var v = Co(d);
            if (v !== null)
              return v;
            u = null;
          } else if (p === J) {
            var w = d.stateNode;
            if (Rl(w))
              return Di(d);
            u = null;
          } else d !== u && (u = null);
        }
      }
      return zl = u, null;
    }
    function Ds(e) {
      switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return sa;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return Ha;
        case "message": {
          var t = qv();
          switch (t) {
            case ei:
              return sa;
            case Cu:
              return Ha;
            case wl:
            case Tu:
              return fn;
            case gs:
              return hd;
            default:
              return fn;
          }
        }
        default:
          return fn;
      }
    }
    function ua(e, t, a) {
      return e.addEventListener(t, a, !1), a;
    }
    function ep(e, t, a) {
      return e.addEventListener(t, a, !0), a;
    }
    function Os(e, t, a, o) {
      return e.addEventListener(t, a, {
        capture: !0,
        passive: o
      }), a;
    }
    function ni(e, t, a, o) {
      return e.addEventListener(t, a, {
        passive: o
      }), a;
    }
    var ji = null, $u = null, Va = null;
    function bd(e) {
      return ji = e, $u = zs(), !0;
    }
    function Pi() {
      ji = null, $u = null, Va = null;
    }
    function Qu() {
      if (Va)
        return Va;
      var e, t = $u, a = t.length, o, l = zs(), u = l.length;
      for (e = 0; e < a && t[e] === l[e]; e++)
        ;
      var d = a - e;
      for (o = 1; o <= d && t[a - o] === l[u - o]; o++)
        ;
      var p = o > 1 ? 1 - o : void 0;
      return Va = l.slice(e, p), Va;
    }
    function zs() {
      return "value" in ji ? ji.value : ji.textContent;
    }
    function Ls(e) {
      var t, a = e.keyCode;
      return "charCode" in e ? (t = e.charCode, t === 0 && a === 13 && (t = 13)) : t = a, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
    }
    function Ll() {
      return !0;
    }
    function Wu() {
      return !1;
    }
    function dr(e) {
      function t(a, o, l, u, d) {
        this._reactName = a, this._targetInst = l, this.type = o, this.nativeEvent = u, this.target = d, this.currentTarget = null;
        for (var p in e)
          if (e.hasOwnProperty(p)) {
            var v = e[p];
            v ? this[p] = v(u) : this[p] = u[p];
          }
        var w = u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1;
        return w ? this.isDefaultPrevented = Ll : this.isDefaultPrevented = Wu, this.isPropagationStopped = Wu, this;
      }
      return ft(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = Ll);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = Ll);
        },
        /**
         * We release all dispatched `SyntheticEvent`s after each event loop, adding
         * them back into the pool. This allows a way to hold onto a reference that
         * won't be added back into the pool.
         */
        persist: function() {
        },
        /**
         * Checks if this event should be released back into the pool.
         *
         * @return {boolean} True if this should not be released, false otherwise.
         */
        isPersistent: Ll
      }), t;
    }
    var Ea = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, Ca = dr(Ea), on = ft({}, Ea, {
      view: 0,
      detail: 0
    }), yh = dr(on), Xu, qu, Gu;
    function Fi(e) {
      e !== Gu && (Gu && e.type === "mousemove" ? (Xu = e.screenX - Gu.screenX, qu = e.screenY - Gu.screenY) : (Xu = 0, qu = 0), Gu = e);
    }
    var Ku = ft({}, on, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: ap,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (Fi(e), Xu);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : qu;
      }
    }), xd = dr(Ku), Ml = ft({}, Ku, {
      dataTransfer: 0
    }), tp = dr(Ml), Nl = ft({}, on, {
      relatedTarget: 0
    }), Sd = dr(Nl), wh = ft({}, Ea, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), rp = dr(wh), kd = ft({}, Ea, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), Lg = dr(kd), Mg = ft({}, Ea, {
      data: 0
    }), np = dr(Mg), bh = np, Al = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    }, Ng = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    };
    function Ms(e) {
      if (e.key) {
        var t = Al[e.key] || e.key;
        if (t !== "Unidentified")
          return t;
      }
      if (e.type === "keypress") {
        var a = Ls(e);
        return a === 13 ? "Enter" : String.fromCharCode(a);
      }
      return e.type === "keydown" || e.type === "keyup" ? Ng[e.keyCode] || "Unidentified" : "";
    }
    var xh = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function Dr(e) {
      var t = this, a = t.nativeEvent;
      if (a.getModifierState)
        return a.getModifierState(e);
      var o = xh[e];
      return o ? !!a[o] : !1;
    }
    function ap(e) {
      return Dr;
    }
    var Sh = ft({}, on, {
      key: Ms,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: ap,
      // Legacy Interface
      charCode: function(e) {
        return e.type === "keypress" ? Ls(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Ls(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), Ag = dr(Sh), Ug = ft({}, Ku, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), op = dr(Ug), kh = ft({}, on, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: ap
    }), jg = dr(kh), Ya = ft({}, Ea, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), ip = dr(Ya), Pg = ft({}, Ku, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : (
          // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
          "wheelDeltaX" in e ? -e.wheelDeltaX : 0
        );
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : (
          // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
          "wheelDeltaY" in e ? -e.wheelDeltaY : (
            // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
            "wheelDelta" in e ? -e.wheelDelta : 0
          )
        );
      },
      deltaZ: 0,
      // Browsers without "deltaMode" is reporting in raw wheel delta where one
      // notch on the scroll is always +/- 120, roughly equivalent to pixels.
      // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
      // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
      deltaMode: 0
    }), Hi = dr(Pg), Ed = [9, 13, 27, 32], Bi = 229, Ns = Pt && "CompositionEvent" in window, Ul = null;
    Pt && "documentMode" in document && (Ul = document.documentMode);
    var lp = Pt && "TextEvent" in window && !Ul, Eh = Pt && (!Ns || Ul && Ul > 8 && Ul <= 11), Cd = 32, Ch = String.fromCharCode(Cd);
    function Th() {
      Ye("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Ye("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Ye("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Ye("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var sp = !1;
    function Td(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function Rd(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function Rh(e, t) {
      return e === "keydown" && t.keyCode === Bi;
    }
    function _d(e, t) {
      switch (e) {
        case "keyup":
          return Ed.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== Bi;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function _h(e) {
      var t = e.detail;
      return typeof t == "object" && "data" in t ? t.data : null;
    }
    function up(e) {
      return e.locale === "ko";
    }
    var Vi = !1;
    function Dd(e, t, a, o, l) {
      var u, d;
      if (Ns ? u = Rd(t) : Vi ? _d(t, o) && (u = "onCompositionEnd") : Rh(t, o) && (u = "onCompositionStart"), !u)
        return null;
      Eh && !up(o) && (!Vi && u === "onCompositionStart" ? Vi = bd(l) : u === "onCompositionEnd" && Vi && (d = Qu()));
      var p = Nh(a, u);
      if (p.length > 0) {
        var v = new np(u, t, null, o, l);
        if (e.push({
          event: v,
          listeners: p
        }), d)
          v.data = d;
        else {
          var w = _h(o);
          w !== null && (v.data = w);
        }
      }
    }
    function cp(e, t) {
      switch (e) {
        case "compositionend":
          return _h(t);
        case "keypress":
          var a = t.which;
          return a !== Cd ? null : (sp = !0, Ch);
        case "textInput":
          var o = t.data;
          return o === Ch && sp ? null : o;
        default:
          return null;
      }
    }
    function Od(e, t) {
      if (Vi) {
        if (e === "compositionend" || !Ns && _d(e, t)) {
          var a = Qu();
          return Pi(), Vi = !1, a;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!Td(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return Eh && !up(t) ? null : t.data;
        default:
          return null;
      }
    }
    function Dh(e, t, a, o, l) {
      var u;
      if (lp ? u = cp(t, o) : u = Od(t, o), !u)
        return null;
      var d = Nh(a, "onBeforeInput");
      if (d.length > 0) {
        var p = new bh("onBeforeInput", "beforeinput", null, o, l);
        e.push({
          event: p,
          listeners: d
        }), p.data = u;
      }
    }
    function Fg(e, t, a, o, l, u, d) {
      Dd(e, t, a, o, l), Dh(e, t, a, o, l);
    }
    var zd = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0
    };
    function Oh(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!zd[e.type] : t === "textarea";
    }
    /**
     * Checks if an event is supported in the current execution environment.
     *
     * NOTE: This will not work correctly for non-generic events such as `change`,
     * `reset`, `load`, `error`, and `select`.
     *
     * Borrows from Modernizr.
     *
     * @param {string} eventNameSuffix Event name, e.g. "click".
     * @return {boolean} True if the event is supported.
     * @internal
     * @license Modernizr 3.0.0pre (Custom Build) | MIT
     */
    function Ju(e) {
      if (!Pt)
        return !1;
      var t = "on" + e, a = t in document;
      if (!a) {
        var o = document.createElement("div");
        o.setAttribute(t, "return;"), a = typeof o[t] == "function";
      }
      return a;
    }
    function Hg() {
      Ye("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function Zu(e, t, a, o) {
      xf(o);
      var l = Nh(t, "onChange");
      if (l.length > 0) {
        var u = new Ca("onChange", "change", null, a, o);
        e.push({
          event: u,
          listeners: l
        });
      }
    }
    var r = null, n = null;
    function i(e) {
      var t = e.nodeName && e.nodeName.toLowerCase();
      return t === "select" || t === "input" && e.type === "file";
    }
    function s(e) {
      var t = [];
      Zu(t, n, e, Oc(e)), Yv(c, t);
    }
    function c(e) {
      l1(e, 0);
    }
    function f(e) {
      var t = jd(e);
      if (bi(t))
        return e;
    }
    function m(e, t) {
      if (e === "change")
        return t;
    }
    var E = !1;
    Pt && (E = Ju("input") && (!document.documentMode || document.documentMode > 9));
    function _(e, t) {
      r = e, n = t, r.attachEvent("onpropertychange", ne);
    }
    function B() {
      r && (r.detachEvent("onpropertychange", ne), r = null, n = null);
    }
    function ne(e) {
      e.propertyName === "value" && f(n) && s(e);
    }
    function ie(e, t, a) {
      e === "focusin" ? (B(), _(t, a)) : e === "focusout" && B();
    }
    function re(e, t) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return f(n);
    }
    function ze(e) {
      var t = e.nodeName;
      return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function He(e, t) {
      if (e === "click")
        return f(t);
    }
    function Ve(e, t) {
      if (e === "input" || e === "change")
        return f(t);
    }
    function Ur(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || Fe(e, "number", e.value);
    }
    function N(e, t, a, o, l, u, d) {
      var p = a ? jd(a) : window, v, w;
      if (i(p) ? v = m : Oh(p) ? E ? v = Ve : (v = re, w = ie) : ze(p) && (v = He), v) {
        var x = v(t, a);
        if (x) {
          Zu(e, x, o, l);
          return;
        }
      }
      w && w(t, p, a), t === "focusout" && Ur(p);
    }
    function O() {
      Je("onMouseEnter", ["mouseout", "mouseover"]), Je("onMouseLeave", ["mouseout", "mouseover"]), Je("onPointerEnter", ["pointerout", "pointerover"]), Je("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function j(e, t, a, o, l, u, d) {
      var p = t === "mouseover" || t === "pointerover", v = t === "mouseout" || t === "pointerout";
      if (p && !Cg(o)) {
        var w = o.relatedTarget || o.fromElement;
        if (w && (rc(w) || Ep(w)))
          return;
      }
      if (!(!v && !p)) {
        var x;
        if (l.window === l)
          x = l;
        else {
          var z = l.ownerDocument;
          z ? x = z.defaultView || z.parentWindow : x = window;
        }
        var D, F;
        if (v) {
          var V = o.relatedTarget || o.toElement;
          if (D = a, F = V ? rc(V) : null, F !== null) {
            var Q = Un(F);
            (F !== Q || F.tag !== ae && F.tag !== H) && (F = null);
          }
        } else
          D = null, F = a;
        if (D !== F) {
          var ke = xd, Ke = "onMouseLeave", Ie = "onMouseEnter", jt = "mouse";
          (t === "pointerout" || t === "pointerover") && (ke = op, Ke = "onPointerLeave", Ie = "onPointerEnter", jt = "pointer");
          var Ot = D == null ? x : jd(D), A = F == null ? x : jd(F), W = new ke(Ke, jt + "leave", D, o, l);
          W.target = Ot, W.relatedTarget = A;
          var U = null, le = rc(l);
          if (le === a) {
            var Ue = new ke(Ie, jt + "enter", F, o, l);
            Ue.target = A, Ue.relatedTarget = Ot, U = Ue;
          }
          zS(e, W, U, D, F);
        }
      }
    }
    function ce(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var Re = typeof Object.is == "function" ? Object.is : ce;
    function Xe(e, t) {
      if (Re(e, t))
        return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), o = Object.keys(t);
      if (a.length !== o.length)
        return !1;
      for (var l = 0; l < a.length; l++) {
        var u = a[l];
        if (!ve.call(t, u) || !Re(e[u], t[u]))
          return !1;
      }
      return !0;
    }
    function Ze(e) {
      for (; e && e.firstChild; )
        e = e.firstChild;
      return e;
    }
    function st(e) {
      for (; e; ) {
        if (e.nextSibling)
          return e.nextSibling;
        e = e.parentNode;
      }
    }
    function Gr(e, t) {
      for (var a = Ze(e), o = 0, l = 0; a; ) {
        if (a.nodeType === Go) {
          if (l = o + a.textContent.length, o <= t && l >= t)
            return {
              node: a,
              offset: t - o
            };
          o = l;
        }
        a = Ze(st(a));
      }
    }
    function Ft(e) {
      var t = e.ownerDocument, a = t && t.defaultView || window, o = a.getSelection && a.getSelection();
      if (!o || o.rangeCount === 0)
        return null;
      var l = o.anchorNode, u = o.anchorOffset, d = o.focusNode, p = o.focusOffset;
      try {
        l.nodeType, d.nodeType;
      } catch {
        return null;
      }
      return Yi(e, l, u, d, p);
    }
    function Yi(e, t, a, o, l) {
      var u = 0, d = -1, p = -1, v = 0, w = 0, x = e, z = null;
      e: for (; ; ) {
        for (var D = null; x === t && (a === 0 || x.nodeType === Go) && (d = u + a), x === o && (l === 0 || x.nodeType === Go) && (p = u + l), x.nodeType === Go && (u += x.nodeValue.length), (D = x.firstChild) !== null; )
          z = x, x = D;
        for (; ; ) {
          if (x === e)
            break e;
          if (z === t && ++v === a && (d = u), z === o && ++w === l && (p = u), (D = x.nextSibling) !== null)
            break;
          x = z, z = x.parentNode;
        }
        x = D;
      }
      return d === -1 || p === -1 ? null : {
        start: d,
        end: p
      };
    }
    function Bg(e, t) {
      var a = e.ownerDocument || document, o = a && a.defaultView || window;
      if (o.getSelection) {
        var l = o.getSelection(), u = e.textContent.length, d = Math.min(t.start, u), p = t.end === void 0 ? d : Math.min(t.end, u);
        if (!l.extend && d > p) {
          var v = p;
          p = d, d = v;
        }
        var w = Gr(e, d), x = Gr(e, p);
        if (w && x) {
          if (l.rangeCount === 1 && l.anchorNode === w.node && l.anchorOffset === w.offset && l.focusNode === x.node && l.focusOffset === x.offset)
            return;
          var z = a.createRange();
          z.setStart(w.node, w.offset), l.removeAllRanges(), d > p ? (l.addRange(z), l.extend(x.node, x.offset)) : (z.setEnd(x.node, x.offset), l.addRange(z));
        }
      }
    }
    function q0(e) {
      return e && e.nodeType === Go;
    }
    function G0(e, t) {
      return !e || !t ? !1 : e === t ? !0 : q0(e) ? !1 : q0(t) ? G0(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
    }
    function pS(e) {
      return e && e.ownerDocument && G0(e.ownerDocument.documentElement, e);
    }
    function vS(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function K0() {
      for (var e = window, t = Wo(); t instanceof e.HTMLIFrameElement; ) {
        if (vS(t))
          e = t.contentWindow;
        else
          return t;
        t = Wo(e.document);
      }
      return t;
    }
    function Vg(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function hS() {
      var e = K0();
      return {
        focusedElem: e,
        selectionRange: Vg(e) ? gS(e) : null
      };
    }
    function mS(e) {
      var t = K0(), a = e.focusedElem, o = e.selectionRange;
      if (t !== a && pS(a)) {
        o !== null && Vg(a) && yS(a, o);
        for (var l = [], u = a; u = u.parentNode; )
          u.nodeType === ea && l.push({
            element: u,
            left: u.scrollLeft,
            top: u.scrollTop
          });
        typeof a.focus == "function" && a.focus();
        for (var d = 0; d < l.length; d++) {
          var p = l[d];
          p.element.scrollLeft = p.left, p.element.scrollTop = p.top;
        }
      }
    }
    function gS(e) {
      var t;
      return "selectionStart" in e ? t = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : t = Ft(e), t || {
        start: 0,
        end: 0
      };
    }
    function yS(e, t) {
      var a = t.start, o = t.end;
      o === void 0 && (o = a), "selectionStart" in e ? (e.selectionStart = a, e.selectionEnd = Math.min(o, e.value.length)) : Bg(e, t);
    }
    var wS = Pt && "documentMode" in document && document.documentMode <= 11;
    function bS() {
      Ye("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var Ld = null, Yg = null, dp = null, Ig = !1;
    function xS(e) {
      if ("selectionStart" in e && Vg(e))
        return {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      var t = e.ownerDocument && e.ownerDocument.defaultView || window, a = t.getSelection();
      return {
        anchorNode: a.anchorNode,
        anchorOffset: a.anchorOffset,
        focusNode: a.focusNode,
        focusOffset: a.focusOffset
      };
    }
    function SS(e) {
      return e.window === e ? e.document : e.nodeType === Ko ? e : e.ownerDocument;
    }
    function J0(e, t, a) {
      var o = SS(a);
      if (!(Ig || Ld == null || Ld !== Wo(o))) {
        var l = xS(Ld);
        if (!dp || !Xe(dp, l)) {
          dp = l;
          var u = Nh(Yg, "onSelect");
          if (u.length > 0) {
            var d = new Ca("onSelect", "select", null, t, a);
            e.push({
              event: d,
              listeners: u
            }), d.target = Ld;
          }
        }
      }
    }
    function kS(e, t, a, o, l, u, d) {
      var p = a ? jd(a) : window;
      switch (t) {
        case "focusin":
          (Oh(p) || p.contentEditable === "true") && (Ld = p, Yg = a, dp = null);
          break;
        case "focusout":
          Ld = null, Yg = null, dp = null;
          break;
        case "mousedown":
          Ig = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Ig = !1, J0(e, o, l);
          break;
        case "selectionchange":
          if (wS)
            break;
        case "keydown":
        case "keyup":
          J0(e, o, l);
      }
    }
    function zh(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var Md = {
      animationend: zh("Animation", "AnimationEnd"),
      animationiteration: zh("Animation", "AnimationIteration"),
      animationstart: zh("Animation", "AnimationStart"),
      transitionend: zh("Transition", "TransitionEnd")
    }, $g = {}, Z0 = {};
    Pt && (Z0 = document.createElement("div").style, "AnimationEvent" in window || (delete Md.animationend.animation, delete Md.animationiteration.animation, delete Md.animationstart.animation), "TransitionEvent" in window || delete Md.transitionend.transition);
    function Lh(e) {
      if ($g[e])
        return $g[e];
      if (!Md[e])
        return e;
      var t = Md[e];
      for (var a in t)
        if (t.hasOwnProperty(a) && a in Z0)
          return $g[e] = t[a];
      return e;
    }
    var e1 = Lh("animationend"), t1 = Lh("animationiteration"), r1 = Lh("animationstart"), n1 = Lh("transitionend"), a1 = /* @__PURE__ */ new Map(), o1 = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function As(e, t) {
      a1.set(e, t), Ye(t, [e]);
    }
    function ES() {
      for (var e = 0; e < o1.length; e++) {
        var t = o1[e], a = t.toLowerCase(), o = t[0].toUpperCase() + t.slice(1);
        As(a, "on" + o);
      }
      As(e1, "onAnimationEnd"), As(t1, "onAnimationIteration"), As(r1, "onAnimationStart"), As("dblclick", "onDoubleClick"), As("focusin", "onFocus"), As("focusout", "onBlur"), As(n1, "onTransitionEnd");
    }
    function CS(e, t, a, o, l, u, d) {
      var p = a1.get(t);
      if (p !== void 0) {
        var v = Ca, w = t;
        switch (t) {
          case "keypress":
            if (Ls(o) === 0)
              return;
          case "keydown":
          case "keyup":
            v = Ag;
            break;
          case "focusin":
            w = "focus", v = Sd;
            break;
          case "focusout":
            w = "blur", v = Sd;
            break;
          case "beforeblur":
          case "afterblur":
            v = Sd;
            break;
          case "click":
            if (o.button === 2)
              return;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = xd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = tp;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = jg;
            break;
          case e1:
          case t1:
          case r1:
            v = rp;
            break;
          case n1:
            v = ip;
            break;
          case "scroll":
            v = yh;
            break;
          case "wheel":
            v = Hi;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = Lg;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = op;
            break;
        }
        var x = (u & fl) !== 0;
        {
          var z = !x && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          t === "scroll", D = DS(a, p, o.type, x, z);
          if (D.length > 0) {
            var F = new v(p, w, null, o, l);
            e.push({
              event: F,
              listeners: D
            });
          }
        }
      }
    }
    ES(), O(), Hg(), bS(), Th();
    function TS(e, t, a, o, l, u, d) {
      CS(e, t, a, o, l, u);
      var p = (u & bf) === 0;
      p && (j(e, t, a, o, l), N(e, t, a, o, l), kS(e, t, a, o, l), Fg(e, t, a, o, l));
    }
    var fp = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Qg = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(fp));
    function i1(e, t, a) {
      var o = e.type || "unknown-event";
      e.currentTarget = a, xu(o, t, void 0, e), e.currentTarget = null;
    }
    function RS(e, t, a) {
      var o;
      if (a)
        for (var l = t.length - 1; l >= 0; l--) {
          var u = t[l], d = u.instance, p = u.currentTarget, v = u.listener;
          if (d !== o && e.isPropagationStopped())
            return;
          i1(e, v, p), o = d;
        }
      else
        for (var w = 0; w < t.length; w++) {
          var x = t[w], z = x.instance, D = x.currentTarget, F = x.listener;
          if (z !== o && e.isPropagationStopped())
            return;
          i1(e, F, D), o = z;
        }
    }
    function l1(e, t) {
      for (var a = (t & fl) !== 0, o = 0; o < e.length; o++) {
        var l = e[o], u = l.event, d = l.listeners;
        RS(u, d, a);
      }
      Jo();
    }
    function _S(e, t, a, o, l) {
      var u = Oc(a), d = [];
      TS(d, e, o, a, u, t), l1(d, t);
    }
    function Er(e, t) {
      Qg.has(e) || g('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var a = !1, o = aE(t), l = LS(e);
      o.has(l) || (s1(t, e, ko, a), o.add(l));
    }
    function Wg(e, t, a) {
      Qg.has(e) && !t && g('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var o = 0;
      t && (o |= fl), s1(a, e, o, t);
    }
    var Mh = "_reactListening" + Math.random().toString(36).slice(2);
    function pp(e) {
      if (!e[Mh]) {
        e[Mh] = !0, Ce.forEach(function(a) {
          a !== "selectionchange" && (Qg.has(a) || Wg(a, !1, e), Wg(a, !0, e));
        });
        var t = e.nodeType === Ko ? e : e.ownerDocument;
        t !== null && (t[Mh] || (t[Mh] = !0, Wg("selectionchange", !1, t)));
      }
    }
    function s1(e, t, a, o, l) {
      var u = ka(e, t, a), d = void 0;
      bu && (t === "touchstart" || t === "touchmove" || t === "wheel") && (d = !0), e = e, o ? d !== void 0 ? Os(e, t, u, d) : ep(e, t, u) : d !== void 0 ? ni(e, t, u, d) : ua(e, t, u);
    }
    function u1(e, t) {
      return e === t || e.nodeType === Hr && e.parentNode === t;
    }
    function Xg(e, t, a, o, l) {
      var u = o;
      if (!(t & wf) && !(t & ko)) {
        var d = l;
        if (o !== null) {
          var p = o;
          e: for (; ; ) {
            if (p === null)
              return;
            var v = p.tag;
            if (v === J || v === De) {
              var w = p.stateNode.containerInfo;
              if (u1(w, d))
                break;
              if (v === De)
                for (var x = p.return; x !== null; ) {
                  var z = x.tag;
                  if (z === J || z === De) {
                    var D = x.stateNode.containerInfo;
                    if (u1(D, d))
                      return;
                  }
                  x = x.return;
                }
              for (; w !== null; ) {
                var F = rc(w);
                if (F === null)
                  return;
                var V = F.tag;
                if (V === ae || V === H) {
                  p = u = F;
                  continue e;
                }
                w = w.parentNode;
              }
            }
            p = p.return;
          }
        }
      }
      Yv(function() {
        return _S(e, t, a, u);
      });
    }
    function vp(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function DS(e, t, a, o, l, u) {
      for (var d = t !== null ? t + "Capture" : null, p = o ? d : t, v = [], w = e, x = null; w !== null; ) {
        var z = w, D = z.stateNode, F = z.tag;
        if (F === ae && D !== null && (x = D, p !== null)) {
          var V = vl(w, p);
          V != null && v.push(vp(w, V, x));
        }
        if (l)
          break;
        w = w.return;
      }
      return v;
    }
    function Nh(e, t) {
      for (var a = t + "Capture", o = [], l = e; l !== null; ) {
        var u = l, d = u.stateNode, p = u.tag;
        if (p === ae && d !== null) {
          var v = d, w = vl(l, a);
          w != null && o.unshift(vp(l, w, v));
          var x = vl(l, t);
          x != null && o.push(vp(l, x, v));
        }
        l = l.return;
      }
      return o;
    }
    function Nd(e) {
      if (e === null)
        return null;
      do
        e = e.return;
      while (e && e.tag !== ae);
      return e || null;
    }
    function OS(e, t) {
      for (var a = e, o = t, l = 0, u = a; u; u = Nd(u))
        l++;
      for (var d = 0, p = o; p; p = Nd(p))
        d++;
      for (; l - d > 0; )
        a = Nd(a), l--;
      for (; d - l > 0; )
        o = Nd(o), d--;
      for (var v = l; v--; ) {
        if (a === o || o !== null && a === o.alternate)
          return a;
        a = Nd(a), o = Nd(o);
      }
      return null;
    }
    function c1(e, t, a, o, l) {
      for (var u = t._reactName, d = [], p = a; p !== null && p !== o; ) {
        var v = p, w = v.alternate, x = v.stateNode, z = v.tag;
        if (w !== null && w === o)
          break;
        if (z === ae && x !== null) {
          var D = x;
          if (l) {
            var F = vl(p, u);
            F != null && d.unshift(vp(p, F, D));
          } else if (!l) {
            var V = vl(p, u);
            V != null && d.push(vp(p, V, D));
          }
        }
        p = p.return;
      }
      d.length !== 0 && e.push({
        event: t,
        listeners: d
      });
    }
    function zS(e, t, a, o, l) {
      var u = o && l ? OS(o, l) : null;
      o !== null && c1(e, t, o, u, !1), l !== null && a !== null && c1(e, a, l, u, !0);
    }
    function LS(e, t) {
      return e + "__bubble";
    }
    var Ia = !1, hp = "dangerouslySetInnerHTML", Ah = "suppressContentEditableWarning", Us = "suppressHydrationWarning", d1 = "autoFocus", ec = "children", tc = "style", Uh = "__html", qg, jh, mp, f1, Ph, p1, v1;
    qg = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, jh = function(e, t) {
      jv(e, t), cs(e, t), Vv(e, t, {
        registrationNameDependencies: me,
        possibleRegistrationNames: Ae
      });
    }, p1 = Pt && !document.documentMode, mp = function(e, t, a) {
      if (!Ia) {
        var o = Fh(a), l = Fh(t);
        l !== o && (Ia = !0, g("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(l), JSON.stringify(o)));
      }
    }, f1 = function(e) {
      if (!Ia) {
        Ia = !0;
        var t = [];
        e.forEach(function(a) {
          t.push(a);
        }), g("Extra attributes from the server: %s", t);
      }
    }, Ph = function(e, t) {
      t === !1 ? g("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : g("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, v1 = function(e, t) {
      var a = e.namespaceURI === to ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return a.innerHTML = t, a.innerHTML;
    };
    var MS = /\r\n?/g, NS = /\u0000|\uFFFD/g;
    function Fh(e) {
      Qr(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace(MS, `
`).replace(NS, "");
    }
    function Hh(e, t, a, o) {
      var l = Fh(t), u = Fh(e);
      if (u !== l && (o && (Ia || (Ia = !0, g('Text content did not match. Server: "%s" Client: "%s"', u, l))), a && X))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function h1(e) {
      return e.nodeType === Ko ? e : e.ownerDocument;
    }
    function AS() {
    }
    function Bh(e) {
      e.onclick = AS;
    }
    function US(e, t, a, o, l) {
      for (var u in o)
        if (o.hasOwnProperty(u)) {
          var d = o[u];
          if (u === tc)
            d && Object.freeze(d), Lv(t, d);
          else if (u === hp) {
            var p = d ? d[Uh] : void 0;
            p != null && bv(t, p);
          } else if (u === ec)
            if (typeof d == "string") {
              var v = e !== "textarea" || d !== "";
              v && Si(t, d);
            } else typeof d == "number" && Si(t, "" + d);
          else u === Ah || u === Us || u === d1 || (me.hasOwnProperty(u) ? d != null && (typeof d != "function" && Ph(u, d), u === "onScroll" && Er("scroll", t)) : d != null && ya(t, u, d, l));
        }
    }
    function jS(e, t, a, o) {
      for (var l = 0; l < t.length; l += 2) {
        var u = t[l], d = t[l + 1];
        u === tc ? Lv(e, d) : u === hp ? bv(e, d) : u === ec ? Si(e, d) : ya(e, u, d, o);
      }
    }
    function PS(e, t, a, o) {
      var l, u = h1(a), d, p = o;
      if (p === to && (p = pf(e)), p === to) {
        if (l = ki(e, t), !l && e !== e.toLowerCase() && g("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var v = u.createElement("div");
          v.innerHTML = "<script><\/script>";
          var w = v.firstChild;
          d = v.removeChild(w);
        } else if (typeof t.is == "string")
          d = u.createElement(e, {
            is: t.is
          });
        else if (d = u.createElement(e), e === "select") {
          var x = d;
          t.multiple ? x.multiple = !0 : t.size && (x.size = t.size);
        }
      } else
        d = u.createElementNS(p, e);
      return p === to && !l && Object.prototype.toString.call(d) === "[object HTMLUnknownElement]" && !ve.call(qg, e) && (qg[e] = !0, g("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), d;
    }
    function FS(e, t) {
      return h1(t).createTextNode(e);
    }
    function HS(e, t, a, o) {
      var l = ki(t, a);
      jh(t, a);
      var u;
      switch (t) {
        case "dialog":
          Er("cancel", e), Er("close", e), u = a;
          break;
        case "iframe":
        case "object":
        case "embed":
          Er("load", e), u = a;
          break;
        case "video":
        case "audio":
          for (var d = 0; d < fp.length; d++)
            Er(fp[d], e);
          u = a;
          break;
        case "source":
          Er("error", e), u = a;
          break;
        case "img":
        case "image":
        case "link":
          Er("error", e), Er("load", e), u = a;
          break;
        case "details":
          Er("toggle", e), u = a;
          break;
        case "input":
          ns(e, a), u = Ua(e, a), Er("invalid", e);
          break;
        case "option":
          Xt(e, a), u = a;
          break;
        case "select":
          su(e, a), u = dl(e, a), Er("invalid", e);
          break;
        case "textarea":
          gv(e, a), u = Ec(e, a), Er("invalid", e);
          break;
        default:
          u = a;
      }
      switch (_c(t, u), US(t, e, o, u, l), t) {
        case "input":
          Aa(e), P(e, a, !1);
          break;
        case "textarea":
          Aa(e), wv(e);
          break;
        case "option":
          rr(e, a);
          break;
        case "select":
          cf(e, a);
          break;
        default:
          typeof u.onClick == "function" && Bh(e);
          break;
      }
    }
    function BS(e, t, a, o, l) {
      jh(t, o);
      var u = null, d, p;
      switch (t) {
        case "input":
          d = Ua(e, a), p = Ua(e, o), u = [];
          break;
        case "select":
          d = dl(e, a), p = dl(e, o), u = [];
          break;
        case "textarea":
          d = Ec(e, a), p = Ec(e, o), u = [];
          break;
        default:
          d = a, p = o, typeof d.onClick != "function" && typeof p.onClick == "function" && Bh(e);
          break;
      }
      _c(t, p);
      var v, w, x = null;
      for (v in d)
        if (!(p.hasOwnProperty(v) || !d.hasOwnProperty(v) || d[v] == null))
          if (v === tc) {
            var z = d[v];
            for (w in z)
              z.hasOwnProperty(w) && (x || (x = {}), x[w] = "");
          } else v === hp || v === ec || v === Ah || v === Us || v === d1 || (me.hasOwnProperty(v) ? u || (u = []) : (u = u || []).push(v, null));
      for (v in p) {
        var D = p[v], F = d != null ? d[v] : void 0;
        if (!(!p.hasOwnProperty(v) || D === F || D == null && F == null))
          if (v === tc)
            if (D && Object.freeze(D), F) {
              for (w in F)
                F.hasOwnProperty(w) && (!D || !D.hasOwnProperty(w)) && (x || (x = {}), x[w] = "");
              for (w in D)
                D.hasOwnProperty(w) && F[w] !== D[w] && (x || (x = {}), x[w] = D[w]);
            } else
              x || (u || (u = []), u.push(v, x)), x = D;
          else if (v === hp) {
            var V = D ? D[Uh] : void 0, Q = F ? F[Uh] : void 0;
            V != null && Q !== V && (u = u || []).push(v, V);
          } else v === ec ? (typeof D == "string" || typeof D == "number") && (u = u || []).push(v, "" + D) : v === Ah || v === Us || (me.hasOwnProperty(v) ? (D != null && (typeof D != "function" && Ph(v, D), v === "onScroll" && Er("scroll", e)), !u && F !== D && (u = [])) : (u = u || []).push(v, D));
      }
      return x && (ro(x, p[tc]), (u = u || []).push(tc, x)), u;
    }
    function VS(e, t, a, o, l) {
      a === "input" && l.type === "radio" && l.name != null && h(e, l);
      var u = ki(a, o), d = ki(a, l);
      switch (jS(e, t, u, d), a) {
        case "input":
          T(e, l);
          break;
        case "textarea":
          yv(e, l);
          break;
        case "select":
          kc(e, l);
          break;
      }
    }
    function YS(e) {
      {
        var t = e.toLowerCase();
        return ls.hasOwnProperty(t) && ls[t] || null;
      }
    }
    function IS(e, t, a, o, l, u, d) {
      var p, v;
      switch (p = ki(t, a), jh(t, a), t) {
        case "dialog":
          Er("cancel", e), Er("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          Er("load", e);
          break;
        case "video":
        case "audio":
          for (var w = 0; w < fp.length; w++)
            Er(fp[w], e);
          break;
        case "source":
          Er("error", e);
          break;
        case "img":
        case "image":
        case "link":
          Er("error", e), Er("load", e);
          break;
        case "details":
          Er("toggle", e);
          break;
        case "input":
          ns(e, a), Er("invalid", e);
          break;
        case "option":
          Xt(e, a);
          break;
        case "select":
          su(e, a), Er("invalid", e);
          break;
        case "textarea":
          gv(e, a), Er("invalid", e);
          break;
      }
      _c(t, a);
      {
        v = /* @__PURE__ */ new Set();
        for (var x = e.attributes, z = 0; z < x.length; z++) {
          var D = x[z].name.toLowerCase();
          switch (D) {
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              v.add(x[z].name);
          }
        }
      }
      var F = null;
      for (var V in a)
        if (a.hasOwnProperty(V)) {
          var Q = a[V];
          if (V === ec)
            typeof Q == "string" ? e.textContent !== Q && (a[Us] !== !0 && Hh(e.textContent, Q, u, d), F = [ec, Q]) : typeof Q == "number" && e.textContent !== "" + Q && (a[Us] !== !0 && Hh(e.textContent, Q, u, d), F = [ec, "" + Q]);
          else if (me.hasOwnProperty(V))
            Q != null && (typeof Q != "function" && Ph(V, Q), V === "onScroll" && Er("scroll", e));
          else if (d && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof p == "boolean") {
            var ke = void 0, Ke = fr(V);
            if (a[Us] !== !0) {
              if (!(V === Ah || V === Us || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              V === "value" || V === "checked" || V === "selected")) {
                if (V === hp) {
                  var Ie = e.innerHTML, jt = Q ? Q[Uh] : void 0;
                  if (jt != null) {
                    var Ot = v1(e, jt);
                    Ot !== Ie && mp(V, Ie, Ot);
                  }
                } else if (V === tc) {
                  if (v.delete(V), p1) {
                    var A = Sg(Q);
                    ke = e.getAttribute("style"), A !== ke && mp(V, ke, A);
                  }
                } else if (p && !M)
                  v.delete(V.toLowerCase()), ke = ho(e, V, Q), Q !== ke && mp(V, ke, Q);
                else if (!hr(V, Ke, p) && !en(V, Q, Ke, p)) {
                  var W = !1;
                  if (Ke !== null)
                    v.delete(Ke.attributeName), ke = al(e, V, Q, Ke);
                  else {
                    var U = o;
                    if (U === to && (U = pf(t)), U === to)
                      v.delete(V.toLowerCase());
                    else {
                      var le = YS(V);
                      le !== null && le !== V && (W = !0, v.delete(le)), v.delete(V);
                    }
                    ke = ho(e, V, Q);
                  }
                  var Ue = M;
                  !Ue && Q !== ke && !W && mp(V, ke, Q);
                }
              }
            }
          }
        }
      switch (d && // $FlowFixMe - Should be inferred as not undefined.
      v.size > 0 && a[Us] !== !0 && f1(v), t) {
        case "input":
          Aa(e), P(e, a, !0);
          break;
        case "textarea":
          Aa(e), wv(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof a.onClick == "function" && Bh(e);
          break;
      }
      return F;
    }
    function $S(e, t, a) {
      var o = e.nodeValue !== t;
      return o;
    }
    function Gg(e, t) {
      {
        if (Ia)
          return;
        Ia = !0, g("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function Kg(e, t) {
      {
        if (Ia)
          return;
        Ia = !0, g('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function Jg(e, t, a) {
      {
        if (Ia)
          return;
        Ia = !0, g("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
      }
    }
    function Zg(e, t) {
      {
        if (t === "" || Ia)
          return;
        Ia = !0, g('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
      }
    }
    function QS(e, t, a) {
      switch (t) {
        case "input":
          $(e, a);
          return;
        case "textarea":
          hg(e, a);
          return;
        case "select":
          df(e, a);
          return;
      }
    }
    var gp = function() {
    }, yp = function() {
    };
    {
      var WS = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], m1 = [
        "applet",
        "caption",
        "html",
        "table",
        "td",
        "th",
        "marquee",
        "object",
        "template",
        // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
        // TODO: Distinguish by namespace here -- for <title>, including it here
        // errs on the side of fewer warnings
        "foreignObject",
        "desc",
        "title"
      ], XS = m1.concat(["button"]), qS = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], g1 = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      yp = function(e, t) {
        var a = ft({}, e || g1), o = {
          tag: t
        };
        return m1.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), XS.indexOf(t) !== -1 && (a.pTagInButtonScope = null), WS.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = o, t === "form" && (a.formTag = o), t === "a" && (a.aTagInScope = o), t === "button" && (a.buttonTagInScope = o), t === "nobr" && (a.nobrTagInScope = o), t === "p" && (a.pTagInButtonScope = o), t === "li" && (a.listItemTagAutoclosing = o), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = o), a;
      };
      var GS = function(e, t) {
        switch (t) {
          case "select":
            return e === "option" || e === "optgroup" || e === "#text";
          case "optgroup":
            return e === "option" || e === "#text";
          case "option":
            return e === "#text";
          case "tr":
            return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
          case "tbody":
          case "thead":
          case "tfoot":
            return e === "tr" || e === "style" || e === "script" || e === "template";
          case "colgroup":
            return e === "col" || e === "template";
          case "table":
            return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
          case "head":
            return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
          case "html":
            return e === "head" || e === "body" || e === "frameset";
          case "frameset":
            return e === "frame";
          case "#document":
            return e === "html";
        }
        switch (e) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
          case "rp":
          case "rt":
            return qS.indexOf(t) === -1;
          case "body":
          case "caption":
          case "col":
          case "colgroup":
          case "frameset":
          case "frame":
          case "head":
          case "html":
          case "tbody":
          case "td":
          case "tfoot":
          case "th":
          case "thead":
          case "tr":
            return t == null;
        }
        return !0;
      }, KS = function(e, t) {
        switch (e) {
          case "address":
          case "article":
          case "aside":
          case "blockquote":
          case "center":
          case "details":
          case "dialog":
          case "dir":
          case "div":
          case "dl":
          case "fieldset":
          case "figcaption":
          case "figure":
          case "footer":
          case "header":
          case "hgroup":
          case "main":
          case "menu":
          case "nav":
          case "ol":
          case "p":
          case "section":
          case "summary":
          case "ul":
          case "pre":
          case "listing":
          case "table":
          case "hr":
          case "xmp":
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t.pTagInButtonScope;
          case "form":
            return t.formTag || t.pTagInButtonScope;
          case "li":
            return t.listItemTagAutoclosing;
          case "dd":
          case "dt":
            return t.dlItemTagAutoclosing;
          case "button":
            return t.buttonTagInScope;
          case "a":
            return t.aTagInScope;
          case "nobr":
            return t.nobrTagInScope;
        }
        return null;
      }, y1 = {};
      gp = function(e, t, a) {
        a = a || g1;
        var o = a.current, l = o && o.tag;
        t != null && (e != null && g("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var u = GS(e, l) ? null : o, d = u ? null : KS(e, a), p = u || d;
        if (p) {
          var v = p.tag, w = !!u + "|" + e + "|" + v;
          if (!y1[w]) {
            y1[w] = !0;
            var x = e, z = "";
            if (e === "#text" ? /\S/.test(t) ? x = "Text nodes" : (x = "Whitespace text nodes", z = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : x = "<" + e + ">", u) {
              var D = "";
              v === "table" && e === "tr" && (D += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), g("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", x, v, z, D);
            } else
              g("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", x, v);
          }
        }
      };
    }
    var Vh = "suppressHydrationWarning", Yh = "$", Ih = "/$", wp = "$?", bp = "$!", JS = "style", ey = null, ty = null;
    function ZS(e) {
      var t, a, o = e.nodeType;
      switch (o) {
        case Ko:
        case uu: {
          t = o === Ko ? "#document" : "#fragment";
          var l = e.documentElement;
          a = l ? l.namespaceURI : Cc(null, "");
          break;
        }
        default: {
          var u = o === Hr ? e.parentNode : e, d = u.namespaceURI || null;
          t = u.tagName, a = Cc(d, t);
          break;
        }
      }
      {
        var p = t.toLowerCase(), v = yp(null, p);
        return {
          namespace: a,
          ancestorInfo: v
        };
      }
    }
    function ek(e, t, a) {
      {
        var o = e, l = Cc(o.namespace, t), u = yp(o.ancestorInfo, t);
        return {
          namespace: l,
          ancestorInfo: u
        };
      }
    }
    function r_(e) {
      return e;
    }
    function tk(e) {
      ey = vn(), ty = hS();
      var t = null;
      return Ar(!1), t;
    }
    function rk(e) {
      mS(ty), Ar(ey), ey = null, ty = null;
    }
    function nk(e, t, a, o, l) {
      var u;
      {
        var d = o;
        if (gp(e, null, d.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var p = "" + t.children, v = yp(d.ancestorInfo, e);
          gp(null, p, v);
        }
        u = d.namespace;
      }
      var w = PS(e, t, a, u);
      return kp(l, w), uy(w, t), w;
    }
    function ak(e, t) {
      e.appendChild(t);
    }
    function ok(e, t, a, o, l) {
      switch (HS(e, t, a, o), t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          return !!a.autoFocus;
        case "img":
          return !0;
        default:
          return !1;
      }
    }
    function ik(e, t, a, o, l, u) {
      {
        var d = u;
        if (typeof o.children != typeof a.children && (typeof o.children == "string" || typeof o.children == "number")) {
          var p = "" + o.children, v = yp(d.ancestorInfo, t);
          gp(null, p, v);
        }
      }
      return BS(e, t, a, o);
    }
    function ry(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function lk(e, t, a, o) {
      {
        var l = a;
        gp(null, e, l.ancestorInfo);
      }
      var u = FS(e, t);
      return kp(o, u), u;
    }
    function sk() {
      var e = window.event;
      return e === void 0 ? fn : Ds(e.type);
    }
    var ny = typeof setTimeout == "function" ? setTimeout : void 0, uk = typeof clearTimeout == "function" ? clearTimeout : void 0, ay = -1, w1 = typeof Promise == "function" ? Promise : void 0, ck = typeof queueMicrotask == "function" ? queueMicrotask : typeof w1 < "u" ? function(e) {
      return w1.resolve(null).then(e).catch(dk);
    } : ny;
    function dk(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function fk(e, t, a, o) {
      switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          return;
        case "img": {
          a.src && (e.src = a.src);
          return;
        }
      }
    }
    function pk(e, t, a, o, l, u) {
      VS(e, t, a, o, l), uy(e, l);
    }
    function b1(e) {
      Si(e, "");
    }
    function vk(e, t, a) {
      e.nodeValue = a;
    }
    function hk(e, t) {
      e.appendChild(t);
    }
    function mk(e, t) {
      var a;
      e.nodeType === Hr ? (a = e.parentNode, a.insertBefore(t, e)) : (a = e, a.appendChild(t));
      var o = e._reactRootContainer;
      o == null && a.onclick === null && Bh(a);
    }
    function gk(e, t, a) {
      e.insertBefore(t, a);
    }
    function yk(e, t, a) {
      e.nodeType === Hr ? e.parentNode.insertBefore(t, a) : e.insertBefore(t, a);
    }
    function wk(e, t) {
      e.removeChild(t);
    }
    function bk(e, t) {
      e.nodeType === Hr ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function oy(e, t) {
      var a = t, o = 0;
      do {
        var l = a.nextSibling;
        if (e.removeChild(a), l && l.nodeType === Hr) {
          var u = l.data;
          if (u === Ih)
            if (o === 0) {
              e.removeChild(l), On(t);
              return;
            } else
              o--;
          else (u === Yh || u === wp || u === bp) && o++;
        }
        a = l;
      } while (a);
      On(t);
    }
    function xk(e, t) {
      e.nodeType === Hr ? oy(e.parentNode, t) : e.nodeType === ea && oy(e, t), On(e);
    }
    function Sk(e) {
      e = e;
      var t = e.style;
      typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function kk(e) {
      e.nodeValue = "";
    }
    function Ek(e, t) {
      e = e;
      var a = t[JS], o = a != null && a.hasOwnProperty("display") ? a.display : null;
      e.style.display = Rc("display", o);
    }
    function Ck(e, t) {
      e.nodeValue = t;
    }
    function Tk(e) {
      e.nodeType === ea ? e.textContent = "" : e.nodeType === Ko && e.documentElement && e.removeChild(e.documentElement);
    }
    function Rk(e, t, a) {
      return e.nodeType !== ea || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function _k(e, t) {
      return t === "" || e.nodeType !== Go ? null : e;
    }
    function Dk(e) {
      return e.nodeType !== Hr ? null : e;
    }
    function x1(e) {
      return e.data === wp;
    }
    function iy(e) {
      return e.data === bp;
    }
    function Ok(e) {
      var t = e.nextSibling && e.nextSibling.dataset, a, o, l;
      return t && (a = t.dgst, o = t.msg, l = t.stck), {
        message: o,
        digest: a,
        stack: l
      };
    }
    function zk(e, t) {
      e._reactRetry = t;
    }
    function $h(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === ea || t === Go)
          break;
        if (t === Hr) {
          var a = e.data;
          if (a === Yh || a === bp || a === wp)
            break;
          if (a === Ih)
            return null;
        }
      }
      return e;
    }
    function xp(e) {
      return $h(e.nextSibling);
    }
    function Lk(e) {
      return $h(e.firstChild);
    }
    function Mk(e) {
      return $h(e.firstChild);
    }
    function Nk(e) {
      return $h(e.nextSibling);
    }
    function Ak(e, t, a, o, l, u, d) {
      kp(u, e), uy(e, a);
      var p;
      {
        var v = l;
        p = v.namespace;
      }
      var w = (u.mode & Et) !== Qe;
      return IS(e, t, a, p, o, w, d);
    }
    function Uk(e, t, a, o) {
      return kp(a, e), a.mode & Et, $S(e, t);
    }
    function jk(e, t) {
      kp(t, e);
    }
    function Pk(e) {
      for (var t = e.nextSibling, a = 0; t; ) {
        if (t.nodeType === Hr) {
          var o = t.data;
          if (o === Ih) {
            if (a === 0)
              return xp(t);
            a--;
          } else (o === Yh || o === bp || o === wp) && a++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function S1(e) {
      for (var t = e.previousSibling, a = 0; t; ) {
        if (t.nodeType === Hr) {
          var o = t.data;
          if (o === Yh || o === bp || o === wp) {
            if (a === 0)
              return t;
            a--;
          } else o === Ih && a++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function Fk(e) {
      On(e);
    }
    function Hk(e) {
      On(e);
    }
    function Bk(e) {
      return e !== "head" && e !== "body";
    }
    function Vk(e, t, a, o) {
      var l = !0;
      Hh(t.nodeValue, a, o, l);
    }
    function Yk(e, t, a, o, l, u) {
      if (t[Vh] !== !0) {
        var d = !0;
        Hh(o.nodeValue, l, u, d);
      }
    }
    function Ik(e, t) {
      t.nodeType === ea ? Gg(e, t) : t.nodeType === Hr || Kg(e, t);
    }
    function $k(e, t) {
      {
        var a = e.parentNode;
        a !== null && (t.nodeType === ea ? Gg(a, t) : t.nodeType === Hr || Kg(a, t));
      }
    }
    function Qk(e, t, a, o, l) {
      (l || t[Vh] !== !0) && (o.nodeType === ea ? Gg(a, o) : o.nodeType === Hr || Kg(a, o));
    }
    function Wk(e, t, a) {
      Jg(e, t);
    }
    function Xk(e, t) {
      Zg(e, t);
    }
    function qk(e, t, a) {
      {
        var o = e.parentNode;
        o !== null && Jg(o, t);
      }
    }
    function Gk(e, t) {
      {
        var a = e.parentNode;
        a !== null && Zg(a, t);
      }
    }
    function Kk(e, t, a, o, l, u) {
      (u || t[Vh] !== !0) && Jg(a, o);
    }
    function Jk(e, t, a, o, l) {
      (l || t[Vh] !== !0) && Zg(a, o);
    }
    function Zk(e) {
      g("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function eE(e) {
      pp(e);
    }
    var Ad = Math.random().toString(36).slice(2), Ud = "__reactFiber$" + Ad, ly = "__reactProps$" + Ad, Sp = "__reactContainer$" + Ad, sy = "__reactEvents$" + Ad, tE = "__reactListeners$" + Ad, rE = "__reactHandles$" + Ad;
    function nE(e) {
      delete e[Ud], delete e[ly], delete e[sy], delete e[tE], delete e[rE];
    }
    function kp(e, t) {
      t[Ud] = e;
    }
    function Qh(e, t) {
      t[Sp] = e;
    }
    function k1(e) {
      e[Sp] = null;
    }
    function Ep(e) {
      return !!e[Sp];
    }
    function rc(e) {
      var t = e[Ud];
      if (t)
        return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[Sp] || a[Ud], t) {
          var o = t.alternate;
          if (t.child !== null || o !== null && o.child !== null)
            for (var l = S1(e); l !== null; ) {
              var u = l[Ud];
              if (u)
                return u;
              l = S1(l);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function js(e) {
      var t = e[Ud] || e[Sp];
      return t && (t.tag === ae || t.tag === H || t.tag === be || t.tag === J) ? t : null;
    }
    function jd(e) {
      if (e.tag === ae || e.tag === H)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function Wh(e) {
      return e[ly] || null;
    }
    function uy(e, t) {
      e[ly] = t;
    }
    function aE(e) {
      var t = e[sy];
      return t === void 0 && (t = e[sy] = /* @__PURE__ */ new Set()), t;
    }
    var E1 = {}, C1 = C.ReactDebugCurrentFrame;
    function Xh(e) {
      if (e) {
        var t = e._owner, a = nu(e.type, e._source, t ? t.type : null);
        C1.setExtraStackFrame(a);
      } else
        C1.setExtraStackFrame(null);
    }
    function ai(e, t, a, o, l) {
      {
        var u = Function.call.bind(ve);
        for (var d in e)
          if (u(e, d)) {
            var p = void 0;
            try {
              if (typeof e[d] != "function") {
                var v = Error((o || "React class") + ": " + a + " type `" + d + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[d] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw v.name = "Invariant Violation", v;
              }
              p = e[d](t, d, o, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (w) {
              p = w;
            }
            p && !(p instanceof Error) && (Xh(l), g("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", a, d, typeof p), Xh(null)), p instanceof Error && !(p.message in E1) && (E1[p.message] = !0, Xh(l), g("Failed %s type: %s", a, p.message), Xh(null));
          }
      }
    }
    var cy = [], qh;
    qh = [];
    var jl = -1;
    function Ps(e) {
      return {
        current: e
      };
    }
    function ca(e, t) {
      if (jl < 0) {
        g("Unexpected pop.");
        return;
      }
      t !== qh[jl] && g("Unexpected Fiber popped."), e.current = cy[jl], cy[jl] = null, qh[jl] = null, jl--;
    }
    function da(e, t, a) {
      jl++, cy[jl] = e.current, qh[jl] = a, e.current = t;
    }
    var dy;
    dy = {};
    var uo = {};
    Object.freeze(uo);
    var Pl = Ps(uo), Ii = Ps(!1), fy = uo;
    function Pd(e, t, a) {
      return a && $i(t) ? fy : Pl.current;
    }
    function T1(e, t, a) {
      {
        var o = e.stateNode;
        o.__reactInternalMemoizedUnmaskedChildContext = t, o.__reactInternalMemoizedMaskedChildContext = a;
      }
    }
    function Fd(e, t) {
      {
        var a = e.type, o = a.contextTypes;
        if (!o)
          return uo;
        var l = e.stateNode;
        if (l && l.__reactInternalMemoizedUnmaskedChildContext === t)
          return l.__reactInternalMemoizedMaskedChildContext;
        var u = {};
        for (var d in o)
          u[d] = t[d];
        {
          var p = lt(e) || "Unknown";
          ai(o, u, "context", p);
        }
        return l && T1(e, t, u), u;
      }
    }
    function Gh() {
      return Ii.current;
    }
    function $i(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function Kh(e) {
      ca(Ii, e), ca(Pl, e);
    }
    function py(e) {
      ca(Ii, e), ca(Pl, e);
    }
    function R1(e, t, a) {
      {
        if (Pl.current !== uo)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        da(Pl, t, e), da(Ii, a, e);
      }
    }
    function _1(e, t, a) {
      {
        var o = e.stateNode, l = t.childContextTypes;
        if (typeof o.getChildContext != "function") {
          {
            var u = lt(e) || "Unknown";
            dy[u] || (dy[u] = !0, g("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", u, u));
          }
          return a;
        }
        var d = o.getChildContext();
        for (var p in d)
          if (!(p in l))
            throw new Error((lt(e) || "Unknown") + '.getChildContext(): key "' + p + '" is not defined in childContextTypes.');
        {
          var v = lt(e) || "Unknown";
          ai(l, d, "child context", v);
        }
        return ft({}, a, d);
      }
    }
    function Jh(e) {
      {
        var t = e.stateNode, a = t && t.__reactInternalMemoizedMergedChildContext || uo;
        return fy = Pl.current, da(Pl, a, e), da(Ii, Ii.current, e), !0;
      }
    }
    function D1(e, t, a) {
      {
        var o = e.stateNode;
        if (!o)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (a) {
          var l = _1(e, t, fy);
          o.__reactInternalMemoizedMergedChildContext = l, ca(Ii, e), ca(Pl, e), da(Pl, l, e), da(Ii, a, e);
        } else
          ca(Ii, e), da(Ii, a, e);
      }
    }
    function oE(e) {
      {
        if (!Wv(e) || e.tag !== I)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case J:
              return t.stateNode.context;
            case I: {
              var a = t.type;
              if ($i(a))
                return t.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          t = t.return;
        } while (t !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var Fs = 0, Zh = 1, Fl = null, vy = !1, hy = !1;
    function O1(e) {
      Fl === null ? Fl = [e] : Fl.push(e);
    }
    function iE(e) {
      vy = !0, O1(e);
    }
    function z1() {
      vy && Hs();
    }
    function Hs() {
      if (!hy && Fl !== null) {
        hy = !0;
        var e = 0, t = Sa();
        try {
          var a = !0, o = Fl;
          for (Xr(sa); e < o.length; e++) {
            var l = o[e];
            do
              l = l(a);
            while (l !== null);
          }
          Fl = null, vy = !1;
        } catch (u) {
          throw Fl !== null && (Fl = Fl.slice(e + 1)), _f(ei, Hs), u;
        } finally {
          Xr(t), hy = !1;
        }
      }
      return null;
    }
    var Hd = [], Bd = 0, em = null, tm = 0, Oo = [], zo = 0, nc = null, Hl = 1, Bl = "";
    function lE(e) {
      return oc(), (e.flags & ku) !== $e;
    }
    function sE(e) {
      return oc(), tm;
    }
    function uE() {
      var e = Bl, t = Hl, a = t & ~cE(t);
      return a.toString(32) + e;
    }
    function ac(e, t) {
      oc(), Hd[Bd++] = tm, Hd[Bd++] = em, em = e, tm = t;
    }
    function L1(e, t, a) {
      oc(), Oo[zo++] = Hl, Oo[zo++] = Bl, Oo[zo++] = nc, nc = e;
      var o = Hl, l = Bl, u = rm(o) - 1, d = o & ~(1 << u), p = a + 1, v = rm(t) + u;
      if (v > 30) {
        var w = u - u % 5, x = (1 << w) - 1, z = (d & x).toString(32), D = d >> w, F = u - w, V = rm(t) + F, Q = p << F, ke = Q | D, Ke = z + l;
        Hl = 1 << V | ke, Bl = Ke;
      } else {
        var Ie = p << u, jt = Ie | d, Ot = l;
        Hl = 1 << v | jt, Bl = Ot;
      }
    }
    function my(e) {
      oc();
      var t = e.return;
      if (t !== null) {
        var a = 1, o = 0;
        ac(e, a), L1(e, a, o);
      }
    }
    function rm(e) {
      return 32 - Wr(e);
    }
    function cE(e) {
      return 1 << rm(e) - 1;
    }
    function gy(e) {
      for (; e === em; )
        em = Hd[--Bd], Hd[Bd] = null, tm = Hd[--Bd], Hd[Bd] = null;
      for (; e === nc; )
        nc = Oo[--zo], Oo[zo] = null, Bl = Oo[--zo], Oo[zo] = null, Hl = Oo[--zo], Oo[zo] = null;
    }
    function dE() {
      return oc(), nc !== null ? {
        id: Hl,
        overflow: Bl
      } : null;
    }
    function fE(e, t) {
      oc(), Oo[zo++] = Hl, Oo[zo++] = Bl, Oo[zo++] = nc, Hl = t.id, Bl = t.overflow, nc = e;
    }
    function oc() {
      Fn() || g("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var Pn = null, Lo = null, oi = !1, ic = !1, Bs = null;
    function pE() {
      oi && g("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function M1() {
      ic = !0;
    }
    function vE() {
      return ic;
    }
    function hE(e) {
      var t = e.stateNode.containerInfo;
      return Lo = Mk(t), Pn = e, oi = !0, Bs = null, ic = !1, !0;
    }
    function mE(e, t, a) {
      return Lo = Nk(t), Pn = e, oi = !0, Bs = null, ic = !1, a !== null && fE(e, a), !0;
    }
    function N1(e, t) {
      switch (e.tag) {
        case J: {
          Ik(e.stateNode.containerInfo, t);
          break;
        }
        case ae: {
          var a = (e.mode & Et) !== Qe;
          Qk(
            e.type,
            e.memoizedProps,
            e.stateNode,
            t,
            // TODO: Delete this argument when we remove the legacy root API.
            a
          );
          break;
        }
        case be: {
          var o = e.memoizedState;
          o.dehydrated !== null && $k(o.dehydrated, t);
          break;
        }
      }
    }
    function A1(e, t) {
      N1(e, t);
      var a = bT();
      a.stateNode = t, a.return = e;
      var o = e.deletions;
      o === null ? (e.deletions = [a], e.flags |= ta) : o.push(a);
    }
    function yy(e, t) {
      {
        if (ic)
          return;
        switch (e.tag) {
          case J: {
            var a = e.stateNode.containerInfo;
            switch (t.tag) {
              case ae:
                var o = t.type;
                t.pendingProps, Wk(a, o);
                break;
              case H:
                var l = t.pendingProps;
                Xk(a, l);
                break;
            }
            break;
          }
          case ae: {
            var u = e.type, d = e.memoizedProps, p = e.stateNode;
            switch (t.tag) {
              case ae: {
                var v = t.type, w = t.pendingProps, x = (e.mode & Et) !== Qe;
                Kk(
                  u,
                  d,
                  p,
                  v,
                  w,
                  // TODO: Delete this argument when we remove the legacy root API.
                  x
                );
                break;
              }
              case H: {
                var z = t.pendingProps, D = (e.mode & Et) !== Qe;
                Jk(
                  u,
                  d,
                  p,
                  z,
                  // TODO: Delete this argument when we remove the legacy root API.
                  D
                );
                break;
              }
            }
            break;
          }
          case be: {
            var F = e.memoizedState, V = F.dehydrated;
            if (V !== null) switch (t.tag) {
              case ae:
                var Q = t.type;
                t.pendingProps, qk(V, Q);
                break;
              case H:
                var ke = t.pendingProps;
                Gk(V, ke);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function U1(e, t) {
      t.flags = t.flags & ~_r | Rr, yy(e, t);
    }
    function j1(e, t) {
      switch (e.tag) {
        case ae: {
          var a = e.type;
          e.pendingProps;
          var o = Rk(t, a);
          return o !== null ? (e.stateNode = o, Pn = e, Lo = Lk(o), !0) : !1;
        }
        case H: {
          var l = e.pendingProps, u = _k(t, l);
          return u !== null ? (e.stateNode = u, Pn = e, Lo = null, !0) : !1;
        }
        case be: {
          var d = Dk(t);
          if (d !== null) {
            var p = {
              dehydrated: d,
              treeContext: dE(),
              retryLane: oa
            };
            e.memoizedState = p;
            var v = xT(d);
            return v.return = e, e.child = v, Pn = e, Lo = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function wy(e) {
      return (e.mode & Et) !== Qe && (e.flags & St) === $e;
    }
    function by(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function xy(e) {
      if (oi) {
        var t = Lo;
        if (!t) {
          wy(e) && (yy(Pn, e), by()), U1(Pn, e), oi = !1, Pn = e;
          return;
        }
        var a = t;
        if (!j1(e, t)) {
          wy(e) && (yy(Pn, e), by()), t = xp(a);
          var o = Pn;
          if (!t || !j1(e, t)) {
            U1(Pn, e), oi = !1, Pn = e;
            return;
          }
          A1(o, a);
        }
      }
    }
    function gE(e, t, a) {
      var o = e.stateNode, l = !ic, u = Ak(o, e.type, e.memoizedProps, t, a, e, l);
      return e.updateQueue = u, u !== null;
    }
    function yE(e) {
      var t = e.stateNode, a = e.memoizedProps, o = Uk(t, a, e);
      if (o) {
        var l = Pn;
        if (l !== null)
          switch (l.tag) {
            case J: {
              var u = l.stateNode.containerInfo, d = (l.mode & Et) !== Qe;
              Vk(
                u,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                d
              );
              break;
            }
            case ae: {
              var p = l.type, v = l.memoizedProps, w = l.stateNode, x = (l.mode & Et) !== Qe;
              Yk(
                p,
                v,
                w,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                x
              );
              break;
            }
          }
      }
      return o;
    }
    function wE(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      jk(a, e);
    }
    function bE(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return Pk(a);
    }
    function P1(e) {
      for (var t = e.return; t !== null && t.tag !== ae && t.tag !== J && t.tag !== be; )
        t = t.return;
      Pn = t;
    }
    function nm(e) {
      if (e !== Pn)
        return !1;
      if (!oi)
        return P1(e), oi = !0, !1;
      if (e.tag !== J && (e.tag !== ae || Bk(e.type) && !ry(e.type, e.memoizedProps))) {
        var t = Lo;
        if (t)
          if (wy(e))
            F1(e), by();
          else
            for (; t; )
              A1(e, t), t = xp(t);
      }
      return P1(e), e.tag === be ? Lo = bE(e) : Lo = Pn ? xp(e.stateNode) : null, !0;
    }
    function xE() {
      return oi && Lo !== null;
    }
    function F1(e) {
      for (var t = Lo; t; )
        N1(e, t), t = xp(t);
    }
    function Vd() {
      Pn = null, Lo = null, oi = !1, ic = !1;
    }
    function H1() {
      Bs !== null && (Mx(Bs), Bs = null);
    }
    function Fn() {
      return oi;
    }
    function Sy(e) {
      Bs === null ? Bs = [e] : Bs.push(e);
    }
    var SE = C.ReactCurrentBatchConfig, kE = null;
    function EE() {
      return SE.transition;
    }
    var ii = {
      recordUnsafeLifecycleWarnings: function(e, t) {
      },
      flushPendingUnsafeLifecycleWarnings: function() {
      },
      recordLegacyContextWarning: function(e, t) {
      },
      flushLegacyContextWarning: function() {
      },
      discardPendingWarnings: function() {
      }
    };
    {
      var CE = function(e) {
        for (var t = null, a = e; a !== null; )
          a.mode & pt && (t = a), a = a.return;
        return t;
      }, lc = function(e) {
        var t = [];
        return e.forEach(function(a) {
          t.push(a);
        }), t.sort().join(", ");
      }, Cp = [], Tp = [], Rp = [], _p = [], Dp = [], Op = [], sc = /* @__PURE__ */ new Set();
      ii.recordUnsafeLifecycleWarnings = function(e, t) {
        sc.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        t.componentWillMount.__suppressDeprecationWarning !== !0 && Cp.push(e), e.mode & pt && typeof t.UNSAFE_componentWillMount == "function" && Tp.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && Rp.push(e), e.mode & pt && typeof t.UNSAFE_componentWillReceiveProps == "function" && _p.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && Dp.push(e), e.mode & pt && typeof t.UNSAFE_componentWillUpdate == "function" && Op.push(e));
      }, ii.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        Cp.length > 0 && (Cp.forEach(function(D) {
          e.add(lt(D) || "Component"), sc.add(D.type);
        }), Cp = []);
        var t = /* @__PURE__ */ new Set();
        Tp.length > 0 && (Tp.forEach(function(D) {
          t.add(lt(D) || "Component"), sc.add(D.type);
        }), Tp = []);
        var a = /* @__PURE__ */ new Set();
        Rp.length > 0 && (Rp.forEach(function(D) {
          a.add(lt(D) || "Component"), sc.add(D.type);
        }), Rp = []);
        var o = /* @__PURE__ */ new Set();
        _p.length > 0 && (_p.forEach(function(D) {
          o.add(lt(D) || "Component"), sc.add(D.type);
        }), _p = []);
        var l = /* @__PURE__ */ new Set();
        Dp.length > 0 && (Dp.forEach(function(D) {
          l.add(lt(D) || "Component"), sc.add(D.type);
        }), Dp = []);
        var u = /* @__PURE__ */ new Set();
        if (Op.length > 0 && (Op.forEach(function(D) {
          u.add(lt(D) || "Component"), sc.add(D.type);
        }), Op = []), t.size > 0) {
          var d = lc(t);
          g(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, d);
        }
        if (o.size > 0) {
          var p = lc(o);
          g(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, p);
        }
        if (u.size > 0) {
          var v = lc(u);
          g(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, v);
        }
        if (e.size > 0) {
          var w = lc(e);
          Z(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, w);
        }
        if (a.size > 0) {
          var x = lc(a);
          Z(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, x);
        }
        if (l.size > 0) {
          var z = lc(l);
          Z(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, z);
        }
      };
      var am = /* @__PURE__ */ new Map(), B1 = /* @__PURE__ */ new Set();
      ii.recordLegacyContextWarning = function(e, t) {
        var a = CE(e);
        if (a === null) {
          g("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!B1.has(e.type)) {
          var o = am.get(a);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (o === void 0 && (o = [], am.set(a, o)), o.push(e));
        }
      }, ii.flushLegacyContextWarning = function() {
        am.forEach(function(e, t) {
          if (e.length !== 0) {
            var a = e[0], o = /* @__PURE__ */ new Set();
            e.forEach(function(u) {
              o.add(lt(u) || "Component"), B1.add(u.type);
            });
            var l = lc(o);
            try {
              tr(a), g(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, l);
            } finally {
              Tr();
            }
          }
        });
      }, ii.discardPendingWarnings = function() {
        Cp = [], Tp = [], Rp = [], _p = [], Dp = [], Op = [], am = /* @__PURE__ */ new Map();
      };
    }
    var ky, Ey, Cy, Ty, Ry, V1 = function(e, t) {
    };
    ky = !1, Ey = !1, Cy = {}, Ty = {}, Ry = {}, V1 = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var a = lt(t) || "Component";
        Ty[a] || (Ty[a] = !0, g('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function TE(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function zp(e, t, a) {
      var o = a.ref;
      if (o !== null && typeof o != "function" && typeof o != "object") {
        if ((e.mode & pt || se) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(a._owner && a._self && a._owner.stateNode !== a._self) && // Will already throw with "Function components cannot have string refs"
        !(a._owner && a._owner.tag !== I) && // Will already warn with "Function components cannot be given refs"
        !(typeof a.type == "function" && !TE(a.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        a._owner) {
          var l = lt(e) || "Component";
          Cy[l] || (g('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', l, o), Cy[l] = !0);
        }
        if (a._owner) {
          var u = a._owner, d;
          if (u) {
            var p = u;
            if (p.tag !== I)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            d = p.stateNode;
          }
          if (!d)
            throw new Error("Missing owner for string ref " + o + ". This error is likely caused by a bug in React. Please file an issue.");
          var v = d;
          Ka(o, "ref");
          var w = "" + o;
          if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === w)
            return t.ref;
          var x = function(z) {
            var D = v.refs;
            z === null ? delete D[w] : D[w] = z;
          };
          return x._stringRef = w, x;
        } else {
          if (typeof o != "string")
            throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
          if (!a._owner)
            throw new Error("Element ref was specified as a string (" + o + `) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`);
        }
      }
      return o;
    }
    function om(e, t) {
      var a = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
    }
    function im(e) {
      {
        var t = lt(e) || "Component";
        if (Ry[t])
          return;
        Ry[t] = !0, g("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function Y1(e) {
      var t = e._payload, a = e._init;
      return a(t);
    }
    function I1(e) {
      function t(A, W) {
        if (e) {
          var U = A.deletions;
          U === null ? (A.deletions = [W], A.flags |= ta) : U.push(W);
        }
      }
      function a(A, W) {
        if (!e)
          return null;
        for (var U = W; U !== null; )
          t(A, U), U = U.sibling;
        return null;
      }
      function o(A, W) {
        for (var U = /* @__PURE__ */ new Map(), le = W; le !== null; )
          le.key !== null ? U.set(le.key, le) : U.set(le.index, le), le = le.sibling;
        return U;
      }
      function l(A, W) {
        var U = gc(A, W);
        return U.index = 0, U.sibling = null, U;
      }
      function u(A, W, U) {
        if (A.index = U, !e)
          return A.flags |= ku, W;
        var le = A.alternate;
        if (le !== null) {
          var Ue = le.index;
          return Ue < W ? (A.flags |= Rr, W) : Ue;
        } else
          return A.flags |= Rr, W;
      }
      function d(A) {
        return e && A.alternate === null && (A.flags |= Rr), A;
      }
      function p(A, W, U, le) {
        if (W === null || W.tag !== H) {
          var Ue = S0(U, A.mode, le);
          return Ue.return = A, Ue;
        } else {
          var _e = l(W, U);
          return _e.return = A, _e;
        }
      }
      function v(A, W, U, le) {
        var Ue = U.type;
        if (Ue === Gn)
          return x(A, W, U.props.children, le, U.key);
        if (W !== null && (W.elementType === Ue || // Keep this check inline so it only runs on the false path:
        qx(W, U) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof Ue == "object" && Ue !== null && Ue.$$typeof === ut && Y1(Ue) === W.type)) {
          var _e = l(W, U.props);
          return _e.ref = zp(A, W, U), _e.return = A, _e._debugSource = U._source, _e._debugOwner = U._owner, _e;
        }
        var at = x0(U, A.mode, le);
        return at.ref = zp(A, W, U), at.return = A, at;
      }
      function w(A, W, U, le) {
        if (W === null || W.tag !== De || W.stateNode.containerInfo !== U.containerInfo || W.stateNode.implementation !== U.implementation) {
          var Ue = k0(U, A.mode, le);
          return Ue.return = A, Ue;
        } else {
          var _e = l(W, U.children || []);
          return _e.return = A, _e;
        }
      }
      function x(A, W, U, le, Ue) {
        if (W === null || W.tag !== ue) {
          var _e = Js(U, A.mode, le, Ue);
          return _e.return = A, _e;
        } else {
          var at = l(W, U);
          return at.return = A, at;
        }
      }
      function z(A, W, U) {
        if (typeof W == "string" && W !== "" || typeof W == "number") {
          var le = S0("" + W, A.mode, U);
          return le.return = A, le;
        }
        if (typeof W == "object" && W !== null) {
          switch (W.$$typeof) {
            case un: {
              var Ue = x0(W, A.mode, U);
              return Ue.ref = zp(A, null, W), Ue.return = A, Ue;
            }
            case wa: {
              var _e = k0(W, A.mode, U);
              return _e.return = A, _e;
            }
            case ut: {
              var at = W._payload, dt = W._init;
              return z(A, dt(at), U);
            }
          }
          if (vt(W) || br(W)) {
            var ir = Js(W, A.mode, U, null);
            return ir.return = A, ir;
          }
          om(A, W);
        }
        return typeof W == "function" && im(A), null;
      }
      function D(A, W, U, le) {
        var Ue = W !== null ? W.key : null;
        if (typeof U == "string" && U !== "" || typeof U == "number")
          return Ue !== null ? null : p(A, W, "" + U, le);
        if (typeof U == "object" && U !== null) {
          switch (U.$$typeof) {
            case un:
              return U.key === Ue ? v(A, W, U, le) : null;
            case wa:
              return U.key === Ue ? w(A, W, U, le) : null;
            case ut: {
              var _e = U._payload, at = U._init;
              return D(A, W, at(_e), le);
            }
          }
          if (vt(U) || br(U))
            return Ue !== null ? null : x(A, W, U, le, null);
          om(A, U);
        }
        return typeof U == "function" && im(A), null;
      }
      function F(A, W, U, le, Ue) {
        if (typeof le == "string" && le !== "" || typeof le == "number") {
          var _e = A.get(U) || null;
          return p(W, _e, "" + le, Ue);
        }
        if (typeof le == "object" && le !== null) {
          switch (le.$$typeof) {
            case un: {
              var at = A.get(le.key === null ? U : le.key) || null;
              return v(W, at, le, Ue);
            }
            case wa: {
              var dt = A.get(le.key === null ? U : le.key) || null;
              return w(W, dt, le, Ue);
            }
            case ut:
              var ir = le._payload, Ht = le._init;
              return F(A, W, U, Ht(ir), Ue);
          }
          if (vt(le) || br(le)) {
            var Kr = A.get(U) || null;
            return x(W, Kr, le, Ue, null);
          }
          om(W, le);
        }
        return typeof le == "function" && im(W), null;
      }
      function V(A, W, U) {
        {
          if (typeof A != "object" || A === null)
            return W;
          switch (A.$$typeof) {
            case un:
            case wa:
              V1(A, U);
              var le = A.key;
              if (typeof le != "string")
                break;
              if (W === null) {
                W = /* @__PURE__ */ new Set(), W.add(le);
                break;
              }
              if (!W.has(le)) {
                W.add(le);
                break;
              }
              g("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", le);
              break;
            case ut:
              var Ue = A._payload, _e = A._init;
              V(_e(Ue), W, U);
              break;
          }
        }
        return W;
      }
      function Q(A, W, U, le) {
        for (var Ue = null, _e = 0; _e < U.length; _e++) {
          var at = U[_e];
          Ue = V(at, Ue, A);
        }
        for (var dt = null, ir = null, Ht = W, Kr = 0, Bt = 0, $r = null; Ht !== null && Bt < U.length; Bt++) {
          Ht.index > Bt ? ($r = Ht, Ht = null) : $r = Ht.sibling;
          var pa = D(A, Ht, U[Bt], le);
          if (pa === null) {
            Ht === null && (Ht = $r);
            break;
          }
          e && Ht && pa.alternate === null && t(A, Ht), Kr = u(pa, Kr, Bt), ir === null ? dt = pa : ir.sibling = pa, ir = pa, Ht = $r;
        }
        if (Bt === U.length) {
          if (a(A, Ht), Fn()) {
            var Qn = Bt;
            ac(A, Qn);
          }
          return dt;
        }
        if (Ht === null) {
          for (; Bt < U.length; Bt++) {
            var fo = z(A, U[Bt], le);
            fo !== null && (Kr = u(fo, Kr, Bt), ir === null ? dt = fo : ir.sibling = fo, ir = fo);
          }
          if (Fn()) {
            var Da = Bt;
            ac(A, Da);
          }
          return dt;
        }
        for (var Oa = o(A, Ht); Bt < U.length; Bt++) {
          var va = F(Oa, A, Bt, U[Bt], le);
          va !== null && (e && va.alternate !== null && Oa.delete(va.key === null ? Bt : va.key), Kr = u(va, Kr, Bt), ir === null ? dt = va : ir.sibling = va, ir = va);
        }
        if (e && Oa.forEach(function(sf) {
          return t(A, sf);
        }), Fn()) {
          var Xl = Bt;
          ac(A, Xl);
        }
        return dt;
      }
      function ke(A, W, U, le) {
        var Ue = br(U);
        if (typeof Ue != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          U[Symbol.toStringTag] === "Generator" && (Ey || g("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), Ey = !0), U.entries === Ue && (ky || g("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), ky = !0);
          var _e = Ue.call(U);
          if (_e)
            for (var at = null, dt = _e.next(); !dt.done; dt = _e.next()) {
              var ir = dt.value;
              at = V(ir, at, A);
            }
        }
        var Ht = Ue.call(U);
        if (Ht == null)
          throw new Error("An iterable object provided no iterator.");
        for (var Kr = null, Bt = null, $r = W, pa = 0, Qn = 0, fo = null, Da = Ht.next(); $r !== null && !Da.done; Qn++, Da = Ht.next()) {
          $r.index > Qn ? (fo = $r, $r = null) : fo = $r.sibling;
          var Oa = D(A, $r, Da.value, le);
          if (Oa === null) {
            $r === null && ($r = fo);
            break;
          }
          e && $r && Oa.alternate === null && t(A, $r), pa = u(Oa, pa, Qn), Bt === null ? Kr = Oa : Bt.sibling = Oa, Bt = Oa, $r = fo;
        }
        if (Da.done) {
          if (a(A, $r), Fn()) {
            var va = Qn;
            ac(A, va);
          }
          return Kr;
        }
        if ($r === null) {
          for (; !Da.done; Qn++, Da = Ht.next()) {
            var Xl = z(A, Da.value, le);
            Xl !== null && (pa = u(Xl, pa, Qn), Bt === null ? Kr = Xl : Bt.sibling = Xl, Bt = Xl);
          }
          if (Fn()) {
            var sf = Qn;
            ac(A, sf);
          }
          return Kr;
        }
        for (var uv = o(A, $r); !Da.done; Qn++, Da = Ht.next()) {
          var Zi = F(uv, A, Qn, Da.value, le);
          Zi !== null && (e && Zi.alternate !== null && uv.delete(Zi.key === null ? Qn : Zi.key), pa = u(Zi, pa, Qn), Bt === null ? Kr = Zi : Bt.sibling = Zi, Bt = Zi);
        }
        if (e && uv.forEach(function(JT) {
          return t(A, JT);
        }), Fn()) {
          var KT = Qn;
          ac(A, KT);
        }
        return Kr;
      }
      function Ke(A, W, U, le) {
        if (W !== null && W.tag === H) {
          a(A, W.sibling);
          var Ue = l(W, U);
          return Ue.return = A, Ue;
        }
        a(A, W);
        var _e = S0(U, A.mode, le);
        return _e.return = A, _e;
      }
      function Ie(A, W, U, le) {
        for (var Ue = U.key, _e = W; _e !== null; ) {
          if (_e.key === Ue) {
            var at = U.type;
            if (at === Gn) {
              if (_e.tag === ue) {
                a(A, _e.sibling);
                var dt = l(_e, U.props.children);
                return dt.return = A, dt._debugSource = U._source, dt._debugOwner = U._owner, dt;
              }
            } else if (_e.elementType === at || // Keep this check inline so it only runs on the false path:
            qx(_e, U) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof at == "object" && at !== null && at.$$typeof === ut && Y1(at) === _e.type) {
              a(A, _e.sibling);
              var ir = l(_e, U.props);
              return ir.ref = zp(A, _e, U), ir.return = A, ir._debugSource = U._source, ir._debugOwner = U._owner, ir;
            }
            a(A, _e);
            break;
          } else
            t(A, _e);
          _e = _e.sibling;
        }
        if (U.type === Gn) {
          var Ht = Js(U.props.children, A.mode, le, U.key);
          return Ht.return = A, Ht;
        } else {
          var Kr = x0(U, A.mode, le);
          return Kr.ref = zp(A, W, U), Kr.return = A, Kr;
        }
      }
      function jt(A, W, U, le) {
        for (var Ue = U.key, _e = W; _e !== null; ) {
          if (_e.key === Ue)
            if (_e.tag === De && _e.stateNode.containerInfo === U.containerInfo && _e.stateNode.implementation === U.implementation) {
              a(A, _e.sibling);
              var at = l(_e, U.children || []);
              return at.return = A, at;
            } else {
              a(A, _e);
              break;
            }
          else
            t(A, _e);
          _e = _e.sibling;
        }
        var dt = k0(U, A.mode, le);
        return dt.return = A, dt;
      }
      function Ot(A, W, U, le) {
        var Ue = typeof U == "object" && U !== null && U.type === Gn && U.key === null;
        if (Ue && (U = U.props.children), typeof U == "object" && U !== null) {
          switch (U.$$typeof) {
            case un:
              return d(Ie(A, W, U, le));
            case wa:
              return d(jt(A, W, U, le));
            case ut:
              var _e = U._payload, at = U._init;
              return Ot(A, W, at(_e), le);
          }
          if (vt(U))
            return Q(A, W, U, le);
          if (br(U))
            return ke(A, W, U, le);
          om(A, U);
        }
        return typeof U == "string" && U !== "" || typeof U == "number" ? d(Ke(A, W, "" + U, le)) : (typeof U == "function" && im(A), a(A, W));
      }
      return Ot;
    }
    var Yd = I1(!0), $1 = I1(!1);
    function RE(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var a = t.child, o = gc(a, a.pendingProps);
        for (t.child = o, o.return = t; a.sibling !== null; )
          a = a.sibling, o = o.sibling = gc(a, a.pendingProps), o.return = t;
        o.sibling = null;
      }
    }
    function _E(e, t) {
      for (var a = e.child; a !== null; )
        hT(a, t), a = a.sibling;
    }
    var _y = Ps(null), Dy;
    Dy = {};
    var lm = null, Id = null, Oy = null, sm = !1;
    function um() {
      lm = null, Id = null, Oy = null, sm = !1;
    }
    function Q1() {
      sm = !0;
    }
    function W1() {
      sm = !1;
    }
    function X1(e, t, a) {
      da(_y, t._currentValue, e), t._currentValue = a, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== Dy && g("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = Dy;
    }
    function zy(e, t) {
      var a = _y.current;
      ca(_y, t), e._currentValue = a;
    }
    function Ly(e, t, a) {
      for (var o = e; o !== null; ) {
        var l = o.alternate;
        if (Tl(o.childLanes, t) ? l !== null && !Tl(l.childLanes, t) && (l.childLanes = ht(l.childLanes, t)) : (o.childLanes = ht(o.childLanes, t), l !== null && (l.childLanes = ht(l.childLanes, t))), o === a)
          break;
        o = o.return;
      }
      o !== a && g("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function DE(e, t, a) {
      OE(e, t, a);
    }
    function OE(e, t, a) {
      var o = e.child;
      for (o !== null && (o.return = e); o !== null; ) {
        var l = void 0, u = o.dependencies;
        if (u !== null) {
          l = o.child;
          for (var d = u.firstContext; d !== null; ) {
            if (d.context === t) {
              if (o.tag === I) {
                var p = an(a), v = Vl(Zt, p);
                v.tag = dm;
                var w = o.updateQueue;
                if (w !== null) {
                  var x = w.shared, z = x.pending;
                  z === null ? v.next = v : (v.next = z.next, z.next = v), x.pending = v;
                }
              }
              o.lanes = ht(o.lanes, a);
              var D = o.alternate;
              D !== null && (D.lanes = ht(D.lanes, a)), Ly(o.return, a, e), u.lanes = ht(u.lanes, a);
              break;
            }
            d = d.next;
          }
        } else if (o.tag === Pe)
          l = o.type === e.type ? null : o.child;
        else if (o.tag === Vt) {
          var F = o.return;
          if (F === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          F.lanes = ht(F.lanes, a);
          var V = F.alternate;
          V !== null && (V.lanes = ht(V.lanes, a)), Ly(F, a, e), l = o.sibling;
        } else
          l = o.child;
        if (l !== null)
          l.return = o;
        else
          for (l = o; l !== null; ) {
            if (l === e) {
              l = null;
              break;
            }
            var Q = l.sibling;
            if (Q !== null) {
              Q.return = l.return, l = Q;
              break;
            }
            l = l.return;
          }
        o = l;
      }
    }
    function $d(e, t) {
      lm = e, Id = null, Oy = null;
      var a = e.dependencies;
      if (a !== null) {
        var o = a.firstContext;
        o !== null && (la(a.lanes, t) && Qp(), a.firstContext = null);
      }
    }
    function ln(e) {
      sm && g("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (Oy !== e) {
        var a = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if (Id === null) {
          if (lm === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          Id = a, lm.dependencies = {
            lanes: q,
            firstContext: a
          };
        } else
          Id = Id.next = a;
      }
      return t;
    }
    var uc = null;
    function My(e) {
      uc === null ? uc = [e] : uc.push(e);
    }
    function zE() {
      if (uc !== null) {
        for (var e = 0; e < uc.length; e++) {
          var t = uc[e], a = t.interleaved;
          if (a !== null) {
            t.interleaved = null;
            var o = a.next, l = t.pending;
            if (l !== null) {
              var u = l.next;
              l.next = o, a.next = u;
            }
            t.pending = a;
          }
        }
        uc = null;
      }
    }
    function q1(e, t, a, o) {
      var l = t.interleaved;
      return l === null ? (a.next = a, My(t)) : (a.next = l.next, l.next = a), t.interleaved = a, cm(e, o);
    }
    function LE(e, t, a, o) {
      var l = t.interleaved;
      l === null ? (a.next = a, My(t)) : (a.next = l.next, l.next = a), t.interleaved = a;
    }
    function ME(e, t, a, o) {
      var l = t.interleaved;
      return l === null ? (a.next = a, My(t)) : (a.next = l.next, l.next = a), t.interleaved = a, cm(e, o);
    }
    function $a(e, t) {
      return cm(e, t);
    }
    var NE = cm;
    function cm(e, t) {
      e.lanes = ht(e.lanes, t);
      var a = e.alternate;
      a !== null && (a.lanes = ht(a.lanes, t)), a === null && (e.flags & (Rr | _r)) !== $e && $x(e);
      for (var o = e, l = e.return; l !== null; )
        l.childLanes = ht(l.childLanes, t), a = l.alternate, a !== null ? a.childLanes = ht(a.childLanes, t) : (l.flags & (Rr | _r)) !== $e && $x(e), o = l, l = l.return;
      if (o.tag === J) {
        var u = o.stateNode;
        return u;
      } else
        return null;
    }
    var G1 = 0, K1 = 1, dm = 2, Ny = 3, fm = !1, Ay, pm;
    Ay = !1, pm = null;
    function Uy(e) {
      var t = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: q
        },
        effects: null
      };
      e.updateQueue = t;
    }
    function J1(e, t) {
      var a = t.updateQueue, o = e.updateQueue;
      if (a === o) {
        var l = {
          baseState: o.baseState,
          firstBaseUpdate: o.firstBaseUpdate,
          lastBaseUpdate: o.lastBaseUpdate,
          shared: o.shared,
          effects: o.effects
        };
        t.updateQueue = l;
      }
    }
    function Vl(e, t) {
      var a = {
        eventTime: e,
        lane: t,
        tag: G1,
        payload: null,
        callback: null,
        next: null
      };
      return a;
    }
    function Vs(e, t, a) {
      var o = e.updateQueue;
      if (o === null)
        return null;
      var l = o.shared;
      if (pm === l && !Ay && (g("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), Ay = !0), L4()) {
        var u = l.pending;
        return u === null ? t.next = t : (t.next = u.next, u.next = t), l.pending = t, NE(e, a);
      } else
        return ME(e, l, t, a);
    }
    function vm(e, t, a) {
      var o = t.updateQueue;
      if (o !== null) {
        var l = o.shared;
        if ($f(a)) {
          var u = l.lanes;
          u = cd(u, e.pendingLanes);
          var d = ht(u, a);
          l.lanes = d, Fu(e, d);
        }
      }
    }
    function jy(e, t) {
      var a = e.updateQueue, o = e.alternate;
      if (o !== null) {
        var l = o.updateQueue;
        if (a === l) {
          var u = null, d = null, p = a.firstBaseUpdate;
          if (p !== null) {
            var v = p;
            do {
              var w = {
                eventTime: v.eventTime,
                lane: v.lane,
                tag: v.tag,
                payload: v.payload,
                callback: v.callback,
                next: null
              };
              d === null ? u = d = w : (d.next = w, d = w), v = v.next;
            } while (v !== null);
            d === null ? u = d = t : (d.next = t, d = t);
          } else
            u = d = t;
          a = {
            baseState: l.baseState,
            firstBaseUpdate: u,
            lastBaseUpdate: d,
            shared: l.shared,
            effects: l.effects
          }, e.updateQueue = a;
          return;
        }
      }
      var x = a.lastBaseUpdate;
      x === null ? a.firstBaseUpdate = t : x.next = t, a.lastBaseUpdate = t;
    }
    function AE(e, t, a, o, l, u) {
      switch (a.tag) {
        case K1: {
          var d = a.payload;
          if (typeof d == "function") {
            Q1();
            var p = d.call(u, o, l);
            {
              if (e.mode & pt) {
                Jt(!0);
                try {
                  d.call(u, o, l);
                } finally {
                  Jt(!1);
                }
              }
              W1();
            }
            return p;
          }
          return d;
        }
        case Ny:
          e.flags = e.flags & ~Rn | St;
        case G1: {
          var v = a.payload, w;
          if (typeof v == "function") {
            Q1(), w = v.call(u, o, l);
            {
              if (e.mode & pt) {
                Jt(!0);
                try {
                  v.call(u, o, l);
                } finally {
                  Jt(!1);
                }
              }
              W1();
            }
          } else
            w = v;
          return w == null ? o : ft({}, o, w);
        }
        case dm:
          return fm = !0, o;
      }
      return o;
    }
    function hm(e, t, a, o) {
      var l = e.updateQueue;
      fm = !1, pm = l.shared;
      var u = l.firstBaseUpdate, d = l.lastBaseUpdate, p = l.shared.pending;
      if (p !== null) {
        l.shared.pending = null;
        var v = p, w = v.next;
        v.next = null, d === null ? u = w : d.next = w, d = v;
        var x = e.alternate;
        if (x !== null) {
          var z = x.updateQueue, D = z.lastBaseUpdate;
          D !== d && (D === null ? z.firstBaseUpdate = w : D.next = w, z.lastBaseUpdate = v);
        }
      }
      if (u !== null) {
        var F = l.baseState, V = q, Q = null, ke = null, Ke = null, Ie = u;
        do {
          var jt = Ie.lane, Ot = Ie.eventTime;
          if (Tl(o, jt)) {
            if (Ke !== null) {
              var W = {
                eventTime: Ot,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Yr,
                tag: Ie.tag,
                payload: Ie.payload,
                callback: Ie.callback,
                next: null
              };
              Ke = Ke.next = W;
            }
            F = AE(e, l, Ie, F, t, a);
            var U = Ie.callback;
            if (U !== null && // If the update was already committed, we should not queue its
            // callback again.
            Ie.lane !== Yr) {
              e.flags |= cr;
              var le = l.effects;
              le === null ? l.effects = [Ie] : le.push(Ie);
            }
          } else {
            var A = {
              eventTime: Ot,
              lane: jt,
              tag: Ie.tag,
              payload: Ie.payload,
              callback: Ie.callback,
              next: null
            };
            Ke === null ? (ke = Ke = A, Q = F) : Ke = Ke.next = A, V = ht(V, jt);
          }
          if (Ie = Ie.next, Ie === null) {
            if (p = l.shared.pending, p === null)
              break;
            var Ue = p, _e = Ue.next;
            Ue.next = null, Ie = _e, l.lastBaseUpdate = Ue, l.shared.pending = null;
          }
        } while (!0);
        Ke === null && (Q = F), l.baseState = Q, l.firstBaseUpdate = ke, l.lastBaseUpdate = Ke;
        var at = l.shared.interleaved;
        if (at !== null) {
          var dt = at;
          do
            V = ht(V, dt.lane), dt = dt.next;
          while (dt !== at);
        } else u === null && (l.shared.lanes = q);
        av(V), e.lanes = V, e.memoizedState = F;
      }
      pm = null;
    }
    function UE(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function Z1() {
      fm = !1;
    }
    function mm() {
      return fm;
    }
    function eb(e, t, a) {
      var o = t.effects;
      if (t.effects = null, o !== null)
        for (var l = 0; l < o.length; l++) {
          var u = o[l], d = u.callback;
          d !== null && (u.callback = null, UE(d, a));
        }
    }
    var Lp = {}, Ys = Ps(Lp), Mp = Ps(Lp), gm = Ps(Lp);
    function ym(e) {
      if (e === Lp)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function tb() {
      var e = ym(gm.current);
      return e;
    }
    function Py(e, t) {
      da(gm, t, e), da(Mp, e, e), da(Ys, Lp, e);
      var a = ZS(t);
      ca(Ys, e), da(Ys, a, e);
    }
    function Qd(e) {
      ca(Ys, e), ca(Mp, e), ca(gm, e);
    }
    function Fy() {
      var e = ym(Ys.current);
      return e;
    }
    function rb(e) {
      ym(gm.current);
      var t = ym(Ys.current), a = ek(t, e.type);
      t !== a && (da(Mp, e, e), da(Ys, a, e));
    }
    function Hy(e) {
      Mp.current === e && (ca(Ys, e), ca(Mp, e));
    }
    var jE = 0, nb = 1, ab = 1, Np = 2, li = Ps(jE);
    function By(e, t) {
      return (e & t) !== 0;
    }
    function Wd(e) {
      return e & nb;
    }
    function Vy(e, t) {
      return e & nb | t;
    }
    function PE(e, t) {
      return e | t;
    }
    function Is(e, t) {
      da(li, t, e);
    }
    function Xd(e) {
      ca(li, e);
    }
    function FE(e, t) {
      var a = e.memoizedState;
      return a !== null ? a.dehydrated !== null : (e.memoizedProps, !0);
    }
    function wm(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === be) {
          var a = t.memoizedState;
          if (a !== null) {
            var o = a.dehydrated;
            if (o === null || x1(o) || iy(o))
              return t;
          }
        } else if (t.tag === zt && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        t.memoizedProps.revealOrder !== void 0) {
          var l = (t.flags & St) !== $e;
          if (l)
            return t;
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e)
          return null;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    var Qa = (
      /*   */
      0
    ), hn = (
      /* */
      1
    ), Qi = (
      /*  */
      2
    ), mn = (
      /*    */
      4
    ), Hn = (
      /*   */
      8
    ), Yy = [];
    function Iy() {
      for (var e = 0; e < Yy.length; e++) {
        var t = Yy[e];
        t._workInProgressVersionPrimary = null;
      }
      Yy.length = 0;
    }
    function HE(e, t) {
      var a = t._getVersion, o = a(t._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, o] : e.mutableSourceEagerHydrationData.push(t, o);
    }
    var Le = C.ReactCurrentDispatcher, Ap = C.ReactCurrentBatchConfig, $y, qd;
    $y = /* @__PURE__ */ new Set();
    var cc = q, or = null, gn = null, yn = null, bm = !1, Up = !1, jp = 0, BE = 0, VE = 25, K = null, Mo = null, $s = -1, Qy = !1;
    function Gt() {
      {
        var e = K;
        Mo === null ? Mo = [e] : Mo.push(e);
      }
    }
    function we() {
      {
        var e = K;
        Mo !== null && ($s++, Mo[$s] !== e && YE(e));
      }
    }
    function Gd(e) {
      e != null && !vt(e) && g("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", K, typeof e);
    }
    function YE(e) {
      {
        var t = lt(or);
        if (!$y.has(t) && ($y.add(t), Mo !== null)) {
          for (var a = "", o = 30, l = 0; l <= $s; l++) {
            for (var u = Mo[l], d = l === $s ? e : u, p = l + 1 + ". " + u; p.length < o; )
              p += " ";
            p += d + `
`, a += p;
          }
          g(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, a);
        }
      }
    }
    function fa() {
      throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    }
    function Wy(e, t) {
      if (Qy)
        return !1;
      if (t === null)
        return g("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", K), !1;
      e.length !== t.length && g(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, K, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!Re(e[a], t[a]))
          return !1;
      return !0;
    }
    function Kd(e, t, a, o, l, u) {
      cc = u, or = t, Mo = e !== null ? e._debugHookTypes : null, $s = -1, Qy = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = q, e !== null && e.memoizedState !== null ? Le.current = Tb : Mo !== null ? Le.current = Cb : Le.current = Eb;
      var d = a(o, l);
      if (Up) {
        var p = 0;
        do {
          if (Up = !1, jp = 0, p >= VE)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          p += 1, Qy = !1, gn = null, yn = null, t.updateQueue = null, $s = -1, Le.current = Rb, d = a(o, l);
        } while (Up);
      }
      Le.current = Mm, t._debugHookTypes = Mo;
      var v = gn !== null && gn.next !== null;
      if (cc = q, or = null, gn = null, yn = null, K = null, Mo = null, $s = -1, e !== null && (e.flags & Vr) !== (t.flags & Vr) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & Et) !== Qe && g("Internal React error: Expected static flag was missing. Please notify the React team."), bm = !1, v)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return d;
    }
    function Jd() {
      var e = jp !== 0;
      return jp = 0, e;
    }
    function ob(e, t, a) {
      t.updateQueue = e.updateQueue, (t.mode & ar) !== Qe ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = Pu(e.lanes, a);
    }
    function ib() {
      if (Le.current = Mm, bm) {
        for (var e = or.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        bm = !1;
      }
      cc = q, or = null, gn = null, yn = null, Mo = null, $s = -1, K = null, wb = !1, Up = !1, jp = 0;
    }
    function Wi() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return yn === null ? or.memoizedState = yn = e : yn = yn.next = e, yn;
    }
    function No() {
      var e;
      if (gn === null) {
        var t = or.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = gn.next;
      var a;
      if (yn === null ? a = or.memoizedState : a = yn.next, a !== null)
        yn = a, a = yn.next, gn = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        gn = e;
        var o = {
          memoizedState: gn.memoizedState,
          baseState: gn.baseState,
          baseQueue: gn.baseQueue,
          queue: gn.queue,
          next: null
        };
        yn === null ? or.memoizedState = yn = o : yn = yn.next = o;
      }
      return yn;
    }
    function lb() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function Xy(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function qy(e, t, a) {
      var o = Wi(), l;
      a !== void 0 ? l = a(t) : l = t, o.memoizedState = o.baseState = l;
      var u = {
        pending: null,
        interleaved: null,
        lanes: q,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: l
      };
      o.queue = u;
      var d = u.dispatch = WE.bind(null, or, u);
      return [o.memoizedState, d];
    }
    function Gy(e, t, a) {
      var o = No(), l = o.queue;
      if (l === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      l.lastRenderedReducer = e;
      var u = gn, d = u.baseQueue, p = l.pending;
      if (p !== null) {
        if (d !== null) {
          var v = d.next, w = p.next;
          d.next = w, p.next = v;
        }
        u.baseQueue !== d && g("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), u.baseQueue = d = p, l.pending = null;
      }
      if (d !== null) {
        var x = d.next, z = u.baseState, D = null, F = null, V = null, Q = x;
        do {
          var ke = Q.lane;
          if (Tl(cc, ke)) {
            if (V !== null) {
              var Ie = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Yr,
                action: Q.action,
                hasEagerState: Q.hasEagerState,
                eagerState: Q.eagerState,
                next: null
              };
              V = V.next = Ie;
            }
            if (Q.hasEagerState)
              z = Q.eagerState;
            else {
              var jt = Q.action;
              z = e(z, jt);
            }
          } else {
            var Ke = {
              lane: ke,
              action: Q.action,
              hasEagerState: Q.hasEagerState,
              eagerState: Q.eagerState,
              next: null
            };
            V === null ? (F = V = Ke, D = z) : V = V.next = Ke, or.lanes = ht(or.lanes, ke), av(ke);
          }
          Q = Q.next;
        } while (Q !== null && Q !== x);
        V === null ? D = z : V.next = F, Re(z, o.memoizedState) || Qp(), o.memoizedState = z, o.baseState = D, o.baseQueue = V, l.lastRenderedState = z;
      }
      var Ot = l.interleaved;
      if (Ot !== null) {
        var A = Ot;
        do {
          var W = A.lane;
          or.lanes = ht(or.lanes, W), av(W), A = A.next;
        } while (A !== Ot);
      } else d === null && (l.lanes = q);
      var U = l.dispatch;
      return [o.memoizedState, U];
    }
    function Ky(e, t, a) {
      var o = No(), l = o.queue;
      if (l === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      l.lastRenderedReducer = e;
      var u = l.dispatch, d = l.pending, p = o.memoizedState;
      if (d !== null) {
        l.pending = null;
        var v = d.next, w = v;
        do {
          var x = w.action;
          p = e(p, x), w = w.next;
        } while (w !== v);
        Re(p, o.memoizedState) || Qp(), o.memoizedState = p, o.baseQueue === null && (o.baseState = p), l.lastRenderedState = p;
      }
      return [p, u];
    }
    function n_(e, t, a) {
    }
    function a_(e, t, a) {
    }
    function Jy(e, t, a) {
      var o = or, l = Wi(), u, d = Fn();
      if (d) {
        if (a === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        u = a(), qd || u !== a() && (g("The result of getServerSnapshot should be cached to avoid an infinite loop"), qd = !0);
      } else {
        if (u = t(), !qd) {
          var p = t();
          Re(u, p) || (g("The result of getSnapshot should be cached to avoid an infinite loop"), qd = !0);
        }
        var v = Jm();
        if (v === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        ju(v, cc) || sb(o, t, u);
      }
      l.memoizedState = u;
      var w = {
        value: u,
        getSnapshot: t
      };
      return l.queue = w, Cm(cb.bind(null, o, w, e), [e]), o.flags |= ba, Pp(hn | Hn, ub.bind(null, o, w, u, t), void 0, null), u;
    }
    function xm(e, t, a) {
      var o = or, l = No(), u = t();
      if (!qd) {
        var d = t();
        Re(u, d) || (g("The result of getSnapshot should be cached to avoid an infinite loop"), qd = !0);
      }
      var p = l.memoizedState, v = !Re(p, u);
      v && (l.memoizedState = u, Qp());
      var w = l.queue;
      if (Hp(cb.bind(null, o, w, e), [e]), w.getSnapshot !== t || v || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      yn !== null && yn.memoizedState.tag & hn) {
        o.flags |= ba, Pp(hn | Hn, ub.bind(null, o, w, u, t), void 0, null);
        var x = Jm();
        if (x === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        ju(x, cc) || sb(o, t, u);
      }
      return u;
    }
    function sb(e, t, a) {
      e.flags |= Pc;
      var o = {
        getSnapshot: t,
        value: a
      }, l = or.updateQueue;
      if (l === null)
        l = lb(), or.updateQueue = l, l.stores = [o];
      else {
        var u = l.stores;
        u === null ? l.stores = [o] : u.push(o);
      }
    }
    function ub(e, t, a, o) {
      t.value = a, t.getSnapshot = o, db(t) && fb(e);
    }
    function cb(e, t, a) {
      var o = function() {
        db(t) && fb(e);
      };
      return a(o);
    }
    function db(e) {
      var t = e.getSnapshot, a = e.value;
      try {
        var o = t();
        return !Re(a, o);
      } catch {
        return !0;
      }
    }
    function fb(e) {
      var t = $a(e, rt);
      t !== null && Sn(t, e, rt, Zt);
    }
    function Sm(e) {
      var t = Wi();
      typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        interleaved: null,
        lanes: q,
        dispatch: null,
        lastRenderedReducer: Xy,
        lastRenderedState: e
      };
      t.queue = a;
      var o = a.dispatch = XE.bind(null, or, a);
      return [t.memoizedState, o];
    }
    function Zy(e) {
      return Gy(Xy);
    }
    function ew(e) {
      return Ky(Xy);
    }
    function Pp(e, t, a, o) {
      var l = {
        tag: e,
        create: t,
        destroy: a,
        deps: o,
        // Circular
        next: null
      }, u = or.updateQueue;
      if (u === null)
        u = lb(), or.updateQueue = u, u.lastEffect = l.next = l;
      else {
        var d = u.lastEffect;
        if (d === null)
          u.lastEffect = l.next = l;
        else {
          var p = d.next;
          d.next = l, l.next = p, u.lastEffect = l;
        }
      }
      return l;
    }
    function tw(e) {
      var t = Wi();
      {
        var a = {
          current: e
        };
        return t.memoizedState = a, a;
      }
    }
    function km(e) {
      var t = No();
      return t.memoizedState;
    }
    function Fp(e, t, a, o) {
      var l = Wi(), u = o === void 0 ? null : o;
      or.flags |= e, l.memoizedState = Pp(hn | t, a, void 0, u);
    }
    function Em(e, t, a, o) {
      var l = No(), u = o === void 0 ? null : o, d = void 0;
      if (gn !== null) {
        var p = gn.memoizedState;
        if (d = p.destroy, u !== null) {
          var v = p.deps;
          if (Wy(u, v)) {
            l.memoizedState = Pp(t, a, d, u);
            return;
          }
        }
      }
      or.flags |= e, l.memoizedState = Pp(hn | t, a, d, u);
    }
    function Cm(e, t) {
      return (or.mode & ar) !== Qe ? Fp(Ti | ba | Cf, Hn, e, t) : Fp(ba | Cf, Hn, e, t);
    }
    function Hp(e, t) {
      return Em(ba, Hn, e, t);
    }
    function rw(e, t) {
      return Fp(Rt, Qi, e, t);
    }
    function Tm(e, t) {
      return Em(Rt, Qi, e, t);
    }
    function nw(e, t) {
      var a = Rt;
      return a |= Ci, (or.mode & ar) !== Qe && (a |= An), Fp(a, mn, e, t);
    }
    function Rm(e, t) {
      return Em(Rt, mn, e, t);
    }
    function pb(e, t) {
      if (typeof t == "function") {
        var a = t, o = e();
        return a(o), function() {
          a(null);
        };
      } else if (t != null) {
        var l = t;
        l.hasOwnProperty("current") || g("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(l).join(", ") + "}");
        var u = e();
        return l.current = u, function() {
          l.current = null;
        };
      }
    }
    function aw(e, t, a) {
      typeof t != "function" && g("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var o = a != null ? a.concat([e]) : null, l = Rt;
      return l |= Ci, (or.mode & ar) !== Qe && (l |= An), Fp(l, mn, pb.bind(null, t, e), o);
    }
    function _m(e, t, a) {
      typeof t != "function" && g("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var o = a != null ? a.concat([e]) : null;
      return Em(Rt, mn, pb.bind(null, t, e), o);
    }
    function IE(e, t) {
    }
    var Dm = IE;
    function ow(e, t) {
      var a = Wi(), o = t === void 0 ? null : t;
      return a.memoizedState = [e, o], e;
    }
    function Om(e, t) {
      var a = No(), o = t === void 0 ? null : t, l = a.memoizedState;
      if (l !== null && o !== null) {
        var u = l[1];
        if (Wy(o, u))
          return l[0];
      }
      return a.memoizedState = [e, o], e;
    }
    function iw(e, t) {
      var a = Wi(), o = t === void 0 ? null : t, l = e();
      return a.memoizedState = [l, o], l;
    }
    function zm(e, t) {
      var a = No(), o = t === void 0 ? null : t, l = a.memoizedState;
      if (l !== null && o !== null) {
        var u = l[1];
        if (Wy(o, u))
          return l[0];
      }
      var d = e();
      return a.memoizedState = [d, o], d;
    }
    function lw(e) {
      var t = Wi();
      return t.memoizedState = e, e;
    }
    function vb(e) {
      var t = No(), a = gn, o = a.memoizedState;
      return mb(t, o, e);
    }
    function hb(e) {
      var t = No();
      if (gn === null)
        return t.memoizedState = e, e;
      var a = gn.memoizedState;
      return mb(t, a, e);
    }
    function mb(e, t, a) {
      var o = !If(cc);
      if (o) {
        if (!Re(a, t)) {
          var l = Qf();
          or.lanes = ht(or.lanes, l), av(l), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, Qp()), e.memoizedState = a, a;
    }
    function $E(e, t, a) {
      var o = Sa();
      Xr(Hu(o, Ha)), e(!0);
      var l = Ap.transition;
      Ap.transition = {};
      var u = Ap.transition;
      Ap.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), t();
      } finally {
        if (Xr(o), Ap.transition = l, l === null && u._updatedFibers) {
          var d = u._updatedFibers.size;
          d > 10 && Z("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), u._updatedFibers.clear();
        }
      }
    }
    function sw() {
      var e = Sm(!1), t = e[0], a = e[1], o = $E.bind(null, a), l = Wi();
      return l.memoizedState = o, [t, o];
    }
    function gb() {
      var e = Zy(), t = e[0], a = No(), o = a.memoizedState;
      return [t, o];
    }
    function yb() {
      var e = ew(), t = e[0], a = No(), o = a.memoizedState;
      return [t, o];
    }
    var wb = !1;
    function QE() {
      return wb;
    }
    function uw() {
      var e = Wi(), t = Jm(), a = t.identifierPrefix, o;
      if (Fn()) {
        var l = uE();
        o = ":" + a + "R" + l;
        var u = jp++;
        u > 0 && (o += "H" + u.toString(32)), o += ":";
      } else {
        var d = BE++;
        o = ":" + a + "r" + d.toString(32) + ":";
      }
      return e.memoizedState = o, o;
    }
    function Lm() {
      var e = No(), t = e.memoizedState;
      return t;
    }
    function WE(e, t, a) {
      typeof arguments[3] == "function" && g("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var o = Gs(e), l = {
        lane: o,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (bb(e))
        xb(t, l);
      else {
        var u = q1(e, t, l, o);
        if (u !== null) {
          var d = _a();
          Sn(u, e, o, d), Sb(u, t, o);
        }
      }
      kb(e, o);
    }
    function XE(e, t, a) {
      typeof arguments[3] == "function" && g("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var o = Gs(e), l = {
        lane: o,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (bb(e))
        xb(t, l);
      else {
        var u = e.alternate;
        if (e.lanes === q && (u === null || u.lanes === q)) {
          var d = t.lastRenderedReducer;
          if (d !== null) {
            var p;
            p = Le.current, Le.current = si;
            try {
              var v = t.lastRenderedState, w = d(v, a);
              if (l.hasEagerState = !0, l.eagerState = w, Re(w, v)) {
                LE(e, t, l, o);
                return;
              }
            } catch {
            } finally {
              Le.current = p;
            }
          }
        }
        var x = q1(e, t, l, o);
        if (x !== null) {
          var z = _a();
          Sn(x, e, o, z), Sb(x, t, o);
        }
      }
      kb(e, o);
    }
    function bb(e) {
      var t = e.alternate;
      return e === or || t !== null && t === or;
    }
    function xb(e, t) {
      Up = bm = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function Sb(e, t, a) {
      if ($f(a)) {
        var o = t.lanes;
        o = cd(o, e.pendingLanes);
        var l = ht(o, a);
        t.lanes = l, Fu(e, l);
      }
    }
    function kb(e, t, a) {
      Du(e, t);
    }
    var Mm = {
      readContext: ln,
      useCallback: fa,
      useContext: fa,
      useEffect: fa,
      useImperativeHandle: fa,
      useInsertionEffect: fa,
      useLayoutEffect: fa,
      useMemo: fa,
      useReducer: fa,
      useRef: fa,
      useState: fa,
      useDebugValue: fa,
      useDeferredValue: fa,
      useTransition: fa,
      useMutableSource: fa,
      useSyncExternalStore: fa,
      useId: fa,
      unstable_isNewReconciler: Ne
    }, Eb = null, Cb = null, Tb = null, Rb = null, Xi = null, si = null, Nm = null;
    {
      var cw = function() {
        g("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, ct = function() {
        g("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      Eb = {
        readContext: function(e) {
          return ln(e);
        },
        useCallback: function(e, t) {
          return K = "useCallback", Gt(), Gd(t), ow(e, t);
        },
        useContext: function(e) {
          return K = "useContext", Gt(), ln(e);
        },
        useEffect: function(e, t) {
          return K = "useEffect", Gt(), Gd(t), Cm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return K = "useImperativeHandle", Gt(), Gd(a), aw(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return K = "useInsertionEffect", Gt(), Gd(t), rw(e, t);
        },
        useLayoutEffect: function(e, t) {
          return K = "useLayoutEffect", Gt(), Gd(t), nw(e, t);
        },
        useMemo: function(e, t) {
          K = "useMemo", Gt(), Gd(t);
          var a = Le.current;
          Le.current = Xi;
          try {
            return iw(e, t);
          } finally {
            Le.current = a;
          }
        },
        useReducer: function(e, t, a) {
          K = "useReducer", Gt();
          var o = Le.current;
          Le.current = Xi;
          try {
            return qy(e, t, a);
          } finally {
            Le.current = o;
          }
        },
        useRef: function(e) {
          return K = "useRef", Gt(), tw(e);
        },
        useState: function(e) {
          K = "useState", Gt();
          var t = Le.current;
          Le.current = Xi;
          try {
            return Sm(e);
          } finally {
            Le.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return K = "useDebugValue", Gt(), void 0;
        },
        useDeferredValue: function(e) {
          return K = "useDeferredValue", Gt(), lw(e);
        },
        useTransition: function() {
          return K = "useTransition", Gt(), sw();
        },
        useMutableSource: function(e, t, a) {
          return K = "useMutableSource", Gt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return K = "useSyncExternalStore", Gt(), Jy(e, t, a);
        },
        useId: function() {
          return K = "useId", Gt(), uw();
        },
        unstable_isNewReconciler: Ne
      }, Cb = {
        readContext: function(e) {
          return ln(e);
        },
        useCallback: function(e, t) {
          return K = "useCallback", we(), ow(e, t);
        },
        useContext: function(e) {
          return K = "useContext", we(), ln(e);
        },
        useEffect: function(e, t) {
          return K = "useEffect", we(), Cm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return K = "useImperativeHandle", we(), aw(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return K = "useInsertionEffect", we(), rw(e, t);
        },
        useLayoutEffect: function(e, t) {
          return K = "useLayoutEffect", we(), nw(e, t);
        },
        useMemo: function(e, t) {
          K = "useMemo", we();
          var a = Le.current;
          Le.current = Xi;
          try {
            return iw(e, t);
          } finally {
            Le.current = a;
          }
        },
        useReducer: function(e, t, a) {
          K = "useReducer", we();
          var o = Le.current;
          Le.current = Xi;
          try {
            return qy(e, t, a);
          } finally {
            Le.current = o;
          }
        },
        useRef: function(e) {
          return K = "useRef", we(), tw(e);
        },
        useState: function(e) {
          K = "useState", we();
          var t = Le.current;
          Le.current = Xi;
          try {
            return Sm(e);
          } finally {
            Le.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return K = "useDebugValue", we(), void 0;
        },
        useDeferredValue: function(e) {
          return K = "useDeferredValue", we(), lw(e);
        },
        useTransition: function() {
          return K = "useTransition", we(), sw();
        },
        useMutableSource: function(e, t, a) {
          return K = "useMutableSource", we(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return K = "useSyncExternalStore", we(), Jy(e, t, a);
        },
        useId: function() {
          return K = "useId", we(), uw();
        },
        unstable_isNewReconciler: Ne
      }, Tb = {
        readContext: function(e) {
          return ln(e);
        },
        useCallback: function(e, t) {
          return K = "useCallback", we(), Om(e, t);
        },
        useContext: function(e) {
          return K = "useContext", we(), ln(e);
        },
        useEffect: function(e, t) {
          return K = "useEffect", we(), Hp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return K = "useImperativeHandle", we(), _m(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return K = "useInsertionEffect", we(), Tm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return K = "useLayoutEffect", we(), Rm(e, t);
        },
        useMemo: function(e, t) {
          K = "useMemo", we();
          var a = Le.current;
          Le.current = si;
          try {
            return zm(e, t);
          } finally {
            Le.current = a;
          }
        },
        useReducer: function(e, t, a) {
          K = "useReducer", we();
          var o = Le.current;
          Le.current = si;
          try {
            return Gy(e, t, a);
          } finally {
            Le.current = o;
          }
        },
        useRef: function(e) {
          return K = "useRef", we(), km();
        },
        useState: function(e) {
          K = "useState", we();
          var t = Le.current;
          Le.current = si;
          try {
            return Zy(e);
          } finally {
            Le.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return K = "useDebugValue", we(), Dm();
        },
        useDeferredValue: function(e) {
          return K = "useDeferredValue", we(), vb(e);
        },
        useTransition: function() {
          return K = "useTransition", we(), gb();
        },
        useMutableSource: function(e, t, a) {
          return K = "useMutableSource", we(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return K = "useSyncExternalStore", we(), xm(e, t);
        },
        useId: function() {
          return K = "useId", we(), Lm();
        },
        unstable_isNewReconciler: Ne
      }, Rb = {
        readContext: function(e) {
          return ln(e);
        },
        useCallback: function(e, t) {
          return K = "useCallback", we(), Om(e, t);
        },
        useContext: function(e) {
          return K = "useContext", we(), ln(e);
        },
        useEffect: function(e, t) {
          return K = "useEffect", we(), Hp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return K = "useImperativeHandle", we(), _m(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return K = "useInsertionEffect", we(), Tm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return K = "useLayoutEffect", we(), Rm(e, t);
        },
        useMemo: function(e, t) {
          K = "useMemo", we();
          var a = Le.current;
          Le.current = Nm;
          try {
            return zm(e, t);
          } finally {
            Le.current = a;
          }
        },
        useReducer: function(e, t, a) {
          K = "useReducer", we();
          var o = Le.current;
          Le.current = Nm;
          try {
            return Ky(e, t, a);
          } finally {
            Le.current = o;
          }
        },
        useRef: function(e) {
          return K = "useRef", we(), km();
        },
        useState: function(e) {
          K = "useState", we();
          var t = Le.current;
          Le.current = Nm;
          try {
            return ew(e);
          } finally {
            Le.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return K = "useDebugValue", we(), Dm();
        },
        useDeferredValue: function(e) {
          return K = "useDeferredValue", we(), hb(e);
        },
        useTransition: function() {
          return K = "useTransition", we(), yb();
        },
        useMutableSource: function(e, t, a) {
          return K = "useMutableSource", we(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return K = "useSyncExternalStore", we(), xm(e, t);
        },
        useId: function() {
          return K = "useId", we(), Lm();
        },
        unstable_isNewReconciler: Ne
      }, Xi = {
        readContext: function(e) {
          return cw(), ln(e);
        },
        useCallback: function(e, t) {
          return K = "useCallback", ct(), Gt(), ow(e, t);
        },
        useContext: function(e) {
          return K = "useContext", ct(), Gt(), ln(e);
        },
        useEffect: function(e, t) {
          return K = "useEffect", ct(), Gt(), Cm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return K = "useImperativeHandle", ct(), Gt(), aw(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return K = "useInsertionEffect", ct(), Gt(), rw(e, t);
        },
        useLayoutEffect: function(e, t) {
          return K = "useLayoutEffect", ct(), Gt(), nw(e, t);
        },
        useMemo: function(e, t) {
          K = "useMemo", ct(), Gt();
          var a = Le.current;
          Le.current = Xi;
          try {
            return iw(e, t);
          } finally {
            Le.current = a;
          }
        },
        useReducer: function(e, t, a) {
          K = "useReducer", ct(), Gt();
          var o = Le.current;
          Le.current = Xi;
          try {
            return qy(e, t, a);
          } finally {
            Le.current = o;
          }
        },
        useRef: function(e) {
          return K = "useRef", ct(), Gt(), tw(e);
        },
        useState: function(e) {
          K = "useState", ct(), Gt();
          var t = Le.current;
          Le.current = Xi;
          try {
            return Sm(e);
          } finally {
            Le.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return K = "useDebugValue", ct(), Gt(), void 0;
        },
        useDeferredValue: function(e) {
          return K = "useDeferredValue", ct(), Gt(), lw(e);
        },
        useTransition: function() {
          return K = "useTransition", ct(), Gt(), sw();
        },
        useMutableSource: function(e, t, a) {
          return K = "useMutableSource", ct(), Gt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return K = "useSyncExternalStore", ct(), Gt(), Jy(e, t, a);
        },
        useId: function() {
          return K = "useId", ct(), Gt(), uw();
        },
        unstable_isNewReconciler: Ne
      }, si = {
        readContext: function(e) {
          return cw(), ln(e);
        },
        useCallback: function(e, t) {
          return K = "useCallback", ct(), we(), Om(e, t);
        },
        useContext: function(e) {
          return K = "useContext", ct(), we(), ln(e);
        },
        useEffect: function(e, t) {
          return K = "useEffect", ct(), we(), Hp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return K = "useImperativeHandle", ct(), we(), _m(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return K = "useInsertionEffect", ct(), we(), Tm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return K = "useLayoutEffect", ct(), we(), Rm(e, t);
        },
        useMemo: function(e, t) {
          K = "useMemo", ct(), we();
          var a = Le.current;
          Le.current = si;
          try {
            return zm(e, t);
          } finally {
            Le.current = a;
          }
        },
        useReducer: function(e, t, a) {
          K = "useReducer", ct(), we();
          var o = Le.current;
          Le.current = si;
          try {
            return Gy(e, t, a);
          } finally {
            Le.current = o;
          }
        },
        useRef: function(e) {
          return K = "useRef", ct(), we(), km();
        },
        useState: function(e) {
          K = "useState", ct(), we();
          var t = Le.current;
          Le.current = si;
          try {
            return Zy(e);
          } finally {
            Le.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return K = "useDebugValue", ct(), we(), Dm();
        },
        useDeferredValue: function(e) {
          return K = "useDeferredValue", ct(), we(), vb(e);
        },
        useTransition: function() {
          return K = "useTransition", ct(), we(), gb();
        },
        useMutableSource: function(e, t, a) {
          return K = "useMutableSource", ct(), we(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return K = "useSyncExternalStore", ct(), we(), xm(e, t);
        },
        useId: function() {
          return K = "useId", ct(), we(), Lm();
        },
        unstable_isNewReconciler: Ne
      }, Nm = {
        readContext: function(e) {
          return cw(), ln(e);
        },
        useCallback: function(e, t) {
          return K = "useCallback", ct(), we(), Om(e, t);
        },
        useContext: function(e) {
          return K = "useContext", ct(), we(), ln(e);
        },
        useEffect: function(e, t) {
          return K = "useEffect", ct(), we(), Hp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return K = "useImperativeHandle", ct(), we(), _m(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return K = "useInsertionEffect", ct(), we(), Tm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return K = "useLayoutEffect", ct(), we(), Rm(e, t);
        },
        useMemo: function(e, t) {
          K = "useMemo", ct(), we();
          var a = Le.current;
          Le.current = si;
          try {
            return zm(e, t);
          } finally {
            Le.current = a;
          }
        },
        useReducer: function(e, t, a) {
          K = "useReducer", ct(), we();
          var o = Le.current;
          Le.current = si;
          try {
            return Ky(e, t, a);
          } finally {
            Le.current = o;
          }
        },
        useRef: function(e) {
          return K = "useRef", ct(), we(), km();
        },
        useState: function(e) {
          K = "useState", ct(), we();
          var t = Le.current;
          Le.current = si;
          try {
            return ew(e);
          } finally {
            Le.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return K = "useDebugValue", ct(), we(), Dm();
        },
        useDeferredValue: function(e) {
          return K = "useDeferredValue", ct(), we(), hb(e);
        },
        useTransition: function() {
          return K = "useTransition", ct(), we(), yb();
        },
        useMutableSource: function(e, t, a) {
          return K = "useMutableSource", ct(), we(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return K = "useSyncExternalStore", ct(), we(), xm(e, t);
        },
        useId: function() {
          return K = "useId", ct(), we(), Lm();
        },
        unstable_isNewReconciler: Ne
      };
    }
    var Qs = b.unstable_now, _b = 0, Am = -1, Bp = -1, Um = -1, dw = !1, jm = !1;
    function Db() {
      return dw;
    }
    function qE() {
      jm = !0;
    }
    function GE() {
      dw = !1, jm = !1;
    }
    function KE() {
      dw = jm, jm = !1;
    }
    function Ob() {
      return _b;
    }
    function zb() {
      _b = Qs();
    }
    function fw(e) {
      Bp = Qs(), e.actualStartTime < 0 && (e.actualStartTime = Qs());
    }
    function Lb(e) {
      Bp = -1;
    }
    function Pm(e, t) {
      if (Bp >= 0) {
        var a = Qs() - Bp;
        e.actualDuration += a, t && (e.selfBaseDuration = a), Bp = -1;
      }
    }
    function qi(e) {
      if (Am >= 0) {
        var t = Qs() - Am;
        Am = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case J:
              var o = a.stateNode;
              o.effectDuration += t;
              return;
            case G:
              var l = a.stateNode;
              l.effectDuration += t;
              return;
          }
          a = a.return;
        }
      }
    }
    function pw(e) {
      if (Um >= 0) {
        var t = Qs() - Um;
        Um = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case J:
              var o = a.stateNode;
              o !== null && (o.passiveEffectDuration += t);
              return;
            case G:
              var l = a.stateNode;
              l !== null && (l.passiveEffectDuration += t);
              return;
          }
          a = a.return;
        }
      }
    }
    function Gi() {
      Am = Qs();
    }
    function vw() {
      Um = Qs();
    }
    function hw(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function ui(e, t) {
      if (e && e.defaultProps) {
        var a = ft({}, t), o = e.defaultProps;
        for (var l in o)
          a[l] === void 0 && (a[l] = o[l]);
        return a;
      }
      return t;
    }
    var mw = {}, gw, yw, ww, bw, xw, Mb, Fm, Sw, kw, Ew, Vp;
    {
      gw = /* @__PURE__ */ new Set(), yw = /* @__PURE__ */ new Set(), ww = /* @__PURE__ */ new Set(), bw = /* @__PURE__ */ new Set(), Sw = /* @__PURE__ */ new Set(), xw = /* @__PURE__ */ new Set(), kw = /* @__PURE__ */ new Set(), Ew = /* @__PURE__ */ new Set(), Vp = /* @__PURE__ */ new Set();
      var Nb = /* @__PURE__ */ new Set();
      Fm = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var a = t + "_" + e;
          Nb.has(a) || (Nb.add(a), g("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, Mb = function(e, t) {
        if (t === void 0) {
          var a = At(e) || "Component";
          xw.has(a) || (xw.add(a), g("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", a));
        }
      }, Object.defineProperty(mw, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(mw);
    }
    function Cw(e, t, a, o) {
      var l = e.memoizedState, u = a(o, l);
      {
        if (e.mode & pt) {
          Jt(!0);
          try {
            u = a(o, l);
          } finally {
            Jt(!1);
          }
        }
        Mb(t, u);
      }
      var d = u == null ? l : ft({}, l, u);
      if (e.memoizedState = d, e.lanes === q) {
        var p = e.updateQueue;
        p.baseState = d;
      }
    }
    var Tw = {
      isMounted: Tf,
      enqueueSetState: function(e, t, a) {
        var o = hs(e), l = _a(), u = Gs(o), d = Vl(l, u);
        d.payload = t, a != null && (Fm(a, "setState"), d.callback = a);
        var p = Vs(o, d, u);
        p !== null && (Sn(p, o, u, l), vm(p, o, u)), Du(o, u);
      },
      enqueueReplaceState: function(e, t, a) {
        var o = hs(e), l = _a(), u = Gs(o), d = Vl(l, u);
        d.tag = K1, d.payload = t, a != null && (Fm(a, "replaceState"), d.callback = a);
        var p = Vs(o, d, u);
        p !== null && (Sn(p, o, u, l), vm(p, o, u)), Du(o, u);
      },
      enqueueForceUpdate: function(e, t) {
        var a = hs(e), o = _a(), l = Gs(a), u = Vl(o, l);
        u.tag = dm, t != null && (Fm(t, "forceUpdate"), u.callback = t);
        var d = Vs(a, u, l);
        d !== null && (Sn(d, a, l, o), vm(d, a, l)), Hf(a, l);
      }
    };
    function Ab(e, t, a, o, l, u, d) {
      var p = e.stateNode;
      if (typeof p.shouldComponentUpdate == "function") {
        var v = p.shouldComponentUpdate(o, u, d);
        {
          if (e.mode & pt) {
            Jt(!0);
            try {
              v = p.shouldComponentUpdate(o, u, d);
            } finally {
              Jt(!1);
            }
          }
          v === void 0 && g("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", At(t) || "Component");
        }
        return v;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !Xe(a, o) || !Xe(l, u) : !0;
    }
    function JE(e, t, a) {
      var o = e.stateNode;
      {
        var l = At(t) || "Component", u = o.render;
        u || (t.prototype && typeof t.prototype.render == "function" ? g("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", l) : g("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", l)), o.getInitialState && !o.getInitialState.isReactClassApproved && !o.state && g("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", l), o.getDefaultProps && !o.getDefaultProps.isReactClassApproved && g("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", l), o.propTypes && g("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", l), o.contextType && g("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", l), t.childContextTypes && !Vp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & pt) === Qe && (Vp.add(t), g(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, l)), t.contextTypes && !Vp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & pt) === Qe && (Vp.add(t), g(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, l)), o.contextTypes && g("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", l), t.contextType && t.contextTypes && !kw.has(t) && (kw.add(t), g("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", l)), typeof o.componentShouldUpdate == "function" && g("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", l), t.prototype && t.prototype.isPureReactComponent && typeof o.shouldComponentUpdate < "u" && g("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", At(t) || "A pure component"), typeof o.componentDidUnmount == "function" && g("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", l), typeof o.componentDidReceiveProps == "function" && g("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", l), typeof o.componentWillRecieveProps == "function" && g("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", l), typeof o.UNSAFE_componentWillRecieveProps == "function" && g("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", l);
        var d = o.props !== a;
        o.props !== void 0 && d && g("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", l, l), o.defaultProps && g("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", l, l), typeof o.getSnapshotBeforeUpdate == "function" && typeof o.componentDidUpdate != "function" && !ww.has(t) && (ww.add(t), g("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", At(t))), typeof o.getDerivedStateFromProps == "function" && g("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", l), typeof o.getDerivedStateFromError == "function" && g("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", l), typeof t.getSnapshotBeforeUpdate == "function" && g("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", l);
        var p = o.state;
        p && (typeof p != "object" || vt(p)) && g("%s.state: must be set to an object or null", l), typeof o.getChildContext == "function" && typeof t.childContextTypes != "object" && g("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", l);
      }
    }
    function Ub(e, t) {
      t.updater = Tw, e.stateNode = t, Su(t, e), t._reactInternalInstance = mw;
    }
    function jb(e, t, a) {
      var o = !1, l = uo, u = uo, d = t.contextType;
      if ("contextType" in t) {
        var p = (
          // Allow null for conditional declaration
          d === null || d !== void 0 && d.$$typeof === R && d._context === void 0
        );
        if (!p && !Ew.has(t)) {
          Ew.add(t);
          var v = "";
          d === void 0 ? v = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof d != "object" ? v = " However, it is set to a " + typeof d + "." : d.$$typeof === Vo ? v = " Did you accidentally pass the Context.Provider instead?" : d._context !== void 0 ? v = " Did you accidentally pass the Context.Consumer instead?" : v = " However, it is set to an object with keys {" + Object.keys(d).join(", ") + "}.", g("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", At(t) || "Component", v);
        }
      }
      if (typeof d == "object" && d !== null)
        u = ln(d);
      else {
        l = Pd(e, t, !0);
        var w = t.contextTypes;
        o = w != null, u = o ? Fd(e, l) : uo;
      }
      var x = new t(a, u);
      if (e.mode & pt) {
        Jt(!0);
        try {
          x = new t(a, u);
        } finally {
          Jt(!1);
        }
      }
      var z = e.memoizedState = x.state !== null && x.state !== void 0 ? x.state : null;
      Ub(e, x);
      {
        if (typeof t.getDerivedStateFromProps == "function" && z === null) {
          var D = At(t) || "Component";
          yw.has(D) || (yw.add(D), g("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", D, x.state === null ? "null" : "undefined", D));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof x.getSnapshotBeforeUpdate == "function") {
          var F = null, V = null, Q = null;
          if (typeof x.componentWillMount == "function" && x.componentWillMount.__suppressDeprecationWarning !== !0 ? F = "componentWillMount" : typeof x.UNSAFE_componentWillMount == "function" && (F = "UNSAFE_componentWillMount"), typeof x.componentWillReceiveProps == "function" && x.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? V = "componentWillReceiveProps" : typeof x.UNSAFE_componentWillReceiveProps == "function" && (V = "UNSAFE_componentWillReceiveProps"), typeof x.componentWillUpdate == "function" && x.componentWillUpdate.__suppressDeprecationWarning !== !0 ? Q = "componentWillUpdate" : typeof x.UNSAFE_componentWillUpdate == "function" && (Q = "UNSAFE_componentWillUpdate"), F !== null || V !== null || Q !== null) {
            var ke = At(t) || "Component", Ke = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            bw.has(ke) || (bw.add(ke), g(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, ke, Ke, F !== null ? `
  ` + F : "", V !== null ? `
  ` + V : "", Q !== null ? `
  ` + Q : ""));
          }
        }
      }
      return o && T1(e, l, u), x;
    }
    function ZE(e, t) {
      var a = t.state;
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), a !== t.state && (g("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", lt(e) || "Component"), Tw.enqueueReplaceState(t, t.state, null));
    }
    function Pb(e, t, a, o) {
      var l = t.state;
      if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, o), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, o), t.state !== l) {
        {
          var u = lt(e) || "Component";
          gw.has(u) || (gw.add(u), g("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", u));
        }
        Tw.enqueueReplaceState(t, t.state, null);
      }
    }
    function Rw(e, t, a, o) {
      JE(e, t, a);
      var l = e.stateNode;
      l.props = a, l.state = e.memoizedState, l.refs = {}, Uy(e);
      var u = t.contextType;
      if (typeof u == "object" && u !== null)
        l.context = ln(u);
      else {
        var d = Pd(e, t, !0);
        l.context = Fd(e, d);
      }
      {
        if (l.state === a) {
          var p = At(t) || "Component";
          Sw.has(p) || (Sw.add(p), g("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", p));
        }
        e.mode & pt && ii.recordLegacyContextWarning(e, l), ii.recordUnsafeLifecycleWarnings(e, l);
      }
      l.state = e.memoizedState;
      var v = t.getDerivedStateFromProps;
      if (typeof v == "function" && (Cw(e, t, v, a), l.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof l.getSnapshotBeforeUpdate != "function" && (typeof l.UNSAFE_componentWillMount == "function" || typeof l.componentWillMount == "function") && (ZE(e, l), hm(e, a, l, o), l.state = e.memoizedState), typeof l.componentDidMount == "function") {
        var w = Rt;
        w |= Ci, (e.mode & ar) !== Qe && (w |= An), e.flags |= w;
      }
    }
    function eC(e, t, a, o) {
      var l = e.stateNode, u = e.memoizedProps;
      l.props = u;
      var d = l.context, p = t.contextType, v = uo;
      if (typeof p == "object" && p !== null)
        v = ln(p);
      else {
        var w = Pd(e, t, !0);
        v = Fd(e, w);
      }
      var x = t.getDerivedStateFromProps, z = typeof x == "function" || typeof l.getSnapshotBeforeUpdate == "function";
      !z && (typeof l.UNSAFE_componentWillReceiveProps == "function" || typeof l.componentWillReceiveProps == "function") && (u !== a || d !== v) && Pb(e, l, a, v), Z1();
      var D = e.memoizedState, F = l.state = D;
      if (hm(e, a, l, o), F = e.memoizedState, u === a && D === F && !Gh() && !mm()) {
        if (typeof l.componentDidMount == "function") {
          var V = Rt;
          V |= Ci, (e.mode & ar) !== Qe && (V |= An), e.flags |= V;
        }
        return !1;
      }
      typeof x == "function" && (Cw(e, t, x, a), F = e.memoizedState);
      var Q = mm() || Ab(e, t, u, a, D, F, v);
      if (Q) {
        if (!z && (typeof l.UNSAFE_componentWillMount == "function" || typeof l.componentWillMount == "function") && (typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount()), typeof l.componentDidMount == "function") {
          var ke = Rt;
          ke |= Ci, (e.mode & ar) !== Qe && (ke |= An), e.flags |= ke;
        }
      } else {
        if (typeof l.componentDidMount == "function") {
          var Ke = Rt;
          Ke |= Ci, (e.mode & ar) !== Qe && (Ke |= An), e.flags |= Ke;
        }
        e.memoizedProps = a, e.memoizedState = F;
      }
      return l.props = a, l.state = F, l.context = v, Q;
    }
    function tC(e, t, a, o, l) {
      var u = t.stateNode;
      J1(e, t);
      var d = t.memoizedProps, p = t.type === t.elementType ? d : ui(t.type, d);
      u.props = p;
      var v = t.pendingProps, w = u.context, x = a.contextType, z = uo;
      if (typeof x == "object" && x !== null)
        z = ln(x);
      else {
        var D = Pd(t, a, !0);
        z = Fd(t, D);
      }
      var F = a.getDerivedStateFromProps, V = typeof F == "function" || typeof u.getSnapshotBeforeUpdate == "function";
      !V && (typeof u.UNSAFE_componentWillReceiveProps == "function" || typeof u.componentWillReceiveProps == "function") && (d !== v || w !== z) && Pb(t, u, o, z), Z1();
      var Q = t.memoizedState, ke = u.state = Q;
      if (hm(t, o, u, l), ke = t.memoizedState, d === v && Q === ke && !Gh() && !mm() && !ye)
        return typeof u.componentDidUpdate == "function" && (d !== e.memoizedProps || Q !== e.memoizedState) && (t.flags |= Rt), typeof u.getSnapshotBeforeUpdate == "function" && (d !== e.memoizedProps || Q !== e.memoizedState) && (t.flags |= Pa), !1;
      typeof F == "function" && (Cw(t, a, F, o), ke = t.memoizedState);
      var Ke = mm() || Ab(t, a, p, o, Q, ke, z) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      ye;
      return Ke ? (!V && (typeof u.UNSAFE_componentWillUpdate == "function" || typeof u.componentWillUpdate == "function") && (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(o, ke, z), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(o, ke, z)), typeof u.componentDidUpdate == "function" && (t.flags |= Rt), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= Pa)) : (typeof u.componentDidUpdate == "function" && (d !== e.memoizedProps || Q !== e.memoizedState) && (t.flags |= Rt), typeof u.getSnapshotBeforeUpdate == "function" && (d !== e.memoizedProps || Q !== e.memoizedState) && (t.flags |= Pa), t.memoizedProps = o, t.memoizedState = ke), u.props = o, u.state = ke, u.context = z, Ke;
    }
    function dc(e, t) {
      return {
        value: e,
        source: t,
        stack: Nt(t),
        digest: null
      };
    }
    function _w(e, t, a) {
      return {
        value: e,
        source: null,
        stack: a ?? null,
        digest: t ?? null
      };
    }
    function rC(e, t) {
      return !0;
    }
    function Dw(e, t) {
      try {
        var a = rC(e, t);
        if (a === !1)
          return;
        var o = t.value, l = t.source, u = t.stack, d = u !== null ? u : "";
        if (o != null && o._suppressLogging) {
          if (e.tag === I)
            return;
          console.error(o);
        }
        var p = l ? lt(l) : null, v = p ? "The above error occurred in the <" + p + "> component:" : "The above error occurred in one of your React components:", w;
        if (e.tag === J)
          w = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var x = lt(e) || "Anonymous";
          w = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + x + ".");
        }
        var z = v + `
` + d + `

` + ("" + w);
        console.error(z);
      } catch (D) {
        setTimeout(function() {
          throw D;
        });
      }
    }
    var nC = typeof WeakMap == "function" ? WeakMap : Map;
    function Fb(e, t, a) {
      var o = Vl(Zt, a);
      o.tag = Ny, o.payload = {
        element: null
      };
      var l = t.value;
      return o.callback = function() {
        q4(l), Dw(e, t);
      }, o;
    }
    function Ow(e, t, a) {
      var o = Vl(Zt, a);
      o.tag = Ny;
      var l = e.type.getDerivedStateFromError;
      if (typeof l == "function") {
        var u = t.value;
        o.payload = function() {
          return l(u);
        }, o.callback = function() {
          Gx(e), Dw(e, t);
        };
      }
      var d = e.stateNode;
      return d !== null && typeof d.componentDidCatch == "function" && (o.callback = function() {
        Gx(e), Dw(e, t), typeof l != "function" && W4(this);
        var v = t.value, w = t.stack;
        this.componentDidCatch(v, {
          componentStack: w !== null ? w : ""
        }), typeof l != "function" && (la(e.lanes, rt) || g("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", lt(e) || "Unknown"));
      }), o;
    }
    function Hb(e, t, a) {
      var o = e.pingCache, l;
      if (o === null ? (o = e.pingCache = new nC(), l = /* @__PURE__ */ new Set(), o.set(t, l)) : (l = o.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), o.set(t, l))), !l.has(a)) {
        l.add(a);
        var u = G4.bind(null, e, t, a);
        _n && ov(e, a), t.then(u, u);
      }
    }
    function aC(e, t, a, o) {
      var l = e.updateQueue;
      if (l === null) {
        var u = /* @__PURE__ */ new Set();
        u.add(a), e.updateQueue = u;
      } else
        l.add(a);
    }
    function oC(e, t) {
      var a = e.tag;
      if ((e.mode & Et) === Qe && (a === ee || a === Me || a === qe)) {
        var o = e.alternate;
        o ? (e.updateQueue = o.updateQueue, e.memoizedState = o.memoizedState, e.lanes = o.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function Bb(e) {
      var t = e;
      do {
        if (t.tag === be && FE(t))
          return t;
        t = t.return;
      } while (t !== null);
      return null;
    }
    function Vb(e, t, a, o, l) {
      if ((e.mode & Et) === Qe) {
        if (e === t)
          e.flags |= Rn;
        else {
          if (e.flags |= St, a.flags |= ao, a.flags &= -52805, a.tag === I) {
            var u = a.alternate;
            if (u === null)
              a.tag = Ct;
            else {
              var d = Vl(Zt, rt);
              d.tag = dm, Vs(a, d, rt);
            }
          }
          a.lanes = ht(a.lanes, rt);
        }
        return e;
      }
      return e.flags |= Rn, e.lanes = l, e;
    }
    function iC(e, t, a, o, l) {
      if (a.flags |= gl, _n && ov(e, l), o !== null && typeof o == "object" && typeof o.then == "function") {
        var u = o;
        oC(a), Fn() && a.mode & Et && M1();
        var d = Bb(t);
        if (d !== null) {
          d.flags &= ~xr, Vb(d, t, a, e, l), d.mode & Et && Hb(e, u, l), aC(d, e, u);
          return;
        } else {
          if (!Yf(l)) {
            Hb(e, u, l), u0();
            return;
          }
          var p = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          o = p;
        }
      } else if (Fn() && a.mode & Et) {
        M1();
        var v = Bb(t);
        if (v !== null) {
          (v.flags & Rn) === $e && (v.flags |= xr), Vb(v, t, a, e, l), Sy(dc(o, a));
          return;
        }
      }
      o = dc(o, a), F4(o);
      var w = t;
      do {
        switch (w.tag) {
          case J: {
            var x = o;
            w.flags |= Rn;
            var z = an(l);
            w.lanes = ht(w.lanes, z);
            var D = Fb(w, x, z);
            jy(w, D);
            return;
          }
          case I:
            var F = o, V = w.type, Q = w.stateNode;
            if ((w.flags & St) === $e && (typeof V.getDerivedStateFromError == "function" || Q !== null && typeof Q.componentDidCatch == "function" && !Bx(Q))) {
              w.flags |= Rn;
              var ke = an(l);
              w.lanes = ht(w.lanes, ke);
              var Ke = Ow(w, F, ke);
              jy(w, Ke);
              return;
            }
            break;
        }
        w = w.return;
      } while (w !== null);
    }
    function lC() {
      return null;
    }
    var Yp = C.ReactCurrentOwner, ci = !1, zw, Ip, Lw, Mw, Nw, fc, Aw, Hm, $p;
    zw = {}, Ip = {}, Lw = {}, Mw = {}, Nw = {}, fc = !1, Aw = {}, Hm = {}, $p = {};
    function Ta(e, t, a, o) {
      e === null ? t.child = $1(t, null, a, o) : t.child = Yd(t, e.child, a, o);
    }
    function sC(e, t, a, o) {
      t.child = Yd(t, e.child, null, o), t.child = Yd(t, null, a, o);
    }
    function Yb(e, t, a, o, l) {
      if (t.type !== t.elementType) {
        var u = a.propTypes;
        u && ai(
          u,
          o,
          // Resolved props
          "prop",
          At(a)
        );
      }
      var d = a.render, p = t.ref, v, w;
      $d(t, l), Fa(t);
      {
        if (Yp.current = t, Ma(!0), v = Kd(e, t, d, o, p, l), w = Jd(), t.mode & pt) {
          Jt(!0);
          try {
            v = Kd(e, t, d, o, p, l), w = Jd();
          } finally {
            Jt(!1);
          }
        }
        Ma(!1);
      }
      return Oi(), e !== null && !ci ? (ob(e, t, l), Yl(e, t, l)) : (Fn() && w && my(t), t.flags |= Zo, Ta(e, t, v, l), t.child);
    }
    function Ib(e, t, a, o, l) {
      if (e === null) {
        var u = a.type;
        if (pT(u) && a.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        a.defaultProps === void 0) {
          var d = u;
          return d = lf(u), t.tag = qe, t.type = d, Pw(t, u), $b(e, t, d, o, l);
        }
        {
          var p = u.propTypes;
          if (p && ai(
            p,
            o,
            // Resolved props
            "prop",
            At(u)
          ), a.defaultProps !== void 0) {
            var v = At(u) || "Unknown";
            $p[v] || (g("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", v), $p[v] = !0);
          }
        }
        var w = b0(a.type, null, o, t, t.mode, l);
        return w.ref = t.ref, w.return = t, t.child = w, w;
      }
      {
        var x = a.type, z = x.propTypes;
        z && ai(
          z,
          o,
          // Resolved props
          "prop",
          At(x)
        );
      }
      var D = e.child, F = Iw(e, l);
      if (!F) {
        var V = D.memoizedProps, Q = a.compare;
        if (Q = Q !== null ? Q : Xe, Q(V, o) && e.ref === t.ref)
          return Yl(e, t, l);
      }
      t.flags |= Zo;
      var ke = gc(D, o);
      return ke.ref = t.ref, ke.return = t, t.child = ke, ke;
    }
    function $b(e, t, a, o, l) {
      if (t.type !== t.elementType) {
        var u = t.elementType;
        if (u.$$typeof === ut) {
          var d = u, p = d._payload, v = d._init;
          try {
            u = v(p);
          } catch {
            u = null;
          }
          var w = u && u.propTypes;
          w && ai(
            w,
            o,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            At(u)
          );
        }
      }
      if (e !== null) {
        var x = e.memoizedProps;
        if (Xe(x, o) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
        t.type === e.type)
          if (ci = !1, t.pendingProps = o = x, Iw(e, l))
            (e.flags & ao) !== $e && (ci = !0);
          else return t.lanes = e.lanes, Yl(e, t, l);
      }
      return Uw(e, t, a, o, l);
    }
    function Qb(e, t, a) {
      var o = t.pendingProps, l = o.children, u = e !== null ? e.memoizedState : null;
      if (o.mode === "hidden" || k)
        if ((t.mode & Et) === Qe) {
          var d = {
            baseLanes: q,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = d, Zm(t, a);
        } else if (la(a, oa)) {
          var z = {
            baseLanes: q,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = z;
          var D = u !== null ? u.baseLanes : a;
          Zm(t, D);
        } else {
          var p = null, v;
          if (u !== null) {
            var w = u.baseLanes;
            v = ht(w, a);
          } else
            v = a;
          t.lanes = t.childLanes = oa;
          var x = {
            baseLanes: v,
            cachePool: p,
            transitions: null
          };
          return t.memoizedState = x, t.updateQueue = null, Zm(t, v), null;
        }
      else {
        var F;
        u !== null ? (F = ht(u.baseLanes, a), t.memoizedState = null) : F = a, Zm(t, F);
      }
      return Ta(e, t, l, a), t.child;
    }
    function uC(e, t, a) {
      var o = t.pendingProps;
      return Ta(e, t, o, a), t.child;
    }
    function cC(e, t, a) {
      var o = t.pendingProps.children;
      return Ta(e, t, o, a), t.child;
    }
    function dC(e, t, a) {
      {
        t.flags |= Rt;
        {
          var o = t.stateNode;
          o.effectDuration = 0, o.passiveEffectDuration = 0;
        }
      }
      var l = t.pendingProps, u = l.children;
      return Ta(e, t, u, a), t.child;
    }
    function Wb(e, t) {
      var a = t.ref;
      (e === null && a !== null || e !== null && e.ref !== a) && (t.flags |= Br, t.flags |= Eu);
    }
    function Uw(e, t, a, o, l) {
      if (t.type !== t.elementType) {
        var u = a.propTypes;
        u && ai(
          u,
          o,
          // Resolved props
          "prop",
          At(a)
        );
      }
      var d;
      {
        var p = Pd(t, a, !0);
        d = Fd(t, p);
      }
      var v, w;
      $d(t, l), Fa(t);
      {
        if (Yp.current = t, Ma(!0), v = Kd(e, t, a, o, d, l), w = Jd(), t.mode & pt) {
          Jt(!0);
          try {
            v = Kd(e, t, a, o, d, l), w = Jd();
          } finally {
            Jt(!1);
          }
        }
        Ma(!1);
      }
      return Oi(), e !== null && !ci ? (ob(e, t, l), Yl(e, t, l)) : (Fn() && w && my(t), t.flags |= Zo, Ta(e, t, v, l), t.child);
    }
    function Xb(e, t, a, o, l) {
      {
        switch (_T(t)) {
          case !1: {
            var u = t.stateNode, d = t.type, p = new d(t.memoizedProps, u.context), v = p.state;
            u.updater.enqueueSetState(u, v, null);
            break;
          }
          case !0: {
            t.flags |= St, t.flags |= Rn;
            var w = new Error("Simulated error coming from DevTools"), x = an(l);
            t.lanes = ht(t.lanes, x);
            var z = Ow(t, dc(w, t), x);
            jy(t, z);
            break;
          }
        }
        if (t.type !== t.elementType) {
          var D = a.propTypes;
          D && ai(
            D,
            o,
            // Resolved props
            "prop",
            At(a)
          );
        }
      }
      var F;
      $i(a) ? (F = !0, Jh(t)) : F = !1, $d(t, l);
      var V = t.stateNode, Q;
      V === null ? (Vm(e, t), jb(t, a, o), Rw(t, a, o, l), Q = !0) : e === null ? Q = eC(t, a, o, l) : Q = tC(e, t, a, o, l);
      var ke = jw(e, t, a, Q, F, l);
      {
        var Ke = t.stateNode;
        Q && Ke.props !== o && (fc || g("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", lt(t) || "a component"), fc = !0);
      }
      return ke;
    }
    function jw(e, t, a, o, l, u) {
      Wb(e, t);
      var d = (t.flags & St) !== $e;
      if (!o && !d)
        return l && D1(t, a, !1), Yl(e, t, u);
      var p = t.stateNode;
      Yp.current = t;
      var v;
      if (d && typeof a.getDerivedStateFromError != "function")
        v = null, Lb();
      else {
        Fa(t);
        {
          if (Ma(!0), v = p.render(), t.mode & pt) {
            Jt(!0);
            try {
              p.render();
            } finally {
              Jt(!1);
            }
          }
          Ma(!1);
        }
        Oi();
      }
      return t.flags |= Zo, e !== null && d ? sC(e, t, v, u) : Ta(e, t, v, u), t.memoizedState = p.state, l && D1(t, a, !0), t.child;
    }
    function qb(e) {
      var t = e.stateNode;
      t.pendingContext ? R1(e, t.pendingContext, t.pendingContext !== t.context) : t.context && R1(e, t.context, !1), Py(e, t.containerInfo);
    }
    function fC(e, t, a) {
      if (qb(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var o = t.pendingProps, l = t.memoizedState, u = l.element;
      J1(e, t), hm(t, o, null, a);
      var d = t.memoizedState;
      t.stateNode;
      var p = d.element;
      if (l.isDehydrated) {
        var v = {
          element: p,
          isDehydrated: !1,
          cache: d.cache,
          pendingSuspenseBoundaries: d.pendingSuspenseBoundaries,
          transitions: d.transitions
        }, w = t.updateQueue;
        if (w.baseState = v, t.memoizedState = v, t.flags & xr) {
          var x = dc(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
          return Gb(e, t, p, a, x);
        } else if (p !== u) {
          var z = dc(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return Gb(e, t, p, a, z);
        } else {
          hE(t);
          var D = $1(t, null, p, a);
          t.child = D;
          for (var F = D; F; )
            F.flags = F.flags & ~Rr | _r, F = F.sibling;
        }
      } else {
        if (Vd(), p === u)
          return Yl(e, t, a);
        Ta(e, t, p, a);
      }
      return t.child;
    }
    function Gb(e, t, a, o, l) {
      return Vd(), Sy(l), t.flags |= xr, Ta(e, t, a, o), t.child;
    }
    function pC(e, t, a) {
      rb(t), e === null && xy(t);
      var o = t.type, l = t.pendingProps, u = e !== null ? e.memoizedProps : null, d = l.children, p = ry(o, l);
      return p ? d = null : u !== null && ry(o, u) && (t.flags |= Kt), Wb(e, t), Ta(e, t, d, a), t.child;
    }
    function vC(e, t) {
      return e === null && xy(t), null;
    }
    function hC(e, t, a, o) {
      Vm(e, t);
      var l = t.pendingProps, u = a, d = u._payload, p = u._init, v = p(d);
      t.type = v;
      var w = t.tag = vT(v), x = ui(v, l), z;
      switch (w) {
        case ee:
          return Pw(t, v), t.type = v = lf(v), z = Uw(null, t, v, x, o), z;
        case I:
          return t.type = v = v0(v), z = Xb(null, t, v, x, o), z;
        case Me:
          return t.type = v = h0(v), z = Yb(null, t, v, x, o), z;
        case it: {
          if (t.type !== t.elementType) {
            var D = v.propTypes;
            D && ai(
              D,
              x,
              // Resolved for outer only
              "prop",
              At(v)
            );
          }
          return z = Ib(
            null,
            t,
            v,
            ui(v.type, x),
            // The inner type can have defaults too
            o
          ), z;
        }
      }
      var F = "";
      throw v !== null && typeof v == "object" && v.$$typeof === ut && (F = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + v + ". " + ("Lazy element type must resolve to a class or function." + F));
    }
    function mC(e, t, a, o, l) {
      Vm(e, t), t.tag = I;
      var u;
      return $i(a) ? (u = !0, Jh(t)) : u = !1, $d(t, l), jb(t, a, o), Rw(t, a, o, l), jw(null, t, a, !0, u, l);
    }
    function gC(e, t, a, o) {
      Vm(e, t);
      var l = t.pendingProps, u;
      {
        var d = Pd(t, a, !1);
        u = Fd(t, d);
      }
      $d(t, o);
      var p, v;
      Fa(t);
      {
        if (a.prototype && typeof a.prototype.render == "function") {
          var w = At(a) || "Unknown";
          zw[w] || (g("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", w, w), zw[w] = !0);
        }
        t.mode & pt && ii.recordLegacyContextWarning(t, null), Ma(!0), Yp.current = t, p = Kd(null, t, a, l, u, o), v = Jd(), Ma(!1);
      }
      if (Oi(), t.flags |= Zo, typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0) {
        var x = At(a) || "Unknown";
        Ip[x] || (g("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", x, x, x), Ip[x] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0
      ) {
        {
          var z = At(a) || "Unknown";
          Ip[z] || (g("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", z, z, z), Ip[z] = !0);
        }
        t.tag = I, t.memoizedState = null, t.updateQueue = null;
        var D = !1;
        return $i(a) ? (D = !0, Jh(t)) : D = !1, t.memoizedState = p.state !== null && p.state !== void 0 ? p.state : null, Uy(t), Ub(t, p), Rw(t, a, l, o), jw(null, t, a, !0, D, o);
      } else {
        if (t.tag = ee, t.mode & pt) {
          Jt(!0);
          try {
            p = Kd(null, t, a, l, u, o), v = Jd();
          } finally {
            Jt(!1);
          }
        }
        return Fn() && v && my(t), Ta(null, t, p, o), Pw(t, a), t.child;
      }
    }
    function Pw(e, t) {
      {
        if (t && t.childContextTypes && g("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
          var a = "", o = Mn();
          o && (a += `

Check the render method of \`` + o + "`.");
          var l = o || "", u = e._debugSource;
          u && (l = u.fileName + ":" + u.lineNumber), Nw[l] || (Nw[l] = !0, g("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", a));
        }
        if (t.defaultProps !== void 0) {
          var d = At(t) || "Unknown";
          $p[d] || (g("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", d), $p[d] = !0);
        }
        if (typeof t.getDerivedStateFromProps == "function") {
          var p = At(t) || "Unknown";
          Mw[p] || (g("%s: Function components do not support getDerivedStateFromProps.", p), Mw[p] = !0);
        }
        if (typeof t.contextType == "object" && t.contextType !== null) {
          var v = At(t) || "Unknown";
          Lw[v] || (g("%s: Function components do not support contextType.", v), Lw[v] = !0);
        }
      }
    }
    var Fw = {
      dehydrated: null,
      treeContext: null,
      retryLane: Yr
    };
    function Hw(e) {
      return {
        baseLanes: e,
        cachePool: lC(),
        transitions: null
      };
    }
    function yC(e, t) {
      var a = null;
      return {
        baseLanes: ht(e.baseLanes, t),
        cachePool: a,
        transitions: e.transitions
      };
    }
    function wC(e, t, a, o) {
      if (t !== null) {
        var l = t.memoizedState;
        if (l === null)
          return !1;
      }
      return By(e, Np);
    }
    function bC(e, t) {
      return Pu(e.childLanes, t);
    }
    function Kb(e, t, a) {
      var o = t.pendingProps;
      DT(t) && (t.flags |= St);
      var l = li.current, u = !1, d = (t.flags & St) !== $e;
      if (d || wC(l, e) ? (u = !0, t.flags &= ~St) : (e === null || e.memoizedState !== null) && (l = PE(l, ab)), l = Wd(l), Is(t, l), e === null) {
        xy(t);
        var p = t.memoizedState;
        if (p !== null) {
          var v = p.dehydrated;
          if (v !== null)
            return CC(t, v);
        }
        var w = o.children, x = o.fallback;
        if (u) {
          var z = xC(t, w, x, a), D = t.child;
          return D.memoizedState = Hw(a), t.memoizedState = Fw, z;
        } else
          return Bw(t, w);
      } else {
        var F = e.memoizedState;
        if (F !== null) {
          var V = F.dehydrated;
          if (V !== null)
            return TC(e, t, d, o, V, F, a);
        }
        if (u) {
          var Q = o.fallback, ke = o.children, Ke = kC(e, t, ke, Q, a), Ie = t.child, jt = e.child.memoizedState;
          return Ie.memoizedState = jt === null ? Hw(a) : yC(jt, a), Ie.childLanes = bC(e, a), t.memoizedState = Fw, Ke;
        } else {
          var Ot = o.children, A = SC(e, t, Ot, a);
          return t.memoizedState = null, A;
        }
      }
    }
    function Bw(e, t, a) {
      var o = e.mode, l = {
        mode: "visible",
        children: t
      }, u = Vw(l, o);
      return u.return = e, e.child = u, u;
    }
    function xC(e, t, a, o) {
      var l = e.mode, u = e.child, d = {
        mode: "hidden",
        children: t
      }, p, v;
      return (l & Et) === Qe && u !== null ? (p = u, p.childLanes = q, p.pendingProps = d, e.mode & Lt && (p.actualDuration = 0, p.actualStartTime = -1, p.selfBaseDuration = 0, p.treeBaseDuration = 0), v = Js(a, l, o, null)) : (p = Vw(d, l), v = Js(a, l, o, null)), p.return = e, v.return = e, p.sibling = v, e.child = p, v;
    }
    function Vw(e, t, a) {
      return Jx(e, t, q, null);
    }
    function Jb(e, t) {
      return gc(e, t);
    }
    function SC(e, t, a, o) {
      var l = e.child, u = l.sibling, d = Jb(l, {
        mode: "visible",
        children: a
      });
      if ((t.mode & Et) === Qe && (d.lanes = o), d.return = t, d.sibling = null, u !== null) {
        var p = t.deletions;
        p === null ? (t.deletions = [u], t.flags |= ta) : p.push(u);
      }
      return t.child = d, d;
    }
    function kC(e, t, a, o, l) {
      var u = t.mode, d = e.child, p = d.sibling, v = {
        mode: "hidden",
        children: a
      }, w;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (u & Et) === Qe && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        t.child !== d
      ) {
        var x = t.child;
        w = x, w.childLanes = q, w.pendingProps = v, t.mode & Lt && (w.actualDuration = 0, w.actualStartTime = -1, w.selfBaseDuration = d.selfBaseDuration, w.treeBaseDuration = d.treeBaseDuration), t.deletions = null;
      } else
        w = Jb(d, v), w.subtreeFlags = d.subtreeFlags & Vr;
      var z;
      return p !== null ? z = gc(p, o) : (z = Js(o, u, l, null), z.flags |= Rr), z.return = t, w.return = t, w.sibling = z, t.child = w, z;
    }
    function Bm(e, t, a, o) {
      o !== null && Sy(o), Yd(t, e.child, null, a);
      var l = t.pendingProps, u = l.children, d = Bw(t, u);
      return d.flags |= Rr, t.memoizedState = null, d;
    }
    function EC(e, t, a, o, l) {
      var u = t.mode, d = {
        mode: "visible",
        children: a
      }, p = Vw(d, u), v = Js(o, u, l, null);
      return v.flags |= Rr, p.return = t, v.return = t, p.sibling = v, t.child = p, (t.mode & Et) !== Qe && Yd(t, e.child, null, l), v;
    }
    function CC(e, t, a) {
      return (e.mode & Et) === Qe ? (g("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = rt) : iy(t) ? e.lanes = nn : e.lanes = oa, null;
    }
    function TC(e, t, a, o, l, u, d) {
      if (a)
        if (t.flags & xr) {
          t.flags &= ~xr;
          var A = _w(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return Bm(e, t, d, A);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= St, null;
          var W = o.children, U = o.fallback, le = EC(e, t, W, U, d), Ue = t.child;
          return Ue.memoizedState = Hw(d), t.memoizedState = Fw, le;
        }
      else {
        if (pE(), (t.mode & Et) === Qe)
          return Bm(
            e,
            t,
            d,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (iy(l)) {
          var p, v, w;
          {
            var x = Ok(l);
            p = x.digest, v = x.message, w = x.stack;
          }
          var z;
          v ? z = new Error(v) : z = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var D = _w(z, p, w);
          return Bm(e, t, d, D);
        }
        var F = la(d, e.childLanes);
        if (ci || F) {
          var V = Jm();
          if (V !== null) {
            var Q = pd(V, d);
            if (Q !== Yr && Q !== u.retryLane) {
              u.retryLane = Q;
              var ke = Zt;
              $a(e, Q), Sn(V, e, Q, ke);
            }
          }
          u0();
          var Ke = _w(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return Bm(e, t, d, Ke);
        } else if (x1(l)) {
          t.flags |= St, t.child = e.child;
          var Ie = K4.bind(null, e);
          return zk(l, Ie), null;
        } else {
          mE(t, l, u.treeContext);
          var jt = o.children, Ot = Bw(t, jt);
          return Ot.flags |= _r, Ot;
        }
      }
    }
    function Zb(e, t, a) {
      e.lanes = ht(e.lanes, t);
      var o = e.alternate;
      o !== null && (o.lanes = ht(o.lanes, t)), Ly(e.return, t, a);
    }
    function RC(e, t, a) {
      for (var o = t; o !== null; ) {
        if (o.tag === be) {
          var l = o.memoizedState;
          l !== null && Zb(o, a, e);
        } else if (o.tag === zt)
          Zb(o, a, e);
        else if (o.child !== null) {
          o.child.return = o, o = o.child;
          continue;
        }
        if (o === e)
          return;
        for (; o.sibling === null; ) {
          if (o.return === null || o.return === e)
            return;
          o = o.return;
        }
        o.sibling.return = o.return, o = o.sibling;
      }
    }
    function _C(e) {
      for (var t = e, a = null; t !== null; ) {
        var o = t.alternate;
        o !== null && wm(o) === null && (a = t), t = t.sibling;
      }
      return a;
    }
    function DC(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !Aw[e])
        if (Aw[e] = !0, typeof e == "string")
          switch (e.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards": {
              g('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
              break;
            }
            case "forward":
            case "backward": {
              g('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
              break;
            }
            default:
              g('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
              break;
          }
        else
          g('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
    }
    function OC(e, t) {
      e !== void 0 && !Hm[e] && (e !== "collapsed" && e !== "hidden" ? (Hm[e] = !0, g('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (Hm[e] = !0, g('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function ex(e, t) {
      {
        var a = vt(e), o = !a && typeof br(e) == "function";
        if (a || o) {
          var l = a ? "array" : "iterable";
          return g("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", l, t, l), !1;
        }
      }
      return !0;
    }
    function zC(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (vt(e)) {
          for (var a = 0; a < e.length; a++)
            if (!ex(e[a], a))
              return;
        } else {
          var o = br(e);
          if (typeof o == "function") {
            var l = o.call(e);
            if (l)
              for (var u = l.next(), d = 0; !u.done; u = l.next()) {
                if (!ex(u.value, d))
                  return;
                d++;
              }
          } else
            g('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
        }
    }
    function Yw(e, t, a, o, l) {
      var u = e.memoizedState;
      u === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: o,
        tail: a,
        tailMode: l
      } : (u.isBackwards = t, u.rendering = null, u.renderingStartTime = 0, u.last = o, u.tail = a, u.tailMode = l);
    }
    function tx(e, t, a) {
      var o = t.pendingProps, l = o.revealOrder, u = o.tail, d = o.children;
      DC(l), OC(u, l), zC(d, l), Ta(e, t, d, a);
      var p = li.current, v = By(p, Np);
      if (v)
        p = Vy(p, Np), t.flags |= St;
      else {
        var w = e !== null && (e.flags & St) !== $e;
        w && RC(t, t.child, a), p = Wd(p);
      }
      if (Is(t, p), (t.mode & Et) === Qe)
        t.memoizedState = null;
      else
        switch (l) {
          case "forwards": {
            var x = _C(t.child), z;
            x === null ? (z = t.child, t.child = null) : (z = x.sibling, x.sibling = null), Yw(
              t,
              !1,
              // isBackwards
              z,
              x,
              u
            );
            break;
          }
          case "backwards": {
            var D = null, F = t.child;
            for (t.child = null; F !== null; ) {
              var V = F.alternate;
              if (V !== null && wm(V) === null) {
                t.child = F;
                break;
              }
              var Q = F.sibling;
              F.sibling = D, D = F, F = Q;
            }
            Yw(
              t,
              !0,
              // isBackwards
              D,
              null,
              // last
              u
            );
            break;
          }
          case "together": {
            Yw(
              t,
              !1,
              // isBackwards
              null,
              // tail
              null,
              // last
              void 0
            );
            break;
          }
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function LC(e, t, a) {
      Py(t, t.stateNode.containerInfo);
      var o = t.pendingProps;
      return e === null ? t.child = Yd(t, null, o, a) : Ta(e, t, o, a), t.child;
    }
    var rx = !1;
    function MC(e, t, a) {
      var o = t.type, l = o._context, u = t.pendingProps, d = t.memoizedProps, p = u.value;
      {
        "value" in u || rx || (rx = !0, g("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var v = t.type.propTypes;
        v && ai(v, u, "prop", "Context.Provider");
      }
      if (X1(t, l, p), d !== null) {
        var w = d.value;
        if (Re(w, p)) {
          if (d.children === u.children && !Gh())
            return Yl(e, t, a);
        } else
          DE(t, l, a);
      }
      var x = u.children;
      return Ta(e, t, x, a), t.child;
    }
    var nx = !1;
    function NC(e, t, a) {
      var o = t.type;
      o._context === void 0 ? o !== o.Consumer && (nx || (nx = !0, g("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : o = o._context;
      var l = t.pendingProps, u = l.children;
      typeof u != "function" && g("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), $d(t, a);
      var d = ln(o);
      Fa(t);
      var p;
      return Yp.current = t, Ma(!0), p = u(d), Ma(!1), Oi(), t.flags |= Zo, Ta(e, t, p, a), t.child;
    }
    function Qp() {
      ci = !0;
    }
    function Vm(e, t) {
      (t.mode & Et) === Qe && e !== null && (e.alternate = null, t.alternate = null, t.flags |= Rr);
    }
    function Yl(e, t, a) {
      return e !== null && (t.dependencies = e.dependencies), Lb(), av(t.lanes), la(a, t.childLanes) ? (RE(e, t), t.child) : null;
    }
    function AC(e, t, a) {
      {
        var o = t.return;
        if (o === null)
          throw new Error("Cannot swap the root fiber.");
        if (e.alternate = null, t.alternate = null, a.index = t.index, a.sibling = t.sibling, a.return = t.return, a.ref = t.ref, t === o.child)
          o.child = a;
        else {
          var l = o.child;
          if (l === null)
            throw new Error("Expected parent to have a child.");
          for (; l.sibling !== t; )
            if (l = l.sibling, l === null)
              throw new Error("Expected to find the previous sibling.");
          l.sibling = a;
        }
        var u = o.deletions;
        return u === null ? (o.deletions = [e], o.flags |= ta) : u.push(e), a.flags |= Rr, a;
      }
    }
    function Iw(e, t) {
      var a = e.lanes;
      return !!la(a, t);
    }
    function UC(e, t, a) {
      switch (t.tag) {
        case J:
          qb(t), t.stateNode, Vd();
          break;
        case ae:
          rb(t);
          break;
        case I: {
          var o = t.type;
          $i(o) && Jh(t);
          break;
        }
        case De:
          Py(t, t.stateNode.containerInfo);
          break;
        case Pe: {
          var l = t.memoizedProps.value, u = t.type._context;
          X1(t, u, l);
          break;
        }
        case G:
          {
            var d = la(a, t.childLanes);
            d && (t.flags |= Rt);
            {
              var p = t.stateNode;
              p.effectDuration = 0, p.passiveEffectDuration = 0;
            }
          }
          break;
        case be: {
          var v = t.memoizedState;
          if (v !== null) {
            if (v.dehydrated !== null)
              return Is(t, Wd(li.current)), t.flags |= St, null;
            var w = t.child, x = w.childLanes;
            if (la(a, x))
              return Kb(e, t, a);
            Is(t, Wd(li.current));
            var z = Yl(e, t, a);
            return z !== null ? z.sibling : null;
          } else
            Is(t, Wd(li.current));
          break;
        }
        case zt: {
          var D = (e.flags & St) !== $e, F = la(a, t.childLanes);
          if (D) {
            if (F)
              return tx(e, t, a);
            t.flags |= St;
          }
          var V = t.memoizedState;
          if (V !== null && (V.rendering = null, V.tail = null, V.lastEffect = null), Is(t, li.current), F)
            break;
          return null;
        }
        case We:
        case Dt:
          return t.lanes = q, Qb(e, t, a);
      }
      return Yl(e, t, a);
    }
    function ax(e, t, a) {
      if (t._debugNeedsRemount && e !== null)
        return AC(e, t, b0(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var o = e.memoizedProps, l = t.pendingProps;
        if (o !== l || Gh() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          ci = !0;
        else {
          var u = Iw(e, a);
          if (!u && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & St) === $e)
            return ci = !1, UC(e, t, a);
          (e.flags & ao) !== $e ? ci = !0 : ci = !1;
        }
      } else if (ci = !1, Fn() && lE(t)) {
        var d = t.index, p = sE();
        L1(t, p, d);
      }
      switch (t.lanes = q, t.tag) {
        case fe:
          return gC(e, t, t.type, a);
        case Wt: {
          var v = t.elementType;
          return hC(e, t, v, a);
        }
        case ee: {
          var w = t.type, x = t.pendingProps, z = t.elementType === w ? x : ui(w, x);
          return Uw(e, t, w, z, a);
        }
        case I: {
          var D = t.type, F = t.pendingProps, V = t.elementType === D ? F : ui(D, F);
          return Xb(e, t, D, V, a);
        }
        case J:
          return fC(e, t, a);
        case ae:
          return pC(e, t, a);
        case H:
          return vC(e, t);
        case be:
          return Kb(e, t, a);
        case De:
          return LC(e, t, a);
        case Me: {
          var Q = t.type, ke = t.pendingProps, Ke = t.elementType === Q ? ke : ui(Q, ke);
          return Yb(e, t, Q, Ke, a);
        }
        case ue:
          return uC(e, t, a);
        case et:
          return cC(e, t, a);
        case G:
          return dC(e, t, a);
        case Pe:
          return MC(e, t, a);
        case ot:
          return NC(e, t, a);
        case it: {
          var Ie = t.type, jt = t.pendingProps, Ot = ui(Ie, jt);
          if (t.type !== t.elementType) {
            var A = Ie.propTypes;
            A && ai(
              A,
              Ot,
              // Resolved for outer only
              "prop",
              At(Ie)
            );
          }
          return Ot = ui(Ie.type, Ot), Ib(e, t, Ie, Ot, a);
        }
        case qe:
          return $b(e, t, t.type, t.pendingProps, a);
        case Ct: {
          var W = t.type, U = t.pendingProps, le = t.elementType === W ? U : ui(W, U);
          return mC(e, t, W, le, a);
        }
        case zt:
          return tx(e, t, a);
        case xt:
          break;
        case We:
          return Qb(e, t, a);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Zd(e) {
      e.flags |= Rt;
    }
    function ox(e) {
      e.flags |= Br, e.flags |= Eu;
    }
    var ix, $w, lx, sx;
    ix = function(e, t, a, o) {
      for (var l = t.child; l !== null; ) {
        if (l.tag === ae || l.tag === H)
          ak(e, l.stateNode);
        else if (l.tag !== De) {
          if (l.child !== null) {
            l.child.return = l, l = l.child;
            continue;
          }
        }
        if (l === t)
          return;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t)
            return;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    }, $w = function(e, t) {
    }, lx = function(e, t, a, o, l) {
      var u = e.memoizedProps;
      if (u !== o) {
        var d = t.stateNode, p = Fy(), v = ik(d, a, u, o, l, p);
        t.updateQueue = v, v && Zd(t);
      }
    }, sx = function(e, t, a, o) {
      a !== o && Zd(t);
    };
    function Wp(e, t) {
      if (!Fn())
        switch (e.tailMode) {
          case "hidden": {
            for (var a = e.tail, o = null; a !== null; )
              a.alternate !== null && (o = a), a = a.sibling;
            o === null ? e.tail = null : o.sibling = null;
            break;
          }
          case "collapsed": {
            for (var l = e.tail, u = null; l !== null; )
              l.alternate !== null && (u = l), l = l.sibling;
            u === null ? !t && e.tail !== null ? e.tail.sibling = null : e.tail = null : u.sibling = null;
            break;
          }
        }
    }
    function Bn(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = q, o = $e;
      if (t) {
        if ((e.mode & Lt) !== Qe) {
          for (var v = e.selfBaseDuration, w = e.child; w !== null; )
            a = ht(a, ht(w.lanes, w.childLanes)), o |= w.subtreeFlags & Vr, o |= w.flags & Vr, v += w.treeBaseDuration, w = w.sibling;
          e.treeBaseDuration = v;
        } else
          for (var x = e.child; x !== null; )
            a = ht(a, ht(x.lanes, x.childLanes)), o |= x.subtreeFlags & Vr, o |= x.flags & Vr, x.return = e, x = x.sibling;
        e.subtreeFlags |= o;
      } else {
        if ((e.mode & Lt) !== Qe) {
          for (var l = e.actualDuration, u = e.selfBaseDuration, d = e.child; d !== null; )
            a = ht(a, ht(d.lanes, d.childLanes)), o |= d.subtreeFlags, o |= d.flags, l += d.actualDuration, u += d.treeBaseDuration, d = d.sibling;
          e.actualDuration = l, e.treeBaseDuration = u;
        } else
          for (var p = e.child; p !== null; )
            a = ht(a, ht(p.lanes, p.childLanes)), o |= p.subtreeFlags, o |= p.flags, p.return = e, p = p.sibling;
        e.subtreeFlags |= o;
      }
      return e.childLanes = a, t;
    }
    function jC(e, t, a) {
      if (xE() && (t.mode & Et) !== Qe && (t.flags & St) === $e)
        return F1(t), Vd(), t.flags |= xr | gl | Rn, !1;
      var o = nm(t);
      if (a !== null && a.dehydrated !== null)
        if (e === null) {
          if (!o)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (wE(t), Bn(t), (t.mode & Lt) !== Qe) {
            var l = a !== null;
            if (l) {
              var u = t.child;
              u !== null && (t.treeBaseDuration -= u.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (Vd(), (t.flags & St) === $e && (t.memoizedState = null), t.flags |= Rt, Bn(t), (t.mode & Lt) !== Qe) {
            var d = a !== null;
            if (d) {
              var p = t.child;
              p !== null && (t.treeBaseDuration -= p.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return H1(), !0;
    }
    function ux(e, t, a) {
      var o = t.pendingProps;
      switch (gy(t), t.tag) {
        case fe:
        case Wt:
        case qe:
        case ee:
        case Me:
        case ue:
        case et:
        case G:
        case ot:
        case it:
          return Bn(t), null;
        case I: {
          var l = t.type;
          return $i(l) && Kh(t), Bn(t), null;
        }
        case J: {
          var u = t.stateNode;
          if (Qd(t), py(t), Iy(), u.pendingContext && (u.context = u.pendingContext, u.pendingContext = null), e === null || e.child === null) {
            var d = nm(t);
            if (d)
              Zd(t);
            else if (e !== null) {
              var p = e.memoizedState;
              // Check if this is a client root
              (!p.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & xr) !== $e) && (t.flags |= Pa, H1());
            }
          }
          return $w(e, t), Bn(t), null;
        }
        case ae: {
          Hy(t);
          var v = tb(), w = t.type;
          if (e !== null && t.stateNode != null)
            lx(e, t, w, o, v), e.ref !== t.ref && ox(t);
          else {
            if (!o) {
              if (t.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return Bn(t), null;
            }
            var x = Fy(), z = nm(t);
            if (z)
              gE(t, v, x) && Zd(t);
            else {
              var D = nk(w, o, v, x, t);
              ix(D, t, !1, !1), t.stateNode = D, ok(D, w, o, v) && Zd(t);
            }
            t.ref !== null && ox(t);
          }
          return Bn(t), null;
        }
        case H: {
          var F = o;
          if (e && t.stateNode != null) {
            var V = e.memoizedProps;
            sx(e, t, V, F);
          } else {
            if (typeof F != "string" && t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var Q = tb(), ke = Fy(), Ke = nm(t);
            Ke ? yE(t) && Zd(t) : t.stateNode = lk(F, Q, ke, t);
          }
          return Bn(t), null;
        }
        case be: {
          Xd(t);
          var Ie = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var jt = jC(e, t, Ie);
            if (!jt)
              return t.flags & Rn ? t : null;
          }
          if ((t.flags & St) !== $e)
            return t.lanes = a, (t.mode & Lt) !== Qe && hw(t), t;
          var Ot = Ie !== null, A = e !== null && e.memoizedState !== null;
          if (Ot !== A && Ot) {
            var W = t.child;
            if (W.flags |= Eo, (t.mode & Et) !== Qe) {
              var U = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
              U || By(li.current, ab) ? P4() : u0();
            }
          }
          var le = t.updateQueue;
          if (le !== null && (t.flags |= Rt), Bn(t), (t.mode & Lt) !== Qe && Ot) {
            var Ue = t.child;
            Ue !== null && (t.treeBaseDuration -= Ue.treeBaseDuration);
          }
          return null;
        }
        case De:
          return Qd(t), $w(e, t), e === null && eE(t.stateNode.containerInfo), Bn(t), null;
        case Pe:
          var _e = t.type._context;
          return zy(_e, t), Bn(t), null;
        case Ct: {
          var at = t.type;
          return $i(at) && Kh(t), Bn(t), null;
        }
        case zt: {
          Xd(t);
          var dt = t.memoizedState;
          if (dt === null)
            return Bn(t), null;
          var ir = (t.flags & St) !== $e, Ht = dt.rendering;
          if (Ht === null)
            if (ir)
              Wp(dt, !1);
            else {
              var Kr = H4() && (e === null || (e.flags & St) === $e);
              if (!Kr)
                for (var Bt = t.child; Bt !== null; ) {
                  var $r = wm(Bt);
                  if ($r !== null) {
                    ir = !0, t.flags |= St, Wp(dt, !1);
                    var pa = $r.updateQueue;
                    return pa !== null && (t.updateQueue = pa, t.flags |= Rt), t.subtreeFlags = $e, _E(t, a), Is(t, Vy(li.current, Np)), t.child;
                  }
                  Bt = Bt.sibling;
                }
              dt.tail !== null && Mr() > Ox() && (t.flags |= St, ir = !0, Wp(dt, !1), t.lanes = th);
            }
          else {
            if (!ir) {
              var Qn = wm(Ht);
              if (Qn !== null) {
                t.flags |= St, ir = !0;
                var fo = Qn.updateQueue;
                if (fo !== null && (t.updateQueue = fo, t.flags |= Rt), Wp(dt, !0), dt.tail === null && dt.tailMode === "hidden" && !Ht.alternate && !Fn())
                  return Bn(t), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              Mr() * 2 - dt.renderingStartTime > Ox() && a !== oa && (t.flags |= St, ir = !0, Wp(dt, !1), t.lanes = th);
            }
            if (dt.isBackwards)
              Ht.sibling = t.child, t.child = Ht;
            else {
              var Da = dt.last;
              Da !== null ? Da.sibling = Ht : t.child = Ht, dt.last = Ht;
            }
          }
          if (dt.tail !== null) {
            var Oa = dt.tail;
            dt.rendering = Oa, dt.tail = Oa.sibling, dt.renderingStartTime = Mr(), Oa.sibling = null;
            var va = li.current;
            return ir ? va = Vy(va, Np) : va = Wd(va), Is(t, va), Oa;
          }
          return Bn(t), null;
        }
        case xt:
          break;
        case We:
        case Dt: {
          s0(t);
          var Xl = t.memoizedState, sf = Xl !== null;
          if (e !== null) {
            var uv = e.memoizedState, Zi = uv !== null;
            Zi !== sf && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !k && (t.flags |= Eo);
          }
          return !sf || (t.mode & Et) === Qe ? Bn(t) : la(Ji, oa) && (Bn(t), t.subtreeFlags & (Rr | Rt) && (t.flags |= Eo)), null;
        }
        case gt:
          return null;
        case tt:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function PC(e, t, a) {
      switch (gy(t), t.tag) {
        case I: {
          var o = t.type;
          $i(o) && Kh(t);
          var l = t.flags;
          return l & Rn ? (t.flags = l & ~Rn | St, (t.mode & Lt) !== Qe && hw(t), t) : null;
        }
        case J: {
          t.stateNode, Qd(t), py(t), Iy();
          var u = t.flags;
          return (u & Rn) !== $e && (u & St) === $e ? (t.flags = u & ~Rn | St, t) : null;
        }
        case ae:
          return Hy(t), null;
        case be: {
          Xd(t);
          var d = t.memoizedState;
          if (d !== null && d.dehydrated !== null) {
            if (t.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            Vd();
          }
          var p = t.flags;
          return p & Rn ? (t.flags = p & ~Rn | St, (t.mode & Lt) !== Qe && hw(t), t) : null;
        }
        case zt:
          return Xd(t), null;
        case De:
          return Qd(t), null;
        case Pe:
          var v = t.type._context;
          return zy(v, t), null;
        case We:
        case Dt:
          return s0(t), null;
        case gt:
          return null;
        default:
          return null;
      }
    }
    function cx(e, t, a) {
      switch (gy(t), t.tag) {
        case I: {
          var o = t.type.childContextTypes;
          o != null && Kh(t);
          break;
        }
        case J: {
          t.stateNode, Qd(t), py(t), Iy();
          break;
        }
        case ae: {
          Hy(t);
          break;
        }
        case De:
          Qd(t);
          break;
        case be:
          Xd(t);
          break;
        case zt:
          Xd(t);
          break;
        case Pe:
          var l = t.type._context;
          zy(l, t);
          break;
        case We:
        case Dt:
          s0(t);
          break;
      }
    }
    var dx = null;
    dx = /* @__PURE__ */ new Set();
    var Ym = !1, Vn = !1, FC = typeof WeakSet == "function" ? WeakSet : Set, Be = null, ef = null, tf = null;
    function HC(e) {
      ja(null, function() {
        throw e;
      }), Ef();
    }
    var BC = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & Lt)
        try {
          Gi(), t.componentWillUnmount();
        } finally {
          qi(e);
        }
      else
        t.componentWillUnmount();
    };
    function fx(e, t) {
      try {
        Ws(mn, e);
      } catch (a) {
        wr(e, t, a);
      }
    }
    function Qw(e, t, a) {
      try {
        BC(e, a);
      } catch (o) {
        wr(e, t, o);
      }
    }
    function VC(e, t, a) {
      try {
        a.componentDidMount();
      } catch (o) {
        wr(e, t, o);
      }
    }
    function px(e, t) {
      try {
        hx(e);
      } catch (a) {
        wr(e, t, a);
      }
    }
    function rf(e, t) {
      var a = e.ref;
      if (a !== null)
        if (typeof a == "function") {
          var o;
          try {
            if (pe && Ee && e.mode & Lt)
              try {
                Gi(), o = a(null);
              } finally {
                qi(e);
              }
            else
              o = a(null);
          } catch (l) {
            wr(e, t, l);
          }
          typeof o == "function" && g("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", lt(e));
        } else
          a.current = null;
    }
    function Im(e, t, a) {
      try {
        a();
      } catch (o) {
        wr(e, t, o);
      }
    }
    var vx = !1;
    function YC(e, t) {
      tk(e.containerInfo), Be = t, IC();
      var a = vx;
      return vx = !1, a;
    }
    function IC() {
      for (; Be !== null; ) {
        var e = Be, t = e.child;
        (e.subtreeFlags & Ri) !== $e && t !== null ? (t.return = e, Be = t) : $C();
      }
    }
    function $C() {
      for (; Be !== null; ) {
        var e = Be;
        tr(e);
        try {
          QC(e);
        } catch (a) {
          wr(e, e.return, a);
        }
        Tr();
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Be = t;
          return;
        }
        Be = e.return;
      }
    }
    function QC(e) {
      var t = e.alternate, a = e.flags;
      if ((a & Pa) !== $e) {
        switch (tr(e), e.tag) {
          case ee:
          case Me:
          case qe:
            break;
          case I: {
            if (t !== null) {
              var o = t.memoizedProps, l = t.memoizedState, u = e.stateNode;
              e.type === e.elementType && !fc && (u.props !== e.memoizedProps && g("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", lt(e) || "instance"), u.state !== e.memoizedState && g("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", lt(e) || "instance"));
              var d = u.getSnapshotBeforeUpdate(e.elementType === e.type ? o : ui(e.type, o), l);
              {
                var p = dx;
                d === void 0 && !p.has(e.type) && (p.add(e.type), g("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", lt(e)));
              }
              u.__reactInternalSnapshotBeforeUpdate = d;
            }
            break;
          }
          case J: {
            {
              var v = e.stateNode;
              Tk(v.containerInfo);
            }
            break;
          }
          case ae:
          case H:
          case De:
          case Ct:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        Tr();
      }
    }
    function di(e, t, a) {
      var o = t.updateQueue, l = o !== null ? o.lastEffect : null;
      if (l !== null) {
        var u = l.next, d = u;
        do {
          if ((d.tag & e) === e) {
            var p = d.destroy;
            d.destroy = void 0, p !== void 0 && ((e & Hn) !== Qa ? zi(t) : (e & mn) !== Qa && Uf(t), (e & Qi) !== Qa && iv(!0), Im(t, a, p), (e & Qi) !== Qa && iv(!1), (e & Hn) !== Qa ? Hc() : (e & mn) !== Qa && ws());
          }
          d = d.next;
        } while (d !== u);
      }
    }
    function Ws(e, t) {
      var a = t.updateQueue, o = a !== null ? a.lastEffect : null;
      if (o !== null) {
        var l = o.next, u = l;
        do {
          if ((u.tag & e) === e) {
            (e & Hn) !== Qa ? Zv(t) : (e & mn) !== Qa && eh(t);
            var d = u.create;
            (e & Qi) !== Qa && iv(!0), u.destroy = d(), (e & Qi) !== Qa && iv(!1), (e & Hn) !== Qa ? ti() : (e & mn) !== Qa && Bc();
            {
              var p = u.destroy;
              if (p !== void 0 && typeof p != "function") {
                var v = void 0;
                (u.tag & mn) !== $e ? v = "useLayoutEffect" : (u.tag & Qi) !== $e ? v = "useInsertionEffect" : v = "useEffect";
                var w = void 0;
                p === null ? w = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof p.then == "function" ? w = `

It looks like you wrote ` + v + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + v + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : w = " You returned: " + p, g("%s must not return anything besides a function, which is used for clean-up.%s", v, w);
              }
            }
          }
          u = u.next;
        } while (u !== l);
      }
    }
    function WC(e, t) {
      if ((t.flags & Rt) !== $e)
        switch (t.tag) {
          case G: {
            var a = t.stateNode.passiveEffectDuration, o = t.memoizedProps, l = o.id, u = o.onPostCommit, d = Ob(), p = t.alternate === null ? "mount" : "update";
            Db() && (p = "nested-update"), typeof u == "function" && u(l, p, a, d);
            var v = t.return;
            e: for (; v !== null; ) {
              switch (v.tag) {
                case J:
                  var w = v.stateNode;
                  w.passiveEffectDuration += a;
                  break e;
                case G:
                  var x = v.stateNode;
                  x.passiveEffectDuration += a;
                  break e;
              }
              v = v.return;
            }
            break;
          }
        }
    }
    function XC(e, t, a, o) {
      if ((a.flags & _i) !== $e)
        switch (a.tag) {
          case ee:
          case Me:
          case qe: {
            if (!Vn)
              if (a.mode & Lt)
                try {
                  Gi(), Ws(mn | hn, a);
                } finally {
                  qi(a);
                }
              else
                Ws(mn | hn, a);
            break;
          }
          case I: {
            var l = a.stateNode;
            if (a.flags & Rt && !Vn)
              if (t === null)
                if (a.type === a.elementType && !fc && (l.props !== a.memoizedProps && g("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", lt(a) || "instance"), l.state !== a.memoizedState && g("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", lt(a) || "instance")), a.mode & Lt)
                  try {
                    Gi(), l.componentDidMount();
                  } finally {
                    qi(a);
                  }
                else
                  l.componentDidMount();
              else {
                var u = a.elementType === a.type ? t.memoizedProps : ui(a.type, t.memoizedProps), d = t.memoizedState;
                if (a.type === a.elementType && !fc && (l.props !== a.memoizedProps && g("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", lt(a) || "instance"), l.state !== a.memoizedState && g("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", lt(a) || "instance")), a.mode & Lt)
                  try {
                    Gi(), l.componentDidUpdate(u, d, l.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    qi(a);
                  }
                else
                  l.componentDidUpdate(u, d, l.__reactInternalSnapshotBeforeUpdate);
              }
            var p = a.updateQueue;
            p !== null && (a.type === a.elementType && !fc && (l.props !== a.memoizedProps && g("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", lt(a) || "instance"), l.state !== a.memoizedState && g("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", lt(a) || "instance")), eb(a, p, l));
            break;
          }
          case J: {
            var v = a.updateQueue;
            if (v !== null) {
              var w = null;
              if (a.child !== null)
                switch (a.child.tag) {
                  case ae:
                    w = a.child.stateNode;
                    break;
                  case I:
                    w = a.child.stateNode;
                    break;
                }
              eb(a, v, w);
            }
            break;
          }
          case ae: {
            var x = a.stateNode;
            if (t === null && a.flags & Rt) {
              var z = a.type, D = a.memoizedProps;
              fk(x, z, D);
            }
            break;
          }
          case H:
            break;
          case De:
            break;
          case G: {
            {
              var F = a.memoizedProps, V = F.onCommit, Q = F.onRender, ke = a.stateNode.effectDuration, Ke = Ob(), Ie = t === null ? "mount" : "update";
              Db() && (Ie = "nested-update"), typeof Q == "function" && Q(a.memoizedProps.id, Ie, a.actualDuration, a.treeBaseDuration, a.actualStartTime, Ke);
              {
                typeof V == "function" && V(a.memoizedProps.id, Ie, ke, Ke), $4(a);
                var jt = a.return;
                e: for (; jt !== null; ) {
                  switch (jt.tag) {
                    case J:
                      var Ot = jt.stateNode;
                      Ot.effectDuration += ke;
                      break e;
                    case G:
                      var A = jt.stateNode;
                      A.effectDuration += ke;
                      break e;
                  }
                  jt = jt.return;
                }
              }
            }
            break;
          }
          case be: {
            r4(e, a);
            break;
          }
          case zt:
          case Ct:
          case xt:
          case We:
          case Dt:
          case tt:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      Vn || a.flags & Br && hx(a);
    }
    function qC(e) {
      switch (e.tag) {
        case ee:
        case Me:
        case qe: {
          if (e.mode & Lt)
            try {
              Gi(), fx(e, e.return);
            } finally {
              qi(e);
            }
          else
            fx(e, e.return);
          break;
        }
        case I: {
          var t = e.stateNode;
          typeof t.componentDidMount == "function" && VC(e, e.return, t), px(e, e.return);
          break;
        }
        case ae: {
          px(e, e.return);
          break;
        }
      }
    }
    function GC(e, t) {
      for (var a = null, o = e; ; ) {
        if (o.tag === ae) {
          if (a === null) {
            a = o;
            try {
              var l = o.stateNode;
              t ? Sk(l) : Ek(o.stateNode, o.memoizedProps);
            } catch (d) {
              wr(e, e.return, d);
            }
          }
        } else if (o.tag === H) {
          if (a === null)
            try {
              var u = o.stateNode;
              t ? kk(u) : Ck(u, o.memoizedProps);
            } catch (d) {
              wr(e, e.return, d);
            }
        } else if (!((o.tag === We || o.tag === Dt) && o.memoizedState !== null && o !== e)) {
          if (o.child !== null) {
            o.child.return = o, o = o.child;
            continue;
          }
        }
        if (o === e)
          return;
        for (; o.sibling === null; ) {
          if (o.return === null || o.return === e)
            return;
          a === o && (a = null), o = o.return;
        }
        a === o && (a = null), o.sibling.return = o.return, o = o.sibling;
      }
    }
    function hx(e) {
      var t = e.ref;
      if (t !== null) {
        var a = e.stateNode, o;
        switch (e.tag) {
          case ae:
            o = a;
            break;
          default:
            o = a;
        }
        if (typeof t == "function") {
          var l;
          if (e.mode & Lt)
            try {
              Gi(), l = t(o);
            } finally {
              qi(e);
            }
          else
            l = t(o);
          typeof l == "function" && g("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", lt(e));
        } else
          t.hasOwnProperty("current") || g("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", lt(e)), t.current = o;
      }
    }
    function KC(e) {
      var t = e.alternate;
      t !== null && (t.return = null), e.return = null;
    }
    function mx(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, mx(t));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === ae) {
          var a = e.stateNode;
          a !== null && nE(a);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function JC(e) {
      for (var t = e.return; t !== null; ) {
        if (gx(t))
          return t;
        t = t.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function gx(e) {
      return e.tag === ae || e.tag === J || e.tag === De;
    }
    function yx(e) {
      var t = e;
      e: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || gx(t.return))
            return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== ae && t.tag !== H && t.tag !== Vt; ) {
          if (t.flags & Rr || t.child === null || t.tag === De)
            continue e;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & Rr))
          return t.stateNode;
      }
    }
    function ZC(e) {
      var t = JC(e);
      switch (t.tag) {
        case ae: {
          var a = t.stateNode;
          t.flags & Kt && (b1(a), t.flags &= ~Kt);
          var o = yx(e);
          Xw(e, o, a);
          break;
        }
        case J:
        case De: {
          var l = t.stateNode.containerInfo, u = yx(e);
          Ww(e, u, l);
          break;
        }
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function Ww(e, t, a) {
      var o = e.tag, l = o === ae || o === H;
      if (l) {
        var u = e.stateNode;
        t ? yk(a, u, t) : mk(a, u);
      } else if (o !== De) {
        var d = e.child;
        if (d !== null) {
          Ww(d, t, a);
          for (var p = d.sibling; p !== null; )
            Ww(p, t, a), p = p.sibling;
        }
      }
    }
    function Xw(e, t, a) {
      var o = e.tag, l = o === ae || o === H;
      if (l) {
        var u = e.stateNode;
        t ? gk(a, u, t) : hk(a, u);
      } else if (o !== De) {
        var d = e.child;
        if (d !== null) {
          Xw(d, t, a);
          for (var p = d.sibling; p !== null; )
            Xw(p, t, a), p = p.sibling;
        }
      }
    }
    var Yn = null, fi = !1;
    function e4(e, t, a) {
      {
        var o = t;
        e: for (; o !== null; ) {
          switch (o.tag) {
            case ae: {
              Yn = o.stateNode, fi = !1;
              break e;
            }
            case J: {
              Yn = o.stateNode.containerInfo, fi = !0;
              break e;
            }
            case De: {
              Yn = o.stateNode.containerInfo, fi = !0;
              break e;
            }
          }
          o = o.return;
        }
        if (Yn === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        wx(e, t, a), Yn = null, fi = !1;
      }
      KC(a);
    }
    function Xs(e, t, a) {
      for (var o = a.child; o !== null; )
        wx(e, t, o), o = o.sibling;
    }
    function wx(e, t, a) {
      switch (ys(a), a.tag) {
        case ae:
          Vn || rf(a, t);
        case H: {
          {
            var o = Yn, l = fi;
            Yn = null, Xs(e, t, a), Yn = o, fi = l, Yn !== null && (fi ? bk(Yn, a.stateNode) : wk(Yn, a.stateNode));
          }
          return;
        }
        case Vt: {
          Yn !== null && (fi ? xk(Yn, a.stateNode) : oy(Yn, a.stateNode));
          return;
        }
        case De: {
          {
            var u = Yn, d = fi;
            Yn = a.stateNode.containerInfo, fi = !0, Xs(e, t, a), Yn = u, fi = d;
          }
          return;
        }
        case ee:
        case Me:
        case it:
        case qe: {
          if (!Vn) {
            var p = a.updateQueue;
            if (p !== null) {
              var v = p.lastEffect;
              if (v !== null) {
                var w = v.next, x = w;
                do {
                  var z = x, D = z.destroy, F = z.tag;
                  D !== void 0 && ((F & Qi) !== Qa ? Im(a, t, D) : (F & mn) !== Qa && (Uf(a), a.mode & Lt ? (Gi(), Im(a, t, D), qi(a)) : Im(a, t, D), ws())), x = x.next;
                } while (x !== w);
              }
            }
          }
          Xs(e, t, a);
          return;
        }
        case I: {
          if (!Vn) {
            rf(a, t);
            var V = a.stateNode;
            typeof V.componentWillUnmount == "function" && Qw(a, t, V);
          }
          Xs(e, t, a);
          return;
        }
        case xt: {
          Xs(e, t, a);
          return;
        }
        case We: {
          if (
            // TODO: Remove this dead flag
            a.mode & Et
          ) {
            var Q = Vn;
            Vn = Q || a.memoizedState !== null, Xs(e, t, a), Vn = Q;
          } else
            Xs(e, t, a);
          break;
        }
        default: {
          Xs(e, t, a);
          return;
        }
      }
    }
    function t4(e) {
      e.memoizedState;
    }
    function r4(e, t) {
      var a = t.memoizedState;
      if (a === null) {
        var o = t.alternate;
        if (o !== null) {
          var l = o.memoizedState;
          if (l !== null) {
            var u = l.dehydrated;
            u !== null && Hk(u);
          }
        }
      }
    }
    function bx(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var a = e.stateNode;
        a === null && (a = e.stateNode = new FC()), t.forEach(function(o) {
          var l = J4.bind(null, e, o);
          if (!a.has(o)) {
            if (a.add(o), _n)
              if (ef !== null && tf !== null)
                ov(tf, ef);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            o.then(l, l);
          }
        });
      }
    }
    function n4(e, t, a) {
      ef = a, tf = e, tr(t), xx(t, e), tr(t), ef = null, tf = null;
    }
    function pi(e, t, a) {
      var o = t.deletions;
      if (o !== null)
        for (var l = 0; l < o.length; l++) {
          var u = o[l];
          try {
            e4(e, t, u);
          } catch (v) {
            wr(u, t, v);
          }
        }
      var d = eo();
      if (t.subtreeFlags & ms)
        for (var p = t.child; p !== null; )
          tr(p), xx(p, e), p = p.sibling;
      tr(d);
    }
    function xx(e, t, a) {
      var o = e.alternate, l = e.flags;
      switch (e.tag) {
        case ee:
        case Me:
        case it:
        case qe: {
          if (pi(t, e), Ki(e), l & Rt) {
            try {
              di(Qi | hn, e, e.return), Ws(Qi | hn, e);
            } catch (at) {
              wr(e, e.return, at);
            }
            if (e.mode & Lt) {
              try {
                Gi(), di(mn | hn, e, e.return);
              } catch (at) {
                wr(e, e.return, at);
              }
              qi(e);
            } else
              try {
                di(mn | hn, e, e.return);
              } catch (at) {
                wr(e, e.return, at);
              }
          }
          return;
        }
        case I: {
          pi(t, e), Ki(e), l & Br && o !== null && rf(o, o.return);
          return;
        }
        case ae: {
          pi(t, e), Ki(e), l & Br && o !== null && rf(o, o.return);
          {
            if (e.flags & Kt) {
              var u = e.stateNode;
              try {
                b1(u);
              } catch (at) {
                wr(e, e.return, at);
              }
            }
            if (l & Rt) {
              var d = e.stateNode;
              if (d != null) {
                var p = e.memoizedProps, v = o !== null ? o.memoizedProps : p, w = e.type, x = e.updateQueue;
                if (e.updateQueue = null, x !== null)
                  try {
                    pk(d, x, w, v, p, e);
                  } catch (at) {
                    wr(e, e.return, at);
                  }
              }
            }
          }
          return;
        }
        case H: {
          if (pi(t, e), Ki(e), l & Rt) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var z = e.stateNode, D = e.memoizedProps, F = o !== null ? o.memoizedProps : D;
            try {
              vk(z, F, D);
            } catch (at) {
              wr(e, e.return, at);
            }
          }
          return;
        }
        case J: {
          if (pi(t, e), Ki(e), l & Rt && o !== null) {
            var V = o.memoizedState;
            if (V.isDehydrated)
              try {
                Fk(t.containerInfo);
              } catch (at) {
                wr(e, e.return, at);
              }
          }
          return;
        }
        case De: {
          pi(t, e), Ki(e);
          return;
        }
        case be: {
          pi(t, e), Ki(e);
          var Q = e.child;
          if (Q.flags & Eo) {
            var ke = Q.stateNode, Ke = Q.memoizedState, Ie = Ke !== null;
            if (ke.isHidden = Ie, Ie) {
              var jt = Q.alternate !== null && Q.alternate.memoizedState !== null;
              jt || j4();
            }
          }
          if (l & Rt) {
            try {
              t4(e);
            } catch (at) {
              wr(e, e.return, at);
            }
            bx(e);
          }
          return;
        }
        case We: {
          var Ot = o !== null && o.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & Et
          ) {
            var A = Vn;
            Vn = A || Ot, pi(t, e), Vn = A;
          } else
            pi(t, e);
          if (Ki(e), l & Eo) {
            var W = e.stateNode, U = e.memoizedState, le = U !== null, Ue = e;
            if (W.isHidden = le, le && !Ot && (Ue.mode & Et) !== Qe) {
              Be = Ue;
              for (var _e = Ue.child; _e !== null; )
                Be = _e, o4(_e), _e = _e.sibling;
            }
            GC(Ue, le);
          }
          return;
        }
        case zt: {
          pi(t, e), Ki(e), l & Rt && bx(e);
          return;
        }
        case xt:
          return;
        default: {
          pi(t, e), Ki(e);
          return;
        }
      }
    }
    function Ki(e) {
      var t = e.flags;
      if (t & Rr) {
        try {
          ZC(e);
        } catch (a) {
          wr(e, e.return, a);
        }
        e.flags &= ~Rr;
      }
      t & _r && (e.flags &= ~_r);
    }
    function a4(e, t, a) {
      ef = a, tf = t, Be = e, Sx(e, t, a), ef = null, tf = null;
    }
    function Sx(e, t, a) {
      for (var o = (e.mode & Et) !== Qe; Be !== null; ) {
        var l = Be, u = l.child;
        if (l.tag === We && o) {
          var d = l.memoizedState !== null, p = d || Ym;
          if (p) {
            qw(e, t, a);
            continue;
          } else {
            var v = l.alternate, w = v !== null && v.memoizedState !== null, x = w || Vn, z = Ym, D = Vn;
            Ym = p, Vn = x, Vn && !D && (Be = l, i4(l));
            for (var F = u; F !== null; )
              Be = F, Sx(
                F,
                // New root; bubble back up to here and stop.
                t,
                a
              ), F = F.sibling;
            Be = l, Ym = z, Vn = D, qw(e, t, a);
            continue;
          }
        }
        (l.subtreeFlags & _i) !== $e && u !== null ? (u.return = l, Be = u) : qw(e, t, a);
      }
    }
    function qw(e, t, a) {
      for (; Be !== null; ) {
        var o = Be;
        if ((o.flags & _i) !== $e) {
          var l = o.alternate;
          tr(o);
          try {
            XC(t, l, o, a);
          } catch (d) {
            wr(o, o.return, d);
          }
          Tr();
        }
        if (o === e) {
          Be = null;
          return;
        }
        var u = o.sibling;
        if (u !== null) {
          u.return = o.return, Be = u;
          return;
        }
        Be = o.return;
      }
    }
    function o4(e) {
      for (; Be !== null; ) {
        var t = Be, a = t.child;
        switch (t.tag) {
          case ee:
          case Me:
          case it:
          case qe: {
            if (t.mode & Lt)
              try {
                Gi(), di(mn, t, t.return);
              } finally {
                qi(t);
              }
            else
              di(mn, t, t.return);
            break;
          }
          case I: {
            rf(t, t.return);
            var o = t.stateNode;
            typeof o.componentWillUnmount == "function" && Qw(t, t.return, o);
            break;
          }
          case ae: {
            rf(t, t.return);
            break;
          }
          case We: {
            var l = t.memoizedState !== null;
            if (l) {
              kx(e);
              continue;
            }
            break;
          }
        }
        a !== null ? (a.return = t, Be = a) : kx(e);
      }
    }
    function kx(e) {
      for (; Be !== null; ) {
        var t = Be;
        if (t === e) {
          Be = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, Be = a;
          return;
        }
        Be = t.return;
      }
    }
    function i4(e) {
      for (; Be !== null; ) {
        var t = Be, a = t.child;
        if (t.tag === We) {
          var o = t.memoizedState !== null;
          if (o) {
            Ex(e);
            continue;
          }
        }
        a !== null ? (a.return = t, Be = a) : Ex(e);
      }
    }
    function Ex(e) {
      for (; Be !== null; ) {
        var t = Be;
        tr(t);
        try {
          qC(t);
        } catch (o) {
          wr(t, t.return, o);
        }
        if (Tr(), t === e) {
          Be = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, Be = a;
          return;
        }
        Be = t.return;
      }
    }
    function l4(e, t, a, o) {
      Be = t, s4(t, e, a, o);
    }
    function s4(e, t, a, o) {
      for (; Be !== null; ) {
        var l = Be, u = l.child;
        (l.subtreeFlags & cn) !== $e && u !== null ? (u.return = l, Be = u) : u4(e, t, a, o);
      }
    }
    function u4(e, t, a, o) {
      for (; Be !== null; ) {
        var l = Be;
        if ((l.flags & ba) !== $e) {
          tr(l);
          try {
            c4(t, l, a, o);
          } catch (d) {
            wr(l, l.return, d);
          }
          Tr();
        }
        if (l === e) {
          Be = null;
          return;
        }
        var u = l.sibling;
        if (u !== null) {
          u.return = l.return, Be = u;
          return;
        }
        Be = l.return;
      }
    }
    function c4(e, t, a, o) {
      switch (t.tag) {
        case ee:
        case Me:
        case qe: {
          if (t.mode & Lt) {
            vw();
            try {
              Ws(Hn | hn, t);
            } finally {
              pw(t);
            }
          } else
            Ws(Hn | hn, t);
          break;
        }
      }
    }
    function d4(e) {
      Be = e, f4();
    }
    function f4() {
      for (; Be !== null; ) {
        var e = Be, t = e.child;
        if ((Be.flags & ta) !== $e) {
          var a = e.deletions;
          if (a !== null) {
            for (var o = 0; o < a.length; o++) {
              var l = a[o];
              Be = l, h4(l, e);
            }
            {
              var u = e.alternate;
              if (u !== null) {
                var d = u.child;
                if (d !== null) {
                  u.child = null;
                  do {
                    var p = d.sibling;
                    d.sibling = null, d = p;
                  } while (d !== null);
                }
              }
            }
            Be = e;
          }
        }
        (e.subtreeFlags & cn) !== $e && t !== null ? (t.return = e, Be = t) : p4();
      }
    }
    function p4() {
      for (; Be !== null; ) {
        var e = Be;
        (e.flags & ba) !== $e && (tr(e), v4(e), Tr());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Be = t;
          return;
        }
        Be = e.return;
      }
    }
    function v4(e) {
      switch (e.tag) {
        case ee:
        case Me:
        case qe: {
          e.mode & Lt ? (vw(), di(Hn | hn, e, e.return), pw(e)) : di(Hn | hn, e, e.return);
          break;
        }
      }
    }
    function h4(e, t) {
      for (; Be !== null; ) {
        var a = Be;
        tr(a), g4(a, t), Tr();
        var o = a.child;
        o !== null ? (o.return = a, Be = o) : m4(e);
      }
    }
    function m4(e) {
      for (; Be !== null; ) {
        var t = Be, a = t.sibling, o = t.return;
        if (mx(t), t === e) {
          Be = null;
          return;
        }
        if (a !== null) {
          a.return = o, Be = a;
          return;
        }
        Be = o;
      }
    }
    function g4(e, t) {
      switch (e.tag) {
        case ee:
        case Me:
        case qe: {
          e.mode & Lt ? (vw(), di(Hn, e, t), pw(e)) : di(Hn, e, t);
          break;
        }
      }
    }
    function y4(e) {
      switch (e.tag) {
        case ee:
        case Me:
        case qe: {
          try {
            Ws(mn | hn, e);
          } catch (a) {
            wr(e, e.return, a);
          }
          break;
        }
        case I: {
          var t = e.stateNode;
          try {
            t.componentDidMount();
          } catch (a) {
            wr(e, e.return, a);
          }
          break;
        }
      }
    }
    function w4(e) {
      switch (e.tag) {
        case ee:
        case Me:
        case qe: {
          try {
            Ws(Hn | hn, e);
          } catch (t) {
            wr(e, e.return, t);
          }
          break;
        }
      }
    }
    function b4(e) {
      switch (e.tag) {
        case ee:
        case Me:
        case qe: {
          try {
            di(mn | hn, e, e.return);
          } catch (a) {
            wr(e, e.return, a);
          }
          break;
        }
        case I: {
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && Qw(e, e.return, t);
          break;
        }
      }
    }
    function x4(e) {
      switch (e.tag) {
        case ee:
        case Me:
        case qe:
          try {
            di(Hn | hn, e, e.return);
          } catch (t) {
            wr(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var Xp = Symbol.for;
      Xp("selector.component"), Xp("selector.has_pseudo_class"), Xp("selector.role"), Xp("selector.test_id"), Xp("selector.text");
    }
    var S4 = [];
    function k4() {
      S4.forEach(function(e) {
        return e();
      });
    }
    var E4 = C.ReactCurrentActQueue;
    function C4(e) {
      {
        var t = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), a = typeof jest < "u";
        return a && t !== !1;
      }
    }
    function Cx() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && E4.current !== null && g("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var T4 = Math.ceil, Gw = C.ReactCurrentDispatcher, Kw = C.ReactCurrentOwner, In = C.ReactCurrentBatchConfig, vi = C.ReactCurrentActQueue, wn = (
      /*             */
      0
    ), Tx = (
      /*               */
      1
    ), $n = (
      /*                */
      2
    ), Ao = (
      /*                */
      4
    ), Il = 0, qp = 1, pc = 2, $m = 3, Gp = 4, Rx = 5, Jw = 6, Ut = wn, Ra = null, jr = null, bn = q, Ji = q, Zw = Ps(q), xn = Il, Kp = null, Qm = q, Jp = q, Wm = q, Zp = null, Wa = null, e0 = 0, _x = 500, Dx = 1 / 0, R4 = 500, $l = null;
    function ev() {
      Dx = Mr() + R4;
    }
    function Ox() {
      return Dx;
    }
    var Xm = !1, t0 = null, nf = null, vc = !1, qs = null, tv = q, r0 = [], n0 = null, _4 = 50, rv = 0, a0 = null, o0 = !1, qm = !1, D4 = 50, af = 0, Gm = null, nv = Zt, Km = q, zx = !1;
    function Jm() {
      return Ra;
    }
    function _a() {
      return (Ut & ($n | Ao)) !== wn ? Mr() : (nv !== Zt || (nv = Mr()), nv);
    }
    function Gs(e) {
      var t = e.mode;
      if ((t & Et) === Qe)
        return rt;
      if ((Ut & $n) !== wn && bn !== q)
        return an(bn);
      var a = EE() !== kE;
      if (a) {
        if (In.transition !== null) {
          var o = In.transition;
          o._updatedFibers || (o._updatedFibers = /* @__PURE__ */ new Set()), o._updatedFibers.add(e);
        }
        return Km === Yr && (Km = Qf()), Km;
      }
      var l = Sa();
      if (l !== Yr)
        return l;
      var u = sk();
      return u;
    }
    function O4(e) {
      var t = e.mode;
      return (t & Et) === Qe ? rt : lh();
    }
    function Sn(e, t, a, o) {
      eT(), zx && g("useInsertionEffect must not schedule updates."), o0 && (qm = !0), Cs(e, a, o), (Ut & $n) !== q && e === Ra ? nT(t) : (_n && uh(e, t, a), aT(t), e === Ra && ((Ut & $n) === wn && (Jp = ht(Jp, a)), xn === Gp && Ks(e, bn)), Xa(e, o), a === rt && Ut === wn && (t.mode & Et) === Qe && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !vi.isBatchingLegacy && (ev(), z1()));
    }
    function z4(e, t, a) {
      var o = e.current;
      o.lanes = t, Cs(e, t, a), Xa(e, a);
    }
    function L4(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (Ut & $n) !== wn
      );
    }
    function Xa(e, t) {
      var a = e.callbackNode;
      ah(e, t);
      var o = ia(e, e === Ra ? bn : q);
      if (o === q) {
        a !== null && Wx(a), e.callbackNode = null, e.callbackPriority = Yr;
        return;
      }
      var l = Cl(o), u = e.callbackPriority;
      if (u === l && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(vi.current !== null && a !== f0)) {
        a == null && u !== rt && g("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      a != null && Wx(a);
      var d;
      if (l === rt)
        e.tag === Fs ? (vi.isBatchingLegacy !== null && (vi.didScheduleLegacyUpdate = !0), iE(Nx.bind(null, e))) : O1(Nx.bind(null, e)), vi.current !== null ? vi.current.push(Hs) : ck(function() {
          (Ut & ($n | Ao)) === wn && Hs();
        }), d = null;
      else {
        var p;
        switch (dh(o)) {
          case sa:
            p = ei;
            break;
          case Ha:
            p = Cu;
            break;
          case fn:
            p = wl;
            break;
          case hd:
            p = gs;
            break;
          default:
            p = wl;
            break;
        }
        d = p0(p, Lx.bind(null, e));
      }
      e.callbackPriority = l, e.callbackNode = d;
    }
    function Lx(e, t) {
      if (GE(), nv = Zt, Km = q, (Ut & ($n | Ao)) !== wn)
        throw new Error("Should not already be working.");
      var a = e.callbackNode, o = Wl();
      if (o && e.callbackNode !== a)
        return null;
      var l = ia(e, e === Ra ? bn : q);
      if (l === q)
        return null;
      var u = !ju(e, l) && !ih(e, l) && !t, d = u ? V4(e, l) : eg(e, l);
      if (d !== Il) {
        if (d === pc) {
          var p = ld(e);
          p !== q && (l = p, d = i0(e, p));
        }
        if (d === qp) {
          var v = Kp;
          throw hc(e, q), Ks(e, l), Xa(e, Mr()), v;
        }
        if (d === Jw)
          Ks(e, l);
        else {
          var w = !ju(e, l), x = e.current.alternate;
          if (w && !N4(x)) {
            if (d = eg(e, l), d === pc) {
              var z = ld(e);
              z !== q && (l = z, d = i0(e, z));
            }
            if (d === qp) {
              var D = Kp;
              throw hc(e, q), Ks(e, l), Xa(e, Mr()), D;
            }
          }
          e.finishedWork = x, e.finishedLanes = l, M4(e, d, l);
        }
      }
      return Xa(e, Mr()), e.callbackNode === a ? Lx.bind(null, e) : null;
    }
    function i0(e, t) {
      var a = Zp;
      if (Rl(e)) {
        var o = hc(e, t);
        o.flags |= xr, Zk(e.containerInfo);
      }
      var l = eg(e, t);
      if (l !== pc) {
        var u = Wa;
        Wa = a, u !== null && Mx(u);
      }
      return l;
    }
    function Mx(e) {
      Wa === null ? Wa = e : Wa.push.apply(Wa, e);
    }
    function M4(e, t, a) {
      switch (t) {
        case Il:
        case qp:
          throw new Error("Root did not complete. This is a bug in React.");
        case pc: {
          mc(e, Wa, $l);
          break;
        }
        case $m: {
          if (Ks(e, a), sd(a) && // do not delay if we're inside an act() scope
          !Xx()) {
            var o = e0 + _x - Mr();
            if (o > 10) {
              var l = ia(e, q);
              if (l !== q)
                break;
              var u = e.suspendedLanes;
              if (!Tl(u, a)) {
                _a(), fd(e, u);
                break;
              }
              e.timeoutHandle = ny(mc.bind(null, e, Wa, $l), o);
              break;
            }
          }
          mc(e, Wa, $l);
          break;
        }
        case Gp: {
          if (Ks(e, a), _g(a))
            break;
          if (!Xx()) {
            var d = Vf(e, a), p = d, v = Mr() - p, w = Z4(v) - v;
            if (w > 10) {
              e.timeoutHandle = ny(mc.bind(null, e, Wa, $l), w);
              break;
            }
          }
          mc(e, Wa, $l);
          break;
        }
        case Rx: {
          mc(e, Wa, $l);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function N4(e) {
      for (var t = e; ; ) {
        if (t.flags & Pc) {
          var a = t.updateQueue;
          if (a !== null) {
            var o = a.stores;
            if (o !== null)
              for (var l = 0; l < o.length; l++) {
                var u = o[l], d = u.getSnapshot, p = u.value;
                try {
                  if (!Re(d(), p))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var v = t.child;
        if (t.subtreeFlags & Pc && v !== null) {
          v.return = t, t = v;
          continue;
        }
        if (t === e)
          return !0;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return !0;
    }
    function Ks(e, t) {
      t = Pu(t, Wm), t = Pu(t, Jp), Xf(e, t);
    }
    function Nx(e) {
      if (KE(), (Ut & ($n | Ao)) !== wn)
        throw new Error("Should not already be working.");
      Wl();
      var t = ia(e, q);
      if (!la(t, rt))
        return Xa(e, Mr()), null;
      var a = eg(e, t);
      if (e.tag !== Fs && a === pc) {
        var o = ld(e);
        o !== q && (t = o, a = i0(e, o));
      }
      if (a === qp) {
        var l = Kp;
        throw hc(e, q), Ks(e, t), Xa(e, Mr()), l;
      }
      if (a === Jw)
        throw new Error("Root did not complete. This is a bug in React.");
      var u = e.current.alternate;
      return e.finishedWork = u, e.finishedLanes = t, mc(e, Wa, $l), Xa(e, Mr()), null;
    }
    function A4(e, t) {
      t !== q && (Fu(e, ht(t, rt)), Xa(e, Mr()), (Ut & ($n | Ao)) === wn && (ev(), Hs()));
    }
    function l0(e, t) {
      var a = Ut;
      Ut |= Tx;
      try {
        return e(t);
      } finally {
        Ut = a, Ut === wn && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !vi.isBatchingLegacy && (ev(), z1());
      }
    }
    function U4(e, t, a, o, l) {
      var u = Sa(), d = In.transition;
      try {
        return In.transition = null, Xr(sa), e(t, a, o, l);
      } finally {
        Xr(u), In.transition = d, Ut === wn && ev();
      }
    }
    function Ql(e) {
      qs !== null && qs.tag === Fs && (Ut & ($n | Ao)) === wn && Wl();
      var t = Ut;
      Ut |= Tx;
      var a = In.transition, o = Sa();
      try {
        return In.transition = null, Xr(sa), e ? e() : void 0;
      } finally {
        Xr(o), In.transition = a, Ut = t, (Ut & ($n | Ao)) === wn && Hs();
      }
    }
    function Ax() {
      return (Ut & ($n | Ao)) !== wn;
    }
    function Zm(e, t) {
      da(Zw, Ji, e), Ji = ht(Ji, t);
    }
    function s0(e) {
      Ji = Zw.current, ca(Zw, e);
    }
    function hc(e, t) {
      e.finishedWork = null, e.finishedLanes = q;
      var a = e.timeoutHandle;
      if (a !== ay && (e.timeoutHandle = ay, uk(a)), jr !== null)
        for (var o = jr.return; o !== null; ) {
          var l = o.alternate;
          cx(l, o), o = o.return;
        }
      Ra = e;
      var u = gc(e.current, null);
      return jr = u, bn = Ji = t, xn = Il, Kp = null, Qm = q, Jp = q, Wm = q, Zp = null, Wa = null, zE(), ii.discardPendingWarnings(), u;
    }
    function Ux(e, t) {
      do {
        var a = jr;
        try {
          if (um(), ib(), Tr(), Kw.current = null, a === null || a.return === null) {
            xn = qp, Kp = t, jr = null;
            return;
          }
          if (pe && a.mode & Lt && Pm(a, !0), he)
            if (Oi(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var o = t;
              Ru(a, o, bn);
            } else
              Ro(a, t, bn);
          iC(e, a.return, a, t, bn), Hx(a);
        } catch (l) {
          t = l, jr === a && a !== null ? (a = a.return, jr = a) : a = jr;
          continue;
        }
        return;
      } while (!0);
    }
    function jx() {
      var e = Gw.current;
      return Gw.current = Mm, e === null ? Mm : e;
    }
    function Px(e) {
      Gw.current = e;
    }
    function j4() {
      e0 = Mr();
    }
    function av(e) {
      Qm = ht(e, Qm);
    }
    function P4() {
      xn === Il && (xn = $m);
    }
    function u0() {
      (xn === Il || xn === $m || xn === pc) && (xn = Gp), Ra !== null && (Ai(Qm) || Ai(Jp)) && Ks(Ra, bn);
    }
    function F4(e) {
      xn !== Gp && (xn = pc), Zp === null ? Zp = [e] : Zp.push(e);
    }
    function H4() {
      return xn === Il;
    }
    function eg(e, t) {
      var a = Ut;
      Ut |= $n;
      var o = jx();
      if (Ra !== e || bn !== t) {
        if (_n) {
          var l = e.memoizedUpdaters;
          l.size > 0 && (ov(e, bn), l.clear()), qf(e, t);
        }
        $l = vd(), hc(e, t);
      }
      Pf(t);
      do
        try {
          B4();
          break;
        } catch (u) {
          Ux(e, u);
        }
      while (!0);
      if (um(), Ut = a, Px(o), jr !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return Sr(), Ra = null, bn = q, xn;
    }
    function B4() {
      for (; jr !== null; )
        Fx(jr);
    }
    function V4(e, t) {
      var a = Ut;
      Ut |= $n;
      var o = jx();
      if (Ra !== e || bn !== t) {
        if (_n) {
          var l = e.memoizedUpdaters;
          l.size > 0 && (ov(e, bn), l.clear()), qf(e, t);
        }
        $l = vd(), ev(), hc(e, t);
      }
      Pf(t);
      do
        try {
          Y4();
          break;
        } catch (u) {
          Ux(e, u);
        }
      while (!0);
      return um(), Px(o), Ut = a, jr !== null ? (Ff(), Il) : (Sr(), Ra = null, bn = q, xn);
    }
    function Y4() {
      for (; jr !== null && !Of(); )
        Fx(jr);
    }
    function Fx(e) {
      var t = e.alternate;
      tr(e);
      var a;
      (e.mode & Lt) !== Qe ? (fw(e), a = c0(t, e, Ji), Pm(e, !0)) : a = c0(t, e, Ji), Tr(), e.memoizedProps = e.pendingProps, a === null ? Hx(e) : jr = a, Kw.current = null;
    }
    function Hx(e) {
      var t = e;
      do {
        var a = t.alternate, o = t.return;
        if ((t.flags & gl) === $e) {
          tr(t);
          var l = void 0;
          if ((t.mode & Lt) === Qe ? l = ux(a, t, Ji) : (fw(t), l = ux(a, t, Ji), Pm(t, !1)), Tr(), l !== null) {
            jr = l;
            return;
          }
        } else {
          var u = PC(a, t);
          if (u !== null) {
            u.flags &= Qv, jr = u;
            return;
          }
          if ((t.mode & Lt) !== Qe) {
            Pm(t, !1);
            for (var d = t.actualDuration, p = t.child; p !== null; )
              d += p.actualDuration, p = p.sibling;
            t.actualDuration = d;
          }
          if (o !== null)
            o.flags |= gl, o.subtreeFlags = $e, o.deletions = null;
          else {
            xn = Jw, jr = null;
            return;
          }
        }
        var v = t.sibling;
        if (v !== null) {
          jr = v;
          return;
        }
        t = o, jr = t;
      } while (t !== null);
      xn === Il && (xn = Rx);
    }
    function mc(e, t, a) {
      var o = Sa(), l = In.transition;
      try {
        In.transition = null, Xr(sa), I4(e, t, a, o);
      } finally {
        In.transition = l, Xr(o);
      }
      return null;
    }
    function I4(e, t, a, o) {
      do
        Wl();
      while (qs !== null);
      if (tT(), (Ut & ($n | Ao)) !== wn)
        throw new Error("Should not already be working.");
      var l = e.finishedWork, u = e.finishedLanes;
      if (Jv(u), l === null)
        return To(), null;
      if (u === q && g("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = q, l === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = Yr;
      var d = ht(l.lanes, l.childLanes);
      sh(e, d), e === Ra && (Ra = null, jr = null, bn = q), ((l.subtreeFlags & cn) !== $e || (l.flags & cn) !== $e) && (vc || (vc = !0, n0 = a, p0(wl, function() {
        return Wl(), null;
      })));
      var p = (l.subtreeFlags & (Ri | ms | _i | cn)) !== $e, v = (l.flags & (Ri | ms | _i | cn)) !== $e;
      if (p || v) {
        var w = In.transition;
        In.transition = null;
        var x = Sa();
        Xr(sa);
        var z = Ut;
        Ut |= Ao, Kw.current = null, YC(e, l), zb(), n4(e, l, u), rk(e.containerInfo), e.current = l, _u(u), a4(l, e, u), xl(), Xv(), Ut = z, Xr(x), In.transition = w;
      } else
        e.current = l, zb();
      var D = vc;
      if (vc ? (vc = !1, qs = e, tv = u) : (af = 0, Gm = null), d = e.pendingLanes, d === q && (nf = null), D || Ix(e.current, !1), Mf(l.stateNode, o), _n && e.memoizedUpdaters.clear(), k4(), Xa(e, Mr()), t !== null)
        for (var F = e.onRecoverableError, V = 0; V < t.length; V++) {
          var Q = t[V], ke = Q.stack, Ke = Q.digest;
          F(Q.value, {
            componentStack: ke,
            digest: Ke
          });
        }
      if (Xm) {
        Xm = !1;
        var Ie = t0;
        throw t0 = null, Ie;
      }
      return la(tv, rt) && e.tag !== Fs && Wl(), d = e.pendingLanes, la(d, rt) ? (qE(), e === a0 ? rv++ : (rv = 0, a0 = e)) : rv = 0, Hs(), To(), null;
    }
    function Wl() {
      if (qs !== null) {
        var e = dh(tv), t = Dn(fn, e), a = In.transition, o = Sa();
        try {
          return In.transition = null, Xr(t), Q4();
        } finally {
          Xr(o), In.transition = a;
        }
      }
      return !1;
    }
    function $4(e) {
      r0.push(e), vc || (vc = !0, p0(wl, function() {
        return Wl(), null;
      }));
    }
    function Q4() {
      if (qs === null)
        return !1;
      var e = n0;
      n0 = null;
      var t = qs, a = tv;
      if (qs = null, tv = q, (Ut & ($n | Ao)) !== wn)
        throw new Error("Cannot flush passive effects while already rendering.");
      o0 = !0, qm = !1, jf(a);
      var o = Ut;
      Ut |= Ao, d4(t.current), l4(t, t.current, a, e);
      {
        var l = r0;
        r0 = [];
        for (var u = 0; u < l.length; u++) {
          var d = l[u];
          WC(t, d);
        }
      }
      bs(), Ix(t.current, !0), Ut = o, Hs(), qm ? t === Gm ? af++ : (af = 0, Gm = t) : af = 0, o0 = !1, qm = !1, Nf(t);
      {
        var p = t.current.stateNode;
        p.effectDuration = 0, p.passiveEffectDuration = 0;
      }
      return !0;
    }
    function Bx(e) {
      return nf !== null && nf.has(e);
    }
    function W4(e) {
      nf === null ? nf = /* @__PURE__ */ new Set([e]) : nf.add(e);
    }
    function X4(e) {
      Xm || (Xm = !0, t0 = e);
    }
    var q4 = X4;
    function Vx(e, t, a) {
      var o = dc(a, t), l = Fb(e, o, rt), u = Vs(e, l, rt), d = _a();
      u !== null && (Cs(u, rt, d), Xa(u, d));
    }
    function wr(e, t, a) {
      if (HC(a), iv(!1), e.tag === J) {
        Vx(e, e, a);
        return;
      }
      var o = null;
      for (o = t; o !== null; ) {
        if (o.tag === J) {
          Vx(o, e, a);
          return;
        } else if (o.tag === I) {
          var l = o.type, u = o.stateNode;
          if (typeof l.getDerivedStateFromError == "function" || typeof u.componentDidCatch == "function" && !Bx(u)) {
            var d = dc(a, e), p = Ow(o, d, rt), v = Vs(o, p, rt), w = _a();
            v !== null && (Cs(v, rt, w), Xa(v, w));
            return;
          }
        }
        o = o.return;
      }
      g(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, a);
    }
    function G4(e, t, a) {
      var o = e.pingCache;
      o !== null && o.delete(t);
      var l = _a();
      fd(e, a), oT(e), Ra === e && Tl(bn, a) && (xn === Gp || xn === $m && sd(bn) && Mr() - e0 < _x ? hc(e, q) : Wm = ht(Wm, a)), Xa(e, l);
    }
    function Yx(e, t) {
      t === Yr && (t = O4(e));
      var a = _a(), o = $a(e, t);
      o !== null && (Cs(o, t, a), Xa(o, a));
    }
    function K4(e) {
      var t = e.memoizedState, a = Yr;
      t !== null && (a = t.retryLane), Yx(e, a);
    }
    function J4(e, t) {
      var a = Yr, o;
      switch (e.tag) {
        case be:
          o = e.stateNode;
          var l = e.memoizedState;
          l !== null && (a = l.retryLane);
          break;
        case zt:
          o = e.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      o !== null && o.delete(t), Yx(e, a);
    }
    function Z4(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : T4(e / 1960) * 1960;
    }
    function eT() {
      if (rv > _4)
        throw rv = 0, a0 = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      af > D4 && (af = 0, Gm = null, g("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function tT() {
      ii.flushLegacyContextWarning(), ii.flushPendingUnsafeLifecycleWarnings();
    }
    function Ix(e, t) {
      tr(e), tg(e, An, b4), t && tg(e, Ti, x4), tg(e, An, y4), t && tg(e, Ti, w4), Tr();
    }
    function tg(e, t, a) {
      for (var o = e, l = null; o !== null; ) {
        var u = o.subtreeFlags & t;
        o !== l && o.child !== null && u !== $e ? o = o.child : ((o.flags & t) !== $e && a(o), o.sibling !== null ? o = o.sibling : o = l = o.return);
      }
    }
    var rg = null;
    function $x(e) {
      {
        if ((Ut & $n) !== wn || !(e.mode & Et))
          return;
        var t = e.tag;
        if (t !== fe && t !== J && t !== I && t !== ee && t !== Me && t !== it && t !== qe)
          return;
        var a = lt(e) || "ReactComponent";
        if (rg !== null) {
          if (rg.has(a))
            return;
          rg.add(a);
        } else
          rg = /* @__PURE__ */ new Set([a]);
        var o = tn;
        try {
          tr(e), g("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          o ? tr(e) : Tr();
        }
      }
    }
    var c0;
    {
      var rT = null;
      c0 = function(e, t, a) {
        var o = Zx(rT, t);
        try {
          return ax(e, t, a);
        } catch (u) {
          if (vE() || u !== null && typeof u == "object" && typeof u.then == "function")
            throw u;
          if (um(), ib(), cx(e, t), Zx(t, o), t.mode & Lt && fw(t), ja(null, ax, null, e, t, a), kf()) {
            var l = Ef();
            typeof l == "object" && l !== null && l._suppressLogging && typeof u == "object" && u !== null && !u._suppressLogging && (u._suppressLogging = !0);
          }
          throw u;
        }
      };
    }
    var Qx = !1, d0;
    d0 = /* @__PURE__ */ new Set();
    function nT(e) {
      if (Zn && !QE())
        switch (e.tag) {
          case ee:
          case Me:
          case qe: {
            var t = jr && lt(jr) || "Unknown", a = t;
            if (!d0.has(a)) {
              d0.add(a);
              var o = lt(e) || "Unknown";
              g("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", o, t, t);
            }
            break;
          }
          case I: {
            Qx || (g("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), Qx = !0);
            break;
          }
        }
    }
    function ov(e, t) {
      if (_n) {
        var a = e.memoizedUpdaters;
        a.forEach(function(o) {
          uh(e, o, t);
        });
      }
    }
    var f0 = {};
    function p0(e, t) {
      {
        var a = vi.current;
        return a !== null ? (a.push(t), f0) : _f(e, t);
      }
    }
    function Wx(e) {
      if (e !== f0)
        return Df(e);
    }
    function Xx() {
      return vi.current !== null;
    }
    function aT(e) {
      {
        if (e.mode & Et) {
          if (!Cx())
            return;
        } else if (!C4() || Ut !== wn || e.tag !== ee && e.tag !== Me && e.tag !== qe)
          return;
        if (vi.current === null) {
          var t = tn;
          try {
            tr(e), g(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, lt(e));
          } finally {
            t ? tr(e) : Tr();
          }
        }
      }
    }
    function oT(e) {
      e.tag !== Fs && Cx() && vi.current === null && g(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function iv(e) {
      zx = e;
    }
    var Uo = null, of = null, iT = function(e) {
      Uo = e;
    };
    function lf(e) {
      {
        if (Uo === null)
          return e;
        var t = Uo(e);
        return t === void 0 ? e : t.current;
      }
    }
    function v0(e) {
      return lf(e);
    }
    function h0(e) {
      {
        if (Uo === null)
          return e;
        var t = Uo(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var a = lf(e.render);
            if (e.render !== a) {
              var o = {
                $$typeof: te,
                render: a
              };
              return e.displayName !== void 0 && (o.displayName = e.displayName), o;
            }
          }
          return e;
        }
        return t.current;
      }
    }
    function qx(e, t) {
      {
        if (Uo === null)
          return !1;
        var a = e.elementType, o = t.type, l = !1, u = typeof o == "object" && o !== null ? o.$$typeof : null;
        switch (e.tag) {
          case I: {
            typeof o == "function" && (l = !0);
            break;
          }
          case ee: {
            (typeof o == "function" || u === ut) && (l = !0);
            break;
          }
          case Me: {
            (u === te || u === ut) && (l = !0);
            break;
          }
          case it:
          case qe: {
            (u === kt || u === ut) && (l = !0);
            break;
          }
          default:
            return !1;
        }
        if (l) {
          var d = Uo(a);
          if (d !== void 0 && d === Uo(o))
            return !0;
        }
        return !1;
      }
    }
    function Gx(e) {
      {
        if (Uo === null || typeof WeakSet != "function")
          return;
        of === null && (of = /* @__PURE__ */ new WeakSet()), of.add(e);
      }
    }
    var lT = function(e, t) {
      {
        if (Uo === null)
          return;
        var a = t.staleFamilies, o = t.updatedFamilies;
        Wl(), Ql(function() {
          m0(e.current, o, a);
        });
      }
    }, sT = function(e, t) {
      {
        if (e.context !== uo)
          return;
        Wl(), Ql(function() {
          lv(t, e, null, null);
        });
      }
    };
    function m0(e, t, a) {
      {
        var o = e.alternate, l = e.child, u = e.sibling, d = e.tag, p = e.type, v = null;
        switch (d) {
          case ee:
          case qe:
          case I:
            v = p;
            break;
          case Me:
            v = p.render;
            break;
        }
        if (Uo === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var w = !1, x = !1;
        if (v !== null) {
          var z = Uo(v);
          z !== void 0 && (a.has(z) ? x = !0 : t.has(z) && (d === I ? x = !0 : w = !0));
        }
        if (of !== null && (of.has(e) || o !== null && of.has(o)) && (x = !0), x && (e._debugNeedsRemount = !0), x || w) {
          var D = $a(e, rt);
          D !== null && Sn(D, e, rt, Zt);
        }
        l !== null && !x && m0(l, t, a), u !== null && m0(u, t, a);
      }
    }
    var uT = function(e, t) {
      {
        var a = /* @__PURE__ */ new Set(), o = new Set(t.map(function(l) {
          return l.current;
        }));
        return g0(e.current, o, a), a;
      }
    };
    function g0(e, t, a) {
      {
        var o = e.child, l = e.sibling, u = e.tag, d = e.type, p = null;
        switch (u) {
          case ee:
          case qe:
          case I:
            p = d;
            break;
          case Me:
            p = d.render;
            break;
        }
        var v = !1;
        p !== null && t.has(p) && (v = !0), v ? cT(e, a) : o !== null && g0(o, t, a), l !== null && g0(l, t, a);
      }
    }
    function cT(e, t) {
      {
        var a = dT(e, t);
        if (a)
          return;
        for (var o = e; ; ) {
          switch (o.tag) {
            case ae:
              t.add(o.stateNode);
              return;
            case De:
              t.add(o.stateNode.containerInfo);
              return;
            case J:
              t.add(o.stateNode.containerInfo);
              return;
          }
          if (o.return === null)
            throw new Error("Expected to reach root first.");
          o = o.return;
        }
      }
    }
    function dT(e, t) {
      for (var a = e, o = !1; ; ) {
        if (a.tag === ae)
          o = !0, t.add(a.stateNode);
        else if (a.child !== null) {
          a.child.return = a, a = a.child;
          continue;
        }
        if (a === e)
          return o;
        for (; a.sibling === null; ) {
          if (a.return === null || a.return === e)
            return o;
          a = a.return;
        }
        a.sibling.return = a.return, a = a.sibling;
      }
      return !1;
    }
    var y0;
    {
      y0 = !1;
      try {
        var Kx = Object.preventExtensions({});
      } catch {
        y0 = !0;
      }
    }
    function fT(e, t, a, o) {
      this.tag = e, this.key = a, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = o, this.flags = $e, this.subtreeFlags = $e, this.deletions = null, this.lanes = q, this.childLanes = q, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !y0 && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var co = function(e, t, a, o) {
      return new fT(e, t, a, o);
    };
    function w0(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function pT(e) {
      return typeof e == "function" && !w0(e) && e.defaultProps === void 0;
    }
    function vT(e) {
      if (typeof e == "function")
        return w0(e) ? I : ee;
      if (e != null) {
        var t = e.$$typeof;
        if (t === te)
          return Me;
        if (t === kt)
          return it;
      }
      return fe;
    }
    function gc(e, t) {
      var a = e.alternate;
      a === null ? (a = co(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugSource = e._debugSource, a._debugOwner = e._debugOwner, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = $e, a.subtreeFlags = $e, a.deletions = null, a.actualDuration = 0, a.actualStartTime = -1), a.flags = e.flags & Vr, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue;
      var o = e.dependencies;
      switch (a.dependencies = o === null ? null : {
        lanes: o.lanes,
        firstContext: o.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case fe:
        case ee:
        case qe:
          a.type = lf(e.type);
          break;
        case I:
          a.type = v0(e.type);
          break;
        case Me:
          a.type = h0(e.type);
          break;
      }
      return a;
    }
    function hT(e, t) {
      e.flags &= Vr | Rr;
      var a = e.alternate;
      if (a === null)
        e.childLanes = q, e.lanes = t, e.child = null, e.subtreeFlags = $e, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = $e, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type;
        var o = a.dependencies;
        e.dependencies = o === null ? null : {
          lanes: o.lanes,
          firstContext: o.firstContext
        }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration;
      }
      return e;
    }
    function mT(e, t, a) {
      var o;
      return e === Zh ? (o = Et, t === !0 && (o |= pt, o |= ar)) : o = Qe, _n && (o |= Lt), co(J, null, null, o);
    }
    function b0(e, t, a, o, l, u) {
      var d = fe, p = e;
      if (typeof e == "function")
        w0(e) ? (d = I, p = v0(p)) : p = lf(p);
      else if (typeof e == "string")
        d = ae;
      else
        e: switch (e) {
          case Gn:
            return Js(a.children, l, u, t);
          case mo:
            d = et, l |= pt, (l & Et) !== Qe && (l |= ar);
            break;
          case go:
            return gT(a, l, u, t);
          case Se:
            return yT(a, l, u, t);
          case Te:
            return wT(a, l, u, t);
          case zr:
            return Jx(a, l, u, t);
          case pr:
          case Tt:
          case gr:
          case En:
          case yt:
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case Vo:
                  d = Pe;
                  break e;
                case R:
                  d = ot;
                  break e;
                case te:
                  d = Me, p = h0(p);
                  break e;
                case kt:
                  d = it;
                  break e;
                case ut:
                  d = Wt, p = null;
                  break e;
              }
            var v = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (v += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var w = o ? lt(o) : null;
              w && (v += `

Check the render method of \`` + w + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + v));
          }
        }
      var x = co(d, a, t, l);
      return x.elementType = e, x.type = p, x.lanes = u, x._debugOwner = o, x;
    }
    function x0(e, t, a) {
      var o = null;
      o = e._owner;
      var l = e.type, u = e.key, d = e.props, p = b0(l, u, d, o, t, a);
      return p._debugSource = e._source, p._debugOwner = e._owner, p;
    }
    function Js(e, t, a, o) {
      var l = co(ue, e, o, t);
      return l.lanes = a, l;
    }
    function gT(e, t, a, o) {
      typeof e.id != "string" && g('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var l = co(G, e, o, t | Lt);
      return l.elementType = go, l.lanes = a, l.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, l;
    }
    function yT(e, t, a, o) {
      var l = co(be, e, o, t);
      return l.elementType = Se, l.lanes = a, l;
    }
    function wT(e, t, a, o) {
      var l = co(zt, e, o, t);
      return l.elementType = Te, l.lanes = a, l;
    }
    function Jx(e, t, a, o) {
      var l = co(We, e, o, t);
      l.elementType = zr, l.lanes = a;
      var u = {
        isHidden: !1
      };
      return l.stateNode = u, l;
    }
    function S0(e, t, a) {
      var o = co(H, e, null, t);
      return o.lanes = a, o;
    }
    function bT() {
      var e = co(ae, null, null, Qe);
      return e.elementType = "DELETED", e;
    }
    function xT(e) {
      var t = co(Vt, null, null, Qe);
      return t.stateNode = e, t;
    }
    function k0(e, t, a) {
      var o = e.children !== null ? e.children : [], l = co(De, o, e.key, t);
      return l.lanes = a, l.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, l;
    }
    function Zx(e, t) {
      return e === null && (e = co(fe, null, null, Qe)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function ST(e, t, a, o, l) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = ay, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Yr, this.eventTimes = dd(q), this.expirationTimes = dd(Zt), this.pendingLanes = q, this.suspendedLanes = q, this.pingedLanes = q, this.expiredLanes = q, this.mutableReadLanes = q, this.finishedLanes = q, this.entangledLanes = q, this.entanglements = dd(q), this.identifierPrefix = o, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var u = this.pendingUpdatersLaneMap = [], d = 0; d < Bf; d++)
          u.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case Zh:
          this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
          break;
        case Fs:
          this._debugRootType = a ? "hydrate()" : "render()";
          break;
      }
    }
    function e5(e, t, a, o, l, u, d, p, v, w) {
      var x = new ST(e, t, a, p, v), z = mT(t, u);
      x.current = z, z.stateNode = x;
      {
        var D = {
          element: o,
          isDehydrated: a,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        z.memoizedState = D;
      }
      return Uy(z), x;
    }
    var E0 = "18.3.1";
    function kT(e, t, a) {
      var o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return ha(o), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: wa,
        key: o == null ? null : "" + o,
        children: e,
        containerInfo: t,
        implementation: a
      };
    }
    var C0, T0;
    C0 = !1, T0 = {};
    function t5(e) {
      if (!e)
        return uo;
      var t = hs(e), a = oE(t);
      if (t.tag === I) {
        var o = t.type;
        if ($i(o))
          return _1(t, o, a);
      }
      return a;
    }
    function ET(e, t) {
      {
        var a = hs(e);
        if (a === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var o = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + o);
        }
        var l = na(a);
        if (l === null)
          return null;
        if (l.mode & pt) {
          var u = lt(a) || "Component";
          if (!T0[u]) {
            T0[u] = !0;
            var d = tn;
            try {
              tr(l), a.mode & pt ? g("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, u) : g("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, u);
            } finally {
              d ? tr(d) : Tr();
            }
          }
        }
        return l.stateNode;
      }
    }
    function r5(e, t, a, o, l, u, d, p) {
      var v = !1, w = null;
      return e5(e, t, v, w, a, o, l, u, d);
    }
    function n5(e, t, a, o, l, u, d, p, v, w) {
      var x = !0, z = e5(a, o, x, e, l, u, d, p, v);
      z.context = t5(null);
      var D = z.current, F = _a(), V = Gs(D), Q = Vl(F, V);
      return Q.callback = t ?? null, Vs(D, Q, V), z4(z, V, F), z;
    }
    function lv(e, t, a, o) {
      Lf(t, e);
      var l = t.current, u = _a(), d = Gs(l);
      Vc(d);
      var p = t5(a);
      t.context === null ? t.context = p : t.pendingContext = p, Zn && tn !== null && !C0 && (C0 = !0, g(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, lt(tn) || "Unknown"));
      var v = Vl(u, d);
      v.payload = {
        element: e
      }, o = o === void 0 ? null : o, o !== null && (typeof o != "function" && g("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", o), v.callback = o);
      var w = Vs(l, v, d);
      return w !== null && (Sn(w, l, d, u), vm(w, l, d)), d;
    }
    function ng(e) {
      var t = e.current;
      if (!t.child)
        return null;
      switch (t.child.tag) {
        case ae:
          return t.child.stateNode;
        default:
          return t.child.stateNode;
      }
    }
    function CT(e) {
      switch (e.tag) {
        case J: {
          var t = e.stateNode;
          if (Rl(t)) {
            var a = oh(t);
            A4(t, a);
          }
          break;
        }
        case be: {
          Ql(function() {
            var l = $a(e, rt);
            if (l !== null) {
              var u = _a();
              Sn(l, e, rt, u);
            }
          });
          var o = rt;
          R0(e, o);
          break;
        }
      }
    }
    function a5(e, t) {
      var a = e.memoizedState;
      a !== null && a.dehydrated !== null && (a.retryLane = Wf(a.retryLane, t));
    }
    function R0(e, t) {
      a5(e, t);
      var a = e.alternate;
      a && a5(a, t);
    }
    function TT(e) {
      if (e.tag === be) {
        var t = Es, a = $a(e, t);
        if (a !== null) {
          var o = _a();
          Sn(a, e, t, o);
        }
        R0(e, t);
      }
    }
    function RT(e) {
      if (e.tag === be) {
        var t = Gs(e), a = $a(e, t);
        if (a !== null) {
          var o = _a();
          Sn(a, e, t, o);
        }
        R0(e, t);
      }
    }
    function o5(e) {
      var t = oo(e);
      return t === null ? null : t.stateNode;
    }
    var i5 = function(e) {
      return null;
    };
    function _T(e) {
      return i5(e);
    }
    var l5 = function(e) {
      return !1;
    };
    function DT(e) {
      return l5(e);
    }
    var s5 = null, u5 = null, c5 = null, d5 = null, f5 = null, p5 = null, v5 = null, h5 = null, m5 = null;
    {
      var g5 = function(e, t, a) {
        var o = t[a], l = vt(e) ? e.slice() : ft({}, e);
        return a + 1 === t.length ? (vt(l) ? l.splice(o, 1) : delete l[o], l) : (l[o] = g5(e[o], t, a + 1), l);
      }, y5 = function(e, t) {
        return g5(e, t, 0);
      }, w5 = function(e, t, a, o) {
        var l = t[o], u = vt(e) ? e.slice() : ft({}, e);
        if (o + 1 === t.length) {
          var d = a[o];
          u[d] = u[l], vt(u) ? u.splice(l, 1) : delete u[l];
        } else
          u[l] = w5(
            // $FlowFixMe number or string is fine here
            e[l],
            t,
            a,
            o + 1
          );
        return u;
      }, b5 = function(e, t, a) {
        if (t.length !== a.length) {
          Z("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var o = 0; o < a.length - 1; o++)
            if (t[o] !== a[o]) {
              Z("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return w5(e, t, a, 0);
      }, x5 = function(e, t, a, o) {
        if (a >= t.length)
          return o;
        var l = t[a], u = vt(e) ? e.slice() : ft({}, e);
        return u[l] = x5(e[l], t, a + 1, o), u;
      }, S5 = function(e, t, a) {
        return x5(e, t, 0, a);
      }, _0 = function(e, t) {
        for (var a = e.memoizedState; a !== null && t > 0; )
          a = a.next, t--;
        return a;
      };
      s5 = function(e, t, a, o) {
        var l = _0(e, t);
        if (l !== null) {
          var u = S5(l.memoizedState, a, o);
          l.memoizedState = u, l.baseState = u, e.memoizedProps = ft({}, e.memoizedProps);
          var d = $a(e, rt);
          d !== null && Sn(d, e, rt, Zt);
        }
      }, u5 = function(e, t, a) {
        var o = _0(e, t);
        if (o !== null) {
          var l = y5(o.memoizedState, a);
          o.memoizedState = l, o.baseState = l, e.memoizedProps = ft({}, e.memoizedProps);
          var u = $a(e, rt);
          u !== null && Sn(u, e, rt, Zt);
        }
      }, c5 = function(e, t, a, o) {
        var l = _0(e, t);
        if (l !== null) {
          var u = b5(l.memoizedState, a, o);
          l.memoizedState = u, l.baseState = u, e.memoizedProps = ft({}, e.memoizedProps);
          var d = $a(e, rt);
          d !== null && Sn(d, e, rt, Zt);
        }
      }, d5 = function(e, t, a) {
        e.pendingProps = S5(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var o = $a(e, rt);
        o !== null && Sn(o, e, rt, Zt);
      }, f5 = function(e, t) {
        e.pendingProps = y5(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var a = $a(e, rt);
        a !== null && Sn(a, e, rt, Zt);
      }, p5 = function(e, t, a) {
        e.pendingProps = b5(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var o = $a(e, rt);
        o !== null && Sn(o, e, rt, Zt);
      }, v5 = function(e) {
        var t = $a(e, rt);
        t !== null && Sn(t, e, rt, Zt);
      }, h5 = function(e) {
        i5 = e;
      }, m5 = function(e) {
        l5 = e;
      };
    }
    function OT(e) {
      var t = na(e);
      return t === null ? null : t.stateNode;
    }
    function zT(e) {
      return null;
    }
    function LT() {
      return tn;
    }
    function MT(e) {
      var t = e.findFiberByHostInstance, a = C.ReactCurrentDispatcher;
      return zf({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: s5,
        overrideHookStateDeletePath: u5,
        overrideHookStateRenamePath: c5,
        overrideProps: d5,
        overridePropsDeletePath: f5,
        overridePropsRenamePath: p5,
        setErrorHandler: h5,
        setSuspenseHandler: m5,
        scheduleUpdate: v5,
        currentDispatcherRef: a,
        findHostInstanceByFiber: OT,
        findFiberByHostInstance: t || zT,
        // React Refresh
        findHostInstancesForRefresh: uT,
        scheduleRefresh: lT,
        scheduleRoot: sT,
        setRefreshHandler: iT,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: LT,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: E0
      });
    }
    var k5 = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function D0(e) {
      this._internalRoot = e;
    }
    ag.prototype.render = D0.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? g("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : og(arguments[1]) ? g("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && g("You passed a second argument to root.render(...) but it only accepts one argument.");
        var a = t.containerInfo;
        if (a.nodeType !== Hr) {
          var o = o5(t.current);
          o && o.parentNode !== a && g("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      lv(e, t, null, null);
    }, ag.prototype.unmount = D0.prototype.unmount = function() {
      typeof arguments[0] == "function" && g("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        Ax() && g("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Ql(function() {
          lv(null, e, null, null);
        }), k1(t);
      }
    };
    function NT(e, t) {
      if (!og(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      E5(e);
      var a = !1, o = !1, l = "", u = k5;
      t != null && (t.hydrate ? Z("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === un && g(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onRecoverableError !== void 0 && (u = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var d = r5(e, Zh, null, a, o, l, u);
      Qh(d.current, e);
      var p = e.nodeType === Hr ? e.parentNode : e;
      return pp(p), new D0(d);
    }
    function ag(e) {
      this._internalRoot = e;
    }
    function AT(e) {
      e && mh(e);
    }
    ag.prototype.unstable_scheduleHydration = AT;
    function UT(e, t, a) {
      if (!og(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      E5(e), t === void 0 && g("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var o = a ?? null, l = a != null && a.hydratedSources || null, u = !1, d = !1, p = "", v = k5;
      a != null && (a.unstable_strictMode === !0 && (u = !0), a.identifierPrefix !== void 0 && (p = a.identifierPrefix), a.onRecoverableError !== void 0 && (v = a.onRecoverableError));
      var w = n5(t, null, e, Zh, o, u, d, p, v);
      if (Qh(w.current, e), pp(e), l)
        for (var x = 0; x < l.length; x++) {
          var z = l[x];
          HE(w, z);
        }
      return new ag(w);
    }
    function og(e) {
      return !!(e && (e.nodeType === ea || e.nodeType === Ko || e.nodeType === uu));
    }
    function sv(e) {
      return !!(e && (e.nodeType === ea || e.nodeType === Ko || e.nodeType === uu || e.nodeType === Hr && e.nodeValue === " react-mount-point-unstable "));
    }
    function E5(e) {
      e.nodeType === ea && e.tagName && e.tagName.toUpperCase() === "BODY" && g("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), Ep(e) && (e._reactRootContainer ? g("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : g("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var jT = C.ReactCurrentOwner, C5;
    C5 = function(e) {
      if (e._reactRootContainer && e.nodeType !== Hr) {
        var t = o5(e._reactRootContainer.current);
        t && t.parentNode !== e && g("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var a = !!e._reactRootContainer, o = O0(e), l = !!(o && js(o));
      l && !a && g("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === ea && e.tagName && e.tagName.toUpperCase() === "BODY" && g("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function O0(e) {
      return e ? e.nodeType === Ko ? e.documentElement : e.firstChild : null;
    }
    function T5() {
    }
    function PT(e, t, a, o, l) {
      if (l) {
        if (typeof o == "function") {
          var u = o;
          o = function() {
            var D = ng(d);
            u.call(D);
          };
        }
        var d = n5(
          t,
          o,
          e,
          Fs,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          T5
        );
        e._reactRootContainer = d, Qh(d.current, e);
        var p = e.nodeType === Hr ? e.parentNode : e;
        return pp(p), Ql(), d;
      } else {
        for (var v; v = e.lastChild; )
          e.removeChild(v);
        if (typeof o == "function") {
          var w = o;
          o = function() {
            var D = ng(x);
            w.call(D);
          };
        }
        var x = r5(
          e,
          Fs,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          T5
        );
        e._reactRootContainer = x, Qh(x.current, e);
        var z = e.nodeType === Hr ? e.parentNode : e;
        return pp(z), Ql(function() {
          lv(t, x, a, o);
        }), x;
      }
    }
    function FT(e, t) {
      e !== null && typeof e != "function" && g("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function ig(e, t, a, o, l) {
      C5(a), FT(l === void 0 ? null : l, "render");
      var u = a._reactRootContainer, d;
      if (!u)
        d = PT(a, t, e, l, o);
      else {
        if (d = u, typeof l == "function") {
          var p = l;
          l = function() {
            var v = ng(d);
            p.call(v);
          };
        }
        lv(t, d, e, l);
      }
      return ng(d);
    }
    var R5 = !1;
    function HT(e) {
      {
        R5 || (R5 = !0, g("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var t = jT.current;
        if (t !== null && t.stateNode !== null) {
          var a = t.stateNode._warnedAboutRefsInRender;
          a || g("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", At(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === ea ? e : ET(e, "findDOMNode");
    }
    function BT(e, t, a) {
      if (g("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !sv(t))
        throw new Error("Target container is not a DOM element.");
      {
        var o = Ep(t) && t._reactRootContainer === void 0;
        o && g("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return ig(null, e, t, !0, a);
    }
    function VT(e, t, a) {
      if (g("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !sv(t))
        throw new Error("Target container is not a DOM element.");
      {
        var o = Ep(t) && t._reactRootContainer === void 0;
        o && g("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return ig(null, e, t, !1, a);
    }
    function YT(e, t, a, o) {
      if (g("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !sv(a))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !ml(e))
        throw new Error("parentComponent must be a valid React Component");
      return ig(e, t, a, !1, o);
    }
    var _5 = !1;
    function IT(e) {
      if (_5 || (_5 = !0, g("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !sv(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var t = Ep(e) && e._reactRootContainer === void 0;
        t && g("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var a = O0(e), o = a && !js(a);
          o && g("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return Ql(function() {
          ig(null, null, e, !1, function() {
            e._reactRootContainer = null, k1(e);
          });
        }), !0;
      } else {
        {
          var l = O0(e), u = !!(l && js(l)), d = e.nodeType === ea && sv(e.parentNode) && !!e.parentNode._reactRootContainer;
          u && g("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", d ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    Og(CT), Kf(TT), zg(RT), md(Sa), fh(ch), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && g("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), yu(QS), Iv(l0, U4, Ql);
    function $T(e, t) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!og(t))
        throw new Error("Target container is not a DOM element.");
      return kT(e, t, null, a);
    }
    function QT(e, t, a, o) {
      return YT(e, t, a, o);
    }
    var z0 = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [js, jd, Wh, xf, ds, l0]
    };
    function WT(e, t) {
      return z0.usingClientEntryPoint || g('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), NT(e, t);
    }
    function XT(e, t, a) {
      return z0.usingClientEntryPoint || g('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), UT(e, t, a);
    }
    function qT(e) {
      return Ax() && g("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Ql(e);
    }
    var GT = MT({
      findFiberByHostInstance: rc,
      bundleType: 1,
      version: E0,
      rendererPackageName: "react-dom"
    });
    if (!GT && Pt && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var D5 = window.location.protocol;
      /^(https?|file):$/.test(D5) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (D5 === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    Ga.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = z0, Ga.createPortal = $T, Ga.createRoot = WT, Ga.findDOMNode = HT, Ga.flushSync = qT, Ga.hydrate = BT, Ga.hydrateRoot = XT, Ga.render = VT, Ga.unmountComponentAtNode = IT, Ga.unstable_batchedUpdates = l0, Ga.unstable_renderSubtreeIntoContainer = QT, Ga.version = E0, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }(), Ga;
}
var G5 = {};
function K5() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
    if (G5.NODE_ENV !== "production")
      throw new Error("^_^");
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(K5);
    } catch (y) {
      console.error(y);
    }
  }
}
G5.NODE_ENV === "production" ? (K5(), Y0.exports = uR()) : Y0.exports = cR();
var dR = Y0.exports, fR = {}, fv = dR;
if (fR.NODE_ENV === "production")
  vv.createRoot = fv.createRoot, vv.hydrateRoot = fv.hydrateRoot;
else {
  var sg = fv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  vv.createRoot = function(y, S) {
    sg.usingClientEntryPoint = !0;
    try {
      return fv.createRoot(y, S);
    } finally {
      sg.usingClientEntryPoint = !1;
    }
  }, vv.hydrateRoot = function(y, S, b) {
    sg.usingClientEntryPoint = !0;
    try {
      return fv.hydrateRoot(y, S, b);
    } finally {
      sg.usingClientEntryPoint = !1;
    }
  };
}
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pR = (y) => y.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), J5 = (...y) => y.filter((S, b, C) => !!S && S.trim() !== "" && C.indexOf(S) === b).join(" ").trim();
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var vR = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hR = po.forwardRef(
  ({
    color: y = "currentColor",
    size: S = 24,
    strokeWidth: b = 2,
    absoluteStrokeWidth: C,
    className: L = "",
    children: Y,
    iconNode: Z,
    ...g
  }, oe) => po.createElement(
    "svg",
    {
      ref: oe,
      ...vR,
      width: S,
      height: S,
      stroke: y,
      strokeWidth: C ? Number(b) * 24 / Number(S) : b,
      className: J5("lucide", L),
      ...g
    },
    [
      ...Z.map(([ee, I]) => po.createElement(ee, I)),
      ...Array.isArray(Y) ? Y : [Y]
    ]
  )
);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $0 = (y, S) => {
  const b = po.forwardRef(
    ({ className: C, ...L }, Y) => po.createElement(hR, {
      ref: Y,
      iconNode: S,
      className: J5(`lucide-${pR(y)}`, C),
      ...L
    })
  );
  return b.displayName = `${y}`, b;
};
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mR = $0("Mail", [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gR = $0("Nfc", [
  ["path", { d: "M6 8.32a7.43 7.43 0 0 1 0 7.36", key: "9iaqei" }],
  ["path", { d: "M9.46 6.21a11.76 11.76 0 0 1 0 11.58", key: "1yha7l" }],
  ["path", { d: "M12.91 4.1a15.91 15.91 0 0 1 .01 15.8", key: "4iu2gk" }],
  ["path", { d: "M16.37 2a20.16 20.16 0 0 1 0 20", key: "sap9u2" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yR = $0("Phone", [
  [
    "path",
    {
      d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
      key: "foiqr5"
    }
  ]
]);
var pg = {}, I0 = { exports: {} }, ug = { exports: {} }, lr = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var F5;
function wR() {
  if (F5) return lr;
  F5 = 1;
  var y = typeof Symbol == "function" && Symbol.for, S = y ? Symbol.for("react.element") : 60103, b = y ? Symbol.for("react.portal") : 60106, C = y ? Symbol.for("react.fragment") : 60107, L = y ? Symbol.for("react.strict_mode") : 60108, Y = y ? Symbol.for("react.profiler") : 60114, Z = y ? Symbol.for("react.provider") : 60109, g = y ? Symbol.for("react.context") : 60110, oe = y ? Symbol.for("react.async_mode") : 60111, ee = y ? Symbol.for("react.concurrent_mode") : 60111, I = y ? Symbol.for("react.forward_ref") : 60112, fe = y ? Symbol.for("react.suspense") : 60113, J = y ? Symbol.for("react.suspense_list") : 60120, De = y ? Symbol.for("react.memo") : 60115, ae = y ? Symbol.for("react.lazy") : 60116, H = y ? Symbol.for("react.block") : 60121, ue = y ? Symbol.for("react.fundamental") : 60117, et = y ? Symbol.for("react.responder") : 60118, ot = y ? Symbol.for("react.scope") : 60119;
  function Pe(G) {
    if (typeof G == "object" && G !== null) {
      var be = G.$$typeof;
      switch (be) {
        case S:
          switch (G = G.type, G) {
            case oe:
            case ee:
            case C:
            case Y:
            case L:
            case fe:
              return G;
            default:
              switch (G = G && G.$$typeof, G) {
                case g:
                case I:
                case ae:
                case De:
                case Z:
                  return G;
                default:
                  return be;
              }
          }
        case b:
          return be;
      }
    }
  }
  function Me(G) {
    return Pe(G) === ee;
  }
  return lr.AsyncMode = oe, lr.ConcurrentMode = ee, lr.ContextConsumer = g, lr.ContextProvider = Z, lr.Element = S, lr.ForwardRef = I, lr.Fragment = C, lr.Lazy = ae, lr.Memo = De, lr.Portal = b, lr.Profiler = Y, lr.StrictMode = L, lr.Suspense = fe, lr.isAsyncMode = function(G) {
    return Me(G) || Pe(G) === oe;
  }, lr.isConcurrentMode = Me, lr.isContextConsumer = function(G) {
    return Pe(G) === g;
  }, lr.isContextProvider = function(G) {
    return Pe(G) === Z;
  }, lr.isElement = function(G) {
    return typeof G == "object" && G !== null && G.$$typeof === S;
  }, lr.isForwardRef = function(G) {
    return Pe(G) === I;
  }, lr.isFragment = function(G) {
    return Pe(G) === C;
  }, lr.isLazy = function(G) {
    return Pe(G) === ae;
  }, lr.isMemo = function(G) {
    return Pe(G) === De;
  }, lr.isPortal = function(G) {
    return Pe(G) === b;
  }, lr.isProfiler = function(G) {
    return Pe(G) === Y;
  }, lr.isStrictMode = function(G) {
    return Pe(G) === L;
  }, lr.isSuspense = function(G) {
    return Pe(G) === fe;
  }, lr.isValidElementType = function(G) {
    return typeof G == "string" || typeof G == "function" || G === C || G === ee || G === Y || G === L || G === fe || G === J || typeof G == "object" && G !== null && (G.$$typeof === ae || G.$$typeof === De || G.$$typeof === Z || G.$$typeof === g || G.$$typeof === I || G.$$typeof === ue || G.$$typeof === et || G.$$typeof === ot || G.$$typeof === H);
  }, lr.typeOf = Pe, lr;
}
var sr = {}, H5;
function bR() {
  if (H5) return sr;
  H5 = 1;
  var y = {};
  /** @license React v16.13.1
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  return y.NODE_ENV !== "production" && function() {
    var S = typeof Symbol == "function" && Symbol.for, b = S ? Symbol.for("react.element") : 60103, C = S ? Symbol.for("react.portal") : 60106, L = S ? Symbol.for("react.fragment") : 60107, Y = S ? Symbol.for("react.strict_mode") : 60108, Z = S ? Symbol.for("react.profiler") : 60114, g = S ? Symbol.for("react.provider") : 60109, oe = S ? Symbol.for("react.context") : 60110, ee = S ? Symbol.for("react.async_mode") : 60111, I = S ? Symbol.for("react.concurrent_mode") : 60111, fe = S ? Symbol.for("react.forward_ref") : 60112, J = S ? Symbol.for("react.suspense") : 60113, De = S ? Symbol.for("react.suspense_list") : 60120, ae = S ? Symbol.for("react.memo") : 60115, H = S ? Symbol.for("react.lazy") : 60116, ue = S ? Symbol.for("react.block") : 60121, et = S ? Symbol.for("react.fundamental") : 60117, ot = S ? Symbol.for("react.responder") : 60118, Pe = S ? Symbol.for("react.scope") : 60119;
    function Me(ve) {
      return typeof ve == "string" || typeof ve == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      ve === L || ve === I || ve === Z || ve === Y || ve === J || ve === De || typeof ve == "object" && ve !== null && (ve.$$typeof === H || ve.$$typeof === ae || ve.$$typeof === g || ve.$$typeof === oe || ve.$$typeof === fe || ve.$$typeof === et || ve.$$typeof === ot || ve.$$typeof === Pe || ve.$$typeof === ue);
    }
    function G(ve) {
      if (typeof ve == "object" && ve !== null) {
        var Yt = ve.$$typeof;
        switch (Yt) {
          case b:
            var Or = ve.type;
            switch (Or) {
              case ee:
              case I:
              case L:
              case Z:
              case Y:
              case J:
                return Or;
              default:
                var Cr = Or && Or.$$typeof;
                switch (Cr) {
                  case oe:
                  case fe:
                  case H:
                  case ae:
                  case g:
                    return Cr;
                  default:
                    return Yt;
                }
            }
          case C:
            return Yt;
        }
      }
    }
    var be = ee, it = I, qe = oe, Wt = g, Ct = b, Vt = fe, zt = L, xt = H, We = ae, Dt = C, gt = Z, tt = Y, X = J, Ne = !1;
    function ye(ve) {
      return Ne || (Ne = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), k(ve) || G(ve) === ee;
    }
    function k(ve) {
      return G(ve) === I;
    }
    function M(ve) {
      return G(ve) === oe;
    }
    function se(ve) {
      return G(ve) === g;
    }
    function he(ve) {
      return typeof ve == "object" && ve !== null && ve.$$typeof === b;
    }
    function pe(ve) {
      return G(ve) === fe;
    }
    function Ee(ve) {
      return G(ve) === L;
    }
    function Ce(ve) {
      return G(ve) === H;
    }
    function me(ve) {
      return G(ve) === ae;
    }
    function Ae(ve) {
      return G(ve) === C;
    }
    function Ye(ve) {
      return G(ve) === Z;
    }
    function Je(ve) {
      return G(ve) === Y;
    }
    function Pt(ve) {
      return G(ve) === J;
    }
    sr.AsyncMode = be, sr.ConcurrentMode = it, sr.ContextConsumer = qe, sr.ContextProvider = Wt, sr.Element = Ct, sr.ForwardRef = Vt, sr.Fragment = zt, sr.Lazy = xt, sr.Memo = We, sr.Portal = Dt, sr.Profiler = gt, sr.StrictMode = tt, sr.Suspense = X, sr.isAsyncMode = ye, sr.isConcurrentMode = k, sr.isContextConsumer = M, sr.isContextProvider = se, sr.isElement = he, sr.isForwardRef = pe, sr.isFragment = Ee, sr.isLazy = Ce, sr.isMemo = me, sr.isPortal = Ae, sr.isProfiler = Ye, sr.isStrictMode = Je, sr.isSuspense = Pt, sr.isValidElementType = Me, sr.typeOf = G;
  }(), sr;
}
var B5;
function Z5() {
  if (B5) return ug.exports;
  B5 = 1;
  var y = {};
  return y.NODE_ENV === "production" ? ug.exports = wR() : ug.exports = bR(), ug.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var A0, V5;
function xR() {
  if (V5) return A0;
  V5 = 1;
  var y = Object.getOwnPropertySymbols, S = Object.prototype.hasOwnProperty, b = Object.prototype.propertyIsEnumerable;
  function C(Y) {
    if (Y == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(Y);
  }
  function L() {
    try {
      if (!Object.assign)
        return !1;
      var Y = new String("abc");
      if (Y[5] = "de", Object.getOwnPropertyNames(Y)[0] === "5")
        return !1;
      for (var Z = {}, g = 0; g < 10; g++)
        Z["_" + String.fromCharCode(g)] = g;
      var oe = Object.getOwnPropertyNames(Z).map(function(I) {
        return Z[I];
      });
      if (oe.join("") !== "0123456789")
        return !1;
      var ee = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(I) {
        ee[I] = I;
      }), Object.keys(Object.assign({}, ee)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return A0 = L() ? Object.assign : function(Y, Z) {
    for (var g, oe = C(Y), ee, I = 1; I < arguments.length; I++) {
      g = Object(arguments[I]);
      for (var fe in g)
        S.call(g, fe) && (oe[fe] = g[fe]);
      if (y) {
        ee = y(g);
        for (var J = 0; J < ee.length; J++)
          b.call(g, ee[J]) && (oe[ee[J]] = g[ee[J]]);
      }
    }
    return oe;
  }, A0;
}
var U0, Y5;
function Q0() {
  if (Y5) return U0;
  Y5 = 1;
  var y = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return U0 = y, U0;
}
var j0, I5;
function eS() {
  return I5 || (I5 = 1, j0 = Function.call.bind(Object.prototype.hasOwnProperty)), j0;
}
var P0, $5;
function SR() {
  if ($5) return P0;
  $5 = 1;
  var y = {}, S = function() {
  };
  if (y.NODE_ENV !== "production") {
    var b = Q0(), C = {}, L = eS();
    S = function(Z) {
      var g = "Warning: " + Z;
      typeof console < "u" && console.error(g);
      try {
        throw new Error(g);
      } catch {
      }
    };
  }
  function Y(Z, g, oe, ee, I) {
    if (y.NODE_ENV !== "production") {
      for (var fe in Z)
        if (L(Z, fe)) {
          var J;
          try {
            if (typeof Z[fe] != "function") {
              var De = Error(
                (ee || "React class") + ": " + oe + " type `" + fe + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof Z[fe] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw De.name = "Invariant Violation", De;
            }
            J = Z[fe](g, fe, ee, oe, null, b);
          } catch (H) {
            J = H;
          }
          if (J && !(J instanceof Error) && S(
            (ee || "React class") + ": type specification of " + oe + " `" + fe + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof J + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), J instanceof Error && !(J.message in C)) {
            C[J.message] = !0;
            var ae = I ? I() : "";
            S(
              "Failed " + oe + " type: " + J.message + (ae ?? "")
            );
          }
        }
    }
  }
  return Y.resetWarningCache = function() {
    y.NODE_ENV !== "production" && (C = {});
  }, P0 = Y, P0;
}
var F0, Q5;
function kR() {
  if (Q5) return F0;
  Q5 = 1;
  var y = {}, S = Z5(), b = xR(), C = Q0(), L = eS(), Y = SR(), Z = function() {
  };
  y.NODE_ENV !== "production" && (Z = function(oe) {
    var ee = "Warning: " + oe;
    typeof console < "u" && console.error(ee);
    try {
      throw new Error(ee);
    } catch {
    }
  });
  function g() {
    return null;
  }
  return F0 = function(oe, ee) {
    var I = typeof Symbol == "function" && Symbol.iterator, fe = "@@iterator";
    function J(k) {
      var M = k && (I && k[I] || k[fe]);
      if (typeof M == "function")
        return M;
    }
    var De = "<<anonymous>>", ae = {
      array: ot("array"),
      bigint: ot("bigint"),
      bool: ot("boolean"),
      func: ot("function"),
      number: ot("number"),
      object: ot("object"),
      string: ot("string"),
      symbol: ot("symbol"),
      any: Pe(),
      arrayOf: Me,
      element: G(),
      elementType: be(),
      instanceOf: it,
      node: Vt(),
      objectOf: Wt,
      oneOf: qe,
      oneOfType: Ct,
      shape: xt,
      exact: We
    };
    function H(k, M) {
      return k === M ? k !== 0 || 1 / k === 1 / M : k !== k && M !== M;
    }
    function ue(k, M) {
      this.message = k, this.data = M && typeof M == "object" ? M : {}, this.stack = "";
    }
    ue.prototype = Error.prototype;
    function et(k) {
      if (y.NODE_ENV !== "production")
        var M = {}, se = 0;
      function he(Ee, Ce, me, Ae, Ye, Je, Pt) {
        if (Ae = Ae || De, Je = Je || me, Pt !== C) {
          if (ee) {
            var ve = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw ve.name = "Invariant Violation", ve;
          } else if (y.NODE_ENV !== "production" && typeof console < "u") {
            var Yt = Ae + ":" + me;
            !M[Yt] && // Avoid spamming the console because they are often not actionable except for lib authors
            se < 3 && (Z(
              "You are manually calling a React.PropTypes validation function for the `" + Je + "` prop on `" + Ae + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), M[Yt] = !0, se++);
          }
        }
        return Ce[me] == null ? Ee ? Ce[me] === null ? new ue("The " + Ye + " `" + Je + "` is marked as required " + ("in `" + Ae + "`, but its value is `null`.")) : new ue("The " + Ye + " `" + Je + "` is marked as required in " + ("`" + Ae + "`, but its value is `undefined`.")) : null : k(Ce, me, Ae, Ye, Je);
      }
      var pe = he.bind(null, !1);
      return pe.isRequired = he.bind(null, !0), pe;
    }
    function ot(k) {
      function M(se, he, pe, Ee, Ce, me) {
        var Ae = se[he], Ye = tt(Ae);
        if (Ye !== k) {
          var Je = X(Ae);
          return new ue(
            "Invalid " + Ee + " `" + Ce + "` of type " + ("`" + Je + "` supplied to `" + pe + "`, expected ") + ("`" + k + "`."),
            { expectedType: k }
          );
        }
        return null;
      }
      return et(M);
    }
    function Pe() {
      return et(g);
    }
    function Me(k) {
      function M(se, he, pe, Ee, Ce) {
        if (typeof k != "function")
          return new ue("Property `" + Ce + "` of component `" + pe + "` has invalid PropType notation inside arrayOf.");
        var me = se[he];
        if (!Array.isArray(me)) {
          var Ae = tt(me);
          return new ue("Invalid " + Ee + " `" + Ce + "` of type " + ("`" + Ae + "` supplied to `" + pe + "`, expected an array."));
        }
        for (var Ye = 0; Ye < me.length; Ye++) {
          var Je = k(me, Ye, pe, Ee, Ce + "[" + Ye + "]", C);
          if (Je instanceof Error)
            return Je;
        }
        return null;
      }
      return et(M);
    }
    function G() {
      function k(M, se, he, pe, Ee) {
        var Ce = M[se];
        if (!oe(Ce)) {
          var me = tt(Ce);
          return new ue("Invalid " + pe + " `" + Ee + "` of type " + ("`" + me + "` supplied to `" + he + "`, expected a single ReactElement."));
        }
        return null;
      }
      return et(k);
    }
    function be() {
      function k(M, se, he, pe, Ee) {
        var Ce = M[se];
        if (!S.isValidElementType(Ce)) {
          var me = tt(Ce);
          return new ue("Invalid " + pe + " `" + Ee + "` of type " + ("`" + me + "` supplied to `" + he + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return et(k);
    }
    function it(k) {
      function M(se, he, pe, Ee, Ce) {
        if (!(se[he] instanceof k)) {
          var me = k.name || De, Ae = ye(se[he]);
          return new ue("Invalid " + Ee + " `" + Ce + "` of type " + ("`" + Ae + "` supplied to `" + pe + "`, expected ") + ("instance of `" + me + "`."));
        }
        return null;
      }
      return et(M);
    }
    function qe(k) {
      if (!Array.isArray(k))
        return y.NODE_ENV !== "production" && (arguments.length > 1 ? Z(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : Z("Invalid argument supplied to oneOf, expected an array.")), g;
      function M(se, he, pe, Ee, Ce) {
        for (var me = se[he], Ae = 0; Ae < k.length; Ae++)
          if (H(me, k[Ae]))
            return null;
        var Ye = JSON.stringify(k, function(Pt, ve) {
          var Yt = X(ve);
          return Yt === "symbol" ? String(ve) : ve;
        });
        return new ue("Invalid " + Ee + " `" + Ce + "` of value `" + String(me) + "` " + ("supplied to `" + pe + "`, expected one of " + Ye + "."));
      }
      return et(M);
    }
    function Wt(k) {
      function M(se, he, pe, Ee, Ce) {
        if (typeof k != "function")
          return new ue("Property `" + Ce + "` of component `" + pe + "` has invalid PropType notation inside objectOf.");
        var me = se[he], Ae = tt(me);
        if (Ae !== "object")
          return new ue("Invalid " + Ee + " `" + Ce + "` of type " + ("`" + Ae + "` supplied to `" + pe + "`, expected an object."));
        for (var Ye in me)
          if (L(me, Ye)) {
            var Je = k(me, Ye, pe, Ee, Ce + "." + Ye, C);
            if (Je instanceof Error)
              return Je;
          }
        return null;
      }
      return et(M);
    }
    function Ct(k) {
      if (!Array.isArray(k))
        return y.NODE_ENV !== "production" && Z("Invalid argument supplied to oneOfType, expected an instance of array."), g;
      for (var M = 0; M < k.length; M++) {
        var se = k[M];
        if (typeof se != "function")
          return Z(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + Ne(se) + " at index " + M + "."
          ), g;
      }
      function he(pe, Ee, Ce, me, Ae) {
        for (var Ye = [], Je = 0; Je < k.length; Je++) {
          var Pt = k[Je], ve = Pt(pe, Ee, Ce, me, Ae, C);
          if (ve == null)
            return null;
          ve.data && L(ve.data, "expectedType") && Ye.push(ve.data.expectedType);
        }
        var Yt = Ye.length > 0 ? ", expected one of type [" + Ye.join(", ") + "]" : "";
        return new ue("Invalid " + me + " `" + Ae + "` supplied to " + ("`" + Ce + "`" + Yt + "."));
      }
      return et(he);
    }
    function Vt() {
      function k(M, se, he, pe, Ee) {
        return Dt(M[se]) ? null : new ue("Invalid " + pe + " `" + Ee + "` supplied to " + ("`" + he + "`, expected a ReactNode."));
      }
      return et(k);
    }
    function zt(k, M, se, he, pe) {
      return new ue(
        (k || "React class") + ": " + M + " type `" + se + "." + he + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + pe + "`."
      );
    }
    function xt(k) {
      function M(se, he, pe, Ee, Ce) {
        var me = se[he], Ae = tt(me);
        if (Ae !== "object")
          return new ue("Invalid " + Ee + " `" + Ce + "` of type `" + Ae + "` " + ("supplied to `" + pe + "`, expected `object`."));
        for (var Ye in k) {
          var Je = k[Ye];
          if (typeof Je != "function")
            return zt(pe, Ee, Ce, Ye, X(Je));
          var Pt = Je(me, Ye, pe, Ee, Ce + "." + Ye, C);
          if (Pt)
            return Pt;
        }
        return null;
      }
      return et(M);
    }
    function We(k) {
      function M(se, he, pe, Ee, Ce) {
        var me = se[he], Ae = tt(me);
        if (Ae !== "object")
          return new ue("Invalid " + Ee + " `" + Ce + "` of type `" + Ae + "` " + ("supplied to `" + pe + "`, expected `object`."));
        var Ye = b({}, se[he], k);
        for (var Je in Ye) {
          var Pt = k[Je];
          if (L(k, Je) && typeof Pt != "function")
            return zt(pe, Ee, Ce, Je, X(Pt));
          if (!Pt)
            return new ue(
              "Invalid " + Ee + " `" + Ce + "` key `" + Je + "` supplied to `" + pe + "`.\nBad object: " + JSON.stringify(se[he], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(k), null, "  ")
            );
          var ve = Pt(me, Je, pe, Ee, Ce + "." + Je, C);
          if (ve)
            return ve;
        }
        return null;
      }
      return et(M);
    }
    function Dt(k) {
      switch (typeof k) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !k;
        case "object":
          if (Array.isArray(k))
            return k.every(Dt);
          if (k === null || oe(k))
            return !0;
          var M = J(k);
          if (M) {
            var se = M.call(k), he;
            if (M !== k.entries) {
              for (; !(he = se.next()).done; )
                if (!Dt(he.value))
                  return !1;
            } else
              for (; !(he = se.next()).done; ) {
                var pe = he.value;
                if (pe && !Dt(pe[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function gt(k, M) {
      return k === "symbol" ? !0 : M ? M["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && M instanceof Symbol : !1;
    }
    function tt(k) {
      var M = typeof k;
      return Array.isArray(k) ? "array" : k instanceof RegExp ? "object" : gt(M, k) ? "symbol" : M;
    }
    function X(k) {
      if (typeof k > "u" || k === null)
        return "" + k;
      var M = tt(k);
      if (M === "object") {
        if (k instanceof Date)
          return "date";
        if (k instanceof RegExp)
          return "regexp";
      }
      return M;
    }
    function Ne(k) {
      var M = X(k);
      switch (M) {
        case "array":
        case "object":
          return "an " + M;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + M;
        default:
          return M;
      }
    }
    function ye(k) {
      return !k.constructor || !k.constructor.name ? De : k.constructor.name;
    }
    return ae.checkPropTypes = Y, ae.resetWarningCache = Y.resetWarningCache, ae.PropTypes = ae, ae;
  }, F0;
}
var H0, W5;
function ER() {
  if (W5) return H0;
  W5 = 1;
  var y = Q0();
  function S() {
  }
  function b() {
  }
  return b.resetWarningCache = S, H0 = function() {
    function C(Z, g, oe, ee, I, fe) {
      if (fe !== y) {
        var J = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw J.name = "Invariant Violation", J;
      }
    }
    C.isRequired = C;
    function L() {
      return C;
    }
    var Y = {
      array: C,
      bigint: C,
      bool: C,
      func: C,
      number: C,
      object: C,
      string: C,
      symbol: C,
      any: C,
      arrayOf: L,
      element: C,
      elementType: C,
      instanceOf: L,
      node: C,
      objectOf: L,
      oneOf: L,
      oneOfType: L,
      shape: L,
      exact: L,
      checkPropTypes: b,
      resetWarningCache: S
    };
    return Y.PropTypes = Y, Y;
  }, H0;
}
var CR = {};
if (CR.NODE_ENV !== "production") {
  var TR = Z5(), RR = !0;
  I0.exports = kR()(TR.isElement, RR);
} else
  I0.exports = ER()();
var tS = I0.exports, rS = {
  L: 1,
  M: 0,
  Q: 3,
  H: 2
}, nS = {
  MODE_NUMBER: 1,
  MODE_ALPHA_NUM: 2,
  MODE_8BIT_BYTE: 4,
  MODE_KANJI: 8
}, _R = nS;
function aS(y) {
  this.mode = _R.MODE_8BIT_BYTE, this.data = y;
}
aS.prototype = {
  getLength: function(y) {
    return this.data.length;
  },
  write: function(y) {
    for (var S = 0; S < this.data.length; S++)
      y.put(this.data.charCodeAt(S), 8);
  }
};
var DR = aS, cg = rS;
function el(y, S) {
  this.totalCount = y, this.dataCount = S;
}
el.RS_BLOCK_TABLE = [
  // L
  // M
  // Q
  // H
  // 1
  [1, 26, 19],
  [1, 26, 16],
  [1, 26, 13],
  [1, 26, 9],
  // 2
  [1, 44, 34],
  [1, 44, 28],
  [1, 44, 22],
  [1, 44, 16],
  // 3
  [1, 70, 55],
  [1, 70, 44],
  [2, 35, 17],
  [2, 35, 13],
  // 4		
  [1, 100, 80],
  [2, 50, 32],
  [2, 50, 24],
  [4, 25, 9],
  // 5
  [1, 134, 108],
  [2, 67, 43],
  [2, 33, 15, 2, 34, 16],
  [2, 33, 11, 2, 34, 12],
  // 6
  [2, 86, 68],
  [4, 43, 27],
  [4, 43, 19],
  [4, 43, 15],
  // 7		
  [2, 98, 78],
  [4, 49, 31],
  [2, 32, 14, 4, 33, 15],
  [4, 39, 13, 1, 40, 14],
  // 8
  [2, 121, 97],
  [2, 60, 38, 2, 61, 39],
  [4, 40, 18, 2, 41, 19],
  [4, 40, 14, 2, 41, 15],
  // 9
  [2, 146, 116],
  [3, 58, 36, 2, 59, 37],
  [4, 36, 16, 4, 37, 17],
  [4, 36, 12, 4, 37, 13],
  // 10		
  [2, 86, 68, 2, 87, 69],
  [4, 69, 43, 1, 70, 44],
  [6, 43, 19, 2, 44, 20],
  [6, 43, 15, 2, 44, 16],
  // 11
  [4, 101, 81],
  [1, 80, 50, 4, 81, 51],
  [4, 50, 22, 4, 51, 23],
  [3, 36, 12, 8, 37, 13],
  // 12
  [2, 116, 92, 2, 117, 93],
  [6, 58, 36, 2, 59, 37],
  [4, 46, 20, 6, 47, 21],
  [7, 42, 14, 4, 43, 15],
  // 13
  [4, 133, 107],
  [8, 59, 37, 1, 60, 38],
  [8, 44, 20, 4, 45, 21],
  [12, 33, 11, 4, 34, 12],
  // 14
  [3, 145, 115, 1, 146, 116],
  [4, 64, 40, 5, 65, 41],
  [11, 36, 16, 5, 37, 17],
  [11, 36, 12, 5, 37, 13],
  // 15
  [5, 109, 87, 1, 110, 88],
  [5, 65, 41, 5, 66, 42],
  [5, 54, 24, 7, 55, 25],
  [11, 36, 12],
  // 16
  [5, 122, 98, 1, 123, 99],
  [7, 73, 45, 3, 74, 46],
  [15, 43, 19, 2, 44, 20],
  [3, 45, 15, 13, 46, 16],
  // 17
  [1, 135, 107, 5, 136, 108],
  [10, 74, 46, 1, 75, 47],
  [1, 50, 22, 15, 51, 23],
  [2, 42, 14, 17, 43, 15],
  // 18
  [5, 150, 120, 1, 151, 121],
  [9, 69, 43, 4, 70, 44],
  [17, 50, 22, 1, 51, 23],
  [2, 42, 14, 19, 43, 15],
  // 19
  [3, 141, 113, 4, 142, 114],
  [3, 70, 44, 11, 71, 45],
  [17, 47, 21, 4, 48, 22],
  [9, 39, 13, 16, 40, 14],
  // 20
  [3, 135, 107, 5, 136, 108],
  [3, 67, 41, 13, 68, 42],
  [15, 54, 24, 5, 55, 25],
  [15, 43, 15, 10, 44, 16],
  // 21
  [4, 144, 116, 4, 145, 117],
  [17, 68, 42],
  [17, 50, 22, 6, 51, 23],
  [19, 46, 16, 6, 47, 17],
  // 22
  [2, 139, 111, 7, 140, 112],
  [17, 74, 46],
  [7, 54, 24, 16, 55, 25],
  [34, 37, 13],
  // 23
  [4, 151, 121, 5, 152, 122],
  [4, 75, 47, 14, 76, 48],
  [11, 54, 24, 14, 55, 25],
  [16, 45, 15, 14, 46, 16],
  // 24
  [6, 147, 117, 4, 148, 118],
  [6, 73, 45, 14, 74, 46],
  [11, 54, 24, 16, 55, 25],
  [30, 46, 16, 2, 47, 17],
  // 25
  [8, 132, 106, 4, 133, 107],
  [8, 75, 47, 13, 76, 48],
  [7, 54, 24, 22, 55, 25],
  [22, 45, 15, 13, 46, 16],
  // 26
  [10, 142, 114, 2, 143, 115],
  [19, 74, 46, 4, 75, 47],
  [28, 50, 22, 6, 51, 23],
  [33, 46, 16, 4, 47, 17],
  // 27
  [8, 152, 122, 4, 153, 123],
  [22, 73, 45, 3, 74, 46],
  [8, 53, 23, 26, 54, 24],
  [12, 45, 15, 28, 46, 16],
  // 28
  [3, 147, 117, 10, 148, 118],
  [3, 73, 45, 23, 74, 46],
  [4, 54, 24, 31, 55, 25],
  [11, 45, 15, 31, 46, 16],
  // 29
  [7, 146, 116, 7, 147, 117],
  [21, 73, 45, 7, 74, 46],
  [1, 53, 23, 37, 54, 24],
  [19, 45, 15, 26, 46, 16],
  // 30
  [5, 145, 115, 10, 146, 116],
  [19, 75, 47, 10, 76, 48],
  [15, 54, 24, 25, 55, 25],
  [23, 45, 15, 25, 46, 16],
  // 31
  [13, 145, 115, 3, 146, 116],
  [2, 74, 46, 29, 75, 47],
  [42, 54, 24, 1, 55, 25],
  [23, 45, 15, 28, 46, 16],
  // 32
  [17, 145, 115],
  [10, 74, 46, 23, 75, 47],
  [10, 54, 24, 35, 55, 25],
  [19, 45, 15, 35, 46, 16],
  // 33
  [17, 145, 115, 1, 146, 116],
  [14, 74, 46, 21, 75, 47],
  [29, 54, 24, 19, 55, 25],
  [11, 45, 15, 46, 46, 16],
  // 34
  [13, 145, 115, 6, 146, 116],
  [14, 74, 46, 23, 75, 47],
  [44, 54, 24, 7, 55, 25],
  [59, 46, 16, 1, 47, 17],
  // 35
  [12, 151, 121, 7, 152, 122],
  [12, 75, 47, 26, 76, 48],
  [39, 54, 24, 14, 55, 25],
  [22, 45, 15, 41, 46, 16],
  // 36
  [6, 151, 121, 14, 152, 122],
  [6, 75, 47, 34, 76, 48],
  [46, 54, 24, 10, 55, 25],
  [2, 45, 15, 64, 46, 16],
  // 37
  [17, 152, 122, 4, 153, 123],
  [29, 74, 46, 14, 75, 47],
  [49, 54, 24, 10, 55, 25],
  [24, 45, 15, 46, 46, 16],
  // 38
  [4, 152, 122, 18, 153, 123],
  [13, 74, 46, 32, 75, 47],
  [48, 54, 24, 14, 55, 25],
  [42, 45, 15, 32, 46, 16],
  // 39
  [20, 147, 117, 4, 148, 118],
  [40, 75, 47, 7, 76, 48],
  [43, 54, 24, 22, 55, 25],
  [10, 45, 15, 67, 46, 16],
  // 40
  [19, 148, 118, 6, 149, 119],
  [18, 75, 47, 31, 76, 48],
  [34, 54, 24, 34, 55, 25],
  [20, 45, 15, 61, 46, 16]
];
el.getRSBlocks = function(y, S) {
  var b = el.getRsBlockTable(y, S);
  if (b == null)
    throw new Error("bad rs block @ typeNumber:" + y + "/errorCorrectLevel:" + S);
  for (var C = b.length / 3, L = new Array(), Y = 0; Y < C; Y++)
    for (var Z = b[Y * 3 + 0], g = b[Y * 3 + 1], oe = b[Y * 3 + 2], ee = 0; ee < Z; ee++)
      L.push(new el(g, oe));
  return L;
};
el.getRsBlockTable = function(y, S) {
  switch (S) {
    case cg.L:
      return el.RS_BLOCK_TABLE[(y - 1) * 4 + 0];
    case cg.M:
      return el.RS_BLOCK_TABLE[(y - 1) * 4 + 1];
    case cg.Q:
      return el.RS_BLOCK_TABLE[(y - 1) * 4 + 2];
    case cg.H:
      return el.RS_BLOCK_TABLE[(y - 1) * 4 + 3];
    default:
      return;
  }
};
var OR = el;
function oS() {
  this.buffer = new Array(), this.length = 0;
}
oS.prototype = {
  get: function(y) {
    var S = Math.floor(y / 8);
    return (this.buffer[S] >>> 7 - y % 8 & 1) == 1;
  },
  put: function(y, S) {
    for (var b = 0; b < S; b++)
      this.putBit((y >>> S - b - 1 & 1) == 1);
  },
  getLengthInBits: function() {
    return this.length;
  },
  putBit: function(y) {
    var S = Math.floor(this.length / 8);
    this.buffer.length <= S && this.buffer.push(0), y && (this.buffer[S] |= 128 >>> this.length % 8), this.length++;
  }
};
var zR = oS, hi = {
  glog: function(y) {
    if (y < 1)
      throw new Error("glog(" + y + ")");
    return hi.LOG_TABLE[y];
  },
  gexp: function(y) {
    for (; y < 0; )
      y += 255;
    for (; y >= 256; )
      y -= 255;
    return hi.EXP_TABLE[y];
  },
  EXP_TABLE: new Array(256),
  LOG_TABLE: new Array(256)
};
for (var Xn = 0; Xn < 8; Xn++)
  hi.EXP_TABLE[Xn] = 1 << Xn;
for (var Xn = 8; Xn < 256; Xn++)
  hi.EXP_TABLE[Xn] = hi.EXP_TABLE[Xn - 4] ^ hi.EXP_TABLE[Xn - 5] ^ hi.EXP_TABLE[Xn - 6] ^ hi.EXP_TABLE[Xn - 8];
for (var Xn = 0; Xn < 255; Xn++)
  hi.LOG_TABLE[hi.EXP_TABLE[Xn]] = Xn;
var iS = hi, yc = iS;
function fg(y, S) {
  if (y.length == null)
    throw new Error(y.length + "/" + S);
  for (var b = 0; b < y.length && y[b] == 0; )
    b++;
  this.num = new Array(y.length - b + S);
  for (var C = 0; C < y.length - b; C++)
    this.num[C] = y[C + b];
}
fg.prototype = {
  get: function(y) {
    return this.num[y];
  },
  getLength: function() {
    return this.num.length;
  },
  multiply: function(y) {
    for (var S = new Array(this.getLength() + y.getLength() - 1), b = 0; b < this.getLength(); b++)
      for (var C = 0; C < y.getLength(); C++)
        S[b + C] ^= yc.gexp(yc.glog(this.get(b)) + yc.glog(y.get(C)));
    return new fg(S, 0);
  },
  mod: function(y) {
    if (this.getLength() - y.getLength() < 0)
      return this;
    for (var S = yc.glog(this.get(0)) - yc.glog(y.get(0)), b = new Array(this.getLength()), C = 0; C < this.getLength(); C++)
      b[C] = this.get(C);
    for (var C = 0; C < y.getLength(); C++)
      b[C] ^= yc.gexp(yc.glog(y.get(C)) + S);
    return new fg(b, 0).mod(y);
  }
};
var lS = fg, jo = nS, X5 = lS, LR = iS, Zs = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
}, Wn = {
  PATTERN_POSITION_TABLE: [
    [],
    [6, 18],
    [6, 22],
    [6, 26],
    [6, 30],
    [6, 34],
    [6, 22, 38],
    [6, 24, 42],
    [6, 26, 46],
    [6, 28, 50],
    [6, 30, 54],
    [6, 32, 58],
    [6, 34, 62],
    [6, 26, 46, 66],
    [6, 26, 48, 70],
    [6, 26, 50, 74],
    [6, 30, 54, 78],
    [6, 30, 56, 82],
    [6, 30, 58, 86],
    [6, 34, 62, 90],
    [6, 28, 50, 72, 94],
    [6, 26, 50, 74, 98],
    [6, 30, 54, 78, 102],
    [6, 28, 54, 80, 106],
    [6, 32, 58, 84, 110],
    [6, 30, 58, 86, 114],
    [6, 34, 62, 90, 118],
    [6, 26, 50, 74, 98, 122],
    [6, 30, 54, 78, 102, 126],
    [6, 26, 52, 78, 104, 130],
    [6, 30, 56, 82, 108, 134],
    [6, 34, 60, 86, 112, 138],
    [6, 30, 58, 86, 114, 142],
    [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150],
    [6, 24, 50, 76, 102, 128, 154],
    [6, 28, 54, 80, 106, 132, 158],
    [6, 32, 58, 84, 110, 136, 162],
    [6, 26, 54, 82, 110, 138, 166],
    [6, 30, 58, 86, 114, 142, 170]
  ],
  G15: 1335,
  G18: 7973,
  G15_MASK: 21522,
  getBCHTypeInfo: function(y) {
    for (var S = y << 10; Wn.getBCHDigit(S) - Wn.getBCHDigit(Wn.G15) >= 0; )
      S ^= Wn.G15 << Wn.getBCHDigit(S) - Wn.getBCHDigit(Wn.G15);
    return (y << 10 | S) ^ Wn.G15_MASK;
  },
  getBCHTypeNumber: function(y) {
    for (var S = y << 12; Wn.getBCHDigit(S) - Wn.getBCHDigit(Wn.G18) >= 0; )
      S ^= Wn.G18 << Wn.getBCHDigit(S) - Wn.getBCHDigit(Wn.G18);
    return y << 12 | S;
  },
  getBCHDigit: function(y) {
    for (var S = 0; y != 0; )
      S++, y >>>= 1;
    return S;
  },
  getPatternPosition: function(y) {
    return Wn.PATTERN_POSITION_TABLE[y - 1];
  },
  getMask: function(y, S, b) {
    switch (y) {
      case Zs.PATTERN000:
        return (S + b) % 2 == 0;
      case Zs.PATTERN001:
        return S % 2 == 0;
      case Zs.PATTERN010:
        return b % 3 == 0;
      case Zs.PATTERN011:
        return (S + b) % 3 == 0;
      case Zs.PATTERN100:
        return (Math.floor(S / 2) + Math.floor(b / 3)) % 2 == 0;
      case Zs.PATTERN101:
        return S * b % 2 + S * b % 3 == 0;
      case Zs.PATTERN110:
        return (S * b % 2 + S * b % 3) % 2 == 0;
      case Zs.PATTERN111:
        return (S * b % 3 + (S + b) % 2) % 2 == 0;
      default:
        throw new Error("bad maskPattern:" + y);
    }
  },
  getErrorCorrectPolynomial: function(y) {
    for (var S = new X5([1], 0), b = 0; b < y; b++)
      S = S.multiply(new X5([1, LR.gexp(b)], 0));
    return S;
  },
  getLengthInBits: function(y, S) {
    if (1 <= S && S < 10)
      switch (y) {
        case jo.MODE_NUMBER:
          return 10;
        case jo.MODE_ALPHA_NUM:
          return 9;
        case jo.MODE_8BIT_BYTE:
          return 8;
        case jo.MODE_KANJI:
          return 8;
        default:
          throw new Error("mode:" + y);
      }
    else if (S < 27)
      switch (y) {
        case jo.MODE_NUMBER:
          return 12;
        case jo.MODE_ALPHA_NUM:
          return 11;
        case jo.MODE_8BIT_BYTE:
          return 16;
        case jo.MODE_KANJI:
          return 10;
        default:
          throw new Error("mode:" + y);
      }
    else if (S < 41)
      switch (y) {
        case jo.MODE_NUMBER:
          return 14;
        case jo.MODE_ALPHA_NUM:
          return 13;
        case jo.MODE_8BIT_BYTE:
          return 16;
        case jo.MODE_KANJI:
          return 12;
        default:
          throw new Error("mode:" + y);
      }
    else
      throw new Error("type:" + S);
  },
  getLostPoint: function(y) {
    for (var S = y.getModuleCount(), b = 0, C = 0; C < S; C++)
      for (var L = 0; L < S; L++) {
        for (var Y = 0, Z = y.isDark(C, L), g = -1; g <= 1; g++)
          if (!(C + g < 0 || S <= C + g))
            for (var oe = -1; oe <= 1; oe++)
              L + oe < 0 || S <= L + oe || g == 0 && oe == 0 || Z == y.isDark(C + g, L + oe) && Y++;
        Y > 5 && (b += 3 + Y - 5);
      }
    for (var C = 0; C < S - 1; C++)
      for (var L = 0; L < S - 1; L++) {
        var ee = 0;
        y.isDark(C, L) && ee++, y.isDark(C + 1, L) && ee++, y.isDark(C, L + 1) && ee++, y.isDark(C + 1, L + 1) && ee++, (ee == 0 || ee == 4) && (b += 3);
      }
    for (var C = 0; C < S; C++)
      for (var L = 0; L < S - 6; L++)
        y.isDark(C, L) && !y.isDark(C, L + 1) && y.isDark(C, L + 2) && y.isDark(C, L + 3) && y.isDark(C, L + 4) && !y.isDark(C, L + 5) && y.isDark(C, L + 6) && (b += 40);
    for (var L = 0; L < S; L++)
      for (var C = 0; C < S - 6; C++)
        y.isDark(C, L) && !y.isDark(C + 1, L) && y.isDark(C + 2, L) && y.isDark(C + 3, L) && y.isDark(C + 4, L) && !y.isDark(C + 5, L) && y.isDark(C + 6, L) && (b += 40);
    for (var I = 0, L = 0; L < S; L++)
      for (var C = 0; C < S; C++)
        y.isDark(C, L) && I++;
    var fe = Math.abs(100 * I / S / S - 50) / 5;
    return b += fe * 10, b;
  }
}, MR = Wn, NR = DR, sS = OR, uS = zR, eu = MR, AR = lS;
function tl(y, S) {
  this.typeNumber = y, this.errorCorrectLevel = S, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = [];
}
var vo = tl.prototype;
vo.addData = function(y) {
  var S = new NR(y);
  this.dataList.push(S), this.dataCache = null;
};
vo.isDark = function(y, S) {
  if (y < 0 || this.moduleCount <= y || S < 0 || this.moduleCount <= S)
    throw new Error(y + "," + S);
  return this.modules[y][S];
};
vo.getModuleCount = function() {
  return this.moduleCount;
};
vo.make = function() {
  if (this.typeNumber < 1) {
    var y = 1;
    for (y = 1; y < 40; y++) {
      for (var S = sS.getRSBlocks(y, this.errorCorrectLevel), b = new uS(), C = 0, L = 0; L < S.length; L++)
        C += S[L].dataCount;
      for (var L = 0; L < this.dataList.length; L++) {
        var Y = this.dataList[L];
        b.put(Y.mode, 4), b.put(Y.getLength(), eu.getLengthInBits(Y.mode, y)), Y.write(b);
      }
      if (b.getLengthInBits() <= C * 8)
        break;
    }
    this.typeNumber = y;
  }
  this.makeImpl(!1, this.getBestMaskPattern());
};
vo.makeImpl = function(y, S) {
  this.moduleCount = this.typeNumber * 4 + 17, this.modules = new Array(this.moduleCount);
  for (var b = 0; b < this.moduleCount; b++) {
    this.modules[b] = new Array(this.moduleCount);
    for (var C = 0; C < this.moduleCount; C++)
      this.modules[b][C] = null;
  }
  this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(y, S), this.typeNumber >= 7 && this.setupTypeNumber(y), this.dataCache == null && (this.dataCache = tl.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, S);
};
vo.setupPositionProbePattern = function(y, S) {
  for (var b = -1; b <= 7; b++)
    if (!(y + b <= -1 || this.moduleCount <= y + b))
      for (var C = -1; C <= 7; C++)
        S + C <= -1 || this.moduleCount <= S + C || (0 <= b && b <= 6 && (C == 0 || C == 6) || 0 <= C && C <= 6 && (b == 0 || b == 6) || 2 <= b && b <= 4 && 2 <= C && C <= 4 ? this.modules[y + b][S + C] = !0 : this.modules[y + b][S + C] = !1);
};
vo.getBestMaskPattern = function() {
  for (var y = 0, S = 0, b = 0; b < 8; b++) {
    this.makeImpl(!0, b);
    var C = eu.getLostPoint(this);
    (b == 0 || y > C) && (y = C, S = b);
  }
  return S;
};
vo.createMovieClip = function(y, S, b) {
  var C = y.createEmptyMovieClip(S, b), L = 1;
  this.make();
  for (var Y = 0; Y < this.modules.length; Y++)
    for (var Z = Y * L, g = 0; g < this.modules[Y].length; g++) {
      var oe = g * L, ee = this.modules[Y][g];
      ee && (C.beginFill(0, 100), C.moveTo(oe, Z), C.lineTo(oe + L, Z), C.lineTo(oe + L, Z + L), C.lineTo(oe, Z + L), C.endFill());
    }
  return C;
};
vo.setupTimingPattern = function() {
  for (var y = 8; y < this.moduleCount - 8; y++)
    this.modules[y][6] == null && (this.modules[y][6] = y % 2 == 0);
  for (var S = 8; S < this.moduleCount - 8; S++)
    this.modules[6][S] == null && (this.modules[6][S] = S % 2 == 0);
};
vo.setupPositionAdjustPattern = function() {
  for (var y = eu.getPatternPosition(this.typeNumber), S = 0; S < y.length; S++)
    for (var b = 0; b < y.length; b++) {
      var C = y[S], L = y[b];
      if (this.modules[C][L] == null)
        for (var Y = -2; Y <= 2; Y++)
          for (var Z = -2; Z <= 2; Z++)
            Y == -2 || Y == 2 || Z == -2 || Z == 2 || Y == 0 && Z == 0 ? this.modules[C + Y][L + Z] = !0 : this.modules[C + Y][L + Z] = !1;
    }
};
vo.setupTypeNumber = function(y) {
  for (var S = eu.getBCHTypeNumber(this.typeNumber), b = 0; b < 18; b++) {
    var C = !y && (S >> b & 1) == 1;
    this.modules[Math.floor(b / 3)][b % 3 + this.moduleCount - 8 - 3] = C;
  }
  for (var b = 0; b < 18; b++) {
    var C = !y && (S >> b & 1) == 1;
    this.modules[b % 3 + this.moduleCount - 8 - 3][Math.floor(b / 3)] = C;
  }
};
vo.setupTypeInfo = function(y, S) {
  for (var b = this.errorCorrectLevel << 3 | S, C = eu.getBCHTypeInfo(b), L = 0; L < 15; L++) {
    var Y = !y && (C >> L & 1) == 1;
    L < 6 ? this.modules[L][8] = Y : L < 8 ? this.modules[L + 1][8] = Y : this.modules[this.moduleCount - 15 + L][8] = Y;
  }
  for (var L = 0; L < 15; L++) {
    var Y = !y && (C >> L & 1) == 1;
    L < 8 ? this.modules[8][this.moduleCount - L - 1] = Y : L < 9 ? this.modules[8][15 - L - 1 + 1] = Y : this.modules[8][15 - L - 1] = Y;
  }
  this.modules[this.moduleCount - 8][8] = !y;
};
vo.mapData = function(y, S) {
  for (var b = -1, C = this.moduleCount - 1, L = 7, Y = 0, Z = this.moduleCount - 1; Z > 0; Z -= 2)
    for (Z == 6 && Z--; ; ) {
      for (var g = 0; g < 2; g++)
        if (this.modules[C][Z - g] == null) {
          var oe = !1;
          Y < y.length && (oe = (y[Y] >>> L & 1) == 1);
          var ee = eu.getMask(S, C, Z - g);
          ee && (oe = !oe), this.modules[C][Z - g] = oe, L--, L == -1 && (Y++, L = 7);
        }
      if (C += b, C < 0 || this.moduleCount <= C) {
        C -= b, b = -b;
        break;
      }
    }
};
tl.PAD0 = 236;
tl.PAD1 = 17;
tl.createData = function(y, S, b) {
  for (var C = sS.getRSBlocks(y, S), L = new uS(), Y = 0; Y < b.length; Y++) {
    var Z = b[Y];
    L.put(Z.mode, 4), L.put(Z.getLength(), eu.getLengthInBits(Z.mode, y)), Z.write(L);
  }
  for (var g = 0, Y = 0; Y < C.length; Y++)
    g += C[Y].dataCount;
  if (L.getLengthInBits() > g * 8)
    throw new Error("code length overflow. (" + L.getLengthInBits() + ">" + g * 8 + ")");
  for (L.getLengthInBits() + 4 <= g * 8 && L.put(0, 4); L.getLengthInBits() % 8 != 0; )
    L.putBit(!1);
  for (; !(L.getLengthInBits() >= g * 8 || (L.put(tl.PAD0, 8), L.getLengthInBits() >= g * 8)); )
    L.put(tl.PAD1, 8);
  return tl.createBytes(L, C);
};
tl.createBytes = function(y, S) {
  for (var b = 0, C = 0, L = 0, Y = new Array(S.length), Z = new Array(S.length), g = 0; g < S.length; g++) {
    var oe = S[g].dataCount, ee = S[g].totalCount - oe;
    C = Math.max(C, oe), L = Math.max(L, ee), Y[g] = new Array(oe);
    for (var I = 0; I < Y[g].length; I++)
      Y[g][I] = 255 & y.buffer[I + b];
    b += oe;
    var fe = eu.getErrorCorrectPolynomial(ee), J = new AR(Y[g], fe.getLength() - 1), De = J.mod(fe);
    Z[g] = new Array(fe.getLength() - 1);
    for (var I = 0; I < Z[g].length; I++) {
      var ae = I + De.getLength() - Z[g].length;
      Z[g][I] = ae >= 0 ? De.get(ae) : 0;
    }
  }
  for (var H = 0, I = 0; I < S.length; I++)
    H += S[I].totalCount;
  for (var ue = new Array(H), et = 0, I = 0; I < C; I++)
    for (var g = 0; g < S.length; g++)
      I < Y[g].length && (ue[et++] = Y[g][I]);
  for (var I = 0; I < L; I++)
    for (var g = 0; g < S.length; g++)
      I < Z[g].length && (ue[et++] = Z[g][I]);
  return ue;
};
var UR = tl, W0 = {};
Object.defineProperty(W0, "__esModule", {
  value: !0
});
var jR = Object.assign || function(y) {
  for (var S = 1; S < arguments.length; S++) {
    var b = arguments[S];
    for (var C in b)
      Object.prototype.hasOwnProperty.call(b, C) && (y[C] = b[C]);
  }
  return y;
}, PR = tS, Po = dS(PR), cS = po, dg = dS(cS);
function dS(y) {
  return y && y.__esModule ? y : { default: y };
}
function FR(y, S) {
  var b = {};
  for (var C in y)
    S.indexOf(C) >= 0 || Object.prototype.hasOwnProperty.call(y, C) && (b[C] = y[C]);
  return b;
}
var HR = {
  bgColor: Po.default.oneOfType([Po.default.object, Po.default.string]).isRequired,
  bgD: Po.default.string.isRequired,
  fgColor: Po.default.oneOfType([Po.default.object, Po.default.string]).isRequired,
  fgD: Po.default.string.isRequired,
  size: Po.default.number.isRequired,
  title: Po.default.string,
  viewBoxSize: Po.default.number.isRequired,
  xmlns: Po.default.string
}, X0 = (0, cS.forwardRef)(function(y, S) {
  var b = y.bgColor, C = y.bgD, L = y.fgD, Y = y.fgColor, Z = y.size, g = y.title, oe = y.viewBoxSize, ee = y.xmlns, I = ee === void 0 ? "http://www.w3.org/2000/svg" : ee, fe = FR(y, ["bgColor", "bgD", "fgD", "fgColor", "size", "title", "viewBoxSize", "xmlns"]);
  return dg.default.createElement(
    "svg",
    jR({}, fe, { height: Z, ref: S, viewBox: "0 0 " + oe + " " + oe, width: Z, xmlns: I }),
    g ? dg.default.createElement(
      "title",
      null,
      g
    ) : null,
    dg.default.createElement("path", { d: C, fill: b }),
    dg.default.createElement("path", { d: L, fill: Y })
  );
});
X0.displayName = "QRCodeSvg";
X0.propTypes = HR;
W0.default = X0;
Object.defineProperty(pg, "__esModule", {
  value: !0
});
pg.QRCode = void 0;
var BR = Object.assign || function(y) {
  for (var S = 1; S < arguments.length; S++) {
    var b = arguments[S];
    for (var C in b)
      Object.prototype.hasOwnProperty.call(b, C) && (y[C] = b[C]);
  }
  return y;
}, VR = tS, ql = hv(VR), YR = rS, IR = hv(YR), $R = UR, QR = hv($R), fS = po, WR = hv(fS), XR = W0, qR = hv(XR);
function hv(y) {
  return y && y.__esModule ? y : { default: y };
}
function GR(y, S) {
  var b = {};
  for (var C in y)
    S.indexOf(C) >= 0 || Object.prototype.hasOwnProperty.call(y, C) && (b[C] = y[C]);
  return b;
}
var KR = {
  bgColor: ql.default.oneOfType([ql.default.object, ql.default.string]),
  fgColor: ql.default.oneOfType([ql.default.object, ql.default.string]),
  level: ql.default.string,
  size: ql.default.number,
  value: ql.default.string.isRequired
}, vg = (0, fS.forwardRef)(function(y, S) {
  var b = y.bgColor, C = b === void 0 ? "#FFFFFF" : b, L = y.fgColor, Y = L === void 0 ? "#000000" : L, Z = y.level, g = Z === void 0 ? "L" : Z, oe = y.size, ee = oe === void 0 ? 256 : oe, I = y.value, fe = GR(y, ["bgColor", "fgColor", "level", "size", "value"]), J = new QR.default(-1, IR.default[g]);
  J.addData(I), J.make();
  var De = J.modules;
  return WR.default.createElement(qR.default, BR({}, fe, {
    bgColor: C,
    bgD: De.map(function(ae, H) {
      return ae.map(function(ue, et) {
        return ue ? "" : "M " + et + " " + H + " l 1 0 0 1 -1 0 Z";
      }).join(" ");
    }).join(" "),
    fgColor: Y,
    fgD: De.map(function(ae, H) {
      return ae.map(function(ue, et) {
        return ue ? "M " + et + " " + H + " l 1 0 0 1 -1 0 Z" : "";
      }).join(" ");
    }).join(" "),
    ref: S,
    size: ee,
    viewBoxSize: De.length
  }));
});
pg.QRCode = vg;
vg.displayName = "QRCode";
vg.propTypes = KR;
var JR = pg.default = vg;
const ZR = ({
  cardData: y,
  username: S,
  isFlipped: b,
  onFlip: C,
  width: L = 400,
  height: Y = 250,
  scale: Z = 1
}) => {
  const [g, oe] = po.useState(!1), [ee, I] = po.useState(!1), fe = b !== void 0 ? b : g, J = () => {
    C ? C() : oe(!g);
  }, De = `${window.location.origin}/${S}`, ae = (H, ue = !1) => {
    const et = {
      borderRadius: `${(H == null ? void 0 : H.borderRadius) || 12}px`
    }, ot = ue ? H == null ? void 0 : H.backBackgroundImage : H == null ? void 0 : H.backgroundImage, Pe = ue ? H == null ? void 0 : H.backBackgroundColor : H == null ? void 0 : H.backgroundColor, Me = ue ? H == null ? void 0 : H.backBackgroundPattern : H == null ? void 0 : H.backgroundPattern, G = ue ? H == null ? void 0 : H.backUseGradient : H == null ? void 0 : H.useGradient, be = ue ? H == null ? void 0 : H.backGradientColors : H == null ? void 0 : H.gradientColors, it = ue ? H == null ? void 0 : H.backGradientDirection : H == null ? void 0 : H.gradientDirection;
    if (ot)
      return {
        ...et,
        backgroundImage: `url(${ot})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      };
    if (G && (be == null ? void 0 : be.length) >= 2) {
      const Wt = {
        "to-r": "to right",
        "to-br": "to bottom right",
        "to-b": "to bottom",
        "to-bl": "to bottom left"
      }[it] || "to bottom right";
      return {
        ...et,
        backgroundImage: `linear-gradient(${Wt}, ${be.join(", ")})`
      };
    }
    return {
      ...et,
      backgroundColor: Pe || "#1e293b",
      backgroundImage: Me && Me !== "none" ? {
        none: "",
        dots: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
        grid: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        waves: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)"
      }[Me] : void 0,
      backgroundSize: Me === "dots" || Me === "grid" ? "20px 20px" : void 0
    };
  };
  return /* @__PURE__ */ bt.jsxs("div", { className: "perspective-card", style: { transform: `scale(${Z})`, transformOrigin: "center center" }, children: [
    /* @__PURE__ */ bt.jsxs(
      "div",
      {
        className: `card-container ${fe ? "flipped" : ""}`,
        onMouseEnter: () => I(!0),
        onMouseLeave: () => I(!1),
        onClick: J,
        style: {
          width: `${L}px`,
          height: `${Y}px`,
          transform: ee && !fe ? "translateY(-8px) rotateX(2deg) rotateY(-2deg)" : ee && fe ? "translateY(-8px) rotateX(2deg) rotateY(182deg)" : fe ? "rotateY(180deg)" : "rotateY(0deg)"
        },
        children: [
          /* @__PURE__ */ bt.jsx("div", { className: "card-face card-front", children: /* @__PURE__ */ bt.jsxs(
            "div",
            {
              className: "absolute inset-0 rounded-xl overflow-hidden",
              style: ae(y.cardConfig, !1),
              children: [
                /* @__PURE__ */ bt.jsx("div", { className: "absolute inset-0 opacity-5", style: {
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\\"100\\" height=\\"100\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cfilter id=\\"noise\\"%3E%3CfeTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.9\\" numOctaves=\\"4\\" /%3E%3C/filter%3E%3Crect width=\\"100\\" height=\\"100\\" filter=\\"url(%23noise)\\" opacity=\\"0.4\\"/%3E%3C/svg%3E")'
                } }),
                /* @__PURE__ */ bt.jsx("div", { className: "absolute top-4 left-4 text-white/90 text-xs font-semibold tracking-wide", children: "Patra" }),
                /* @__PURE__ */ bt.jsx("div", { className: "absolute top-4 right-4", children: /* @__PURE__ */ bt.jsx("div", { className: "w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20", children: /* @__PURE__ */ bt.jsx(gR, { className: "w-4 h-4 text-white/80" }) }) }),
                /* @__PURE__ */ bt.jsx("div", { className: "relative h-full p-6", style: { position: "relative" }, children: (() => {
                  var et, ot, Pe, Me, G, be, it, qe, Wt, Ct, Vt, zt;
                  const H = y.cardConfig || {}, ue = H.positions || {
                    avatar: { x: 20, y: 60 },
                    name: { x: 140, y: 60 },
                    jobTitle: { x: 140, y: 90 },
                    company: { x: 140, y: 115 },
                    email: { x: 140, y: 150 },
                    phone: { x: 140, y: 175 }
                  };
                  return /* @__PURE__ */ bt.jsxs(bt.Fragment, { children: [
                    y.avatarUrl && /* @__PURE__ */ bt.jsx("div", { style: { position: "absolute", left: `${((et = ue.avatar) == null ? void 0 : et.x) || 20}px`, top: `${((ot = ue.avatar) == null ? void 0 : ot.y) || 60}px` }, children: /* @__PURE__ */ bt.jsx(
                      "img",
                      {
                        src: y.avatarUrl,
                        alt: y.fullName,
                        className: "rounded-lg object-cover border-2 border-white/20 shadow-xl",
                        style: { width: `${H.avatarSize || 96}px`, height: `${H.avatarSize || 96}px` }
                      }
                    ) }),
                    /* @__PURE__ */ bt.jsx("div", { style: { position: "absolute", left: `${((Pe = ue.name) == null ? void 0 : Pe.x) || 140}px`, top: `${((Me = ue.name) == null ? void 0 : Me.y) || 60}px` }, children: /* @__PURE__ */ bt.jsx("h2", { className: "font-bold", style: {
                      fontSize: `${(H.fontSize || 16) + 4}px`,
                      color: H.textColor || "#ffffff",
                      fontFamily: H.fontFamily || "Inter",
                      whiteSpace: "nowrap"
                    }, children: y.fullName }) }),
                    y.jobTitle && H.showJobTitle !== !1 && /* @__PURE__ */ bt.jsx("div", { style: { position: "absolute", left: `${((G = ue.jobTitle) == null ? void 0 : G.x) || 140}px`, top: `${((be = ue.jobTitle) == null ? void 0 : be.y) || 90}px` }, children: /* @__PURE__ */ bt.jsx("p", { style: {
                      fontSize: `${(H.fontSize || 16) - 2}px`,
                      color: H.textColor || "#ffffff",
                      fontFamily: H.fontFamily || "Inter",
                      opacity: 0.8,
                      whiteSpace: "nowrap"
                    }, children: y.jobTitle }) }),
                    y.company && H.showCompany !== !1 && /* @__PURE__ */ bt.jsx("div", { style: { position: "absolute", left: `${((it = ue.company) == null ? void 0 : it.x) || 140}px`, top: `${((qe = ue.company) == null ? void 0 : qe.y) || 115}px` }, children: /* @__PURE__ */ bt.jsx("p", { style: {
                      fontSize: `${(H.fontSize || 16) - 4}px`,
                      color: H.textColor || "#ffffff",
                      fontFamily: H.fontFamily || "Inter",
                      opacity: 0.6,
                      whiteSpace: "nowrap"
                    }, children: y.company }) }),
                    y.email && H.showEmail !== !1 && /* @__PURE__ */ bt.jsxs("div", { style: { position: "absolute", left: `${((Wt = ue.email) == null ? void 0 : Wt.x) || 140}px`, top: `${((Ct = ue.email) == null ? void 0 : Ct.y) || 150}px` }, className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ bt.jsx(mR, { className: "w-3 h-3 flex-shrink-0", style: { color: H.textColor || "#ffffff", opacity: 0.9 } }),
                      /* @__PURE__ */ bt.jsx("span", { style: {
                        fontSize: `${(H.fontSize || 16) - 4}px`,
                        color: H.textColor || "#ffffff",
                        fontFamily: H.fontFamily || "Inter",
                        opacity: 0.9,
                        whiteSpace: "nowrap"
                      }, children: y.email })
                    ] }),
                    y.phone && H.showPhone !== !1 && /* @__PURE__ */ bt.jsxs("div", { style: { position: "absolute", left: `${((Vt = ue.phone) == null ? void 0 : Vt.x) || 140}px`, top: `${((zt = ue.phone) == null ? void 0 : zt.y) || 175}px` }, className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ bt.jsx(yR, { className: "w-3 h-3 flex-shrink-0", style: { color: H.textColor || "#ffffff", opacity: 0.9 } }),
                      /* @__PURE__ */ bt.jsx("span", { style: {
                        fontSize: `${(H.fontSize || 16) - 4}px`,
                        color: H.textColor || "#ffffff",
                        fontFamily: H.fontFamily || "Inter",
                        opacity: 0.9,
                        whiteSpace: "nowrap"
                      }, children: y.phone })
                    ] })
                  ] });
                })() })
              ]
            }
          ) }),
          /* @__PURE__ */ bt.jsx("div", { className: "card-face card-back", children: /* @__PURE__ */ bt.jsxs(
            "div",
            {
              className: "absolute inset-0 rounded-xl overflow-hidden",
              style: ae(y.cardConfig, !0),
              children: [
                /* @__PURE__ */ bt.jsx("div", { className: "absolute inset-0 opacity-5", style: {
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\\"100\\" height=\\"100\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cfilter id=\\"noise\\"%3E%3CfeTurbulance type=\\"fractalNoise\\" baseFrequency=\\"0.9\\" numOctaves=\\"4\\" /%3E%3C/filter%3E%3Crect width=\\"100\\" height=\\"100\\" filter=\\"url(%23noise)\\" opacity=\\"0.4\\"/%3E%3C/svg%3E")'
                } }),
                /* @__PURE__ */ bt.jsx("div", { className: "absolute top-4 left-4 text-white/90 text-xs font-semibold tracking-wide", children: "Patra" }),
                /* @__PURE__ */ bt.jsxs("div", { className: "relative h-full flex flex-col items-center justify-center p-6", children: [
                  (() => {
                    var ot, Pe, Me, G;
                    const H = ((Pe = (ot = y.cardConfig) == null ? void 0 : ot.backPositions) == null ? void 0 : Pe.qrCode) || { x: 0, y: 0 }, ue = ((Me = y.cardConfig) == null ? void 0 : Me.qrCodeSize) || 110, et = ((G = y.cardConfig) == null ? void 0 : G.qrCodeStyle) || "square";
                    return /* @__PURE__ */ bt.jsx("div", { style: {
                      position: H.x !== 0 || H.y !== 0 ? "absolute" : "relative",
                      left: H.x !== 0 ? `${H.x}px` : void 0,
                      top: H.y !== 0 ? `${H.y}px` : void 0
                    }, children: /* @__PURE__ */ bt.jsx("div", { className: `bg-white p-4 shadow-2xl ${et === "rounded" ? "rounded-2xl" : "rounded-lg"}`, children: /* @__PURE__ */ bt.jsx(
                      JR,
                      {
                        value: De,
                        size: ue,
                        level: "M",
                        fgColor: "#000000",
                        bgColor: "#ffffff"
                      }
                    ) }) });
                  })(),
                  /* @__PURE__ */ bt.jsx("p", { className: "mt-4 text-xs text-white/30 font-mono tracking-wider", style: {
                    textShadow: "0 0 10px rgba(255,255,255,0.1)",
                    letterSpacing: "0.15em"
                  }, children: S })
                ] })
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ bt.jsx("style", { children: `
        .perspective-card {
          perspective: 2000px;
          cursor: pointer;
        }

        .card-container {
          position: relative;
          transition: transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1);
          transform-style: preserve-3d;
        }

        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 
                      0 0 0 1px rgba(255, 255, 255, 0.1) inset;
        }

        .card-front {
          transform: rotateY(0deg);
        }

        .card-back {
          transform: rotateY(180deg);
        }

        .card-container.flipped {
          transform: rotateY(180deg);
        }

        /* Matte finish effect */
        .card-face::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 12px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.05) 0%,
            rgba(255, 255, 255, 0) 50%,
            rgba(0, 0, 0, 0.05) 100%
          );
          pointer-events: none;
        }
      ` })
  ] });
}, e_ = `*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:Inter,system-ui,sans-serif;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:JetBrains Mono,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}:root{--background: 0 0% 100%;--background-subtle: 240 20% 99%;--background-muted: 240 10% 96%;--foreground: 240 10% 10%;--foreground-muted: 240 5% 45%;--card: 0 0% 100%;--card-foreground: 240 10% 10%;--card-hover: 240 10% 98%;--primary: 217 91% 60%;--primary-dark: 217 91% 45%;--primary-light: 217 91% 75%;--primary-foreground: 0 0% 100%;--accent: 24 95% 60%;--accent-dark: 24 95% 45%;--accent-light: 24 95% 75%;--accent-foreground: 0 0% 100%;--success: 142 76% 45%;--success-foreground: 0 0% 100%;--warning: 38 92% 50%;--warning-foreground: 0 0% 100%;--destructive: 0 84% 60%;--destructive-foreground: 0 0% 100%;--secondary: 240 5% 96%;--secondary-foreground: 240 10% 10%;--muted: 240 5% 96%;--muted-foreground: 240 5% 45%;--border: 240 10% 90%;--border-hover: 240 10% 80%;--input: 240 10% 90%;--ring: 217 91% 60%;--gradient-primary: linear-gradient(135deg, hsl(217 91% 60%), hsl(242 91% 60%));--gradient-warm: linear-gradient(135deg, hsl(24 95% 60%), hsl(12 95% 60%));--gradient-subtle: linear-gradient(180deg, hsl(240 20% 99%), hsl(0 0% 100%));--gradient-card: linear-gradient(145deg, hsl(0 0% 100%), hsl(240 10% 98%));--shadow-soft: 0 1px 3px hsl(240 10% 10% / .08);--shadow-medium: 0 4px 12px hsl(240 10% 10% / .1);--shadow-strong: 0 8px 24px hsl(240 10% 10% / .12);--shadow-card: 0 2px 8px hsl(240 10% 10% / .08);--ease-spring: cubic-bezier(.34, 1.56, .64, 1);--ease-smooth: cubic-bezier(.4, 0, .2, 1);--ease-bounce: cubic-bezier(.68, -.55, .265, 1.55);--radius: .75rem;--sidebar-background: 0 0% 100%;--sidebar-foreground: 240 10% 10%;--sidebar-primary: 217 91% 60%;--sidebar-primary-foreground: 0 0% 100%;--sidebar-accent: 240 5% 96%;--sidebar-accent-foreground: 240 10% 10%;--sidebar-border: 240 10% 90%;--sidebar-ring: 217 91% 60%}.dark{--background: 240 10% 3.9%;--background-subtle: 240 6% 6%;--background-muted: 240 4% 12%;--foreground: 0 0% 98%;--foreground-muted: 240 5% 64.9%;--card: 240 10% 3.9%;--card-foreground: 0 0% 98%;--card-hover: 240 6% 8%;--primary: 217 91% 60%;--primary-dark: 217 91% 45%;--primary-light: 217 91% 75%;--primary-foreground: 0 0% 98%;--accent: 24 95% 60%;--accent-dark: 24 95% 45%;--accent-light: 24 95% 75%;--accent-foreground: 240 10% 3.9%;--success: 142 76% 36%;--success-foreground: 0 0% 98%;--warning: 38 92% 50%;--warning-foreground: 240 10% 3.9%;--destructive: 0 84.2% 60.2%;--destructive-foreground: 0 0% 98%;--secondary: 240 4% 16%;--secondary-foreground: 0 0% 98%;--muted: 240 4% 16%;--muted-foreground: 240 5% 64.9%;--border: 240 6% 20%;--border-hover: 240 30% 25%;--input: 240 6% 20%;--ring: 217 91% 60%;--gradient-primary: linear-gradient(135deg, hsl(217 91% 60%), hsl(242 91% 60%));--gradient-warm: linear-gradient(135deg, hsl(24 95% 60%), hsl(12 95% 60%));--gradient-subtle: linear-gradient(180deg, hsl(240 6% 6%), hsl(240 10% 3.9%));--gradient-card: linear-gradient(145deg, hsl(240 6% 8%), hsl(240 4% 12%));--shadow-soft: 0 4px 12px hsl(240 10% 3.9% / .15);--shadow-medium: 0 8px 32px hsl(240 10% 3.9% / .25);--shadow-strong: 0 16px 64px hsl(240 10% 3.9% / .35);--shadow-card: 0 8px 32px hsl(240 10% 3.9% / .4);--sidebar-background: 240 5.9% 10%;--sidebar-foreground: 240 4.8% 95.9%;--sidebar-primary: 217 91% 60%;--sidebar-primary-foreground: 0 0% 100%;--sidebar-accent: 240 3.7% 15.9%;--sidebar-accent-foreground: 240 4.8% 95.9%;--sidebar-border: 240 3.7% 15.9%;--sidebar-ring: 217 91% 60%}*{border-color:hsl(var(--border))}body{background-color:hsl(var(--background));font-family:Inter,system-ui,sans-serif;color:hsl(var(--foreground));-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-feature-settings:"cv02","cv03","cv04","cv11"}.container{width:100%;margin-right:auto;margin-left:auto;padding-right:2rem;padding-left:2rem}@media (min-width: 1400px){.container{max-width:1400px}}.prose{color:var(--tw-prose-body);max-width:65ch}.prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);font-size:1.25em;line-height:1.6;margin-top:1.2em;margin-bottom:1.2em}.prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);text-decoration:underline;font-weight:500}.prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal;margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em}.prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:disc;margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em}.prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{font-weight:400;color:var(--tw-prose-counters)}.prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:600;margin-top:1.25em}.prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:500;font-style:italic;color:var(--tw-prose-quotes);border-inline-start-width:.25rem;border-inline-start-color:var(--tw-prose-quote-borders);quotes:"“""”""‘""’";margin-top:1.6em;margin-bottom:1.6em;padding-inline-start:1em}.prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:800;font-size:2.25em;margin-top:0;margin-bottom:.8888889em;line-height:1.1111111}.prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:900;color:inherit}.prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:700;font-size:1.5em;margin-top:2em;margin-bottom:1em;line-height:1.3333333}.prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:800;color:inherit}.prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:600;font-size:1.25em;margin-top:1.6em;margin-bottom:.6em;line-height:1.6}.prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:700;color:inherit}.prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:600;margin-top:1.5em;margin-bottom:.5em;line-height:1.5}.prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:700;color:inherit}.prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){display:block;margin-top:2em;margin-bottom:2em}.prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:500;font-family:inherit;color:var(--tw-prose-kbd);box-shadow:0 0 0 1px var(--tw-prose-kbd-shadows),0 3px 0 var(--tw-prose-kbd-shadows);font-size:.875em;border-radius:.3125rem;padding-top:.1875em;padding-inline-end:.375em;padding-bottom:.1875em;padding-inline-start:.375em}.prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-weight:600;font-size:.875em}.prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:"\`"}.prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"\`"}.prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);overflow-x:auto;font-weight:400;font-size:.875em;line-height:1.7142857;margin-top:1.7142857em;margin-bottom:1.7142857em;border-radius:.375rem;padding-top:.8571429em;padding-inline-end:1.1428571em;padding-bottom:.8571429em;padding-inline-start:1.1428571em}.prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){background-color:transparent;border-width:0;border-radius:0;padding:0;font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit}.prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:none}.prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){width:100%;table-layout:auto;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.7142857}.prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);font-weight:600;vertical-align:bottom;padding-inline-end:.5714286em;padding-bottom:.5714286em;padding-inline-start:.5714286em}.prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.prose :where(th,td):not(:where([class~=not-prose],[class~=not-prose] *)){text-align:start}.prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);font-size:.875em;line-height:1.4285714;margin-top:.8571429em}.prose{--tw-prose-body: #374151;--tw-prose-headings: #111827;--tw-prose-lead: #4b5563;--tw-prose-links: #111827;--tw-prose-bold: #111827;--tw-prose-counters: #6b7280;--tw-prose-bullets: #d1d5db;--tw-prose-hr: #e5e7eb;--tw-prose-quotes: #111827;--tw-prose-quote-borders: #e5e7eb;--tw-prose-captions: #6b7280;--tw-prose-kbd: #111827;--tw-prose-kbd-shadows: rgb(17 24 39 / 10%);--tw-prose-code: #111827;--tw-prose-pre-code: #e5e7eb;--tw-prose-pre-bg: #1f2937;--tw-prose-th-borders: #d1d5db;--tw-prose-td-borders: #e5e7eb;--tw-prose-invert-body: #d1d5db;--tw-prose-invert-headings: #fff;--tw-prose-invert-lead: #9ca3af;--tw-prose-invert-links: #fff;--tw-prose-invert-bold: #fff;--tw-prose-invert-counters: #9ca3af;--tw-prose-invert-bullets: #4b5563;--tw-prose-invert-hr: #374151;--tw-prose-invert-quotes: #f3f4f6;--tw-prose-invert-quote-borders: #374151;--tw-prose-invert-captions: #9ca3af;--tw-prose-invert-kbd: #fff;--tw-prose-invert-kbd-shadows: rgb(255 255 255 / 10%);--tw-prose-invert-code: #fff;--tw-prose-invert-pre-code: #d1d5db;--tw-prose-invert-pre-bg: rgb(0 0 0 / 50%);--tw-prose-invert-th-borders: #4b5563;--tw-prose-invert-td-borders: #374151;font-size:1rem;line-height:1.75}.prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.prose :where(.prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.prose :where(.prose>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.prose :where(.prose>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.prose :where(.prose>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.prose :where(.prose>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-inline-start:1.625em}.prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.5714286em;padding-inline-end:.5714286em;padding-bottom:.5714286em;padding-inline-start:.5714286em}.prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.prose :where(.prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose :where(.prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.prose-sm{font-size:.875rem;line-height:1.7142857}.prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em;margin-bottom:1.1428571em}.prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.2857143em;line-height:1.5555556;margin-top:.8888889em;margin-bottom:.8888889em}.prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.3333333em;margin-bottom:1.3333333em;padding-inline-start:1.1111111em}.prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:2.1428571em;margin-top:0;margin-bottom:.8em;line-height:1.2}.prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.4285714em;margin-top:1.6em;margin-bottom:.8em;line-height:1.4}.prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:1.2857143em;margin-top:1.5555556em;margin-bottom:.4444444em;line-height:1.5555556}.prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.4285714em;margin-bottom:.5714286em;line-height:1.4285714}.prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7142857em;margin-bottom:1.7142857em}.prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7142857em;margin-bottom:1.7142857em}.prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7142857em;margin-bottom:1.7142857em}.prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em;border-radius:.3125rem;padding-top:.1428571em;padding-inline-end:.3571429em;padding-bottom:.1428571em;padding-inline-start:.3571429em}.prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em}.prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8888889em}.prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em;line-height:1.6666667;margin-top:1.6666667em;margin-bottom:1.6666667em;border-radius:.25rem;padding-top:.6666667em;padding-inline-end:1em;padding-bottom:.6666667em;padding-inline-start:1em}.prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em;margin-bottom:1.1428571em;padding-inline-start:1.5714286em}.prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em;margin-bottom:1.1428571em;padding-inline-start:1.5714286em}.prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.2857143em;margin-bottom:.2857143em}.prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.4285714em}.prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.4285714em}.prose-sm :where(.prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5714286em;margin-bottom:.5714286em}.prose-sm :where(.prose-sm>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em}.prose-sm :where(.prose-sm>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.1428571em}.prose-sm :where(.prose-sm>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em}.prose-sm :where(.prose-sm>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.1428571em}.prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5714286em;margin-bottom:.5714286em}.prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em;margin-bottom:1.1428571em}.prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.1428571em}.prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.2857143em;padding-inline-start:1.5714286em}.prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.8571429em;margin-bottom:2.8571429em}.prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em;line-height:1.5}.prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:1em;padding-bottom:.6666667em;padding-inline-start:1em}.prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.6666667em;padding-inline-end:1em;padding-bottom:.6666667em;padding-inline-start:1em}.prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.7142857em;margin-bottom:1.7142857em}.prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.8571429em;line-height:1.3333333;margin-top:.6666667em}.prose-sm :where(.prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.prose-sm :where(.prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.prose-slate{--tw-prose-body: #334155;--tw-prose-headings: #0f172a;--tw-prose-lead: #475569;--tw-prose-links: #0f172a;--tw-prose-bold: #0f172a;--tw-prose-counters: #64748b;--tw-prose-bullets: #cbd5e1;--tw-prose-hr: #e2e8f0;--tw-prose-quotes: #0f172a;--tw-prose-quote-borders: #e2e8f0;--tw-prose-captions: #64748b;--tw-prose-kbd: #0f172a;--tw-prose-kbd-shadows: rgb(15 23 42 / 10%);--tw-prose-code: #0f172a;--tw-prose-pre-code: #e2e8f0;--tw-prose-pre-bg: #1e293b;--tw-prose-th-borders: #cbd5e1;--tw-prose-td-borders: #e2e8f0;--tw-prose-invert-body: #cbd5e1;--tw-prose-invert-headings: #fff;--tw-prose-invert-lead: #94a3b8;--tw-prose-invert-links: #fff;--tw-prose-invert-bold: #fff;--tw-prose-invert-counters: #94a3b8;--tw-prose-invert-bullets: #475569;--tw-prose-invert-hr: #334155;--tw-prose-invert-quotes: #f1f5f9;--tw-prose-invert-quote-borders: #334155;--tw-prose-invert-captions: #94a3b8;--tw-prose-invert-kbd: #fff;--tw-prose-invert-kbd-shadows: rgb(255 255 255 / 10%);--tw-prose-invert-code: #fff;--tw-prose-invert-pre-code: #cbd5e1;--tw-prose-invert-pre-bg: rgb(0 0 0 / 50%);--tw-prose-invert-th-borders: #475569;--tw-prose-invert-td-borders: #334155}.prose-invert{--tw-prose-body: var(--tw-prose-invert-body);--tw-prose-headings: var(--tw-prose-invert-headings);--tw-prose-lead: var(--tw-prose-invert-lead);--tw-prose-links: var(--tw-prose-invert-links);--tw-prose-bold: var(--tw-prose-invert-bold);--tw-prose-counters: var(--tw-prose-invert-counters);--tw-prose-bullets: var(--tw-prose-invert-bullets);--tw-prose-hr: var(--tw-prose-invert-hr);--tw-prose-quotes: var(--tw-prose-invert-quotes);--tw-prose-quote-borders: var(--tw-prose-invert-quote-borders);--tw-prose-captions: var(--tw-prose-invert-captions);--tw-prose-kbd: var(--tw-prose-invert-kbd);--tw-prose-kbd-shadows: var(--tw-prose-invert-kbd-shadows);--tw-prose-code: var(--tw-prose-invert-code);--tw-prose-pre-code: var(--tw-prose-invert-pre-code);--tw-prose-pre-bg: var(--tw-prose-invert-pre-bg);--tw-prose-th-borders: var(--tw-prose-invert-th-borders);--tw-prose-td-borders: var(--tw-prose-invert-td-borders)}.card-premium{background:hsl(var(--card));border:1px solid hsl(var(--border));box-shadow:var(--shadow-card);transition:all .3s var(--ease-smooth)}.card-premium:hover{background:hsl(var(--card-hover));border-color:hsl(var(--border-hover));box-shadow:var(--shadow-medium)}.btn-gradient{background:var(--gradient-primary);transition:all .3s var(--ease-smooth)}.btn-gradient:hover{opacity:.9;transform:translateY(-1px)}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.pointer-events-none{pointer-events:none}.pointer-events-auto{pointer-events:auto}.visible{visibility:visible}.invisible{visibility:hidden}.collapse{visibility:collapse}.static{position:static}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.sticky{position:sticky}.-inset-1{top:-.25rem;right:-.25rem;bottom:-.25rem;left:-.25rem}.inset-0{top:0;right:0;bottom:0;left:0}.inset-2{top:.5rem;right:.5rem;bottom:.5rem;left:.5rem}.inset-4{top:1rem;right:1rem;bottom:1rem;left:1rem}.inset-x-0{left:0;right:0}.inset-y-0{top:0;bottom:0}.-bottom-0\\.5{bottom:-.125rem}.-bottom-12{bottom:-3rem}.-bottom-2{bottom:-.5rem}.-bottom-6{bottom:-1.5rem}.-left-12{left:-3rem}.-left-6{left:-1.5rem}.-right-0\\.5{right:-.125rem}.-right-10{right:-2.5rem}.-right-12{right:-3rem}.-right-2{right:-.5rem}.-right-3{right:-.75rem}.-right-4{right:-1rem}.-top-12{top:-3rem}.-top-3{top:-.75rem}.-top-6{top:-1.5rem}.-top-8{top:-2rem}.bottom-0{bottom:0}.bottom-1\\.5{bottom:.375rem}.bottom-20{bottom:5rem}.bottom-32{bottom:8rem}.bottom-40{bottom:10rem}.bottom-\\[-10\\%\\]{bottom:-10%}.left-0{left:0}.left-1{left:.25rem}.left-1\\/2{left:50%}.left-1\\/3{left:33.333333%}.left-1\\/4{left:25%}.left-10{left:2.5rem}.left-2{left:.5rem}.left-2\\.5{left:.625rem}.left-20{left:5rem}.left-3{left:.75rem}.left-4{left:1rem}.left-6{left:1.5rem}.left-\\[-5\\%\\]{left:-5%}.left-\\[20\\%\\]{left:20%}.left-\\[50\\%\\]{left:50%}.right-0{right:0}.right-1{right:.25rem}.right-1\\/3{right:33.333333%}.right-1\\/4{right:25%}.right-10{right:2.5rem}.right-2{right:.5rem}.right-20{right:5rem}.right-3{right:.75rem}.right-4{right:1rem}.right-6{right:1.5rem}.right-\\[-5\\%\\]{right:-5%}.top-0{top:0}.top-1{top:.25rem}.top-1\\.5{top:.375rem}.top-1\\/2{top:50%}.top-1\\/4{top:25%}.top-16{top:4rem}.top-2{top:.5rem}.top-20{top:5rem}.top-24{top:6rem}.top-3{top:.75rem}.top-3\\.5{top:.875rem}.top-4{top:1rem}.top-40{top:10rem}.top-6{top:1.5rem}.top-\\[-10\\%\\]{top:-10%}.top-\\[1px\\]{top:1px}.top-\\[40\\%\\]{top:40%}.top-\\[50\\%\\]{top:50%}.top-\\[60\\%\\]{top:60%}.top-full{top:100%}.-z-10{z-index:-10}.z-0{z-index:0}.z-10{z-index:10}.z-20{z-index:20}.z-30{z-index:30}.z-40{z-index:40}.z-50{z-index:50}.z-\\[100\\]{z-index:100}.z-\\[1\\]{z-index:1}.z-\\[60\\]{z-index:60}.col-span-2{grid-column:span 2 / span 2}.-mx-1{margin-left:-.25rem;margin-right:-.25rem}.-mx-2{margin-left:-.5rem;margin-right:-.5rem}.-mx-4{margin-left:-1rem;margin-right:-1rem}.mx-1{margin-left:.25rem;margin-right:.25rem}.mx-2{margin-left:.5rem;margin-right:.5rem}.mx-3\\.5{margin-left:.875rem;margin-right:.875rem}.mx-4{margin-left:1rem;margin-right:1rem}.mx-auto{margin-left:auto;margin-right:auto}.my-0\\.5{margin-top:.125rem;margin-bottom:.125rem}.my-1{margin-top:.25rem;margin-bottom:.25rem}.my-2{margin-top:.5rem;margin-bottom:.5rem}.my-4{margin-top:1rem;margin-bottom:1rem}.my-6{margin-top:1.5rem;margin-bottom:1.5rem}.my-auto{margin-top:auto;margin-bottom:auto}.-ml-4{margin-left:-1rem}.-mr-8{margin-right:-2rem}.-mt-12{margin-top:-3rem}.-mt-16{margin-top:-4rem}.-mt-20{margin-top:-5rem}.-mt-4{margin-top:-1rem}.-mt-8{margin-top:-2rem}.mb-0\\.5{margin-bottom:.125rem}.mb-1{margin-bottom:.25rem}.mb-10{margin-bottom:2.5rem}.mb-12{margin-bottom:3rem}.mb-16{margin-bottom:4rem}.mb-2{margin-bottom:.5rem}.mb-20{margin-bottom:5rem}.mb-3{margin-bottom:.75rem}.mb-4{margin-bottom:1rem}.mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.ml-0\\.5{margin-left:.125rem}.ml-1{margin-left:.25rem}.ml-16{margin-left:4rem}.ml-2{margin-left:.5rem}.ml-4{margin-left:1rem}.ml-6{margin-left:1.5rem}.ml-auto{margin-left:auto}.mr-1{margin-right:.25rem}.mr-2{margin-right:.5rem}.mt-0\\.5{margin-top:.125rem}.mt-1{margin-top:.25rem}.mt-1\\.5{margin-top:.375rem}.mt-10{margin-top:2.5rem}.mt-12{margin-top:3rem}.mt-16{margin-top:4rem}.mt-2{margin-top:.5rem}.mt-20{margin-top:5rem}.mt-24{margin-top:6rem}.mt-3{margin-top:.75rem}.mt-4{margin-top:1rem}.mt-5{margin-top:1.25rem}.mt-6{margin-top:1.5rem}.mt-8{margin-top:2rem}.mt-auto{margin-top:auto}.line-clamp-2{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.line-clamp-3{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3}.block{display:block}.inline-block{display:inline-block}.inline{display:inline}.flex{display:flex}.inline-flex{display:inline-flex}.table{display:table}.grid{display:grid}.hidden{display:none}.aspect-\\[1\\.586\\/1\\]{aspect-ratio:1.586/1}.aspect-\\[16\\/10\\]{aspect-ratio:16/10}.aspect-square{aspect-ratio:1 / 1}.aspect-video{aspect-ratio:16 / 9}.size-4{width:1rem;height:1rem}.h-1{height:.25rem}.h-1\\.5{height:.375rem}.h-10{height:2.5rem}.h-11{height:2.75rem}.h-12{height:3rem}.h-14{height:3.5rem}.h-16{height:4rem}.h-2{height:.5rem}.h-2\\.5{height:.625rem}.h-20{height:5rem}.h-24{height:6rem}.h-28{height:7rem}.h-3{height:.75rem}.h-3\\.5{height:.875rem}.h-32{height:8rem}.h-4{height:1rem}.h-40{height:10rem}.h-48{height:12rem}.h-5{height:1.25rem}.h-52{height:13rem}.h-6{height:1.5rem}.h-64{height:16rem}.h-7{height:1.75rem}.h-8{height:2rem}.h-80{height:20rem}.h-9{height:2.25rem}.h-96{height:24rem}.h-\\[1px\\]{height:1px}.h-\\[250px\\]{height:250px}.h-\\[300px\\]{height:300px}.h-\\[500px\\]{height:500px}.h-\\[60px\\]{height:60px}.h-\\[90vh\\]{height:90vh}.h-\\[calc\\(100vh-120px\\)\\]{height:calc(100vh - 120px)}.h-\\[calc\\(100vh-65px\\)\\]{height:calc(100vh - 65px)}.h-\\[calc\\(100vh-8rem\\)\\]{height:calc(100vh - 8rem)}.h-\\[var\\(--radix-navigation-menu-viewport-height\\)\\]{height:var(--radix-navigation-menu-viewport-height)}.h-\\[var\\(--radix-select-trigger-height\\)\\]{height:var(--radix-select-trigger-height)}.h-auto{height:auto}.h-full{height:100%}.h-px{height:1px}.h-screen{height:100vh}.h-svh{height:100svh}.max-h-96{max-height:24rem}.max-h-\\[200px\\]{max-height:200px}.max-h-\\[250px\\]{max-height:250px}.max-h-\\[300px\\]{max-height:300px}.max-h-\\[90vh\\]{max-height:90vh}.max-h-full{max-height:100%}.max-h-screen{max-height:100vh}.min-h-0{min-height:0px}.min-h-32{min-height:8rem}.min-h-\\[100px\\]{min-height:100px}.min-h-\\[120px\\]{min-height:120px}.min-h-\\[150px\\]{min-height:150px}.min-h-\\[200px\\]{min-height:200px}.min-h-\\[300px\\]{min-height:300px}.min-h-\\[44px\\]{min-height:44px}.min-h-\\[500px\\]{min-height:500px}.min-h-\\[60px\\]{min-height:60px}.min-h-\\[80px\\]{min-height:80px}.min-h-\\[calc\\(100vh-73px\\)\\]{min-height:calc(100vh - 73px)}.min-h-full{min-height:100%}.min-h-screen{min-height:100vh}.min-h-svh{min-height:100svh}.w-0{width:0px}.w-1{width:.25rem}.w-1\\.5{width:.375rem}.w-1\\/2{width:50%}.w-10{width:2.5rem}.w-11{width:2.75rem}.w-12{width:3rem}.w-14{width:3.5rem}.w-16{width:4rem}.w-2{width:.5rem}.w-2\\.5{width:.625rem}.w-20{width:5rem}.w-24{width:6rem}.w-28{width:7rem}.w-3{width:.75rem}.w-3\\.5{width:.875rem}.w-3\\/4{width:75%}.w-32{width:8rem}.w-36{width:9rem}.w-4{width:1rem}.w-40{width:10rem}.w-48{width:12rem}.w-5{width:1.25rem}.w-5\\/6{width:83.333333%}.w-56{width:14rem}.w-6{width:1.5rem}.w-64{width:16rem}.w-7{width:1.75rem}.w-72{width:18rem}.w-8{width:2rem}.w-80{width:20rem}.w-9{width:2.25rem}.w-96{width:24rem}.w-\\[--sidebar-width\\]{width:var(--sidebar-width)}.w-\\[100px\\]{width:100px}.w-\\[150px\\]{width:150px}.w-\\[180px\\]{width:180px}.w-\\[1px\\]{width:1px}.w-\\[300px\\]{width:300px}.w-\\[400px\\]{width:400px}.w-\\[500px\\]{width:500px}.w-\\[600px\\]{width:600px}.w-\\[90vw\\]{width:90vw}.w-auto{width:auto}.w-full{width:100%}.w-max{width:-moz-max-content;width:max-content}.w-px{width:1px}.min-w-0{min-width:0px}.min-w-5{min-width:1.25rem}.min-w-\\[100px\\]{min-width:100px}.min-w-\\[120px\\]{min-width:120px}.min-w-\\[12rem\\]{min-width:12rem}.min-w-\\[4\\.5rem\\]{min-width:4.5rem}.min-w-\\[8rem\\]{min-width:8rem}.min-w-\\[var\\(--radix-select-trigger-width\\)\\]{min-width:var(--radix-select-trigger-width)}.min-w-max{min-width:-moz-max-content;min-width:max-content}.max-w-2xl{max-width:42rem}.max-w-3xl{max-width:48rem}.max-w-4xl{max-width:56rem}.max-w-5xl{max-width:64rem}.max-w-6xl{max-width:72rem}.max-w-7xl{max-width:80rem}.max-w-\\[--skeleton-width\\]{max-width:var(--skeleton-width)}.max-w-\\[200px\\]{max-width:200px}.max-w-\\[350px\\]{max-width:350px}.max-w-\\[85\\%\\]{max-width:85%}.max-w-full{max-width:100%}.max-w-lg{max-width:32rem}.max-w-max{max-width:-moz-max-content;max-width:max-content}.max-w-md{max-width:28rem}.max-w-none{max-width:none}.max-w-sm{max-width:24rem}.max-w-xl{max-width:36rem}.max-w-xs{max-width:20rem}.flex-1{flex:1 1 0%}.flex-none{flex:none}.flex-shrink-0,.shrink-0{flex-shrink:0}.grow{flex-grow:1}.grow-0{flex-grow:0}.basis-full{flex-basis:100%}.caption-bottom{caption-side:bottom}.border-collapse{border-collapse:collapse}.origin-left{transform-origin:left}.-translate-x-1\\/2{--tw-translate-x: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-x-px{--tw-translate-x: -1px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-1\\/2{--tw-translate-y: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-4{--tw-translate-y: -1rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-full{--tw-translate-y: -100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-0\\.5{--tw-translate-x: .125rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-1{--tw-translate-x: .25rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-1\\/2{--tw-translate-x: 50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-\\[-50\\%\\]{--tw-translate-x: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-px{--tw-translate-x: 1px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-y-0{--tw-translate-y: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-y-1{--tw-translate-y: .25rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-y-2{--tw-translate-y: .5rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-y-4{--tw-translate-y: 1rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-y-\\[-50\\%\\]{--tw-translate-y: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-rotate-6{--tw-rotate: -6deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-rotate-90{--tw-rotate: -90deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-0{--tw-rotate: 0deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-180{--tw-rotate: 180deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-45{--tw-rotate: 45deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-6{--tw-rotate: 6deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-90{--tw-rotate: 90deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-100{--tw-scale-x: 1;--tw-scale-y: 1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-90{--tw-scale-x: .9;--tw-scale-y: .9;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-95{--tw-scale-x: .95;--tw-scale-y: .95;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-x-0{--tw-scale-x: 0;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.transform-gpu{transform:translate3d(var(--tw-translate-x),var(--tw-translate-y),0) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes bounce{0%,to{transform:translateY(-25%);animation-timing-function:cubic-bezier(.8,0,1,1)}50%{transform:none;animation-timing-function:cubic-bezier(0,0,.2,1)}}.animate-bounce{animation:bounce 1s infinite}.animate-float{animation:float 6s ease-in-out infinite}.animate-glow{animation:glow 2s ease-in-out infinite alternate}@keyframes ping{75%,to{transform:scale(2);opacity:0}}.animate-ping{animation:ping 1s cubic-bezier(0,0,.2,1) infinite}@keyframes pulse{50%{opacity:.5}}.animate-pulse{animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite}@keyframes scale-in{0%{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}.animate-scale-in{animation:scale-in .3s ease-out}@keyframes slide-up{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.animate-slide-up{animation:slide-up .5s ease-out}@keyframes spin{to{transform:rotate(360deg)}}.animate-spin{animation:spin 1s linear infinite}.cursor-default{cursor:default}.cursor-grab{cursor:grab}.cursor-not-allowed{cursor:not-allowed}.cursor-pointer{cursor:pointer}.touch-none{touch-action:none}.select-none{-webkit-user-select:none;-moz-user-select:none;user-select:none}.select-all{-webkit-user-select:all;-moz-user-select:all;user-select:all}.resize-none{resize:none}.scroll-mt-24{scroll-margin-top:6rem}.list-inside{list-style-position:inside}.list-decimal{list-style-type:decimal}.list-disc{list-style-type:disc}.list-none{list-style-type:none}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.grid-cols-5{grid-template-columns:repeat(5,minmax(0,1fr))}.grid-cols-6{grid-template-columns:repeat(6,minmax(0,1fr))}.grid-cols-7{grid-template-columns:repeat(7,minmax(0,1fr))}.grid-cols-\\[1fr_2fr\\]{grid-template-columns:1fr 2fr}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.flex-col-reverse{flex-direction:column-reverse}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-baseline{align-items:baseline}.items-stretch{align-items:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-0{gap:0px}.gap-1{gap:.25rem}.gap-1\\.5{gap:.375rem}.gap-12{gap:3rem}.gap-2{gap:.5rem}.gap-3{gap:.75rem}.gap-4{gap:1rem}.gap-5{gap:1.25rem}.gap-6{gap:1.5rem}.gap-8{gap:2rem}.space-x-1>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(.25rem * var(--tw-space-x-reverse));margin-left:calc(.25rem * calc(1 - var(--tw-space-x-reverse)))}.space-x-2>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(.5rem * var(--tw-space-x-reverse));margin-left:calc(.5rem * calc(1 - var(--tw-space-x-reverse)))}.space-x-3>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(.75rem * var(--tw-space-x-reverse));margin-left:calc(.75rem * calc(1 - var(--tw-space-x-reverse)))}.space-x-4>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(1rem * var(--tw-space-x-reverse));margin-left:calc(1rem * calc(1 - var(--tw-space-x-reverse)))}.space-x-8>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(2rem * var(--tw-space-x-reverse));margin-left:calc(2rem * calc(1 - var(--tw-space-x-reverse)))}.space-y-0\\.5>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.125rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.125rem * var(--tw-space-y-reverse))}.space-y-1>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.25rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.25rem * var(--tw-space-y-reverse))}.space-y-1\\.5>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.375rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.375rem * var(--tw-space-y-reverse))}.space-y-12>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(3rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(3rem * var(--tw-space-y-reverse))}.space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.5rem * var(--tw-space-y-reverse))}.space-y-24>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(6rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(6rem * var(--tw-space-y-reverse))}.space-y-3>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.75rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.75rem * var(--tw-space-y-reverse))}.space-y-4>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(1rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1rem * var(--tw-space-y-reverse))}.space-y-5>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(1.25rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1.25rem * var(--tw-space-y-reverse))}.space-y-6>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1.5rem * var(--tw-space-y-reverse))}.space-y-8>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(2rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(2rem * var(--tw-space-y-reverse))}.self-center{align-self:center}.overflow-auto{overflow:auto}.overflow-hidden{overflow:hidden}.overflow-x-auto{overflow-x:auto}.overflow-y-auto{overflow-y:auto}.overflow-x-hidden{overflow-x:hidden}.scroll-smooth{scroll-behavior:smooth}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.whitespace-nowrap{white-space:nowrap}.whitespace-pre-wrap{white-space:pre-wrap}.break-words{overflow-wrap:break-word}.break-all{word-break:break-all}.rounded{border-radius:.25rem}.rounded-2xl{border-radius:1rem}.rounded-\\[26px\\]{border-radius:26px}.rounded-\\[2px\\]{border-radius:2px}.rounded-\\[inherit\\]{border-radius:inherit}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:var(--radius)}.rounded-md{border-radius:calc(var(--radius) - 2px)}.rounded-none{border-radius:0}.rounded-sm{border-radius:calc(var(--radius) - 4px)}.rounded-xl{border-radius:.75rem}.rounded-t-\\[10px\\]{border-top-left-radius:10px;border-top-right-radius:10px}.rounded-bl-full{border-bottom-left-radius:9999px}.rounded-tl-sm{border-top-left-radius:calc(var(--radius) - 4px)}.rounded-tr-sm{border-top-right-radius:calc(var(--radius) - 4px)}.border{border-width:1px}.border-0{border-width:0px}.border-2{border-width:2px}.border-4{border-width:4px}.border-\\[1\\.5px\\]{border-width:1.5px}.border-y{border-top-width:1px;border-bottom-width:1px}.border-b{border-bottom-width:1px}.border-b-2{border-bottom-width:2px}.border-l{border-left-width:1px}.border-l-4{border-left-width:4px}.border-r{border-right-width:1px}.border-t{border-top-width:1px}.border-dashed{border-style:dashed}.border-none{border-style:none}.border-\\[--color-border\\]{border-color:var(--color-border)}.border-accent{border-color:hsl(var(--accent))}.border-amber-200{--tw-border-opacity: 1;border-color:rgb(253 230 138 / var(--tw-border-opacity, 1))}.border-background{border-color:hsl(var(--background))}.border-blue-200{--tw-border-opacity: 1;border-color:rgb(191 219 254 / var(--tw-border-opacity, 1))}.border-blue-200\\/20{border-color:#bfdbfe33}.border-border{border-color:hsl(var(--border))}.border-border\\/40{border-color:hsl(var(--border) / .4)}.border-border\\/50{border-color:hsl(var(--border) / .5)}.border-card{border-color:hsl(var(--card))}.border-destructive{border-color:hsl(var(--destructive))}.border-destructive\\/20{border-color:hsl(var(--destructive) / .2)}.border-destructive\\/50{border-color:hsl(var(--destructive) / .5)}.border-emerald-400\\/30{border-color:#34d3994d}.border-gray-200{--tw-border-opacity: 1;border-color:rgb(229 231 235 / var(--tw-border-opacity, 1))}.border-gray-300{--tw-border-opacity: 1;border-color:rgb(209 213 219 / var(--tw-border-opacity, 1))}.border-green-200{--tw-border-opacity: 1;border-color:rgb(187 247 208 / var(--tw-border-opacity, 1))}.border-green-200\\/20{border-color:#bbf7d033}.border-green-500{--tw-border-opacity: 1;border-color:rgb(34 197 94 / var(--tw-border-opacity, 1))}.border-green-500\\/20{border-color:#22c55e33}.border-input{border-color:hsl(var(--input))}.border-muted-foreground\\/25{border-color:hsl(var(--muted-foreground) / .25)}.border-orange-200{--tw-border-opacity: 1;border-color:rgb(254 215 170 / var(--tw-border-opacity, 1))}.border-orange-200\\/20{border-color:#fed7aa33}.border-pink-200{--tw-border-opacity: 1;border-color:rgb(251 207 232 / var(--tw-border-opacity, 1))}.border-primary{border-color:hsl(var(--primary))}.border-primary\\/20{border-color:hsl(var(--primary) / .2)}.border-purple-200{--tw-border-opacity: 1;border-color:rgb(233 213 255 / var(--tw-border-opacity, 1))}.border-purple-200\\/20{border-color:#e9d5ff33}.border-red-500{--tw-border-opacity: 1;border-color:rgb(239 68 68 / var(--tw-border-opacity, 1))}.border-slate-100{--tw-border-opacity: 1;border-color:rgb(241 245 249 / var(--tw-border-opacity, 1))}.border-slate-200{--tw-border-opacity: 1;border-color:rgb(226 232 240 / var(--tw-border-opacity, 1))}.border-slate-200\\/60{border-color:#e2e8f099}.border-slate-300{--tw-border-opacity: 1;border-color:rgb(203 213 225 / var(--tw-border-opacity, 1))}.border-slate-800{--tw-border-opacity: 1;border-color:rgb(30 41 59 / var(--tw-border-opacity, 1))}.border-slate-900{--tw-border-opacity: 1;border-color:rgb(15 23 42 / var(--tw-border-opacity, 1))}.border-transparent{border-color:transparent}.border-violet-200{--tw-border-opacity: 1;border-color:rgb(221 214 254 / var(--tw-border-opacity, 1))}.border-violet-400\\/40{border-color:#a78bfa66}.border-white{--tw-border-opacity: 1;border-color:rgb(255 255 255 / var(--tw-border-opacity, 1))}.border-white\\/10{border-color:#ffffff1a}.border-white\\/20{border-color:#fff3}.border-white\\/30{border-color:#ffffff4d}.border-yellow-200{--tw-border-opacity: 1;border-color:rgb(254 240 138 / var(--tw-border-opacity, 1))}.border-yellow-500\\/50{border-color:#eab30880}.border-l-transparent{border-left-color:transparent}.border-t-transparent{border-top-color:transparent}.border-t-white{--tw-border-opacity: 1;border-top-color:rgb(255 255 255 / var(--tw-border-opacity, 1))}.bg-\\[\\#fafafa\\]{--tw-bg-opacity: 1;background-color:rgb(250 250 250 / var(--tw-bg-opacity, 1))}.bg-\\[--color-bg\\]{background-color:var(--color-bg)}.bg-accent{background-color:hsl(var(--accent))}.bg-accent\\/60{background-color:hsl(var(--accent) / .6)}.bg-amber-500{--tw-bg-opacity: 1;background-color:rgb(245 158 11 / var(--tw-bg-opacity, 1))}.bg-background{background-color:hsl(var(--background))}.bg-background-subtle{background-color:hsl(var(--background-subtle))}.bg-background\\/50{background-color:hsl(var(--background) / .5)}.bg-background\\/80{background-color:hsl(var(--background) / .8)}.bg-background\\/95{background-color:hsl(var(--background) / .95)}.bg-black{--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity, 1))}.bg-black\\/0{background-color:#0000}.bg-black\\/40{background-color:#0006}.bg-black\\/50{background-color:#00000080}.bg-black\\/70{background-color:#000000b3}.bg-black\\/80{background-color:#000c}.bg-black\\/90{background-color:#000000e6}.bg-blue-100{--tw-bg-opacity: 1;background-color:rgb(219 234 254 / var(--tw-bg-opacity, 1))}.bg-blue-200\\/40{background-color:#bfdbfe66}.bg-blue-50{--tw-bg-opacity: 1;background-color:rgb(239 246 255 / var(--tw-bg-opacity, 1))}.bg-blue-500\\/10{background-color:#3b82f61a}.bg-blue-500\\/20{background-color:#3b82f633}.bg-blue-600{--tw-bg-opacity: 1;background-color:rgb(37 99 235 / var(--tw-bg-opacity, 1))}.bg-border{background-color:hsl(var(--border))}.bg-card{background-color:hsl(var(--card))}.bg-card\\/50{background-color:hsl(var(--card) / .5)}.bg-card\\/95{background-color:hsl(var(--card) / .95)}.bg-cyan-400{--tw-bg-opacity: 1;background-color:rgb(34 211 238 / var(--tw-bg-opacity, 1))}.bg-destructive{background-color:hsl(var(--destructive))}.bg-emerald-500{--tw-bg-opacity: 1;background-color:rgb(16 185 129 / var(--tw-bg-opacity, 1))}.bg-emerald-500\\/20{background-color:#10b98133}.bg-foreground{background-color:hsl(var(--foreground))}.bg-foreground-muted{background-color:hsl(var(--foreground-muted))}.bg-gray-100{--tw-bg-opacity: 1;background-color:rgb(243 244 246 / var(--tw-bg-opacity, 1))}.bg-gray-50{--tw-bg-opacity: 1;background-color:rgb(249 250 251 / var(--tw-bg-opacity, 1))}.bg-green-100{--tw-bg-opacity: 1;background-color:rgb(220 252 231 / var(--tw-bg-opacity, 1))}.bg-green-50{--tw-bg-opacity: 1;background-color:rgb(240 253 244 / var(--tw-bg-opacity, 1))}.bg-green-500{--tw-bg-opacity: 1;background-color:rgb(34 197 94 / var(--tw-bg-opacity, 1))}.bg-green-500\\/10{background-color:#22c55e1a}.bg-green-500\\/5{background-color:#22c55e0d}.bg-green-600{--tw-bg-opacity: 1;background-color:rgb(22 163 74 / var(--tw-bg-opacity, 1))}.bg-muted{background-color:hsl(var(--muted))}.bg-muted-foreground\\/10{background-color:hsl(var(--muted-foreground) / .1)}.bg-muted\\/10{background-color:hsl(var(--muted) / .1)}.bg-muted\\/30{background-color:hsl(var(--muted) / .3)}.bg-muted\\/5{background-color:hsl(var(--muted) / .05)}.bg-muted\\/50{background-color:hsl(var(--muted) / .5)}.bg-orange-50{--tw-bg-opacity: 1;background-color:rgb(255 247 237 / var(--tw-bg-opacity, 1))}.bg-orange-500{--tw-bg-opacity: 1;background-color:rgb(249 115 22 / var(--tw-bg-opacity, 1))}.bg-orange-500\\/10{background-color:#f973161a}.bg-orange-600{--tw-bg-opacity: 1;background-color:rgb(234 88 12 / var(--tw-bg-opacity, 1))}.bg-pink-200\\/30{background-color:#fbcfe84d}.bg-pink-400{--tw-bg-opacity: 1;background-color:rgb(244 114 182 / var(--tw-bg-opacity, 1))}.bg-pink-500{--tw-bg-opacity: 1;background-color:rgb(236 72 153 / var(--tw-bg-opacity, 1))}.bg-pink-500\\/10{background-color:#ec48991a}.bg-primary{background-color:hsl(var(--primary))}.bg-primary-foreground{background-color:hsl(var(--primary-foreground))}.bg-primary\\/10{background-color:hsl(var(--primary) / .1)}.bg-primary\\/5{background-color:hsl(var(--primary) / .05)}.bg-purple-100{--tw-bg-opacity: 1;background-color:rgb(243 232 255 / var(--tw-bg-opacity, 1))}.bg-purple-200\\/30{background-color:#e9d5ff4d}.bg-purple-200\\/40{background-color:#e9d5ff66}.bg-purple-500\\/10{background-color:#a855f71a}.bg-purple-500\\/20{background-color:#a855f733}.bg-red-100{--tw-bg-opacity: 1;background-color:rgb(254 226 226 / var(--tw-bg-opacity, 1))}.bg-red-500{--tw-bg-opacity: 1;background-color:rgb(239 68 68 / var(--tw-bg-opacity, 1))}.bg-red-500\\/10{background-color:#ef44441a}.bg-rose-500{--tw-bg-opacity: 1;background-color:rgb(244 63 94 / var(--tw-bg-opacity, 1))}.bg-secondary{background-color:hsl(var(--secondary))}.bg-slate-100{--tw-bg-opacity: 1;background-color:rgb(241 245 249 / var(--tw-bg-opacity, 1))}.bg-slate-200{--tw-bg-opacity: 1;background-color:rgb(226 232 240 / var(--tw-bg-opacity, 1))}.bg-slate-200\\/30{background-color:#e2e8f04d}.bg-slate-300{--tw-bg-opacity: 1;background-color:rgb(203 213 225 / var(--tw-bg-opacity, 1))}.bg-slate-300\\/20{background-color:#cbd5e133}.bg-slate-300\\/30{background-color:#cbd5e14d}.bg-slate-50{--tw-bg-opacity: 1;background-color:rgb(248 250 252 / var(--tw-bg-opacity, 1))}.bg-slate-900{--tw-bg-opacity: 1;background-color:rgb(15 23 42 / var(--tw-bg-opacity, 1))}.bg-slate-900\\/90{background-color:#0f172ae6}.bg-slate-950{--tw-bg-opacity: 1;background-color:rgb(2 6 23 / var(--tw-bg-opacity, 1))}.bg-teal-500{--tw-bg-opacity: 1;background-color:rgb(20 184 166 / var(--tw-bg-opacity, 1))}.bg-teal-500\\/20{background-color:#14b8a633}.bg-transparent{background-color:transparent}.bg-violet-100{--tw-bg-opacity: 1;background-color:rgb(237 233 254 / var(--tw-bg-opacity, 1))}.bg-violet-200\\/30{background-color:#ddd6fe4d}.bg-violet-400{--tw-bg-opacity: 1;background-color:rgb(167 139 250 / var(--tw-bg-opacity, 1))}.bg-violet-500{--tw-bg-opacity: 1;background-color:rgb(139 92 246 / var(--tw-bg-opacity, 1))}.bg-violet-500\\/20{background-color:#8b5cf633}.bg-violet-600{--tw-bg-opacity: 1;background-color:rgb(124 58 237 / var(--tw-bg-opacity, 1))}.bg-white{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity, 1))}.bg-white\\/10{background-color:#ffffff1a}.bg-white\\/20{background-color:#fff3}.bg-white\\/5{background-color:#ffffff0d}.bg-white\\/50{background-color:#ffffff80}.bg-white\\/70{background-color:#ffffffb3}.bg-white\\/80{background-color:#fffc}.bg-white\\/90{background-color:#ffffffe6}.bg-yellow-100{--tw-bg-opacity: 1;background-color:rgb(254 249 195 / var(--tw-bg-opacity, 1))}.bg-yellow-400{--tw-bg-opacity: 1;background-color:rgb(250 204 21 / var(--tw-bg-opacity, 1))}.bg-yellow-50{--tw-bg-opacity: 1;background-color:rgb(254 252 232 / var(--tw-bg-opacity, 1))}.bg-yellow-500\\/10{background-color:#eab3081a}.bg-yellow-500\\/5{background-color:#eab3080d}.bg-opacity-10{--tw-bg-opacity: .1}.bg-\\[linear-gradient\\(transparent_0\\%\\,transparent_calc\\(100\\%_-_1px\\)\\,rgba\\(255\\,255\\,255\\,0\\.1\\)_100\\%\\)\\,linear-gradient\\(90deg\\,transparent_0\\%\\,transparent_calc\\(100\\%_-_1px\\)\\,rgba\\(255\\,255\\,255\\,0\\.1\\)_100\\%\\)\\]{background-image:linear-gradient(transparent 0%,transparent calc(100% - 1px),rgba(255,255,255,.1) 100%),linear-gradient(90deg,transparent 0%,transparent calc(100% - 1px),rgba(255,255,255,.1) 100%)}.bg-\\[repeating-linear-gradient\\(0deg\\,transparent\\,transparent_2px\\,rgba\\(0\\,0\\,0\\,0\\.1\\)_2px\\,rgba\\(0\\,0\\,0\\,0\\.1\\)_4px\\)\\]{background-image:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.1) 2px,rgba(0,0,0,.1) 4px)}.bg-gradient-card{background-image:var(--gradient-card)}.bg-gradient-primary{background-image:var(--gradient-primary)}.bg-gradient-subtle{background-image:var(--gradient-subtle)}.bg-gradient-to-b{background-image:linear-gradient(to bottom,var(--tw-gradient-stops))}.bg-gradient-to-br{background-image:linear-gradient(to bottom right,var(--tw-gradient-stops))}.bg-gradient-to-r{background-image:linear-gradient(to right,var(--tw-gradient-stops))}.bg-gradient-to-t{background-image:linear-gradient(to top,var(--tw-gradient-stops))}.from-\\[\\#fafafa\\]{--tw-gradient-from: #fafafa var(--tw-gradient-from-position);--tw-gradient-to: rgb(250 250 250 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-amber-50{--tw-gradient-from: #fffbeb var(--tw-gradient-from-position);--tw-gradient-to: rgb(255 251 235 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-amber-50\\/50{--tw-gradient-from: rgb(255 251 235 / .5) var(--tw-gradient-from-position);--tw-gradient-to: rgb(255 251 235 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-amber-500{--tw-gradient-from: #f59e0b var(--tw-gradient-from-position);--tw-gradient-to: rgb(245 158 11 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-background{--tw-gradient-from: hsl(var(--background)) var(--tw-gradient-from-position);--tw-gradient-to: hsl(var(--background) / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-blue-100{--tw-gradient-from: #dbeafe var(--tw-gradient-from-position);--tw-gradient-to: rgb(219 234 254 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-blue-200\\/20{--tw-gradient-from: rgb(191 219 254 / .2) var(--tw-gradient-from-position);--tw-gradient-to: rgb(191 219 254 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-blue-400\\/10{--tw-gradient-from: rgb(96 165 250 / .1) var(--tw-gradient-from-position);--tw-gradient-to: rgb(96 165 250 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-blue-400\\/20{--tw-gradient-from: rgb(96 165 250 / .2) var(--tw-gradient-from-position);--tw-gradient-to: rgb(96 165 250 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-blue-400\\/30{--tw-gradient-from: rgb(96 165 250 / .3) var(--tw-gradient-from-position);--tw-gradient-to: rgb(96 165 250 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-blue-50{--tw-gradient-from: #eff6ff var(--tw-gradient-from-position);--tw-gradient-to: rgb(239 246 255 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-blue-50\\/50{--tw-gradient-from: rgb(239 246 255 / .5) var(--tw-gradient-from-position);--tw-gradient-to: rgb(239 246 255 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-blue-500{--tw-gradient-from: #3b82f6 var(--tw-gradient-from-position);--tw-gradient-to: rgb(59 130 246 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-blue-500\\/10{--tw-gradient-from: rgb(59 130 246 / .1) var(--tw-gradient-from-position);--tw-gradient-to: rgb(59 130 246 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-blue-600{--tw-gradient-from: #2563eb var(--tw-gradient-from-position);--tw-gradient-to: rgb(37 99 235 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-cyan-500{--tw-gradient-from: #06b6d4 var(--tw-gradient-from-position);--tw-gradient-to: rgb(6 182 212 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-emerald-100{--tw-gradient-from: #d1fae5 var(--tw-gradient-from-position);--tw-gradient-to: rgb(209 250 229 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-emerald-50\\/50{--tw-gradient-from: rgb(236 253 245 / .5) var(--tw-gradient-from-position);--tw-gradient-to: rgb(236 253 245 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-emerald-500{--tw-gradient-from: #10b981 var(--tw-gradient-from-position);--tw-gradient-to: rgb(16 185 129 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-foreground{--tw-gradient-from: hsl(var(--foreground)) var(--tw-gradient-from-position);--tw-gradient-to: hsl(var(--foreground) / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-gray-900{--tw-gradient-from: #111827 var(--tw-gradient-from-position);--tw-gradient-to: rgb(17 24 39 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-green-500{--tw-gradient-from: #22c55e var(--tw-gradient-from-position);--tw-gradient-to: rgb(34 197 94 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-green-500\\/10{--tw-gradient-from: rgb(34 197 94 / .1) var(--tw-gradient-from-position);--tw-gradient-to: rgb(34 197 94 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-indigo-50\\/50{--tw-gradient-from: rgb(238 242 255 / .5) var(--tw-gradient-from-position);--tw-gradient-to: rgb(238 242 255 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-indigo-500{--tw-gradient-from: #6366f1 var(--tw-gradient-from-position);--tw-gradient-to: rgb(99 102 241 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-orange-400{--tw-gradient-from: #fb923c var(--tw-gradient-from-position);--tw-gradient-to: rgb(251 146 60 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-orange-500{--tw-gradient-from: #f97316 var(--tw-gradient-from-position);--tw-gradient-to: rgb(249 115 22 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-orange-500\\/10{--tw-gradient-from: rgb(249 115 22 / .1) var(--tw-gradient-from-position);--tw-gradient-to: rgb(249 115 22 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-pink-500{--tw-gradient-from: #ec4899 var(--tw-gradient-from-position);--tw-gradient-to: rgb(236 72 153 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-primary{--tw-gradient-from: hsl(var(--primary)) var(--tw-gradient-from-position);--tw-gradient-to: hsl(var(--primary) / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-primary\\/10{--tw-gradient-from: hsl(var(--primary) / .1) var(--tw-gradient-from-position);--tw-gradient-to: hsl(var(--primary) / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-primary\\/5{--tw-gradient-from: hsl(var(--primary) / .05) var(--tw-gradient-from-position);--tw-gradient-to: hsl(var(--primary) / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-purple-400{--tw-gradient-from: #c084fc var(--tw-gradient-from-position);--tw-gradient-to: rgb(192 132 252 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-purple-400\\/10{--tw-gradient-from: rgb(192 132 252 / .1) var(--tw-gradient-from-position);--tw-gradient-to: rgb(192 132 252 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-purple-400\\/20{--tw-gradient-from: rgb(192 132 252 / .2) var(--tw-gradient-from-position);--tw-gradient-to: rgb(192 132 252 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-purple-400\\/30{--tw-gradient-from: rgb(192 132 252 / .3) var(--tw-gradient-from-position);--tw-gradient-to: rgb(192 132 252 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-purple-500{--tw-gradient-from: #a855f7 var(--tw-gradient-from-position);--tw-gradient-to: rgb(168 85 247 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-purple-500\\/10{--tw-gradient-from: rgb(168 85 247 / .1) var(--tw-gradient-from-position);--tw-gradient-to: rgb(168 85 247 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-purple-900{--tw-gradient-from: #581c87 var(--tw-gradient-from-position);--tw-gradient-to: rgb(88 28 135 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-rose-400{--tw-gradient-from: #fb7185 var(--tw-gradient-from-position);--tw-gradient-to: rgb(251 113 133 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-rose-50\\/50{--tw-gradient-from: rgb(255 241 242 / .5) var(--tw-gradient-from-position);--tw-gradient-to: rgb(255 241 242 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-rose-500{--tw-gradient-from: #f43f5e var(--tw-gradient-from-position);--tw-gradient-to: rgb(244 63 94 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-slate-100{--tw-gradient-from: #f1f5f9 var(--tw-gradient-from-position);--tw-gradient-to: rgb(241 245 249 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-slate-400{--tw-gradient-from: #94a3b8 var(--tw-gradient-from-position);--tw-gradient-to: rgb(148 163 184 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-slate-50{--tw-gradient-from: #f8fafc var(--tw-gradient-from-position);--tw-gradient-to: rgb(248 250 252 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-slate-800{--tw-gradient-from: #1e293b var(--tw-gradient-from-position);--tw-gradient-to: rgb(30 41 59 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-slate-900{--tw-gradient-from: #0f172a var(--tw-gradient-from-position);--tw-gradient-to: rgb(15 23 42 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-violet-100{--tw-gradient-from: #ede9fe var(--tw-gradient-from-position);--tw-gradient-to: rgb(237 233 254 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-violet-200\\/20{--tw-gradient-from: rgb(221 214 254 / .2) var(--tw-gradient-from-position);--tw-gradient-to: rgb(221 214 254 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-violet-400{--tw-gradient-from: #a78bfa var(--tw-gradient-from-position);--tw-gradient-to: rgb(167 139 250 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-violet-50{--tw-gradient-from: #f5f3ff var(--tw-gradient-from-position);--tw-gradient-to: rgb(245 243 255 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-violet-50\\/50{--tw-gradient-from: rgb(245 243 255 / .5) var(--tw-gradient-from-position);--tw-gradient-to: rgb(245 243 255 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-violet-500{--tw-gradient-from: #8b5cf6 var(--tw-gradient-from-position);--tw-gradient-to: rgb(139 92 246 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-violet-600{--tw-gradient-from: #7c3aed var(--tw-gradient-from-position);--tw-gradient-to: rgb(124 58 237 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-white{--tw-gradient-from: #fff var(--tw-gradient-from-position);--tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-white\\/10{--tw-gradient-from: rgb(255 255 255 / .1) var(--tw-gradient-from-position);--tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-white\\/5{--tw-gradient-from: rgb(255 255 255 / .05) var(--tw-gradient-from-position);--tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-yellow-300{--tw-gradient-from: #fde047 var(--tw-gradient-from-position);--tw-gradient-to: rgb(253 224 71 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.via-background{--tw-gradient-to: hsl(var(--background) / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), hsl(var(--background)) var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-orange-400{--tw-gradient-to: rgb(251 146 60 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #fb923c var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-pink-800{--tw-gradient-to: rgb(157 23 77 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #9d174d var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-purple-50{--tw-gradient-to: rgb(250 245 255 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #faf5ff var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-purple-500{--tw-gradient-to: rgb(168 85 247 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #a855f7 var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-purple-600{--tw-gradient-to: rgb(147 51 234 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #9333ea var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-slate-700{--tw-gradient-to: rgb(51 65 85 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #334155 var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-slate-900{--tw-gradient-to: rgb(15 23 42 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #0f172a var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-transparent{--tw-gradient-to: rgb(0 0 0 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), transparent var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-violet-900{--tw-gradient-to: rgb(76 29 149 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #4c1d95 var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-white{--tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #fff var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-white\\/95{--tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), rgb(255 255 255 / .95) var(--tw-gradient-via-position), var(--tw-gradient-to)}.to-accent\\/10{--tw-gradient-to: hsl(var(--accent) / .1) var(--tw-gradient-to-position)}.to-accent\\/5{--tw-gradient-to: hsl(var(--accent) / .05) var(--tw-gradient-to-position)}.to-black{--tw-gradient-to: #000 var(--tw-gradient-to-position)}.to-black\\/5{--tw-gradient-to: rgb(0 0 0 / .05) var(--tw-gradient-to-position)}.to-cyan-100{--tw-gradient-to: #cffafe var(--tw-gradient-to-position)}.to-cyan-200\\/20{--tw-gradient-to: rgb(165 243 252 / .2) var(--tw-gradient-to-position)}.to-cyan-400\\/10{--tw-gradient-to: rgb(34 211 238 / .1) var(--tw-gradient-to-position)}.to-cyan-400\\/20{--tw-gradient-to: rgb(34 211 238 / .2) var(--tw-gradient-to-position)}.to-cyan-400\\/30{--tw-gradient-to: rgb(34 211 238 / .3) var(--tw-gradient-to-position)}.to-cyan-50\\/50{--tw-gradient-to: rgb(236 254 255 / .5) var(--tw-gradient-to-position)}.to-cyan-500{--tw-gradient-to: #06b6d4 var(--tw-gradient-to-position)}.to-cyan-600{--tw-gradient-to: #0891b2 var(--tw-gradient-to-position)}.to-emerald-500\\/10{--tw-gradient-to: rgb(16 185 129 / .1) var(--tw-gradient-to-position)}.to-emerald-600{--tw-gradient-to: #059669 var(--tw-gradient-to-position)}.to-foreground\\/70{--tw-gradient-to: hsl(var(--foreground) / .7) var(--tw-gradient-to-position)}.to-gray-200{--tw-gradient-to: #e5e7eb var(--tw-gradient-to-position)}.to-gray-800{--tw-gradient-to: #1f2937 var(--tw-gradient-to-position)}.to-green-600{--tw-gradient-to: #16a34a var(--tw-gradient-to-position)}.to-indigo-100{--tw-gradient-to: #e0e7ff var(--tw-gradient-to-position)}.to-indigo-600{--tw-gradient-to: #4f46e5 var(--tw-gradient-to-position)}.to-muted\\/20{--tw-gradient-to: hsl(var(--muted) / .2) var(--tw-gradient-to-position)}.to-orange-50{--tw-gradient-to: #fff7ed var(--tw-gradient-to-position)}.to-orange-50\\/50{--tw-gradient-to: rgb(255 247 237 / .5) var(--tw-gradient-to-position)}.to-orange-500{--tw-gradient-to: #f97316 var(--tw-gradient-to-position)}.to-orange-700{--tw-gradient-to: #c2410c var(--tw-gradient-to-position)}.to-pink-400{--tw-gradient-to: #f472b6 var(--tw-gradient-to-position)}.to-pink-400\\/10{--tw-gradient-to: rgb(244 114 182 / .1) var(--tw-gradient-to-position)}.to-pink-400\\/20{--tw-gradient-to: rgb(244 114 182 / .2) var(--tw-gradient-to-position)}.to-pink-400\\/30{--tw-gradient-to: rgb(244 114 182 / .3) var(--tw-gradient-to-position)}.to-pink-50{--tw-gradient-to: #fdf2f8 var(--tw-gradient-to-position)}.to-pink-50\\/50{--tw-gradient-to: rgb(253 242 248 / .5) var(--tw-gradient-to-position)}.to-pink-500{--tw-gradient-to: #ec4899 var(--tw-gradient-to-position)}.to-pink-500\\/10{--tw-gradient-to: rgb(236 72 153 / .1) var(--tw-gradient-to-position)}.to-pink-600{--tw-gradient-to: #db2777 var(--tw-gradient-to-position)}.to-primary\\/10{--tw-gradient-to: hsl(var(--primary) / .1) var(--tw-gradient-to-position)}.to-primary\\/60{--tw-gradient-to: hsl(var(--primary) / .6) var(--tw-gradient-to-position)}.to-purple-100{--tw-gradient-to: #f3e8ff var(--tw-gradient-to-position)}.to-purple-200\\/20{--tw-gradient-to: rgb(233 213 255 / .2) var(--tw-gradient-to-position)}.to-purple-400{--tw-gradient-to: #c084fc var(--tw-gradient-to-position)}.to-purple-50{--tw-gradient-to: #faf5ff var(--tw-gradient-to-position)}.to-purple-50\\/50{--tw-gradient-to: rgb(250 245 255 / .5) var(--tw-gradient-to-position)}.to-purple-500{--tw-gradient-to: #a855f7 var(--tw-gradient-to-position)}.to-purple-500\\/10{--tw-gradient-to: rgb(168 85 247 / .1) var(--tw-gradient-to-position)}.to-purple-600{--tw-gradient-to: #9333ea var(--tw-gradient-to-position)}.to-purple-900{--tw-gradient-to: #581c87 var(--tw-gradient-to-position)}.to-red-500\\/10{--tw-gradient-to: rgb(239 68 68 / .1) var(--tw-gradient-to-position)}.to-red-600{--tw-gradient-to: #dc2626 var(--tw-gradient-to-position)}.to-rose-400{--tw-gradient-to: #fb7185 var(--tw-gradient-to-position)}.to-rose-500{--tw-gradient-to: #f43f5e var(--tw-gradient-to-position)}.to-slate-200{--tw-gradient-to: #e2e8f0 var(--tw-gradient-to-position)}.to-slate-500{--tw-gradient-to: #64748b var(--tw-gradient-to-position)}.to-slate-700{--tw-gradient-to: #334155 var(--tw-gradient-to-position)}.to-slate-900{--tw-gradient-to: #0f172a var(--tw-gradient-to-position)}.to-teal-100{--tw-gradient-to: #ccfbf1 var(--tw-gradient-to-position)}.to-teal-50\\/50{--tw-gradient-to: rgb(240 253 250 / .5) var(--tw-gradient-to-position)}.to-teal-500{--tw-gradient-to: #14b8a6 var(--tw-gradient-to-position)}.to-teal-600{--tw-gradient-to: #0d9488 var(--tw-gradient-to-position)}.to-transparent{--tw-gradient-to: transparent var(--tw-gradient-to-position)}.to-violet-50{--tw-gradient-to: #f5f3ff var(--tw-gradient-to-position)}.to-white{--tw-gradient-to: #fff var(--tw-gradient-to-position)}.bg-\\[length\\:80px_80px\\]{background-size:80px 80px}.bg-cover{background-size:cover}.bg-clip-text{-webkit-background-clip:text;background-clip:text}.bg-center{background-position:center}.fill-amber-400{fill:#fbbf24}.fill-current{fill:currentColor}.fill-primary{fill:hsl(var(--primary))}.fill-violet-100{fill:#ede9fe}.object-contain{-o-object-fit:contain;object-fit:contain}.object-cover{-o-object-fit:cover;object-fit:cover}.p-0{padding:0}.p-0\\.5{padding:.125rem}.p-1{padding:.25rem}.p-1\\.5{padding:.375rem}.p-16{padding:4rem}.p-2{padding:.5rem}.p-3{padding:.75rem}.p-32{padding:8rem}.p-4{padding:1rem}.p-6{padding:1.5rem}.p-8{padding:2rem}.p-\\[1px\\]{padding:1px}.px-0{padding-left:0;padding-right:0}.px-1{padding-left:.25rem;padding-right:.25rem}.px-1\\.5{padding-left:.375rem;padding-right:.375rem}.px-10{padding-left:2.5rem;padding-right:2.5rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.px-3{padding-left:.75rem;padding-right:.75rem}.px-4{padding-left:1rem;padding-right:1rem}.px-5{padding-left:1.25rem;padding-right:1.25rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.px-8{padding-left:2rem;padding-right:2rem}.py-0\\.5{padding-top:.125rem;padding-bottom:.125rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-1\\.5{padding-top:.375rem;padding-bottom:.375rem}.py-10{padding-top:2.5rem;padding-bottom:2.5rem}.py-12{padding-top:3rem;padding-bottom:3rem}.py-16{padding-top:4rem;padding-bottom:4rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.py-2\\.5{padding-top:.625rem;padding-bottom:.625rem}.py-20{padding-top:5rem;padding-bottom:5rem}.py-3{padding-top:.75rem;padding-bottom:.75rem}.py-3\\.5{padding-top:.875rem;padding-bottom:.875rem}.py-32{padding-top:8rem;padding-bottom:8rem}.py-4{padding-top:1rem;padding-bottom:1rem}.py-5{padding-top:1.25rem;padding-bottom:1.25rem}.py-6{padding-top:1.5rem;padding-bottom:1.5rem}.py-8{padding-top:2rem;padding-bottom:2rem}.pb-2{padding-bottom:.5rem}.pb-20{padding-bottom:5rem}.pb-3{padding-bottom:.75rem}.pb-32{padding-bottom:8rem}.pb-4{padding-bottom:1rem}.pb-6{padding-bottom:1.5rem}.pl-10{padding-left:2.5rem}.pl-11{padding-left:2.75rem}.pl-2{padding-left:.5rem}.pl-2\\.5{padding-left:.625rem}.pl-4{padding-left:1rem}.pl-5{padding-left:1.25rem}.pl-6{padding-left:1.5rem}.pl-8{padding-left:2rem}.pr-10{padding-right:2.5rem}.pr-2{padding-right:.5rem}.pr-2\\.5{padding-right:.625rem}.pr-24{padding-right:6rem}.pr-4{padding-right:1rem}.pr-8{padding-right:2rem}.pt-0{padding-top:0}.pt-1{padding-top:.25rem}.pt-10{padding-top:2.5rem}.pt-2{padding-top:.5rem}.pt-20{padding-top:5rem}.pt-3{padding-top:.75rem}.pt-4{padding-top:1rem}.pt-6{padding-top:1.5rem}.pt-8{padding-top:2rem}.text-left{text-align:left}.text-center{text-align:center}.text-right{text-align:right}.align-middle{vertical-align:middle}.font-mono{font-family:JetBrains Mono,monospace}.text-2xl{font-size:1.5rem;line-height:2rem}.text-3xl{font-size:1.875rem;line-height:2.25rem}.text-4xl{font-size:2.25rem;line-height:2.5rem}.text-5xl{font-size:3rem;line-height:1}.text-6xl{font-size:3.75rem;line-height:1}.text-7xl{font-size:4.5rem;line-height:1}.text-\\[0\\.8rem\\]{font-size:.8rem}.text-\\[10px\\]{font-size:10px}.text-\\[15px\\]{font-size:15px}.text-\\[9px\\]{font-size:9px}.text-base{font-size:1rem;line-height:1.5rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-xs{font-size:.75rem;line-height:1rem}.font-black{font-weight:900}.font-bold{font-weight:700}.font-medium{font-weight:500}.font-normal{font-weight:400}.font-semibold{font-weight:600}.uppercase{text-transform:uppercase}.lowercase{text-transform:lowercase}.capitalize{text-transform:capitalize}.italic{font-style:italic}.tabular-nums{--tw-numeric-spacing: tabular-nums;font-variant-numeric:var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)}.leading-none{line-height:1}.leading-relaxed{line-height:1.625}.leading-tight{line-height:1.25}.tracking-tight{letter-spacing:-.025em}.tracking-wide{letter-spacing:.025em}.tracking-wider{letter-spacing:.05em}.tracking-widest{letter-spacing:.1em}.text-accent-foreground{color:hsl(var(--accent-foreground))}.text-amber-400{--tw-text-opacity: 1;color:rgb(251 191 36 / var(--tw-text-opacity, 1))}.text-amber-500{--tw-text-opacity: 1;color:rgb(245 158 11 / var(--tw-text-opacity, 1))}.text-amber-600{--tw-text-opacity: 1;color:rgb(217 119 6 / var(--tw-text-opacity, 1))}.text-blue-300{--tw-text-opacity: 1;color:rgb(147 197 253 / var(--tw-text-opacity, 1))}.text-blue-400{--tw-text-opacity: 1;color:rgb(96 165 250 / var(--tw-text-opacity, 1))}.text-blue-500{--tw-text-opacity: 1;color:rgb(59 130 246 / var(--tw-text-opacity, 1))}.text-blue-600{--tw-text-opacity: 1;color:rgb(37 99 235 / var(--tw-text-opacity, 1))}.text-blue-700{--tw-text-opacity: 1;color:rgb(29 78 216 / var(--tw-text-opacity, 1))}.text-blue-800{--tw-text-opacity: 1;color:rgb(30 64 175 / var(--tw-text-opacity, 1))}.text-card-foreground{color:hsl(var(--card-foreground))}.text-current{color:currentColor}.text-cyan-200{--tw-text-opacity: 1;color:rgb(165 243 252 / var(--tw-text-opacity, 1))}.text-cyan-400{--tw-text-opacity: 1;color:rgb(34 211 238 / var(--tw-text-opacity, 1))}.text-destructive{color:hsl(var(--destructive))}.text-destructive-foreground{color:hsl(var(--destructive-foreground))}.text-emerald-300{--tw-text-opacity: 1;color:rgb(110 231 183 / var(--tw-text-opacity, 1))}.text-emerald-400{--tw-text-opacity: 1;color:rgb(52 211 153 / var(--tw-text-opacity, 1))}.text-emerald-600{--tw-text-opacity: 1;color:rgb(5 150 105 / var(--tw-text-opacity, 1))}.text-foreground{color:hsl(var(--foreground))}.text-foreground-muted{color:hsl(var(--foreground-muted))}.text-foreground\\/50{color:hsl(var(--foreground) / .5)}.text-foreground\\/70{color:hsl(var(--foreground) / .7)}.text-fuchsia-400{--tw-text-opacity: 1;color:rgb(232 121 249 / var(--tw-text-opacity, 1))}.text-gray-300{--tw-text-opacity: 1;color:rgb(209 213 219 / var(--tw-text-opacity, 1))}.text-gray-400{--tw-text-opacity: 1;color:rgb(156 163 175 / var(--tw-text-opacity, 1))}.text-gray-500{--tw-text-opacity: 1;color:rgb(107 114 128 / var(--tw-text-opacity, 1))}.text-gray-700{--tw-text-opacity: 1;color:rgb(55 65 81 / var(--tw-text-opacity, 1))}.text-gray-800{--tw-text-opacity: 1;color:rgb(31 41 55 / var(--tw-text-opacity, 1))}.text-green-300{--tw-text-opacity: 1;color:rgb(134 239 172 / var(--tw-text-opacity, 1))}.text-green-400{--tw-text-opacity: 1;color:rgb(74 222 128 / var(--tw-text-opacity, 1))}.text-green-500{--tw-text-opacity: 1;color:rgb(34 197 94 / var(--tw-text-opacity, 1))}.text-green-600{--tw-text-opacity: 1;color:rgb(22 163 74 / var(--tw-text-opacity, 1))}.text-green-700{--tw-text-opacity: 1;color:rgb(21 128 61 / var(--tw-text-opacity, 1))}.text-indigo-500{--tw-text-opacity: 1;color:rgb(99 102 241 / var(--tw-text-opacity, 1))}.text-indigo-600{--tw-text-opacity: 1;color:rgb(79 70 229 / var(--tw-text-opacity, 1))}.text-muted{color:hsl(var(--muted))}.text-muted-foreground{color:hsl(var(--muted-foreground))}.text-muted-foreground\\/70{color:hsl(var(--muted-foreground) / .7)}.text-orange-400{--tw-text-opacity: 1;color:rgb(251 146 60 / var(--tw-text-opacity, 1))}.text-orange-500{--tw-text-opacity: 1;color:rgb(249 115 22 / var(--tw-text-opacity, 1))}.text-orange-600{--tw-text-opacity: 1;color:rgb(234 88 12 / var(--tw-text-opacity, 1))}.text-pink-400{--tw-text-opacity: 1;color:rgb(244 114 182 / var(--tw-text-opacity, 1))}.text-pink-500{--tw-text-opacity: 1;color:rgb(236 72 153 / var(--tw-text-opacity, 1))}.text-primary{color:hsl(var(--primary))}.text-primary-foreground{color:hsl(var(--primary-foreground))}.text-primary-foreground\\/80{color:hsl(var(--primary-foreground) / .8)}.text-purple-400{--tw-text-opacity: 1;color:rgb(192 132 252 / var(--tw-text-opacity, 1))}.text-purple-500{--tw-text-opacity: 1;color:rgb(168 85 247 / var(--tw-text-opacity, 1))}.text-purple-600{--tw-text-opacity: 1;color:rgb(147 51 234 / var(--tw-text-opacity, 1))}.text-red-500{--tw-text-opacity: 1;color:rgb(239 68 68 / var(--tw-text-opacity, 1))}.text-red-600{--tw-text-opacity: 1;color:rgb(220 38 38 / var(--tw-text-opacity, 1))}.text-rose-600{--tw-text-opacity: 1;color:rgb(225 29 72 / var(--tw-text-opacity, 1))}.text-secondary-foreground{color:hsl(var(--secondary-foreground))}.text-sky-400{--tw-text-opacity: 1;color:rgb(56 189 248 / var(--tw-text-opacity, 1))}.text-sky-500{--tw-text-opacity: 1;color:rgb(14 165 233 / var(--tw-text-opacity, 1))}.text-sky-600{--tw-text-opacity: 1;color:rgb(2 132 199 / var(--tw-text-opacity, 1))}.text-slate-300{--tw-text-opacity: 1;color:rgb(203 213 225 / var(--tw-text-opacity, 1))}.text-slate-400{--tw-text-opacity: 1;color:rgb(148 163 184 / var(--tw-text-opacity, 1))}.text-slate-50{--tw-text-opacity: 1;color:rgb(248 250 252 / var(--tw-text-opacity, 1))}.text-slate-500{--tw-text-opacity: 1;color:rgb(100 116 139 / var(--tw-text-opacity, 1))}.text-slate-600{--tw-text-opacity: 1;color:rgb(71 85 105 / var(--tw-text-opacity, 1))}.text-slate-700{--tw-text-opacity: 1;color:rgb(51 65 85 / var(--tw-text-opacity, 1))}.text-slate-800{--tw-text-opacity: 1;color:rgb(30 41 59 / var(--tw-text-opacity, 1))}.text-slate-900{--tw-text-opacity: 1;color:rgb(15 23 42 / var(--tw-text-opacity, 1))}.text-teal-400{--tw-text-opacity: 1;color:rgb(45 212 191 / var(--tw-text-opacity, 1))}.text-transparent{color:transparent}.text-violet-400{--tw-text-opacity: 1;color:rgb(167 139 250 / var(--tw-text-opacity, 1))}.text-violet-500{--tw-text-opacity: 1;color:rgb(139 92 246 / var(--tw-text-opacity, 1))}.text-violet-600{--tw-text-opacity: 1;color:rgb(124 58 237 / var(--tw-text-opacity, 1))}.text-violet-700{--tw-text-opacity: 1;color:rgb(109 40 217 / var(--tw-text-opacity, 1))}.text-violet-900{--tw-text-opacity: 1;color:rgb(76 29 149 / var(--tw-text-opacity, 1))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.text-white\\/30{color:#ffffff4d}.text-white\\/50{color:#ffffff80}.text-white\\/60{color:#fff9}.text-white\\/70{color:#ffffffb3}.text-white\\/80{color:#fffc}.text-white\\/90{color:#ffffffe6}.text-yellow-400{--tw-text-opacity: 1;color:rgb(250 204 21 / var(--tw-text-opacity, 1))}.text-yellow-500{--tw-text-opacity: 1;color:rgb(234 179 8 / var(--tw-text-opacity, 1))}.text-yellow-600{--tw-text-opacity: 1;color:rgb(202 138 4 / var(--tw-text-opacity, 1))}.text-yellow-800{--tw-text-opacity: 1;color:rgb(133 77 14 / var(--tw-text-opacity, 1))}.underline{text-decoration-line:underline}.decoration-dotted{text-decoration-style:dotted}.underline-offset-4{text-underline-offset:4px}.opacity-0{opacity:0}.opacity-10{opacity:.1}.opacity-100{opacity:1}.opacity-20{opacity:.2}.opacity-25{opacity:.25}.opacity-30{opacity:.3}.opacity-40{opacity:.4}.opacity-5{opacity:.05}.opacity-50{opacity:.5}.opacity-60{opacity:.6}.opacity-70{opacity:.7}.opacity-75{opacity:.75}.opacity-80{opacity:.8}.opacity-90{opacity:.9}.shadow-2xl{--tw-shadow: 0 25px 50px -12px rgb(0 0 0 / .25);--tw-shadow-colored: 0 25px 50px -12px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-border\\)\\)\\]{--tw-shadow: 0 0 0 1px hsl(var(--sidebar-border));--tw-shadow-colored: 0 0 0 1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-glow{--tw-shadow: var(--shadow-glow);--tw-shadow-colored: var(--shadow-glow);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-inner{--tw-shadow: inset 0 2px 4px 0 rgb(0 0 0 / .05);--tw-shadow-colored: inset 0 2px 4px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-lg{--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-md{--tw-shadow: 0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1);--tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-medium{--tw-shadow: var(--shadow-medium);--tw-shadow-colored: var(--shadow-medium);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-none{--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-sm{--tw-shadow: 0 1px 2px 0 rgb(0 0 0 / .05);--tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-xl{--tw-shadow: 0 20px 25px -5px rgb(0 0 0 / .1), 0 8px 10px -6px rgb(0 0 0 / .1);--tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-black\\/5{--tw-shadow-color: rgb(0 0 0 / .05);--tw-shadow: var(--tw-shadow-colored)}.shadow-primary\\/20{--tw-shadow-color: hsl(var(--primary) / .2);--tw-shadow: var(--tw-shadow-colored)}.shadow-slate-200\\/50{--tw-shadow-color: rgb(226 232 240 / .5);--tw-shadow: var(--tw-shadow-colored)}.shadow-violet-200{--tw-shadow-color: #ddd6fe;--tw-shadow: var(--tw-shadow-colored)}.outline-none{outline:2px solid transparent;outline-offset:2px}.outline{outline-style:solid}.ring-0{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.ring-2{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.ring-4{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.ring-primary{--tw-ring-color: hsl(var(--primary))}.ring-primary\\/20{--tw-ring-color: hsl(var(--primary) / .2)}.ring-ring{--tw-ring-color: hsl(var(--ring))}.ring-white{--tw-ring-opacity: 1;--tw-ring-color: rgb(255 255 255 / var(--tw-ring-opacity, 1))}.ring-offset-2{--tw-ring-offset-width: 2px}.ring-offset-background{--tw-ring-offset-color: hsl(var(--background))}.blur{--tw-blur: blur(8px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.blur-2xl{--tw-blur: blur(40px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.blur-3xl{--tw-blur: blur(64px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.blur-\\[100px\\]{--tw-blur: blur(100px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.blur-\\[80px\\]{--tw-blur: blur(80px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.blur-sm{--tw-blur: blur(4px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.blur-xl{--tw-blur: blur(24px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.drop-shadow-\\[0_1px_2px_rgba\\(0\\,0\\,0\\,0\\.45\\)\\]{--tw-drop-shadow: drop-shadow(0 1px 2px rgba(0,0,0,.45));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.backdrop-blur{--tw-backdrop-blur: blur(8px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.backdrop-blur-lg{--tw-backdrop-blur: blur(16px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.backdrop-blur-md{--tw-backdrop-blur: blur(12px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.backdrop-blur-sm{--tw-backdrop-blur: blur(4px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.backdrop-blur-xl{--tw-backdrop-blur: blur(24px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.backdrop-filter{-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-\\[left\\,right\\,width\\]{transition-property:left,right,width;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-\\[margin\\,opa\\]{transition-property:margin,opa;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-\\[width\\,height\\,padding\\]{transition-property:width,height,padding;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-\\[width\\]{transition-property:width;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-opacity{transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-shadow{transition-property:box-shadow;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.duration-1000{transition-duration:1s}.duration-150{transition-duration:.15s}.duration-200{transition-duration:.2s}.duration-300{transition-duration:.3s}.duration-500{transition-duration:.5s}.duration-700{transition-duration:.7s}.ease-in-out{transition-timing-function:cubic-bezier(.4,0,.2,1)}.ease-linear{transition-timing-function:linear}.ease-out{transition-timing-function:cubic-bezier(0,0,.2,1)}@keyframes enter{0%{opacity:var(--tw-enter-opacity, 1);transform:translate3d(var(--tw-enter-translate-x, 0),var(--tw-enter-translate-y, 0),0) scale3d(var(--tw-enter-scale, 1),var(--tw-enter-scale, 1),var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity, 1);transform:translate3d(var(--tw-exit-translate-x, 0),var(--tw-exit-translate-y, 0),0) scale3d(var(--tw-exit-scale, 1),var(--tw-exit-scale, 1),var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0))}}.animate-in{animation-name:enter;animation-duration:.15s;--tw-enter-opacity: initial;--tw-enter-scale: initial;--tw-enter-rotate: initial;--tw-enter-translate-x: initial;--tw-enter-translate-y: initial}.fade-in,.fade-in-0{--tw-enter-opacity: 0}.fade-in-80{--tw-enter-opacity: .8}.zoom-in{--tw-enter-scale: 0}.zoom-in-95{--tw-enter-scale: .95}.slide-in-from-bottom-2{--tw-enter-translate-y: .5rem}.slide-in-from-bottom-4{--tw-enter-translate-y: 1rem}.duration-1000{animation-duration:1s}.duration-150{animation-duration:.15s}.duration-200{animation-duration:.2s}.duration-300{animation-duration:.3s}.duration-500{animation-duration:.5s}.duration-700{animation-duration:.7s}.ease-in-out{animation-timing-function:cubic-bezier(.4,0,.2,1)}.ease-linear{animation-timing-function:linear}.ease-out{animation-timing-function:cubic-bezier(0,0,.2,1)}.running{animation-play-state:running}.text-gradient{background:var(--gradient-primary);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.transform-gpu{transform:translateZ(0);will-change:transform}html{scroll-behavior:smooth}.scrollbar-thin::-webkit-scrollbar{width:2px;height:2px}.scrollbar-thin::-webkit-scrollbar-track{background:transparent}.scrollbar-thin::-webkit-scrollbar-thumb{background:hsl(var(--muted-foreground) / .3);border-radius:1px}.scrollbar-thin::-webkit-scrollbar-thumb:hover{background:hsl(var(--muted-foreground) / .5)}.perspective-1000{perspective:1000px}.transform-style-3d{transform-style:preserve-3d}.backface-hidden{backface-visibility:hidden}.rotate-y-180{transform:rotateY(180deg)}.scrollbar-thumb-muted::-webkit-scrollbar-thumb{background:hsl(var(--muted-foreground) / .3)}.scrollbar-track-transparent::-webkit-scrollbar-track{background:transparent}.\\[perspective\\:500px\\]{perspective:500px}.\\[text-shadow\\:_0_0_20px_rgb\\(255_255_255_\\/_40\\%\\)\\,_0_0_40px_rgb\\(96_165_250_\\/_40\\%\\)\\]{text-shadow:0 0 20px rgb(255 255 255 / 40%),0 0 40px rgb(96 165 250 / 40%)}.\\[text-shadow\\:_0_0_30px_rgb\\(255_255_255_\\/_50\\%\\)\\,_0_0_60px_rgb\\(236_72_153_\\/_50\\%\\)\\]{text-shadow:0 0 30px rgb(255 255 255 / 50%),0 0 60px rgb(236 72 153 / 50%)}.\\[text-shadow\\:_0_2px_10px_rgb\\(0_0_0_\\/_50\\%\\)\\]{text-shadow:0 2px 10px rgb(0 0 0 / 50%)}.\\[transform-style\\:preserve-3d\\]{transform-style:preserve-3d}@keyframes shimmer{0%{transform:translate(-100%)}to{transform:translate(100%)}}.animate-shimmer{animation:shimmer 2s infinite}@keyframes sparkle-fade{0%,to{opacity:0}50%{opacity:1}}.animate-sparkle-fade-1{animation:sparkle-fade 2s infinite ease-in-out}.animate-sparkle-fade-2{animation:sparkle-fade 2.5s infinite ease-in-out .5s}.animate-sparkle-fade-3{animation:sparkle-fade 2.2s infinite ease-in-out 1s}@keyframes float{0%,to{transform:translateY(0)}50%{transform:translateY(-10px)}}@keyframes glow{0%{filter:drop-shadow(0 0 20px hsl(var(--primary) / .3))}to{filter:drop-shadow(0 0 40px hsl(var(--primary) / .6))}}.patra-tour-popover .driver-popover{background:hsl(var(--card))!important;border:1px solid hsl(var(--border))!important;box-shadow:0 20px 60px hsl(var(--foreground) / .15),0 0 0 1px hsl(var(--primary) / .1)!important;border-radius:1rem!important;padding:0!important;max-width:380px!important}.patra-tour-popover .driver-popover-title{font-size:1.125rem!important;font-weight:700!important;color:hsl(var(--foreground))!important;margin:0!important;padding:1.25rem 1.5rem .5rem!important;line-height:1.4!important}.patra-tour-popover .driver-popover-description{font-size:.9375rem!important;color:hsl(var(--muted-foreground))!important;line-height:1.6!important;padding:0 1.5rem 1.25rem!important;margin:0!important}.patra-tour-popover .driver-popover-footer{padding:1rem 1.5rem!important;border-top:1px solid hsl(var(--border))!important;background:hsl(var(--muted) / .3)!important;border-radius:0 0 1rem 1rem!important;display:flex!important;align-items:center!important;justify-content:space-between!important}.patra-tour-popover .driver-popover-progress-text{font-size:.8125rem!important;color:hsl(var(--muted-foreground))!important;font-weight:500!important}.patra-tour-popover .driver-popover-btn{padding:.5rem 1rem!important;border-radius:.5rem!important;font-size:.875rem!important;font-weight:600!important;transition:all .2s ease!important;border:none!important;cursor:pointer!important}.patra-tour-popover .driver-popover-next-btn{background:hsl(var(--primary))!important;color:hsl(var(--primary-foreground))!important}.patra-tour-popover .driver-popover-next-btn:hover{background:hsl(var(--primary-dark))!important;transform:translateY(-1px)!important;box-shadow:0 4px 12px hsl(var(--primary) / .3)!important}.patra-tour-popover .driver-popover-prev-btn{background:hsl(var(--secondary))!important;color:hsl(var(--secondary-foreground))!important}.patra-tour-popover .driver-popover-prev-btn:hover{background:hsl(var(--muted))!important}.patra-tour-popover .driver-popover-close-btn{background:transparent!important;color:hsl(var(--muted-foreground))!important;width:2rem!important;height:2rem!important;display:flex!important;align-items:center!important;justify-content:center!important;position:absolute!important;top:1rem!important;right:1rem!important;padding:0!important;border-radius:.375rem!important}.patra-tour-popover .driver-popover-close-btn:hover{background:hsl(var(--muted))!important}.driver-overlay{background:hsl(var(--background) / .8)!important;-webkit-backdrop-filter:blur(4px)!important;backdrop-filter:blur(4px)!important}.driver-active-element{border-radius:.75rem!important}.dark\\:prose-invert:is(.dark *){--tw-prose-body: var(--tw-prose-invert-body);--tw-prose-headings: var(--tw-prose-invert-headings);--tw-prose-lead: var(--tw-prose-invert-lead);--tw-prose-links: var(--tw-prose-invert-links);--tw-prose-bold: var(--tw-prose-invert-bold);--tw-prose-counters: var(--tw-prose-invert-counters);--tw-prose-bullets: var(--tw-prose-invert-bullets);--tw-prose-hr: var(--tw-prose-invert-hr);--tw-prose-quotes: var(--tw-prose-invert-quotes);--tw-prose-quote-borders: var(--tw-prose-invert-quote-borders);--tw-prose-captions: var(--tw-prose-invert-captions);--tw-prose-kbd: var(--tw-prose-invert-kbd);--tw-prose-kbd-shadows: var(--tw-prose-invert-kbd-shadows);--tw-prose-code: var(--tw-prose-invert-code);--tw-prose-pre-code: var(--tw-prose-invert-pre-code);--tw-prose-pre-bg: var(--tw-prose-invert-pre-bg);--tw-prose-th-borders: var(--tw-prose-invert-th-borders);--tw-prose-td-borders: var(--tw-prose-invert-td-borders)}.file\\:border-0::file-selector-button{border-width:0px}.file\\:bg-transparent::file-selector-button{background-color:transparent}.file\\:text-sm::file-selector-button{font-size:.875rem;line-height:1.25rem}.file\\:font-medium::file-selector-button{font-weight:500}.file\\:text-foreground::file-selector-button{color:hsl(var(--foreground))}.placeholder\\:text-muted-foreground::-moz-placeholder{color:hsl(var(--muted-foreground))}.placeholder\\:text-muted-foreground::placeholder{color:hsl(var(--muted-foreground))}.placeholder\\:text-slate-400::-moz-placeholder{--tw-text-opacity: 1;color:rgb(148 163 184 / var(--tw-text-opacity, 1))}.placeholder\\:text-slate-400::placeholder{--tw-text-opacity: 1;color:rgb(148 163 184 / var(--tw-text-opacity, 1))}.after\\:absolute:after{content:var(--tw-content);position:absolute}.after\\:-inset-2:after{content:var(--tw-content);top:-.5rem;right:-.5rem;bottom:-.5rem;left:-.5rem}.after\\:inset-0:after{content:var(--tw-content);top:0;right:0;bottom:0;left:0}.after\\:inset-y-0:after{content:var(--tw-content);top:0;bottom:0}.after\\:left-1\\/2:after{content:var(--tw-content);left:50%}.after\\:w-1:after{content:var(--tw-content);width:.25rem}.after\\:w-\\[2px\\]:after{content:var(--tw-content);width:2px}.after\\:-translate-x-1\\/2:after{content:var(--tw-content);--tw-translate-x: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.after\\:bg-gradient-to-b:after{content:var(--tw-content);background-image:linear-gradient(to bottom,var(--tw-gradient-stops))}.after\\:from-transparent:after{content:var(--tw-content);--tw-gradient-from: transparent var(--tw-gradient-from-position);--tw-gradient-to: rgb(0 0 0 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.after\\:via-transparent:after{content:var(--tw-content);--tw-gradient-to: rgb(0 0 0 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), transparent var(--tw-gradient-via-position), var(--tw-gradient-to)}.after\\:to-purple-900\\/90:after{content:var(--tw-content);--tw-gradient-to: rgb(88 28 135 / .9) var(--tw-gradient-to-position)}.first\\:rounded-l-md:first-child{border-top-left-radius:calc(var(--radius) - 2px);border-bottom-left-radius:calc(var(--radius) - 2px)}.first\\:border-l:first-child{border-left-width:1px}.last\\:rounded-r-md:last-child{border-top-right-radius:calc(var(--radius) - 2px);border-bottom-right-radius:calc(var(--radius) - 2px)}.last\\:border-0:last-child{border-width:0px}.focus-within\\:relative:focus-within{position:relative}.focus-within\\:z-20:focus-within{z-index:20}.focus-within\\:border-violet-200:focus-within{--tw-border-opacity: 1;border-color:rgb(221 214 254 / var(--tw-border-opacity, 1))}.focus-within\\:ring-2:focus-within{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.focus-within\\:ring-violet-100:focus-within{--tw-ring-opacity: 1;--tw-ring-color: rgb(237 233 254 / var(--tw-ring-opacity, 1))}.hover\\:-translate-y-0\\.5:hover{--tw-translate-y: -.125rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.hover\\:scale-105:hover{--tw-scale-x: 1.05;--tw-scale-y: 1.05;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.hover\\:scale-110:hover{--tw-scale-x: 1.1;--tw-scale-y: 1.1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.hover\\:border-amber-300:hover{--tw-border-opacity: 1;border-color:rgb(252 211 77 / var(--tw-border-opacity, 1))}.hover\\:border-blue-300:hover{--tw-border-opacity: 1;border-color:rgb(147 197 253 / var(--tw-border-opacity, 1))}.hover\\:border-blue-500:hover{--tw-border-opacity: 1;border-color:rgb(59 130 246 / var(--tw-border-opacity, 1))}.hover\\:border-emerald-300:hover{--tw-border-opacity: 1;border-color:rgb(110 231 183 / var(--tw-border-opacity, 1))}.hover\\:border-indigo-300:hover{--tw-border-opacity: 1;border-color:rgb(165 180 252 / var(--tw-border-opacity, 1))}.hover\\:border-primary:hover{border-color:hsl(var(--primary))}.hover\\:border-primary\\/50:hover{border-color:hsl(var(--primary) / .5)}.hover\\:border-rose-300:hover{--tw-border-opacity: 1;border-color:rgb(253 164 175 / var(--tw-border-opacity, 1))}.hover\\:border-slate-300:hover{--tw-border-opacity: 1;border-color:rgb(203 213 225 / var(--tw-border-opacity, 1))}.hover\\:border-slate-400:hover{--tw-border-opacity: 1;border-color:rgb(148 163 184 / var(--tw-border-opacity, 1))}.hover\\:border-violet-200:hover{--tw-border-opacity: 1;border-color:rgb(221 214 254 / var(--tw-border-opacity, 1))}.hover\\:border-violet-300:hover{--tw-border-opacity: 1;border-color:rgb(196 181 253 / var(--tw-border-opacity, 1))}.hover\\:border-violet-500:hover{--tw-border-opacity: 1;border-color:rgb(139 92 246 / var(--tw-border-opacity, 1))}.hover\\:bg-accent:hover{background-color:hsl(var(--accent))}.hover\\:bg-accent\\/50:hover{background-color:hsl(var(--accent) / .5)}.hover\\:bg-blue-500\\/30:hover{background-color:#3b82f64d}.hover\\:bg-blue-600:hover{--tw-bg-opacity: 1;background-color:rgb(37 99 235 / var(--tw-bg-opacity, 1))}.hover\\:bg-blue-700:hover{--tw-bg-opacity: 1;background-color:rgb(29 78 216 / var(--tw-bg-opacity, 1))}.hover\\:bg-card-hover:hover{background-color:hsl(var(--card-hover))}.hover\\:bg-card-hover\\/50:hover{background-color:hsl(var(--card-hover) / .5)}.hover\\:bg-destructive\\/10:hover{background-color:hsl(var(--destructive) / .1)}.hover\\:bg-destructive\\/80:hover{background-color:hsl(var(--destructive) / .8)}.hover\\:bg-destructive\\/90:hover{background-color:hsl(var(--destructive) / .9)}.hover\\:bg-gray-100:hover{--tw-bg-opacity: 1;background-color:rgb(243 244 246 / var(--tw-bg-opacity, 1))}.hover\\:bg-green-500\\/20:hover{background-color:#22c55e33}.hover\\:bg-green-700:hover{--tw-bg-opacity: 1;background-color:rgb(21 128 61 / var(--tw-bg-opacity, 1))}.hover\\:bg-muted:hover{background-color:hsl(var(--muted))}.hover\\:bg-muted\\/20:hover{background-color:hsl(var(--muted) / .2)}.hover\\:bg-muted\\/50:hover{background-color:hsl(var(--muted) / .5)}.hover\\:bg-orange-700:hover{--tw-bg-opacity: 1;background-color:rgb(194 65 12 / var(--tw-bg-opacity, 1))}.hover\\:bg-primary:hover{background-color:hsl(var(--primary))}.hover\\:bg-primary\\/10:hover{background-color:hsl(var(--primary) / .1)}.hover\\:bg-primary\\/15:hover{background-color:hsl(var(--primary) / .15)}.hover\\:bg-primary\\/20:hover{background-color:hsl(var(--primary) / .2)}.hover\\:bg-primary\\/5:hover{background-color:hsl(var(--primary) / .05)}.hover\\:bg-primary\\/80:hover{background-color:hsl(var(--primary) / .8)}.hover\\:bg-primary\\/90:hover{background-color:hsl(var(--primary) / .9)}.hover\\:bg-secondary:hover{background-color:hsl(var(--secondary))}.hover\\:bg-secondary\\/80:hover{background-color:hsl(var(--secondary) / .8)}.hover\\:bg-slate-100:hover{--tw-bg-opacity: 1;background-color:rgb(241 245 249 / var(--tw-bg-opacity, 1))}.hover\\:bg-slate-100\\/50:hover{background-color:#f1f5f980}.hover\\:bg-slate-200\\/80:hover{background-color:#e2e8f0cc}.hover\\:bg-slate-50:hover{--tw-bg-opacity: 1;background-color:rgb(248 250 252 / var(--tw-bg-opacity, 1))}.hover\\:bg-slate-800:hover{--tw-bg-opacity: 1;background-color:rgb(30 41 59 / var(--tw-bg-opacity, 1))}.hover\\:bg-violet-50\\/50:hover{background-color:#f5f3ff80}.hover\\:bg-violet-700:hover{--tw-bg-opacity: 1;background-color:rgb(109 40 217 / var(--tw-bg-opacity, 1))}.hover\\:bg-white\\/10:hover{background-color:#ffffff1a}.hover\\:bg-white\\/20:hover{background-color:#fff3}.hover\\:bg-white\\/40:hover{background-color:#fff6}.hover\\:bg-white\\/80:hover{background-color:#fffc}.hover\\:bg-gradient-warm:hover{background-image:var(--gradient-warm)}.hover\\:from-primary\\/10:hover{--tw-gradient-from: hsl(var(--primary) / .1) var(--tw-gradient-from-position);--tw-gradient-to: hsl(var(--primary) / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.hover\\:from-violet-700:hover{--tw-gradient-from: #6d28d9 var(--tw-gradient-from-position);--tw-gradient-to: rgb(109 40 217 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.hover\\:to-accent\\/10:hover{--tw-gradient-to: hsl(var(--accent) / .1) var(--tw-gradient-to-position)}.hover\\:to-purple-700:hover{--tw-gradient-to: #7e22ce var(--tw-gradient-to-position)}.hover\\:text-accent-foreground:hover{color:hsl(var(--accent-foreground))}.hover\\:text-destructive:hover{color:hsl(var(--destructive))}.hover\\:text-foreground:hover{color:hsl(var(--foreground))}.hover\\:text-muted-foreground:hover{color:hsl(var(--muted-foreground))}.hover\\:text-primary:hover{color:hsl(var(--primary))}.hover\\:text-primary-foreground:hover{color:hsl(var(--primary-foreground))}.hover\\:text-slate-600:hover{--tw-text-opacity: 1;color:rgb(71 85 105 / var(--tw-text-opacity, 1))}.hover\\:text-slate-700:hover{--tw-text-opacity: 1;color:rgb(51 65 85 / var(--tw-text-opacity, 1))}.hover\\:text-slate-900:hover{--tw-text-opacity: 1;color:rgb(15 23 42 / var(--tw-text-opacity, 1))}.hover\\:text-white:hover{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.hover\\:text-yellow-500:hover{--tw-text-opacity: 1;color:rgb(234 179 8 / var(--tw-text-opacity, 1))}.hover\\:underline:hover{text-decoration-line:underline}.hover\\:opacity-100:hover{opacity:1}.hover\\:shadow-2xl:hover{--tw-shadow: 0 25px 50px -12px rgb(0 0 0 / .25);--tw-shadow-colored: 0 25px 50px -12px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.hover\\:shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-accent\\)\\)\\]:hover{--tw-shadow: 0 0 0 1px hsl(var(--sidebar-accent));--tw-shadow-colored: 0 0 0 1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.hover\\:shadow-\\[0_0_40px_rgba\\(236\\,72\\,153\\,0\\.6\\)\\]:hover{--tw-shadow: 0 0 40px rgba(236,72,153,.6);--tw-shadow-colored: 0 0 40px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.hover\\:shadow-glow:hover{--tw-shadow: var(--shadow-glow);--tw-shadow-colored: var(--shadow-glow);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.hover\\:shadow-lg:hover{--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.hover\\:shadow-md:hover{--tw-shadow: 0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1);--tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.hover\\:shadow-xl:hover{--tw-shadow: 0 20px 25px -5px rgb(0 0 0 / .1), 0 8px 10px -6px rgb(0 0 0 / .1);--tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.hover\\:ring-2:hover{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.hover\\:ring-primary\\/30:hover{--tw-ring-color: hsl(var(--primary) / .3)}.hover\\:ring-primary\\/40:hover{--tw-ring-color: hsl(var(--primary) / .4)}.hover\\:rotate-y-12:hover{transform:rotateY(12deg)}.focus\\:border-blue-500:focus{--tw-border-opacity: 1;border-color:rgb(59 130 246 / var(--tw-border-opacity, 1))}.focus\\:border-emerald-500:focus{--tw-border-opacity: 1;border-color:rgb(16 185 129 / var(--tw-border-opacity, 1))}.focus\\:border-green-500:focus{--tw-border-opacity: 1;border-color:rgb(34 197 94 / var(--tw-border-opacity, 1))}.focus\\:border-primary:focus{border-color:hsl(var(--primary))}.focus\\:border-red-500:focus{--tw-border-opacity: 1;border-color:rgb(239 68 68 / var(--tw-border-opacity, 1))}.focus\\:border-violet-500:focus{--tw-border-opacity: 1;border-color:rgb(139 92 246 / var(--tw-border-opacity, 1))}.focus\\:bg-accent:focus{background-color:hsl(var(--accent))}.focus\\:bg-background:focus{background-color:hsl(var(--background))}.focus\\:bg-primary:focus{background-color:hsl(var(--primary))}.focus\\:text-accent-foreground:focus{color:hsl(var(--accent-foreground))}.focus\\:text-primary-foreground:focus{color:hsl(var(--primary-foreground))}.focus\\:opacity-100:focus{opacity:1}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.focus\\:ring:focus{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.focus\\:ring-0:focus{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.focus\\:ring-2:focus{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.focus\\:ring-blue-500:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity, 1))}.focus\\:ring-emerald-100:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(209 250 229 / var(--tw-ring-opacity, 1))}.focus\\:ring-emerald-500:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(16 185 129 / var(--tw-ring-opacity, 1))}.focus\\:ring-primary\\/50:focus{--tw-ring-color: hsl(var(--primary) / .5)}.focus\\:ring-ring:focus{--tw-ring-color: hsl(var(--ring))}.focus\\:ring-violet-500:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(139 92 246 / var(--tw-ring-opacity, 1))}.focus\\:ring-offset-2:focus{--tw-ring-offset-width: 2px}.focus-visible\\:outline-none:focus-visible{outline:2px solid transparent;outline-offset:2px}.focus-visible\\:ring-0:focus-visible{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.focus-visible\\:ring-1:focus-visible{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.focus-visible\\:ring-2:focus-visible{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.focus-visible\\:ring-ring:focus-visible{--tw-ring-color: hsl(var(--ring))}.focus-visible\\:ring-offset-1:focus-visible{--tw-ring-offset-width: 1px}.focus-visible\\:ring-offset-2:focus-visible{--tw-ring-offset-width: 2px}.focus-visible\\:ring-offset-background:focus-visible{--tw-ring-offset-color: hsl(var(--background))}.active\\:cursor-grabbing:active{cursor:grabbing}.disabled\\:pointer-events-none:disabled{pointer-events:none}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:opacity-50:disabled{opacity:.5}.group\\/menu-item:focus-within .group-focus-within\\/menu-item\\:opacity-100{opacity:1}.group:hover .group-hover\\:-translate-x-1{--tw-translate-x: -.25rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group:hover .group-hover\\:translate-x-1{--tw-translate-x: .25rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group:hover .group-hover\\:translate-y-0{--tw-translate-y: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group:hover .group-hover\\:-rotate-12{--tw-rotate: -12deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group:hover .group-hover\\:rotate-12{--tw-rotate: 12deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group:hover .group-hover\\:scale-105{--tw-scale-x: 1.05;--tw-scale-y: 1.05;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group:hover .group-hover\\:scale-110{--tw-scale-x: 1.1;--tw-scale-y: 1.1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group:hover .group-hover\\:scale-x-100{--tw-scale-x: 1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group:hover .group-hover\\:gap-2{gap:.5rem}.group:hover .group-hover\\:bg-black\\/10{background-color:#0000001a}.group:hover .group-hover\\:bg-card-hover{background-color:hsl(var(--card-hover))}.group:hover .group-hover\\:bg-muted\\/50{background-color:hsl(var(--muted) / .5)}.group:hover .group-hover\\:bg-primary{background-color:hsl(var(--primary))}.group:hover .group-hover\\:bg-primary\\/10{background-color:hsl(var(--primary) / .1)}.group:hover .group-hover\\:bg-white\\/20{background-color:#fff3}.group:hover .group-hover\\:bg-gradient-warm{background-image:var(--gradient-warm)}.group:hover .group-hover\\:text-foreground{color:hsl(var(--foreground))}.group:hover .group-hover\\:text-primary{color:hsl(var(--primary))}.group:hover .group-hover\\:text-primary\\/80{color:hsl(var(--primary) / .8)}.group:hover .group-hover\\:text-violet-700{--tw-text-opacity: 1;color:rgb(109 40 217 / var(--tw-text-opacity, 1))}.group:hover .group-hover\\:text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.group\\/menu-item:hover .group-hover\\/menu-item\\:opacity-100,.group:hover .group-hover\\:opacity-100{opacity:1}.group:hover .group-hover\\:opacity-20{opacity:.2}.group:hover .group-hover\\:opacity-30{opacity:.3}.group:hover .group-hover\\:opacity-5{opacity:.05}.group:hover .group-hover\\:opacity-50{opacity:.5}.group:hover .group-hover\\:duration-200{transition-duration:.2s;animation-duration:.2s}.group:hover .group-hover\\:text-gradient{background:var(--gradient-primary);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.group.destructive .group-\\[\\.destructive\\]\\:border-muted\\/40{border-color:hsl(var(--muted) / .4)}.group.toaster .group-\\[\\.toaster\\]\\:border-border{border-color:hsl(var(--border))}.group.toast .group-\\[\\.toast\\]\\:bg-muted{background-color:hsl(var(--muted))}.group.toast .group-\\[\\.toast\\]\\:bg-primary{background-color:hsl(var(--primary))}.group.toaster .group-\\[\\.toaster\\]\\:bg-background{background-color:hsl(var(--background))}.group.destructive .group-\\[\\.destructive\\]\\:text-red-300{--tw-text-opacity: 1;color:rgb(252 165 165 / var(--tw-text-opacity, 1))}.group.toast .group-\\[\\.toast\\]\\:text-muted-foreground{color:hsl(var(--muted-foreground))}.group.toast .group-\\[\\.toast\\]\\:text-primary-foreground{color:hsl(var(--primary-foreground))}.group.toaster .group-\\[\\.toaster\\]\\:text-foreground{color:hsl(var(--foreground))}.group.toaster .group-\\[\\.toaster\\]\\:shadow-lg{--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.group.destructive .group-\\[\\.destructive\\]\\:hover\\:border-destructive\\/30:hover{border-color:hsl(var(--destructive) / .3)}.group.destructive .group-\\[\\.destructive\\]\\:hover\\:bg-destructive:hover{background-color:hsl(var(--destructive))}.group.destructive .group-\\[\\.destructive\\]\\:hover\\:text-destructive-foreground:hover{color:hsl(var(--destructive-foreground))}.group.destructive .group-\\[\\.destructive\\]\\:hover\\:text-red-50:hover{--tw-text-opacity: 1;color:rgb(254 242 242 / var(--tw-text-opacity, 1))}.group.destructive .group-\\[\\.destructive\\]\\:focus\\:ring-destructive:focus{--tw-ring-color: hsl(var(--destructive))}.group.destructive .group-\\[\\.destructive\\]\\:focus\\:ring-red-400:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(248 113 113 / var(--tw-ring-opacity, 1))}.group.destructive .group-\\[\\.destructive\\]\\:focus\\:ring-offset-red-600:focus{--tw-ring-offset-color: #dc2626}.peer:disabled~.peer-disabled\\:cursor-not-allowed{cursor:not-allowed}.peer:disabled~.peer-disabled\\:opacity-70{opacity:.7}.has-\\[\\:disabled\\]\\:opacity-50:has(:disabled){opacity:.5}.group\\/menu-item:has([data-sidebar=menu-action]) .group-has-\\[\\[data-sidebar\\=menu-action\\]\\]\\/menu-item\\:pr-8{padding-right:2rem}.aria-disabled\\:pointer-events-none[aria-disabled=true]{pointer-events:none}.aria-disabled\\:opacity-50[aria-disabled=true]{opacity:.5}.aria-selected\\:bg-accent[aria-selected=true]{background-color:hsl(var(--accent))}.aria-selected\\:bg-accent\\/50[aria-selected=true]{background-color:hsl(var(--accent) / .5)}.aria-selected\\:text-accent-foreground[aria-selected=true]{color:hsl(var(--accent-foreground))}.aria-selected\\:text-muted-foreground[aria-selected=true]{color:hsl(var(--muted-foreground))}.aria-selected\\:opacity-100[aria-selected=true]{opacity:1}.aria-selected\\:opacity-30[aria-selected=true]{opacity:.3}.data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true],.data-\\[disabled\\]\\:pointer-events-none[data-disabled]{pointer-events:none}.data-\\[panel-group-direction\\=vertical\\]\\:h-px[data-panel-group-direction=vertical]{height:1px}.data-\\[panel-group-direction\\=vertical\\]\\:w-full[data-panel-group-direction=vertical]{width:100%}.data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y: .25rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x: -.25rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x: .25rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y: -.25rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.data-\\[state\\=checked\\]\\:translate-x-5[data-state=checked]{--tw-translate-x: 1.25rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.data-\\[state\\=unchecked\\]\\:translate-x-0[data-state=unchecked],.data-\\[swipe\\=cancel\\]\\:translate-x-0[data-swipe=cancel]{--tw-translate-x: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.data-\\[swipe\\=end\\]\\:translate-x-\\[var\\(--radix-toast-swipe-end-x\\)\\][data-swipe=end]{--tw-translate-x: var(--radix-toast-swipe-end-x);transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.data-\\[swipe\\=move\\]\\:translate-x-\\[var\\(--radix-toast-swipe-move-x\\)\\][data-swipe=move]{--tw-translate-x: var(--radix-toast-swipe-move-x);transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes accordion-up{0%{height:var(--radix-accordion-content-height)}to{height:0}}.data-\\[state\\=closed\\]\\:animate-accordion-up[data-state=closed]{animation:accordion-up .2s ease-out}@keyframes accordion-down{0%{height:0}to{height:var(--radix-accordion-content-height)}}.data-\\[state\\=open\\]\\:animate-accordion-down[data-state=open]{animation:accordion-down .2s ease-out}.data-\\[panel-group-direction\\=vertical\\]\\:flex-col[data-panel-group-direction=vertical]{flex-direction:column}.data-\\[active\\]\\:bg-accent\\/50[data-active]{background-color:hsl(var(--accent) / .5)}.data-\\[selected\\=\\'true\\'\\]\\:bg-accent[data-selected=true]{background-color:hsl(var(--accent))}.data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:hsl(var(--background))}.data-\\[state\\=checked\\]\\:bg-primary[data-state=checked]{background-color:hsl(var(--primary))}.data-\\[state\\=on\\]\\:bg-accent[data-state=on],.data-\\[state\\=open\\]\\:bg-accent[data-state=open]{background-color:hsl(var(--accent))}.data-\\[state\\=open\\]\\:bg-accent\\/50[data-state=open]{background-color:hsl(var(--accent) / .5)}.data-\\[state\\=open\\]\\:bg-secondary[data-state=open]{background-color:hsl(var(--secondary))}.data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:hsl(var(--muted))}.data-\\[state\\=unchecked\\]\\:bg-input[data-state=unchecked]{background-color:hsl(var(--input))}.data-\\[active\\=true\\]\\:font-medium[data-active=true]{font-weight:500}.data-\\[selected\\=true\\]\\:text-accent-foreground[data-selected=true]{color:hsl(var(--accent-foreground))}.data-\\[state\\=active\\]\\:text-foreground[data-state=active]{color:hsl(var(--foreground))}.data-\\[state\\=checked\\]\\:text-primary-foreground[data-state=checked]{color:hsl(var(--primary-foreground))}.data-\\[state\\=on\\]\\:text-accent-foreground[data-state=on],.data-\\[state\\=open\\]\\:text-accent-foreground[data-state=open]{color:hsl(var(--accent-foreground))}.data-\\[state\\=open\\]\\:text-muted-foreground[data-state=open]{color:hsl(var(--muted-foreground))}.data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true],.data-\\[disabled\\]\\:opacity-50[data-disabled]{opacity:.5}.data-\\[state\\=open\\]\\:opacity-100[data-state=open]{opacity:1}.data-\\[state\\=active\\]\\:shadow-sm[data-state=active]{--tw-shadow: 0 1px 2px 0 rgb(0 0 0 / .05);--tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.data-\\[swipe\\=move\\]\\:transition-none[data-swipe=move]{transition-property:none}.data-\\[state\\=closed\\]\\:duration-300[data-state=closed]{transition-duration:.3s}.data-\\[state\\=open\\]\\:duration-500[data-state=open]{transition-duration:.5s}.data-\\[motion\\^\\=from-\\]\\:animate-in[data-motion^=from-],.data-\\[state\\=open\\]\\:animate-in[data-state=open],.data-\\[state\\=visible\\]\\:animate-in[data-state=visible]{animation-name:enter;animation-duration:.15s;--tw-enter-opacity: initial;--tw-enter-scale: initial;--tw-enter-rotate: initial;--tw-enter-translate-x: initial;--tw-enter-translate-y: initial}.data-\\[motion\\^\\=to-\\]\\:animate-out[data-motion^=to-],.data-\\[state\\=closed\\]\\:animate-out[data-state=closed],.data-\\[state\\=hidden\\]\\:animate-out[data-state=hidden],.data-\\[swipe\\=end\\]\\:animate-out[data-swipe=end]{animation-name:exit;animation-duration:.15s;--tw-exit-opacity: initial;--tw-exit-scale: initial;--tw-exit-rotate: initial;--tw-exit-translate-x: initial;--tw-exit-translate-y: initial}.data-\\[motion\\^\\=from-\\]\\:fade-in[data-motion^=from-]{--tw-enter-opacity: 0}.data-\\[motion\\^\\=to-\\]\\:fade-out[data-motion^=to-],.data-\\[state\\=closed\\]\\:fade-out-0[data-state=closed]{--tw-exit-opacity: 0}.data-\\[state\\=closed\\]\\:fade-out-80[data-state=closed]{--tw-exit-opacity: .8}.data-\\[state\\=hidden\\]\\:fade-out[data-state=hidden]{--tw-exit-opacity: 0}.data-\\[state\\=open\\]\\:fade-in-0[data-state=open],.data-\\[state\\=visible\\]\\:fade-in[data-state=visible]{--tw-enter-opacity: 0}.data-\\[state\\=closed\\]\\:zoom-out-95[data-state=closed]{--tw-exit-scale: .95}.data-\\[state\\=open\\]\\:zoom-in-90[data-state=open]{--tw-enter-scale: .9}.data-\\[state\\=open\\]\\:zoom-in-95[data-state=open]{--tw-enter-scale: .95}.data-\\[motion\\=from-end\\]\\:slide-in-from-right-52[data-motion=from-end]{--tw-enter-translate-x: 13rem}.data-\\[motion\\=from-start\\]\\:slide-in-from-left-52[data-motion=from-start]{--tw-enter-translate-x: -13rem}.data-\\[motion\\=to-end\\]\\:slide-out-to-right-52[data-motion=to-end]{--tw-exit-translate-x: 13rem}.data-\\[motion\\=to-start\\]\\:slide-out-to-left-52[data-motion=to-start]{--tw-exit-translate-x: -13rem}.data-\\[side\\=bottom\\]\\:slide-in-from-top-2[data-side=bottom]{--tw-enter-translate-y: -.5rem}.data-\\[side\\=left\\]\\:slide-in-from-right-2[data-side=left]{--tw-enter-translate-x: .5rem}.data-\\[side\\=right\\]\\:slide-in-from-left-2[data-side=right]{--tw-enter-translate-x: -.5rem}.data-\\[side\\=top\\]\\:slide-in-from-bottom-2[data-side=top]{--tw-enter-translate-y: .5rem}.data-\\[state\\=closed\\]\\:slide-out-to-bottom[data-state=closed]{--tw-exit-translate-y: 100%}.data-\\[state\\=closed\\]\\:slide-out-to-left[data-state=closed]{--tw-exit-translate-x: -100%}.data-\\[state\\=closed\\]\\:slide-out-to-left-1\\/2[data-state=closed]{--tw-exit-translate-x: -50%}.data-\\[state\\=closed\\]\\:slide-out-to-right[data-state=closed],.data-\\[state\\=closed\\]\\:slide-out-to-right-full[data-state=closed]{--tw-exit-translate-x: 100%}.data-\\[state\\=closed\\]\\:slide-out-to-top[data-state=closed]{--tw-exit-translate-y: -100%}.data-\\[state\\=closed\\]\\:slide-out-to-top-\\[48\\%\\][data-state=closed]{--tw-exit-translate-y: -48%}.data-\\[state\\=open\\]\\:slide-in-from-bottom[data-state=open]{--tw-enter-translate-y: 100%}.data-\\[state\\=open\\]\\:slide-in-from-left[data-state=open]{--tw-enter-translate-x: -100%}.data-\\[state\\=open\\]\\:slide-in-from-left-1\\/2[data-state=open]{--tw-enter-translate-x: -50%}.data-\\[state\\=open\\]\\:slide-in-from-right[data-state=open]{--tw-enter-translate-x: 100%}.data-\\[state\\=open\\]\\:slide-in-from-top[data-state=open]{--tw-enter-translate-y: -100%}.data-\\[state\\=open\\]\\:slide-in-from-top-\\[48\\%\\][data-state=open]{--tw-enter-translate-y: -48%}.data-\\[state\\=open\\]\\:slide-in-from-top-full[data-state=open]{--tw-enter-translate-y: -100%}.data-\\[state\\=closed\\]\\:duration-300[data-state=closed]{animation-duration:.3s}.data-\\[state\\=open\\]\\:duration-500[data-state=open]{animation-duration:.5s}.data-\\[panel-group-direction\\=vertical\\]\\:after\\:left-0[data-panel-group-direction=vertical]:after{content:var(--tw-content);left:0}.data-\\[panel-group-direction\\=vertical\\]\\:after\\:h-1[data-panel-group-direction=vertical]:after{content:var(--tw-content);height:.25rem}.data-\\[panel-group-direction\\=vertical\\]\\:after\\:w-full[data-panel-group-direction=vertical]:after{content:var(--tw-content);width:100%}.data-\\[panel-group-direction\\=vertical\\]\\:after\\:-translate-y-1\\/2[data-panel-group-direction=vertical]:after{content:var(--tw-content);--tw-translate-y: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.data-\\[panel-group-direction\\=vertical\\]\\:after\\:translate-x-0[data-panel-group-direction=vertical]:after{content:var(--tw-content);--tw-translate-x: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group[data-collapsible=offcanvas] .group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]{left:calc(var(--sidebar-width) * -1)}.group[data-collapsible=offcanvas] .group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]{right:calc(var(--sidebar-width) * -1)}.group[data-side=left] .group-data-\\[side\\=left\\]\\:-right-4{right:-1rem}.group[data-side=right] .group-data-\\[side\\=right\\]\\:left-0{left:0}.group[data-collapsible=icon] .group-data-\\[collapsible\\=icon\\]\\:-mt-8{margin-top:-2rem}.group[data-collapsible=icon] .group-data-\\[collapsible\\=icon\\]\\:hidden{display:none}.group[data-collapsible=icon] .group-data-\\[collapsible\\=icon\\]\\:\\!size-8{width:2rem!important;height:2rem!important}.group[data-collapsible=icon] .group-data-\\[collapsible\\=icon\\]\\:w-\\[--sidebar-width-icon\\]{width:var(--sidebar-width-icon)}.group[data-collapsible=icon] .group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)_\\+_theme\\(spacing\\.4\\)\\)\\]{width:calc(var(--sidebar-width-icon) + 1rem)}.group[data-collapsible=icon] .group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)_\\+_theme\\(spacing\\.4\\)_\\+2px\\)\\]{width:calc(var(--sidebar-width-icon) + 1rem + 2px)}.group[data-collapsible=offcanvas] .group-data-\\[collapsible\\=offcanvas\\]\\:w-0{width:0px}.group[data-collapsible=offcanvas] .group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0{--tw-translate-x: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group[data-side=right] .group-data-\\[side\\=right\\]\\:rotate-180,.group[data-state=open] .group-data-\\[state\\=open\\]\\:rotate-180{--tw-rotate: 180deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group[data-collapsible=icon] .group-data-\\[collapsible\\=icon\\]\\:overflow-hidden{overflow:hidden}.group[data-variant=floating] .group-data-\\[variant\\=floating\\]\\:rounded-lg{border-radius:var(--radius)}.group[data-variant=floating] .group-data-\\[variant\\=floating\\]\\:border{border-width:1px}.group[data-side=left] .group-data-\\[side\\=left\\]\\:border-r{border-right-width:1px}.group[data-side=right] .group-data-\\[side\\=right\\]\\:border-l{border-left-width:1px}.group[data-collapsible=icon] .group-data-\\[collapsible\\=icon\\]\\:\\!p-0{padding:0!important}.group[data-collapsible=icon] .group-data-\\[collapsible\\=icon\\]\\:\\!p-2{padding:.5rem!important}.group[data-collapsible=icon] .group-data-\\[collapsible\\=icon\\]\\:opacity-0{opacity:0}.group[data-variant=floating] .group-data-\\[variant\\=floating\\]\\:shadow{--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.group[data-collapsible=offcanvas] .group-data-\\[collapsible\\=offcanvas\\]\\:after\\:left-full:after{content:var(--tw-content);left:100%}.peer\\/menu-button[data-size=default]~.peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5{top:.375rem}.peer\\/menu-button[data-size=lg]~.peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5{top:.625rem}.peer\\/menu-button[data-size=sm]~.peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1{top:.25rem}.peer[data-variant=inset]~.peer-data-\\[variant\\=inset\\]\\:min-h-\\[calc\\(100svh-theme\\(spacing\\.4\\)\\)\\]{min-height:calc(100svh - 1rem)}@supports (backdrop-filter: var(--tw)){.supports-\\[backdrop-filter\\]\\:bg-background\\/60{background-color:hsl(var(--background) / .6)}}.dark\\:border-blue-800:is(.dark *){--tw-border-opacity: 1;border-color:rgb(30 64 175 / var(--tw-border-opacity, 1))}.dark\\:border-blue-900:is(.dark *){--tw-border-opacity: 1;border-color:rgb(30 58 138 / var(--tw-border-opacity, 1))}.dark\\:border-destructive:is(.dark *){border-color:hsl(var(--destructive))}.dark\\:border-green-800:is(.dark *){--tw-border-opacity: 1;border-color:rgb(22 101 52 / var(--tw-border-opacity, 1))}.dark\\:border-green-900:is(.dark *){--tw-border-opacity: 1;border-color:rgb(20 83 45 / var(--tw-border-opacity, 1))}.dark\\:border-orange-800:is(.dark *){--tw-border-opacity: 1;border-color:rgb(154 52 18 / var(--tw-border-opacity, 1))}.dark\\:border-yellow-900:is(.dark *){--tw-border-opacity: 1;border-color:rgb(113 63 18 / var(--tw-border-opacity, 1))}.dark\\:bg-blue-900\\/30:is(.dark *){background-color:#1e3a8a4d}.dark\\:bg-blue-950\\/20:is(.dark *){background-color:#17255433}.dark\\:bg-gray-800:is(.dark *){--tw-bg-opacity: 1;background-color:rgb(31 41 55 / var(--tw-bg-opacity, 1))}.dark\\:bg-green-900\\/30:is(.dark *){background-color:#14532d4d}.dark\\:bg-green-950\\/20:is(.dark *){background-color:#052e1633}.dark\\:bg-orange-950\\/20:is(.dark *){background-color:#43140733}.dark\\:bg-purple-900\\/20:is(.dark *){background-color:#581c8733}.dark\\:bg-red-900\\/20:is(.dark *){background-color:#7f1d1d33}.dark\\:bg-slate-900\\/20:is(.dark *){background-color:#0f172a33}.dark\\:bg-slate-950:is(.dark *){--tw-bg-opacity: 1;background-color:rgb(2 6 23 / var(--tw-bg-opacity, 1))}.dark\\:bg-yellow-950\\/20:is(.dark *){background-color:#42200633}.dark\\:from-slate-800:is(.dark *){--tw-gradient-from: #1e293b var(--tw-gradient-from-position);--tw-gradient-to: rgb(30 41 59 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.dark\\:to-slate-900:is(.dark *){--tw-gradient-to: #0f172a var(--tw-gradient-to-position)}.dark\\:text-blue-200:is(.dark *){--tw-text-opacity: 1;color:rgb(191 219 254 / var(--tw-text-opacity, 1))}.dark\\:text-blue-400:is(.dark *){--tw-text-opacity: 1;color:rgb(96 165 250 / var(--tw-text-opacity, 1))}.dark\\:text-green-400:is(.dark *){--tw-text-opacity: 1;color:rgb(74 222 128 / var(--tw-text-opacity, 1))}.dark\\:text-purple-400:is(.dark *){--tw-text-opacity: 1;color:rgb(192 132 252 / var(--tw-text-opacity, 1))}.dark\\:text-red-400:is(.dark *){--tw-text-opacity: 1;color:rgb(248 113 113 / var(--tw-text-opacity, 1))}.dark\\:text-yellow-200:is(.dark *){--tw-text-opacity: 1;color:rgb(254 240 138 / var(--tw-text-opacity, 1))}@media (min-width: 640px){.sm\\:-left-8{left:-2rem}.sm\\:-right-6{right:-1.5rem}.sm\\:bottom-0{bottom:0}.sm\\:right-0{right:0}.sm\\:top-auto{top:auto}.sm\\:col-span-2{grid-column:span 2 / span 2}.sm\\:mb-2{margin-bottom:.5rem}.sm\\:mb-6{margin-bottom:1.5rem}.sm\\:mt-0{margin-top:0}.sm\\:block{display:block}.sm\\:inline{display:inline}.sm\\:flex{display:flex}.sm\\:h-10{height:2.5rem}.sm\\:h-12{height:3rem}.sm\\:h-16{height:4rem}.sm\\:h-20{height:5rem}.sm\\:h-32{height:8rem}.sm\\:h-5{height:1.25rem}.sm\\:h-6{height:1.5rem}.sm\\:h-8{height:2rem}.sm\\:w-10{width:2.5rem}.sm\\:w-12{width:3rem}.sm\\:w-16{width:4rem}.sm\\:w-2\\/3{width:66.666667%}.sm\\:w-20{width:5rem}.sm\\:w-32{width:8rem}.sm\\:w-5{width:1.25rem}.sm\\:w-6{width:1.5rem}.sm\\:w-8{width:2rem}.sm\\:w-auto{width:auto}.sm\\:max-w-\\[75\\%\\]{max-width:75%}.sm\\:max-w-lg{max-width:32rem}.sm\\:max-w-md{max-width:28rem}.sm\\:max-w-sm{max-width:24rem}.sm\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.sm\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.sm\\:flex-row{flex-direction:row}.sm\\:flex-col{flex-direction:column}.sm\\:items-center{align-items:center}.sm\\:justify-end{justify-content:flex-end}.sm\\:justify-between{justify-content:space-between}.sm\\:gap-0{gap:0px}.sm\\:gap-2\\.5{gap:.625rem}.sm\\:gap-3{gap:.75rem}.sm\\:gap-4{gap:1rem}.sm\\:space-x-2>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(.5rem * var(--tw-space-x-reverse));margin-left:calc(.5rem * calc(1 - var(--tw-space-x-reverse)))}.sm\\:space-x-4>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(1rem * var(--tw-space-x-reverse));margin-left:calc(1rem * calc(1 - var(--tw-space-x-reverse)))}.sm\\:space-y-0>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(0px * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0px * var(--tw-space-y-reverse))}.sm\\:space-y-3>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.75rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.75rem * var(--tw-space-y-reverse))}.sm\\:space-y-4>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(1rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1rem * var(--tw-space-y-reverse))}.sm\\:rounded-lg{border-radius:var(--radius)}.sm\\:p-6{padding:1.5rem}.sm\\:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm\\:text-left{text-align:left}.sm\\:text-2xl{font-size:1.5rem;line-height:2rem}.sm\\:text-base{font-size:1rem;line-height:1.5rem}.sm\\:text-lg{font-size:1.125rem;line-height:1.75rem}.sm\\:text-sm{font-size:.875rem;line-height:1.25rem}.sm\\:text-xl{font-size:1.25rem;line-height:1.75rem}.data-\\[state\\=open\\]\\:sm\\:slide-in-from-bottom-full[data-state=open]{--tw-enter-translate-y: 100%}}@media (min-width: 768px){.md\\:absolute{position:absolute}.md\\:col-span-2{grid-column:span 2 / span 2}.md\\:ml-0{margin-left:0}.md\\:block{display:block}.md\\:flex{display:flex}.md\\:hidden{display:none}.md\\:h-screen{height:100vh}.md\\:w-96{width:24rem}.md\\:w-\\[var\\(--radix-navigation-menu-viewport-width\\)\\]{width:var(--radix-navigation-menu-viewport-width)}.md\\:w-auto{width:auto}.md\\:max-w-\\[420px\\]{max-width:420px}.md\\:max-w-lg{max-width:32rem}.md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.md\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.md\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.md\\:flex-row{flex-direction:row}.md\\:items-end{align-items:flex-end}.md\\:items-center{align-items:center}.md\\:justify-start{justify-content:flex-start}.md\\:p-10{padding:2.5rem}.md\\:p-6{padding:1.5rem}.md\\:px-8{padding-left:2rem;padding-right:2rem}.md\\:text-left{text-align:left}.md\\:text-2xl{font-size:1.5rem;line-height:2rem}.md\\:text-3xl{font-size:1.875rem;line-height:2.25rem}.md\\:text-4xl{font-size:2.25rem;line-height:2.5rem}.md\\:text-5xl{font-size:3rem;line-height:1}.md\\:text-6xl{font-size:3.75rem;line-height:1}.md\\:text-7xl{font-size:4.5rem;line-height:1}.md\\:text-8xl{font-size:6rem;line-height:1}.md\\:text-lg{font-size:1.125rem;line-height:1.75rem}.md\\:text-sm{font-size:.875rem;line-height:1.25rem}.md\\:opacity-0{opacity:0}.after\\:md\\:hidden:after{content:var(--tw-content);display:none}.peer[data-variant=inset]~.md\\:peer-data-\\[variant\\=inset\\]\\:m-2{margin:.5rem}.peer[data-state=collapsed][data-variant=inset]~.md\\:peer-data-\\[state\\=collapsed\\]\\:peer-data-\\[variant\\=inset\\]\\:ml-2{margin-left:.5rem}.peer[data-variant=inset]~.md\\:peer-data-\\[variant\\=inset\\]\\:ml-0{margin-left:0}.peer[data-variant=inset]~.md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl{border-radius:.75rem}.peer[data-variant=inset]~.md\\:peer-data-\\[variant\\=inset\\]\\:shadow{--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}}@media (min-width: 1024px){.lg\\:sticky{position:sticky}.lg\\:top-24{top:6rem}.lg\\:col-span-2{grid-column:span 2 / span 2}.lg\\:block{display:block}.lg\\:hidden{display:none}.lg\\:h-fit{height:-moz-fit-content;height:fit-content}.lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.lg\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.lg\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.lg\\:grid-cols-\\[280px_1fr\\]{grid-template-columns:280px 1fr}.lg\\:px-8{padding-left:2rem;padding-right:2rem}.lg\\:text-8xl{font-size:6rem;line-height:1}}@media (min-width: 1280px){.xl\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}}.\\[\\&\\:has\\(\\[aria-selected\\]\\)\\]\\:bg-accent:has([aria-selected]){background-color:hsl(var(--accent))}.first\\:\\[\\&\\:has\\(\\[aria-selected\\]\\)\\]\\:rounded-l-md:has([aria-selected]):first-child{border-top-left-radius:calc(var(--radius) - 2px);border-bottom-left-radius:calc(var(--radius) - 2px)}.last\\:\\[\\&\\:has\\(\\[aria-selected\\]\\)\\]\\:rounded-r-md:has([aria-selected]):last-child{border-top-right-radius:calc(var(--radius) - 2px);border-bottom-right-radius:calc(var(--radius) - 2px)}.\\[\\&\\:has\\(\\[aria-selected\\]\\.day-outside\\)\\]\\:bg-accent\\/50:has([aria-selected].day-outside){background-color:hsl(var(--accent) / .5)}.\\[\\&\\:has\\(\\[aria-selected\\]\\.day-range-end\\)\\]\\:rounded-r-md:has([aria-selected].day-range-end){border-top-right-radius:calc(var(--radius) - 2px);border-bottom-right-radius:calc(var(--radius) - 2px)}.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pr-0:has([role=checkbox]){padding-right:0}.\\[\\&\\>button\\]\\:hidden>button{display:none}.\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.\\[\\&\\>span\\]\\:line-clamp-1>span{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}.\\[\\&\\>svg\\+div\\]\\:translate-y-\\[-3px\\]>svg+div{--tw-translate-y: -3px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.\\[\\&\\>svg\\]\\:absolute>svg{position:absolute}.\\[\\&\\>svg\\]\\:left-4>svg{left:1rem}.\\[\\&\\>svg\\]\\:top-4>svg{top:1rem}.\\[\\&\\>svg\\]\\:size-3\\.5>svg{width:.875rem;height:.875rem}.\\[\\&\\>svg\\]\\:size-4>svg{width:1rem;height:1rem}.\\[\\&\\>svg\\]\\:h-2\\.5>svg{height:.625rem}.\\[\\&\\>svg\\]\\:h-3>svg{height:.75rem}.\\[\\&\\>svg\\]\\:w-2\\.5>svg{width:.625rem}.\\[\\&\\>svg\\]\\:w-3>svg{width:.75rem}.\\[\\&\\>svg\\]\\:shrink-0>svg{flex-shrink:0}.\\[\\&\\>svg\\]\\:text-destructive>svg{color:hsl(var(--destructive))}.\\[\\&\\>svg\\]\\:text-foreground>svg{color:hsl(var(--foreground))}.\\[\\&\\>svg\\]\\:text-muted-foreground>svg{color:hsl(var(--muted-foreground))}.\\[\\&\\>svg\\~\\*\\]\\:pl-7>svg~*{padding-left:1.75rem}.\\[\\&\\>tr\\]\\:last\\:border-b-0:last-child>tr{border-bottom-width:0px}.\\[\\&\\[data-panel-group-direction\\=vertical\\]\\>div\\]\\:rotate-90[data-panel-group-direction=vertical]>div{--tw-rotate: 90deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.\\[\\&\\[data-state\\=open\\]\\>svg\\]\\:rotate-180[data-state=open]>svg{--tw-rotate: 180deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.\\[\\&_\\.recharts-cartesian-axis-tick_text\\]\\:fill-muted-foreground .recharts-cartesian-axis-tick text{fill:hsl(var(--muted-foreground))}.\\[\\&_\\.recharts-cartesian-grid_line\\[stroke\\=\\'\\#ccc\\'\\]\\]\\:stroke-border\\/50 .recharts-cartesian-grid line[stroke="#ccc"]{stroke:hsl(var(--border) / .5)}.\\[\\&_\\.recharts-curve\\.recharts-tooltip-cursor\\]\\:stroke-border .recharts-curve.recharts-tooltip-cursor{stroke:hsl(var(--border))}.\\[\\&_\\.recharts-dot\\[stroke\\=\\'\\#fff\\'\\]\\]\\:stroke-transparent .recharts-dot[stroke="#fff"]{stroke:transparent}.\\[\\&_\\.recharts-layer\\]\\:outline-none .recharts-layer{outline:2px solid transparent;outline-offset:2px}.\\[\\&_\\.recharts-polar-grid_\\[stroke\\=\\'\\#ccc\\'\\]\\]\\:stroke-border .recharts-polar-grid [stroke="#ccc"]{stroke:hsl(var(--border))}.\\[\\&_\\.recharts-radial-bar-background-sector\\]\\:fill-muted .recharts-radial-bar-background-sector,.\\[\\&_\\.recharts-rectangle\\.recharts-tooltip-cursor\\]\\:fill-muted .recharts-rectangle.recharts-tooltip-cursor{fill:hsl(var(--muted))}.\\[\\&_\\.recharts-reference-line_\\[stroke\\=\\'\\#ccc\\'\\]\\]\\:stroke-border .recharts-reference-line [stroke="#ccc"]{stroke:hsl(var(--border))}.\\[\\&_\\.recharts-sector\\[stroke\\=\\'\\#fff\\'\\]\\]\\:stroke-transparent .recharts-sector[stroke="#fff"]{stroke:transparent}.\\[\\&_\\.recharts-sector\\]\\:outline-none .recharts-sector,.\\[\\&_\\.recharts-surface\\]\\:outline-none .recharts-surface{outline:2px solid transparent;outline-offset:2px}.\\[\\&_\\[cmdk-group-heading\\]\\]\\:px-2 [cmdk-group-heading]{padding-left:.5rem;padding-right:.5rem}.\\[\\&_\\[cmdk-group-heading\\]\\]\\:py-1\\.5 [cmdk-group-heading]{padding-top:.375rem;padding-bottom:.375rem}.\\[\\&_\\[cmdk-group-heading\\]\\]\\:text-xs [cmdk-group-heading]{font-size:.75rem;line-height:1rem}.\\[\\&_\\[cmdk-group-heading\\]\\]\\:font-medium [cmdk-group-heading]{font-weight:500}.\\[\\&_\\[cmdk-group-heading\\]\\]\\:text-muted-foreground [cmdk-group-heading]{color:hsl(var(--muted-foreground))}.\\[\\&_\\[cmdk-group\\]\\:not\\(\\[hidden\\]\\)_\\~\\[cmdk-group\\]\\]\\:pt-0 [cmdk-group]:not([hidden])~[cmdk-group]{padding-top:0}.\\[\\&_\\[cmdk-group\\]\\]\\:px-2 [cmdk-group]{padding-left:.5rem;padding-right:.5rem}.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:h-5 [cmdk-input-wrapper] svg{height:1.25rem}.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:w-5 [cmdk-input-wrapper] svg{width:1.25rem}.\\[\\&_\\[cmdk-input\\]\\]\\:h-12 [cmdk-input]{height:3rem}.\\[\\&_\\[cmdk-item\\]\\]\\:px-2 [cmdk-item]{padding-left:.5rem;padding-right:.5rem}.\\[\\&_\\[cmdk-item\\]\\]\\:py-3 [cmdk-item]{padding-top:.75rem;padding-bottom:.75rem}.\\[\\&_\\[cmdk-item\\]_svg\\]\\:h-5 [cmdk-item] svg{height:1.25rem}.\\[\\&_\\[cmdk-item\\]_svg\\]\\:w-5 [cmdk-item] svg{width:1.25rem}.\\[\\&_p\\]\\:leading-relaxed p{line-height:1.625}.\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.\\[\\&_svg\\]\\:size-4 svg{width:1rem;height:1rem}.\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-width:0px}.\\[\\&_tr\\]\\:border-b tr{border-bottom-width:1px}[data-side=left][data-collapsible=offcanvas] .\\[\\[data-side\\=left\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-right-2{right:-.5rem}[data-side=left][data-state=collapsed] .\\[\\[data-side\\=left\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize{cursor:e-resize}[data-side=left] .\\[\\[data-side\\=left\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}[data-side=right][data-collapsible=offcanvas] .\\[\\[data-side\\=right\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-left-2{left:-.5rem}[data-side=right][data-state=collapsed] .\\[\\[data-side\\=right\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}[data-side=right] .\\[\\[data-side\\=right\\]_\\&\\]\\:cursor-e-resize{cursor:e-resize}`;
class t_ extends HTMLElement {
  constructor() {
    super();
    L0(this, "root", null);
    L0(this, "mountPoint", null);
    this.attachShadow({ mode: "open" });
  }
  static get observedAttributes() {
    return ["username", "width", "height", "theme"];
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback(b, C, L) {
    C !== L && this.render();
  }
  disconnectedCallback() {
    this.root && this.root.unmount();
  }
  async fetchCardData(b) {
    try {
      const C = await fetch(`https://ffpqhgiucoqjmkyeevqq.supabase.co/functions/v1/get-card?vanity_url=${b}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Add anon key if needed, but get-card should be public
          Authorization: "Bearer undefined"
        }
      });
      if (!C.ok) return null;
      const L = await C.json(), Y = L.card_data || L;
      return {
        fullName: Y.fullName || Y.name || "User",
        jobTitle: Y.jobTitle || "",
        company: Y.company || "",
        email: Y.email || "",
        phone: Y.phone || "",
        avatarUrl: Y.avatarUrl || "",
        vanityUrl: b,
        cardConfig: Y.cardConfig,
        bannerType: Y.bannerType,
        bannerValue: Y.bannerValue
      };
    } catch (C) {
      return console.error("Patra SDK: Failed to fetch card", C), null;
    }
  }
  async render() {
    if (!this.shadowRoot) return;
    const b = this.getAttribute("username");
    if (!b) return;
    const C = parseInt(this.getAttribute("width") || "400"), L = parseInt(this.getAttribute("height") || "250");
    if (!this.mountPoint) {
      this.mountPoint = document.createElement("div"), this.mountPoint.className = "patra-card-widget";
      const Z = document.createElement("style");
      Z.textContent = e_, this.shadowRoot.appendChild(Z), this.shadowRoot.appendChild(this.mountPoint);
    }
    this.root || (this.root = vv.createRoot(this.mountPoint)), this.root.render(
      /* @__PURE__ */ bt.jsx("div", { className: "flex items-center justify-center", style: { width: C, height: L, color: "#666" }, children: /* @__PURE__ */ bt.jsxs("svg", { className: "animate-spin h-8 w-8 text-gray-500", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
        /* @__PURE__ */ bt.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
        /* @__PURE__ */ bt.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
      ] }) })
    );
    const Y = await this.fetchCardData(b);
    Y ? this.root.render(
      /* @__PURE__ */ bt.jsx("div", { className: "patra-iso-root", children: /* @__PURE__ */ bt.jsx(
        ZR,
        {
          cardData: Y,
          username: b,
          width: C,
          height: L
        }
      ) })
    ) : this.root.render(
      /* @__PURE__ */ bt.jsx("div", { className: "flex items-center justify-center text-red-500", style: { width: C, height: L }, children: "Card not found" })
    );
  }
}
customElements.get("patra-card") || customElements.define("patra-card", t_);
window.Patra = {
  renderCard: (y, S) => {
    const b = document.getElementById(S);
    if (b) {
      const C = document.createElement("patra-card");
      C.setAttribute("username", y), b.appendChild(C);
    }
  }
};

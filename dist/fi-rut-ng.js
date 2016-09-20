(function(f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f();
    } else if (typeof define === "function" && define.amd) {
        define([], f);
    } else {
        var g;
        if (typeof window !== "undefined") {
            g = window;
        } else if (typeof global !== "undefined") {
            g = global;
        } else if (typeof self !== "undefined") {
            g = self;
        } else {
            g = this;
        }
        g.rut = f();
    }
})(function() {
    var define, module, exports;
    return function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    var f = new Error("Cannot find module '" + o + "'");
                    throw f.code = "MODULE_NOT_FOUND", f;
                }
                var l = n[o] = {
                    exports: {}
                };
                t[o][0].call(l.exports, function(e) {
                    var n = t[o][1][e];
                    return s(n ? n : e);
                }, l, l.exports, e, t, n, r);
            }
            return n[o].exports;
        }
        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++) s(r[o]);
        return s;
    }({
        1: [ function(require, module, exports) {
            "use strict";
            var GROUP_REGEX = /(\d)(?=(\d{3})+\b)/g;
            var CLEAN_REGEX = /[^\dk]+/gi;
            var DIGITS_REGEX = /\D+/g;
            var GROUP_REPLACE = "$1.";
            var EMPTY = "";
            var DASH = "-";
            var K = "k";
            function clean(value, parts) {
                value = String(value).replace(CLEAN_REGEX, EMPTY);
                var verifier = value.substr(-1, 1);
                var digits = value.substr(0, value.length - 1).replace(DIGITS_REGEX, EMPTY);
                if (parts) {
                    return [ digits, verifier ];
                }
                return digits + verifier;
            }
            function format(value) {
                value = clean(value);
                if (value.length < 3) {
                    return value;
                }
                var parts = clean(value, true);
                parts[0] = parts[0].replace(GROUP_REGEX, GROUP_REPLACE);
                return parts.join(DASH);
            }
            function validate(value) {
                if (!value || !String(value).length) {
                    return true;
                }
                var parts = clean(value, true);
                var verifier = parts[1];
                var digits = parts[0];
                var m = 0;
                var r = 1;
                if (isNaN(verifier)) {
                    verifier = K;
                }
                for (;digits; digits = Math.floor(parseInt(digits) / 10)) {
                    r = (r + digits % 10 * (9 - m++ % 6)) % 11;
                }
                if (r) {
                    return verifier === String(r - 1);
                }
                return verifier === K;
            }
            function digits(value) {
                return clean(value, true)[0];
            }
            function verifier(value) {
                return clean(value, true)[1];
            }
            module.exports = {
                validate: validate,
                verifier: verifier,
                digits: digits,
                format: format,
                clean: clean
            };
        }, {} ]
    }, {}, [ 1 ])(1);
});

(function(window) {
    "use strict";
    var ng = window.angular;
    var rut = window.rut;
    var validate = rut.validate;
    var verifier = rut.verifier;
    var digits = rut.digits;
    var format = rut.format;
    var clean = rut.clean;
    var ERR_WRONG_ELEMENT = "This directive must be used on <INPUT> elements only and element is <%s>";
    var ERR_NO_MODEL = "A model should be assigned to the input element!";
    var VALIDATE = "validate";
    var VERIFIER = "verifier";
    var DIGITS = "digits";
    var CLEAN = "clean";
    var NG_RUT = "ngRut";
    var INPUT = "INPUT";
    var RUT = "rut";
    function ngRutFactoryFn() {
        return rut;
    }
    function ngRutDirectiveFn($log) {
        function ngRutDirectiveLinkFn($scope, $element, $attrs, $model) {
            if ($element[0].tagName !== INPUT) {
                $log.error(ERR_WRONG_ELEMENT, $element[0].tagName);
                return;
            }
            if (!$model) {
                $log.warn(ERR_NO_MODEL);
                return;
            }
            function ngRutDirectiveModelFormatter(value) {
                $model.$setValidity(RUT, validate(value));
                return format($model.$modelValue);
            }
            function ngRutDirectiveModelParser(value) {
                $model.$setValidity(RUT, validate(value));
                $model.$setViewValue(format(value));
                $model.$render();
                return clean(value);
            }
            $model.$formatters.unshift(ngRutDirectiveModelFormatter);
            $model.$parsers.unshift(ngRutDirectiveModelParser);
        }
        var ngRutDirectiveDef = {
            restrict: "A",
            require: "ngModel",
            link: ngRutDirectiveLinkFn
        };
        return ngRutDirectiveDef;
    }
    function ngRutFilerReturnFn(value, action) {
        switch (action) {
          case VALIDATE:
            return validate(value);

          case CLEAN:
            return clean(value);

          case DIGITS:
            return digits(value);

          case VERIFIER:
            return verifier(value);

          default:
            return format(value);
        }
    }
    function ngRutFilterFn() {
        return ngRutFilerReturnFn;
    }
    ng.module(NG_RUT, []).factory(NG_RUT, ngRutFactoryFn).directive(NG_RUT, [ "$log", ngRutDirectiveFn ]).filter(NG_RUT, ngRutFilterFn);
})(window);
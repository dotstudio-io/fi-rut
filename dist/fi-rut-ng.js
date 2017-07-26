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
                value = (value + "").replace(CLEAN_REGEX, EMPTY);
                var verifier = value.substr(-1, 1).toLowerCase();
                var digits = value.substr(0, value.length - 1).replace(DIGITS_REGEX, EMPTY).toLowerCase();
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
                return parts.join(DASH).toLowerCase();
            }
            function calculate(digits) {
                digits = clean(digits);
                if (!digits || !String(digits).length) {
                    return null;
                }
                var m = 0;
                var r = 1;
                for (;digits; digits = Math.floor(parseInt(digits) / 10)) {
                    r = (r + digits % 10 * (9 - m++ % 6)) % 11;
                }
                return r ? r - 1 + "" : K;
            }
            function validate(value) {
                if (!value || !(value + "").length) {
                    return false;
                }
                var parts = clean(value, true);
                var verifier = parts[1];
                var digits = parts[0];
                if (isNaN(verifier)) {
                    verifier = K;
                }
                return verifier === calculate(digits);
            }
            function digits(value) {
                return clean(value, true)[0];
            }
            function verifier(value) {
                return clean(value, true)[1];
            }
            module.exports = {
                calculate: calculate,
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
    var calculate = rut.calculate;
    var validate = rut.validate;
    var verifier = rut.verifier;
    var digits = rut.digits;
    var format = rut.format;
    var clean = rut.clean;
    function ngRutFactoryFn() {
        return rut;
    }
    function ngRutDirectiveFn($log) {
        function ngRutDirectiveLinkFn($scope, $element, $attrs, $model) {
            var input = $element[0];
            var hasSetSelectionRange = "setSelectionRange" in input;
            if (input.tagName !== "INPUT") {
                $log.error("This directive must be used on <INPUT> elements only and element is <%s>", $element[0].tagName);
                return;
            }
            if (!$model) {
                $log.warn("A model should be assigned to the input element!");
                return;
            }
            function setModelValidity(value) {
                if (value || input.hasAttribute("required")) {
                    $model.$setValidity("rut", validate(value));
                } else {
                    $model.$setValidity("rut", true);
                }
            }
            function ngRutDirectiveModelFormatter(value) {
                setModelValidity(value);
                return format($model.$modelValue);
            }
            function ngRutDirectiveModelParser(value) {
                setModelValidity(value);
                var formatted = format(value);
                var len = formatted.length * 2;
                $model.$setViewValue(formatted);
                $model.$render();
                if (hasSetSelectionRange) {
                    setTimeout(input.setSelectionRange.bind(input, len, len));
                }
                return clean(value);
            }
            $model.$formatters.push(ngRutDirectiveModelFormatter);
            $model.$parsers.push(ngRutDirectiveModelParser);
        }
        var ngRutDirectiveDef = {
            restrict: "A",
            require: "ngModel",
            link: ngRutDirectiveLinkFn
        };
        return ngRutDirectiveDef;
    }
    function ngRutFilerReturnFn(value, method) {
        switch (method) {
          case "calculate":
            return calculate(value);

          case "verifier":
            return verifier(value);

          case "validate":
            return validate(value);

          case "digits":
            return digits(value);

          case "clean":
            return clean(value);

          default:
            return format(value);
        }
    }
    function ngRutFilterFn() {
        return ngRutFilerReturnFn;
    }
    var fiRut = ng.module("ngRut", []);
    fiRut.factory("ngRut", ngRutFactoryFn);
    fiRut.directive("ngRut", [ "$log", ngRutDirectiveFn ]);
    fiRut.filter("ngRut", ngRutFilterFn);
})(window);
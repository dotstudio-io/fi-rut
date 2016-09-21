/**
 * fiRut
 *
 * @description Chilean RUT utils for Node.js, the browser and AngularJS.
 * @module fiRut
 * @author Final Development Studio
 * @license MIT
 */

(function (window) {
  'use strict';

  var ng = window.angular;
  var rut = window.rut;

  var calculate = rut.calculate;
  var validate = rut.validate;
  var verifier = rut.verifier;
  var digits = rut.digits;
  var format = rut.format;
  var clean = rut.clean;

  var ERR_WRONG_ELEMENT = 'This directive must be used on <INPUT> elements only and element is <%s>';
  var ERR_NO_MODEL = 'A model should be assigned to the input element!';

  var CALCULATE = 'calculate';
  var VALIDATE = 'validate';
  var VERIFIER = 'verifier';
  var DIGITS = 'digits';
  var CLEAN = 'clean';
  var NG_RUT = 'ngRut';
  var INPUT = 'INPUT';
  var RUT = 'rut';

  /**
   * @module ngRut
   *
   * @description This module is exposed as `window.rut` in browser and
   * AngularJS versions. In Node.js require it as `fi-rut`.
   */

  /**
   * ngRut service factory function.
   *
   * @private
   */
  function ngRutFactoryFn() {
    return rut;
  }

  /**
   * ngRut directive function.
   *
   * @private
   */
  function ngRutDirectiveFn($log) {

    function ngRutDirectiveLinkFn($scope, $element, $attrs, $model) {
      /* Check if $element is an input */
      if ($element[0].tagName !== INPUT) {
        $log.error(ERR_WRONG_ELEMENT, $element[0].tagName);
        return;
      }

      /* Check if the $element has an associated model */
      if (!$model) {
        $log.warn(ERR_NO_MODEL);
        return;
      }

      /**
       * ngRut input model formatter.
       *
       * @private
       */
      function ngRutDirectiveModelFormatter(value) {
        $model.$setValidity(RUT, validate(value));

        return format($model.$modelValue);
      }

      /**
       * ngRut input model parser.
       *
       * @private
       */
      function ngRutDirectiveModelParser(value) {
        $model.$setValidity(RUT, validate(value));
        $model.$setViewValue(format(value));
        $model.$render();

        return clean(value);
      }

      /* Model formatter */
      $model.$formatters.unshift(ngRutDirectiveModelFormatter);

      /* Model parser */
      $model.$parsers.unshift(ngRutDirectiveModelParser);
    }

    /* ngRut directive definition */
    var ngRutDirectiveDef = {
      /* Restrict to an attribute type */
      restrict: 'A',

      /* Element must have ng-model attribute */
      require: 'ngModel',

      /* Link function */
      link: ngRutDirectiveLinkFn
    };

    return ngRutDirectiveDef;
  }

  /**
   * ngRut filter return function.
   *
   * @private
   */
  function ngRutFilerReturnFn(value, method) {
    switch (method) {
    case CALCULATE:
      return calculate(value);

    case VERIFIER:
      return verifier(value);

    case VALIDATE:
      return validate(value);

    case DIGITS:
      return digits(value);

    case CLEAN:
      return clean(value);

    default:
      return format(value);
    }
  }

  /**
   * ngRut filter function.
   *
   * @private
   */
  function ngRutFilterFn() {
    return ngRutFilerReturnFn;
  }

  /**
   * ngRut AngularJS module.
   *
   * Provides RUT service, directive and filter.
   *
   * @example angular.module('MyApp', ['ngRut']);
   */
  ng.module(NG_RUT, [])

  /**
   * ngRut AngularJS service.
   *
   * The service passes the global `window.rut` methods to be used as a service
   * inside an AngularJS controller, service or directive.
   *
   * @module Service
   *
   * @example angular.controller('MyController', ['ngRut', function (ngRut) {
   *   ngRut.calculate('...');
   *   ngRut.validate('...');
   *   ngRut.verifier('...');
   *   ngRut.format('...');
   *   ngRut.digits('...');
   *   ngRut.clean('...');
   * }]);
   */
  .factory(NG_RUT, ngRutFactoryFn)

  /**
   * ngRut AngularJS directive.
   *
   * Provides RUT validation and formatting to an `input` element.
   *
   * **Example:**
   *
   * ```html
   * <input ng-rut ng-model='rut'>
   * ```
   *
   * @module Directive
   */
  .directive(NG_RUT, ['$log', ngRutDirectiveFn])

  /**
   * ngRut AngularJS filter.
   *
   * Provides all methods for interpolation filtering. Default is `format`.
   *
   * **Example:**
   *
   * ```text
   * {{ rut | ngRut }}
   * {{ rut | ngRut : 'calculate' }}
   * {{ rut | ngRut : 'validate' }}
   * {{ rut | ngRut : 'verifier' }}
   * {{ rut | ngRut : 'digits' }}
   * {{ rut | ngRut : 'clean' }}
   * ```
   *
   * @module Filter
   */
  .filter(NG_RUT, ngRutFilterFn);

}(window));

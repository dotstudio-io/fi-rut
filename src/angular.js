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

  /**
   * @module ngRut
   *
   * @description This module is exposed as an AngularJS as 'ng-rut' as a
   * directive, as 'ngRut' as a filter and as 'ngRut' as a service.
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
    /**
     * ngRut directive link function.
     *
     * @private
     */
    function ngRutDirectiveLinkFn($scope, $element, $attrs, $model) {
      var input = $element[0];
      var hasSetSelectionRange = 'setSelectionRange' in input;

      /* Check if $element is an input */
      if (input.tagName !== 'INPUT') {
        $log.error('This directive must be used on <INPUT> elements only and element is <%s>', $element[0].tagName);
        return;
      }

      /* Check if the $element has an associated model */
      if (!$model) {
        $log.warn('A model should be assigned to the input element!');
        return;
      }

      /**
       * ngRut input model parser.
       *
       * @private
       */
      function setModelValidity(value) {
        if (value || input.hasAttribute('required')) {
          $model.$setValidity('rut', validate(value));
        } else {
          /* Make as valid if not required */
          $model.$setValidity('rut', true);
        }
      }

      /**
       * ngRut input model formatter.
       *
       * @private
       */
      function ngRutDirectiveModelFormatter(value) {
        setModelValidity(value);

        return format($model.$modelValue);
      }

      /**
       * ngRut input model parser.
       *
       * @private
       */
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

      /* Model formatter */
      $model.$formatters.push(ngRutDirectiveModelFormatter);

      /* Model parser */
      $model.$parsers.push(ngRutDirectiveModelParser);
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
    case 'calculate':
      return calculate(value);

    case 'verifier':
      return verifier(value);

    case 'validate':
      return validate(value);

    case 'digits':
      return digits(value);

    case 'clean':
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

  /**
   * @private
   */
  var fiRut = ng.module('ngRut', []);

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
  fiRut.factory('ngRut', ngRutFactoryFn);

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
  fiRut.directive('ngRut', ['$log', ngRutDirectiveFn]);

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
  fiRut.filter('ngRut', ngRutFilterFn);

}(window));
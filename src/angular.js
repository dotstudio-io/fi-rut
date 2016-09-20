(function (window) {
  'use strict';

  var ng = window.angular;
  var rut = window.rut;

  var validate = rut.validate;
  var verifier = rut.verifier;
  var digits = rut.digits;
  var format = rut.format;
  var clean = rut.clean;

  var ERR_WRONG_ELEMENT = 'This directive must be used on <INPUT> elements only and element is <%s>';
  var ERR_NO_MODEL = 'A model should be assigned to the input element!';

  var VALIDATE = 'validate';
  var VERIFIER = 'verifier';
  var DIGITS = 'digits';
  var CLEAN = 'clean';
  var NG_RUT = 'ngRut';
  var INPUT = 'INPUT';
  var RUT = 'rut';

  /**
   * ngRut service factory function.
   */
  function ngRutFactoryFn() {
    return rut;
  }

  /**
   * ngRut directive function.
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
       */
      function ngRutDirectiveModelFormatter(value) {
        $model.$setValidity(RUT, validate(value));

        return format($model.$modelValue);
      }

      /**
       * ngRut input model parser.
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
   */
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

  /**
   * ngRut filter function.
   */
  function ngRutFilterFn() {
    return ngRutFilerReturnFn;
  }

  /* Define the Angular module */
  ng.module(NG_RUT, [])

  /* Create the service */
  .factory(NG_RUT, ngRutFactoryFn)

  /* Create the directive */
  .directive(NG_RUT, ['$log', ngRutDirectiveFn])

  /* Create the filter */
  .filter(NG_RUT, ngRutFilterFn);

}(window));

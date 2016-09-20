(function (window) {
  'use strict';

  var ng = window.angular;

  ng.module('App', [
    'ngRut'
  ]).

  controller('MainController', [
    '$scope', 'ngRut',

    function ($scope, ngRut) {
      var iterations = $scope.iterations = 100000;

      $scope.rut = 222222228;

      /** PERFORMANCE TESTING **/
      var start;
      var i;

      /** RUT Clean **/
      for (start = Date.now(), i = 0; i < iterations; i++) {
        ngRut.clean('ae356w5yw5u8klrñlszhbgh34e haerhty62rjjm22');
      }

      $scope.cleanTime = Date.now() - start;

      /** RUT Format **/
      for (start = Date.now(), i = 0; i < iterations; i++) {
        ngRut.format('ae356w5yw5u8klrñlszhbgh34e haerhty62rjjm22');
      }

      $scope.formatTime = Date.now() - start;

      /** RUT Validate **/
      for (start = Date.now(), i = 0; i < iterations; i++) {
        ngRut.validate('ae356w5yw5u8klrñlszhbgh34e haerhty62rjjm22');
      }

      $scope.validateTime = Date.now() - start;
    }
  ]);

}(window));

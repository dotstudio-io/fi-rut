'use strict';

/* Test the filter */
describe('The ngRut filter', function () {
  var $filter;

  beforeEach(module('ngRut'));

  beforeEach(inject(function (_$filter_) {
    $filter = _$filter_;
  }));

  it('Formats a valid RUT by grouping digits and adding a dash', function () {
    expect($filter('ngRut')(222222222)).toBe('22.222.222-2');
  });

  it('Formats a random string by grouping digits and adding a dash', function () {
    expect($filter('ngRut')("7hf23775lwk052dgfdm1")).toBe('723.775.052-1');
  });

  it('Cleans and validates a valid RUT', function () {
    expect($filter('ngRut')(222222222, 'validate')).toBe(true);
  });

  it('Cleans and validates an invalid RUT', function () {
    expect($filter('ngRut')(222222225, 'validate')).toBe(false);
  });
});

/* Test the directive */
describe('The ngRut directive', function () {
  var $scope;
  var $compile;

  beforeEach(module('ngRut'));

  beforeEach(inject(function (_$compile_, $rootScope) {
    $scope = $rootScope;
    $compile = _$compile_;

    var element = angular.element('<form name="form"><input ng-model="rut" name="rut" ng-rut required></form>');

    $compile(element)($scope);
  }));

  it('Validates and formats a valid RUT in the input element', function () {
    $scope.rut = 222222222;

    $scope.$digest();

    expect($scope.form.rut.$viewValue).toBe("22.222.222-2");
    expect($scope.form.$valid).toBe(true);
  });

  it('Validates and formats an invalid RUT in the input element', function () {
    $scope.rut = 222222228;

    $scope.$digest();

    expect($scope.form.rut.$viewValue).toBe("22.222.222-8");
    expect($scope.form.$invalid).toBe(true);
  });
});

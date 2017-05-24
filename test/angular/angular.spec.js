'use strict';

/* Test the filter */
describe('The fi-rut\'s ngRut AngularJs filter', function () {
  var $filter;

  beforeEach(module('ngRut'));

  beforeEach(inject(function ($injector) {
    $filter = $injector.get('$filter');
  }));

  it('Formats a valid RUT by grouping digits and adding a dash', function () {
    expect($filter('ngRut')(222222222)).to.equal('22.222.222-2');
  });

  it('Formats a random string by grouping digits and adding a dash', function () {
    expect($filter('ngRut')('7hf23775lwk052dgfdm1')).to.equal('723.775.052-1');
  });

  it('Cleans a RUT', function () {
    expect($filter('ngRut')(222222222, 'clean')).to.equal('222222222');
  });

  it('Cleans and validates a valid RUT', function () {
    expect($filter('ngRut')(222222222, 'validate')).to.be.true;
  });

  it('Cleans and validates an invalid RUT', function () {
    expect($filter('ngRut')(222222225, 'validate')).to.be.false;
  });

  it('Obtains RUT digits only', function () {
    expect($filter('ngRut')(222222222, 'digits')).to.equal('22222222');
  });

  it('Obtains RUT verifier only', function () {
    expect($filter('ngRut')(222222222, 'verifier')).to.equal('2');
  });

  it('Calculates RUT verifier from digits', function () {
    expect($filter('ngRut')(22222222, 'calculate')).to.equal('2');
  });
});

/* Test the directive */
describe('The fi-rut\'s ngRut AngularJS directive', function () {
  var $scope, $compile;

  beforeEach(module('ngRut'));

  beforeEach(inject(function ($injector) {
    $scope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');

    var element = angular.element('<form name="form"><input ng-model="rut" name="rut" ng-rut required></form>');

    $compile(element)($scope);
  }));

  it('Validates and formats a valid RUT in the input element', function () {
    $scope.rut = 222222222;

    $scope.$digest();

    expect($scope.form.rut.$viewValue).to.equal('22.222.222-2');
    expect($scope.form.$valid).to.be.true;
  });

  it('Validates and formats an invalid RUT in the input element', function () {
    $scope.rut = 222222228;

    $scope.$digest();

    expect($scope.form.rut.$viewValue).to.equal('22.222.222-8');
    expect($scope.form.$invalid).to.be.true;
  });
});

/* Test the service */
describe('The fi-rut\'s ngRut AngularJS service', function () {
  var $rut;

  beforeEach(module('ngRut'));

  beforeEach(inject(function ($injector) {
    $rut = $injector.get('ngRut');
  }));

  it('Exposes functions', function () {
    expect($rut.calculate).to.be.a('function');
    expect($rut.validate).to.be.a('function');
    expect($rut.verifier).to.be.a('function');
    expect($rut.format).to.be.a('function');
    expect($rut.digits).to.be.a('function');
    expect($rut.clean).to.be.a('function');
  });

  it('Formats a valid RUT by grouping digits and adding a dash', function () {
    expect($rut.format('16992239k')).to.equal('16.992.239-k');
    expect($rut.format('18042795-3')).to.equal('18.042.795-3');
    expect($rut.format('21.629.288-k')).to.equal('21.629.288-k');
    expect($rut.format(135145270)).to.equal('13.514.527-0');
  });

  it('Cleans a valid RUT', function () {
    expect($rut.clean('19991362-k')).to.equal('19991362k');
    expect($rut.clean('21.744.998-7')).to.equal('217449987');
  });

  it('Cleans a random string from non-RUT characters', function () {
    expect($rut.clean('7hf23775lwk052dgfdm1')).to.equal('7237750521');
  });

  it('Formats a random string by grouping digits and adding a dash', function () {
    expect($rut.format('7hf23775lwk052dgfdm1')).to.equal('723.775.052-1');
  });

  it('Cleans and validates a valid RUT', function () {
    expect($rut.validate('24965101k')).to.be.true;
    expect($rut.validate('20.063.361-k')).to.be.true;
    expect($rut.validate(123817974)).to.be.true;
  });

  it('Cleans and validates an invalid RUT', function () {
    expect($rut.validate('16417428-0')).to.be.false;
    expect($rut.validate(126946361)).to.be.false;
  });

  it('Returns the digit part of a RUT only', function () {
    expect($rut.digits('7hf23775lwk052dgfdm1')).to.equal('723775052');
    expect($rut.digits('14450447-k')).to.equal('14450447');
    expect($rut.digits('14.602.789-k')).to.equal('14602789');
    expect($rut.digits('150331404')).to.equal('15033140');
    expect($rut.digits(165653548)).to.equal('16565354');
    expect($rut.digits(225426570)).to.equal('22542657');
  });

  it('Returns the verifier of a RUT only', function () {
    expect($rut.verifier('7hf23775lwk052dgfdm1')).to.equal('1');
    expect($rut.verifier('14450447-k')).to.equal('k');
    expect($rut.verifier('14.602.789-k')).to.equal('k');
    expect($rut.verifier('150331404')).to.equal('4');
    expect($rut.verifier(165653548)).to.equal('8');
    expect($rut.verifier(225426570)).to.equal('0');
  });

  it('Calculates the verifier from RUT digits', function () {
    expect($rut.calculate('7hf23775lwk052dgfdm')).to.equal('1');
    expect($rut.calculate('14450447')).to.equal('k');
    expect($rut.calculate('14.602.789-')).to.equal('k');
    expect($rut.calculate('15033140')).to.equal('4');
    expect($rut.calculate('16095761')).to.equal('1');
    expect($rut.calculate(16565354)).to.equal('8');
    expect($rut.calculate(22542657)).to.equal('0');
  });

  it('Formats RUT to lower case', function () {
    expect($rut.format('16.406.235-K')).to.equal('16.406.235-k');
  });

});

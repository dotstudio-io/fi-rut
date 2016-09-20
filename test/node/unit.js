'use strict';

const rut = require('../../lib');

/* Test the filter */
describe('The fiRut module', function () {

  it('Formats a valid RUT by grouping digits and adding a dash', function () {
    expect(rut.format(222222222)).toBe('22.222.222-2');
  });

  it('Formats a random string by grouping digits and adding a dash', function () {
    expect(rut.format('7hf23775lwk052dgfdm1')).toBe('723.775.052-1');
  });

  it('Cleans and validates a valid RUT', function () {
    expect(rut.validate(222222222, 'validate')).toBe(true);
  });

  it('Cleans and validates an invalid RUT', function () {
    expect(rut.validate(222222225, 'validate')).toBe(false);
  });

});

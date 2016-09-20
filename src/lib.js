/**
 * fiRut
 *
 * @description Chilean RUT utils for Node.js, the browser and AngularJS.
 * @module fiRut
 * @author Final Development Studio
 * @license MIT
 */


'use strict';

var GROUP_REGEX = /(\d)(?=(\d{3})+\b)/g;
var CLEAN_REGEX = /[^\dk]+/gi;
var DIGITS_REGEX = /\D+/g;
var GROUP_REPLACE = '$1.';
var EMPTY = '';
var DASH = '-';
var K = 'k';

/**
 * @module rut
 *
 * @description This module is exposed as `window.rut` in browser and
 * AngularJS versions. In Node.js require it as `fi-rut`.
 */

/**
 * Cleans a string out of invalid RUT characters.
 *
 * @param {String} value The value to clean.
 * @param {Boolean} parts If the function should return an array of parts
 * instead of the concatenated string.
 *
 * @returns {Mixed} The clean string or a String Array of parts
 * if requested.
 *
 * @example rut.clean('7hf23775lwk052dgfdm1'); // '7237750521'
 */
function clean(value, parts) {
  /* Ensure value is a string and keep only numbers and 'k' or 'K' */
  value = String(value).replace(CLEAN_REGEX, EMPTY);

  /* Obtain the verifier digit */
  var verifier = value.substr(-1, 1);

  /* Obtain the RUT digits and keep only numbers */
  var digits = value.substr(0, value.length - 1).replace(DIGITS_REGEX, EMPTY);

  /* Return array of parts... */
  if (parts) {
    return [digits, verifier];
  }

  /* ... or return a string */
  return digits + verifier;
}

/**
 * Formats a string as a RUT number.
 *
 * @param {String} value The value to format.
 *
 * @returns {String} The formatted string.
 *
 * @example rut.format('16992239k'); // '16.992.239-k'
 */
function format(value) {
  value = clean(value);

  /* Check if value is too short to format */
  if (value.length < 3) {
    return value;
  }

  var parts = clean(value, true);

  /* Group digits with dots */
  parts[0] = parts[0].replace(GROUP_REGEX, GROUP_REPLACE);

  return parts.join(DASH);
}

/**
 * Validates a string for a valid RUT number.
 *
 * @param {String} value The string to validate.
 *
 * @returns {Boolean} If the string is a valid RUT number.
 *
 * @example rut.validate('24965101k'); // true
 */
function validate(value) {
  /* Check if there's a value to validate */
  if (!value || !String(value).length) {
    return true;
  }

  var parts = clean(value, true);
  var verifier = parts[1];
  var digits = parts[0];
  var m = 0;
  var r = 1;

  /* If the verifier is not a number then it must be 'k' */
  if (isNaN(verifier)) {
    verifier = K;
  }

  /* Do the math :) */
  for (; digits; digits = Math.floor(parseInt(digits) / 10)) {
    r = (r + digits % 10 * (9 - m++ % 6)) % 11;
  }

  /* Check if the RUT is valid against the result... */
  if (r) {
    return verifier === String(r - 1);
  }

  /* ... or against 'K' */
  return verifier === K;
}

/**
 * Get the RUT digits only.
 *
 * @param {Mixed} value The value to obtain the digits from.
 *
 * @returns {String} The digits if any.
 *
 * @example rut.digits('14.602.789-k'); // '14602789'
 */
function digits(value) {
  return clean(value, true)[0];
}

/**
 * Get the RUT verifier only.
 *
 * @param {Mixed} value The value to obtain the verifier from.
 *
 * @returns {String} The verifier if any.
 *
 * @example rut.digits('14.602.789-k'); // 'k'
 */
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

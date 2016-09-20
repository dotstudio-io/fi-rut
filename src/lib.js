'use strict';

var GROUP_REGEX = /(\d)(?=(\d{3})+\b)/g;
var CLEAN_REGEX = /[^\dk]+/gi;
var DIGITS_REGEX = /\D+/g;
var GROUP_REPLACE = '$1.';
var EMPTY = '';
var DASH = '-';
var K = 'k';

/**
 * Clean a string out of invalid RUT characters.
 *
 * @param {String} value The value to clean.
 * @param {Boolean} parts If the function should return an array of parts
 * instead of the concatenated string.
 *
 * @returns {String} The cleaned string.
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

module.exports = {
  validate: validate,
  format: format,
  clean: clean
};

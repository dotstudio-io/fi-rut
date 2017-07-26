# fiRut

Chilean RUT utils for Node.js, the browser and AngularJS.



* * *


# rut

This module is exposed as `window.rut` in browser and
AngularJS versions. In Node.js require it as `fi-rut`.



* * *

### rut.clean(value, parts) 

Cleans a string out of invalid RUT characters.

**Parameters**

**value**: `String`, The value to clean.

**parts**: `Boolean`, If the function should return an array of parts
instead of the concatenated string.

**Returns**: `String | Array`, The clean string or a String Array of parts
if requested.

**Example**:
```js
// Returns '7237750521'
rut.clean('7hf23775lwk052dgfdm1');

// Returns ['723775052', '1']
rut.clean('7hf23775lwk052dgfdm1', true);
```


### rut.format(value) 

Formats a string as a RUT number.

**Parameters**

**value**: `String`, The value to format.

**Returns**: `String`, The formatted string.

**Example**:
```js
// Returns '16.992.239-k'
rut.format('16992239k');
```


### rut.calculate(digits) 

Calculates the RUT verifier.

**Parameters**

**digits**: `String`, The RUT digits to calculate the verifier from.

**Returns**: `String`, The verifier.

**Example**:
```js
// Both return 'k'
rut.calculate(16992239);
rut.calculate('24965101');
```


### rut.validate(value) 

Validates a string for a valid RUT number.

**Parameters**

**value**: `String`, The string to validate.

**Returns**: `Boolean`, If the string is a valid RUT number.

**Example**:
```js
// Returns true
rut.validate('24965101k');
```


### rut.digits(value) 

Get the RUT digits only.

**Parameters**

**value**: `Mixed`, The value to obtain the digits from.

**Returns**: `String`, The digits if any.

**Example**:
```js
// Returns '14602789'
rut.digits('14.602.789-k');
```


### rut.verifier(value) 

Get the RUT verifier only.

**Parameters**

**value**: `Mixed`, The value to obtain the verifier from.

**Returns**: `String`, The verifier if any.

**Example**:
```js
// Returns 'k'
rut.verifier('14.602.789-k');
```



* * *











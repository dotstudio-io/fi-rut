# fiRut

Chilean RUT utils for Node.js, the browser and AngularJS.



* * *


# ngRut

This module is exposed as an AngularJS as 'ng-rut' as a
directive, as 'ngRut' as a filter and as 'ngRut' as a service.



* * *


# Service

ngRut AngularJS service.

The service passes the global `window.rut` methods to be used as a service
inside an AngularJS controller, service or directive.



**Example:**
```js
angular.controller('MyController', ['ngRut', function (ngRut) {
  ngRut.calculate('...');
  ngRut.validate('...');
  ngRut.verifier('...');
  ngRut.format('...');
  ngRut.digits('...');
  ngRut.clean('...');
}]);
```

* * *


# Directive

ngRut AngularJS directive.

Provides RUT validation and formatting to an `input` element.

**Example:**

```html
<input ng-rut ng-model='rut'>
```



* * *


# Filter

ngRut AngularJS filter.

Provides all methods for interpolation filtering. Default is `format`.

**Example:**

```text
{{ rut | ngRut }}
{{ rut | ngRut : 'calculate' }}
{{ rut | ngRut : 'validate' }}
{{ rut | ngRut : 'verifier' }}
{{ rut | ngRut : 'digits' }}
{{ rut | ngRut : 'clean' }}
```



* * *


* * *











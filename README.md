# fi-rut [![Build Status](https://travis-ci.org/FinalDevStudio/fi-rut.svg?branch=master)](https://travis-ci.org/FinalDevStudio/fi-rut)

Chilean RUT utils for Node.js, the browser and AngularJS.

## Browser and AngularJS

### Installation

```sh
bower install --save fi-rut
```

### Usage

Include the distributable versions into your scripts bundle or load them as scripts in your HTML.

**IMPORTANT:** The AndularJS version (`fi-rut-ng`) includes both the browser and AngularJS modules.

#### Development / Debugging

For production use the non-minified versions of either one.

Browser:

```html
<script src="/bower_components/fi-rut/dist/fi-rut.js"></script>
```

AngularJS:

```html
<script src="/bower_components/fi-rut/dist/fi-rut-ng.js"></script>
```

#### Production

For production use the minified versions of either one.

Browser:

```html
<script src="/bower_components/fi-rut/dist/fi-rut.min.js"></script>
```

AngularJS:

```html
<script src="/bower_components/fi-rut/dist/fi-rut-ng.min.js"></script>
```
#### AngularJS Usage

Include the `ngRut` dependency into your app:

```javascript
angular.module('MyApp', [
  // ...
  'ngRut'
  // ...
]);
```

##### Directive

The `ng-rut` directive must be used only in an `<input>` element and will add real-time format and validation to the associated `ngModel`:

```html
<input ng-model="data.rut" ng-rut>
```

##### Service

Use the `ngRut` service to access the module's methods programatically:

```javascript
function MyController($scope, ngRut) {
  var calculated = ngRut.calculate($scope.data.rut);
  var verififer = ngRut.verifier($scope.data.rut);
  var isValid = ngRut.validate($scope.data.rut);  
  var formatted = ngRut.format($scope.data.rut);
  var digits = ngRut.digits($scope.data.rut);
  var clean = ngRut.clean($scope.data.rut);
}

angular.controller('MyController', ['$scope', 'ngRut', MyController]);
```

##### Filter

Use the `ngRut` filter to interpolate template strings:

```html
<p>{{ data.rut | ngRut }}</p>
<p>{{ data.rut | ngRut : 'calculate' }}</p>
<p>{{ data.rut | ngRut : 'validate' }}</p>
<p>{{ data.rut | ngRut : 'verifier' }}</p>
<p>{{ data.rut | ngRut : 'digits' }}</p>
<p>{{ data.rut | ngRut : 'clean' }}</p>
```

#### Important

With both versions the module will be assigned as `rut` into the `window` so you can access its methods directly via `window.rut`.

#### Important for AngularJS

The module, filter, directive and service are called `ngRut` (not `fi-rut`) to maintain compatibility with the deprecated [ngRut](https://github.com/FinalDevStudio/ng-rut) module.

### Documentation

Read the [library docs](docs/lib.md) for the methods specification.

Read the [AngularJS docs](docs/angular.md) for usage and specification on the modules.

## For Node.js

### Installation

```sh
npm install --save fi-rut
```

### Usage

Just require `fi-rut`.

```javascript
const rut = require('fi-rut');
```

### Documentation

Read the [library docs](docs/lib.md) for the methods specification.

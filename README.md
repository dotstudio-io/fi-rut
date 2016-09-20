# fi-rut [![Build Status](https://travis-ci.org/FinalDevStudio/fi-rut.svg?branch=master)](https://travis-ci.org/FinalDevStudio/fi-rut)

Chilean RUT utils for Node.js, the browser and AngularJS.

## For the browser and AngularJS

### Installation

```sh
bower install --save fi-rut
```

### Usage

For browser development, include `dist/fi-rut.js` in your bundle or assets. For AngularJs development include `fi-rut-ng.js` as it bundles both the browser and AngularJS modules.

For production use the minified version of either one (`fi-rut.min.js` or `fi-rut-ng.min.js`).

#### Important

With both versions the module will be assigned as `rut` into the `window` so you can access its methods directly via `window.rut`.

#### Important for AngularJS

The module, filter, directive and service are called `ngRut` not `fi-rut` to maintain compatibility with the deprecated [ngRut](https://github.com/FinalDevStudio/ng-rut) module.

### Documentation
Read the [library docs](docs/lib.md) for the methods specification.

Read the [AngularJS docs](docs/angular.md) for usage and specification on the modules.

## For Node.js

### Installation

```sh
bower install --save fi-rut
```

### Usage

Just require `fi-is`.

```javascript
const rut = require('fi-is');
```

### Documentation

Read the [library docs](docs/lib.md) for the methods specification.

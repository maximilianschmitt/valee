# valee

[![Travis Build](http://img.shields.io/travis/maximilianschmitt/valee.svg?style=flat)](https://travis-ci.org/maximilianschmitt/valee) [![Coverage Status](https://coveralls.io/repos/maximilianschmitt/valee/badge.svg)](https://coveralls.io/r/maximilianschmitt/valee)

> A validator for (nested) objects with a simple API. For sanitizing objects, check out [sanee](https://github.com/maximilianschmitt/sanee).

## Usage

### Installation

```
$ npm install valee
```

### Example

``` js
var valee = require('valee');

// define schema
var validate = valee({
	acceptAgreement: valee.isIn(['0', '1']),
	request: {
		ip: valee.isIP()
	},
	user: {
		firstName: valee.isLength(1).isUppercase(),
		email: valee.isEmail()
	}
});

// validate data
var errors = validate({
	acceptAgreement: '1',
	request: {
		ip: '192.168.0.1'
	},
	user: {
		firstName: 's',
		email: 'valid@email.com'
	}
});

// print errors
console.log(errors);
```

Output:

```
{
	user: {
		firstName: true
	}
}
```

## Validators

All validators of valee currently map to the [validators of validator.js](https://github.com/chriso/validator.js#validators).

## Todo:

* [x] Validation chaining
* [x] Nested objects
* [x] Sanitizers ([sanee](https://github.com/maximilianschmitt/sanee))
* [ ] Custom validators
* [ ] Automatic error messages
* [ ] Custom error messages
* [ ] required/notRequired
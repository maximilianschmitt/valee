'use strict';

var validatorProxy = require('./validator-proxy');
var validateData = require('./validate-data');

// this is basically only the api
var valee = function(arg) {
	if (typeof arg === 'string') {
		return validatorProxy.apply(null, arguments);
	}

	if (typeof arg === 'object') {
		var schema = arg;
		return validateData.bind(null, schema);
	}

	throw new TypeError('Invalid Argument');
};

validatorProxy.validators.forEach(function(method) {
	valee[method] = validatorProxy[method].bind(validatorProxy);
});

module.exports = valee;
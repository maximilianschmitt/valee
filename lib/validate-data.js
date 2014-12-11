'use strict';

var validatorProxy = require('./validator-proxy');

var validateData = function(schema, data) {
	var errors = {};

	Object.keys(schema).forEach(function(attribute) {
		var child = schema[attribute];

		if (child instanceof validatorProxy) {
			var proxy = child;

			if (!proxy.isValid(data[attribute])) {
				errors[attribute] = true;
			}
			return;
		}

		if (typeof child === 'object') {
			var subSchema = child;
			var subErrors = validateData(subSchema, data[attribute]);

			if (Object.keys(subErrors).length > 0) {
				errors[attribute] = subErrors;
			}
		}
	});

	return errors;
};

module.exports = validateData;
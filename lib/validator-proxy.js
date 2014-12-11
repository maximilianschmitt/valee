'use strict';

var validator = require('validator');
var validators = ['equals', 'contains', 'matches', 'isEmail', 'isURL', 'isFQDN', 'isIP', 'isAlpha', 'isNumeric', 'isAlphanumeric', 'isBase64', 'isHexadecimal', 'isHexColor', 'isLowercase', 'isUppercase', 'isInt', 'isFloat', 'isDivisibleBy', 'isNull', 'isLength', 'isByteLength', 'isUUID', 'isDate', 'isAfter', 'isBefore', 'isIn', 'isCreditCard', 'isISBN', 'isJSON', 'isMultibyte', 'isAscii', 'isFullWidth', 'isHalfWidth', 'isVariableWidth', 'isSurrogatePair', 'isMongoI'];

var validatorProxy = function() {
	if (!(this instanceof validatorProxy)) {
		return new validatorProxy();
	}

	this.validations = [];
};

validatorProxy.validators = validators;

validatorProxy.prototype.isValid = function(value) {
	return this.validations.reduce(function(valid, validation) {
		var currentValid = validator[validation.validatorName].apply(validator, [value].concat(validation.arguments));
		return valid && currentValid;
	}, true);
};

validators.forEach(function(validatorName) {
	validatorProxy.prototype[validatorName] = function() {
		this.validations.push({ validatorName: validatorName, arguments: Array.prototype.slice.call(arguments, 0) });
		return this;
	};
});

validators.forEach(function(validatorName) {
	validatorProxy[validatorName] = function() {
		var vp = validatorProxy();
		return vp[validatorName].apply(vp, arguments);
	};
});

module.exports = validatorProxy;
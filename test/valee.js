/* global describe, it */
'use strict';

var expect = require('chai').expect;
var valee = require('../lib/valee');

describe('valee', function() {
	it('returns error object with true for each invalid property', function() {
		var validate = valee({
			email: valee.isEmail(),
			name: valee.isLength(3)
		});

		var errors = validate({ email: 'not-an-email', name: 's' });
		expect(errors).to.deep.equal({ email: true, name: true });
	});

	it('returns error object without valid properties', function() {
		var validate = valee({
			email: valee.isEmail(),
			name: valee.isLength(3)
		});

		var errors = validate({ email: 'valid@email.com', name: 's' });
		expect(errors).to.deep.equal({ name: true });
	});

	it('allows chaining', function() {
		var validate = valee({
			email: valee.isEmail().isLowercase()
		});

		expect(validate({ email: 'valid@email.com' })).to.deep.equal({});
		expect(validate({ email: 'valid@Email.com' })).to.deep.equal({ email: true });
	});

	it('validates nested objects', function() {
		var validate = valee({
			acceptAgreement: valee.isIn(['1', '0']),
			request: {
				ip: valee.isIP()
			},
			user: {
				firstName: valee.isLength(1).isUppercase(),
				email: valee.isEmail()
			}
		});

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

		expect(errors).to.deep.equal({
			user: {
				firstName: true
			}
		});
	});
});
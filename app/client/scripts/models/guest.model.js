var cmi = require('../cmi');

module.exports = cmi.class.model.extend(function () {

	this.model = new cmi.modules.model('invitee')
		.base(cmi.config.api.base)
		.property('name', {
			type: 'string'
		})
		.property('email', {
			type: 'string',
			default: '',
			optional: true
		})
		.property('attending', {
			type: 'boolean',
			default: false
		});

	this.addListeners();

});
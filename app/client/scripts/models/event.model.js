var cmi = require('../cmi');

module.exports = cmi.class.model.extend(function () {

	this.model = new cmi.modules.model('event')
		.base(cmi.config.api.base)
		.property('hash', {
			type: 'string'
		})
		.property('name', {
			type: 'string'
		})
		.property('when', {
			type: 'string',
			default: ''
		})
		.property('where', {
			type: 'string',
			default: ''
		})
		.property('createdAt', {
			type: 'date'
		});

	this.addListeners();

});
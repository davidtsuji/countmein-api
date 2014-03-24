var cmi = require('../cmi');

module.exports = cmi.class.model.extend(function () {

	this.model = new cmi.modules.model('event')
		.base(cmi.config.api.base)
		.property('name', {
			type: 'string'
		})
		.property('date', {
			type: 'string',
			default: ''
		})
		.property('time', {
			type: 'string',
			default: ''
		})
		.property('where', {
			type: 'string',
			default: ''
		})
		.property('organiserName', {
			type: 'string',
			default: ''
		})
		.property('guests', {
			type: 'array',
			default: []
		})
		.property('createdAt', {
			type: 'date'
		});

	this.addListeners();

});
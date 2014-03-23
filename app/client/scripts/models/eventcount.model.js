var cmi = require('../cmi');

module.exports = cmi.class.model.extend(function () {

	this.model = new cmi.modules.model('eventcount')
		.base(cmi.config.api.base)
		.property('total', {
			type: 'number'
		});

	this.addListeners();

});
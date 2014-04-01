var cmi = require('../cmi');

module.exports = cmi.class.model.extend(function () {

	this.model = new cmi.modules.model('guest', {
		baseUrl: cmi.config.api.base
	});

	this.addListeners();

});
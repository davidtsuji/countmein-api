var app = require('../app');

module.exports = app.class.moldy.extend({

	init: function () {
		this.name = 'me';
		this._super();
	}

});
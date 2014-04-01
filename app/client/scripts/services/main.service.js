var cmi = require('../cmi');

'use strict'

module.exports = cmi.class.service.extend(function () {}).methods({

	init: function () {
		var self = this;

		self.data.eventcount = new cmi.model.eventcount().model;
		self.data.event = new cmi.model.event().model;

		async.waterfall([

			function (_callback) {
				self.data.event.$get(function (_error) {
					_callback(_error);
				});
			},

			function (_callback) {
				self.data.eventcount.$get(function (_error) {
					_callback(_error);
				});
			}

		], function (_error) {
			self.initialised = true;
		});

	},

	eventCreate: function () {
		var self = this;

		self.data.event.createdAt = new Date();

		// if (!self.data.event.$isValid()) {
		// 	return alert('invalid data. (TODO: make validation pretty)');
		// }

		self.data.event.$save(function (_error, _res) {
			location.href = '/event/' + self.data.event.id;
		});

	},

	data: {}

});
var app = require('../app');

module.exports = app.class.service.extend({

	serviceInit: function () {
		var self = this;

		async.waterfall([

			self.initModels.bind(self, ['event', 'eventcount']),

			function (_callback) {
				self.data.eventcount.$get(function (_error) {
					_callback(_error);
				});
			}

		], function (_error) {
			if (_error) console.error(_error);
			self.initialised = true;
		});

	},

	eventCreate: function () {
		var self = this;

		self.data.event.createdAt = moment().format();

		// if (!self.data.event.$isValid()) {
		// 	return alert('invalid data. (TODO: make validation pretty)');
		// }

		self.data.event.$save(function (_error) {
			if (_error) return;
			location.href = '/event/' + self.data.event.id;
		});

	},

	data: {}

});
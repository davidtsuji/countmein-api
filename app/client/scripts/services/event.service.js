var cmi = require('../cmi');

module.exports = cmi.class.service.extend(function () {}).methods({

	init: function () {
		var self = this;

		/**
		 * Forcing everyone to be the organiser until the logic has been completed
		 */
		self.organiser = true;

		self.data.event = new cmi.model.event().model;
		self.data.eventcount = new cmi.model.eventcount().model;

		async.waterfall([

			function (_callback) {
				self.data.event.$get({
					id: cmi.scope.$routeParams.id
				}, function (_error) {
					_callback(_error);
				});
			},

			function (_callback) {
				self.data.eventcount.$get(function (_error) {
					_callback(_error);
				});
			}

		], function (_error) {
			if (_error) throw _error;
			self.initialised = true;
		});

	},

	guestAdd: function () {},

	data: {
		new: {}
	}

});
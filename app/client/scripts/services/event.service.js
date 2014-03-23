var cmi = require('../cmi');

module.exports = cmi.class.service.extend(function () {}).methods({

	init: function () {
		var self = this;

		self.data.event = new cmi.model.event().model;

		async.waterfall([

			function (_callback) {
				self.data.event.get({
					hash: cmi.scope.$routeParams.hash
				}, function (_error) {
					_callback(_error);
				});
			}

		], function (_error) {
			self.initialised = true;
		});

	},

	data: {}

});
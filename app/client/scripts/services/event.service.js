var app = require('../app'),
	Moldy = app.modules.moldy;

module.exports = app.class.service.extend({

	serviceInit: function () {
		var self = this;

		/**
		 * Forcing everyone to be the organiser until the logic has been completed
		 */
		self.organiser = true;

		async.waterfall([

			self.initModels.bind(self, ['event', 'eventcount']),

			function (_callback) {
				self.data.event.$get({
					id: app.scope.$routeParams.id
				}, _callback);
			}

		], function (_error) {
			if (_error) {
				console.error(_error);
			}
			self.initialised = true;
		});

	},

	guestAttendToggle: function (_guest) {
		var self = this;

		_guest.attending = _guest.attending ? false : true;
		self.data.event.$save();
	},

	guestAdd: function () {
		var self = this,
			guest = new Moldy('guest', self.data.event.__schema.properties.guests[0]);

		guest.name = self.data.new.guestName;
		self.data.event.guests.push(guest.$json());

		self.data.event.$save(function (_error) {
			if (_error) return;
			self.data.new.guestName = '';
		});
	},

	renegeInvite: function (_guest) {
		var self = this;

		self.data.event.guests.splice(_.indexOf(self.data.event.guests, _guest), 1);
		self.data.event.$save();
	},

	saveChanges: function () {
		var self = this;

		self._super.apply(self, arguments);

		self.data.event.$save(function () {
			$('.modal:visible').modal('hide');
		});
	},

	data: {
		new: {
			guestName: ''
		}
	}

});
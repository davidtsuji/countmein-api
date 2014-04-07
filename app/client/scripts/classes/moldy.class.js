var app = require('../app');

module.exports = app.class.base.extend({

	init: function () {
		var self = this;

		self.model = new app.modules.moldy(self.name, {
			baseUrl: app.config.api.base
		});

		app.modules.superagent
			.get(self.model.$url() + '/schema')
			.type('json')
			.end(function (_error, _res) {
				var error = _error;
				if (!error && !app.modules.hasKey(_res, 'body', 'object')) {
					error = new Error('The server returned an empty body while loading the `' + self.name + '` schema');
				}
				if (!error) {
					Object.defineProperty(self.model, '__schema', {
						value: _res.body
					});
				}
				self.model.emit('__schema', error);
			});

		self.addListeners();
	},

	addListeners: function () {
		var self = this,
			cb = function (_method) {
				return function () {
					self[_method].apply(self, arguments);
				};
			};

		self.model.on('preget', cb('preget'));
		self.model.on('get', cb('get'));
		self.model.on('presave', cb('presave'));
		self.model.on('save', cb('save'));
		self.model.on('predestroy', cb('predestroy'));
		self.model.on('destroy', cb('destroy'));
	},

	predestroy: function () {},
	preget: function () {},
	presave: function () {},

	collection: function () {
		setTimeout(function () {
			app.helpers.scope.apply();
		}, 10);
	},

	destroy: function () {
		setTimeout(function () {
			app.helpers.scope.apply();
		}, 10);
	},

	get: function () {
		setTimeout(function () {
			app.helpers.scope.apply();
		}, 10);
	},

	save: function () {
		setTimeout(function () {
			app.helpers.scope.apply();
		}, 10);
	}

});
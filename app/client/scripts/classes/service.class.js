var app = require('../app'),
	merge = app.modules.merge;

module.exports = app.class.base.extend({

	initModels: function (_models, _callback) {
		var self = this,
			q = async.queue(function (_modelName, _qCallback) {
				var model = self.data[_modelName] = new app.model[_modelName]().model;
				model.once('__schema', function (_error) {
					if (_error) {
						return _qCallback(_error);
					}
					Object.keys(model.__schema.properties).forEach(function (_key) {
						model.$property(_key, model.__schema[_key]);
					});
					_qCallback();
				});
			}, 3);
		q.drain = _callback;
		q.push(_models);
	},

	openForEditing: function (_name, _model) {
		var self = this,
			model;

		if (!self['data']) self.data = {};
		if (!self.data['editing']) self.data.editing = {};

		model = self.data.editing[_name] = merge(_model);
		model.__original = _model;

		$('#' + _name + '-modal').modal('show');
	},

	saveChanges: function (_name) {
		var self = this;

		_.extend(self.data.editing[_name].__original, self.data.editing[_name]);
		delete self.data.editing[_name].__original.__original;
	},

});
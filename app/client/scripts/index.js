var app = require('./app'),
	guid = app.modules.guid,
	Moldy = app.modules.moldy;

exports = module.exports = app;
angular.module('cmi', ['ngRoute']).config(app.routes);

exports.controller = function ($scope, $route, $routeParams, $location) {
	var scope = app.scope = exports.scope = $scope;

	scope.$location = $location;
	scope.$route = $route;
	scope.$routeParams = $routeParams;

	/* Dependencies */
	scope.$ = jQuery;
	scope._ = _;
	scope.numeral = numeral;
	scope.md5 = app.modules.md5;

	/* Identity */
	if (!store.get('identity')) store.set('identity', guid.generate());
	Moldy.defaults.headers['CMI-UID'] = store.get('identity');

	/* Instantiate each service */
	Object.keys(app.service).forEach(function (_key) {
		scope[_key + 'Service'] = new app.service[_key]();
	});

};
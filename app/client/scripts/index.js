var app = require('./app');

exports = module.exports = app;
angular.module('cmi', ['ngRoute']).config(app.routes);

exports.controller = function ($scope, $route, $routeParams, $location) {
	var scope = app.scope = exports.scope = $scope;

	scope.$location = $location;
	scope.$route = $route;
	scope.$routeParams = $routeParams;

	/* Dependencies */
	scope.$ = jQuery;
	scope.numeral = numeral;
	scope.md5 = app.modules.md5;

	Object.keys(app.service).forEach(function (_key) {
		scope[_key + 'Service'] = new app.service[_key]();
	});

};
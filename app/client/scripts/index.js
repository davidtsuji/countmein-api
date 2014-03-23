var cmi = require('./cmi');

exports = module.exports = cmi;
angular.module('cmi', ['ngRoute']).config(cmi.routes);

exports.controller = function ($scope, $route, $routeParams, $location) {
	var scope = cmi.scope = exports.scope = $scope;

	scope.$route = $route;
	scope.$routeParams = $routeParams;

	Object.keys(cmi.service).forEach(function (_key) {
		scope[_key + 'Service'] = new cmi.service[_key]();
	});

};
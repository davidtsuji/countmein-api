var cmi = require('./cmi');

exports = module.exports = cmi;
angular.module('cmi', ['ngRoute']).config(cmi.routes);

exports.controller = function ($scope, $route, $routeParams, $location) {
	var scope = cmi.scope = exports.scope = $scope;

	scope.$route = $route;
	scope.$routeParams = $routeParams;

	/* Dependencies */
	scope.numeral = numeral;
	scope.md5 = cmi.modules.md5;

	Object.keys(cmi.service).forEach(function (_key) {
		scope[_key + 'Service'] = new cmi.service[_key]();
	});

};
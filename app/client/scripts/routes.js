var app = require('./app');

var controller = function (_service) {
	return function () {
		var module = app.module = app.scope.module = app.scope[_service];

		module.service = _service;
		module.initialised = false;
		module.scope = app.scope;
		module.serviceInit();

	};
};

module.exports = function ($routeProvider, $locationProvider) {

	$routeProvider

	.when('/event/:id', {
		templateUrl: '/partials/event.html',
		controller: controller('eventService')
	})

	.otherwise({
		templateUrl: 'partials/main.html',
		controller: controller('mainService')
	});

	$locationProvider.html5Mode(true);

};
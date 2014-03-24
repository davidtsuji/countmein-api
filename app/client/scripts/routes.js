var cmi = require('./cmi');

var controller = function (_service) {
	return function () {
		var module = cmi.module = cmi.scope.module = cmi.scope[_service];

		module.name = _service;
		module.initialised = false;
		module.scope = cmi.scope;
		module.init();

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
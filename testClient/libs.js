describe('Libs', function () {

	var libs = [{
		name: 'angular'
	}, {
		name: 'angular routes',
		eval: 'angular.module("ngRoute")'
	}, {
		name: 'jQuery'
	}, {
		name: 'async'
	}, {
		name: 'moment'
	}, {
		name: 'numeral'
	}, {
		name: 'underscore',
		eval: '_'
	}];

	libs.forEach(function (_lib) {

		it(_lib.name + ' should exist', function () {
			eval(_lib['eval'] || _lib.name);
		});

	});

});
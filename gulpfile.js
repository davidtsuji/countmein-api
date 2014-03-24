var gulp = require('gulp'),
	compress = require('gulp-uglify'),
	less = require('gulp-less'),
	concat = require('gulp-concat'),
	browserify = require('gulp-browserify'),
	livereload = require('gulp-livereload'),
	clean = require('gulp-clean'),
	cluster = require('cluster'),
	rename = require('gulp-rename'),
	shell = require('gulp-shell'),
	path = require('path');

var liveReloadServer = livereload(),
	worker;

gulp.task('styles', function () {
	gulp.src('./app/client/styles/index.less')
		.pipe(less({
			paths: [path.join(__dirname, 'less', 'includes')]
		}))
		.pipe(rename('app.css'))
		.pipe(gulp.dest('./public/styles'))
		.pipe(livereload());
});

gulp.task('scriptsApp', function () {
	gulp.src(['./app/client/scripts/index.js'])
		.pipe(browserify({
			standalone: 'cmi',
			debug: true
		}))
		.pipe(rename('app.js'))
		.pipe(gulp.dest('./public/scripts'))
		.pipe(livereload());
});

gulp.task('scriptsLib', function () {
	gulp.src([
		'./bower_components/jquery/dist/jquery.js',
		'./bower_components/angular/angular.js',
		'./bower_components/angular-route/angular-route.js',
		'./bower_components/async/lib/async.js',
		'./bower_components/moment/moment.js',
		'./bower_components/numeral/numeral.js',
		'./bower_components/underscore/underscore.js'
	])
		.pipe(concat('libs.js'))
		.pipe(gulp.dest('./public/scripts'))
		.pipe(livereload());
});

gulp.task('markup', function () {
	gulp.src(['./app/client/markup/**/*.*'])
		.pipe(gulp.dest('./public/'))
		.pipe(livereload());

});

gulp.task('minifyAppScripts', function () {
	gulp.src(['./public/scripts/app.js'])
		.pipe(compress())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('./public/scripts'));
});

gulp.task('minifyLibsScripts', function () {
	gulp.src('./public/scripts/libs.js')
		.pipe(compress())
		.pipe(rename('libs.min.js'))
		.pipe(gulp.dest('./public/scripts'));
});

gulp.task('test', function () {
	gulp.src('')
		.pipe(shell([
			'npm test'
		]));
});

gulp.task('server', function () {
	cluster.setupMaster({
		exec: "./server.js"
	});

	if (worker) {
		worker.kill();
	}
	worker = cluster.fork();
});

gulp.task('clean', function () {
	gulp.src('')
		.pipe(shell([
			'make clean'
		]));
});

gulp.task('watch', function () {
	gulp.watch(['./app/client/styles/**/*.less'], ['styles']);
	gulp.watch(['./app/client/scripts/**/*'], ['scripts']);
	gulp.watch(['./app/client/markup/**/*.html'], ['markup']);
	gulp.watch(['./test/**/*'], ['build']);
	gulp.watch(['./server.js'], ['server']);
	gulp.watch(['./gulpfile.js'], ['default']);
});

gulp.task('default', ['build', 'minify', 'test']);
gulp.task('scripts', ['scriptsApp', 'scriptsLib']);
gulp.task('build', ['styles', 'scripts', 'markup']);
gulp.task('run', ['build', 'server', 'watch']);
gulp.task('minify', ['minifyAppScripts', 'minifyLibsScripts']);
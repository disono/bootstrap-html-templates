/* File: gulpfile.js */

// grab our gulp packages
var gulp = require('gulp'),
	g_util = require('gulp-util'),
	imagemin = require('gulp-imagemin'),
	concat = require('gulp-concat'),
	stripDebug = require('gulp-strip-debug'),
	uglify = require('gulp-uglify'),
	autoprefix = require('gulp-autoprefixer'),
	minifyCSS = require('gulp-minify-css'),
	jshint = require('gulp-jshint');

// paths
var path = {
	lib: "assets/lib/",
	source: "assets/source/",
	public: "assets/public/"
};

// js
var js = [
	path.lib + 'jquery/dist/jquery.min.js',
	path.lib + 'angular/angular.min.js',
	path.lib + 'react/react.min.js',
	path.lib + 'moment/min/moment.min.js',
	path.lib + 'bootstrap/dist/js/bootstrap.min.js',

	path.source + 'js/config.js',
	path.source + 'js/util.js',
	path.source + 'js/main.js'
];

// css
var css = [
	path.lib + 'bootstrap/dist/css/bootstrap.min.css',
	path.lib + 'Ionicons/css/ionicons.min.css',

	path.source + 'css/main.css'
];

// fonts
var fonts = [
	path.lib + 'font-awesome/fonts/fontawesome-webfont.*',
	path.lib + 'Ionicons/fonts/ionicons.*'
];

// default task
gulp.task('default', function () {
	console.log('Running default gulp task...');
});

// css concat, auto-prefix and minify
gulp.task('css', function () {
	gulp.src(css)
		.pipe(concat('vendor.css'))
		.pipe(autoprefix(''))
		.pipe(minifyCSS())
		.pipe(gulp.dest(path.public + 'css/'));
});

// js concat
gulp.task('js', function () {
	gulp.src(js)
		.pipe(concat('vendor.js'))
		.pipe(stripDebug())
		.pipe(uglify())
		.pipe(gulp.dest(path.public + 'js/'));
});

// js hint task
gulp.task('jshint', function () {
	gulp.src(path.source + 'js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// minify images
gulp.task('imagemin', function () {
	gulp.src(path.source + 'img/**/*')
		.pipe(changed(path.public + 'img'))
		.pipe(imagemin())
		.pipe(gulp.dest(path.public + 'img'));
});

// fonts
gulp.task('fonts', function () {
	return gulp.src(fonts)
		.pipe(gulp.dest(path.public + 'fonts/'));
});

gulp.task('build-js', function () {

});
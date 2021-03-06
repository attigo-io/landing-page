// Initialize modules
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');

// Sass Task
function scssTask() {
	return src('app/scss/style.scss', { sourcemaps: true })
		.pipe(sass())
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(dest('dist', { sourcemaps: '.' }));
}

// html minify
function htmlMin(){
	return src('*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'));
}


// JavaScript Task
function jsTask() {
	return src('app/js/*.js', { sourcemaps: true })
		.pipe(terser())
		.pipe(dest('dist', { sourcemaps: '.' }));
}


// Browsersync
function browserSyncServe(cb) {
	browsersync.init({
		server: {
			baseDir: './dist',
		},
		notify: {
			styles: {
				top: 'auto',
				bottom: '0',
			},
		},
	});
	cb();
}
function browserSyncReload(cb) {
	browsersync.reload();
	cb();
}

// Watch Task
function watchTask() {
	watch('*.html',series(htmlMin, browserSyncReload));
	watch(
		['app/scss/**/*.scss', 'app/**/*.js'],
		series(scssTask, jsTask, htmlMin, browserSyncReload)
	);
}

// Default Gulp Task
exports.default = series(scssTask, htmlMin, jsTask, browserSyncServe, watchTask);
exports.build = series(scssTask, htmlMin, jsTask);
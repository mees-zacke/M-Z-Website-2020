const	{ gulp, src, dest, series, task, watch, parallel } = require('gulp');
var
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		uglify = require('gulp-uglify'),
		pipeline = require('readable-stream').pipeline,
		cssnano = require('gulp-cssnano'),
		imagemin = require('gulp-imagemin'),
		cache = require('gulp-cache'),
		del = require('del');


function makeSass() {
	return src(['dev/styles/scss/**/style.scss', 'dev/styles/scss/**/tinymce.scss','dev/styles/scss/**/mz_be.scss','dev/styles/scss/**/print.scss'])
			.pipe(sass()).on('error', sass.logError)
			.pipe(dest('dev/styles/css'));
}

// Minify CSS
function compressCSS()  {
	return src('dev/styles/css/*.css')
			.pipe(cssnano())
			.pipe(dest('dev/styles/css'))
}

function makeCSS() {
	return src('dev/styles/css/*.css') // finde alle css Dateien in allen Unterordnern in styles/css
			.pipe(autoprefixer({
				grid: true,
				overrideBrowserslist: ['last 2 version'],
				cascade: false
			}))
			.pipe(dest('dist/files/layout/styles/css'));
}

function javaScript() {
	return src('dev/js/*.js')
			.pipe(uglify())
			.pipe(dest('dist/files/layout/js'))
}

function phpScript() {
	return src('dev/php/*.php')
			.pipe(dest('dist/files/layout/php'))
}

// Transports
function templates() {
	return src('dev/templates/**/*.+(html|html5|tl)')
			.pipe(dest('dist/templates'))
}
/*function fontawesome() {
	return src('dev/fontawesome')
		.pipe(dest('dist/files/layout/'));

}*/

function ymlTransport() {
	return src('dev/config/*.yml')
			.pipe(dest('dist/config/'))
}

function appResTransport() {
	return src('dev/contao/**/*.php')
			.pipe(dest('dist/contao'))
}

function fontsTransport() {
	return src('dev/fonts/**')
			.pipe(dest('dist/files/layout/fonts/'))
}

function htaccess() {
	return src('dev/web/.htaccess')
			.pipe(dest('dist/web/'))
}

// PWA
function pwaFiles() {
	return src('dev/pwa/files/**')
			.pipe(dest('dist/files/layout/pwa/'))
}

function pwaWeb() {
	return src('dev/pwa/web/**')
			.pipe(dest('dist/web/'))
}

// Images
function images() {
	return src('dev/images/**/*.+(png|jpg|gif|svg)')
			.pipe(cache(imagemin(
					[
						imagemin.gifsicle({
							interlaced: true
						}),
						imagemin.mozjpeg({
							progressive: true
						}),
						imagemin.optipng({
							optimizationLevel: 5
						}),
						imagemin.svgo({
							plugins: [{removeViewBox: true}]
						})
					], {
						// Setting interlaced to true
						interlaced: true
					}
			)))
			.pipe(dest('dist/files/layout/images/'))
}

//// WATCH
function watcher() {
	watch('dev/styles/scss/**/*.scss',style);
	watch('dev/fonts/**', fontsTransport);
	watch('dev/templates/**/*.+(html|html5|tl)', templates);
	watch('dev/js/**/*.js', javaScript);
	watch('dev/php/**/*.php', phpScript);
	watch('dev/config/*.yml', ymlTransport);
	watch([
				'dev/contao/dca/**/*.php',
				'dev/contao/languages/**/*.php',
				'dev/contao/config/**/*.php'
			],
			appResTransport);
	watch('dev/web/.htaccess', htaccess);
	watch('dev/pwa/**', pwa);
	watch('dev/images/*.+(png|jpg|gif|svg)', images);
}


// Delete folder: dist
function clear() {
	return del('dist')
}


// Complex Tasks
const style = series(makeSass, compressCSS, makeCSS);
const copy = series(templates/*,fontawesome*/, ymlTransport, appResTransport, fontsTransport);
const pwa = series(pwaFiles, pwaWeb);
const build = series(clear, parallel(style, javaScript, copy, images));


// Exports
exports.watcher = watcher;
exports.javaScript = javaScript;
exports.images = images;
exports.clear = clear;
exports.style = style;
exports.copy = copy;
exports.pwa = pwa;
exports.build = build;
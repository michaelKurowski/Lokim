const gulp = require('gulp')
const sass = require('gulp-sass')
const babel = require('gulp-babel')
const browserify = require('gulp-browserify')
const uglify = require('gulp-uglify')
const pug = require('gulp-pug')

const conf = {
	clientDevDir: './publicDev/',
	clientProdDir: './public/'
};




gulp.task('pug', () => {
    return gulp.src(conf.clientDevDir + '**/*.pug')
	.pipe(pug())
    .pipe(gulp.dest(conf.clientProdDir))
        .on('error', function (err) {console.log(err);this.emit('end')})
})

gulp.task('js', function(){
    return gulp.src(conf.clientDevDir + '**/*.js', {debug: true})
		.pipe(browserify())
		.on('error', function (err) {console.log(err);this.emit('end')})
		.pipe(babel({ presets: ['es2015'] }))
		.pipe(gulp.dest(conf.clientProdDir))
})

gulp.task('sass', function () {
  return gulp.src( conf.clientDevDir + 'sass/**/*.scss')
    .pipe(sass(
		//Let Sass to import files directly from bootstrap
		{includePaths: ['node_modules/bootstrap-sass/assets/stylesheets']}
		).on('error', sass.logError))
    .pipe(gulp.dest(conf.clientProdDir + 'css/'))
        .on('error', function (err) {console.log(err.error);this.emit('end')})
})

gulp.task('assets', function () {
	return gulp.src(conf.clientDevDir + 'assets/**/*')
	.pipe(gulp.dest(conf.clientProdDir + 'assets/'))
})

gulp.task('watchAssets', () => gulp.watch(conf.clientDevDir + 'assets/**/*', ['assets']))

gulp.task('watchCSS', () => gulp.watch(conf.clientDevDir + '**/*.scss', ['sass']))

gulp.task('watchJS', () => gulp.watch(conf.clientDevDir + '**/*.js', ['js']))

gulp.task('watchPUG', () => gulp.watch(conf.clientDevDir + '**/*.pug', ['pug']))

gulp.task('build', () => gulp.start(['js', 'assets', 'pug', 'sass']))

gulp.task('default', () => gulp.start(['js', 'assets', 'pug', 'sass','watchPUG', 'watchCSS', 'watchJS', 'watchAssets']))
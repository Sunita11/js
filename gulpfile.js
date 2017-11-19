var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass =  require('gulp-sass'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect');

/*
**** SASS TASK ****
*/
var jsSources = ['src/scripts/*.js'],
    sassSources = ['src/styles/main.scss'],
    outputDir = 'dist/';


gulp.task('log', function(){
	gutil.log('== My Log Task ==');
});

/*
**** SASS TASK ****
*/
gulp.task('sass', function(){
	gulp.src(sassSources)
	.pipe(sass({style : 'expanded'}))
	.on('error', gutil.log)
	.pipe(gulp.dest(outputDir + 'css'))
	.pipe(connect.reload())
});

/*
**** JS TASK ****
*/
gulp.task('js', function(){
	gulp.src(jsSources)
	.pipe(uglify())
	.pipe(concat('main.js'))
	.pipe(gulp.dest(outputDir + 'script'))
	.pipe(connect.reload())
});

/*
**** WATCH TASK ****
*/
gulp.task('watch',function(){
	gulp.watch('src/scripts/*.js',['js']);
	gulp.watch('src/styles/**/*.scss',['sass']);
});

/*
**** CONNECT TASK ****
*/
gulp.task('connect', function(){
	connect.server({
		root : '.',
		livereload: true
	})
});

gulp.task('default',['sass','js','connect','watch']);
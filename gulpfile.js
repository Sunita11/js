var path = require('path'),
    gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass =  require('gulp-sass'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect'),
    Server = require('karma').Server,
    clean = require('gulp-clean'),
    webpack = require('gulp-webpack');

/*
**** SASS TASK ****
*/
var rootPath = path.resolve(__dirname),
    jsSources = ['src/scripts/*.js'],
    sassSources = ['src/styles/main.scss'],
    outputDir = 'dist/';


gulp.task('log', function(){
	gutil.log('== My Log Task ==');
});

/*
**** CLEAN TASK ****
*/
gulp.task('clean', function(){
    return gulp.src(outputDir, {read:false})
        .pipe(clean());
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
	gulp.watch('src/scripts/*.js',['webpack']);
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

/*
**** WEBPACK TASK ****
*/
gulp.task('webpack',function(){
    return gulp.src('src/scripts/main.js')
        .pipe(webpack({
            watch : false,
            output: {
                filename : 'main.js'
            },
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        loader: ['babel-loader'],
                        query: {
                            presets : ['react','es2015']
                        }
                    }
                ],
            },
        node: {
            fs: 'empty'
        }
        }))
        .pipe(gulp.dest(outputDir + 'script'));
});

/*
**** CLEAN TEST TASK ****
*/
gulp.task('cleantest', function(){
    return gulp.src('test/modules/**', {read:false})
        .pipe(clean());
});

/*
**** TEST TASK ****
*/
gulp.task('test', function(done){
   new Server({
       configFile : rootPath + '/test/config/my.conf.js'
   }, done).start(); 
});

//gulp.task('default',['clean','sass','js','connect','watch']);
gulp.task('react', ['sass','webpack','connect','watch']);
gulp.task('tdd',['test']);
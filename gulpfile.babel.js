'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import min_css from 'gulp-minify-css';
import clean from 'gulp-clean';
import browserSync from 'browser-sync';
// import uglify from 'gulp-uglify';//js压缩

import webpack from 'gulp-webpack';
import webpackConfig from './webpack.config.js';

let browsersync = browserSync.create();
let reload = browsersync.reload;
/*
clean任务
 */

gulp.task("clean", ()=>{
    return gulp.src('./dist/')
        .pipe(clean());
})


/*
sass任务
 */

gulp.task('sass',()=>{
	return gulp.src('./src/**/*.scss')
			.pipe(sass())
      .pipe(autoprefixer())
			.pipe(min_css())
			.pipe( gulp.dest('./dist/') )
      .pipe(reload({stream: true}));
})	

/*

html任务
 */

gulp.task('html',()=>{
	return gulp.src('./src/**/*.html')
			.pipe( gulp.dest('./dist/') )
      .pipe(reload({stream: true}));
})

/*
js任务
 */

gulp.task('js',()=>{
	return gulp.src(['./src/components/*.*','./src/**/*.js'])
      .pipe(webpack(webpackConfig))
      .pipe( gulp.dest('./dist/') )
      .pipe(reload({stream: true}));
})



/*
asset任务
 */

gulp.task('assets',()=>{
	return gulp.src('./src/assets/**/*.**', { base: 'src' })
			.pipe( gulp.dest('./dist/') )
      .pipe(reload({stream: true}));
})

/*
自动刷新任务
 */
gulp.task('browser_sync',['sass',"html","js"], function() {
  var files = [
  './src/**/*.html',
  './src/**/*.scss',
  './src/**/*.js',
  './src/components/*.vue'
  ];

  browsersync.init({
    server: {
      baseDir: "./dist/"
    }
  });

  gulp.watch(files[0],['html'],browserSync.reload);
  gulp.watch(files[1],['sass'],browserSync.reload);
  gulp.watch([files[2],files[3]],['js'],browserSync.reload);
});


gulp.task('default',["clean"],()=>{
	gulp.start('browser_sync','assets')
});
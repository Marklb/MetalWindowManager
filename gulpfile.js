var gulp = require('gulp');
var babel = require('gulp-babel');

// babel.on('error', function() {
//   console.log("ERRRRROR!!!!!!!");
// });

gulp.task('default', function () {
    return gulp.src('src/*.es6')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

gulp.task('babel', function() {
  return gulp.src('src/**/*.es6')
    .pipe(babel())
    // .pipe(babel().on('error', function() {
    //   console.log("ERRRRROR!!!!!!!");
    // }))
    .pipe(gulp.dest('dist'))
});

gulp.task('babel-layouts', function() {
  return gulp.src('config/layouts/src/**/*.es6')
    .pipe(babel())
    .pipe(gulp.dest('config/layouts'))
});

gulp.task('movehtml', function() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'))
});

// TODO: Remove. Temporarilty added while no internet to download scss module
gulp.task('moveCss', function() {
  return gulp.src('src/**/*.css')
    .pipe(gulp.dest('dist'))
});

gulp.task('watch', ['babel'], function (){
  gulp.watch('src/**/*.html', ['movehtml']);
  gulp.watch('src/**/*.es6', ['babel']);
  gulp.watch('config/layouts/src/**/*.es6', ['babel-layouts']);

  // TODO: Remove. Temporarilty added while no internet to download scss module
  gulp.watch('src/**/*.css', ['moveCss']);
});

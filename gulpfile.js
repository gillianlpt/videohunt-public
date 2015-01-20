var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');

gulp.task('sass', function() {
  gulp.src('assets/stylesheets/style.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(gulp.dest('assets/stylesheets'));
});

gulp.task('watch', function() {
  gulp.watch('assets/stylesheets/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);

let gulp = require('gulp');
var sftp = require('gulp-sftp');




gulp.task('upload', function () {
  console.log(gulp.src('./dist/**/*').pipe)
  return gulp.src('./dist/**/*').pipe(sftp({
    host: '134.175.48.27',
    port: 22,
    user: 'app',
    pass: 'chery_Ariza5',
    remotePath: '/home/app/wx/'
  }))
})

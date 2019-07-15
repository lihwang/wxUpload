let gulp = require('gulp');
var sftp = require('gulp-sftp');




gulp.task('upload', function () {
  console.log(gulp.src('./dist/**/*').pipe)
  return gulp.src('./dist/**/*').pipe(sftp({
      host: '148.70.216.55',
      port:22,
      user: 'app',
      pass: 'tingyu_0321X',
      remotePath:'/home/app/wx/'
    }))
  })

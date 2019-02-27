const gulp = require('gulp');
const clean = require('gulp-clean');
// 测试环境初始化
gulp.task('init', () => {
    return gulp.src('./dest')
    .pipe(clean());
});

// 生产环境初始化
gulp.task('init-prod', () => {
    return gulp.src('./dist')
    .pipe(clean());
});
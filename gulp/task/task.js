const gulp = require("gulp");
const notify = require("gulp-notify");
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');

const dest = './dest/',
    dist = './dist',
    srcDir = './src/**/*';

let notifyError = () => {
    return notify.onError('Error: <%= error.message %>');
};

/**
 * 开发环境
 */
// js 编译输出
gulp.task('babel', () => {
    gulp.src(`${srcDir}.js`,)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .on('error', notifyError())
        .pipe(gulp.dest(dest));
});

// sass 编译输出
gulp.task('sass', () => {
    gulp.src(`${srcDir}.sass`)
        .pipe(sass())
        .on('error', notifyError())
        .pipe(gulp.dest(dest))
});

// html 输出
gulp.task('html', () => {
    gulp.src(`${srcDir}.html`)
        .pipe(gulp.dest(dest))
        .pipe(htmlmin())
        .on('error', notifyError())
        .pipe(gulp.dest(dist))
});


/**
 * 生产环境
 */
// js 编译压缩输出
gulp.task('babel', () => {
    gulp.src()
});

// html 压缩输出
gulp.task('html-min', () => {
    gulp.src('./src/**/*.html')

});


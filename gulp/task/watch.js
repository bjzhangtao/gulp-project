const gulp = require('gulp');
const watch = require('gulp-watch');
const rev = require('gulp-rev');    // 开发环境资源加hash码
const config = require('../config');
const sequence = require('gulp-sequence');

var componentsDir = './src/components/',
    components = config.components,
    sassName = 'sass-';
    babelName = 'babel-';

var createWatch = () => {
    components.map((i)=>{
        watch(componentsDir + i +'/*.scss', () => {
            if(i === 'base'){
                components.map((item)=>{
                    gulp.start(sassName + item);
                });
                gulp.start('html');
            }else {
                gulp.start(sassName + i);
                gulp.start('html');
            }
        })
    });

    components.map((i)=>{
        watch(componentsDir + i +'/*.js', () => {
            gulp.start(babelName + i);
            gulp.start('html');
        })
    })
};
gulp.task('watch', () => {
    sequence('init', ['sass', 'babel', 'html'], 'imagemin', () => {
        createWatch();
        watch('./src/views/*.html', () => {
            gulp.start('html');
        })
    })
});
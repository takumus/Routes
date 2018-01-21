const gulp = require('gulp');
const path = require('path');
const connect = require('gulp-connect');
const webpack = require('gulp-webpack');;
const tsconfig = require('./tsconfig.json');
const webpackConfig = require('./webpack.config.js');
const tsconfigPaths = tsconfig.compilerOptions.paths;
if (tsconfigPaths) {
    webpackConfig.resolve.alias = {};
    Object.keys(tsconfigPaths).forEach((key) => {
        webpackConfig.resolve.alias[key.replace('*', '')] = path.resolve(__dirname, tsconfigPaths[key][0]).replace('*', '/');
    });
}
gulp.task('webpack', () => {
    return gulp.src(['./src/*.ts'])
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./dist'));
});
gulp.task('connect', () => {
    return connect.server(
        {root: './www'}
    );
});
gulp.task('watch', () => {
    return gulp.watch(
        './src/**/*.ts',
        {interval: 1000},
        gulp.series('webpack')
    );
});
gulp.task('default', gulp.parallel('webpack','watch','connect'));
var config = {
    exportName: "routes",
    ts: {
        tsconfig: './tsconfig.json',
        src: './src/**/*.ts'
    },
    dest: {
        js: './js',
        dts: './d.ts'
    }
}
var gulp = require('gulp');
var ts = require('gulp-typescript').createProject(config.ts.tsconfig);
var merge2 = require('merge2');
var addModuleExports = require('gulp-add-module-exports');
gulp.task('tsc', function () {
    var tsc = gulp.src(config.ts.src)
        .pipe(ts());
    return merge2([
        tsc
            .dts
            .pipe(gulp.dest(config.dest.dts)),
        tsc
            .js
            .pipe(addModuleExports(config.exportName))
            .pipe(gulp.dest(config.dest.js))
    ]);
});
gulp.task('watch', function () {
    gulp.watch(config.ts.src, ['tsc']);
});
 
gulp.task('default', ['tsc', 'watch']);

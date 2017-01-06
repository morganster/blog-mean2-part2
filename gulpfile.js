var gulp = require('gulp');
var nodemon = require('nodemon');
var browserSync = require('browser-sync');
var typescript = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var tscConfig = require('./tsconfig.json');
var jsFiles = ['api/**/*.js'];

var appSrc = 'public/',
    tsSrc = 'src/';

gulp.task('browser-sync', function() {
    browserSync({
        port: 7000,
        proxy: "http://localhost:8080",
        files: ["public/**"]
    });
});

gulp.task('nodemon', function(cb) {
    var options = {
        script: 'server.js',
        delayTime: 1,
        env: {
            'PORT': 8080
        },
        watch: jsFiles
    };
    return nodemon(options)
        .on('restart', function(ev) {
            console.log('refreshing...');
        });
});

gulp.task('watch', function() {
    gulp.watch(tsSrc + '**/*.ts', ['typescript']);
});

gulp.task('typescript', function() {
    return gulp
        .src(tsSrc + '**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(appSrc + 'app/'));
});

gulp.task('default', ['nodemon', 'browser-sync', 'watch', 'typescript'], function() {
    gulp.watch(tsSrc + '**/*.ts', ['typescript']);
});
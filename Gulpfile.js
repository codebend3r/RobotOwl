'use strict';
// Generated on 2014-04-10 using generator-gulp-webapp 0.0.6

var gulp = require('gulp');
var open = require('open');
var wiredep = require('wiredep').stream;

// Load plugins
var $ = require('gulp-load-plugins')();

var outputFolder = 'dist';


// Styles
gulp.task('styles', function () {
    return gulp.src('app/sass/*.scss')
        .pipe($.sass())
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('dist/css'))
        .pipe($.size());
});

// Scripts
gulp.task('scripts', function () {
    return gulp.src([
            'app/js/vendor/*.js',
            'app/js/modules/*.js',
            'app/js/routes/*.js',
            'app/js/controllers/**/*.js',
            'app/js/directives/**/*.js',
            'app/js/filters/**/*.js',
            'app/js/providers/**/*.js'
        ], {
            base: './app/js'
        })
        //.pipe($.jshint('.jshintrc'))
        //.pipe($.jshint.reporter('default'))
        .pipe(gulp.dest('dist/js'))
        .pipe($.size());
});

// HTML
gulp.task('html', ['styles', 'scripts'], function () {

    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('app/*.html')
        .pipe($.useref.assets())
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

// Images
gulp.task('images', function () {
    return gulp.src([
            'app/images/**/*'
        ])
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});

gulp.task('fonts', function () {
    return gulp.src(
        [
            '**/*.eot',
            '**/*.svg',
            '**/*.ttf',
            '**/*.woff'
        ])
        .pipe($.flatten())
        .pipe(gulp.dest('dist/font'))
        .pipe($.size());
});

// Clean
gulp.task('clean', function () {
    return gulp.src([
        'dist/styles',
        'dist/scripts',
        'dist/images',
        'dist/fonts'
    ], { read: false }).pipe($.clean());
});

// Build
gulp.task('build', [
    'html',
    'images',
    'fonts'
]);

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

// Connect
gulp.task('connect', function () {
  $.connect.server({
    root: ['app'],
    port: 9000,
    livereload: true
  });
});

// Open
gulp.task('serve', ['connect'], function() {
  open("http://localhost:9000");
});

// Watch
gulp.task('watch', ['connect', 'serve'], function () {
    // Watch for changes in `app` folder
    gulp.watch([
        'app/*.html',
        'app/css/**/*.css',
        'app/js/**/*.js'
    ], function (event) {
        return gulp.src(event.path)
            .pipe($.connect.reload());
    });

    // Watch .css files
    gulp.watch('app/css/**/*.css', ['styles']);

    // Watch .js files
    gulp.watch('app/js/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('app/images/**/*', ['images']);

    // Watch bower files
    gulp.watch('bower.json', ['wiredep']);
});

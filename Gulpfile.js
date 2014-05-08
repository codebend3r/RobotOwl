'use strict';

var gulp = require('gulp'),
    config = {
        app: 'app',
        dev: 'dev',
        prod: 'prod',
        release: 'release'
    },
    $ = require('gulp-load-plugins')(),
    protractor = require('gulp-protractor').protractor,
    connect = require('gulp-connect-multi'),
    minifyCSS = require('gulp-minify-css'),
    devServer = connect(),
    prodServer = connect(),
    releaseServer = connect(),
    testServer = connect(),
    gulpif = require('gulp-if'),
    open = require('open'),
    env = 'dev';


//=============================================
// TASKS
//=============================================

gulp.task('set-to-dev', function () {
    env = 'dev';
});

gulp.task('set-to-prod', function () {
    env = 'prod';
});

gulp.task('set-to-release', function () {
    env = 'release';
});

// HTML
gulp.task('html', function () {
    return gulp.src([ config.app + '/**/*.html', config.app + '/*.html', '!' + config.app + '/bower_components/**/*.html' ])
        // RELEASE
        .pipe(gulpif(env === 'release',
            $.usemin({
                css: [
                    minifyCSS({keepSpecialComments: 0})
                ],
                js: [
                    $.jshint(),
                    $.ngmin(),
                    $.uglify()
                ]
            })
        ))
        .pipe(gulpif(env === 'release',
            gulp.dest(config.release)
        ))
        // PROD
        .pipe(gulpif(env === 'prod',
            $.usemin({
                css: [],
                js: []
            })
        ))
        .pipe(gulpif(env === 'prod',
            gulp.dest(config.prod)
        ))
        // DEV
        .pipe(gulpif(env === 'dev',
            gulp.dest(config.dev)
        ));

});


// SASS
gulp.task('sass', function () {
    return gulp.src([config.app + '/styles/**/*.scss', config.app + '/styles/*.scss'])
        .pipe($.rubySass({
            style: 'expanded',
            loadPath: [ config.app + '/bower_components' ]
        }))
        .pipe(gulp.dest(config.app + '/css/'))
        .pipe($.size());
});

// CSS
gulp.task('css', function () {
    return gulp.src([config.app + '/css/**/*.css'])
        .pipe(gulp.dest(config.dev + '/css/'))
        .pipe($.size());
});

// JS
gulp.task('scripts', function () {
    return gulp.src([ config.app + '/scripts/**/*.js' ])
        .pipe(gulp.dest(config.dev + '/scripts/'))
        .pipe($.size());

});

// Images
gulp.task('images', function () {
    return gulp.src(config.app + '/images/**/*.{png,jpg,gif}')
        .pipe($.imagemin({
            optimizationLevel: 1,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulpif(env === 'dev',
            gulp.dest(config.dev + '/images/')
        ))
        .pipe(gulpif(env === 'prod',
            gulp.dest(config.prod + '/images/')
        ))
        .pipe(gulpif(env === 'release',
            gulp.dest(config.release + '/images/')
        ))
        .pipe($.size());
});

// Static Data
gulp.task('static', function () {
    return gulp.src([config.app + '/staticData/**/*'])
        .pipe(gulpif(env === 'dev',
            gulp.dest(config.dev + '/staticData/')
        ))
        .pipe(gulpif(env === 'prod',
            gulp.dest(config.prod + '/staticData/')
        ))
        .pipe(gulpif(env === 'release',
            gulp.dest(config.release + '/staticData/')
        ))
        .pipe($.size());
});

// Fonts
gulp.task('fonts', function () {
    return gulp.src(config.app + '/fonts/**/*')
        .pipe(gulpif(env === 'dev',
            gulp.dest(config.dev + '/fonts/')
        ))
        .pipe(gulpif(env === 'prod',
            gulp.dest(config.prod + '/fonts/')
        ))
        .pipe(gulpif(env === 'release',
            gulp.dest(config.release + '/fonts/')
        ))
        .pipe($.size());
});

// Clean
gulp.task('clean', function () {
    return gulp.src([config.dev, config.prod, config.release], { read: false }).pipe($.clean({force: false}));
});

//Build
gulp.task('build', [
        'set-to-dev',
        'html',
        'sass',
        'css',
        'scripts',
        'images',
        'fonts',
        'static'
    ]
);

gulp.task('build-prod', [
    'set-to-prod',
    'sass',
    'html',
    'images',
    'fonts',
    'static'
]);

gulp.task('build-release', [
    'set-to-release',
    'sass',
    'html',
    'images',
    'fonts',
    'static'
]);

// Build and Watch
gulp.task('buildclean', [ 'clean', 'build' ]);

//gulp.task('connect-prod', [ 'set-to-prod', 'connect-prod' ]);

gulp.task('buildclean-prod', [ 'clean', 'build-prod' ]);

// Build and Watch
gulp.task('buildserve', [ 'buildclean', 'serve' ]);

// Clean, Build and Watch
gulp.task('buildwatch', [ 'buildclean', 'watch' ]);

// NOT WORKING
gulp.task('e2e', [ 'connect', 'protractor' ]);

// Default task
gulp.task('default', [ 'build' ]);

// Karma - Unit
gulp.task('karma', function () {
    return gulp.src(['test/spec/**/*.js'])
        .pipe($.karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }));

});

// Protractor - E2E
gulp.task('protractor', [ ], function () {
    gulp.src(['test/e2e/*.js'])
        .pipe(protractor({
            configFile: 'protractor.conf.js'
        }));
});

// Open
gulp.task('serve', ['connect'], function () {
    open('http://localhost:9000');
});

gulp.task('serve-test', ['connect-test'], function () {
    open('http://localhost:9003');
});


// Watch
gulp.task('watch', ['connect'], function () {

    gulp.watch([
            config.app + '/*.html',
            config.app + '/**/*.html',
            config.app + '/bower_components/**/*.{css,scss,js}',
            config.app + '/styles/**/*.scss',
            config.app + '/scripts/**/*.js',
            config.app + '/fonts/**/*.js',
            config.app + '/images/**/*.{png,jpg,gif}'
    ], { maxListeners: 999 }, function (event) {
        return gulp.src(event.path)
            .pipe(devServer.reload());
    });

    // Watch all .html files
    gulp.watch([config.app + '/**/*.html', config.app + '/*.html'], ['html']);

    // Watch .scss files
    gulp.watch(config.app + '/styles/**/*.scss', ['sass', 'css']);

    // Watch .js files
    gulp.watch([config.app + '/scripts/**/*.js', config.app + '/scripts/*.js'], ['scripts']);

    // Watch image files
    gulp.watch(config.app + '/images/**/*.{png,jpg,gif}', ['images']);

});


// Servers

gulp.task('connect', devServer.server({
    root: [ config.dev ],
    port: 9000,
    livereload: true
}));

gulp.task('connect-prod', prodServer.server({
    root: [ config.prod ],
    port: 9001,
    livereload: true
}));

gulp.task('connect-release', releaseServer.server({
    root: [ config.release ],
    port: 9002,
    livereload: true
}));

gulp.task('connect-test', testServer.server({
    root: [ config.dev ],
    port: 9003,
    livereload: false
}));
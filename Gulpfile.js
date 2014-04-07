/**
 * Created with IntelliJ IDEA.
 * User: Bouse
 * Date: 4/6/14
 * Time: 12:06 AM
 * To change this template use File | Settings | File Templates.
 */

var gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    filesize = require('gulp-filesize'),
    build = require('gulp-build'),
    concat = require('gulp-concat'),
    rename = require("gulp-rename"),
    connect = require('gulp-connect'),
    //$ = require('gulp-load-plugin')({camelize: true}),
    server = $.tinyLr();
    settings = {
        outputFolder: 'www',
        projectName: 'RobotOwl',
        outputName: 'robotowl',
        version: '0.1.8',
        port: 8080
    },
    allJS = [
        'js/vendor/angular.js',
        'js/vendor/angular-route.js',
        'js/vendor/angular-cookies.js',
        'js/vendor/angular-resource.js',
        'js/vendor/angular-animate.js',
        'js/vendor/angular-cookies.js',
        'js/vendor/angular-mocks.js',
        'js/vendor/angular-sanitize.js',
        'js/vendor/angular-scenario.js',
        'js/module/app.js',
        'js/controllers/portfolio.js',
        'js/controllers/mainmenu.js',
        'js/internal/Crivas.Data.js'
    ],
    allCSS = [
        'css/normalize.css',
        'css/main.css',
        'css/headers.css',
        'css/nav-bar.css',
        'css/portfolio.css',
        'css/resume.css',
        'css/contact.css',
        'css/owlgallery.css',
        'css/prettify.css'
    ],
    filename = settings.outputName + '-' + settings.version + '.min';


gulp.task('clean', function () {
    gulp.src([settings.output], { read: false})
        .pipe(clean());
});

gulp.task('build', function() {
    gulp.src('index.html')
        .pipe(build(
            {
                jsName: 'js/' + filename + '.js',
                cssName: 'css/' + filename + '.css'
            }
        ))
        .pipe(gulp.dest(settings.outputFolder))
});

gulp.task('sass', function () {
    gulp.src('sass/**/*.scss')
        .pipe(sass())
        .pipe(filesize())
        .pipe(gulp.dest('./css'));
});

gulp.task('scripts', function () {
    //gulp.src(allJS)
    gulp.src(['js/vendor/**/*.js', 'js/modules/**/*.js', 'js/controllers/**/*.js', 'js/directives/**/*.js'])
        .pipe(filesize())
        //.pipe(connect.reload())
        .pipe(gulp.dest(settings.outputFolder + '/js/'));

});

gulp.task('scriptsProd', function () {
    gulp.src(allJS)
        .pipe(concat(filename + '.js'))
        .pipe(uglify())
        .pipe(filesize())
        //.pipe(connect.reload())
        .pipe(gulp.dest(settings.outputFolder + '/js/'));

});

gulp.task('styles', function () {
    gulp.src(allCSS)
        //.pipe(concat(filename + '.css'))
        .pipe(minifyCSS())
        .pipe(filesize())
        //.pipe(connect.reload())
        .pipe(gulp.dest(settings.outputFolder + '/css/'));
});

gulp.task('move', function () {
    // the base option sets the relative root for the set of files,
    // preserving the folder structure
    gulp.src(
            [
                '*.html',
                'partials/*.html',
                'js/vendor/**/*.js',
                'js/module/**/*.js',
                'js/controllers/**/*.js',
                'js/directives/**/*.js',
                'js/internal/**/*.js',
                'css/**',
                'images/**',
                'pages/**',
                'resume/**',
                'icons/**',
                'pattern/**'
            ],
            {
                base: './',
                cwd : 'js/**'
            }
        )
        //.pipe(filesize())
        .pipe(gulp.dest(settings.outputFolder));
});

gulp.task('rename', function () {
    gulp.src('index-dev.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./'));
});

gulp.task('connect', function() {
    connect.server({
        root: settings.outputName,
        port: settings.port
        //livereload: true
    });
});

gulp.task('watch', function () {
    gulp.watch( ['js/**/*.js', 'sass/**/*.scss', '*.html', 'partials/*.html'], ['dev2']);
});


// The default task (called when you run `gulp` from cli)
gulp.task('dev1', [
    'clean',
    'sass',
    'styles',
    'scripts',
    'move'
]);

gulp.task('dev2', [
    'sass',
    'styles',
    'scripts',
    'move'
]);

gulp.task('watchdev', [
    'dev2',
    'watch'
]);

gulp.task('default', [
    'dev1',
    'watch',
    //'serve'
    'connect'
]);
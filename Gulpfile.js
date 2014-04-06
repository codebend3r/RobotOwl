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
    livereload = require('gulp-livereload'),
    build = require('gulp-build'),
    concat = require('gulp-concat'),
    rename = require("gulp-rename"),
    serve = require('gulp-serve'),
    settings = {
        output: 'www',
        projectName: 'RobotOwl',
        outputName: 'robotowl',
        version: '0.1.8',
        port: 8000
    },
    allJS = [
        'js/vendor/jquery-1.9.1.js',
        'js/vendor/jquery.imagesloaded.js',
        'js/vendor/jquery.localscroll-1.2.7.js',
        'js/vendor/jquery.owlgallery-1.6.js',
        'js/vendor/prettify.js',
        'js/vendor/knockout-2.2.1.js',
        'js/vendor/modernizr-2.6.2.js',
        'js/vendor/TweenMax.min.js',
        'js/internal/Crivas.Data.js',
        'js/internal/Crivas.Main.js',
        'js/internal/Crivas.SiteViewModel.js'
    ],
    allCSS = [
        'css/normalize.css',
        'css/main.css',
        'css/headers.css',
        'css/nav-bar.css',
        'css/portfolio.css',
        'css/resume.css',
        'css/contact.css',
        'css/owlgallery.css'
    ],
    filename = settings.outputName + '-' + settings.version + '.min';


gulp.task('clean', function () {
    gulp.src([settings.output], { read: false })
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
        .pipe(gulp.dest(settings.output))
});

gulp.task('sass', function () {
    gulp.src('sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

gulp.task('scripts', function () {
    gulp.src(allJS)
        .pipe(concat(filename + '.js'))
        //.pipe(uglify())
        .pipe(filesize())
        .pipe(gulp.dest(settings.output + '/js/'));

});

gulp.task('styles', function () {
    gulp.src(allCSS)
        .pipe(concat(filename + '.css'))
        .pipe(minifyCSS())
        .pipe(filesize())
        .pipe(gulp.dest(settings.output + '/css/'));
});

gulp.task('move', function () {
    // the base option sets the relative root for the set of files,
    // preserving the folder structure
    gulp.src([ 'index.html', 'images/**', 'pages/**', 'resume/**', 'icons/**', 'pattern/**'], 
        { base: './' })
        .pipe(gulp.dest(settings.output));
});

gulp.task('rename', function () {
    gulp.src('index-dev.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./'));
});

gulp.task('serve', serve({
    root: ['www'],
    port: settings.port,
    middleware: function(req, res) {
        // custom optional middleware
    }
}));

// Rerun the task when a file changes
gulp.task('watch', function () {
    var server = livereload();
    gulp.watch([ 'js/**/*.js', 'css/**/*.css' ]).on('change', function(file) {
        console.log('++++++++++++++++++++++', file.path);
        //server.changed(file.path);
    });
});

// The default task (called when you run `gulp` from cli)
gulp.task('dev', [ 'sass', 'styles', 'scripts', 'rename', 'move', 'build' ]);
gulp.task('default', [ 'clean', 'dev', 'watch', 'serve' ]);
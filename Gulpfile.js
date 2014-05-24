'use strict';

var gulp = require('gulp'),
  port = 9000,
  config = {
    app: 'app',
    dev: 'dev',
    prod: 'prod',
    release: 'release'
  },
  $ = require('gulp-load-plugins')(),
  connect = require('gulp-connect-multi'),
  minifyCSS = require('gulp-minify-css'),
  devServer = connect(),
  prodServer = connect(),
  releaseServer = connect(),
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
          //$.ngmin(),
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
  return gulp.src([config.app + '/sass/**/*.scss', config.app + '/sass/*.scss'])
    .pipe($.rubySass({
      style: 'expanded'
    }))
    .pipe(gulp.dest(config.app + '/css/'))
    .pipe($.size());
});

// CSS
gulp.task('css', [ 'sass' ], function () {
  return gulp.src([config.app + '/css/**/*.css'])
    .pipe(gulp.dest(config.dev + '/css/'))
    .pipe($.size());
});

// JS
gulp.task('scripts', function () {
  return gulp.src([ config.app + '/js/**/*.js' ])
    .pipe(gulp.dest(config.dev + '/js/'))
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

// Build
gulp.task('build', [
    'set-to-dev',
    'html',
    'css',
    'scripts',
    'images',
    'fonts'
  ]
);

gulp.task('build-prod', [
  'set-to-prod',
  'sass',
  'html',
  'images',
  'fonts'
]);

gulp.task('build-release', [
  'set-to-release',
  'sass',
  'html',
  'images',
  'fonts'
]);

// Build and Watch
gulp.task('buildclean', [ 'clean', 'build' ]);

//gulp.task('connect-prod', [ 'set-to-prod', 'connect-prod' ]);

gulp.task('buildclean-prod', [ 'clean', 'build-prod' ]);

// Build and Watch
gulp.task('buildserve', [ 'buildclean', 'serve' ]);

// Clean, Build and Watch
gulp.task('buildwatch', [ 'buildclean', 'watch' ]);

// Default task
gulp.task('default', [ 'build' ]);

// Open
gulp.task('serve', ['connect'], function () {
  open('http://localhost:' + port);
});

// Watch
gulp.task('watch', ['connect'], function () {

  gulp.watch([
      config.app + '/*.html',
      config.app + '/**/*.html',
      config.app + '/bower_components/**/*.{css,scss,js}',
      config.app + '/sass/**/*.scss',
      config.app + '/js/**/*.js',
      config.app + '/fonts/**/*.js',
      config.app + '/images/**/*.{png,jpg,gif}'
  ], function (event) {
    return gulp.src(event.path)
      .pipe(devServer.reload());
  });

  // Watch all .html files
  gulp.watch([config.app + '/**/*.html', config.app + '/*.html'], [ 'html' ]);

  // Watch .scss files
  gulp.watch(config.app + '/sass/**/*.scss', [ 'css' ]);

  // Watch .js files
  gulp.watch([config.app + '/js/**/*.js', config.app + '/js/*.js'], [ 'scripts' ]);

  // Watch image files
  gulp.watch(config.app + '/images/**/*.{png,jpg,gif}', [ 'images' ]);

});


// Servers
gulp.task('connect', devServer.server({
  root: [ config.dev ],
  port: port,
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

module.exports = gulp;